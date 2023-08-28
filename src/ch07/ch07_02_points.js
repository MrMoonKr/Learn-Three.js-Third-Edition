import * as THREE from 'three' ; // "importmap"을 사용하거나 node, npm, webpack 사용하여 번들링이 필요하다.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' ;
import Stats from 'three/examples/jsm/libs/stats.module' ;
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js' ;


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
        /**
         * @type {OrbitControls}
         */
        this.controls   = undefined ;
        /**
         * @type {Stats}
         */
        this.stats      = undefined ;


        this._setupRenderer() ;
        this._setupScene() ;
        this._setupCamera() ;
        this._setupConrols() ;
        this._setupStats() ;
        this._setupGUI() ;

        this.points = undefined ;
        this.createPoints() ;
    }

    createPoints( vertexCount = 1 * 1000 * 1000 )
    {
        //console.log( `생성 시도 정점 수 : ${vertexCount}` );

        if ( this.points ) // 기존 리소스 존재하면 삭제
        {
            this.scene.remove( this.points ) ;
            this.points = undefined ;
        }

        let material        = new THREE.PointsMaterial( {
            size: 2,
            vertexColors: true,
            color: 0xffffff
        } ) ;

        //let vertexCount     = 1 * 1000 * 1000 ;

        let geometry        = new THREE.BufferGeometry() ;
        let positions       = new Float32Array( vertexCount * 3 ) ;
        let colors          = new Float32Array( vertexCount * 3 ) ;
        let color           = new THREE.Color() ;

        let worldSize       = 1000 ;
        let worldHalfSize   = worldSize / 2 ;

        for ( let i = 0, l = positions.length; i < l; i += 3 ) 
        {
            let x           = Math.random() * worldSize - worldHalfSize ;
            let y           = Math.random() * worldSize - worldHalfSize ;
            let z           = Math.random() * worldSize - worldHalfSize ;

            positions[ i + 0 ] = x ;
            positions[ i + 1 ] = y ;
            positions[ i + 2 ] = z ;

            //geom.vertices.push( new THREE.Vector3( x, y, z ) ) ;

            let cx = ( x / worldSize ) + 0.5 ;
            let cy = ( y / worldSize ) + 0.5 ;
            let cz = ( z / worldSize ) + 0.5 ;

            color.setRGB( cx, cy, cz ) ;

            colors[ i + 0 ] = color.r ;
            colors[ i + 1 ] = color.g ;
            colors[ i + 2 ] = color.b ;

            //geom.colors.push( new THREE.Color( cx, cy, cz ) );
        }

        geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

        //cloud = new THREE.Points(geom, material);
        this.points = new THREE.Points( geometry, material );
        this.scene.add( this.points );
    }

    onUpdate( deltaTime )
    {
        this.controls.update() ;
        this.stats.update() ;

        //console.log( `[App] onUpdate() 호출 : ${deltaTime}` ) ;
        const cube = this.scene.getObjectByName( 'cube' );
        if ( cube )
        {
            cube.rotateY( 3 * Math.PI / 180 ) ;
        }

        if ( this.points )
        {
            this.points.rotation.x += 0.1 * deltaTime ;
            this.points.rotation.y += 0.2 * deltaTime ;
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
            10000
        ) ;

        this.camera.position.set( 5, 10, 1000 ) ;
        this.camera.lookAt( this.scene.position ) ;
    }

    _setupConrols()
    {
        this.controls = new OrbitControls( this.camera, this.renderer.domElement ) ;

        this.controls.screenSpacePanning = true ;
    }

    _setupStats()
    {
        this.stats = new Stats() ;
        document.body.appendChild( this.stats.dom ) ;
    }

    _setupGUI()
    {
        this.gui = new GUI() ;

        this.gui.add( document, 'title' ) ;

        this.NumberOfVertices = 1;
        this.gui.add( this, 'NumberOfVertices', 1, 100, 1 ).onChange( value => {
            //console.log( `요청 정점 수 : ${value} x 1000 x 1000` ) ;
            //this.createPoints( value * 1000 * 1000 ) ;
        } ).onFinishChange( value => {
            console.log( `생성 정점 수 : ${value} x 1000 x 1000` ) ;
            this.createPoints( value * 1000 * 1000 ) ;
        } ) ;
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

    document.title  = '스트레스 테스트' ;

    const canvas    = document.getElementById( 'threejs-canvas' );
    //console.log( `[정보] 캔버스 크기 ${canvas.width} x ${canvas.height}` );
    canvas.width    = window.innerWidth ;
    canvas.height   = window.innerHeight * 0.9 ;
    //console.log( `[정보] 캔버스 크기 ${canvas.width} x ${canvas.height}` );

    theApp          = new App( canvas );

    navigator.gpu
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

    switch ( e.key )
    {
        case '1':
            {
                theApp.createPoints( 1 * 1000 * 1000 ) ;
            }
            break;
        case '2':
            {
                theApp.createPoints( 2 * 1000 * 1000 ) ;
            }
            break;
        case '3':
            {
                theApp.createPoints( 3 * 1000 * 1000 ) ;
            }
            break;
        case '4':
            {
                theApp.createPoints( 4 * 1000 * 1000 ) ;
            }
            break;
        case '5':
            {
                theApp.createPoints( 5 * 1000 * 1000 ) ;
            }
            break;
        case '6':
            {
                theApp.createPoints( 6 * 1000 * 1000 ) ;
            }
            break;
        case '7':
            {
                theApp.createPoints( 7 * 1000 * 1000 ) ;
            }
            break;
        case '8':
            {
                theApp.createPoints( 8 * 1000 * 1000 ) ;
            }
            break;
        case '9':
            {
                theApp.createPoints( 9 * 1000 * 1000 ) ;
            }
            break;
        case '0':
            {
                theApp.createPoints( 10 * 1000 * 1000 ) ;
            }
            break;
    }
} );

window.addEventListener( 'keyup', ( e ) => {
    console.log( `[정보] KeyUp 이벤트 발생 : ${e.key}, ${e.code}, ${e.keyCode}` ) ;
} );