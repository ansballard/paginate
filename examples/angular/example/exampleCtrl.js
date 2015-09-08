(function() {
  "use strict";

  angular.module("example")
    .controller("ExampleCtrl", ExampleCtrl);

  ExampleCtrl.$inject = ["$filter", "ExampleAPI"];

  function ExampleCtrl($filter, ExampleAPI) {

    var vm = this;

    vm.topRepos = [];
    vm.filters = {};
    vm.loading = true;

    vm.getData = function() {
      return vm.topRepos;
    };

    ExampleAPI.getTopRepos("ansballard")
      .then(function(topRepos) {
        vm.errorMessage = undefined;
        vm.topRepos = topRepos.data;
        vm.loading = false;
      },
      function(error) {
        vm.topRepos = [];
        vm.errorMessage = "There was an error retrieving the top Github repos";
        vm.loading = false;
        console.log(error);
      })
    ;

		vm.getFilteredContent = function getFilteredContent() {
			return $filter("filter")(vm.topRepos, vm.filters.paginate2);
		};

  }

}());
