import React, {useRef, useEffect, useState} from "react";
import {Sky, OrbitControls, Sphere, Stats, RoundedBox, PortalMaterialType} from "@react-three/drei";
import { Canvas, useFrame, SphereGeometryProps, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";

import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { suspend } from 'suspend-react'
import { easing } from "maath";
import * as geometry from "maath/geometry"
import { PlaneGeometry } from "three/src/Three.js";
import { PlaneBufferGeometryProps } from "@react-three/fiber";

extend({easing, geometry, PlaneGeometry});

const Box = (props:any) => {
	let _ref = useRef({
		rotation: {
			x:0,
			y:0,
			z:0
		}
	})

	//const [hovered, setHover] = useState(false)
	//const [active, setActive] = useState(false)
	//useFrame((state, delta) => (_ref.current.rotation.x += delta))
    return(
        <mesh {...props}>
            <boxGeometry args={[1,1,1]}></boxGeometry>
            <meshLambertMaterial attach="material" color="hotpink"></meshLambertMaterial>
        </mesh>
    )
}
//console.log("hello")

//<OrbitControls></OrbitControls>

const ThreeBG = () => {
	/*
	const geometry = new THREE.SphereGeometry(1000,100,50);

	const materialOptions = {
		size: 1.0,
		//transparency: true,
		opacity: 0.7
	}

	const starStuff = new THREE.PointsMaterial(materialOptions);

	for (let i=0;i<1000;i++) {
		const starVertex = new THREE.Vector3()
		starVertex.x = Math.random() * 2000 - 1000;
		starVertex.y = Math.random() * 2000 - 1000;
		starVertex.z = Math.random() * 2000 - 1000;
		//geometry.vertices.push(starVertex)
	}

	const scene = new THREE.Scene()

	const camera = new THREE.PerspectiveCamera(90, 2, 0.1, 500);

	const renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth,window.innerHeight);
	renderer.render(scene, camera)

	const tesst = <div><h1>klsjdklf</h1><p>kj3434</p></div>

	*/

	const bg = <div className={"absolute min-h-screen h-full w-screen"}>
		<Canvas>
			<OrbitControls></OrbitControls>
			<ambientLight intensity={1}></ambientLight>
			<Sky sunPosition={[1000,1000,200]}></Sky>
            <Box position={[-1.2,0,0]}></Box>
            <Box position={[1.2,0,0]}></Box>
            <Sphere position={[0,0,0]}></Sphere>
		</Canvas>
	</div>

	//const bg2 = renderer.domElement

    //return bg2
	return bg
}

/*
const newBG = () => {
	return (
		<div id="base" className={"bg-white"}>
			<Script>
				{
					`
						import * as THREE from "three"
						document.getElementById("base").style = "background-color: red"
						const geometry = new THREE.SphereGeometry(1000,100,50)
					`
				}
			</Script>
			<p>kalsjdflks{bg.threeBG()}</p>
		</div>
	)
}
*/

/*
const newBG2 = () => {
	const canvas = useThree(threeApp);
	return(
		<div ref={canvas} className={"h-screen min-h-screen bg-white"}></div>
	)
}
*/

const Star = (props:any) => {
	/*
	let ref = useRef();
	let [hovered, setHover] = useState(false);

	useFrame((state, delta) => {
		if (hovered) {
			ref.current.scale.x += 2;
			ref.current.scale.y += 2;
			ref.current.scale.z += 2;
			//ref.current.material.color = "#ff0000";
		}
	})

	*/

    return(
		/*
        <mesh {...props} ref={ref}
		onPointerOver={() => setHover(true)}
		onPointerOut={() => setHover(false)}
		>
			<sphereGeometry></sphereGeometry>
			<meshBasicMaterial attach="material" color="white" opacity={0.1}></meshBasicMaterial>
        </mesh>*/

		<>
        <mesh {...props}>
			<sphereGeometry></sphereGeometry>
            {/*<meshLambertMaterial attach="material" color="white" opacity={0.5}></meshLambertMaterial>*/}
			<meshBasicMaterial attach="material" color="white" opacity={0.1}></meshBasicMaterial>
        </mesh>
		</>
    )
}

const StarSystem = (props:any) => {

	let stars = [];

	for (let i=0;i<2000;i++) {
		const _pos = new THREE.Vector3()
		_pos.x = Math.random()*1000 - 500;
		_pos.y = Math.random()*1000 - 500;
		_pos.z = Math.random()*1000 - 500;

		let _star = <Star position={_pos} scale={[1,1,1]} color={"red"}></Star>;
		stars.push(_star);
	}

	useFrame((state,delta) => {
		//camera.position.x += (state.mouse.x - camera.position.x);
		//camera.position.y += (state.mouse.y - camera.position.y);
		//const axis = new THREE.Vector3();
		//axis.x, axis.y, axis.z = 1;
		//camera.rotateOnWorldAxis(axis, 0.0001);
		state.camera.rotateX(state.mouse.y*0.001);
		state.camera.rotateY(state.mouse.x*-0.001);
	})

	return(
		<>
			{stars.map(_star => <>{_star}</>)}
		</>
	)
}

const NewBG3 = () => {
	return(
		<div className={"absolute min-h-screen h-full w-screen"}>
			<Canvas camera={{fov:90}}>
				{/*<OrbitControls></OrbitControls>*/}
				<ambientLight intensity={1}></ambientLight>
				{/*<Sky sunPosition={[1000,1000,200]}></Sky>*/}
				<StarSystem></StarSystem>
			</Canvas>
		</div>
	)
}

const Frame = ({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }:{id:any,name:any,author:any,bg:any,width:any,height:any,children:any}) => {
	extend(geometry);
	const portal = useRef<PortalMaterialType>(null!);
	const [, setLocation] = useLocation();
	const [, params] = useRoute('/item/:id');
	const [hovered, hover] = useState(false);
	useCursor(hovered);
	useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt));
	return (
	  <group {...props}>
		<Text font={"Calibri"} fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]} material-toneMapped={false}>
		  {name}
		</Text>
		<Text font={"Calibri"} fontSize={0.1} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
		  /{id}
		</Text>
		<Text font={"Calibri"} fontSize={0.04} anchorX="right" position={[0.0, -0.677, 0.01]} material-toneMapped={false}>
		  {author}
		</Text>
		<mesh name={id} onDoubleClick={(e) => (e.stopPropagation(), setLocation('/fiesta_tea-transformed.glb'/* + e.object.name*/))} onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
		  <RoundedBox args={[width, height, 0.1]}></RoundedBox>
		  <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
			<color attach="background" args={[bg]} />
			{children}
		  </MeshPortalMaterial>
		</mesh>
	  </group>
	)
}

const TestCom = (props:any) => {
	const _ref = useRef<THREE.Mesh>(null); //declare as type THREE.Mesh
	const [hovered, setHover] = useState(false);
	const [rotate, setRotate] = useState(false);

	/*
	useEffect(() => {
		//run before initial render
	})
	*/

	//once before every frame
	useFrame((state, delta) => {
		if (!_ref.current) return;
		if (rotate) {
			_ref.current.rotation.x += 1 * delta;
			_ref.current.rotation.y += 0.5 * delta;
		}
		if (hovered) {
			//_ref.current.scale.z += 0.5 * delta;
			//_ref.current.scale.x += 0.01;
			//_ref.current.scale.y += 0.01;
			//_ref.current.scale.z += 0.01;
		}
	})

	return(
		<mesh {...props} ref={_ref} scale={[0.5,0.5,0.5]}
		onPointerDown={() => setRotate(!rotate)}
		onPointerOver={() => setHover(true)}
		onPointerOut ={() => setHover(false)}
		>
			<sphereGeometry></sphereGeometry>
			<meshBasicMaterial color={hovered ? "red" : "blue"} wireframe></meshBasicMaterial>
		</mesh>
	)
}

const Frame2 = (props:any, children:any) => {
	const portal = useRef<THREE.Material>(null!);
	useFrame((state,delta) => {
		//nothing
		return
	})
	return(
		<mesh>
			<MeshPortalMaterial {...props} ref={portal}>
				<Gltf src="fiesta_tea-transformed.glb" scale={2} position={[0,0,0]}></Gltf>
			</MeshPortalMaterial>
		</mesh>
	)
}

const Frame3 = (children:any, ...props:any) => {
	const [, setLocation] = useLocation();
	const [hovered, hover] = useState(false);
	useCursor(hovered);
	return(
		<>{/*
			<RoundedBox {...props} position={[0,0,0]} rotation={[0,Math.PI / 2,0]} args={[8,5,0.1]} onDoubleClick={(e) => (e.stopPropagation(), setLocation(`/item/${e.index}`), location.reload())}
			onPointerOver={(e)=>hover(true)} onPointerOut={(e)=>hover(false)}>
				<MeshPortalMaterial side={THREE.DoubleSide}>
					{/*<Gltf src="fiesta_tea-transformed.glb" scale={3} position={[-2,0,0]}></Gltf>*/}{/*
					<StarSystem></StarSystem>
				</MeshPortalMaterial>
			</RoundedBox>
			*/}

			<RoundedBox args={[0.1,0.1,0.1]} rotation={[0, 0, 0]}>
				<MeshPortalMaterial side={THREE.DoubleSide}>
					<StarSystem></StarSystem>
					{/*<Gltf src="fiesta_tea-transformed.glb" scale={1} position={[0,0,0]}></Gltf>*/}
				</MeshPortalMaterial>
			</RoundedBox>
		</>
	)
}

const TestBG = () => {
	return(
		<div className={"absolute min-h-screen h-full w-screen"}>
			<Canvas camera={{position:[-1,0,0]}}>
				<color attach="background" args={["f0f0f0"]}/>
				{/*<TestCom position={[-0.75,0,0]}></TestCom>*/}
				<Frame3>
				</Frame3>
				{/*<Frame id="1" name="ryan" author="ryan" bg="#ffffff" width={10} height={7}>
					<StarSystem></StarSystem>
				</Frame>*/}
				<CameraControls makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2}/>
				<Stats/>
			</Canvas>
		</div>
	)
}

const NewBG4 = () => {
	return(
		<div className={"absolute min-h-screen h-full w-screen"}>
			<Canvas camera={{fov:90, position:[0,0,0]}}>
				<color attach="background" args={["f0f0f0"]}/>
			</Canvas>
		</div>
	)
}

export {NewBG3, NewBG4}
export default TestBG

/*

import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing, geometry } from 'maath'
import { suspend } from 'suspend-react'

extend(geometry)
const regular = import('@pmndrs/assets/fonts/inter_regular.woff')
const medium = import('@pmndrs/assets/fonts/inter_medium.woff')

export const App = () => (
  <Canvas camera={{ fov: 75, position: [0, 0, 20] }} eventSource={document.getElementById('root')} eventPrefix="client">
    <color attach="background" args={['#f0f0f0']} />
    <Frame id="01" name={`pick\nles`} author="Omar Faruq Tawsif" bg="#e4cdac" position={[-1.15, 0, 0]} rotation={[0, 0.5, 0]}>
      <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} />
    </Frame>
    <Frame id="02" name="tea" author="Omar Faruq Tawsif">
    </Frame>
    <Frame id="03" name="still" author="Omar Faruq Tawsif" bg="#d1d1ca" position={[1.15, 0, 0]} rotation={[0, -0.5, 0]}>
      <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} />
    </Frame>
    <Rig />
  </Canvas>
)

function Frame({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }) {
  const portal = useRef()
  const [, setLocation] = useLocation()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt))
  return (
    <group {...props}>
      <Text font={suspend(medium).default} fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]} material-toneMapped={false}>
        {name}
      </Text>
      <Text font={suspend(regular).default} fontSize={0.1} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
        /{id}
      </Text>
      <Text font={suspend(regular).default} fontSize={0.04} anchorX="right" position={[0.0, -0.677, 0.01]} material-toneMapped={false}>
        {author}
      </Text>
      <mesh name={id} onDoubleClick={(e) => (e.stopPropagation(), setLocation('/item/' + e.object.name))} onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) {
  const { controls, scene } = useThree()
  const [, params] = useRoute('/item/:id')
  useEffect(() => {
    const active = scene.getObjectByName(params?.id)
    if (active) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25))
      active.parent.localToWorld(focus.set(0, 0, -2))
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
  })
  return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
}

---------------------------------------------------------------------------------------------------------------------------------------------------
const preload = () => {

  let manager = new THREE.LoadingManager();
  manager.onLoad = function() { 
    const environment = new Environment( typo, particle );
  }

  var typo = null;
  const loader = new THREE.FontLoader( manager );
  const font = loader.load('https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json', function ( font ) { typo = font; });
  const particle = new THREE.TextureLoader( manager ).load( 'https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png');

}

if ( document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll))
  preload ();
else
  document.addEventListener("DOMContentLoaded", preload ); 

class Environment {

  constructor( font, particle ){ 

    this.font = font;
    this.particle = particle;
    this.container = document.querySelector( '#magic' );
    this.scene = new THREE.Scene();
    this.createCamera();
    this.createRenderer();
    this.setup()
    this.bindEvents();
  }

  bindEvents(){

    window.addEventListener( 'resize', this.onWindowResize.bind( this ));
    
  }

  setup(){ 

    this.createParticles = new CreateParticles( this.scene, this.font,             this.particle, this.camera, this.renderer );
  }

  render() {
    
     this.createParticles.render()
     this.renderer.render( this.scene, this.camera )
  }

  createCamera() {

    this.camera = new THREE.PerspectiveCamera( 65, this.container.clientWidth /  this.container.clientHeight, 1, 10000 );
    this.camera.position.set( 0,0, 100 );

  }

  createRenderer() {

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );

    this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2));

    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild( this.renderer.domElement );

    this.renderer.setAnimationLoop(() => { this.render() })

  }

  onWindowResize(){

    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );

  }
}

class CreateParticles {
	
	constructor( scene, font, particleImg, camera, renderer ) {
    
		this.scene = scene;
		this.font = font;
		this.particleImg = particleImg;
		this.camera = camera;
		this.renderer = renderer;
		
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2(-200, 200);
		
		this.colorChange = new THREE.Color();

		this.buttom = false;

		this.data = {

			text: 'FUTURE\nIS NOW',
			amount: 1500,
			particleSize: 1,
			particleColor: 0xffffff,
			textSize: 16,
			area: 250,
			ease: .05,
		}

		this.setup();
		this.bindEvents();

	}


	setup(){

		const geometry = new THREE.PlaneGeometry( this.visibleWidthAtZDepth( 100, this.camera ), this.visibleHeightAtZDepth( 100, this.camera ));
		const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true } );
		this.planeArea = new THREE.Mesh( geometry, material );
		this.planeArea.visible = false;
		this.createText();

	}

	bindEvents() {

		document.addEventListener( 'mousedown', this.onMouseDown.bind( this ));
		document.addEventListener( 'mousemove', this.onMouseMove.bind( this ));
		document.addEventListener( 'mouseup', this.onMouseUp.bind( this ));
		
	}

	onMouseDown(){
		
		this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		const vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 0.5);
		vector.unproject( this.camera );
		const dir = vector.sub( this.camera.position ).normalize();
		const distance = - this.camera.position.z / dir.z;
		this.currenPosition = this.camera.position.clone().add( dir.multiplyScalar( distance ) );
		
		const pos = this.particles.geometry.attributes.position;
		this.buttom = true;
		this.data.ease = .01;
		
	}

	onMouseUp(){

		this.buttom = false;
		this.data.ease = .05;
	}

	onMouseMove( ) { 

	    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	}

	render( level ){ 

		const time = ((.001 * performance.now())%12)/12;
		const zigzagTime = (1 + (Math.sin( time * 2 * Math.PI )))/6;

		this.raycaster.setFromCamera( this.mouse, this.camera );

		const intersects = this.raycaster.intersectObject( this.planeArea );

		if ( intersects.length > 0 ) {

			const pos = this.particles.geometry.attributes.position;
			const copy = this.geometryCopy.attributes.position;
			const coulors = this.particles.geometry.attributes.customColor;
			const size = this.particles.geometry.attributes.size;

		    const mx = intersects[ 0 ].point.x;
		    const my = intersects[ 0 ].point.y;
		    const mz = intersects[ 0 ].point.z;

		    for ( var i = 0, l = pos.count; i < l; i++) {

		    	const initX = copy.getX(i);
		    	const initY = copy.getY(i);
		    	const initZ = copy.getZ(i);

		    	let px = pos.getX(i);
		    	let py = pos.getY(i);
		    	let pz = pos.getZ(i);

		    	this.colorChange.setHSL( .5, 1 , 1 )
		    	coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
		    	coulors.needsUpdate = true;

		    	size.array[ i ]  = this.data.particleSize;
		    	size.needsUpdate = true;

		    	let dx = mx - px;
		    	let dy = my - py;
		    	const dz = mz - pz;

		    	const mouseDistance = this.distance( mx, my, px, py )
		    	let d = ( dx = mx - px ) * dx + ( dy = my - py ) * dy;
		    	const f = - this.data.area/d;

		    	if( this.buttom ){ 

		    		const t = Math.atan2( dy, dx );
		    		px -= f * Math.cos( t );
		    		py -= f * Math.sin( t );

		    		this.colorChange.setHSL( .5 + zigzagTime, 1.0 , .5 )
		    		coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
		    		coulors.needsUpdate = true;

		    		if ((px > (initX + 70)) || ( px < (initX - 70)) || (py > (initY + 70) || ( py < (initY - 70)))){

		    			this.colorChange.setHSL( .15, 1.0 , .5 )
		    			coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
		    			coulors.needsUpdate = true;

		    		}

		    	}else{
		    	
			    	if( mouseDistance < this.data.area ){

			    		if(i%5==0){

			    			const t = Math.atan2( dy, dx );
			    			px -= .03 * Math.cos( t );
			    			py -= .03 * Math.sin( t );

			    			this.colorChange.setHSL( .15 , 1.0 , .5 )
			    			coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
			    			coulors.needsUpdate = true;

							size.array[ i ]  =  this.data.particleSize /1.2;
							size.needsUpdate = true;

			    		}else{

					    	const t = Math.atan2( dy, dx );
					    	px += f * Math.cos( t );
					    	py += f * Math.sin( t );

					    	pos.setXYZ( i, px, py, pz );
					    	pos.needsUpdate = true;

					    	size.array[ i ]  = this.data.particleSize * 1.3 ;
					    	size.needsUpdate = true;
				    	}

			    		if ((px > (initX + 10)) || ( px < (initX - 10)) || (py > (initY + 10) || ( py < (initY - 10)))){

			    			this.colorChange.setHSL( .15, 1.0 , .5 )
			    			coulors.setXYZ( i, this.colorChange.r, this.colorChange.g, this.colorChange.b )
			    			coulors.needsUpdate = true;

			    			size.array[ i ]  = this.data.particleSize /1.8;
			    			size.needsUpdate = true;

			    		}
			    	}

		    	}

		    	px += ( initX  - px ) * this.data.ease;
		    	py += ( initY  - py ) * this.data.ease;
		    	pz += ( initZ  - pz ) * this.data.ease;

		    	pos.setXYZ( i, px, py, pz );
		    	pos.needsUpdate = true;

		    }
		}
	}

	createText(){ 

		let thePoints = [];

		let shapes = this.font.generateShapes( this.data.text , this.data.textSize  );
		let geometry = new THREE.ShapeGeometry( shapes );
		geometry.computeBoundingBox();
	
		const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
		const yMid =  (geometry.boundingBox.max.y - geometry.boundingBox.min.y)/2.85;

		geometry.center();

		let holeShapes = [];

		for ( let q = 0; q < shapes.length; q ++ ) {

			let shape = shapes[ q ];

			if ( shape.holes && shape.holes.length > 0 ) {

				for ( let  j = 0; j < shape.holes.length; j ++ ) {

					let  hole = shape.holes[ j ];
					holeShapes.push( hole );
				}
			}

		}
		shapes.push.apply( shapes, holeShapes );

		let colors = [];
		let sizes = [];
					
		for ( let  x = 0; x < shapes.length; x ++ ) {

			let shape = shapes[ x ];

			const amountPoints = ( shape.type == 'Path') ? this.data.amount/2 : this.data.amount;

			let points = shape.getSpacedPoints( amountPoints ) ;

			points.forEach( ( element, z ) => {
						
				const a = new THREE.Vector3( element.x, element.y, 0 );
				thePoints.push( a );
				colors.push( this.colorChange.r, this.colorChange.g, this.colorChange.b);
				sizes.push( 1 )

				});
		}

		let geoParticles = new THREE.BufferGeometry().setFromPoints( thePoints );
		geoParticles.translate( xMid, yMid, 0 );
				
		geoParticles.setAttribute( 'customColor', new THREE.Float32BufferAttribute( colors, 3 ) );
		geoParticles.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1) );

		const material = new THREE.ShaderMaterial( {

			uniforms: {
				color: { value: new THREE.Color( 0xffffff ) },
				pointTexture: { value: this.particleImg }
			},
			vertexShader: document.getElementById( 'vertexshader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

			blending: THREE.AdditiveBlending,
			depthTest: false,
			transparent: true,
		} );

		this.particles = new THREE.Points( geoParticles, material );
		this.scene.add( this.particles );

		this.geometryCopy = new THREE.BufferGeometry();
		this.geometryCopy.copy( this.particles.geometry );
		
	}

	visibleHeightAtZDepth ( depth, camera ) {

	  const cameraOffset = camera.position.z;
	  if ( depth < cameraOffset ) depth -= cameraOffset;
	  else depth += cameraOffset;

	  const vFOV = camera.fov * Math.PI / 180; 

	  return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
	}

	visibleWidthAtZDepth( depth, camera ) {

	  const height = this.visibleHeightAtZDepth( depth, camera );
	  return height * camera.aspect;

	}

	distance (x1, y1, x2, y2){
	   
	    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
	}
}
*/