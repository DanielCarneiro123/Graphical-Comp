export class MyAnimation {

    constructor(startVal, endVal, animDurationSecs, loop, active) {
        this.startVal = startVal;
        this.endVal = endVal;
        this.animDurationSecs = animDurationSecs;
        this.length = (this.endVal - this.startVal);
        this.animVal = this.startVal;
        this.active = active;
        this.loop = loop;
        this.last = 0;
    }

    movementFunction(time) {
        throw new Error('Subclass must implement abstract method');
    }

    updatePositionObj(){
        throw new Error('Subclass must implement abstract method');
    }

    enable(timeSinceAppStart) {
        this.active = true;
        this.last = timeSinceAppStart
        this.lastIteration = false;
    }

    disable() {
        this.active = false;
    }

    update(elapsedTimeSecs, vector, movingY) {
        
        if (this.active) {
            let timeSinceAnimationStart = elapsedTimeSecs - this.last;
            if (this.loop || (timeSinceAnimationStart >= 0 && !this.lastIteration)) {
                if(!(timeSinceAnimationStart <= this.animDurationSecs) && !this.loop){
                    if (movingY) {
                        this.animVal = this.movementFunction(1) * this.length;
                    }
                    else {
                        this.animVal = this.startVal + this.movementFunction(1) * this.length;
                    }
                    this.updatePositionObj(timeSinceAnimationStart, vector, movingY);
                    this.lastIteration = true
                }else{
                    if (movingY) {
                        this.animVal = this.movementFunction(timeSinceAnimationStart / this.animDurationSecs) * this.length;
                    }
                    else {
                        this.animVal = this.startVal + this.movementFunction(timeSinceAnimationStart / this.animDurationSecs) * this.length;
                    }
                    this.updatePositionObj(timeSinceAnimationStart, vector, movingY);
                }
            }
        }
    }
}