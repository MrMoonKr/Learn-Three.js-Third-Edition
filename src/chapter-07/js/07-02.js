/// <reference path="../../js/util.js" />

function init() {

  // use the defaults
  var stats = initStats();
  var renderer = initRenderer();
  /**
   * @type {THREE.PerspectiveCamera}
   */
  var camera = initCamera();
  var clock = new THREE.Clock();
  var trackballControls = initTrackballControls(camera, renderer);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 1650;

  camera.far = 1000000 ;
  camera.updateProjectionMatrix();

  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  var scene = new THREE.Scene();

  let cloud ;

  createPoints();
  render();

  function createPoints() {

    var geom = new THREE.Geometry();
    var material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      color: 0xffffff
    });

    // for (var x = -100; x < 100; x++) {
    //   for (var y = -100; y < 100; y++) {
    //     for ( var z = -100; z < 100; ++z ) {

    //       var particle = new THREE.Vector3(x * 4, y * 4, z * 4 );
    //       geom.vertices.push(particle);
    //       geom.colors.push(new THREE.Color(Math.random() * 0xffffff));
    //     }
    //   }
    // }

    let vertexCount = 1 * 1000 * 1000 ;

    let geometry = new THREE.BufferGeometry() ;
    let positions = new Float32Array( vertexCount * 3 ) ;
    let colors = new Float32Array( vertexCount * 3 ) ;
    let color = new THREE.Color() ;

    let worldSize = 1000 ;
    let worldHalfSize = worldSize / 2 ;

    for ( let i=0 , l=positions.length ; i < l ; i += 3 )
    {
      let x = Math.random() * worldSize - worldHalfSize ;
      let y = Math.random() * worldSize - worldHalfSize ;
      let z = Math.random() * worldSize - worldHalfSize ;
    
      positions[ i + 0 ] = x ;
      positions[ i + 1 ] = y ;
      positions[ i + 2 ] = z ;

      geom.vertices.push( new THREE.Vector3( x , y , z ) ) ;

      let cx = ( x / worldSize ) + 0.5 ;
      let cy = ( y / worldSize ) + 0.5 ;
      let cz = ( z / worldSize ) + 0.5 ;

      color.setRGB( cx, cy, cz ) ;

      colors[ i + 0 ] = color.r ;
      colors[ i + 1 ] = color.g ;
      colors[ i + 2 ] = color.b ;

      geom.colors.push( new THREE.Color( cx, cy, cz ) ) ;
    }

    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) ) ;
    geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) ) ;

    //cloud = new THREE.Points(geom, material);
    cloud = new THREE.Points(geometry, material);
    scene.add(cloud);
  }


  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    
    let time = Date.now() * 0.001 ;
    cloud.rotation.x = time * 0.1 ;
    cloud.rotation.y = time * 0.2 ;

    renderer.render( scene, camera );

    requestAnimationFrame(render);
  }
}