paginate
==
A dead-simple zero-dependency single-file pagination module


### Why this module and not the million others?
This is a module for use with any framework. It never handles the DOM, and has no dependencies. If you need a tiny, stable, unopinionated library for paginating arbitrary data in JavaScript, this is for you.

### So how do I use it?
The main idea is to create a function that returns the data to be paginated, and pass it to the paginate object. This means if you want to filter your data with, say, `$filter` in angular, you can pass the filtered data to your paginated list without coupling them. You can also create as many paginated objects as you want, even using the same data function.

### Where do I get it?
you can either clone this repo or install via `npm install @ansballard/paginate`. NPM should always have the most recent stable version, whereas you may have to dig for tags in the repo. You can also install throught bower with `bower install ansballard-paginate`.
