import {discoverCameras} from "../src/hikvision";

discoverCameras().then(cameras => {
    console.log(cameras);
})
