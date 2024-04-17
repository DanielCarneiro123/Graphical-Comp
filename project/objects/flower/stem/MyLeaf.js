import {CGFobject, CGFappearance} from '../../../../lib/CGF.js';
import { MyCylinder } from "../../../polygons/MyCylinder.js";
import { MyTriangle } from '../../../polygons/MyTriangle.js';

export class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);
        this.triangle = new MyTriangle(this.scene);
        this.cylinder = new MyCylinder(this.scene, 20, 1);
    }   


    display() {        
        this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
            this.scene.scale(0.05, 1.2, 0.05);
            this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/2, 0, 0, 1);
            this.scene.scale(0.7, 1, 1);
            this.scene.translate(0, 0.4, 0);
            this.triangle.display();    
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.scene.scale(0.7, 0.5, 1);
            this.scene.translate(0, -0.8, 0);
            this.triangle.display();    
        this.scene.popMatrix();

    }
   
}