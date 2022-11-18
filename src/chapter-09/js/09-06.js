import * as THREE from 'three';
import * as dat from 'dat.gui';

import { OBJLoader } from 'three/examples/jsm/loaders/objloader.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/firstpersoncontrols.js';

import * as Helper from '../../js/helper.js';


function init() 
{
    var stats = Helper.initStats();
    var renderer = Helper.initRenderer();
    var camera = Helper.initCamera();
    var scene = new THREE.Scene();
    var clock = new THREE.Clock();

    Helper.initDefaultLighting( scene );

    var fpControls = new FirstPersonControls( camera );
    fpControls.lookSpeed = 0.4;
    fpControls.movementSpeed = 20;
    fpControls.lookVertical = true;
    fpControls.constrainVertical = true;
    fpControls.verticalMin = 1.0;
    fpControls.verticalMax = 2.0;
    fpControls.lon = -150;
    fpControls.lat = 120;

    var loader = new OBJLoader();
    loader.load( "../../assets/models/city/city.obj", function ( object ) {

        var scale = chroma.scale( [ 'red', 'green', 'blue' ] );
        setRandomColors( object, scale );
        mesh = object;
        scene.add( mesh );
    } );

    render();

    function render() {
        stats.update();
        fpControls.update( clock.getDelta() );
        requestAnimationFrame( render );
        renderer.render( scene, camera )
    }
}

window.addEventListener( 'load' , () => {
    init() ;
} ) ;
