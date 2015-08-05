describe("paginate", function() {
	"use strict";

	var p = paginate; // shorthand
	var i;
	var tmp;
	var tmpIter;
	var validCounts;
	var invalidCounts;
	var validContent;
	var validContentFunction;
	var validBiggerContentFunction;
	var validPaginateObj;

	beforeEach(function() {
		validCounts = [1, 3, 12, 197];
		invalidCounts = [-1, "feb", -14, 1.8];

		validContent = [{
			col1: "ok",
			col2: 12,
			col3: 1232543,
			col4: "invalid"
		}, {
			col1: "ok",
			col2: 12,
			col3: 1232543,
			col4: "invalid"
		}];

		validContentFunction = function() {
			return validContent;
		};

		validBiggerContentFunction = function() {
			var localTmp = [];
			for (var j = 0; j < 25; j++) {
				for (i = 0; i < validContent.length; i++) {
					localTmp.push(validContent[i]);
				}
			}
			i = null;
			return localTmp;
		};
	});

	afterEach(function() {
		i = null;
		tmp = null;
		tmpIter = null;
	});

	it("should initialize with a positive integer as the count per page", function() {
		for (i = 0; i < validCounts.length; i++) {
			tmp = p(validCounts[i], validContentFunction);
			expect(tmp).toBeTruthy();
			tmp = null;
		}
	});

	it("should throw an exception for each invalid count", function() {
		for (i = 0; i < invalidCounts.length; i++) {
			try {
				tmp = p(invalidCounts[i], validContentFunction);
			} catch (error) {
				tmp = false;
			}
			expect(tmp).toBe(false);
			tmp = null;
		}
	});

	describe("getCount()", function() {
		it("should return the given count", function() {
			tmpIter = 0;
			for (i = 0; i < validCounts.length; i++) {
				tmp = p(validCounts[i], validContentFunction);
				expect(tmp.getCount()).toBe(validCounts[i]);
			}
		});
	});

	describe("setCount(val)", function() {

		it("should set the count = val", function() {
			tmp = p(10, function() { return []; });
			tmpIter = 0;
			for (i = 0; i < validCounts.length; i++) {
				tmp.setCount(validCounts[i]);
				expect(tmp.getCount()).toBe(validCounts[i]);
			}
		});
	});

	describe("getPage()", function() {
		it("should return 0 on init", function() {
			tmp = p(validBiggerContentFunction().length + 1, validBiggerContentFunction);
			expect(tmp.getPage()).toBe(0);
		});
	});

	describe("getNumPages()", function() {
		it("should return 1 if contents are less than count", function() {
			tmp = p(validContentFunction().length + 1, validContentFunction);
			expect(tmp.getNumPages()).toBe(1);
		});
		it("should return 2 if there is one more item in content than count per page", function() {
			tmp = p(validContentFunction().length - 1, validContentFunction);
			expect(tmp.getNumPages()).toBe(2);
		});
		it("should return content length / count per page", function() {
			tmp = p(validBiggerContentFunction().length / 5, validBiggerContentFunction);
			expect(tmp.getNumPages()).toBe(5);
			tmp = p(validBiggerContentFunction().length / 2, validBiggerContentFunction);
			expect(tmp.getNumPages()).toBe(2);
		});
	});

	describe("nextPage()", function() {
		it("should set page++ when there are > 1 pages and not last page", function() {
			tmp = p(validContentFunction().length / 2, validContentFunction);
			tmp.nextPage();
			expect(tmp.getPage()).toBe(1);
		});

		it("should do nothing when there's only one page or if lastPage", function() {
			tmp = p(validContentFunction().length, validContentFunction);
			tmp.nextPage();
			expect(tmp.getPage()).toBe(0);
			tmp = null;
			tmp = p(validContentFunction().length / 2, validContentFunction);
			expect(tmp.getNumPages()).toBe(2);
			tmp.nextPage();
			expect(tmp.getPage()).toBe(1);
			tmp.nextPage();
			expect(tmp.getPage()).toBe(1);
		});
	});

	describe("getIsFirstPage()", function() {
		it("should return true if page === 0", function() {
			tmp = p(validContentFunction().length, validContentFunction);
			expect(tmp.getIsFirstPage()).toBe(true);
		});

		it("should return false if page !== 0", function() {
			tmp = p(validContentFunction().length / 2, validContentFunction);
			tmp.nextPage();
			expect(tmp.getIsFirstPage()).toBe(false);
		});
	});

	describe("prevPage()", function() {
		it("should set page-- when there are > 1 pages and not first page", function() {
			tmp = p(validContentFunction().length / 2, validContentFunction);
			tmp.nextPage();
			tmp.prevPage();
			expect(tmp.getPage()).toBe(0);
		});

		it("should do nothing when there's only one page or if first page", function() {
			tmp = p(validContentFunction().length, validContentFunction);
			tmp.prevPage();
			expect(tmp.getPage()).toBe(0);
			tmp = null;
			tmp = p(validContentFunction().length / 2, validContentFunction);
			expect(tmp.getNumPages()).toBe(2);
			tmp.prevPage();
			expect(tmp.getPage()).toBe(0);
		});
	});

	describe("getIsLastPage()", function() {
		it("should return true if page === numPages - 1", function() {
			tmp = p(validBiggerContentFunction().length / 2, validBiggerContentFunction);
			tmp.nextPage();
			expect(tmp.getNumPages()).toBe(2);
			expect(tmp.getPage()).toBe(tmp.getNumPages() - 1);
			expect(tmp.getIsLastPage()).toBe(true);
		});

		it("should return false if page !== numPages - 1", function() {
			tmp = p(validContentFunction().length / 2, validContentFunction);
			expect(tmp.getNumPages()).toBe(2);
			expect(tmp.getPage()).toBe(0);
			expect(tmp.getIsLastPage()).toBe(false);
		});
	});

	describe("firstPage()", function() {
		it("should set page = 0", function() {
			tmp = p(validBiggerContentFunction().length / 5, validBiggerContentFunction);
			tmp.firstPage();
			expect(tmp.getPage()).toBe(0);
			tmp.nextPage();
			tmp.firstPage();
			expect(tmp.getPage()).toBe(0);
		});
	});

	describe("lastPage()", function() {
		it("should set page = numPages - 1", function() {
			tmp = p(validBiggerContentFunction().length / 5, validBiggerContentFunction);
			tmp.lastPage();
			expect(tmp.getPage()).toBe(tmp.getNumPages() - 1);
			tmp.prevPage();
			tmp.lastPage();
			expect(tmp.getPage()).toBe(tmp.getNumPages() - 1);
		});
	});

});
