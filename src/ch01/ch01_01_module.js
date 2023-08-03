import * as THREE from 'three' ; // "importmap"을 사용하거나 node, npm, webpack 사용하여 번들링이 필요하다.


function init() {
    console.log( '앱 초기화' );
    console.log( 'Theree.js 버전 : ' + THREE.REVISION );
}

// 앱 진입점

window.addEventListener( 'load', () => {
    console.log( '[정보] Load 이벤트 발생 : 페이지 로딩 완료' );
    init() ;
} );

window.addEventListener( 'keydown', ( e ) => {
    console.log( `[정보] KeyDown 이벤트 발생 : ${e.key}, ${e.code}, ${e.keyCode}` ) ;
} );

window.addEventListener( 'keyup', ( e ) => {
    console.log( `[정보] KeyUp 이벤트 발생 : ${e.key}, ${e.code}, ${e.keyCode}` ) ;
} );