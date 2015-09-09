// paginate.js
// ==
// A dependency-free node module to handle data pagination
//
// [@ansballard/paginate](https://www.npmjs.com/package/@ansballard/paginate)
//
// [MIT License](http://opensource.org/licenses/MIT)

// Paginate( int, fn )
// ==
// The constructor takes two parameters, both required. The first is
// the number of items to return per page. The second is a function
// that returns the data set to be paginated, as an array.
// ```javascript
//   var paginatedList = paginate(
//     5,
//     function() {
//       return ["a", "b", "c", "d", "e", "f", "g"];
//     }
//   ); // Only ["a", "b", "c", "d", "e"] will be returned
// ```
(function(that) {
	"use strict";
	var paginate = function paginate(countPerPage, contentAsFunction) {
		var page = 0;
		var count = 0;
		var i = 0;
		if (numberisInteger(countPerPage) && countPerPage > 0) {
			count = countPerPage;
		} else {
			throw "Paginate count per page must be a positive integer";
		}
		var getContent = contentAsFunction;

		return {
			// setCount( int )
			// ==
			// Sets the number of items to return per page to the given parameter.
			// Will throw an exception if the parameter is `NaN` or negative.
			// Returns the current visible content.
			setCount: function paginateSetCount(newCount) {
				if (numberisInteger(newCount) && newCount > 0) {
					count = newCount;
				} else {
					throw "Paginate count per page must be a positive integer";
				}
				return this.getVisibleContent();
			},
			// setPage( int )
			// ==
			// Sets the current page index to the given parameter.
			// Will throw an exception if the parameter is `NaN` or outside the range of 0 and `getNumPages()`.
			// Returns the current visible content.
			setPage: function paginateSetPage(newPage) {
				if (numberisInteger(newPage) && newPage >= 0 && newPage < this.getNumPages()) {
					page = newPage;
				} else {
					throw "Paginate page must be between 0 and numPages: " + this.getNumPages();
				}
				return this.getVisibleContent();
			},
			// getCount()
			// ==
			// Returns the current number of items returned per page.
			getCount: function paginateGetCount() {
				return count;
			},
			// getPage()
			// ==
			// Returns the current page index.
			getPage: function paginateGetPage() {
				return page;
			},
			// getVisibleContent()
			// ==
			// Returns a list of the currently visible content, based on
			// page index, item count per page, and the function passed
			// to the constructor.
			getVisibleContent: function paginateGetVisibleContent() {
				var visibleList = [];
				var content = getContent();
				if (page >= this.getNumPages()) {
					page = 0;
				}
				var startIndex = page * count;
				visibleList = content.slice(startIndex, startIndex + count);
				return visibleList;
			},
			// getPages()
			// ==
			// Returns an array describing each page, listing index, whether
			// it is the first or last page, and the number of items returned.
			// Written to make custom page navigation easier.
			getPages: function paginateGetPages() {
				var pageList = [];
				var content = getContent();
				var numPages = this.getNumPages();
				for (i = 0; i < numPages; i++) {
					pageList.push({
						"count": count,
						"index": i,
						"first": i === 0,
						"last": i === numPages - 1
					});
				}
				if (pageList.length > 0) {
					pageList[pageList.length - 1].count = content.length % count;
				}
				return pageList;
			},
			// getNumPages()
			// ==
			// Returns the number of pages based on number of items per page.
			getNumPages: function paginateNumPages() {
				return Math.ceil(getContent().length / count);
			},
			// getIsFirstPage()
			// ==
			// Returns true if the currently returned page is the first.
			getIsFirstPage: function paginateIsFirstPage() {
				return page === 0;
			},
			// getIsFirstPage()
			// ==
			// Returns true if the currently returned page is the last.
			getIsLastPage: function paginateIsLastPage() {
				return page === this.getNumPages() - 1;
			},
			// firstPage()
			// ==
			// Sets the page index to 0, or the first page.
			// Returns the current visible content.
			firstPage: function paginateFirstPage() {
				page = 0;
				return this.getVisibleContent();
			},
			// prevPage()
			// ==
			// Sets the page index to the current - 1, or to itself
			// if on the first page.
			// Returns the current visible content.
			prevPage: function paginatePrevPage() {
				page = !this.getIsFirstPage() ? page - 1 : page;
				return this.getVisibleContent();
			},
			// nextPage()
			// ==
			// Sets the page index to the current + 1, or to itself
			// if on the last page.
			// Returns the current visible content.
			nextPage: function paginateNextPage() {
				page = !this.getIsLastPage() ? page + 1 : page;
				return this.getVisibleContent();
			},
			// firstPage()
			// ==
			// Sets the page index to `getNumPages() - 1`, or the last page.
			// Returns the current visible content.
			lastPage: function paginateLastPage() {
				page = this.getNumPages() - 1;
				return this.getVisibleContent();
			}
		};
	};

	if (typeof define === "function" && define.amd) {
		define(function() {
			return paginate;
		});
	} else if (typeof module !== "undefined" && module.exports) {
		module.exports = paginate;
	} else {
		that.paginate = paginate;
	}

	function numberisInteger(value) {
		return typeof value === "number" &&
			isFinite(value) &&
			Math.floor(value) === value;
	}

}(this));
