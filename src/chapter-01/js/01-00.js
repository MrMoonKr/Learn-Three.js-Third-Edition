import * as THREE from '/node_modules/three/build/three.module.js' ; // 직접 임포트 -> 클라이언트로 전송

function init()
{
    console.log( 'hello html5. 안녕 html5' );
}

window.addEventListener( 'load', () => 
{
    init() ;
} );