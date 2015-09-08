(function() {
  "use strict";

  angular.module("paginate.buttons")
      .directive("ButtonsDirective", ButtonsDirective);

  function ButtonsDirective() {
      return {
          link: link,
          scope: {
            listData: "@"
          },
          templateUrl: "buttons.template.html",
          restrict: "EA",
          controller: ButtonsCtrl,
          controllerAs: "vm",
          bindToController: true
      };

      function link() {

      }
  }

}());
