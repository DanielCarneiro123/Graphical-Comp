import { CGFobject, CGFappearance } from "../../../lib/CGF.js";
import { MySphere } from "../../polygons/MySphere.js";

export class MyAbdomen extends CGFobject {
  constructor(scene) {
    super(scene);

    this.sphere = new MySphere(this.scene, 50, 50);

    this.gold = new CGFappearance(this.scene);
    this.gold.setAmbient(0.9, 0.9, 0.1, 1);
    this.gold.setDiffuse(0.9, 0.9, 0.1, 1);
    this.gold.setSpecular(0.0, 0.0, 0.0, 1);

  }

  display() {
    this.scene.pushMatrix();
        this.gold.apply();
        this.scene.translate(4.9, -0.5, 0);
        this.scene.rotate(Math.PI / 3, 0, 0, 1);
        this.scene.scale(1, 2, 1.2);
        this.sphere.display();
    this.scene.popMatrix();
  }
}