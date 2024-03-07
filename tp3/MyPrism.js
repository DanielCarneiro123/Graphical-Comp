import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks){
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }   
	
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        let indexOffset = 0;
        var angle = (2 * Math.PI) / this.slices;

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
                x2, y2, 1
            );
            this.indices.push(
                indexOffset + 2, indexOffset + 1, indexOffset,
                indexOffset + 3, indexOffset + 4, indexOffset + 5
            );
            
            indexOffset += 6

            this.normals.push(
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
                0, 0, 1,
                0, 0, 1,
                0, 0 , 1
            )
        }

        for (let i = 0; i < this.slices; i++) {
            var x1 = Math.cos(i * angle); 
            var y1 = Math.sin(i * angle); 
            var x2 = Math.cos((i+1) * angle); 
            var y2 = Math.sin((i+1)  * angle); 
    
            let increment = 1 / this.stacks
            for (let j = 0 ; j < this.stacks ; j++) {
                let x = Math.cos((i+0.5)* angle);
                let y = Math.sin((i+0.5)*angle);
                let size = Math.sqrt(x*x + y*y);
    
                this.vertices.push(
                    x1, y1, increment * j,
                    x2, y2, increment * j,
                    x1, y1, increment * (j + 1),
                    x2, y2, increment * (j + 1)
                );
    
                this.indices.push(
                    indexOffset + 2, indexOffset, indexOffset + 1,
                    indexOffset + 1, indexOffset + 3, indexOffset + 2
                );
    
                this.normals.push(
                    x/size, y/size, 0,
                    x/size, y/size, 0,
                    x/size, y/size, 0,
                    x/size, y/size, 0
                );
    
                indexOffset += 4; 
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
}