var indexColor = 0;

/////////////////// THREE JS VARS
var database;
//////////////////////////////////

isLogged();

$(document).ready(function () {

    // NOTE: Get User Name from firebase

    //Cambiar color de fondoa
    var BodyColor = ["#BBD1EA", "#A1C6EA", "#507DBC", "#04080F"];
    $('body').css('background', BodyColor[0]);

    var songs = ['<source src="Direccion1.mpeg">', '<source src="Direccion2">', '<source src="Direccion3">',];
    //Button Login
    $('body').on('click', '#btnLog', function () {

        let logEmail = $('#log-email').val();
        let logPassword = $('#log-password').val();

        firebase.auth().signInWithEmailAndPassword(logEmail, logPassword)
            .then(function () {
                console.log("Usuario Logeado Correctamente");
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
            });
    });
    //Button Signin
    $('body').on('click', '#btnSig', function () {

        let sigUserName = $('#sig-userName').val();
        let sigEmail = $('#sig-email').val();
        let sigPassword = $('#sig-password').val();

        // TODO: FireBase Log

        firebase.auth().createUserWithEmailAndPassword(sigEmail, sigPassword)
            .then(function (response) {
                console.log('Registrado Correctamente');
                console.log(response.user.uid);

                firebase.database().ref("users").child(response.user.uid).set({
                    userName: sigUserName,
                    userEmial: sigEmail,
                    Player1: 0,
                    Player2: 0,
                })

            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
            });

    });

    //Button LogOut
    $('body').on('click', '#btnLogOut', function () {
        $('#btnLog').prop('style').removeProperty('display');

        $("#btnLogOut").remove();

        // TODO: Logout
        firebase.auth().signOut()
            .then(function () {

            })
            .catch(function (error) {
                console.log(error);
            });
    });

    //Option Menu
    $('body').on('click', '#idPlay', function () {
        $(location).attr('href', 'game.html');
    });

    $('body').on('click', '#idRecords', function () {
        $(location).attr('href', 'scores.html');
    });

    $('body').on('click', '#idOptions', function () {
        $('#canvas').empty();
        $('#canvas').append(`
        <div id="canvas">
            <nav class="navbar navbar-dark bg-dark">
                <a href="" class="navbar-brand">Game</a>
                <form action="" class="form-inline">
                    <p style="margin:0px;" class="navbar-brand" id="idUserName"> <p>
                </form>
            </nav>
            <div class="content h-100 d-flex justify-content-center">
                <div class="my-auto" style="max-width: 200px; width: 100% ">
                    <div class="card text-white bg-dark" id="noseID" style="max-width: 400px; width: 100%;">
                        <div class="card-header">
                        Menu
                        </div>
                        <div class="card-body mx-auto">
                            <button class="btn btn-outline-light mb-3" id="idBackColor" style="width:130px; white-space: normal;">Change Color and Sound</button></br>
                            <button class="btn btn-outline-light mb-3" id="idExitOptions" style="width:130px; white-space: normal;">Salir</button></br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `); 
    });
    //Option Menu - Change color
    $('body').on('click', '#idBackColor', function () {
        /*$('audio').trigger('pause');
        $('audio').empty();
        $('audio').append(songs[indexColor]);*/
        indexColor++;
        if (indexColor >= BodyColor.length) {
            indexColor = 0;
        }
        $('body').css("background", BodyColor[indexColor]);
        //$('audio').trigger("load");
    });
    //Option Menu
    $('body').on('click', '#idExitOptions', function () {
        $('#canvas').empty();
        $('#canvas').append(`
        <div id="canvas">
            <nav class="navbar navbar-dark bg-dark">
                <a href="" class="navbar-brand">Game</a>
                <form action="" class="form-inline">
                    <p id="idUserName"> User Name <p>
                </form>
            </nav>
            <div class="content h-100 d-flex justify-content-center">
                <div class="my-auto" style="max-width: 200px; width: 100% ">
                    <div class="card text-white bg-dark" id="noseID" style="max-width: 400px; width: 100%;">
                        <div class="card-header">
                        Menu
                        </div>
                        <div class="card-body mx-auto">
                            <button class="btn btn-outline-light mb-3" id="idPlay" style="width:130px">PLAY</button></br>
                            <button class="btn btn-outline-light mb-3" id="idOptions" style="width:130px">Options</button></br>
                            <button class="btn btn-outline-light mb-3" id="idRecords" style="width:130px">Score</button></br>
                            <button class="btn btn-outline-light mb-3" id="idExit" style="width:130px">Salir</button></br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `);
    });

    $('body').on('click', "#idExit", function () {

        $('#canvas').empty();
        $('#canvas').append(`
        <div id="canvas">
            <nav class="navbar navbar-dark bg-dark">
                <a href="" class="navbar-brand">Game</a>
                <div action="" class="form-inline">
                    <input class="form-control mr-sm-2" id="log-email" type="email" placeholder="Ingrese Email">
                    <input class="form-control mr-sm-2" id="log-password" type="password" placeholder="Ingrese una contraseña">
                    <button class="btn btn-outline-light my-2 my-sm-0" id="btnLog">Ingresar</button>
                </div>
            </nav>

            <div class="container-fluid h-100">
                <div class="row h-100 justify-content-center">
                    <div class="col-7" style="background:#000;">
                        asdasdasd
                    </div>
                    <div class="col-5 col-centered m-0">
                        <div action="" class="col-12 content-centered">
                            <div class="form-group">
                                <input class="form-control mb-4" id="sig-userName" type="text" placeholder="Ingrese Apodo">
                                <input class="form-control  mb-4" id="sig-email" type="email" placeholder="Ingrese Email">
                                <input class="form-control  mb-4" id="sig-password" type="password" placeholder="Ingrese una contraseña">
                                <button class="btn btn-outline-dark  mb-4" id="btnSig">Ingresar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `);

        // TODO: Logout
        firebase.auth().signOut()
            .then(function () {
                console.log("OUT....");
            })
            .catch(function (error) {
                console.log(error);
            });
    });
    //////////////////////////////////////////////////


    //////////////        Share FB     ///////////////
    $('body').on('click', '#shareFB', function () {
        var score = $('#txtScore').val();

    });
    //////////////////////////////////////////////////

});

function isLogged() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var userN;
            console.log("Usuario Activo");
            /*$('#btnLog').css('display', 'none');
            $('.form-inline').append(`
                <button class="btn btn-outline-light my-2 my-sm-0 ml-2" id="btnLogOut">Salir</button>
            `)*/

            var userID = user.uid
            firebase.database().ref('users/' + userID ).on('value', function (snapshot) {
                //console.log(snapshot.val());
                userN = snapshot.val();
                $(".form-inline").html('<p style="margin:0px;" class="navbar-brand" id="idUserName">' + userN.userName + '<p>');
            });

            
            /*var ref = firebase.database().ref("users");
            ref.on(user.uid, function (snapshot) {

                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    console.log(childData);
                    var name = childData.userName;
                    $(".form-inline").html('<p style="margin:0px;" class="navbar-brand" id="idUserName">' + name + '<p>');
                });

            });*/

            $('#canvas').empty();
            //Main menu HTML
            $('#canvas').append(`
            <div id="canvas">
                <nav class="navbar navbar-dark bg-dark">
                    <a href="" class="navbar-brand">Game</a>
                    <form action="" class="form-inline">
                        <p id="idUserName"> User Name <p>
                    </form>
                </nav>
                <div class="content h-100 d-flex justify-content-center">
                    <div class="my-auto" style="max-width: 200px; width: 100% ">
                        <div class="card text-white bg-dark" id="noseID" style="max-width: 400px; width: 100%;">
                            <div class="card-header">
                                Menu
                            </div>
                            <div class="card-body mx-auto">
                                <button class="btn btn-outline-light mb-3" id="idPlay" style="width:130px">PLAY</button></br>
                                <button class="btn btn-outline-light mb-3" id="idOptions" style="width:130px">Options</button></br>
                                <button class="btn btn-outline-light mb-3" id="idRecords" style="width:130px">Score</button></br>
                                <button class="btn btn-outline-light mb-3" id="idExit" style="width:130px">Salir</button></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `);

        } else {
            // No user is signed in.
            console.log("Usuario NO Activo");
        }
    });
}




///////////////////////////////////////


