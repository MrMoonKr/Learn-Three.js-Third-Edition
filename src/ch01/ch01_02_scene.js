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
        /**
         * @type {THREE.Scene}
         */
        this.scene      = undefined ;
        /**
         * @type {THREE.PerspectiveCamera}
         */
        this.camera     = undefined ;



        this._setupRenderer() ;
        this._setupScene() ;
        this._setupCamera() ;

    }

    onUpdate( deltaTime )
    {
        //console.log( `[App] onUpdate() 호출 : ${deltaTime}` ) ;
        const cube = this.scene.getObjectByName( 'cube' );
        if ( cube )
        {
            cube.rotateY( 3 * Math.PI / 180 ) ;
        }
    }

    onRender()
    {
        //console.log( `[App] render() called : 캔버스 ${this.canvas.width}x${this.canvas.height}` );

        this.renderer.render( this.scene, this.camera ) ;
    }

    onWindowResize()
    {
        this.renderer.setSize( window.innerWidth, window.innerHeight * 0.9 ) ;
        this.renderer.setPixelRatio( window.devicePixelRatio ) ;

        this.camera.aspect = this.canvas.width / this.canvas.height ;
        this.camera.updateProjectionMatrix() ;
    }

    _setupRenderer()
    {
        this.renderer = new THREE.WebGLRenderer( { canvas: this.canvas } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        //this.renderer.setClearColor( 0xFF00FF );
        this.renderer.setClearColor( new THREE.Color( 0.1, 0.1, 0.1 ) );
        this.renderer.clearColor();
    }

    _setupScene()
    {
        this.scene = new THREE.Scene() ;

        const axis = new THREE.AxesHelper( 1 ) ;
        this.scene.add( axis ) ;

        const cubeGeo = new THREE.BoxGeometry( 1, 1, 1 ) ;
        const cubeMtl = new THREE.MeshBasicMaterial( {
            color: 0xFF0000,
            wireframe: true
        } ) ;

        const cube = new THREE.Mesh( cubeGeo, cubeMtl ) ;
        cube.name = 'cube' ;
        //cube.position.set( 0, 0, 1 ) ;
        this.scene.add( cube ) ;
    }

    _setupCamera()
    {
        this.camera = new THREE.PerspectiveCamera(
            50 ,
            this.canvas.width / this.canvas.height ,
            0.1 ,
            3000
        ) ;

        this.camera.position.set( 5, 10, 10 ) ;
        this.camera.lookAt( this.scene.position ) ;
    }
}

// 웹 시작 및 웹 메인 루프

let _start     = performance.now() ;
let _previous  = _start ;
let _elapsed   = 0 ;
let _delta     = 0 ;

/**
 * 하트비트 메인 시뮬레이션 루프 함수
 * @param {number} timeStamp 앱 시작 후 경과 시간 ( 밀리초 )
 */
function mainLoop( timeStamp )
{
    const currentTick = performance.now() ;
    _delta      = ( currentTick - _previous ) / 1000 ;
    _previous   = currentTick ;
    _elapsed    = currentTick - _start ;

    theApp.onUpdate( _delta ) ;
    theApp.onRender();
    
    //console.log( '[정보] timeStamp : ' + parseInt( timeStamp / 1000 ) );
    requestAnimationFrame( mainLoop ) ;
}

/**
 * 메인 진입점 함수
 */
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

// 웹 진입점

window.addEventListener( 'load', ( e ) => {
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