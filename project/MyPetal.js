import {CGFobject} from '../lib/CGF.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene, radius) {
		super(scene);
		this.radius = radius;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,
            0.2 * this.radius, this.radius / 2, 0,
            - 0.2 * this.radius, this.radius / 2, 0,
            0,  this.radius, 0,
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            1, 2, 3,
            2, 1, 0, 
            3, 2, 1,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

