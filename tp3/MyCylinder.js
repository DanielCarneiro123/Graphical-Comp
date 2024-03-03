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


        for (let k = 0; k <= this.stacks; k++) {

            this.vertices.push(1, 0, k / this.stacks);
            this.normals.push(1, 0, 0);

        }

        for (let i = 1; i <= this.slices; i++) {
            let angle = 2 * Math.PI * i / this.slices;
            let x1 = Math.cos(angle);
            let y1 = Math.sin(angle);

            let size = Math.sqrt(x1*x1 + y1*y1);
            if (i != this.slices){
                
                this.vertices.push(x1, y1, 0);
                this.normals.push(x1 / size, y1 / size, 0);
            }
            for (let j = 1; j <= this.stacks; j++) {
                
                if (i != this.slices){
                    let z1 = j / this.stacks;
                    this.vertices.push(x1, y1, z1);
                    this.normals.push(x1 / size, y1 / size, 0);

                    let point = this.vertices.length / 3;
                    let indiceD = point - 1;
                    let indiceC = point - 2;
                    let indiceB = indiceD - (this.stacks + 1);
                    let indiceA = indiceB - 1;
                    this.indices.push(indiceA, indiceC, indiceD, indiceA, indiceD, indiceB);

                }
                else{
                    let point = this.vertices.length / 3;
                    let indiceD = j;
                    let indiceC = j - 1;
                    let indiceB = point - this.stacks - 1 + j;
                    let indiceA = indiceB - 1;
                    
                    this.indices.push(indiceA, indiceC, indiceD, indiceA, indiceD, indiceB);
                } 
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
