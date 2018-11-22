$(document).ready(function () {
    var userID;

    firebase.auth().onAuthStateChanged(function (user) {
        userID = user.uid

        firebase.database().ref('users/' + userID).on('value', function (snapshot) {
            //console.log(snapshot.val());
            userN = snapshot.val();
            $(".form-inline").html('<p style="margin:0px;" class="navbar-brand" id="idUserName">' + userN.userName + '<p>');
        });

        var result1 = localStorage.getItem("ResultadoJugador1");
        var result2 = localStorage.getItem("ResultadoJugador2");


        if (result1 && result2) {
            console.log(userID);

            var db = firebase.database();
            db.ref("users/" + userID).update({
                Player1: result1,
                Player2: result2,
            });
        }

        $('#ValGameOver1').text(result1);
        $('#ValGameOver2').text(result2);
    });

    $('body').on('click', '#shareFB', function () {
        var score = $('#txtScore').val();
        var result1 = localStorage.getItem("ResultadoJugador1");
        var result2 = localStorage.getItem("ResultadoJugador2");
        shareScore(result1, result2);
    });

    $('body').on('click', '#returnMainMenu', function () {
        $(location).attr('href', 'index.html');
    });
    
    $('body').on('click', '#bestScores', function () {
        $(location).attr('href', 'scores.html');
    });

});

window.fbAsyncInit = function () { 
    FB.init({
        appId: '267162127460018', //APP ID
        status: true,
        xfbml: true,
        version: 'v3.2' // or v2.6, v2.5, v2.4, v2.3
    });
    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function shareScore(play1, play2) {
    FB.ui({
        method: 'share',
        href: 'https://hammondgame.ga/', //URL del juego.
        hashtag: '#HammondGame',
        quote: 'Player 1: ' + play1 + ',  '+'Player 2:'+play2, //
        //Usar API de inicio de sesion con facebook.
        //Api de facebook de juego online.

    }, function (respuesta) {
        console.log(respuesta);
    });
}