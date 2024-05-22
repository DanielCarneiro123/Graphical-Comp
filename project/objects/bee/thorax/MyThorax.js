import { CGFobject, CGFappearance, CGFtexture } from "../../../../lib/CGF.js";
import { MySphere } from "../../../polygons/MySphere.js";
import { MyWing } from "./MyWing.js";
import { MyFrontLeg } from "./legs/MyFrontLeg.js";
import { MyMiddleLeg } from "./legs/MyMiddleLeg.js";
import { MyHindLeg } from "./legs/MyHindLeg.js";
import { MyPollen } from "../../flower/corolla/MyPollen.js";

export class MyThorax extends CGFobject {
  constructor(scene, wingAngle) {
    super(scene);
    this.wingAngle = wingAngle;

    this.sphere = new MySphere(this.scene, 20, 20);
    this.wing = new MyWing(this.scene, this.wingAngle);
    this.frontleg = new MyFrontLeg(this.scene);
    this.middleleg = new MyMiddleLeg(this.scene);
    this.hindleg = new MyHindLeg(this.scene);
    this.pollen = new MyPollen(this.scene);
    this.carryingPollen = false;

    this.initMaterials();
  }

  initMaterials() {
    this.thoraxTexture = new CGFappearance(this.scene);
    this.thoraxTexture.setTexture(new CGFtexture(this.scene, "images/bee/bee.jpg"));
    this.thoraxTexture.setAmbient(1, 1, 0, 1);
    this.thoraxTexture.setDiffuse(1, 1, 0, 1);
    this.thoraxTexture.setSpecular(1, 1, 0, 1);
    this.thoraxTexture.setEmission(1, 1, 1, 1);
    this.thoraxTexture.setTextureWrap("REPEAT", "REPEAT");

    this.legTexture = new CGFtexture(this.scene, "images/bee/leg.png");
    this.leg = new CGFappearance(this.scene);
    this.leg.setTexture(this.legTexture);
    this.leg.setTextureWrap("REPEAT", "REPEAT");

    this.wingTexture = new CGFappearance(this.scene);
    this.wingTexture.setAmbient(1.0, 1.0, 1.0, 0.05);
    this.wingTexture.setDiffuse(1.0, 1.0, 1.0, 0.0);
    this.wingTexture.setSpecular(1.0, 1.0, 1.0, 0.0);
    this.wingTexture.setEmission(0.0, 0.0, 0.0, 0.0);
    this.wingTexture.setTexture(new CGFtexture(this.scene, "images/bee/wing.jpeg"));
  }

  display(angle) {

    // Thorax
    this.scene.pushMatrix();
        this.thoraxTexture.apply();
        this.scene.translate(1.8, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.8, 1.1, 0.8);
        this.sphere.display();
    this.scene.popMatrix();

    // Fronts Legs
    this.scene.pushMatrix();
        this.leg.apply();
        this.scene.translate(1.3, -0.7, 0.2);
        this.scene.rotate(Math.PI / 6, 0, 1, 0);
        this.frontleg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(1.3, -0.7, -0.2);
        this.scene.rotate((11 * Math.PI) / 6, 0, 1, 0);
        this.frontleg.display();
    this.scene.popMatrix();

    // Middle Legs
    this.scene.pushMatrix();
        this.scene.translate(1.8, -0.65, 0.3);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.middleleg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(1.8, -0.65, -0.3);
        this.scene.rotate((3 * Math.PI) / 2, 0, 1, 0);
        this.middleleg.display();
    this.scene.popMatrix();

    // Hind Legs
    this.scene.pushMatrix();
        this.scene.translate(2.3, -0.5, 0.3);
        this.scene.rotate((3 * Math.PI) / 4, 0, 1, 0);
        this.hindleg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(2.3, -0.5, -0.3);
        this.scene.rotate((5 * Math.PI) / 4, 0, 1, 0);
        this.hindleg.display();
    this.scene.popMatrix();

    if (this.carryingPollen) {
        this.scene.pushMatrix();
        this.scene.scale(2.5, 2.5, 2.5);
        this.scene.translate(0.15, -0.7, 0);
        this.pollen.display();
        this.scene.popMatrix();
    }

    // Wings
    this.scene.pushMatrix();
        this.wingTexture.apply();
        this.scene.translate(1.3, 0, 0);
        this.scene.pushMatrix();
            this.scene.rotate(angle, 1, 0, 0);
            this.scene.rotate(Math.PI / 2.5, 1, 0, 0);
            this.scene.translate(0, 0.5, 0);
            this.wing.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
            this.scene.rotate(-angle, 1, 0, 0);
            this.scene.rotate(-Math.PI / 2.5, 1, 0, 0);
            this.scene.translate(0, 0.5, 0);
            this.wing.display();
        this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
