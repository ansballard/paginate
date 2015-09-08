(function() {
  "use strict";

  angular.module("paginate.buttons")
    .controller(ButtonsCtrl);

  ButtonsCtrl.$inject = [];

  function ButtonsCtrl() {

    var vm = this;

    vm.paginate = paginate(10, vm.listData);

  }
}());
