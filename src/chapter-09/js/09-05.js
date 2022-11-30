import * as THREE from 'three';
import * as dat from 'dat.gui';
import chroma from 'chroma-js';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

import * as Helper from '../../js/helper.js';
import { setRandomColors } from './util.js' ;


function init() 
{
    var stats = Helper.initStats();
    var renderer = Helper.initRenderer();
    var camera = Helper.initCamera();
    var scene = new THREE.Scene();
    var clock = new THREE.Clock();

    Helper.initDefaultLighting( scene );

    var flyControls = new FlyControls( camera, renderer.domElement );
    flyControls.movementSpeed = 25;
    //flyControls.domElement = document.querySelector( "webgl-output" );
    flyControls.rollSpeed = Math.PI / 24;
    flyControls.autoForward = false;
    flyControls.dragToLook = true;

    var loader = new OBJLoader();
    loader.load( "../../assets/models/city/city.obj", function ( object ) {

        var scale = chroma.scale( [ 'red', 'green', 'blue' ] );
        setRandomColors( object, scale );
        let mesh = object;
        scene.add( mesh );
    } );

    render();

    function render() 
    {
        stats.update();
        flyControls.update( clock.getDelta() );

        renderer.render( scene, camera );

        requestAnimationFrame( render );
    }
}

window.addEventListener( 'load' , () => {
    init() ;
} ) ;
