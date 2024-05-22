import { MyAnimation } from "./MyAnimation.js";

export class MyMovement extends MyAnimation {
    constructor(startVal, endVal, animDurationSecs, loop, active) {
        super(startVal, endVal, animDurationSecs, loop, active);
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.wingAngle = 0;
        this.grassAngle = 0;
    }
    
    updatePositionObj(elapsedTime, vector, movingY) {
        const objSpeed = this.calculateStaticSpeed(vector.speed);
        if (movingY){
            this.updateCoordinatesDown(elapsedTime, vector);
        }
        else{ 
            this.updateCoordinates(elapsedTime, vector, objSpeed);
        }
        
        this.updateWingAngle(objSpeed, elapsedTime);
    }

    calculateStaticSpeed(speed) {
        if (speed < 0.1) {
            return 1 / this.startVal;
        } else if (speed < 2 && speed > 0.1) {
            return speed * 7;
        } else {
            return 10;
        }
    }
    

    updateCoordinates(elapsedTime, vector, staticSpeed) {
        this.x = vector.x + vector.speed * (-Math.cos(vector.orientation));
        this.y = this.animVal + 60;
        this.z = vector.z + vector.speed * (-Math.sin(-vector.orientation));
    }

    updateCoordinatesDown(elapsedTime, vector) {
        this.x = vector.x + vector.speedX * (-Math.cos(vector.orientation));
        this.y = vector.y + vector.speed;
        this.z = vector.z + vector.speedX * (-Math.sin(-vector.orientation));
        console.log(`Updating Y in updateCoordinatesDown: ${this.y}`);
    }
      

    updateWingAngle(staticSpeed, elapsedTime) {
        this.wingAngle = (Math.PI / 4) * Math.sin(10 * staticSpeed * elapsedTime);
    }
    movementFunction(elapsedTime) {
        return Math.sin(elapsedTime / this.startVal);
    }
}