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
        }
        
        /* Rectangles */
        let offset = (2 * this.stacks - 1);   
        for (let i = 1; i <= this.slices; i++) {
            for (let j = 0; j < offset - 1; j++) {
                let indexA = i * offset + j;
                let indexB = indexA + 1;
                let indexC = indexA - offset;
                let indexD = indexC + 1;
                this.indices.push(indexA, indexC, indexB, indexC, indexD, indexB);
            } 
        }

        /* Poles */
        for (let i = 0; i <= this.slices; i++) {
            this.vertices.push(
                0, 1, 0,
                0, -1, 0
            );
            this.normals.push(
                0, 1, 0,
                0, -1, 0
            );
            this.texCoords.push(
                i / this.slices, 0, 
                i / this.slices, 1
            );           
        }

        let poleIndex = this.vertices.length / 3 - (this.slices + 1) * 2;
        for (let i = 0; i < this.slices; i++) {
            /* North Pole */
            let indexA = i * offset;
            let indexB = indexA + offset;
            this.indices.push(indexB, poleIndex, indexA);
            
            poleIndex ++;

            /* South Pole */
            indexA = (i + 1) * offset - 1;
            indexB = indexA + offset;
            this.indices.push(poleIndex, indexB, indexA);

            poleIndex ++;

        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
