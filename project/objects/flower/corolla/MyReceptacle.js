import { CGFobject, CGFappearance } from '../../../../lib/CGF.js';
import { MyCircle } from "../../../polygons/MyCircle.js";

export class MyReceptacle extends CGFobject {
    constructor(scene, radius) {
        super(scene)
        this.radius = radius
        this.circle = new MyCircle(this.scene, radius, 50)
        this.initMaterials()
    }

    initMaterials() {
        this.receptacleMaterial = new CGFappearance(this.scene);
        this.receptacleMaterial.setAmbient(1.0, 1.0, 0.0, 1);
        this.receptacleMaterial.setDiffuse(1.0, 1.0, 0.0, 1);
        this.receptacleMaterial.setSpecular(1.0, 1.0, 0.0, 1);
        this.receptacleMaterial.setShininess(10.0);
        this.receptacleMaterial.loadTexture('images/receptacle.jpg');
        this.receptacleMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.pushMatrix()
        this.receptacleMaterial.apply()
        this.circle.display()
        this.scene.popMatrix()
    }
}