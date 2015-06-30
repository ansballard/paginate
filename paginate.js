/**
 *  An object to handle all the logic for a basic paginated list/table
 *  @name paginate
 *  @param {integer} countPerPage The number of items to be shown per page
 *  @param {function} contentAsFunction The data to be shown, as a function returning the data, e.g. function() { return [1,2,3]; }
 *  @return {Object} Paginate object that holds all the logic for pagination
 */
var paginate = function paginate(countPerPage, contentAsFunction) {
	"use strict";

	var numberisInteger = function numberisInteger(value) {
		return typeof value === "number" &&
			isFinite(value) &&
			Math.floor(value) === value;
	};

	var page = 0;
	var count = 0;
	if (numberisInteger(countPerPage) && countPerPage > 0) {
		count = countPerPage;
	} else {
		throw "Paginate count per page must be a positive integer";
	}
	var getContent = contentAsFunction;
	var tmpContent;
	var tmpNumPages;

	return {
		/**
		 *  Set the number of items per page
		 *  @name paginate.setCount
		 *  @param {integer} newCount The number of items to be shown per page
		 *  @return {boolean} false
		 *  @example
		 *	var content = function() { return [1,2,3]; };
		 *	var paginateObj = paginate(10, content);
		 *	paginateObj.setCount(5); // paginateObj.getCount() === 5
		 */
		setCount: function paginateSetCount(newCount) {
			if (numberisInteger(newCount) && newCount > 0) {
				count = newCount;
			} else {
				throw "Paginate count per page must be a positive integer";
			}
			return false;
		},
		/**
		 *  Get the current number of items per page
		 *  @name paginate.getCount
		 *  @return {integer} Current count
		 *  @example
		 *	var content = function() { return [1,2,3]; };
		 *	var paginateObj = paginate(10, content);
		 *	paginateObj.getCount() === 5;
		 */
		getCount: function paginateGetCount() {
			return count;
		},
		/**
		 *  get the current page, index 0
		 *  @name paginate.getPage
		 *  @return {integer} Current page
		 *  @example
		 *	var content = function() { return [1,2,3]; };
		 *	var paginateObj = paginate(10, content);
		 *	paginateObj.getPage() === 0;
		 */
		getPage: function paginateGetPage() {
			return page;
		},
		/**
		 *  Get the current number of pages based on total number of items and items per page
		 *  @name paginate.getNumPages
		 *  @return {integer} Number of pages
		 *  @example
		 *	var content = function() { return [1,2,3]; };
		 *	var paginateObj = paginate(2, content);
		 *	paginateObj.getNumPages() === 2;
		 */
		getNumPages: function paginateNumPages() {
			return Math.ceil(getContent().length / count);
		},
		/**
		 *  Get if the current page is the first page
		 *  @name paginate.getIsFirstPage
		 *  @return {boolean} The current page is the first page
		 *  @example
		 *	var content = function() { return [1,2,3]; };
		 *	var paginateObj = paginate(10, content);
		 *	paginateObj.getIsFirstPage() === true;
		 */
		getIsFirstPage: function paginateIsFirstPage() {
			return page === 0;
		},
		/**
		 *  Get if the current page is the last page
		 *  @name paginate.getIsLastPage
		 *  @return {boolean} The current page is the last page
		 *  @example
		 *	var content = function() { return [1,2,3]; };
		 *	var paginateObj = paginate(2, content);
		 *	paginateObj.nextPage();
		 *	paginateObj.getIsLastPage() === true;
		 */
		getIsLastPage: function paginateIsLastPage() {
			return page === this.getNumPages() - 1;
		},
		/**
		 *  Set the current page to the first page
		 *  @name paginate.firstPage
		 *  @return {boolean} false
		 *  @example
		 *	var content = function() { return [1,2,3]; };
		 *	var paginateObj = paginate(10, content);
		 *	paginateObj.firstPage(); // paginateObj.getPage() === 0
		 */
		firstPage: function paginateFirstPage() {
			page = 0;
			return false;
		},
		/**
		 *  Set the current page to the previous page
		 *  @name paginate.prevPage
		 *  @return {boolean} false
		 *  @example
		 *	var content = function() { return [1,2,3]; };
		 *	var paginateObj = paginate(2, content);
		 *	paginateObj.nextPage();
		 *	paginateObj.prevPage(); // paginateObj.getPage() === 0
		 */
		prevPage: function paginatePrevPage() {
			page = !this.getIsFirstPage() ? page - 1 : page;
			return false;
		},
		/**
		 *  Set the current page to the next page
		 *  @name paginate.nextPage
		 *  @return {boolean} false
		 *  @example
		 *	var content = function() { return [1,2,3]; };
		 *	var paginateObj = paginate(2, content);
		 *	paginateObj.nextPage(); // paginateObj.getPage() === 1
		 */
		nextPage: function paginateNextPage() {
			page = !this.getIsLastPage() ? page + 1 : page;
			return false;
		},
		/**
		 *  Set the current page to the last page
		 *  @name paginate.lastPage
		 *  @return {boolean} false
		 *  @example
		 *	var content = function() { return [1,2,3]; };
		 *	var paginateObj = paginate(2, content);
		 *	paginateObj.lastPage(5); // paginateObj.getPage() === 1
		 */
		lastPage: function paginateLastPage() {
			page = this.getNumPages() - 1;
			return false;
		}
	};
};