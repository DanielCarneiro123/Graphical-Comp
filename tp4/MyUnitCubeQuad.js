import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, top, front, right, back, left, bottom) {
		super(scene);
        this.quad = new MyQuad(scene);
        this.top = top;
        this.front = front;
        this.right = right;
        this.back = back;
        this.left = left;
        this.bottom = bottom;
	}
	
	display(){

        /* front face */
        
        // transformations
        var deg2rad = Math.PI/180.0;
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.5);
        
        // texture
        this.front.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.quad.display();
        this.scene.popMatrix();


        /* back face */

        // transformations
        this.scene.pushMatrix();
        var angle = 180 * deg2rad;
        this.scene.rotate(angle, 0.0, 1.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);
        
        // texture
        this.back.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.quad.display();
        this.scene.popMatrix();


        /* right face */
      
        // transformations
        this.scene.pushMatrix();
        angle = 90.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 1.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);

        // texture
        this.right.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.quad.display();
        this.scene.popMatrix();
       
        
        /* left face */

        // transformations
        this.scene.pushMatrix();
        angle = 270.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 1.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);

        // texture
        this.left.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.quad.display();
        this.scene.popMatrix();
        

        /* bottom face */
        
        // transformations
        this.scene.pushMatrix();
        angle = 90.0 * deg2rad;
        this.scene.rotate(angle, 1.0, 0.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);

        // texture
        this.bottom.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.quad.display();
        this.scene.popMatrix();

        
        /* top face */
        
        // transformations
        this.scene.pushMatrix();
        angle = 270.0 * deg2rad;
        this.scene.rotate(angle, 1.0, 0.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);

        // texture
        this.top.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.quad.display();
        this.scene.popMatrix();
    }
}

