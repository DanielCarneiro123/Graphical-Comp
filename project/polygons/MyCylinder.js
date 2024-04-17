import {CGFobject} from '../../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, topCenter = [0, 1, 0]) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.topCenter = topCenter;
        this.offsetX = topCenter[0];
        this.offsetZ = topCenter[2];
        this.initBuffers();
    }   

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let angle = 2 * Math.PI / this.slices;
        let increment_y = 1 / (this.stacks)
        let increment_x = this.offsetX / this.stacks;
        let increment_z = this.offsetZ / this.stacks;


        // vertices, normals and texCoords
        for (let i = 0; i <= this.slices; i++) {
            for (let j = 0; j <= this.stacks; j++) {
                let x = Math.cos(i * angle); 
                let z = Math.sin(i * angle); 
                this.vertices.push(x + j * increment_x, j * increment_y, z + j * increment_z)
                this.normals.push(x, 0, z)
                this.texCoords.push(i / this.slices, j * increment_y)

            } 
            console.log("\n\n\n")
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
    
        increment_y = 1 + this.stacks

        // lower base

        this.vertices.push(0, 0, 0, this.topCenter[0], this.topCenter[1], this.topCenter[2])
        this.normals.push(0, -1, 0, 0, 1, 0)
      
        const base = (this.slices + 1) * (this.stacks + 1) 

        for (let i = 0; i <= this.slices; i++) {
                let x = Math.cos(i * angle); 
                let z = Math.sin(i * angle); 
                this.vertices.push(
                    x, 0, z,
                    x + this.offsetZ * increment_x, 1, z + this.offsetZ * increment_z)
                this.normals.push(0, -1, 0, 0, 1, 0)
            }
        

        for (let i = 0; i < this.slices; i++) {
            let indexA = i * increment_y;
            let indexB = indexA + increment_y;
            this.indices.push(base, indexA, indexB)
        }
        
        // upper base
        for (let i = 0; i < this.slices; i++) {
            let indexA = i * increment_y + this.stacks;
            let indexB = indexA + increment_y;
            this.indices.push(base + 1, indexB, indexA)
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
