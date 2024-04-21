import {CGFobject} from '../../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, radius = 1, panorama = false) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.panorama = panorama ? -1 : 1;
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
            this.vertices.push(0, this.radius, 0);
            this.normals.push(0, this.panorama, 0);
            this.texCoords.push(i / this.slices, 0);

            for (let j = 1; j < 2 * this.stacks; j++) {
                
                let polarAngle = j * polarStep;
                let azumithAngle = (i % this.slices) * azumithStep;

                let z = Math.sin(polarAngle) * Math.cos(azumithAngle);
                let x = Math.sin(polarAngle) * Math.sin(azumithAngle);
                let y = Math.cos(polarAngle);

                
                let modificationFactor = 0.1; // Ajuste conforme necessário
                let modifiedX = x + (x * modificationFactor);
                let modifiedY = y + (y * modificationFactor);
                let modifiedZ = z + (z * modificationFactor);
                
                this.vertices.push(this.radius * modifiedX, this.radius * modifiedY, this.radius * modifiedZ);
                this.normals.push(this.panorama * x, this.panorama * y, this.panorama * z);
                this.texCoords.push(i / this.slices, j / (2 * this.stacks));
            }

            /* South Pole */
            this.vertices.push(0, -1 * this.radius, 0);
            this.normals.push(0, -1 * this.panorama, 0);
            this.texCoords.push(i / this.slices, 1);
        }


        /* Indices */
        let offset = (2 * this.stacks) + 1; 
        let indexA, indexB, indexC, indexD;

        for (let i = 1; i <= this.slices; i++) {

            // North Pole Triangles
            indexA = i * offset + 1; 
            indexB = (i - 1) * offset;
            indexC = indexB + 1; 
            if (this.panorama === -1) {
                this.indices.push(indexA, indexC, indexB);
            } else {
                this.indices.push(indexB, indexC, indexA);
            }

            // Quadrilaterals
            for (let j = 1; j < offset - 2; j++) { 
                indexA = i * offset + j;
                indexB = indexA + 1;
                indexC = indexA - offset;
                indexD = indexC + 1;
                if (this.panorama === -1) {
                    this.indices.push(indexB, indexC, indexA, indexB, indexD, indexC);
                } else {
                    this.indices.push(indexA, indexC, indexB, indexC, indexD, indexB);
                }
            } 

            // South Pole Triangles
            indexA = (i + 1) * offset - 2; 
            indexB = indexA + 1; 
            indexC = indexA - offset;
            if (this.panorama === -1) {
                this.indices.push(indexB, indexC, indexA);
            } else {
                this.indices.push(indexA, indexC, indexB);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
