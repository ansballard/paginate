(function() {
  "use strict";

  var paginateModule = angular.module("paginate", []);

  paginateModule
    .controller("paginateCtrl", ["$scope", "githubService", function($scope, githubService) {

      $scope.topRepos = [];

      githubService.getTopRepos("ansballard",
        function(topRepos) {
          $scope.errorMessage = undefined;
          $scope.topRepos = topRepos;
        },
        function(error) {
          $scope.topRepos = [];
          $scope.errorMessage = "There was an error retrieving the top Github repos";
          console.log(error);
        }
      );

      $scope.paginate = paginate(10, function() { return $scope.topRepos; });

    }])
    .factory("githubService", ["$http", function($http) {

      return {

        getTopRepos: function(username, success, error) {
          $http.get("https://api.github.com/users/" + username + "/repos")
            .success(success)
            .error(error)
          ;
        }

      };

    }]);

}());
