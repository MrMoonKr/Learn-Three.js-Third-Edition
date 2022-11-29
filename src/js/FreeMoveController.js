/**
 * 웹에서 사용자 입력처리 예제로 적합
 * 원본소스는 three/examples/jsm/controls/FirstPersonControls.js
 */


import {
    EventDispatcher,
    Object3D,
	MathUtils,
	Spherical,
	Vector3
} from 'three';

const _lookDirection = new Vector3();
const _spherical = new Spherical();
const _target = new Vector3();

/**
 * 자유롭게 수평을 유지하면서 날아 움직이는 카메라 컨트롤러
 */
class FreeMoveController extends EventDispatcher
{

    /**
     * 
     * @param {Object3D} object 
     * @param {HTMLCanvasElement} domElement 
     */
	constructor( object, domElement ) 
    {
        super();

		this.object = object;
		this.domElement = domElement;

		// API

		this.enabled = true;

		this.movementSpeed = 10.0;
		this.lookSpeed = 0.005;

		this.lookVertical = true;
		this.autoForward = false;

		this.activeLook = true;

		this.heightSpeed = false;
		this.heightCoef = 1.0;
		this.heightMin = 0.0;
		this.heightMax = 1.0;

		this.constrainVertical = false;
		this.verticalMin = 0;
		this.verticalMax = Math.PI;

		this.mouseDragOn = false;

		// internals

		this.autoSpeedFactor = 0.0;

		this.pointerX = 0;
		this.pointerY = 0;

		this.moveForward = false;
		this.moveBackward = false;
		this.moveLeft = false;
		this.moveRight = false;

		this.viewHalfX = 0;
		this.viewHalfY = 0;

		// private variables

		let lat = 0;
		let lon = 0;

		//

		this.handleResize = function () {

			if ( this.domElement === document ) {

				this.viewHalfX = window.innerWidth / 2;
				this.viewHalfY = window.innerHeight / 2;

			} else {

				this.viewHalfX = this.domElement.offsetWidth / 2;
				this.viewHalfY = this.domElement.offsetHeight / 2;

			}

		};


		

		this.lookAt = function ( x, y, z ) {

			if ( x.isVector3 ) {

				_target.copy( x );

			} else {

				_target.set( x, y, z );

			}

			this.object.lookAt( _target );

			setOrientation( this );

			return this;

		};

		this.update = function () {

			const targetPosition = new Vector3();

			return function update( delta ) {

				if ( this.enabled === false ) return;

				if ( this.heightSpeed ) 
                {
					const y = MathUtils.clamp( this.object.position.y, this.heightMin, this.heightMax );
					const heightDelta = y - this.heightMin;

					this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );
				} 
                else 
                {
					this.autoSpeedFactor = 0.0;
				}

				const actualMoveSpeed = delta * this.movementSpeed;

				if ( this.moveForward || ( this.autoForward && ! this.moveBackward ) ) this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
				if ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );

				if ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );
				if ( this.moveRight ) this.object.translateX( actualMoveSpeed );

				if ( this.moveUp ) this.object.translateY( actualMoveSpeed );
				if ( this.moveDown ) this.object.translateY( - actualMoveSpeed );

				let actualLookSpeed = delta * this.lookSpeed;

				if ( ! this.activeLook ) {

					actualLookSpeed = 0;

				}

				let verticalLookRatio = 1;

				if ( this.constrainVertical ) {

					verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

				}

				lon -= this.pointerX * actualLookSpeed;
				if ( this.lookVertical ) lat -= this.pointerY * actualLookSpeed * verticalLookRatio;

				lat = Math.max( - 85, Math.min( 85, lat ) );

				let phi = MathUtils.degToRad( 90 - lat );
				const theta = MathUtils.degToRad( lon );

				if ( this.constrainVertical ) {

					phi = MathUtils.mapLinear( phi, 0, Math.PI, this.verticalMin, this.verticalMax );

				}

				const position = this.object.position;

				targetPosition.setFromSphericalCoords( 1, phi, theta ).add( position );

				this.object.lookAt( targetPosition );

			};

		}();

		this.dispose = function () {

			this.domElement.removeEventListener( 'contextmenu', this.onContextMenu );
			this.domElement.removeEventListener( 'pointerdown', _onPointerDown );
			this.domElement.removeEventListener( 'pointermove', _onPointerMove );
			this.domElement.removeEventListener( 'pointerup', _onPointerUp );

			window.removeEventListener( 'keydown', _onKeyDown );
			window.removeEventListener( 'keyup', _onKeyUp );

		};

		const _onPointerMove = this.onPointerMove.bind( this );
		const _onPointerDown = this.onPointerDown.bind( this );
		const _onPointerUp = this.onPointerUp.bind( this );
		const _onKeyDown = this.onKeyDown.bind( this );
		const _onKeyUp = this.onKeyUp.bind( this );

		this.domElement.addEventListener( 'contextmenu', this.onContextMenu );
		this.domElement.addEventListener( 'pointerdown', _onPointerDown );
		this.domElement.addEventListener( 'pointermove', _onPointerMove );
		this.domElement.addEventListener( 'pointerup', _onPointerUp );

		window.addEventListener( 'keydown', _onKeyDown );
		window.addEventListener( 'keyup', _onKeyUp );

		function setOrientation( controls ) {

			const quaternion = controls.object.quaternion;

			_lookDirection.set( 0, 0, - 1 ).applyQuaternion( quaternion );
			_spherical.setFromVector3( _lookDirection );

			lat = 90 - MathUtils.radToDeg( _spherical.phi );
			lon = MathUtils.radToDeg( _spherical.theta );

		}

		this.handleResize();

		setOrientation( this );

	}

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    onKeyDown( e ) 
    {
        switch ( e.code ) 
        {
            case 'ArrowUp':
            case 'KeyW': this.moveForward = true; break;

            case 'ArrowLeft':
            case 'KeyA': this.moveLeft = true; break;

            case 'ArrowDown':
            case 'KeyS': this.moveBackward = true; break;

            case 'ArrowRight':
            case 'KeyD': this.moveRight = true; break;

            case 'KeyE': this.moveUp = true; break;
            case 'KeyQ': this.moveDown = true; break;
        }
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    onKeyUp( e ) 
    {
        switch ( e.code ) 
        {
            case 'ArrowUp':
            case 'KeyW': this.moveForward = false; break;

            case 'ArrowLeft':
            case 'KeyA': this.moveLeft = false; break;

            case 'ArrowDown':
            case 'KeyS': this.moveBackward = false; break;

            case 'ArrowRight':
            case 'KeyD': this.moveRight = false; break;

            case 'KeyE': this.moveUp = false; break;
            case 'KeyQ': this.moveDown = false; break;
        }
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    onContextMenu( e ) 
    {
        console.log( '[i] FreeMoveController.onContextMenu() called' );
        e.preventDefault();
    }

    /**
     * 
     * @param {PointerEvent} event 
     */
    onPointerDown( event ) 
    {
        if ( this.domElement !== document ) 
        {
            this.domElement.focus();
        }

        if ( this.activeLook ) 
        {
            switch ( event.button ) 
            {
                case 0: this.moveForward = true; break;
                case 2: this.moveBackward = true; break;
            }
        }

        this.mouseDragOn = true;
    }

    /**
     * 
     * @param {PointerEvent} event 
     */
    onPointerUp( event ) 
    {
        if ( this.activeLook ) 
        {
            switch ( event.button ) 
            {
                case 0: this.moveForward = false; break;
                case 2: this.moveBackward = false; break;
            }
        }

        this.mouseDragOn = false;
    }

    /**
     * 
     * @param {PointerEvent} event 
     */
    onPointerMove( event ) 
    {
        if ( this.domElement === document ) 
        {
            this.pointerX = event.pageX - this.viewHalfX;
            this.pointerY = event.pageY - this.viewHalfY;
        } 
        else 
        {
            this.pointerX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
            this.pointerY = event.pageY - this.domElement.offsetTop  - this.viewHalfY;
        }
    }


}



export { FreeMoveController };
