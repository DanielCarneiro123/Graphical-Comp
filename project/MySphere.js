import {CGFobject} from '../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }   

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let polarStep = (Math.PI / 2) / this.stacks;
        let azumithStep = (2 * Math.PI) / this.slices;
        
        /* Vertices, normals and texCoords */
        for (let i = 0; i <= this.slices; i++) {

            /* North Pole */
            this.vertices.push(0, 1, 0);
            this.normals.push(0, 1, 0);
            this.texCoords.push(i / this.slices, 0);

            for (let j = 1; j < 2 * this.stacks; j++) {
                
                let polarAngle = j * polarStep;
                let azumithAngle = (i % this.slices) * azumithStep;

                let z = Math.sin(polarAngle) * Math.cos(azumithAngle);
                let x = Math.sin(polarAngle) * Math.sin(azumithAngle);
                let y = Math.cos(polarAngle);
                
                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(i / this.slices, j / (2 * this.stacks));
            }

            /* South Pole */
            this.vertices.push(0, -1, 0);
            this.normals.push(0, -1, 0);
            this.texCoords.push(i / this.slices, 1);
        }

        /* Indices */
        let offset = (2 * this.stacks) + 1; 
        console.log(offset)  
        for (let i = 1; i <= this.slices; i++) {
            for (let j = 0; j < offset - 1; j++) {
                let indexA = i * offset + j;
                let indexB = indexA + 1;
                let indexC = indexA - offset;
                let indexD = indexC + 1;
                this.indices.push(indexA, indexC, indexB, indexC, indexD, indexB);
            } 
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
