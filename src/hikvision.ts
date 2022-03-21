#! /usr/bin/env node
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mDnsSd = require('node-dns-sd');
const defaultTimeout = 5;

export interface HikvisionCamera {
    address: string,
    name: string,
    serial: string,
    partialSerial: string
}

/**
 * Discover Hikvision cameras on the network
 * @param timeout - Defaults to 5 seconds
 */
export function discoverCameras(timeout = defaultTimeout): Promise<HikvisionCamera[]> {
    if (isNaN(timeout) || !timeout) {
        timeout = defaultTimeout;
    }

    return mDnsSd.discover({
        name: '_CGI._tcp.local',
        wait: timeout
    }).then((devices: []) => parseDevices(devices));
}

/**
 * Does the actual parsing, this library is just a wrapper anyway
 * @param devices
 */
function parseDevices(devices: never[]): HikvisionCamera[] {
    return devices.map(device => {
        const partialSerial = `${device['modelName']}`.split(' - ')[1];
        const additionals: never[] = device['packet']['additionals'];
        const serialAdditional = additionals.find(additional => {
            const name = `${additional['name']}`;
            const type = `${additional['type']}`;

            return name.includes(partialSerial) && type === 'A'
        });

        const serial = `${serialAdditional?.['name']}`.replace('.local', '');

        return {
            address: device['address'],
            name: device['modelName'],
            serial,
            partialSerial
        }
    });
}

export const _private = {
    parseDevices
};

/* istanbul ignore if */
if (require.main == module) {
    /* istanbul ignore next */
    discoverCameras(Number(process.argv.slice(2))).then(cameras => console.log(JSON.stringify(cameras, null, 2)));
}
