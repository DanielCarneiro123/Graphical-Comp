import { CGFobject, CGFappearance } from '../../../../lib/CGF.js';
import { MyCircle } from "../../../polygons/MyCircle.js";

export class MyReceptacle extends CGFobject {
    constructor(scene, radius) {
        super(scene)
        this.radius = radius
        this.circle = new MyCircle(this.scene, radius, 50)
    }

    display() {
        this.scene.pushMatrix()
        this.circle.display()
        this.scene.popMatrix()
    }
}