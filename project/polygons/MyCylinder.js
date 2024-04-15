import {CGFobject} from '../../lib/CGF.js';

export class MyCylinder extends CGFobject {
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

        let angle = 2 * Math.PI / this.slices;
        let increment = 1 / (this.stacks)

        // vertices, normals and texCoords
        for (let i = 0; i <= this.slices; i++) {
            for (let j = 0; j <= this.stacks; j++) {
                let x = Math.cos(i * angle); 
                let z = Math.sin(i * angle); 
                this.vertices.push(x, j * increment, z)
                this.normals.push(x, 0, z);
                this.texCoords.push(i / this.slices, j * increment)
            } 
        }
       
        // lateral surface
        for (let i = 0; i < this.slices; i++) {
            for (let j = 0; j < this.stacks; j++) {
                let indexA = i * (this.stacks + 1) + j;
                let indexB = indexA + 1;
                let indexC = (i + 1) * (this.stacks + 1) + j;
                let indexD = indexC + 1;
                this.indices.push(indexA, indexB, indexC, indexB, indexD, indexC)
            }
        }
    
        increment = 1 + this.stacks

        // lower base

        this.vertices.push(0, 0, 0)
        this.normals.push(0, -1, 0)
        const base = (this.slices + 1) * (this.stacks + 1) 
       
        for (let i = 0; i < this.slices; i++) {
            let indexA = i * increment;
            let indexB = indexA + increment;
            this.indices.push(base, indexA, indexB)
        }
        
        // upper base
        this.vertices.push(0, 1, 0)
        this.normals.push(0, 1, 0)
        for (let i = 0; i < this.slices; i++) {
            let indexA = i * increment + this.stacks;
            let indexB = indexA + increment;
            this.indices.push(base + 1, indexB, indexA)
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

