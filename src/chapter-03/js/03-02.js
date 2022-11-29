import * as THREE from 'three';
import * as dat from 'dat.gui';

import * as Helper from '../../js/helper.js';


function init() {

    // use the defaults
    const stats = Helper.initStats();
    const renderer = Helper.initRenderer();
    const camera = Helper.initCamera();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new THREE.Scene();

    const cubeAndSphere = Helper.addDefaultCubeAndSphere( scene );
    const cube = cubeAndSphere.cube;
    const sphere = cubeAndSphere.sphere;
    const plane = Helper.addGroundPlane( scene );


    // add subtle ambient lighting
    const ambiColor = "#1c1c1c";
    const ambientLight = new THREE.AmbientLight( ambiColor );
    scene.add( ambientLight );

    // add spotlight for a bit of light
    const spotLight0 = new THREE.SpotLight( 0xcccccc );
    spotLight0.position.set( -40, 30, -10 );
    spotLight0.lookAt( plane );
    scene.add( spotLight0 );

    // add target and light
    const target = new THREE.Object3D();
    //target.position = new THREE.Vector3( 5, 0, 0 );
    target.position.x = 5;
    target.position.y = 0;
    target.position.z = 0;

    const spotLight = new THREE.SpotLight( "#ffffff" );
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 100;
    spotLight.target = plane;
    spotLight.distance = 0;
    spotLight.angle = 0.4;
    spotLight.shadow.camera.fov = 120;
    scene.add( spotLight );
    const debugCamera = new THREE.CameraHelper( spotLight.shadow.camera );

    const pp = new THREE.SpotLightHelper( spotLight )
    scene.add( pp )

    // add a small sphere simulating the pointlight
    const sphereLight = new THREE.SphereGeometry( 0.2 );
    const sphereLightMaterial = new THREE.MeshBasicMaterial( {
        color: 0xac6c25
    } );
    const sphereLightMesh = new THREE.Mesh( sphereLight, sphereLightMaterial );
    sphereLightMesh.castShadow = true;

    //sphereLightMesh.position = new THREE.Vector3( 3, 20, 3 );
    sphereLightMesh.position.x = 3;
    sphereLightMesh.position.y = 20;
    sphereLightMesh.position.z = 3;
    scene.add( sphereLightMesh );

    // for controlling the rendering
    var step = 0;
    var invert = 1;
    var phase = 0;

    const controls = setupControls();
    render();

    function render() {
        stats.update();
        // rotate the cube around its axes
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        // bounce the sphere up and down
        step += controls.bouncingSpeed;
        sphere.position.x = 20 + ( 10 * ( Math.cos( step ) ) );
        sphere.position.y = 2 + ( 10 * Math.abs( Math.sin( step ) ) );

        // move the light simulation
        if ( !controls.stopMovingLight ) {
            if ( phase > 2 * Math.PI ) {
                invert = invert * -1;
                phase -= 2 * Math.PI;
            } else {
                phase += controls.rotationSpeed;
            }
            sphereLightMesh.position.z = +( 7 * ( Math.sin( phase ) ) );
            sphereLightMesh.position.x = +( 14 * ( Math.cos( phase ) ) );
            sphereLightMesh.position.y = 15;

            if ( invert < 0 ) {
                var pivot = 14;
                sphereLightMesh.position.x = ( invert * ( sphereLightMesh.position.x - pivot ) ) + pivot;
            }

            spotLight.position.copy( sphereLightMesh.position );
        }

        pp.update();

        renderer.render( scene, camera );

        // render using requestAnimationFrame
        requestAnimationFrame( render );
    }

    function setupControls() {
        const controls = new function () {
            this.rotationSpeed = 0.03;
            this.bouncingSpeed = 0.03;
            this.ambientColor = ambiColor;
            this.pointColor = spotLight.color.getStyle();
            this.intensity = 1;
            this.distance = 0;
            this.angle = 0.1;
            this.shadowDebug = false;
            this.castShadow = true;
            this.target = "Plane";
            this.stopMovingLight = false;
            this.penumbra = 0;
        };

        const gui = new dat.GUI();
        gui.addColor( controls, 'ambientColor' ).onChange( function ( e ) {
            ambientLight.color = new THREE.Color( e );
        } );

        gui.addColor( controls, 'pointColor' ).onChange( function ( e ) {
            spotLight.color = new THREE.Color( e );
        } );

        gui.add( controls, 'angle', 0, Math.PI * 2 ).onChange( function ( e ) {
            spotLight.angle = e;
        } );

        gui.add( controls, 'intensity', 0, 5 ).onChange( function ( e ) {
            spotLight.intensity = e;
        } );

        gui.add( controls, 'penumbra', 0, 1 ).onChange( function ( e ) {
            spotLight.penumbra = e;
        } );

        gui.add( controls, 'distance', 0, 200 ).onChange( function ( e ) {
            spotLight.distance = e;
        } );

        gui.add( controls, 'shadowDebug' ).onChange( function ( e ) {
            if ( e ) {
                scene.add( debugCamera );
            } else {
                scene.remove( debugCamera );
            }
        } );

        gui.add( controls, 'castShadow' ).onChange( function ( e ) {
            spotLight.castShadow = e;
        } );

        gui.add( controls, 'target', [ 'Plane', 'Sphere', 'Cube' ] ).onChange( function ( e ) {
            switch ( e ) {
                case "Plane":
                    spotLight.target = plane;
                    break;
                case "Sphere":
                    spotLight.target = sphere;
                    break;
                case "Cube":
                    spotLight.target = cube;
                    break;
            }

        } );

        gui.add( controls, 'stopMovingLight' ).onChange( function ( e ) {
            stopMovingLight = e;
        } );

        return controls;
    }

}

window.addEventListener( 'load', () => {
    init();
} );
