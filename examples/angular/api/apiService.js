(function() {
  "use strict";

  angular.module("example.api")
    .factory("ExampleAPI", ExampleAPI);

  ExampleAPI.$inject = ["$http"];

  function ExampleAPI($http) {
    return {
      getTopRepos: function(username) {
        return $http.get("https://api.github.com/users/" + username + "/repos");
      }
    };
  }

}());
