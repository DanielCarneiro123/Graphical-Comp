import { MyFlower } from './flower/MyFlower.js';
import { MyCircle } from '../polygons/MyCircle.js';
import { CGFobject, CGFappearance } from '../../../lib/CGF.js';

export class MyGarden extends CGFobject{
    constructor(scene, numRows, numCols, leaf, stem, petalAppearances, receptacleAppearances) {
        super(scene);
        this.numRows = numRows;
        this.numCols = numCols;

        this.leafAppearance = leaf;
        this.stemAppearance = stem;
        this.petalAppearances = petalAppearances;
        this.receptacleAppearances = receptacleAppearances;
        this.shadowAppearance = new CGFappearance(this.scene);
        this.shadowAppearance.setAmbient(0, 0, 0, 0.29);
        this.shadowAppearance.setDiffuse(0, 0, 0, 0);
        this.shadowAppearance.setSpecular(0, 0, 0, 0);
        this.shadowAppearance.setEmission(0, 0, 0, 0);

        this.flowerPositions = [];
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let x = (i * 4) + Math.random() * 3; 
                let z = (j * 4) + Math.random() * 3;
                this.flowerPositions.push({x: x, y: 0, z: z});
            }
        }
        this.createFlowers();

        this.absolutePositions = [];
        for (let i = 0; i < this.flowerPositions.length; i++) { 
            this.absolutePositions.push({
                x: this.flowerPositions[i].x * 6 - 80, 
                y: this.flowerPositions[i].y * 6, 
                z: this.flowerPositions[i].z * 6 - 120,
                flower : this.flowers[Math.floor(this.flowerPositions[i].x / 4)][Math.floor(this.flowerPositions[i].z / 4)]
            });
        }
        
    }

    createFlowers() {
        this.flowers = [];
        this.shadow = [];
        for (let i = 0; i < this.numRows; i++) {
            this.flowers.push([]);
            this.shadow.push([]);
            for (let j = 0; j < this.numCols; j++) {
                const nrPetals = Math.floor(Math.random() * 10) + 7;
                const cylinderNumber = Math.round(Math.random() * 4) + 3;
                const corollaRadius = Math.random() * 2 + 1.5; 
                const receptacleRadius = corollaRadius / 3; 
                const stemRadius = Math.random() * 0.1 + 0.1; 
                const stemHeight = corollaRadius * 1.75;
                const petalAngle = Math.random() * 30 + 20;
                const petalAppearance = this.petalAppearances[Math.floor(Math.random() * this.petalAppearances.length)];
                const receptacleAppearance = this.receptacleAppearances[Math.floor(Math.random() * this.receptacleAppearances.length)];
                const minAngle = Math.random() * 20 + 10; 
                const maxAngle = minAngle + 20; 

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
                    receptacleAppearance,
                    petalAppearance
                ));

                this.flowerPositions[i * this.numCols + j].y = stemHeight + corollaRadius * 0.5;
                this.shadow[i].push(new MyCircle(this.scene, receptacleRadius * 1.5, 20));
            }
        }
    }

    display() {
        for (let i = 0; i < this.flowerPositions.length; i++) {
            let pos = this.flowerPositions[i];
            this.scene.pushMatrix();
                this.scene.translate(pos.x, 0, pos.z);
                this.flowers[Math.floor(pos.x / 4)][Math.floor(pos.z / 4)].display(); 

                this.shadowAppearance.apply();
                this.scene.translate(0, 0.01, 0);
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.shadow[Math.floor(pos.x / 4)][Math.floor(pos.z / 4)].display();
                
            this.scene.popMatrix();
        }
    }
}
