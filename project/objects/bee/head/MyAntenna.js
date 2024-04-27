import { CGFobject, CGFappearance } from "../../../../lib/CGF.js";
import { MySphere } from "../../../polygons/MySphere.js";

export class MyAntenna extends CGFobject {
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
        this.scene.rotate(Math.PI / 5, 0, 0, 1);
        this.scene.pushMatrix();
            this.scene.scale(0.05, 0.15, 0.05);
            this.scene.translate(0, 1, 0);
            this.sphere.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
            this.scene.translate(0, 0.3, 0);
            this.scene.rotate(Math.PI / 3, 0, 0, 1);
            this.scene.rotate(Math.PI / 8, 1, 0, 0);
            this.scene.scale(0.05, 0.3, 0.05);
            this.scene.translate(0, 1, 0);
            this.sphere.display();
        this.scene.popMatrix();
    this.scene.popMatrix();
  }
}
