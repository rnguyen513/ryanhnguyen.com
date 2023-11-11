import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as shader from "./shaders/shader";

/*
export class Sketch {
//export default class Sketch {
  constructor(selector) {
    console.log(selector);
    this.scene = new THREE.Scene();
    this.container = selector;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1);
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    // var frustumSize = 10;
    // var aspect = window.innerWidth / window.innerHeight;
    // this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
    this.camera.position.set(0, 0, 2);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;

    this.isPlaying = true;

    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();
    // this.settings();
  }

  settings() {
    let that = this;
    this.settings = {
      progress: 0,
    };
    this.gui = new dat.GUI();
    this.gui.add(this.settings, "progress", 0, 1, 0.01);
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    let that = this;
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
      // wireframe: true,
      // transparent: true,
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if (!this.isPlaying) {
      this.render();
      this.isPlaying = true;
    }
  }

  render() {
    if (!this.isPlaying) return;
    this.time += 0.05;
    this.material.uniforms.time.value = this.time;
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
*/

export default class Sketch {
    constructor(selector) {
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerHeight;
        this.aspectRatio = this.WIDTH/this.HEIGHT;
        this.fieldOfView = 75;
        this.nearPlane = 1;
        this.farPlane = 1000;
        this.mouseX = 0;
        this.mouseY = 0;

        this.stars;
        this.starStuff;

        this.windowHalfX = this.WIDTH/2;
        this.windowHalfY = this.HEIGHT/2;

        this.scene = new THREE.Scene({antialias: true});
        this.scene.fog = new THREE.FogExp2(0x000000, 0.0003);
        this.camera = new THREE.PerspectiveCamera(this.fieldOfView, this.aspectRatio, this.nearPlane, this.farPlane);
        this.renderer = new THREE.WebGLRenderer({alpha: true});

        this.init()
        this.starForge();
        this.animate()
    }

	/* We need this stuff too
	var container, aspectRatio,
		HEIGHT, WIDTH, fieldOfView,
		nearPlane, farPlane,
		mouseX, mouseY, windowHalfX,
		windowHalfY, stats, geometry,
		starStuff, materialOptions, stars;
    
    */

	init() {
		this.container = document.createElement('div');
		document.body.appendChild( this.container );
		document.body.style.overflow = 'hidden';

		this.camera.position.z = this.farPlane / 2;

		// The wizard's about to get busy.
		this.starForge();

		this.renderer.setClearColor(0x000011, 1);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize( this.WIDTH, this.HEIGHT);
		this.container.appendChild(this.renderer.domElement);

        /*
		this.stats = new Stats();
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.top = '0px';
		this.stats.domElement.style.right = '0px';
		this.container.appendChild( this.stats.domElement );
        */

		window.addEventListener( 'resize', this.onWindowResize, false );
		document.addEventListener( 'mousemove', this.onMouseMove, false );
	}

	animate() {
		//requestAnimationFrame(this.animate);
		this.render();
		//this.stats.update();
	}


	render() {
		this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.005;
		this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * 0.005;
		this.camera.lookAt( this.scene.position );
		this.renderer.render(this.scene, this.camera);
	}

	onWindowResize() {

		// Everything should resize nicely if it needs to!
	  	this.WIDTH = window.innerWidth,
	  		this.HEIGHT = window.innerHeight;

	  	this.camera.aspect = this.aspectRatio;
	  	this.camera.updateProjectionMatrix();
	  	this.renderer.setSize(this.WIDTH, this.HEIGHT);
	}

	starForge() {
		const starQty = 45000;
		let geometry = new THREE.SphereGeometry(1000, 100, 50);
        console.log(geometry.vertices);

	    const materialOptions = {
	    	size: 1.0, //I know this is the default, it's for you.  Play with it if you want.
	    	//transparency: true, 
	    	opacity: 0.7
	    };

	    this.starStuff = new THREE.PointsMaterial(materialOptions);

		for (var i = 0; i < starQty; i++) {		
			let starVertex = new THREE.Vector3();
			starVertex.x = Math.random() * 2000 - 1000;
			starVertex.y = Math.random() * 2000 - 1000;
			starVertex.z = Math.random() * 2000 - 1000;

			//geometry.vertices.push(starVertex);
		}


		//this.stars = new THREE.PointCloud(geometry, this.starStuff);
        this.stars = new THREE.Mesh(geometry, this.starStuff)
		this.scene.add(this.stars);
	}

	onMouseMove(e) {
		this.mouseX = e.clientX - this.windowHalfX;
		this.mouseY = e.clientY - this.windowHalfY;
	}
}