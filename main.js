app.controller("mainCtrl",function($scope, $http) {
    $scope.seach_input = localStorage.getItem("textvalue");
    $scope.client_id = "b1d604e6c71ffb73a022a80766d869f1";
    $scope.limit = 100;
    $scope.tracks = [];
    var is_playing=false;
    SC.initialize({
                client_id: 'b1d604e6c71ffb73a022a80766d869f1'
            });
    $scope.search = function() {
        $http({ url: "https://api.soundcloud.com/tracks/", 
            params: {
                q: $scope.seach_input,
                client_id: $scope.client_id,
                limit: $scope.limit
            }
        }).then(
            function(x) {
                $scope.tracks = x.data;
                console.log(x);
            }
        )
    };
    $scope.play = function(i){
        var z=parseInt(i);
        console.log(z);
        var x=$scope.tracks[z].id;
        var y='/tracks/';
        var song=y.concat(x);
        var change=document.getElementById("pp").rows[z].cells;
        if(is_playing==false)
        {
            change[4].innerHTML="<i class='fas fa-pause-circle'></i>";
            localStorage.setItem("index",z);
            is_playing=true;
            SC.stream(song).then(function(player){
                player.play();
            });
        }
        else
        {
            var cur=parseInt(localStorage.getItem("index"));
            var change2=document.getElementById("pp").rows[cur].cells;
            if(z!=cur)
            {
                change[4].innerHTML="<i class='fas fa-pause-circle'></i>";
                change2[4].innerHTML="<i class='fas fa-play-circle'></i>";
                localStorage.setItem("index",z);
                SC.stream(song).then(function(player){
                    player.play();
                });
            }
            else
            {
                is_playing=false;
                change2[4].innerHTML="<i class='fas fa-play-circle'></i>";
                localStorage.setItem("index",z);
                SC.stream('/tracks/475960419').then(function(player){
                    player.play();
                });
            }
        }
    };
});
