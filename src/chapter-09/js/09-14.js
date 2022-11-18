import * as THREE from 'three';
import * as dat from 'dat.gui';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' ;

import * as Helper from '../../js/helper.js';


function init() 
{
    var stats = Helper.initStats();
    var renderer = Helper.initRenderer();
    var camera = Helper.initCamera();
    var scene = new THREE.Scene();
    scene.add( new THREE.AmbientLight( 0x333333 ) );

    camera.position.set( 0, 0, 20 );

    var trackballControls = Helper.initTrackballControls( camera, renderer );
    var clock = new THREE.Clock();

    var mixer = new THREE.AnimationMixer();
    var clipAction
    var animationClip
    var mesh
    var controls
    var mixerControls = {
        time: 0,
        timeScale: 1,
        stopAllAction: function () {
            mixer.stopAllAction()
        },
    }

    Helper.initDefaultLighting( scene );
    var loader = new GLTFLoader();
    loader.load( '../../assets/models/CesiumMan/CesiumMan.gltf', function ( result ) {
        // correctly position the scene
        result.scene.scale.set( 6, 6, 6 );
        result.scene.translateY( -3 );
        result.scene.rotateY( -0.3 * Math.PI )
        scene.add( result.scene )

        // setup the mixer
        mixer = new THREE.AnimationMixer( result.scene );
        animationClip = result.animations[ 0 ];
        clipAction = mixer.clipAction( animationClip ).play();
        animationClip = clipAction.getClip();

        // add the animation controls
        enableControls();
    } );

    function enableControls() {
        var gui = new dat.GUI();
        var mixerFolder = gui.addFolder( "AnimationMixer" )
        mixerFolder.add( mixerControls, "time" ).listen()
        mixerFolder.add( mixerControls, "timeScale", 0, 5 ).onChange( function ( timeScale ) {
            mixer.timeScale = timeScale
        } );
        mixerFolder.add( mixerControls, "stopAllAction" ).listen()

        controls = addClipActionFolder( "ClipAction 1", gui, clipAction, animationClip );
    }

    render();

    function render() {
        stats.update();
        var delta = clock.getDelta();
        trackballControls.update( delta );
        requestAnimationFrame( render );
        renderer.render( scene, camera )

        if ( mixer && clipAction && controls ) {
            mixer.update( delta );
            controls.time = mixer.time;
            controls.effectiveTimeScale = clipAction.getEffectiveTimeScale();
            controls.effectiveWeight = clipAction.getEffectiveWeight();
        }
    }
}

window.addEventListener( 'load' , () => {
    init() ;
} ) ;
