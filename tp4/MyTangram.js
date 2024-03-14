import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyPurpleTriangle } from "./MyPurpleTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyBlueTriangle } from './MyBlueTriangle.js';
import { MyRedTriangle } from './MyRedTriangle.js';
import { MyPinkTriangle } from './MyPinkTriangle.js';
import { MyOrangeTriangle } from './MyOrangeTriangle.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.redTriangle = new MyRedTriangle(scene);
        this.purpleTriangle = new MyPurpleTriangle(scene);
        this.blueTriangle = new MyBlueTriangle(scene);
        this.orangeTriangle = new MyOrangeTriangle(scene);
        this.pinkTriangle = new MyPinkTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
	}
	
	display() {

        /* Diamond */

        /* Rotate 30 degrees around z */
        
        var deg2rad = Math.PI/180.0;
        var a_rad = 30.0 * deg2rad;
        var cos_a = Math.cos(a_rad);
        var sin_a = Math.sin(a_rad);
            
        var rotation = [
            cos_a, sin_a, 0.0, 0.0,
            -sin_a, cos_a, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];

        /* Translate (-2.5, -2, 0) */
        var translation = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            -2.5, 2.0, 0.0, 1.0
        ]
        
        this.scene.pushMatrix();
        this.scene.multMatrix(translation);
        this.scene.multMatrix(rotation);

        this.scene.diamondMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        /* Blue triangle */

        this.scene.pushMatrix();

        this.scene.translate(-2.8, -0.77, 0.0);
        var angle = 225.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.scale(1.5, 1.5, 1.0);
        this.blueTriangle.display();

        this.scene.popMatrix();

        /* Orange triangle */

        this.scene.pushMatrix();

         
        this.scene.translate(-1.2, -0.77, 0.0);
        var angle = 45.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.scale(1.5, 1.5, 1.0);
        this.orangeTriangle.display();

        this.scene.popMatrix();

        /* Pink triangle */

        this.scene.pushMatrix();

        this.scene.translate(1.5, -0.77, 0.0);
        var angle = 225.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.pinkTriangle.display();

        this.scene.popMatrix();

        /* Red triangle */

        this.scene.pushMatrix();

       

        this.scene.translate(1.1, 2.5, 0.0);
        var angle = 135.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.scale(0.6, 0.6, 1.0);
        this.redTriangle.display();

        this.scene.popMatrix();

        /* Purple triangle */ 

        this.scene.pushMatrix();

    
        this.scene.translate(3.2, -0.77, 0.0);
        var angle = 45.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.scale(0.6, 0.6, 1.0);
        this.purpleTriangle.display();

        this.scene.popMatrix();

        /* Parallelogram */ 

        this.scene.pushMatrix();

       
        this.scene.scale(-1.0, 1.0, 1.0);
        this.scene.translate(-0.1, -0.77, 0.0);
        var angle = 90.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.diamondMaterial.apply();
        this.parallelogram.display();
        
        this.scene.popMatrix();
    }
}

