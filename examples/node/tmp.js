var paginate = require("../../paginate");

var list = paginate(10, function() { return [1,2,3,4,5,6,7,8,9,10,11,12,13]; });

console.log(list.getVisibleContent());
console.log(list.nextPage());
console.log(list.prevPage());
console.log(list.setCount(20));
