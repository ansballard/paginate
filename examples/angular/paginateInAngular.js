(function() {
  "use strict";

  angular.module("example", ["paginate"])
    .controller(PaginateCtrl);

  PaginateCtrl.$inject = ["$filter", "paginate.api", "paginate.buttons"];

  function PaginateCtrl($filter, api, buttons) {

    var vm = this;

    vm.topRepos = [];
    vm.filter = {};

    api.getTopRepos("ansballard")
      .then(function(topRepos) {
        vm.errorMessage = undefined;
        vm.topRepos = topRepos;
        vm.listSelectNumPages = vm.paginateListSelect.getPages(); // digest cycle doesn't like getPages()
      },
      function(error) {
        vm.topRepos = [];
        vm.errorMessage = "There was an error retrieving the top Github repos";
        console.log(error);
      })
    ;

		var getFilteredContent = function getFilteredContent() {
			return $filter("filter")(vm.topRepos, vm.filter.paginateTable);
		};

    vm.paginateList = paginate(10, function() { return vm.topRepos; });

    vm.paginateTable = paginate(10, getFilteredContent);

    vm.paginateListOptions = paginate(10, function() { return vm.topRepos; });

    vm.paginateListSelect = paginate(10, function() { return vm.topRepos; });

  }

}());
