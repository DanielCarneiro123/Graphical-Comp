import { CGFobject } from '../../../../lib/CGF.js';
import { MyCircle } from "../../../polygons/MyCircle.js";

export class MyReceptacle extends CGFobject {
    constructor(scene, radius) {
        super(scene)
        this.circle = new MyCircle(this.scene, radius, 50)
    }

    display() {
        this.circle.display()
    }
}