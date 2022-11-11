//import * as THREE from '/node_modules/three/build/three.module.js' ;
import * as THREE from 'three' ;

function init() 
{
    console.log( "hello three.js" );
    console.log( "Using Three.js version: " + THREE.REVISION ); 

}

window.addEventListener( 'load' , () => {
    init() ;
} ) ;