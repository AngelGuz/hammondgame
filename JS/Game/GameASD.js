// TODO: WebGL
var uniforms1, uniforms2;

// TODO:

var scene;
var scene2;

var camera;
var camera2;

var jetskiTest;
var jetski;
// TODO: Nuevos Objetos
var Mono;
var Mono2;

var renderer;
var renderer2;

var controls;
var objects = [];
var clock;
var clock2;
var deltaTime;
var keys = {};

//var timer = 30;
var count = 3500;

var emitterSettings = [];
var particleGroup;

/*window.setInterval(function () {

  if (timer == 0) {
    timer = 0;
    $('#contador').empty();
    $('#contador').append('GAME OVER ');
    $('#contador2').empty();
    $('#contador2').append('GAME OVER ');


  } else {
    timer = timer - 1;
    //console.log('Timer: ' + timer);
    $('#contador').empty();
    $('#contador').append('Timer: ' + timer);

    $('#contador2').empty();
    $('#contador2').append('Timer: ' + timer);
  }
  //console.log(timer);
}, 1000);*/

var counter = setInterval(timer, 10); //10 will  run it every 100th of a second
function timer() {
  if (count <= 0) {
    clearInterval(counter);
    $('#contador').empty();
    $('#contador').append('GAME OVER ');
    $('#contador2').empty();
    $('#contador2').append('GAME OVER ');
    return;
  } else {
  }
  count--;
  $('#contador').empty();
  $('#contador').append("Timer: " + count / 100 + " secs");

  $('#contador2').empty();
  $('#contador2').append("Timer: " + count / 100 + " secs");
  //document.getElementById("timer").innerHTML = count / 100 + " secs";
}

//objeto para la colision
var raycaster;
var objetosConColision = []; //los objetos que si tenga colision  los agregamos a este arreglo
//UNA VEZ QUE QUITES EL OBJETO DE LA ESCENA QUITALO DEL ARREGLO TAMBIEN

var raycaster2;
var objetosConColision2 = [];

// NOTE: Model Multiplayer
var player1ToPlayer2, player2ToPlayer1;
var position;
// NOTE: END Model Multiplayer

// TODO: Colisiones V2
var choco1 = false, choco2 = false;
var MovingCube, MovingCube2;
var collidableMeshList = [];
var collidableMeshList2 = [];
var wall, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9, wall10, wall11, wall12, wall13, wall14, wall15, wall16, wall17, wall18, wall19, wall20, wall21, wall22, wall23;
var wal, wal2, wal3, wal4, wal5, wal6, wal7, wal8, wal9, wal10, wal11, wal12, wal13, wal14, wal15, wal16, wal17, wal18, wal19, wal20, wal21, wal22, wal23;
// TODO: End Colisiones V2

// TODO: 
var Usuario1Gano = false;
var timerUsario1;
var Usuario2Gano = false;
var timerUsario2;
var Goal;
var Goal2;
var goalCollidableMeshList = [];
var goal2CollidableMeshList = [];
// TODO: 


// NOTE: Reloj 2 Test.
var Reloj2;
var isWorldReady3 = [false];
var colisionReloj2 = [];
var objetosConColisionReloj2 = [];
// NOTE:

// TODO: Modelo con animacion.
var mixers = [];
var objsWithAnimation = [];
var robotControl;
// TODO: End Modelo Animacion.

// TODO: Escenario
var Escenario1;
var Escenario2;
var raycasterEscenario;
var objetosConColisionEscenario = [];
var colisionEscenario1 = [];
var colisionEscenario2 = [];
var isWorldReadyEscenario = [false];
// TODO: END Escenario

// TODO: Nuevo Objeto MONO
var objetosConColisionNuevo = [];
var colisionNuevo = [];
var colisionNuevo2 = [];

var colision = [];
var colision2 = [];

var isWorldReady = [false, false];

// TODO: MONO
var isWorldReady2 = [false];


// TODO: Water 
var waterParams = {
  color: '#ffffff',
  scale: 60,
  flowX: 1,
  flowY: 1,
};
var water;
// TODO: End Water

$(document).ready(function () {

  if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
  }

  timer();
  //inicializando el raycaster
  raycaster = new THREE.Raycaster();
  raycaster2 = new THREE.Raycaster();

  setupScene();
  setupScene2();

  //creando los rayos a disparar para la colision
  camera.rayos = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1)
  ]; //esta disparando en sus 4 puntos cardinales

  camera2.rayos = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1)
  ];

  // TODO: Agregar Escenaro a la escena
  loadOBJWithMTL("assets/", "escenarioTest.obj", "escenarioTest.mtl", objectEscenario => {
    //objetosConColisionEscenario.rotation.y = THREE.Math.degToRad(-90);
    //objetosConColisionEscenario.rotation.z = THREE.Math.degToRad(-90);
    Escenario1 = objectEscenario.clone();
    Escenario1.position.z = -80;
    Escenario1.position.x = 19;
    Escenario1.position.y = .6;
    Escenario1.rotation.y = THREE.Math.degToRad(0);

    Escenario2 = objectEscenario.clone();
    Escenario2.position.z = -80;
    Escenario2.position.x = 19;
    Escenario2.position.y = .6;
    Escenario2.rotation.y = THREE.Math.degToRad(0);

    scene.add(Escenario1);
    scene2.add(Escenario2);

    isWorldReadyEscenario[0] = true;
  }
  );

  loadOBJWithMTL("assets/SmallTropical/", "SmallTropical.obj", "Small_Tropical.mtl", EscenaryStyle => {

    EscenaryStyle.position.set(-20, -4, 100);
    EscenaryStyle.rotation.y = THREE.Math.degToRad(180);
    //EscenaryStyle.scale.set();
    scene.add(EscenaryStyle);

    var EscenaryStyle2 = EscenaryStyle.clone();
    EscenaryStyle2.position.set(-20, -4, 100);
    //EscenaryStyle2.rotation.y = THREE.Math.degToRad(180);

    scene2.add(EscenaryStyle2);

  });

  loadOBJWithMTL("assets/", "botP2.obj", "botP2.mtl", object => {
    object.position.set(0, 0, -10);
    object.scale.set(0.5, 0.5, 0.5);

    player1ToPlayer2 = object;
    player1ToPlayer2.position.set(0, 0, -10);
    player1ToPlayer2.scale.set(0.5, 0.5, 0.5);


    player2ToPlayer1 = object.clone();
    player2ToPlayer1.position.set(0, 0, -10);
    player2ToPlayer1.scale.set(0.5, 0.5, 0.5);

    scene.add(player1ToPlayer2);
    scene2.add(player2ToPlayer1);

  });

  // NOTE: Modelos de cajas.
  loadOBJWithMTL("assets/", "box.obj", "box.mtl", object => {
    object.position.z = -30;

    var objectcopy = object.clone();
    objectcopy.position.z = -30;

    var box2 = object.clone();
    box2.position.x = 30;
    var box2copy = object.clone();
    box2copy.position.x = 30;

    isWorldReady[0] = true;
  });

  // NOTE: Modelo del robot
  loadOBJWithMTL("assets/", "botP2.obj", "botP2.mtl", object => {
    object.position.z = -10;
    object.scale.set(0.5, 0.5, 0.5);


    jetski = object.clone();
    camera2.position.z = 8;
    camera2.position.y = 9;
    camera2.rotation.x = THREE.Math.degToRad(-10);

    jetskiTest = object;
    camera.position.z = 8;
    camera.position.y = 9;
    camera.rotation.x = THREE.Math.degToRad(-10);

    scene.add(object);

    object.add(camera);
    jetski.add(camera2);

    scene2.add(jetski);

    isWorldReady[1] = true;
  });

  // NOTE: Modelo de reloj 1 para aumentar el tiempo.
  loadOBJWithMTL("assets/", "RelojTest.obj", "RelojTest.mtl", object => {
    //object.rotatiion.y = THREE.Math.degToRad( 0 );
    object.position.z = -103;
    object.position.y = 1;
    object.position.x = 42.5;
    //object.scale.set(1,1,1);

    Mono = object;

    scene.add(Mono);

    objetosConColisionNuevo.push(Mono);

    isWorldReady2[0] = true;
  });

  // NOTE: Modelo de reloj 2 para aumentar el tiempo.
  loadOBJWithMTL("assets/", "RelojTest.obj", "RelojTest.mtl", object => {
    //object.rotatiion.y = THREE.Math.degToRad( 0 );
    object.position.z = -79;
    object.position.x = 18.5;
    object.position.y = 1;
    //object.scale.set(1,1,1);

    Reloj2 = object;

    scene2.add(Reloj2);

    objetosConColisionReloj2.push(Reloj2);

    isWorldReady3[0] = true;
  });

  // NOTE: FBX Loader
  var loader = new THREE.FBXLoader();
  loader.load('assets/TestAvion.fbx', function (object) {
    object.mixer = new THREE.AnimationMixer(object);

    mixers.push(object.mixer);
    var action = object.mixer.clipAction(object.animations[0]);
    action.play();

    object.position.z = -150;
    object.position.x = 20;
    object.scale.set(0.1, 0.1, 0.1);
    object.rotation.y = THREE.Math.degToRad(90);
    object.rotation.z = THREE.Math.degToRad(-20);

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(object);
  });

  var loader = new THREE.FBXLoader();
  loader.load('assets/TestAvion.fbx', function (object) {
    object.mixer = new THREE.AnimationMixer(object);

    mixers.push(object.mixer);
    var action = object.mixer.clipAction(object.animations[0]);
    action.play();

    object.position.z = -150;
    object.position.x = 20;
    object.scale.set(0.1, 0.1, 0.1);
    object.rotation.y = THREE.Math.degToRad(90);
    object.rotation.z = THREE.Math.degToRad(-20);




    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene2.add(object);
  });
  // NOTE: END FBX Loader

  render();
  render2();

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
});

function loadOBJWithMTL(path, objFile, mtlFile, onLoadCallback) {
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath(path);
  mtlLoader.load(mtlFile, materials => {
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(path);
    objLoader.load(objFile, object => {
      onLoadCallback(object);
    });
  });
}

function onKeyDown(event) {
  keys[String.fromCharCode(event.keyCode)] = true;
}
function onKeyUp(event) {
  keys[String.fromCharCode(event.keyCode)] = false;
}

function render() {
  //timer +=1;
  //console.log(timer);
  setTimeout(function () {
    requestAnimationFrame(render);

    /*objsWithAnimation.forEach(({ mixer }) => {
      mixer.update(clock.getDelta);
    });*/

    if (mixers.length > 0) {
      for (var i = 0; i < mixers.length; i++) {
        mixers[i].update(clock.getDelta());
      }
    }

  }, 1000 / 80);

  deltaTime = clock.getDelta();

  uniforms1.time.value += deltaTime * 5;
  uniforms2.time.value = clock.elapsedTime;

  var yaw = 0;
  var yawPlayer2 = 0;
  var yaw2 = 0;

  var forward = 0;
  var forwardPlayer2 = 0;
  var forward2 = 0;

  if (keys["A"]) {
    yaw = 15;
    yawPlayer2 = 15;
    yaw2 = 15;

  } else if (keys["D"]) {
    yaw = -15;
    yawPlayer2 = -15;
    yaw2 = -15;
  }
  if (keys["W"]) {
    forward = -20;
    forwardPlayer2 = -20;
    forward2 = -20;

  } else if (keys["S"]) {
    forward = 20;
    forwardPlayer2 = 20;
    forward2 = 20;
  }

  // IMPORTANT: Mesh Collision.
  var originPoint = MovingCube.position.clone();
  for (var vertexIndex = 0; vertexIndex < MovingCube.geometry.vertices.length; vertexIndex++) {
    var localVertex = MovingCube.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4(MovingCube.matrix);
    var directionVector = globalVertex.sub(MovingCube.position);

    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    var collisionResults = ray.intersectObjects(collidableMeshList);
    var desicion = (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length());
    if (desicion) {
      //console.log(collisionResults.length > 0 && collisionResults[0].distance < directionVector.length());

    }
  }

  // IMPORTANT: Goal Collision
  var goalOriginPoint = MovingCube.position.clone();
  for (var goalvertexIndex = 0; goalvertexIndex < MovingCube.geometry.vertices.length; goalvertexIndex++) {
    var goalLocalVertex = MovingCube.geometry.vertices[goalvertexIndex].clone();
    var goalGlobalVertex = goalLocalVertex.applyMatrix4(MovingCube.matrix);
    var goalDirectionVector = goalGlobalVertex.sub(MovingCube.position);

    var goalRay = new THREE.Raycaster(goalOriginPoint, goalDirectionVector.clone().normalize());
    var collisionResults = goalRay.intersectObjects(goalCollidableMeshList);
    if (collisionResults.length > 0 && collisionResults[0].distance < goalDirectionVector.length() && count < 2000) {
      if (!Usuario1Gano) {
        timerUsario1 = count;
        console.log(timerUsario1);
      }
      Usuario1Gano = true;
    }


  }

  // IMPORTANT: Bot choca con Reloj 1.
  if (isWorldReady2[0]) {
    for (var i = 0; i < camera.rayos.length; i++) {
      var rashoLaser = camera.rayos[i];
      raycaster.set(jetskiTest.position, rashoLaser);
      colisionNuevo = raycaster.intersectObjects(objetosConColisionNuevo, true);
      if (colisionNuevo.length > 0 && colisionNuevo[0].distance < 1) {
        console.log("Choco Escena 1");

        count = count + 500;

        scene.remove(colisionNuevo[0].object.parent);
        objetosConColisionNuevo.pop(colisionNuevo[0].object.parent);

      }
    }
  }
  // IMPORTANT: Bot choca con Reloj 2.
  if (isWorldReady3[0]) {
    for (var i = 0; i < camera.rayos.length; i++) {
      var rashoLaser = camera.rayos[i];
      raycaster2.set(jetskiTest.position, rashoLaser);
      colisionReloj2 = raycaster2.intersectObjects(objetosConColisionReloj2, true
      );
      if (colisionReloj2.length > 0 && colisionReloj2[0].distance < 1) {
        //console.log("Choco Escena 2");
        count = count + 500;

        scene.remove(colisionReloj2[0].object.parent);
        objetosConColisionNuevo.pop(colisionReloj2[0].object.parent);

        scene2.remove(colisionReloj2[0].object.parent);
        objetosConColisionReloj2.pop(colisionReloj2[0].object.parent);

      }
    }
  }

  if (isWorldReady[0] && isWorldReady[1]) {
    for (var i = 0; i < camera.rayos.length; i++) {
      var rayo = camera.rayos[i];

      raycaster.set(jetskiTest.position, rayo);
      colision = raycaster.intersectObjects(objetosConColision, true);

      if (colision.length > 0 && colision[0].distance < 1) {
        timer = 0;
        $("#contador").empty();
        $("#contador").append(timer);
        console.log(timer);

        //TODO: set if

        scene2.remove(colision2[0].object.parent);
        objetosConColision2.pop(colision2[0].object.parent);
      }
    }

    jetskiTest.rotation.y += yaw * deltaTime;
    jetskiTest.translateZ(forward * deltaTime);

    player2ToPlayer1.rotation.y += yawPlayer2 * deltaTime;
    player2ToPlayer1.translateZ(forwardPlayer2 * deltaTime);

    MovingCube.rotation.y += yaw2 * deltaTime;
    MovingCube.translateZ(forward2 * deltaTime);

  }


  // NOTE: Jugabilidad.
  if (Usuario1Gano == false && Usuario2Gano == false && count == 0) {

    //console.log("Perdineron GG IZI");
    //$(location).attr('href', 'gameOver.html');
    $('#JuegoTerminado').css('display', 'block');

    var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 0, 0), 5.5); //1.0
    scene.add(ambientLight);

    Caman('#GameOver', function () {
  			
      this.sinCity();
      this.noise(50);
      this.render();

    });

    $('body').on('click', '#salir', function(){
      $(location).attr('href', 'index.html');
    });

    $('body').on('click', '#reanudar', function(){
      $(location).attr('href', 'game.html');
    });

  } else if (Usuario1Gano == true && Usuario2Gano == false && count == 0) {
    //console.log("Solo el Jugador 1 Gano! Muy bien! Tiempo: " + (timerUsario1 / 100) + "s");

    localStorage.setItem("ResultadoJugador1", (timerUsario1 / 100) + "s");
    localStorage.setItem("ResultadoJugador2", " No Llego");
    $('#JuegoTerminado').css('display', 'block');

    $('body').on('click', '#salir', function(){
      $(location).attr('href', 'index.html');
    });

    $('body').on('click', '#reanudar', function(){
      $(location).attr('href', 'game.html');
    });

    //$(location).attr('href', 'gameOver.html');
  } else if (Usuario1Gano == false && Usuario2Gano == true && count == 0) {
    //console.log("Solo el Jugador 2 Gano! Muy bien! Tiempo: " + (timerUsario2 / 100) + "s");

    localStorage.setItem("ResultadoJugador2", "No Llego");
    localStorage.setItem("ResultadoJugador2", (timerUsario2 / 100) + "s");
    $('#JuegoTerminado').css('display', 'block');

    $('body').on('click', '#salir', function(){
      $(location).attr('href', 'index.html');
    });

    $('body').on('click', '#reanudar', function(){
      $(location).attr('href', 'game.html');
    });

    //$(location).attr('href', 'gameOver.html');
  } else if (Usuario1Gano == true && Usuario2Gano == true) {
    //console.log("Jugador 1 Tiempo: " + (timerUsario1 / 100) + "s" + ", Jugador 2 Tiempo: " + (timerUsario2 / 100) + "s");
    localStorage.setItem("ResultadoJugador1", (timerUsario1 / 100) + "s");
    localStorage.setItem("ResultadoJugador2", (timerUsario2 / 100) + "s");

    $('#JuegoTerminado').css('display', 'block');

    var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 0), 5.5); //1.0
    scene.add(ambientLight);

    $('body').on('click', '#salir', function(){
      $(location).attr('href', 'scores.html');
    });

    $('body').on('click', '#reanudar', function(){
      $(location).attr('href', 'game.html');
    });

    //$(location).attr('href', 'gameOver.html');
  }
  renderer.render(scene, camera);

}

function render2() {
  setTimeout(function () {
    requestAnimationFrame(render2);

    if (mixers.length > 0) {
      for (var i = 0; i < mixers.length; i++) {
        mixers[i].update(clock.getDelta());
      }
    }
  }, 1000 / 80);

  deltaTime = clock2.getDelta();

  var yaw2 = 0;
  var forward2 = 0;

  var yawPlayer1 = 0;
  var forwardPlayer1 = 0;

  var yawGoal = 0;
  var forwardGoal = 0;

  if (keys["%"]) { //izquierda
    yaw2 = 5;
    yawPlayer1 = 5;
    yawGoal = 5;
  } else if (keys["'"]) { //derecha
    yaw2 = -5;
    yawPlayer1 = -5;
    yawGoal = -5;
  }
  if (keys["&"]) { //arriba
    forward2 = -10;
    forwardPlayer1 = -10;
    forwardGoal = -10;
  } else if (keys["("]) { //abajo
    forward2 = 10;
    forwardPlayer1 = 10;
    forwardGoal = 10;
  }

  var originPoint2 = MovingCube2.position.clone();
  for (var vertexIndex2 = 0; vertexIndex2 < MovingCube2.geometry.vertices.length; vertexIndex2++) {
    var localVertex2 = MovingCube2.geometry.vertices[vertexIndex2].clone();
    var globalVertex2 = localVertex2.applyMatrix4(MovingCube2.matrix);
    var directionVector2 = globalVertex2.sub(MovingCube2.position);

    var ray2 = new THREE.Raycaster(originPoint2, directionVector2.clone().normalize());
    var collisionResults2 = ray2.intersectObjects(collidableMeshList2);
    if (collisionResults2.length > 0 && collisionResults2[0].distance < directionVector2.length()) {
      //console.log("hit");

    }
  }

  // IMPORTANT: Goal Collision Jugador 2
  var goal2OriginPoint = MovingCube2.position.clone();
  for (var goal2vertexIndex = 0; goal2vertexIndex < MovingCube2.geometry.vertices.length; goal2vertexIndex++) {
    var goal2LocalVertex = MovingCube2.geometry.vertices[goal2vertexIndex].clone();
    var goal2GlobalVertex = goal2LocalVertex.applyMatrix4(MovingCube2.matrix);
    var goal2DirectionVector = goal2GlobalVertex.sub(MovingCube2.position);

    var goal2Ray = new THREE.Raycaster(goal2OriginPoint, goal2DirectionVector.clone().normalize());
    var collisionResults2 = goal2Ray.intersectObjects(goal2CollidableMeshList);
    if (collisionResults2.length > 0 && collisionResults2[0].distance < goal2DirectionVector.length() && count < 2000) {
      //console.log("Ganaste Usuario 2");
      if (!Usuario2Gano) {
        timerUsario2 = count;
        console.log(timerUsario2);
      }
      Usuario2Gano = true;
    }
  }

  // IMPORTANT: Bot choca con Reloj 1.
  if (isWorldReady2[0]) {
    for (var i = 0; i < camera2.rayos.length; i++) {
      var rashoLaser = camera2.rayos[i];
      raycaster2.set(jetski.position, rashoLaser);
      colisionNuevo = raycaster2.intersectObjects(objetosConColisionNuevo, true);
      if (colisionNuevo.length > 0 && colisionNuevo[0].distance < 1) {
        //console.log("Choco Escena 1");

        count = count + 500;

        scene.remove(colisionNuevo[0].object.parent);
        objetosConColisionNuevo.pop(colisionNuevo[0].object.parent);

      }
    }
  }
  // IMPORTANT: Bot choca con Reloj 2.
  if (isWorldReady3[0]) {
    for (var i = 0; i < camera2.rayos.length; i++) {
      var rashoLaser = camera2.rayos[i];
      raycaster2.set(jetski.position, rashoLaser);
      colisionReloj2 = raycaster2.intersectObjects(objetosConColisionReloj2, true
      );
      if (colisionReloj2.length > 0 && colisionReloj2[0].distance < 1) {
        //console.log("Choco Escena 2");
        count = count + 500;

        scene.remove(colisionReloj2[0].object.parent);
        objetosConColisionNuevo.pop(colisionReloj2[0].object.parent);

        scene2.remove(colisionReloj2[0].object.parent);
        objetosConColisionReloj2.pop(colisionReloj2[0].object.parent);


      }
    }
  }


  if (isWorldReady2[0]) {
    for (var i = 0; i < camera2.rayos.length; i++) {
      var rashoLaser = camera2.rayos[i];
      raycaster2.set(jetski.position, rashoLaser);
      colisionNuevo2 = raycaster2.intersectObjects(
        objetosConColisionNuevo,
        true
      );
      if (colisionNuevo2.length > 0 && colisionNuevo2[0].distance < 1) {
        //dscene2.remove(colisionNuevo[0].object.parent);
        console.log("Choco Escena 2");
        /*if (scene2.remove(colision2[0].object.parent)) {
					console.log(scene2.remove(colision2[0].object.parent));
					scene2.remove(colision2[0].object.parent);
				}*/

        /*TODO: Checar si este ...[0].lenth esta bien. o si es sin el [0] */
        //if (!colision2[0].length) return;
        //scene2.remove(colision2[0].object.parent);
      }
    }
  }

  if (isWorldReady[0] && isWorldReady[1]) {
    for (var i = 0; i < camera2.rayos.length; i++) {
      var rayo2 = camera2.rayos[i];

      raycaster2.set(jetski.position, rayo2);

      colision2 = raycaster2.intersectObjects(objetosConColision2, true);

      if (colision2.length > 0 && colision2[0].distance < 1) {
        timer = 0;
        $("#contador").empty();
        $("#contador").append(timer);
        console.log(timer);

        if (colision.length) {
          scene.remove(colision[0].object.parent);
          objetosConColision.pop(colision[0].object.parent);
        }

        if (colision2.length) {
          scene2.remove(colision2[0].object.parent);
          objetosConColision2.pop(colision2[0].object.parent);
        }
      }
    }

    jetski.rotation.y += yaw2 * deltaTime;
    jetski.translateZ(forward2 * deltaTime);

    player1ToPlayer2.rotation.y += yawPlayer1 * deltaTime;
    player1ToPlayer2.translateZ(forwardPlayer1 * deltaTime);

    MovingCube2.rotation.y += yawGoal * deltaTime;
    MovingCube2.translateZ(forwardGoal * deltaTime);

  }


// NOTE: Jugabilidad.
if (Usuario1Gano == false && Usuario2Gano == false && count == 0) {

  var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 0, 0), 5.5); //1.0
  scene2.add(ambientLight);

} else if (Usuario1Gano == true && Usuario2Gano == false && count == 0) {
 
  
  //$('#JuegoTerminado').css('display', 'block');
  //$(location).attr('href', 'gameOver.html');
} else if (Usuario1Gano == false && Usuario2Gano == true && count == 0) {
  
  $('#JuegoTerminado').css('display', 'block');
  //$(location).attr('href', 'gameOver.html');
} else if (Usuario1Gano == true && Usuario2Gano == true) {
  
  var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 0), 5.5); //1.0
  scene2.add(ambientLight);
  //$('#JuegoTerminado').css('display', 'block');
  //$(location).attr('href', 'gameOver.html');
}

  renderer2.render(scene2, camera2);
}

function setupScene() {
  var visibleSize = { width: window.innerWidth, height: window.innerHeight };

  clock = new THREE.Clock();
  scene = new THREE.Scene();

  var geometryShader = new THREE.BoxBufferGeometry( 0.75, 0.75, 0.75 );

  uniforms1 = {
    time: { value: 1.0 }
  };
  uniforms2 = {
    time: { value: 1.0 },
    texture: { value: new THREE.TextureLoader().load('images/disturb.jpg') }
  };

  uniforms2.texture.value.wrapS = uniforms2.texture.value.wrapT = THREE.RepeatWrapping;

  var params = [
    [ 'fragment_shader1', uniforms1 ],
    [ 'fragment_shader2', uniforms2 ],
    [ 'fragment_shader3', uniforms1 ],
    [ 'fragment_shader4', uniforms1 ]
  ];

  var materialShader = new THREE.ShaderMaterial({
    uniforms: params[1][1],
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById(params[1][0]).textContent
  });

  var meshWithShader = new THREE.Mesh(geometryShader, materialShader);
  meshWithShader.position.x = 1 - (params.length - 1) / 2;
  meshWithShader.position.y = 1 % 2 - 0.5;
  scene.add(meshWithShader);

  camera = new THREE.PerspectiveCamera(
    75,
    visibleSize.width / visibleSize.height,
    0.1,
    800
  );
  camera.position.z = 2;
  camera.position.y = 5;

  renderer = new THREE.WebGLRenderer({ precision: "mediump" });
  renderer.setClearColor(new THREE.Color(0x99ccff));
  //renderer.setPixelRatio(visibleSize.width / visibleSize.height);
  renderer.setSize(visibleSize.width / 1.0005, visibleSize.height / 2.1);

  var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1),0.6);
  scene.add(ambientLight); 

  var directionalLight = new THREE.DirectionalLight(
    new THREE.Color(1, 1, 1),
    0.4
  );
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
  grid.position.y = -1;
  //scene.add(grid);

  // TODO: Add Water Scene
  var waterGeometry = new THREE.PlaneBufferGeometry(20, 20);
  water = new THREE.Water(waterGeometry, {
    color: waterParams.color,
    scale: waterParams.scale,
    flowDireccion: new THREE.Vector2(waterParams.flowX, waterParams.flowY),
    textureWidth: 1024,
    textureHeight: 1024
  });
  water.position.y = -1;
  water.rotation.x = Math.PI * - 0.5;
  water.scale.set(100, 50, 100);
  scene.add(water);

  var geo = new THREE.PlaneBufferGeometry(2000, 2000);
  var mat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
  var plane = new THREE.Mesh(geo, mat);

  plane.rotation.x = THREE.Math.degToRad(90);
  plane.position.y = -2;
  scene.add(plane);
  // TODO: End Water Scene

  // NOTE: Cubo para colisiones
  var cubeGeometry = new THREE.CubeGeometry(2, 2, 2, 1, 1, 1);
  var wireMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  MovingCube = new THREE.Mesh(cubeGeometry, wireMaterial);
  MovingCube.position.set(0, -1, -10);
  scene.add(MovingCube);

  // NOTE: Suelo para colisiones
  var wallGeometry = new THREE.CubeGeometry(4.5, 1, 19, 1, 1, 1);
  //var wallMaterial = new THREE.MeshBasicMaterial({ color: 0x8888ff });
  var wallMaterial = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/wood.jpg')  });
  wallMaterial.side = THREE.DoubleSide;
  var wireMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
  wall = new THREE.Mesh(wallGeometry, wallMaterial);
  wall.position.set(-0.2, 0, -10);
  scene.add(wall);
  collidableMeshList.push(wall);

  var wall2Geometry = new THREE.CubeGeometry(4.9, 1, 16.5, 1, 1, 1);
  wall2 = new THREE.Mesh(wall2Geometry, wallMaterial);
  wall2.position.set(8.5, 0, -17);
  wall2.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall2);
  collidableMeshList.push(wall2);

  var wall3Geometry = new THREE.CubeGeometry(4.9, 1, 30, 1, 1, 1);
  wall3 = new THREE.Mesh(wall3Geometry, wallMaterial);
  wall3.position.set(14.4, 0, -33.7);
  scene.add(wall3);
  collidableMeshList.push(wall3);

  var wall4Geometry = new THREE.CubeGeometry(4.9, 1, 10, 1, 1, 1);
  wall4 = new THREE.Mesh(wall4Geometry, wallMaterial);
  wall4.position.set(7, 0, -46.2);
  wall4.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall4);
  collidableMeshList.push(wall4);

  var wall5Geometry = new THREE.CubeGeometry(4.9, 1, 15, 1, 1, 1);
  wall5 = new THREE.Mesh(wall5Geometry, wallMaterial);
  wall5.position.set(24, 0, -41.5);
  wall5.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall5);
  collidableMeshList.push(wall5);

  var wall6Geometry = new THREE.CubeGeometry(4.9, 1, 40, 1, 1, 1);
  wall6 = new THREE.Mesh(wall6Geometry, wallMaterial);
  wall6.position.set(4.5, 0, -68);
  scene.add(wall6);
  collidableMeshList.push(wall6);

  var wall7Geometry = new THREE.CubeGeometry(4.9, 1, 35, 1, 1, 1);
  wall7 = new THREE.Mesh(wall7Geometry, wallMaterial);
  wall7.position.set(-0.2, 0, -100);
  scene.add(wall7);
  collidableMeshList.push(wall7);

  var wall7Geometry = new THREE.CubeGeometry(4.9, 1, 35, 1, 1, 1);
  wall7 = new THREE.Mesh(wall7Geometry, wallMaterial);
  wall7.position.set(-0.2, 0, -100);
  scene.add(wall7);
  collidableMeshList.push(wall7);

  var wall8Geometry = new THREE.CubeGeometry(4.9, 1, 35, 1, 1, 1);
  wall8 = new THREE.Mesh(wall8Geometry, wallMaterial);
  wall8.position.set(4.4, 0, -129.5);
  scene.add(wall8);
  collidableMeshList.push(wall8);


  wall9 = new THREE.Mesh(wall8Geometry, wallMaterial);
  wall9.position.set(-5.1, 0, -129.5);
  scene.add(wall9);
  collidableMeshList.push(wall9);

  var wall10Geometry = new THREE.CubeGeometry(5.5, 1, 10, 1, 1, 1);
  wall10 = new THREE.Mesh(wall10Geometry, wallMaterial);
  wall10.position.set(12, 0, -65.8);
  wall10.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall10);
  collidableMeshList.push(wall10);

  var wall11Geometry = new THREE.CubeGeometry(5.1, 1, 14.5, 1, 1, 1);
  wall11 = new THREE.Mesh(wall11Geometry, wallMaterial);
  wall11.position.set(14.5, 0, -75.5);
  //wall11.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall11);
  collidableMeshList.push(wall11);

  var wall12Geometry = new THREE.CubeGeometry(5.1, 1, 45, 1, 1, 1);
  wall12 = new THREE.Mesh(wall12Geometry, wallMaterial);
  wall12.position.set(19.4, 0, -100);
  //wall11.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall12);
  collidableMeshList.push(wall12);

  var wall13Geometry = new THREE.CubeGeometry(5.1, 1, 14.8, 1, 1, 1);
  wall13 = new THREE.Mesh(wall13Geometry, wallMaterial);
  wall13.position.set(19.0, 0, -124);
  wall13.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall13);
  collidableMeshList.push(wall13);

  var wall14Geometry = new THREE.CubeGeometry(5.1, 1, 22, 1, 1, 1);
  wall14 = new THREE.Mesh(wall14Geometry, wallMaterial);
  wall14.position.set(14.4, 0, -137);
  //wall14.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall14);
  collidableMeshList.push(wall14);

  var wall15Geometry = new THREE.CubeGeometry(5.1, 1, 22, 1, 1, 1);
  wall15 = new THREE.Mesh(wall15Geometry, wallMaterial);
  wall15.position.set(24.2, 0, -137);
  //wall14.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall15);
  collidableMeshList.push(wall15);

  var wall16Geometry = new THREE.CubeGeometry(5.1, 1, 20.5, 1, 1, 1);
  wall16 = new THREE.Mesh(wall16Geometry, wallMaterial);
  wall16.position.set(29.2, 0, -53);
  //wall14.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall16);
  collidableMeshList.push(wall16);

  var wall17Geometry = new THREE.CubeGeometry(5.1, 1, 10, 1, 1, 1);
  wall17 = new THREE.Mesh(wall17Geometry, wallMaterial);
  wall17.position.set(35, 0, -61);
  wall17.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall17);
  collidableMeshList.push(wall17);

  var wall18Geometry = new THREE.CubeGeometry(5.1, 1, 55, 1, 1, 1);
  wall18 = new THREE.Mesh(wall18Geometry, wallMaterial);
  wall18.position.set(33.8, 0, -90);
  //wall17.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall18);
  collidableMeshList.push(wall18);

  var wall19Geometry = new THREE.CubeGeometry(5.1, 1, 32, 1, 1, 1);
  wall19 = new THREE.Mesh(wall19Geometry, wallMaterial);
  wall19.position.set(38.8, 0, -132);
  //wall17.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall19);
  collidableMeshList.push(wall19);

  var wall20Geometry = new THREE.CubeGeometry(5.1, 1, 5.5, 1, 1, 1);
  wall20 = new THREE.Mesh(wall20Geometry, wallMaterial);
  wall20.position.set(39, 0, -104.7);
  wall20.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall20);
  collidableMeshList.push(wall20);

  wall21 = new THREE.Mesh(wall20Geometry, wallMaterial);
  wall21.position.set(39, 0, -114.5);
  wall21.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall21);
  collidableMeshList.push(wall21);

  var wall22Geometry = new THREE.CubeGeometry(5.1, 1, 15, 1, 1, 1);
  wall22 = new THREE.Mesh(wall22Geometry, wallMaterial);
  wall22.position.set(44, 0, -109.5);
  //wall22.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall22);
  collidableMeshList.push(wall22);

  var wall23Geometry = new THREE.CubeGeometry(10, 1, 50, 1, 1, 1);
  wall23 = new THREE.Mesh(wall23Geometry, wallMaterial);
  wall23.position.set(16.5, 0, -151);
  wall23.rotation.y = THREE.Math.degToRad(90);
  scene.add(wall23);
  collidableMeshList.push(wall23);

  // NOTE:Suelo para ganar.
  var goalGeometry = new THREE.CubeGeometry(49, 1, 10, 1, 1, 1);
  var goalWireMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

  Goal = new THREE.Mesh(goalGeometry, goalWireMaterial);
  Goal.position.set(17, -.2, -151.3);
  scene.add(Goal);
  goalCollidableMeshList.push(Goal);

  $("#scene-section").append(renderer.domElement);
}

function setupScene2() {
  var visibleSize = { width: window.innerWidth, height: window.innerHeight };
  clock2 = new THREE.Clock();
  scene2 = new THREE.Scene();
  camera2 = new THREE.PerspectiveCamera(
    75,
    visibleSize.width / visibleSize.height,
    0.1,
    800
  );
  camera2.position.z = 2;
  camera2.position.y = 5;

  renderer2 = new THREE.WebGLRenderer({ precision: "mediump" });
  renderer2.setClearColor(new THREE.Color(0x99ccff));
  renderer2.setPixelRatio(visibleSize.width / visibleSize.height);
  renderer2.setSize(visibleSize.width / 1.0005, visibleSize.height / 2.1);

  var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
  scene2.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(
    new THREE.Color(1, 1, 1),
    0.9
  );
  directionalLight.position.set(1, 1, 1).normalize();
  scene2.add(directionalLight);

  var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
  grid.position.y = -1;
  //scene2.add(grid);

  // TODO: Add Water
  var waterGeometry = new THREE.PlaneBufferGeometry(20, 20);
  water = new THREE.Water(waterGeometry, {
    color: waterParams.color,
    scale: waterParams.scale,
    flowDireccion: new THREE.Vector2(waterParams.flowX, waterParams.flowY),
    textureWidth: 1024,
    textureHeight: 1024
  });
  water.position.y = -1;
  water.rotation.x = Math.PI * - 0.5;
  water.scale.set(100, 50, 100);
  scene2.add(water);

  var geo = new THREE.PlaneBufferGeometry(2000, 2000);
  var mat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
  var plane = new THREE.Mesh(geo, mat);

  plane.rotation.x = THREE.Math.degToRad(90);
  plane.position.y = -2;
  scene2.add(plane);
  // TODO: End Water

  // NOTE: Cubo para colision.
  var cubeGeometry = new THREE.CubeGeometry(2, 2, 2, 1, 1, 1);
  var wireMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  MovingCube2 = new THREE.Mesh(cubeGeometry, wireMaterial);
  MovingCube2.position.set(0, -1, -10);
  scene2.add(MovingCube2);

  // NOTE: Suelo para colisiones
  var walGeometry = new THREE.CubeGeometry(4.5, 1, 19, 1, 1, 1);
  //var walMaterial = new THREE.MeshBasicMaterial({ color: 0x8888ff });
  var walMaterial = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('images/wood.jpg')  });
  wal = new THREE.Mesh(walGeometry, walMaterial);
  wal.position.set(-0.2, 0, -10);
  scene2.add(wal);
  collidableMeshList2.push(wal);

  var wal2Geometry = new THREE.CubeGeometry(4.9, 1, 16.5, 1, 1, 1);
  wal2 = new THREE.Mesh(wal2Geometry, walMaterial);
  wal2.position.set(8.5, 0, -17);
  wal2.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal2);
  collidableMeshList2.push(wal2);

  var wal3Geometry = new THREE.CubeGeometry(4.9, 1, 30, 1, 1, 1);
  wal3 = new THREE.Mesh(wal3Geometry, walMaterial);
  wal3.position.set(14.4, 0, -33.7);
  scene2.add(wal3);
  collidableMeshList2.push(wal3);

  var wal4Geometry = new THREE.CubeGeometry(4.9, 1, 10, 1, 1, 1);
  wal4 = new THREE.Mesh(wal4Geometry, walMaterial);
  wal4.position.set(7, 0, -46.2);
  wal4.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal4);
  collidableMeshList2.push(wal4);

  var wal5Geometry = new THREE.CubeGeometry(4.9, 1, 15, 1, 1, 1);
  wal5 = new THREE.Mesh(wal5Geometry, walMaterial);
  wal5.position.set(24, 0, -41.5);
  wal5.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal5);
  collidableMeshList2.push(wal5);

  var wal6Geometry = new THREE.CubeGeometry(4.9, 1, 40, 1, 1, 1);
  wal6 = new THREE.Mesh(wal6Geometry, walMaterial);
  wal6.position.set(4.5, 0, -68);
  scene2.add(wal6);
  collidableMeshList2.push(wal6);

  var wal7Geometry = new THREE.CubeGeometry(4.9, 1, 35, 1, 1, 1);
  wal7 = new THREE.Mesh(wal7Geometry, walMaterial);
  wal7.position.set(-0.2, 0, -100);
  scene2.add(wal7);
  collidableMeshList2.push(wal7);

  var wal8Geometry = new THREE.CubeGeometry(4.9, 1, 35, 1, 1, 1);
  wal8 = new THREE.Mesh(wal8Geometry, walMaterial);
  wal8.position.set(4.4, 0, -129.5);
  scene2.add(wal8);
  collidableMeshList2.push(wal8);


  wal9 = new THREE.Mesh(wal8Geometry, walMaterial);
  wal9.position.set(-5.1, 0, -129.5);
  scene2.add(wal9);
  collidableMeshList2.push(wal9);

  var wal10Geometry = new THREE.CubeGeometry(5.5, 1, 10, 1, 1, 1);
  wal10 = new THREE.Mesh(wal10Geometry, walMaterial);
  wal10.position.set(12, 0, -65.8);
  wal10.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal10);
  collidableMeshList2.push(wal10);

  var wal11Geometry = new THREE.CubeGeometry(5.1, 1, 14.5, 1, 1, 1);
  wal11 = new THREE.Mesh(wal11Geometry, walMaterial);
  wal11.position.set(14.5, 0, -75.5);
  //wall11.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal11);
  collidableMeshList2.push(wal11);

  var wal12Geometry = new THREE.CubeGeometry(5.1, 1, 45, 1, 1, 1);
  wal12 = new THREE.Mesh(wal12Geometry, walMaterial);
  wal12.position.set(19.4, 0, -100);
  //wall11.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal12);
  collidableMeshList2.push(wal12);

  var wal13Geometry = new THREE.CubeGeometry(5.1, 1, 14.8, 1, 1, 1);
  wal13 = new THREE.Mesh(wal13Geometry, walMaterial);
  wal13.position.set(19.0, 0, -124);
  wal13.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal13);
  collidableMeshList2.push(wal13);

  var wal14Geometry = new THREE.CubeGeometry(5.1, 1, 22, 1, 1, 1);
  wal14 = new THREE.Mesh(wal14Geometry, walMaterial);
  wal14.position.set(14.4, 0, -137);
  //wall14.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal14);
  collidableMeshList2.push(wal14);

  var wal15Geometry = new THREE.CubeGeometry(5.1, 1, 22, 1, 1, 1);
  wal15 = new THREE.Mesh(wal15Geometry, walMaterial);
  wal15.position.set(24.2, 0, -137);
  //wall14.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal15);
  collidableMeshList2.push(wal15);

  var wal16Geometry = new THREE.CubeGeometry(5.1, 1, 20.5, 1, 1, 1);
  wal16 = new THREE.Mesh(wal16Geometry, walMaterial);
  wal16.position.set(29.2, 0, -53);
  //wall14.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal16);
  collidableMeshList2.push(wal16);

  var wal17Geometry = new THREE.CubeGeometry(5.1, 1, 10, 1, 1, 1);
  wal17 = new THREE.Mesh(wal17Geometry, walMaterial);
  wal17.position.set(35, 0, -61);
  wal17.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal17);
  collidableMeshList2.push(wal17);

  var wal18Geometry = new THREE.CubeGeometry(5.1, 1, 55, 1, 1, 1);
  wal18 = new THREE.Mesh(wal18Geometry, walMaterial);
  wal18.position.set(33.8, 0, -90);
  //wall17.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal18);
  collidableMeshList2.push(wal18);

  var wal19Geometry = new THREE.CubeGeometry(5.1, 1, 32, 1, 1, 1);
  wal19 = new THREE.Mesh(wal19Geometry, walMaterial);
  wal19.position.set(38.8, 0, -132);
  //wall17.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal19);
  collidableMeshList2.push(wal19);

  var wal20Geometry = new THREE.CubeGeometry(5.1, 1, 5.5, 1, 1, 1);
  wal20 = new THREE.Mesh(wal20Geometry, walMaterial);
  wal20.position.set(39, 0, -104.7);
  wal20.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal20);
  collidableMeshList2.push(wal20);

  wal21 = new THREE.Mesh(wal20Geometry, walMaterial);
  wal21.position.set(39, 0, -114.5);
  wal21.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal21);
  collidableMeshList2.push(wal21);

  var wal22Geometry = new THREE.CubeGeometry(5.1, 1, 15, 1, 1, 1);
  wal22 = new THREE.Mesh(wal22Geometry, walMaterial);
  wal22.position.set(44, 0, -109.5);
  //wall22.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal22);
  collidableMeshList2.push(wal22);

  var wal23Geometry = new THREE.CubeGeometry(10, 1, 50, 1, 1, 1);
  wal23 = new THREE.Mesh(wal23Geometry, walMaterial);
  wal23.position.set(16.5, 0, -151);
  wal23.rotation.y = THREE.Math.degToRad(90);
  scene2.add(wal23);
  collidableMeshList2.push(wal23);


  // NOTE: Goal segundo player.
  var goalGeometry2 = new THREE.CubeGeometry(49, 1, 10, 1, 1, 1);
  var goalMaterial2 = new THREE.MeshBasicMaterial({ color: 0x000000 });
  var goalWireMaterial2 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

  Goal2 = new THREE.Mesh(goalGeometry2, goalWireMaterial2);
  Goal2.position.set(17, -.2, -151.3);
  scene2.add(Goal2);
  goal2CollidableMeshList.push(Goal2);

  $("#scene-section2").append(renderer2.domElement);
}

