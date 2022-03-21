import {discoverCameras} from "./src/main";

discoverCameras().then(cameras => {
    console.log(cameras);
})
