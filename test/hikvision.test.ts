import {discoverCameras} from "../src/hikvision";

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
