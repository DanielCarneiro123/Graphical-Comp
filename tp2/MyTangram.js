import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
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
        this.diamond.display();
        this.scene.popMatrix();

        /* Blue triangle */

        this.scene.pushMatrix();

        this.scene.setAmbient(0.0, 0.6, 1.0, 1.0);
        this.scene.setDiffuse(0.0, 0.6, 1.0, 1.0);

        this.scene.translate(-2.8, -0.77, 0.0);
        var angle = 225.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.scale(1.5, 1.5, 1.0)
        this.triangle.display();

        this.scene.popMatrix();

        /* Orange triangle */

        this.scene.pushMatrix();

        this.scene.setAmbient(1.0, 0.6, 0.0, 1.0);
        this.scene.setDiffuse(1.0, 0.6, 0.0, 1.0);
        
        this.scene.translate(-1.2, -0.77, 0.0);
        var angle = 45.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.scale(1.5, 1.5, 1.0);
        this.triangle.display();

        this.scene.popMatrix();

        /* Pink triangle */

        this.scene.pushMatrix();

        this.scene.setAmbient(1.0, 0.6, 0.8, 1.0);
        this.scene.setDiffuse(1.0, 0.6, 0.8, 1.0);

        this.scene.translate(1.5, -0.77, 0.0);
        var angle = 225.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.triangle.display();

        this.scene.popMatrix();

        /* Red triangle */

        this.scene.pushMatrix();

        this.scene.setAmbient(1.0, 0.0, 0.0, 1.0);
        this.scene.setDiffuse(1.0, 0.0, 0.0, 1.0);

        this.scene.translate(1.1, 2.5, 0.0);
        var angle = 135.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.scale(0.6, 0.6, 1.0);
        this.triangle.display();

        this.scene.popMatrix();

        /* Purple triangle */ 

        this.scene.pushMatrix();

        this.scene.setAmbient(0.6, 0.3, 0.75, 1.0);
        this.scene.setDiffuse(0.6, 0.3, 0.75, 1.0);

        this.scene.translate(3.2, -0.77, 0.0);
        var angle = 45.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.scale(0.6, 0.6, 1.0);
        this.triangle.display();

        this.scene.popMatrix();

        /* Parallelogram */ 

        this.scene.pushMatrix();

        this.scene.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.scene.setDiffuse(1.0, 1.0, 0.0, 1.0);
        
        this.scene.scale(-1.0, 1.0, 1.0);
        this.scene.translate(-0.1, -0.77, 0.0);
        var angle = 90.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.parallelogram.display();
        
        this.scene.popMatrix();
    }
}

