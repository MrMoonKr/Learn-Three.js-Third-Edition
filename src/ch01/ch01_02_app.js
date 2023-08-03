import * as THREE from 'three' ; // "importmap"을 사용하거나 node, npm, webpack 사용하여 번들링이 필요하다.

/**
 * @type {App}
 */
let theApp;

class App
{

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor( canvas )
    {
        /**
         * @type {HTMLCanvasElement}
         */
        this.canvas     = canvas ;
        /**
         * @type {THREE.WebGLRenderer}
         */
        this.renderer   = undefined ;

        this._setupRenderer() ;

    }

    onRender()
    {
        console.log( `[App] render() called : 캔버스 ${this.canvas.width}x${this.canvas.height}` );
    }

    onWindowResize()
    {
        this.renderer.setSize( window.innerWidth, window.innerHeight * 0.9 );
    }

    _setupRenderer()
    {
        this.renderer = new THREE.WebGLRenderer( { canvas: this.canvas } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        //this.renderer.setClearColor( 0xFF00FF );
        this.renderer.setClearColor( new THREE.Color( 0.2, 0.2, 0.2 ) );
        this.renderer.clearColor();
    }
}


function mainLoop( timeStamp )
{
    theApp.onRender();
    
    //console.log( '[정보] timeStamp : ' + parseInt( timeStamp / 1000 ) );
    requestAnimationFrame( mainLoop ) ;
}


function init() 
{
    console.log( '앱 초기화' );
    console.log( 'Theree.js 버전 : ' + THREE.REVISION ); // 현재 155

    const canvas    = document.getElementById( 'threejs-canvas' );
    //console.log( `[정보] 캔버스 크기 ${canvas.width} x ${canvas.height}` );
    canvas.width    = window.innerWidth ;
    canvas.height   = window.innerHeight * 0.9 ;
    //console.log( `[정보] 캔버스 크기 ${canvas.width} x ${canvas.height}` );

    theApp          = new App( canvas );
}

// 앱 진입점

window.addEventListener( 'load', () => {
    console.log( '[정보] Load 이벤트 발생 : 페이지 로딩 완료' );
    init();
    mainLoop();
} );

window.addEventListener( 'resize', ( e ) => {
    if ( theApp !== undefined ) {
        theApp.onWindowResize();
    }
})

window.addEventListener( 'keydown', ( e ) => {
    console.log( `[정보] KeyDown 이벤트 발생 : ${e.key}, ${e.code}, ${e.keyCode}` ) ;
} );

window.addEventListener( 'keyup', ( e ) => {
    console.log( `[정보] KeyUp 이벤트 발생 : ${e.key}, ${e.code}, ${e.keyCode}` ) ;
} );