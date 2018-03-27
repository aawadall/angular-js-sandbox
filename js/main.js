(function () {
    var app = angular.module("githubViewer", []);

    var MainController = function ($scope, $http) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch user";
        };

        $scope.search  = function(username){
            var url = "https://api.github.com/users/"+username;
            $http.get(url)
                .then(onUserComplete, onError);
        };
        
        $scope.username = "angular";

    };
    app.controller("MainController", ["$scope", "$http", MainController]);

}());