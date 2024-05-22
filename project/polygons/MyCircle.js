import {CGFobject} from '../../lib/CGF.js';

export class MyCircle extends CGFobject {
	constructor(scene, radius, slices) {
		super(scene);
        this.radius = radius;
        this.slices = slices;
		this.initBuffers();
	}
	
	initBuffers() {
        
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let angle = 2 * Math.PI / this.slices;

        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0.5);

        for (let i = 0; i <= this.slices; i++) {
            this.vertices.push(this.radius * Math.cos(i * angle), this.radius * Math.sin(i * angle), 0);
            this.normals.push(0, 0, 1);
            this.texCoords.push(0.5 + 0.5 * Math.cos(i * angle), 0.5 - 0.5 * Math.sin(i * angle));
        }

        for (let i = 0; i <= this.slices; i++) {
            this.indices.push(i, i + 1, 0, 0, i + 1, i);
        }

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

