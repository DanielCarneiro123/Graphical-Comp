import { CGFobject, CGFappearance } from "../../../../../lib/CGF.js";
import { MySphere } from "../../../../polygons/MySphere.js";

export class MyHindLeg extends CGFobject {
  constructor(scene) {
    super(scene);

    this.sphere = new MySphere(this.scene, 10, 10);
    this.black = new CGFappearance(this.scene);
    this.black.setAmbient(0, 0, 0, 1);
    this.black.setDiffuse(0, 0, 0, 1);
    this.black.setSpecular(0.0, 0.0, 0.0, 1);
  }

  display() {

    this.scene.pushMatrix();
        this.black.apply();
        this.scene.pushMatrix();
            this.scene.rotate(-Math.PI / 9, 0, 0, 1);
            this.scene.translate(0, -0.2, 0);
            this.scene.scale(0.1, 0.2, 0.1);
            this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.rotate(-Math.PI / 8, 0, 0, 1);
            this.scene.translate(0.05, -0.4, 0);
            this.scene.scale(0.4, 0.1, 0.1);
            this.scene.translate(-1, 0, 0);
            this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.rotate(-Math.PI / 10, 0, 0, 1);
            this.scene.translate(-0.75, -0.9, 0);
            this.scene.scale(0.1, 0.6, 0.1);
            this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-1.2, -1.2, 0.05);
            this.scene.rotate(-Math.PI / 6, 1, 0, 0);
            this.scene.scale(0.05, 0.1, 0.05);
            this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-1.2, -1.2, -0.05);
            this.scene.rotate(Math.PI / 6, 1, 0, 0);
            this.scene.scale(0.05, 0.1, 0.05);
            this.sphere.display();
        this.scene.popMatrix();

    this.scene.popMatrix();

  }
}
