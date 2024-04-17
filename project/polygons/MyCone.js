import {CGFobject} from '../../lib/CGF.js';

export class MyCone extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let angle = 2 * Math.PI / this.slices;

        for (let i = 0; i <= this.slices; i++) {
            let x = Math.cos(i * angle);
            let z = Math.sin(i * angle);
            this.vertices.push(x, 1, z, 0, 0, 0);
            this.normals.push(0, 1, 0, 0, -1, 0);
            this.texCoords.push(1 / this.slices * i, 0, 1 / this.slices * i, 1);
        }

        for (let i = 0; i < this.slices * 2; i+=2) {
            let indexA = i;
            let indexB = i + 1;
            let indexC = i + 2;
            console.log("Indices", indexA, indexB, indexC)
            this.indices.push(indexB, indexA, indexC);
            
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
