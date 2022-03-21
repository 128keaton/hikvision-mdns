import {_private, discoverCameras, HikvisionCamera} from "../src/hikvision";
import util from "util";
import {exec as exec0} from "child_process";

const exec = util.promisify(exec0);

test('#simple', () => {
    expect(discoverCameras).toBeInstanceOf(Function);
});

jest.setTimeout(10000);
test('#finding', () => {
    return discoverCameras().then(cameras => {
        expect(cameras).toBeInstanceOf(Array);
    });
});

jest.setTimeout(25000);
test('#findingTimeout', () => {
    return discoverCameras(10).then(cameras => {
        expect(cameras).toBeInstanceOf(Array);
    });
});

test('#nanTimeout', () => {
    const nanTimeout = Number('aaaa');
    return discoverCameras(nanTimeout).then(cameras => {
        expect(cameras).toBeInstanceOf(Array);
    });
});

test('#testingParsing', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cameras = require('./cameras.json');
    const parsed =_private.parseDevices(cameras);

    expect(parsed[0].name).toEqual(cameras[0]['modelName']);
    expect(parsed[0].address).toEqual(cameras[0]['address']);
});


test('#cli', async () => {
    const { stdout } = await exec('npx ts-node src/hikvision.ts', {
        encoding: 'utf8',
    });

    const libraryOutput: HikvisionCamera[]  = await discoverCameras();
    const cliOutput: HikvisionCamera[] = (JSON.parse(stdout));


    libraryOutput.sort((a, b) => {
        if (a.address < b.address) {
            return -1;
        }
        if (a.address > b.address) {
            return 1;
        }
        return 0;
    });

    cliOutput.sort((a, b) => {
        if (a.address < b.address) {
            return -1;
        }
        if (a.address > b.address) {
            return 1;
        }
        return 0;
    });

    expect(libraryOutput).toEqual(cliOutput);
});
