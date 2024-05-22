import { CGFobject, CGFappearance } from "../../../../lib/CGF.js";
import { MyCircle } from "../../../polygons/MyCircle.js";

export class MyWing extends CGFobject {
  constructor(scene) {
    super(scene);
    this.circle = new MyCircle(this.scene, 1, 20);
  }

  display() {
    this.scene.pushMatrix();
        this.scene.pushMatrix();
            this.scene.translate(0, 2, 0);
            this.scene.scale(0.6, 2, 1);
            this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(1.0, 1.5, 0);
            this.scene.scale(0.6, 1.5, 1);
            this.circle.display();
        this.scene.popMatrix();
    this.scene.popMatrix();
  }
}
