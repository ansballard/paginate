(function() {
  "use strict";

  angular.module("paginate.buttons")
      .directive("paginationNav", ButtonsDirective);

  function ButtonsDirective() {
      var directive = {
          link: link,
          scope: {
            paginateHandler: "=handler",
            listData: "&",
            visibleCount: "@count"
          },
          templateUrl: "buttons/buttons.template.html",
          restrict: "EA",
          controller: "ButtonsCtrl",
          controllerAs: "vm",
          bindToController: true
      };
      return directive;

      function link(scope, el, attrs, vm) {
        var count = vm.visibleCount ? +vm.visibleCount : 10;
        if(typeof vm.listData() === "undefined" || typeof vm.listData() !== "function") {
          throw "list-data attribute is required\nYou should be passing a reference to a function\n";
        }
        vm.paginateHandler = paginate(count || 10, vm.listData());
      }
  }

}());
