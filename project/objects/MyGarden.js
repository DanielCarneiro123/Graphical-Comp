import { MyFlower } from './flower/MyFlower.js';
import { CGFobject, CGFappearance } from '../../../lib/CGF.js';

export class MyGarden extends CGFobject{
    constructor(scene, numRows, numCols) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols;
        this.flowers = [];

        this.createFlowers();
    }

    createFlowers() {
        for (let i = 0; i < this.numRows; i++) {
            this.flowers.push([]);
            for (let j = 0; j < this.numCols; j++) {
                const nrPetals = Math.floor(Math.random() * 10) + 5;
                const corollaRadius = Math.random() * 2 + 1; 
                const receptacleRadius = Math.random(3,7); 
                const stemRadius = Math.random() * 0.2 + 0.1; 
                const stemHeight = Math.random() * 6 + 4;
                const petalColor = [Math.random(), Math.random(), Math.random()];
                const receptacleColor = [Math.random(), Math.random(), Math.random()]; 
                const stemColor = [Math.random(), Math.random(), Math.random()]; 
                const petalAngle = Math.random() * Math.PI / 2; 
                const maxAngle = Math.random() * Math.PI / 4; 
                const minAngle = -Math.random() * Math.PI / 4; 

                this.flowers[i].push(new MyFlower(
                    this.scene,
                    nrPetals,
                    corollaRadius,
                    receptacleRadius,
                    stemRadius,
                    stemHeight,
                    petalColor,
                    receptacleColor,
                    stemColor,
                    petalAngle,
                    maxAngle,
                    minAngle
                ));
            }
        }
    }

    display() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                this.scene.pushMatrix();
                this.scene.translate(i * 10, 0, j * 10); 
                this.flowers[i][j].display();
                this.scene.popMatrix();
            }
        }
    }
}
