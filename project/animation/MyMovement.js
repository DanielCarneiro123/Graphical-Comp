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

    calculateParabolicPosition(start, end, t) {
        const x = start.x + t * (end.x - start.x);
        const z = start.z + t * (end.z - start.z);
    
        const y = start.y + t * (end.y - start.y) - 4 * t * (1 - t);
    
        return { x, y, z };
    }
    

    updatePositionObj(elapsedTime, vector, movingY, closestFlower) {
        const objSpeed = this.calculateStaticSpeed(vector.speed);
        if (movingY) {
            this.updatePositionDrop(elapsedTime, vector,closestFlower);
        } else {
            this.updateCoordinates(elapsedTime, vector, objSpeed);
        }
    
        this.updateWingAngle(objSpeed, elapsedTime);
    }
    

    updatePositionGrass(elapsedTime, vector) {
        const grassSpeed = this.calculateStaticSpeed(vector.speed);
        this.updateGrassAngle(grassSpeed, elapsedTime);
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
        this.y = this.animVal;
        this.z = vector.z + vector.speed * (-Math.sin(-vector.orientation));
    }

    updateWingAngle(staticSpeed, elapsedTime) {
        this.wingAngle = (Math.PI / 4) * Math.sin(10 * staticSpeed * elapsedTime);
    }

    updateGrassAngle(staticSpeed, elapsedTime) {
        this.grassAngle = (Math.PI / 10) * Math.sin(1.5*staticSpeed * elapsedTime);
    }

    updatePositionDrop(elapsedTime, vector, closestFlower) {
        const t = elapsedTime / this.animDurationSecs;
    
        const start = { x: vector.x, y: vector.y, z: vector.z };
        const end = closestFlower;
    
        const x = start.x + vector.speed*t * (end.x - start.x);
        const z = start.z + vector.speed*t * (end.z - start.z);
    
        const y = start.y + vector.speed*t * (end.y - start.y) - 4 * t * (1 - t);
    
        this.x = x;
        this.y = y;
        this.z = z;
        print(this.x);
        print(this.y);
        print(this.z);

    }
    
    
    movementFunction(elapsedTime) {
        return Math.sin(elapsedTime / this.startVal);
    }
}