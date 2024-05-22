import { CGFobject } from "../../../../lib/CGF.js";
import { MySphere } from "../../../polygons/MySphere.js";

export class MyAntenna extends CGFobject {
  constructor(scene) {
    super(scene);
    this.sphere = new MySphere(this.scene, 5, 5);
  }

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 5, 0, 0, 1);
    this.scene.pushMatrix();
    this.scene.scale(0.05, 0.25, 0.05);
    this.scene.translate(0, 1, 0);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.rotate(Math.PI / 8, 1, 0, 0);
    this.scene.scale(0.05, 0.5, 0.05);
    this.scene.translate(0, 1, 0);
    this.sphere.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
  }
}
