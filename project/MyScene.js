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
    this.panoramaImage = new CGFtexture(this, "images/panorama1.jpg");
    this.stem = new CGFtexture(this, "images/stem4.jpg");
    this.leaf = new CGFtexture(this, "images/leaf.jpg");
    this.receptacle = new CGFtexture(this, "images/receptacle.jpg");
    
    this.initPetalTextures();

  

    this.terrainAppearance = new CGFappearance(this);
    this.terrainAppearance.setTexture(this.terrain);
    this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.earthAppearance = new CGFappearance(this);
    this.earthAppearance.setTexture(this.earth);
    this.earthAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.stemAppearance = new CGFappearance(this);
    this.stemAppearance.setTexture(this.stem);
    this.stemAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.leafAppearance = new CGFappearance(this);
    this.leafAppearance.setTexture(this.leaf);
    this.leafAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.receptacleAppearance = new CGFappearance(this);
    this.receptacleAppearance.setTexture(this.receptacle);
    this.receptacleAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.petalColors = [vec4.fromValues(189/255, 111/255, 110/255, 1), vec4.fromValues(1.0, 1.0, 0.0, 1), vec4.fromValues(199/255,110/255,44/255, 1), vec4.fromValues(1.0, 0.0, 0.0, 1)];

    this.receptacleColor = vec4.fromValues(1.0, 1.0, 0.0, 1);
    this.stemColor = vec4.fromValues(0.1, 1.0, 0.1, 1);
    this.leafColor = vec4.fromValues(0.25, 1.0, 0.25, 1);

    //Initialize scene objects
    this.axis = new CGFaxis(this);

    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 50, 50);
    this.panorama = new MyPanorama(this, this.panoramaImage);
    this.flower = new MyFlower(this, 10, 3.5, 2.5, 0.8, 0.15, 4, 30, 30, 20, this.leafAppearance, this.stemAppearance, this.receptacleAppearance, this.petalApperances[3]);
    this.garden = new MyGarden(this, 5, 5, this.leafAppearance, this.stemAppearance, this.petalApperances);
    
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;
    this.displayInfinitePanorama = false;
    this.scaleFactor = 1;

    // display
    this.displayFlower = true;
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
    this.lights[0].setPosition(15, 5, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

    this.lights[1].setPosition(-15, 5, 5, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();
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
    this.garden = new MyGarden(this, this.gardenRows, this.gardenCols, this.stemAppearance, this.leafAppearance);
  }

  onSelectedObjectChanged() {

  }

  initPetalTextures() {
    this.pinkPetal = new CGFtexture(this, "images/petals/pink.jpg");
    this.whitePetal = new CGFtexture(this, "images/petals/white.jpg");
    this.orangePetal = new CGFtexture(this, "images/petals/orange.jpg");
    this.redPetal = new CGFtexture(this, "images/petals/red.jpg");

    this.pinkPetalAppearance = new CGFappearance(this);
    this.pinkPetalAppearance.setTexture(this.pinkPetal);
    this.pinkPetalAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.pinkPetalAppearance.setAmbient(0.85, 0.62, 0.62, 1);
    this.pinkPetalAppearance.setDiffuse(0.85, 0.62, 0.62, 1);
    this.pinkPetalAppearance.setSpecular(0.85, 0.62, 0.62, 1);
    this.pinkPetalAppearance.setShininess(10.0);

    this.whitePetalAppearance = new CGFappearance(this);
    this.whitePetalAppearance.setTexture(this.whitePetal);
    this.whitePetalAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.whitePetalAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.whitePetalAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
    this.whitePetalAppearance.setSpecular(0.8, 0.8, 0.8, 1);
    this.whitePetalAppearance.setShininess(10.0);

    this.orangePetalAppearance = new CGFappearance(this); 
    this.orangePetalAppearance.setTexture(this.orangePetal);
    this.orangePetalAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.orangePetalAppearance.setAmbient(0.95, 0.8, 0.4, 1);
    this.orangePetalAppearance.setDiffuse(0.95, 0.8, 0.4, 1);
    this.orangePetalAppearance.setSpecular(0.95, 0.8, 0.4, 1);
    this.orangePetalAppearance.setShininess(10.0);

    this.redPetalAppearance = new CGFappearance(this);
    this.redPetalAppearance.setTexture(this.redPetal);
    this.redPetalAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.redPetalAppearance.setAmbient(0.9, 0.5, 0.5, 1);
    this.redPetalAppearance.setDiffuse(0.9, 0.5, 0.5, 1);
    this.redPetalAppearance.setSpecular(0.9, 0.5, 0.5, 1);
    this.redPetalAppearance.setShininess(10.0);

    this.petalApperances = [this.pinkPetalAppearance, this.whitePetalAppearance, this.orangePetalAppearance, this.redPetalAppearance];
    
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
      this.translate(0,-50,0);
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


    
      this.pushMatrix();
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      this.flower.display();
      this.popMatrix();
    

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


