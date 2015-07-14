var hipster = [
  "Scenester",
  "Bushwick",
  "meditation",
  "High",
  "Life",
  "Vice",
  "flannel.",
  "Whatever",
  "sunt",
  "Godard,",
  "Intelligentsia",
  "disrupt",
  "typewriter",
  "master",
  "cleanse",
  "ugh",
  "velit",
  "fugiat",
  "tattooed",
  "put",
  "a",
  "bird",
  "on",
  "it",
  "try-hard",
  "roof",
  "party",
  "meggings.",
  "Chia",
  "deserunt",
  "Schlitz",
  "Austin",
  "hoodie.",
  "Sunt",
  "minim",
  "aliqua",
  "taxidermy,",
  "Pitchfork",
  "Odd",
  "Future",
  "semiotics",
  "do",
  "disrupt.",
  "Fanny",
  "pack",
  "ut",
  "aute",
  "officia,",
  "vinyl",
  "8-bit",
  "meditation",
  "incididunt.",
  "Sapiente",
  "hashtag",
  "aliqua",
  "tofu",
  "locavore,",
  "direct",
  "trade",
  "lomo",
  "qui",
  "dreamcatcher",
  "nisi",
  "pariatur.",
  "Art",
  "party",
  "fanny",
  "pack",
  "semiotics",
  "odio",
  "normcore",
  "consequat.",
  "Aute",
  "90's",
  "jean",
  "shorts",
  "Banksy,",
  "tilde",
  "assumenda",
  "Etsy",
  "post-ironic",
  "cliche",
  "art",
  "party",
  "lumbersexual",
  "non",
  "artisan.",
  "Authentic",
  "elit",
  "cillum",
  "90's,",
  "culpa",
  "Thundercats",
  "dolor",
  "et",
  "+1",
  "cray",
  "bitters.",
  "Pork",
  "belly",
  "lo-fi",
  "freegan",
  "put",
  "a",
  "bird",
  "on",
  "it,",
  "YOLO",
  "nihil",
  "High",
  "Life",
  "reprehenderit",
  "mixtape",
  "vero",
  "American",
  "Apparel",
  "aliquip.",
  "Umami",
  "sed",
  "YOLO",
  "tilde,",
  "art",
  "party",
  "American",
  "Apparel",
  "vero",
  "Odd",
  "Future",
  "ad",
  "officia",
  "vegan",
  "artisan",
  "trust",
  "fund.",
  "Polaroid",
  "typewriter",
  "drinking",
  "vinegar",
  "mixtape",
  "commodo",
  "keffiyeh",
  "bitters,",
  "delectus",
  "gentrify.",
  "Kale",
  "chips",
  "gentrify",
  "ea",
  "placeat",
  "freegan",
  "Pitchfork.",
  "Thundercats",
  "cray",
  "sunt,",
  "kitsch",
  "wayfarers",
  "tousled",
  "exercitation",
  "kale",
  "chips",
  "occupy."
];
var numberOfRuns = 100000;
var limit = 10;

(function() {
  "use strict";

  var domNode = document.getElementById("domCompare");

  var paginateDom = document.getElementById("paginateRuntime");
  var angularRuntime = document.getElementById("angularRuntime");

  window.showComparison = function showComparison() {

    try {

      var angularTime = parseFloat(angularRuntime.innerHTML);
      var paginateTime = parseFloat(paginateRuntime.innerHTML);

      if(angularTime < paginateTime) {
        domNode.innerHTML = "Angular: " + parseInt(angularTime / paginateTime * 100) + "% faster T_T";
      } else {
        domNode.innerHTML = "Paginate: " + parseInt(paginateTime / angularTime * 100) + "% faster! =D";
      }

    }
    catch (e) {
      console.log("run both tests before trying to compare");
    }
  };

}());

(function() {
  "use strict";

  var domRuntime = document.getElementById("paginateRuntime");
  var startTime;
  var endTime;
  var diffTime;
  var i = 0;
  var p;

  window.runPaginateBenchmark = function runPaginateBenchmark() {

    diffTime = 0;

    for(i = 0; i < numberOfRuns; i++) {
      p = undefined;
      startTime = performance.now();
      p = paginate(limit, function getDataForPaginate() { return hipster; });
      p.getVisibleContent();
      p.nextPage();
      p.nextPage();
      p.prevPage();
      p.prevPage();
      endTime = performance.now();

      diffTime += endTime - startTime;
    }

    domRuntime.innerHTML = (diffTime / numberOfRuns) + " microseconds average over " + numberOfRuns + " iterations.";
  };

}());

(function() {
  "use strict";

  var paginateModule = angular.module("paginate", []);

  paginateModule
    .controller("paginateCtrl", ["$scope", "$filter", function($scope, $filter) {

      var domRuntime = document.getElementById("angularRuntime");
      var startTime;
      var endTime;
      var diffTime;
      var i = 0;
      var p;

      $scope.runAngularBenchmark = function runAngularBenchmark() {

        diffTime = 0;

        for(i = 0; i < numberOfRuns; i++) {
          p = undefined;
          startTime = performance.now();
          p = $filter("limitTo")(hipster, limit, 0);
          p = $filter("limitTo")(hipster, limit, 10);
          p = $filter("limitTo")(hipster, limit, 20);
          p = $filter("limitTo")(hipster, limit, 10);
          p = $filter("limitTo")(hipster, limit, 0);
          endTime = performance.now();

          diffTime += endTime - startTime;
        }

        domRuntime.innerHTML = (diffTime / numberOfRuns) + " microseconds average over " + numberOfRuns + " iterations.";
      };

    }]);
}());
