#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._private = exports.discoverCameras = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mDnsSd = require('node-dns-sd');
const defaultTimeout = 3;
/**
 * Discover Hikvision cameras on the network
 * @param timeout - Defaults to 3 seconds
 */
function discoverCameras(timeout = defaultTimeout) {
    if (isNaN(timeout)) {
        timeout = defaultTimeout;
    }
    return mDnsSd.discover({
        name: '_CGI._tcp.local',
        wait: timeout || defaultTimeout
    }).then((devices) => parseDevices(devices));
}
exports.discoverCameras = discoverCameras;
/**
 * Does the actual parsing, this library is just a wrapper anyway
 * @param devices
 */
function parseDevices(devices) {
    return devices.map(device => {
        const partialSerial = `${device['modelName']}`.split(' - ')[1];
        const additionals = device['packet']['additionals'];
        const serialAdditional = additionals.find(additional => {
            const name = `${additional['name']}`;
            const type = `${additional['type']}`;
            return name.includes(partialSerial) && type === 'A';
        });
        const serial = `${serialAdditional?.['name']}`.replace('.local', '');
        return {
            address: device['address'],
            name: device['modelName'],
            serial,
            partialSerial
        };
    });
}
exports._private = {
    parseDevices
};
/* istanbul ignore if */
if (require.main == module) {
    /* istanbul ignore next */
    discoverCameras(Number(process.argv.slice(2))).then(cameras => console.log(JSON.stringify(cameras, null, 2)));
}
