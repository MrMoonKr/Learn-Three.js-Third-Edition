import * as THREE from 'three';
import Stats from 'stats.js';

import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';



export function initStats( type ) 
{

    var panelType = ( typeof type !== 'undefined' && type ) && ( !isNaN( type ) ) ? parseInt( type ) : 0;
    var stats = new Stats();

    stats.showPanel( panelType ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );

    return stats;
}

export function initTrackballControls( camera, renderer ) 
{
    var trackballControls = new TrackballControls( camera, renderer.domElement );
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;
    trackballControls.keys = [65, 83, 68];

    return trackballControls;
}