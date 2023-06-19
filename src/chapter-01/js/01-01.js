// import * as THREE from '/node_modules/three/build/three.module.js' ; // 직접 임포트 -> 클라이언트로 전송
import * as THREE from 'three'; // "importmap"을 사용하거나 node, npm, webpack 사용하여 번들링이 필요하다.

function init() 
{
    console.log( "hello three.js" );
    console.log( "Using Three.js version: " + THREE.REVISION );

    window.addEventListener( 'keydown', keyDown );
    window.addEventListener( 'keyup', keyUp );

    // window.addEventListener( 'keypress', keyPress );
}

/**
 * 
 * @param {KeyboardEvent} event 
 */
function keyDown( event ) 
{
    console.log( `[i] KeyDown : ${event.key}, ${event.code}, ${event.keyCode}` );
}

/**
 * 
 * @param {KeyboardEvent} event 
 */
function keyUp( event )
{
    console.log( `[i] KeyUp : ${event.key}, ${event.code}, ${event.keyCode}` );
}

/**
 * 
 * @param {KeyboardEvent} event 
 */
function keyPress( event )
{
    console.log( `[i] KeyPress : ${event.key}, ${event.code}, ${event.keyCode}` );
}

window.addEventListener( 'load', () => {
    init();
} );