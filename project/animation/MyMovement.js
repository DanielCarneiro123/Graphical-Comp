import { MyAnimation } from "./MyAnimation.js";

export class MyMovement extends MyAnimation {

    constructor(startVal, endVal, animDurationSecs, loop, active) {
        super(startVal, endVal, animDurationSecs, loop, active);
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    updatePositionObj(elapsedTime, vector) {
        let staticSpeed = vector.speed;
        if(staticSpeed < 0.1){
            staticSpeed = 1 / this.startVal;
        }else if(staticSpeed < 2 && staticSpeed > 0.1){
            staticSpeed *= 7;
        }else{
            staticSpeed = 10;
        }

        this.x = vector.x;
        this.y = this.startVal + this.movementFunction(elapsedTime) * (this.endVal - this.startVal);
        this.z = vector.z;
    }

    movementFunction(elapsedTime) {
        return Math.sin(elapsedTime / this.startVal);
    }
}