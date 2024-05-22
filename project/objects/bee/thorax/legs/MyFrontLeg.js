import { CGFobject, CGFappearance } from "../../../../../lib/CGF.js";
import { MySphere } from "../../../../polygons/MySphere.js";

export class MyFrontLeg extends CGFobject {
  constructor(scene) {
    super(scene);
    this.sphere = new MySphere(this.scene, 5, 5);
  }

  display() {

    this.scene.pushMatrix();
        this.scene.translate(0, -0.3, 0);
        this.scene.pushMatrix();
            this.scene.scale(0.1, 0.3, 0.1);
            this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, -0.3, 0);
            this.scene.rotate(-Math.PI / 6, 0, 0, 1);
            this.scene.scale(0.4, 0.1, 0.1);
            this.scene.translate(-1, 0, 0);
            this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-0.9, -0.4, 0);
            this.scene.rotate(Math.PI / 3, 0, 0, 1);
            this.scene.scale(0.6, 0.1, 0.1);
            this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-1.2, -0.95, 0.05);
            this.scene.rotate(-Math.PI / 6, 1, 0, 0);
            this.scene.scale(0.05, 0.1, 0.05);
            this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
          this.scene.translate(-1.2, -0.95, -0.05);
          this.scene.rotate(Math.PI / 6, 1, 0, 0);
          this.scene.scale(0.05, 0.1, 0.05);
          this.sphere.display();
      this.scene.popMatrix();

    this.scene.popMatrix();

  }
}
