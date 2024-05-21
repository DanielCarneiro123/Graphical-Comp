import { CGFobject } from '../../lib/CGF.js';

export class MySingleGrass extends CGFobject {
    constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [
            -0.9, 0, 0,
            0.9, 0, 0,
            -0.6, 3, 0,
            0.6, 3, 0,
            -0.3, 6, 0,
            0.3, 6, 0,
            0, 10, 0,
            -0.9, 0, 0,
            0.9, 0, 0,
            -0.6, 3, 0,
            0.6, 3, 0,
            -0.3, 6, 0,
            0.3, 6, 0,
            0, 10, 0,
        ];

        this.indices = [
            0, 1, 2,
            1, 3, 2,
            2, 3, 4,
            3, 5, 4,
            4, 5, 6,
            9, 8, 7,
            9, 10, 8,
            11, 10, 9,
            11, 12, 10,
            13, 12, 11
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ];

        this.texCoords = [
            0, 0,
            0, 1,
            0.3, 0,
            0.3, 1,
            0.6, 0,
            0.6, 1,
            1, 1,
            0, 0,
            0, 1,
            0.3, 0,
            0.3, 1,
            0.6, 0,
            0.6, 1,
            1, 1,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
