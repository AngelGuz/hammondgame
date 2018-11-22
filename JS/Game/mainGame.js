var camera, scene, renderer, geometry, material, mesh;

// Boolean for start and restart
var initAnim = true;
var runAnim = false;
var isPlay = false;
var theta = 0;

init();
render();

function init() {

 // Buttons startButton and resetButton
 var startButton = document.getElementById( 'startButtonId' );
 var resetButton = document.getElementById( 'resetButtonId' );

 // Start Button
  startButton.onclick = function StartAnimation() {

  if (initAnim) {
    initAnim = false;
    runAnim = true;
    theta = 0;
  }
  // Start and Pause 
  if (runAnim) { 
    startButton.innerHTML = 'Pause';
    runAnim = false;
    isPlay = true;
    animate();
    } else {
          startButton.innerHTML = 'Restart';
          runAnim = true;
          isPlay = false;
    }
  }

 // Reset Button
   resetButton.onclick = function ResetParameters() {

   // Set StartButton to Start  
   startButton.innerHTML = 'Start';

   // Boolean for Stop Animation
   initAnim = true;
   runAnim = false;
   theta = 0;
   isPlay = false;
   render();
   }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;
    scene.add(camera);

    geometry = new THREE.CubeGeometry(200, 200, 200);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

function animate(delta) {
console.log(runAnim);
    if (!isPlay) return;
    requestAnimationFrame(animate);
    theta += 0.01;
    render();
}

function render() {
    mesh.rotation.y = theta;
    renderer.render(scene, camera);
}

