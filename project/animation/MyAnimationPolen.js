import { MyAnimation } from "./MyAnimation.js";

export class MyAnimationPolen extends MyAnimation {

    constructor(startVal, endVal, beeDurationSecs, loop, active) {
        super(startVal, endVal, beeDurationSecs, loop, active);
        this.y = 0;
    }

    updatePositionBee(elapsedTime, vector) {
        if (this.active)
            this.y = this.beeVal;
    }

    movementFunction(x) {
        return x
    }
}