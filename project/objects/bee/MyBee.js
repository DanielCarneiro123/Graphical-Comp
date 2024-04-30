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
    this.scale = 1;
    this.wingAngle = Math.PI / 8;
    this.thorax = new MyThorax(this.scene, this.wingAngle);
    this.head = new MyHead(this.scene);
    this.abdomen = new MyAbdomen(this.scene);
    this.speed = 0;
    this.orientation = 0;
    this.position = {x: x, y: y, z: z};
    this.defaultPosition = {x: x, y: y, z: z};
    this.movement = new MyMovement(-0.25, 0.25, 1, true, true);

    this.slack = 10;
    this.lastSpeedFactor = 1;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(this.position.x, this.position.y, this.position.z);
    this.scene.rotate(this.orientation, 0, 1, 0);
    this.scene.scale(this.scale, this.scale, this.scale);
    this.head.display();
    this.thorax.display(this.wingAngle);
    this.abdomen.display();
    this.scene.popMatrix();
  }

  

  update(elapsedTime, scaleFactor, speedFactor) {

    this.scale = scaleFactor;
    //this.handleKeys(speedFactor/5, elapsedTime);

    if (speedFactor !== this.lastSpeedFactor && this.speed != 0) {
        this.speed += (speedFactor - this.lastSpeedFactor);
        this.lastSpeedFactor = speedFactor;
    }

    this.movement.update(elapsedTime, {x: this.position.x, y: this.position.y, z: this.position.z, speed: this.speed, orientation: this.orientation, wingAngle: this.wingAngle})

    this.updateParams()
  }

  updateParams() {
    this.position.y = this.movement.y
    this.position.x = this.movement.x
    this.position.z = this.movement.z
    this.wingAngle = this.movement.wingAngle
  }
}
