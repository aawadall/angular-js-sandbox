(function () {
    var app = angular.module("githubViewer", []);

    var MainController = function ($scope, $http, $interval) {

        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        var onRepos = function (response){
            
            $scope.repos = response.data;
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch data";
        };

        var decrementCountdown = function(){
            $scope.countdown -= 1;
            if ($scope.downtdown < 1){
                $scope.search($scope.username);
            }
        };

        var startCountdown = function(){
            $interval(decrementCountdown, 1000, $scope.countdown);
        };

        $scope.search  = function(username){
            var url = "https://api.github.com/users/"+username;
            $http.get(url)
                .then(onUserComplete, onError);
        };
        
        $scope.username = "angular";
        $scope.repoSortOrder ="-stargazers_count";
        $scope.countdown = 5;
        startCountdown();
    };
    app.controller("MainController",  MainController);

}());