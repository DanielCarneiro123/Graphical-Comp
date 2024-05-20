import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./polygons/MyPlane.js";
import { MySphere } from "./polygons/MySphere.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyFlower } from "./objects/flower/MyFlower.js";
import { MyGarden } from "./objects/MyGarden.js";
import { MyBee } from "./objects/bee/MyBee.js";
import { MyRock } from "./objects/MyRock.js";
import { MyRockSet } from "./objects/MyRockSet.js";
import { MyHive } from "./objects/MyHive.js";
import { MyTurf } from "./objects/MyTurf.js";

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
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);
    
    this.terrain = new CGFtexture(this, "images/grass.jpg");
    this.earth = new CGFtexture(this, "images/earth.jpg");
    this.panoramaImage = new CGFtexture(this, "images/panorama1.jpg");
    this.stem = new CGFtexture(this, "images/stem.jpg");
    this.leaf = new CGFtexture(this, "images/leaf.jpg");
    this.rock = new CGFtexture(this, "images/rock.png");
    this.hive = new CGFtexture(this, "images/hive.jpg");
    this.hive = new CGFtexture(this, "images/hive.jpg");

    this.initPetalTextures();
    this.initRecetacleTextures();

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

    this.rockAppearance  = new CGFappearance(this);
    this.rockAppearance.setTexture(this.rock);
    this.rockAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.hiveAppearance  = new CGFappearance(this);
    this.hiveAppearance.setTexture(this.hive);
    this.hiveAppearance.setTextureWrap('REPEAT', 'REPEAT');

    //Initialize scene objects
    this.axis = new CGFaxis(this);

    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 50, 50);
    this.panorama = new MyPanorama(this, this.panoramaImage);
    this.sunflower = new MyFlower(this, 12, 4, 2.5, 0.8, 0.15, 4, 40, 40, 20, this.leafAppearance, this.stemAppearance, this.receptacleAppearances[0], this.petalAppearances[3]);
    this.pinkflower = new MyFlower(this, 12, 4, 2.5, 0.8, 0.15, 4, 20, 40, 20, this.leafAppearance, this.stemAppearance, this.receptacleAppearances[1], this.petalAppearances[0]);
    this.bee = new MyBee(this, 0, 0, 0);
    this.rock = new MyRock(this, 5, 5, 0.5);
    this.rockSet = new MyRockSet(this, 5, 10);
    this.hive = new MyHive(this, this.hiveAppearance);
    this.garden = new MyGarden(this, 8, 8, this.leafAppearance, this.stemAppearance, this.petalAppearances, this.receptacleAppearances);
    this.turf = new MyTurf(this, 2500);
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;
    this.displayInfinitePanorama = false;
    this.scaleFactor = 1;

    // display
    this.displaySunFlower = false;
    this.displayPinkFlower = false;
    this.displayGarden = false;
    this.displayTerrain = false;
    this.displayEarth = false;
    this.displayBee = false;
    this.displayHive = false;
    this.displayBee = false;
    this.displayHive = false;
    this.displayFlower = false;
    this.displayRock = false;
    this.displayRockSet = false;

    // garden
    this.gardenRows = 8;
    this.gardenCols = 8;
  
    this.speedFactor = 1;

    this.setUpdatePeriod(50);

    this.appStartTime = Date.now();

    this.displayTurf = false;

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
      vec3.fromValues(10, 10, 10),
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
    this.garden = new MyGarden(this, this.gardenRows, this.gardenCols, this.stemAppearance, this.leafAppearance, this.petalAppearances, this.receptacleAppearances);
  }

  initPetalTextures() {
    this.pinkPetal = new CGFtexture(this, "images/petals/pink.jpg");
    this.orangePetal = new CGFtexture(this, "images/petals/orange.jpg");
    this.redPetal = new CGFtexture(this, "images/petals/red.jpg");
    this.yellowPetal = new CGFtexture(this, "images/petals/yellow.jpg");
    this.whitePetal = new CGFtexture(this, "images/petals/white.jpeg");
    this.purplePetal = new CGFtexture(this, "images/petals/purple.jpeg");

    this.pinkPetalAppearance = new CGFappearance(this);
    this.pinkPetalAppearance.setTexture(this.pinkPetal);
    this.pinkPetalAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.pinkPetalAppearance.setAmbient(0.85, 0.62, 0.62, 1);
    this.pinkPetalAppearance.setDiffuse(0.85, 0.62, 0.62, 1);
    this.pinkPetalAppearance.setSpecular(0.85, 0.62, 0.62, 1);
    this.pinkPetalAppearance.setShininess(10.0);

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

    this.yellowPetalAppearance = new CGFappearance(this);
    this.yellowPetalAppearance.setTexture(this.yellowPetal);
    this.yellowPetalAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.yellowPetalAppearance.setAmbient(0.9, 0.9, 0.5, 1);
    this.yellowPetalAppearance.setDiffuse(0.9, 0.9, 0.5, 1);
    this.yellowPetalAppearance.setSpecular(0.9, 0.9, 0.5, 1);
    this.yellowPetalAppearance.setShininess(10.0);

    this.whitePetalAppearance = new CGFappearance(this);
    this.whitePetalAppearance.setTexture(this.whitePetal);
    this.whitePetalAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.whitePetalAppearance.setAmbient(1, 1, 1, 1);
    this.whitePetalAppearance.setDiffuse(1, 1, 1, 1);
    this.whitePetalAppearance.setSpecular(1, 1, 1, 1);
    this.whitePetalAppearance.setShininess(10.0);

    this.purplePetalAppearance = new CGFappearance(this);
    this.purplePetalAppearance.setTexture(this.purplePetal);
    this.purplePetalAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.purplePetalAppearance.setAmbient(0.9, 0.5, 0.5, 1);
    this.purplePetalAppearance.setDiffuse(0.9, 0.5, 0.5, 1);
    this.purplePetalAppearance.setSpecular(0.9, 0.5, 0.5, 1);
    this.purplePetalAppearance.setShininess(10.0);

    this.petalAppearances = [this.pinkPetalAppearance, this.orangePetalAppearance, this.redPetalAppearance, this.yellowPetalAppearance, this.whitePetalAppearance, this.purplePetalAppearance];
  }

  initRecetacleTextures() {
    this.sunflower = new CGFtexture(this, "images/receptacles/sunflower.png");
    this.pinkFlower = new CGFtexture(this, "images/receptacles/pink.png");
    this.orangeFlower = new CGFtexture(this, "images/receptacles/white.jpg");

    this.sunflowerAppearance = new CGFappearance(this);
    this.sunflowerAppearance.setTexture(this.sunflower);
    this.sunflowerAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.sunflowerAppearance.setAmbient(1, 1, 0, 1);
    this.sunflowerAppearance.setDiffuse(1, 1, 0, 1);
    this.sunflowerAppearance.setSpecular(1, 1, 0, 1);
    this.sunflowerAppearance.setShininess(10.0);

    this.pinkflowerAppearance = new CGFappearance(this);
    this.pinkflowerAppearance.setTexture(this.pinkFlower);
    this.pinkflowerAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.pinkflowerAppearance.setAmbient(0.45, 0.25, 0.65, 1);
    this.pinkflowerAppearance.setDiffuse(0.45, 0.25, 0.65, 1);
    this.pinkflowerAppearance.setSpecular(0.45, 0.25, 0.65, 1);
    this.pinkflowerAppearance.setShininess(10.0);

    this.receptacleAppearances = [this.sunflowerAppearance, this.pinkflowerAppearance];
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




    this.pushMatrix();
    this.translate(0, 70, 0)
    this.panorama.display();
    this.terrainAppearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    

    if (this.displayEarth) {
      this.pushMatrix();
      this.earthAppearance.apply();
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      this.sphere.display();
      this.popMatrix();
    }


    if (this.displaySunFlower) {
      this.pushMatrix();
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.sunflower.display();
      this.popMatrix();
    }

    if (this.displayPinkFlower) {
      this.pushMatrix();
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.pinkflower.display();
      this.popMatrix();
    }
    

    this.pushMatrix();
      this.translate(-15,-10,-30);
      this.garden.display();
    this.popMatrix();
    
    this.pushMatrix();
      this.translate(0, 0, 0);
      this.scale(0.25, 0.25, 0.25);
      this.bee.display();
    this.popMatrix();

    this.pushMatrix();
      this.rockAppearance.apply();
      this.translate(-15,-10,30);
      this.scale(5, 5, 5);
      this.rockSet.display();
    this.popMatrix();


    this.pushMatrix();
      this.translate(-5,-2, 40);
      this.scale(2, 2, 2);
      this.hive.display();
    this.popMatrix();
    
    if (this.displayTurf){
      this.pushMatrix();
      this.stemAppearance.apply();
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      this.turf.display();
      this.popMatrix();
    }
  }

  update(time) {
    let timeSinceAppStart = (time - this.appStartTime) / 1000.0;
    this.bee.update(timeSinceAppStart, this.scaleFactor, this.speedFactor);
    this.turf.update(timeSinceAppStart, this.scaleFactor, this.speedFactor);
  }

}