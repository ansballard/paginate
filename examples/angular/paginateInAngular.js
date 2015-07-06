(function() {
  "use strict";

  var paginateModule = angular.module("paginate", []);

  paginateModule
    .controller("paginateCtrl", ["$scope", "$filter", "githubService", function($scope, $filter, githubService) {

      $scope.topRepos = [];
      $scope.filter = {};

      githubService.getTopRepos("ansballard",
        function(topRepos) {
          $scope.errorMessage = undefined;
          $scope.topRepos = topRepos;
      		$scope.listSelectNumPages = $scope.paginateListSelect.getPages(); // digest cycle doesn't like getPages()
        },
        function(error) {
          $scope.topRepos = [];
          $scope.errorMessage = "There was an error retrieving the top Github repos";
          console.log(error);
        }
      );

			var getFilteredContent = function getFilteredContent() {
				return $filter("filter")($scope.topRepos, $scope.filter.paginateTable);
			};
			
			$scope.tmp = function tmp() {
				$scope.paginateList.setPage(2);
				console.log($scope.paginateList.getPage())
			};

      $scope.paginateList = paginate(10, function() { return $scope.topRepos; });

      $scope.paginateTable = paginate(10, getFilteredContent);

      $scope.paginateListOptions = paginate(10, function() { return $scope.topRepos; });

      $scope.paginateListSelect = paginate(10, function() { return $scope.topRepos; });

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
