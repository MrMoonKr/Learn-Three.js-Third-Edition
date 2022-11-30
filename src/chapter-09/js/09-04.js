import * as THREE from 'three';
import * as dat from 'dat.gui';
import chroma from 'chroma-js';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

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

    var trackballControls = new TrackballControls( camera, renderer.domElement );
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.0;
    trackballControls.panSpeed = 1.0;

    var loader = new OBJLoader();
    loader.load( "../../assets/models/city/city.obj", function( object ) {

        var scale = chroma.scale( [ 'red', 'green', 'blue' ] );
        setRandomColors( object, scale );
        let mesh = object;
        scene.add( mesh );
    } );

    render();

    function render() 
    {
        stats.update();
        trackballControls.update( clock.getDelta() );

        renderer.render( scene, camera );

        requestAnimationFrame( render );
    }
}

window.addEventListener( 'load' , () => {
    init() ;
} ) ;
