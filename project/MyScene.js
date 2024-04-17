import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./polygons/MyPlane.js";
import { MySphere } from "./polygons/MySphere.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyFlower } from "./objects/flower/MyFlower.js";
import { MyGarden } from "./objects/MyGarden.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.terrain = new CGFtexture(this, "images/terrain.jpg");
    this.earth = new CGFtexture(this, "images/earth.jpg");
    this.panoramaImage = new CGFtexture(this, "images/panorama4.jpg");
    this.stem = new CGFtexture(this, "images/stem2.png");
    this.leaf = new CGFtexture(this, "images/leaf.jpg");
    this.whitePetal = new CGFtexture(this, "images/whitepetal.jpg");
    this.bluePetal = new CGFtexture(this, "images/bluepetal.jpg");
    this.redPetal = new CGFtexture(this, "images/redpetal.jpg");
    this.pinkPetal = new CGFtexture(this, "images/petal.jpg");


    this.terrainAppearance = new CGFappearance(this);
    this.terrainAppearance.setTexture(this.terrain);
    this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.earthAppearance = new CGFappearance(this);
    this.earthAppearance.setTexture(this.earth);
    this.earthAppearance.setTextureWrap('REPEAT', 'REPEAT');

    //Initialize scene objects
    this.axis = new CGFaxis(this);

    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 50, 50);
    this.panorama = new MyPanorama(this, this.panoramaImage)
    this.flower = new MyFlower(this, 10, 2.5, 1.2, 0.15, 4, [1, 0, 0], [0, 0, 1], [0, 1, 0], 40, 20, 10);
    this.garden = new MyGarden(this, 5, 5);
    
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;
    this.displayInfinitePanorama = false;
    this.scaleFactor = 1;

    // display
    this.displayFlower = false;
    this.displayGarden = false;
    this.displayTerrain = false;
    this.displayEarth = false;

    // garden
    this.gardenRows = 5;
    this.gardenCols = 5;
    this.displayFlower = false;


    this.enableTextures(true);

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.5,
      0.1,
      1000,
      vec3.fromValues(5, 5, 5),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  updateGarden() {
    this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
  }

  onSelectedObjectChanged() {

  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.panorama.display();


    if (this.displayTerrain) {
      this.pushMatrix();
      this.terrainAppearance.apply();
      this.translate(0,-100,0);
      this.scale(400,400,400);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.plane.display();
      this.popMatrix();
    }
    

    if (this.displayEarth) {
      this.pushMatrix();
      this.earthAppearance.apply();
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      this.sphere.display();
      this.popMatrix();
    }


    if (this.displayFlower) {
      this.pushMatrix();
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      this.flower.display();
      this.popMatrix();
    }

    if (this.displayGarden) {
      this.garden.display();
    }
    

    if (this.displayNormals)
      this.sphere.enableNormalViz();
    else
      this.sphere.disableNormalViz();

    // ---- END Primitive drawing section
  }
}
