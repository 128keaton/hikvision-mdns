import {discoverCameras} from "../src/hikvision";

test('#simple', () => {
    expect(discoverCameras).toBeInstanceOf(Function);
});

test('#finding', () => {
    discoverCameras().then(cameras => {
        expect(cameras).toBeInstanceOf(Array);
    })
});
