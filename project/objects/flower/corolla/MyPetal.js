import {CGFobject, CGFappearance} from '../../../../lib/CGF.js';
import { MyTriangle } from '../../../polygons/MyTriangle.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene, height, petalColor, rotateAngle) {
		super(scene);
		this.height = height;
		this.petalColor = petalColor;
		this.rotateAngle = rotateAngle * Math.PI / 180;
		this.triangle = new MyTriangle(this.scene);
	}
	
	display() {

		

		this.scene.pushMatrix();
			
			
			this.scene.scale(1, this.height / 2, 1);			
			this.scene.translate(0, this.height / 2, 0);

			// inner petal
			this.scene.pushMatrix();
				this.scene.scale(1, -1, 1);
				this.triangle.display();
			this.scene.popMatrix();

			// outer petal
			this.scene.pushMatrix();		
				this.scene.rotate(this.rotateAngle, 1, 0, 0);
				this.triangle.display();
			this.scene.popMatrix();
		this.scene.popMatrix();
	}
}

