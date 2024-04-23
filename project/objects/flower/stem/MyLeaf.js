import { CGFobject } from '../../../../lib/CGF.js';
import { MyCylinder } from "../../../polygons/MyCylinder.js";
import { MyTriangle } from '../../../polygons/MyTriangle.js';

export class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);
        this.triangle = new MyTriangle(this.scene);
        this.cylinder = new MyCylinder(this.scene, 6, 1);
    }   

    display() {        
        this.scene.pushMatrix();
            this.scene.scale(0.1, 4, 0.1);
            this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.rotate(Math.PI, 1, 0, 0);
            this.scene.scale(3, 4, 1);
            this.scene.translate(0, -1, 0);
            this.triangle.display();    
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 4, 0);
            this.scene.rotate(Math.PI / 2.4, 1, 0, 0);
            this.scene.scale(3, 3, 1);
            this.triangle.display();    
        this.scene.popMatrix();

    }
   
}