import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from "./MySphere.js";

export class MyReceptacle extends CGFobject {
    constructor(scene, radius) {
        super(scene)
        this.radius = radius
        this.sphere = new MySphere(this.scene, 40, 40, radius)
    }

    display() {
        this.scene.pushMatrix()
        this.scene.scale(1.0, 1.0, 0.8)
        this.sphere.display()
        this.scene.popMatrix()
    }
}