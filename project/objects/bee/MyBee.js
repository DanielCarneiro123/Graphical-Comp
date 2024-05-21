import { CGFobject } from "../../../lib/CGF.js";
import { MyHead } from "./head/MyHead.js";
import { MyThorax } from "./thorax/MyThorax.js";
import { MyAbdomen } from "./MyAbdomen.js";
import { MyAnimation } from "../../animation/MyAnimation.js";
import { MyMovement } from "../../animation/MyMovement.js";


export class MyBee extends CGFobject {
  constructor(scene, x, y, z, flowers) {
    super(scene);
    this.scale = 1;
    this.wingAngle = Math.PI / 8;
    this.thorax = new MyThorax(this.scene, this.wingAngle);
    this.head = new MyHead(this.scene);
    this.abdomen = new MyAbdomen(this.scene);
    this.speed = 0;
    this.orientation = 0;
    this.position = {x: x, y: y, z: z};
    this.defaultPosition = {x: x, y: y, z: z};
    this.movement = new MyMovement(-0.5, 0.5, 0.5, true, true);
    this.slack = 10;
    this.lastSpeedFactor = 1;
    this.flowers = flowers;
    this.targetY = null;
    this.movingY = false;
    this.descendingSpeed = 0.5;
  }

  display() {
    this.scene.pushMatrix();
      this.scene.translate(this.position.x, -this.position.y, this.position.z);
      this.scene.rotate(this.orientation, 0, 1, 0);
      this.scene.scale(this.scale, this.scale, this.scale);
      this.head.display();
      this.abdomen.display();
      this.thorax.display(this.wingAngle);
    this.scene.popMatrix();
  }

  

  update(elapsedTime, scaleFactor, speedFactor) {
    this.scale = scaleFactor;
    this.pressKeys(speedFactor / 5, elapsedTime);

    if (speedFactor !== this.lastSpeedFactor && this.speed !== 0) {
        this.speed += (speedFactor - this.lastSpeedFactor);
        this.lastSpeedFactor = speedFactor;
    }
    this.movement.update(elapsedTime, {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z,
        speed: this.speed,
        orientation: this.orientation,
        wingAngle: this.wingAngle
    }, this.movingY);

    this.updateParameters();
    if (this.targetY !== null) {
      if (this.position.y > this.targetY) {
        this.position.y -= this.descendingSpeed;
        if (this.position.y <= this.targetY) {
          this.position.y = this.targetY;
          this.targetY = null; 
        }
      }
    }
  }

  moveToFlowerHeight() {
    this.movingY = true;

    let closestFlower = this.findClosestFlower();

    if (closestFlower) {
      this.targetY = closestFlower.y;
      
    }
  }

  findClosestFlower() {
    let minDistance = Infinity;
    let closestFlower = null;

    for (let flower of this.flowers) {
      let dx = flower.x - this.position.x;
      let dz = flower.z - this.position.z;
      let distance = Math.sqrt(dx * dx + dz * dz);

      if (distance < minDistance) {
        minDistance = distance;
        closestFlower = flower;
      }
    }

    return closestFlower;
  }
  

  updateParameters() {
    this.position.y = this.movement.y
    this.position.x = this.movement.x
    this.position.z = this.movement.z
    this.wingAngle = this.movement.wingAngle
  }

  turn(v) {
    this.orientation += v
  }

  accelerate(v) {
      this.speed = Math.max(this.speed + v, 0)
  }

  reset() {
    this.speed = 0
    this.orientation = 0;
    this.position = {x: this.defaultPosition.x, y: this.defaultPosition.y, z: this.defaultPosition.z}
  }

  pressKeys(factor) {
    if (this.scene.gui.isKeyPressed("KeyW")) {
        this.accelerate(factor)
    }
    if (this.scene.gui.isKeyPressed("KeyS")) {
        this.accelerate(-factor)
    }
    if (this.scene.gui.isKeyPressed("KeyA")) {
        this.turn(factor)
    }
    if (this.scene.gui.isKeyPressed("KeyD")) {
        this.turn(-factor)
    }
    if (this.scene.gui.isKeyPressed("KeyR")) {
        this.reset()
    }
    if (this.scene.gui.isKeyPressed("KeyP")) {
        this.moveToFlowerHeight();
    }
  }
}
