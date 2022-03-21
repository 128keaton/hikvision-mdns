# Hikvision mDNS 
[![npm version](https://badge.fury.io/js/hikvision-mdns.svg)](https://badge.fury.io/js/hikvision-mdns) [![Build](https://github.com/128keaton/hikvision-mdns/actions/workflows/code-coverage.yml/badge.svg)](https://github.com/128keaton/hikvision-mdns/actions/workflows/code-coverage.yml) [![Coverage Status](https://coveralls.io/repos/github/128keaton/hikvision-mdns/badge.svg?branch=mane)](https://coveralls.io/github/128keaton/hikvision-mdns?branch=mane)

**A HikVision discovery tool using mDNS/ZeroConf/Bonjour**

```shell
npm i hikvision-mdns
```

This library is little more than a wrapper around [node-dns-sd](https://github.com/futomi/node-dns-sd), 
but more functionality is planned in the future.

## Usage

Simply call `discoverCameras()`, which returns a Promise containing an array of cameras:
```typescript
[
  {
    address: '10.0.1.166',
    name: 'HIKVISION DS-2CD2722FWD-IZS - 733050127',
    serial: 'DS-2CD2722FWD-IZS20170321BBWR733050127',
    partialSerial: '733050127'
  }
]
```

You can optionally pass a greater timeout value to `discoverCameras()` to increase the search time. 
The default is 3 seconds.

### CLI

You can run `discoverCameras` after installing the package globally from the command line like so:
```shell
$ discoverCameras
```

Additionally, you can specify the timeout like so, scanning for ten seconds:
```shell
$ discoverCameras 10
```

Alternatively, you could use `npx`:
```shell
$ npx hikvision-mdns
```

The CLI tool outputs raw, but formatted, JSON:
```json
[
  {
    "address": "10.0.1.215",
    "name": "HIKVISION DS-2CD2955FWD-IS - 236286152",
    "serial": "DS-2CD2955FWD-IS20190709AAWR236286152",
    "partialSerial": "236286152"
  },
  {
    "address": "10.0.1.166",
    "name": "HIKVISION DS-2CD2722FWD-IZS - 733050127",
    "serial": "DS-2CD2722FWD-IZS20170321BBWR733050127",
    "partialSerial": "733050127"
  },
  {
    "address": "10.0.1.164",
    "name": "HIKVISION DS-2CD2722FWD-IZS - 733050075",
    "serial": "DS-2CD2722FWD-IZS20170321BBWR733050075",
    "partialSerial": "733050075"
  },
  {
    "address": "10.0.1.165",
    "name": "HIKVISION DS-2CD2722FWD-IZS - 733050169",
    "serial": "DS-2CD2722FWD-IZS20170321BBWR733050169",
    "partialSerial": "733050169"
  }
]
```
