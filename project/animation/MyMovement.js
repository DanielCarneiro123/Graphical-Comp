export class MyMovement {
  constructor(startVal, endVal, animDurationSecs, loop, active) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.wingAngle = 0;
    this.grassAngle = 0;
    this.startVal = startVal;
    this.endVal = endVal;
    this.animDurationSecs = animDurationSecs;
    this.length = (this.endVal - this.startVal);
    this.animVal = this.startVal;
    this.active = active;
    this.loop = loop;
    this.last = 0;
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

  updatePositionObj(elapsedTime, vector, movingY) {
    const objSpeed = this.calculateStaticSpeed(vector.speed);
    if (movingY) {
      this.updateCoordinatesDown(vector);
    } else {
      this.updateCoordinates(vector);
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

  updateCoordinates(vector) {
    this.x = vector.x + vector.speed * -Math.cos(vector.orientation);
    this.y = this.animVal + 60;
    this.z = vector.z + vector.speed * -Math.sin(-vector.orientation);
  }

  updateCoordinatesDown(vector) {
    this.x = vector.x;
    this.y = vector.y + vector.speed;
    this.z = vector.z;
  }

  updateWingAngle(staticSpeed, elapsedTime) {
    this.wingAngle = (Math.PI / 4) * Math.sin(10 * staticSpeed * elapsedTime);
  }

  movementFunction(elapsedTime) {
    return Math.sin(elapsedTime / this.startVal);
  }
}
