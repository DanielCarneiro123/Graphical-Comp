import {CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyParallelogram } from "./MyParallelogram.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(scene);
        this.initMaterials();
	}

    initMaterials() {

        // this.diamond
        this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.setAmbient(0, 1, 0, 1.0);
        this.diamondMaterial.setDiffuse(0, 1, 0, 0)
        this.diamondMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.diamondMaterial.setShininess(10.0);

        // this.triangle purple
        this.trianglePurpleMaterial = new CGFappearance(this.scene);
        this.trianglePurpleMaterial.setAmbient(0, 1, 0, 1.0);
        this.trianglePurpleMaterial.setDiffuse(76 / 255, 0 / 255, 153 / 255, 0)
        this.trianglePurpleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.trianglePurpleMaterial.setShininess(10.0);

        // this.triangle pink
        this.trianglePinkMaterial = new CGFappearance(this.scene);
        this.trianglePinkMaterial.setAmbient(0, 1, 0, 1.0);
        this.trianglePinkMaterial.setDiffuse(255 / 255, 153 / 255, 204 / 255, 0);
        this.trianglePinkMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.trianglePinkMaterial.setShininess(10.0);

        // this.triangle orange
        this.triangleOrangeMaterial = new CGFappearance(this.scene);
        this.triangleOrangeMaterial.setAmbient(0, 1, 0, 1.0);
        this.triangleOrangeMaterial.setDiffuse(255 / 255, 128 / 255, 0 / 255, 0)
        this.triangleOrangeMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleOrangeMaterial.setShininess(10.0);

        // this.triangle blue
        this.triangleBlueMaterial = new CGFappearance(this.scene);
        this.triangleBlueMaterial.setAmbient(0, 1, 0, 1.0);
        this.triangleBlueMaterial.setDiffuse(0, 0, 1, 0)
        this.triangleBlueMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleBlueMaterial.setShininess(10.0);

        // this.triangle red
        this.triangleRedMaterial = new CGFappearance(this.scene);
        this.triangleRedMaterial.setAmbient(0, 1, 0, 1.0);
        this.triangleRedMaterial.setDiffuse(1, 0, 0, 0);
        this.triangleRedMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleRedMaterial.setShininess(10.0);        

        // this.paralellogram
        this.paralellogramMaterial = new CGFappearance(this.scene);
        this.paralellogramMaterial.setAmbient(0, 1, 0, 1.0);
        this.paralellogramMaterial.setDiffuse(1, 1, 0, 0);
        this.paralellogramMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.paralellogramMaterial.setShininess(10.0);
    }
	
	display() {

        /* Diamond */
        

        this.scene.setAmbient(0.0, 1.0, 0.0, 1.0);
        this.scene.setDiffuse(0.0, 1.0, 0.0, 1.0);

        /* Rotate 30 degrees around z */
        
        var deg2rad = Math.PI/180.0;
        var a_rad = 30.0 * deg2rad;
        var cos_a = Math.cos(a_rad);
        var sin_a = Math.sin(a_rad);
            
        var rotation = [
            cos_a, sin_a, 0.0, 0.0,
            -sin_a, cos_a, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0,
        ];

        /* Translate (-2.5, -2, 0) */
        var translation = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            -2.5, 2.0, 0.0, 1.0
        ]
        
        this.scene.pushMatrix();
        this.scene.multMatrix(translation);
        this.scene.multMatrix(rotation);
        //this.diamondMaterial.apply();
        this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        /* Blue triangle */

        this.scene.pushMatrix();

        this.scene.setAmbient(0.0, 0.6, 1.0, 1.0);
        this.scene.setDiffuse(0.0, 0.6, 1.0, 1.0);

        this.scene.translate(-2.8, -0.77, 0.0);
        var angle = 225.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.scale(1.5, 1.5, 1.0);
        this.triangle.display();

        this.scene.popMatrix();

        /* Orange triangle */

        this.scene.pushMatrix();

        this.scene.setAmbient(1.0, 0.6, 0.0, 1.0);
        this.scene.setDiffuse(1.0, 0.6, 0.0, 1.0);
        
        this.scene.translate(-1.2, -0.77, 0.0);
        var angle = 45.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.scale(1.5, 1.5, 1.0);
        this.triangle.display();

        this.scene.popMatrix();

        /* Pink triangle */

        this.scene.pushMatrix();

        this.scene.setAmbient(1.0, 0.6, 0.8, 1.0);
        this.scene.setDiffuse(1.0, 0.6, 0.8, 1.0);

        this.scene.translate(1.5, -0.77, 0.0);
        var angle = 225.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.triangle.display();

        this.scene.popMatrix();

        /* Red triangle */

        this.scene.pushMatrix();

        this.scene.setAmbient(1.0, 0.0, 0.0, 1.0);
        this.scene.setDiffuse(1.0, 0.0, 0.0, 1.0);

        this.scene.translate(1.1, 2.5, 0.0);
        var angle = 135.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.scale(0.6, 0.6, 1.0);
        this.triangle.display();

        this.scene.popMatrix();

        /* Purple triangle */ 

        this.scene.pushMatrix();

        this.scene.setAmbient(0.6, 0.3, 0.75, 1.0);
        this.scene.setDiffuse(0.6, 0.3, 0.75, 1.0);

        this.scene.translate(3.2, -0.77, 0.0);
        var angle = 45.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.scene.scale(0.6, 0.6, 1.0);
        this.triangle.display();

        this.scene.popMatrix();

        /* Parallelogram */ 

        this.scene.pushMatrix();

        this.scene.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.scene.setDiffuse(1.0, 1.0, 0.0, 1.0);
        
        this.scene.scale(-1.0, 1.0, 1.0);
        this.scene.translate(-0.1, -0.77, 0.0);
        var angle = 90.0 * deg2rad;
        this.scene.rotate(angle, 0.0, 0.0, 1.0);
        this.parallelogram.display();
        
        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.diamond.enableNormalViz()
        this.triangle.enableNormalViz()
        this.parallelogram.enableNormalViz()
    };

    disableNormalViz(){
        this.diamond.disableNormalViz()
        this.triangle.disableNormalViz()
        this.parallelogram.disableNormalViz()
    };
    
}

