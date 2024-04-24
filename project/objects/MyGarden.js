import { MyFlower } from './flower/MyFlower.js';
import { CGFobject } from '../../../lib/CGF.js';

export class MyGarden extends CGFobject{
    constructor(scene, numRows, numCols, leaf, stem, petalAppearances) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols;
        this.leafAppearance = leaf;
        this.stemAppearance = stem;
        this.petalAppearances = petalAppearances;
        this.createFlowers();
    }

    createFlowers() {
        this.flowers = [];
        for (let i = 0; i < this.numRows; i++) {
            this.flowers.push([]);
            for (let j = 0; j < this.numCols; j++) {
                const nrPetals = Math.floor(Math.random() * 10) + 5;
                const cylinderNumber = Math.round(Math.random() * 4) + 2 ;
                const corollaRadius = Math.random() * 2 + 1; 
                const receptacleRadius = Math.random(3, 7); 
                const stemRadius = Math.random() * 0.2 + 0.1; 
                const stemHeight = Math.random() * 3 + 4;
                const petalAngle = Math.random() * 40;
                const petalAppearance = this.petalAppearances[Math.floor(Math.random() * this.petalAppearances.length)];
                const minAngle = Math.random() * 30; 
                const maxAngle = minAngle + Math.random() * 20; 

                this.flowers[i].push(new MyFlower(
                    this.scene,
                    nrPetals,
                    cylinderNumber,
                    corollaRadius,
                    receptacleRadius,
                    stemRadius,
                    stemHeight,
                    petalAngle,
                    maxAngle,
                    minAngle,
                    this.leafAppearance,
                    this.stemAppearance,
                    this.scene.receptacleAppearance,
                    petalAppearance
                ));
            }
        }
    }

    display() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                this.scene.pushMatrix();
                    this.scene.translate(i * 2, 0, j * 2); 
                    this.flowers[i][j].display();
                this.scene.popMatrix();
            }
        }
    }
}
