import { CGFobject, CGFappearance, CGFtexture } from "../../../../lib/CGF.js";
import { MySphere } from "../../../polygons/MySphere.js";
import { MyWing } from "./MyWing.js";
import { MyFrontLeg } from "./legs/MyFrontLeg.js";
import { MyMiddleLeg } from "./legs/MyMiddleLeg.js";
import { MyHindLeg } from "./legs/MyHindLeg.js";

export class MyThorax extends CGFobject {
  constructor(scene) {
    super(scene);

    this.sphere = new MySphere(this.scene, 50, 50);
    this.wing = new MyWing(this.scene);
    this.frontleg = new MyFrontLeg(this.scene);
    this.middleleg = new MyMiddleLeg(this.scene);
    this.hindleg = new MyHindLeg(this.scene);
    
    this.thoraxTexture = new CGFappearance(this.scene);
    this.thoraxTexture.setTexture(new CGFtexture(this.scene, "images/bee.jpg"));
    this.thoraxTexture.setAmbient(1, 1, 0, 1);
    this.thoraxTexture.setDiffuse(1, 1, 0, 1);
    this.thoraxTexture.setSpecular(1, 1, 0, 1); 
    this.thoraxTexture.setTextureWrap('REPEAT', 'REPEAT');

    this.legTexture = new CGFtexture(this.scene, "images/leg.png");
    this.leg = new CGFappearance(this.scene);
    this.leg.setTexture(this.legTexture);
    this.leg.setTextureWrap('REPEAT', 'REPEAT');

    this.wingTexture = new CGFappearance(this.scene);
    this.wingTexture.setAmbient(1.0, 1.0, 1.0, 0.05);
    this.wingTexture.setDiffuse(1.0, 1.0, 1.0, 0.0);
    this.wingTexture.setSpecular(1.0, 1.0, 1.0, 0.0);
    this.wingTexture.setEmission(0.0, 0.0, 0.0, 0.0);
    this.wingTexture.setTexture(new CGFtexture(this.scene, "images/wing.jpeg"));
  }

  display() {

    this.scene.pushMatrix();
        this.thoraxTexture.apply();
        this.scene.translate(1.8, 0, 0);

        this.scene.rotate(Math.PI / 2, 0, 0, 1);

        this.scene.scale(0.8, 1.1, 0.8);
        this.sphere.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
        this.leg.apply();
        this.scene.translate(1.3, -0.7, 0.2);
        this.scene.rotate(Math.PI / 6, 0, 1, 0);
        this.frontleg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(1.3, -0.7, -0.2);
        this.scene.rotate(11 * Math.PI / 6, 0, 1, 0);
        this.frontleg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(1.8, -0.65, 0.3);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.middleleg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(1.8, -0.65, -0.3);
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0);
        this.middleleg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(2.3, -0.5, 0.3);
        this.scene.rotate(3 * Math.PI / 4, 0, 1, 0);
        this.hindleg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(2.3, -0.5, -0.3);
        this.scene.rotate(5 * Math.PI / 4, 0, 1, 0);
        this.hindleg.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
        this.wingTexture.apply();
        this.scene.translate(1.3, 0, 0);
        this.scene.pushMatrix();
            this.scene.rotate(- Math.PI +  Math.PI / 2.5, 1, 0, 0);
            this.scene.translate(0, -0.6, 0);
            this.scene.scale(1, -1, 1);
            this.wing.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
            this.scene.rotate(- Math.PI / 2.5, 1, 0, 0);
            this.scene.translate(0, 0.6, 0);
            this.wing.display();
        this.scene.popMatrix();
    this.scene.popMatrix();
  }
}
