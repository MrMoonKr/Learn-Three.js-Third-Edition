import * as THREE from "three" ;
import * as CANNON from 'cannon-es' ;

/** @type {THREE.WebGLRenderer} */
let renderer ;
/** @type {THREE.Scene} */
let scene ;
/** @type {THREE.PerspectiveCamera} */
let camera ;
/** @type {THREE.Mesh} */
let mesh ;

/** @type {CANNON.World} */
let world ;
/** @type {CANNON.Body} */
let body ;


function initThree()
{
    renderer = new THREE.WebGLRenderer( {antialias: true} ) ;
    renderer.setClearColor( new THREE.Color( 0x929292 ) ) ;
    renderer.setSize( window.innerWidth, window.innerHeight ) ;

    document.getElementById('webgl-output').appendChild( renderer.domElement ) ;

    scene = new THREE.Scene() ;

    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 2000 );
    camera.position.set( 0, 0, 5 );

    const geom = new THREE.BoxGeometry( 2, 2, 2 );
    const mtrl = new THREE.MeshBasicMaterial( { color: 0xFF00FF, wireframe: true } ) ;

    mesh = new THREE.Mesh( geom, mtrl );
    scene.add( mesh ) ;
}

function initCannon()
{
    world = new CANNON.World() ;

    const shape = new CANNON.Box( new CANNON.Vec3( 1, 1, 1 ) ) ;
    
    body = new CANNON.Body( { mass: 1 } ) ;
    body.addShape( shape ) ;

    body.angularVelocity.set( 0, 10, 0 ) ;
    body.angularDamping = 0.5 ;

    world.addBody( body ) ;
}

function animate()
{
    world.fixedStep() ;

    mesh.position.copy( body.position ) ;
    mesh.quaternion.copy( body.quaternion ) ;

    renderer.render( scene, camera ) ;


    requestAnimationFrame( animate ) ;
}

function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight ;
    camera.updateProjectionMatrix() ;

    renderer.setSize( window.innerWidth, window.innerHeight ) ;
}

function init()
{
    initThree() ;
    initCannon() ;

    animate() ;
}


window.addEventListener( 'load' , () => 
{
    init() ;

    window.addEventListener( 'resize', onWindowResize ) ;
} ) ;
