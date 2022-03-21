#! /usr/bin/env node
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mDnsSd = require('node-dns-sd');

export interface HikvisionCamera {
    address: string,
    name: string,
    serial: string,
    partialSerial: string
}

/**
 * Discover Hikvision cameras on the network
 * @param timeout - Defaults to 3 seconds
 */
export function discoverCameras(timeout = 3): Promise<HikvisionCamera[]> {
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
    discoverCameras().then(cameras => console.log(JSON.stringify(cameras, null, 2)));
}
