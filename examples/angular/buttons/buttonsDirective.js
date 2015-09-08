(function() {
  "use strict";

  angular.module("paginate.buttons")
      .directive("myCalendarRange", ButtonsDirective);

  function ButtonsDirective() {
      var directive = {
          link: link,
          scope: {

          },
          templateUrl: "buttons.template.html",
          restrict: "EA",
          controller: ButtonsCtrl,
          controllerAs: "vm",
          bindToController: true
      };
      return directive;

      function link() {

      }
  }

}());
