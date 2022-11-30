import * as THREE from 'three';
import * as dat from 'dat.gui';
import chroma from 'chroma-js';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import * as Helper from '../../js/helper.js';
import { setRandomColors } from './util.js' ;


function init() 
{
    var stats = Helper.initStats();
    var renderer = Helper.initRenderer();
    var camera = Helper.initCamera();
    var scene = new THREE.Scene();
    var clock = new THREE.Clock();

    // Don't use the default lights, since that's a spotlight
    scene.add( new THREE.AmbientLight( 0x222222 ) );
    var dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 50, 10, 0 );
    scene.add( dirLight );

    var orbitControls = new OrbitControls( camera, renderer.domElement );
    orbitControls.autoRotate = true;

    var planetTexture = new THREE.TextureLoader().load( "../../assets/textures/mars/mars_1k_color.jpg" );
    var normalTexture = new THREE.TextureLoader().load( "../../assets/textures/mars/mars_1k_normal.jpg" );
    var planetMaterial = new THREE.MeshLambertMaterial( {
        map: planetTexture,
        normalMap: normalTexture
    } );

    scene.add( new THREE.Mesh( new THREE.SphereGeometry( 20, 40, 40 ), planetMaterial ) )

    render();

    function render() 
    {
        stats.update();
        orbitControls.update( clock.getDelta() );

        renderer.render( scene, camera );
        
        requestAnimationFrame( render );
    }
}

window.addEventListener( 'load' , () => {
    init() ;
} ) ;
