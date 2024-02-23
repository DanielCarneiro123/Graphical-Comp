import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.quad = new MyQuad(scene);
	}
	
	display(){
        var deg2rad = Math.PI/180.0;
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        var angle = 180 * deg2rad;
        this.scene.rotate(angle, 0.0, 1.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);
        this.quad.display();
        this.scene.popMatrix();



        this.scene.pushMatrix();
        angle = 90.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 1.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        angle = 270.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 1.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        angle = 90.0 * deg2rad;
        this.scene.rotate(angle, 1.0, 0.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
        angle = 270.0 * deg2rad;
        this.scene.rotate(angle, 1.0, 0.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
    }
}

