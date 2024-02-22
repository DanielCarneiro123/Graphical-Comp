import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
	}
	
	display() {
        var deg2rad = Math.PI/180.0;
        var a_rad=30.0*deg2rad;
        var cos_a = Math.cos(a_rad);
        var sin_a = Math.sin(a_rad);
            
        var rotation = [
            cos_a, sin_a, 0.0, 0.0,
            -sin_a, cos_a, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];
        this.scene.pushMatrix();
        this.scene.multMatrix(rotation);
        this.diamond.display();
        this.scene.popMatrix();
    }
}

