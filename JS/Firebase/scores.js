$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {

        var userID = user.uid

        firebase.database().ref('users/' + userID).on('value', function (snapshot) {
            //console.log(snapshot.val());
            userN = snapshot.val();
            $(".form-inline").html('<p style="margin:0px;" class="navbar-brand" id="idUserName">' + userN.userName + '<p>');
        });

        var ref = firebase.database().ref("users");
        ref.on("value", function (snapshot) {

            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                console.log(childData);
                var name = childData.userName;

                $('#list').append('<li style="display: flow-root;">'+ name + '<div> <p style="position:relative; float: left;">Player 1:'+ '</p> <p style="position:relative; float: left; margin-right: 50px;">'+ childData.Player1 + '</p> <p style="position:relative; float: left;">Player 2:</p><p style="position:relative; float: left;">' + childData.Player2 +'</p> </div> </li>');

                        
            });

        });


        $('body').on('click', '#btnCloseScore', function(){
            $(location).attr('href', 'index.html');
        });
    }); 
});