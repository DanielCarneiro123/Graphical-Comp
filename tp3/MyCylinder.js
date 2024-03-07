import {CGFobject} from '../lib/CGF.js';

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

        let angle = 2 * Math.PI / this.slices;
        let increment = 1 / (this.stacks)

       
        for (let i = 0; i <= this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                var x1 = Math.cos(j * angle); 
                var y1 = Math.sin(j * angle); 
                this.vertices.push(x1, y1, increment * i)
                this.normals.push(x1, y1, 0);
            }
        }

        
        for (let i = 0; i < this.stacks ; i++) {    
            var x = i * this.slices 
            var y = (i+1) * this.slices - 1
            var z = (i+1) * this.slices
            var w = (i+2) * this.slices - 1
            this.indices.push(
                z, y, x, 
                y, z, w
            )
            for (let j = 0; j < this.slices - 1; j++) {
                var a = i * this.slices + j
                var b = a + 1
                var c = (i+1) * this.slices + j
                var d = c + 1
                this.indices.push(
                    a, b, c,
                    d, c, b, 
                )
            }
        }

        let indexOffset = (this.stacks+1) * this.slices;
        console.log(indexOffset)
        for (let i = 0; i < this.slices; i++) {
            var x1 = Math.cos(i * angle); 
            var y1 = Math.sin(i * angle); 
            var x2 = Math.cos((i+1) * angle); 
            var y2 = Math.sin((i+1) * angle); 
            this.vertices.push(
                0, 0, 0,
                x1, y1, 0,
                x2, y2, 0,
                0, 0, 1,
                x1, y1, 1,
                x2, y2, 1,
            );
            this.indices.push(indexOffset+2, indexOffset + 1, indexOffset)
            indexOffset += 3
            this.indices.push(indexOffset, indexOffset + 1, indexOffset+2)
            indexOffset += 3

            this.normals.push(
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,

            )
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}