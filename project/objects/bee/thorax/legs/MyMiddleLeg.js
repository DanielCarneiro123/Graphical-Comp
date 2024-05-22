import { CGFobject } from "../../../../../lib/CGF.js";
import { MySphere } from "../../../../polygons/MySphere.js";

export class MyMiddleLeg extends CGFobject {
  constructor(scene) {
    super(scene);

    this.sphere = new MySphere(this.scene, 5, 5);
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, -0.2, 0);
    this.scene.pushMatrix();
    this.scene.scale(0.1, 0.2, 0.1);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -0.2, 0);
    this.scene.rotate(-Math.PI / 5, 0, 0, 1);
    this.scene.scale(0.25, 0.1, 0.1);
    this.scene.translate(-1, 0, 0);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.55, -0.45, 0);
    this.scene.rotate(-Math.PI / 10, 0, 0, 1);
    this.scene.scale(0.1, 0.6, 0.1);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.7, -1.05, 0.05);
    this.scene.rotate(-Math.PI / 6, 1, 0, 0);
    this.scene.scale(0.05, 0.1, 0.05);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.7, -1.05, -0.05);
    this.scene.rotate(Math.PI / 6, 1, 0, 0);
    this.scene.scale(0.05, 0.1, 0.05);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
