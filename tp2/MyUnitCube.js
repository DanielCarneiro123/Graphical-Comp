import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
 	initBuffers() {
		this.vertices = [
            0.5, -0.5, -0.5,    //Point A0
            0.5, 0.5, -0.5,     //Point B1
            -0.5, 0.5, -0.5,    //Point C2
            -0.5, -0.5, -0.5,   //Point D3
            0.5, -0.5, 0.5,     //Point E4
            0.5, 0.5, 0.5,      //Point F5
            -0.5, 0.5, 0.5,     //Point G6
            -0.5, -0.5, 0.5,    //Point H7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // FACE ABCD
            3, 1, 0,
            3, 2, 1,

            // FACE EFGH 
            4, 5, 7,
            5, 6, 7,

            // FACE CDGH
            7, 2, 3,
            7, 6, 2,

            // FACE ABEF
            0, 1, 4, 
            1, 5, 4,

            // FACE BCFG
            1, 2, 5,
            2, 6, 5, 

            // FACE ADEH
            3, 0, 7, 
            0, 4, 7
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	
}

