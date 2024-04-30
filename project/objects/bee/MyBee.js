import { CGFobject, CGFappearance } from "../../../lib/CGF.js";
import { MySphere } from "../../polygons/MySphere.js";
import { MyHead } from "./head/MyHead.js";
import { MyThorax } from "./thorax/MyThorax.js";
import { MyAbdomen } from "./MyAbdomen.js";
import { MyAnimation } from "../../animation/MyAnimation.js";
import { MyMovement } from "../../animation/MyMovement.js";


export class MyBee extends CGFobject {
  constructor(scene, x, y, z) {
    super(scene);
    this.x = x;
    this.y = y;
    this.z = z;
    this.thorax = new MyThorax(this.scene);
    this.head = new MyHead(this.scene);
    this.abdomen = new MyAbdomen(this.scene);

    this.speed = 0;
    this.position = {x: x, y: y, z: z};
    this.defaultPosition = {x: x, y: y, z: z};
    this.movement = new MyMovement(-0.25, 0.25, 1, true, true);
  }

  display() {
    this.head.display();
    this.thorax.display();
    this.abdomen.display();
  }

  update(elapsedTime, scaleFactor, speedFactor) {

    this.scale = scaleFactor;
    //this.handleKeys(speedFactor/5, elapsedTime);

    if (speedFactor !== this.lastSpeedFactor && this.speed != 0) {
        this.speed += (speedFactor - this.lastSpeedFactor);
        this.lastSpeedFactor = speedFactor;
    }

    this.movement.update(elapsedTime, {x: this.position.x, y: this.position.y, z: this.position.z, speed: this.speed})


    this.updateParams()
  }

  updateParams() {
    this.position.y = this.animatorMovement.y
    this.position.x = this.animatorMovement.x
    this.position.z = this.animatorMovement.z
}
}
