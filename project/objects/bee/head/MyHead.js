import { CGFobject, CGFappearance, CGFtexture } from "../../../../lib/CGF.js";
import { MyAntenna } from "./MyAntenna.js";
import { MySphere } from "../../../polygons/MySphere.js";
import { MyTriangle } from "../../../polygons/MyTriangle.js";

export class MyHead extends CGFobject {
  constructor(scene) {
    super(scene);

    this.antenna = new MyAntenna(this.scene);
    this.sphere = new MySphere(this.scene, 20, 20);
    this.triangle = new MyTriangle(this.scene);
    this.eye = new CGFtexture(this.scene, "images/bee/eye.jpg");
    this.head = new CGFtexture(this.scene, "images/bee/head.jpg");

    this.initMaterials();
  }

  initMaterials() {
    this.gold = new CGFappearance(this.scene);
    this.gold.setAmbient(0.65, 0.4, 0, 1);
    this.gold.setDiffuse(0.65, 0.4, 0, 1);
    this.gold.setSpecular(0.7, 0.4, 0, 1);
    this.gold.setTexture(this.head);
    this.gold.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

    this.white = new CGFappearance(this.scene);
    this.white.setTexture(this.eye);
    this.white.setTextureWrap("REPEAT", "REPEAT");
    this.white.setAmbient(0.1, 0.1, 0.1, 1);
    this.white.setDiffuse(0.1, 0.1, 0.1, 1);
    this.white.setSpecular(0.1, 0.1, 0.1, 1);
    this.white.setShininess(0);

    this.black = new CGFappearance(this.scene);
    this.black.setAmbient(0.1, 0.1, 0.1, 1);
    this.black.setDiffuse(0.0, 0.0, 0.0, 1);
    this.black.setSpecular(0.0, 0.0, 0.0, 1);
    this.black.setShininess(10.0);
  }

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 10, 0, 0, 1);

    // Eyes
    this.scene.pushMatrix();
    this.white.apply();
    this.scene.scale(0.35, 0.55, 0.35);

    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 1.8);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, -1.8);
    this.sphere.display();
    this.scene.popMatrix();
    this.scene.popMatrix();

    // Head
    this.gold.apply();
    this.scene.scale(0.75, 1.0, 0.75);
    this.sphere.display();

    this.scene.popMatrix();

    // Antennas
    this.scene.pushMatrix();
    this.black.apply();
    this.scene.pushMatrix();
    this.scene.translate(-0.2, 0.6, -0.2);
    this.scene.rotate(-Math.PI / 4, 0, 1, 0);
    this.antenna.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.2, 0.6, 0.2);
    this.antenna.display();
    this.scene.popMatrix();

    // Mouth
    this.scene.pushMatrix();
    this.scene.translate(-0.45, -0.9, 0.1);
    this.scene.rotate(Math.PI / 4, 1, 0, 0);
    this.scene.scale(0.2, 0.15, 0.2);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.45, -0.9, -0.1);
    this.scene.rotate(-Math.PI / 4, 1, 0, 0);
    this.scene.scale(0.2, 0.15, 0.2);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
