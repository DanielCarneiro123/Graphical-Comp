import {CGFobject} from '../lib/CGF.js';

export class MyStem extends CGFobject {
    constructor(scene, slices, radius = 1, height = 1) {
        super(scene);
        this.slices = slices;
        this.radius = radius;
        this.height = height;
        this.initBuffers();
    }   

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let angle = 2 * Math.PI / this.slices;

        for (let i = 0; i <= this.height; i++) {
            for (let j = 0; j < this.slices; j++) {
                let x = Math.cos(j * angle); 
                let z = Math.sin(j * angle); 
                this.vertices.push(x * this.radius, i, z * this.radius)
                this.normals.push(x, 0, z);
            }
        }

        
        for (let i = 0; i < this.height ; i++) {    
            var x = i * this.slices 
            var y = (i+1) * this.slices - 1
            var z = (i+1) * this.slices
            var w = (i+2) * this.slices - 1
            this.indices.push(
                x, y, z, 
                w, z, y
            )
            for (let j = 0; j < this.slices - 1; j++) {
                var a = i * this.slices + j
                var b = a + 1
                var c = (i+1) * this.slices + j
                var d = c + 1
                this.indices.push(
                    c, b, a,
                    b, c, d, 
                )
            }
        }

        let indexOffset = (this.height+1) * this.slices;
        for (let i = 0; i < this.slices; i++) {
            var x1 = Math.cos(i * angle) * this.radius; 
            var z1 = Math.sin(i * angle) * this.radius; 
            var x2 = Math.cos((i+1) * angle) * this.radius; 
            var z2 = Math.sin((i+1) * angle) * this.radius; 
            this.vertices.push(
                0, 0, 0,
                x1, 0, z1,
                x2, 0, z2,
                0, this.height, 0,
                x1, this.height, z1,
                x2, this.height, z2,
            );
            this.indices.push(indexOffset, indexOffset + 1, indexOffset+2)
            indexOffset += 3
            this.indices.push(indexOffset + 2, indexOffset + 1, indexOffset)
            indexOffset += 3

            this.normals.push(
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,

            )
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}