import * as THREE from 'three';
import * as dat from 'dat.gui';

import { OBJLoader } from 'three/examples/jsm/loaders/objloader.js';
import { FlyControls } from 'three/examples/jsm/controls/flycontrols.js';

import * as Helper from '../../js/helper.js';


function init() 
{
    var stats = Helper.initStats();
    var renderer = Helper.initRenderer();
    var camera = Helper.initCamera();
    var scene = new THREE.Scene();
    var clock = new THREE.Clock();

    Helper.initDefaultLighting( scene );

    var flyControls = new FlyControls( camera );
    flyControls.movementSpeed = 25;
    flyControls.domElement = document.querySelector( "webgl-output" );
    flyControls.rollSpeed = Math.PI / 24;
    flyControls.autoForward = true;
    flyControls.dragToLook = false;

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
        flyControls.update( clock.getDelta() );
        requestAnimationFrame( render );
        renderer.render( scene, camera )
    }
}

window.addEventListener( 'load' , () => {
    init() ;
} ) ;
