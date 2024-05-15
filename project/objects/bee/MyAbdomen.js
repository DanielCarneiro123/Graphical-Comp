import { CGFobject, CGFappearance, CGFtexture } from "../../../lib/CGF.js";
import { MySphere } from "../../polygons/MySphere.js";

export class MyAbdomen extends CGFobject {
  constructor(scene) {
    super(scene);

    this.sphere = new MySphere(this.scene, 50, 50);

    this.abdomenTexture = new CGFappearance(this.scene);
    this.abdomenTexture.setTexture(new CGFtexture(this.scene, "images/bee.jpg"));
    this.abdomenTexture.setTextureWrap('REPEAT', 'REPEAT');
    this.abdomenTexture.setAmbient(1, 1, 0, 1);
    this.abdomenTexture.setDiffuse(1, 1, 0, 1);
    this.abdomenTexture.setSpecular(1, 1, 0, 1); 

  }

  display() {
    this.scene.pushMatrix();
        this.abdomenTexture.apply();
        this.scene.translate(4.6, -0.9, 0);
        this.scene.rotate(Math.PI / 3, 0, 0, 1);
        this.scene.scale(1, 2, 1.2);
        this.sphere.display();
    this.scene.popMatrix();
  }
}