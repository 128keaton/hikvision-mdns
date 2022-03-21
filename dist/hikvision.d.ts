#! /usr/bin/env node
export interface HikvisionCamera {
    address: string;
    name: string;
    serial: string;
    partialSerial: string;
}
/**
 * Discover Hikvision cameras on the network
 * @param timeout - Defaults to 5 seconds
 */
export declare function discoverCameras(timeout?: number): Promise<HikvisionCamera[]>;
/**
 * Does the actual parsing, this library is just a wrapper anyway
 * @param devices
 */
declare function parseDevices(devices: never[]): HikvisionCamera[];
export declare const _private: {
    parseDevices: typeof parseDevices;
};
export {};
