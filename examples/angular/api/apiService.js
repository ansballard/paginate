(function() {
  "use strict";

  angular.module("paginate.api")
    .factory(PaginateAPI);

  PaginateAPI.$inject = ["$http"];

  function PaginateAPI($http) {
    return {
      getTopRepos: function(username) {
        return $http.get("https://api.github.com/users/" + username + "/repos");
      }
    };
  }

}());
