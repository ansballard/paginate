## `paginate`

An object to handle all the logic for a basic paginated list/table

### Parameters

* `countPerPage` **`integer`** The number of items to be shown per page
* `contentAsFunction` **`function`** The data to be shown, as a function returning the data, e.g. function() { return [1,2,3]; }



Returns `Object` Paginate object that holds all the logic for pagination


## `paginate.firstPage`

Set the current page to the first page



### Examples

```js
var content = function() { return [1,2,3]; };
var paginateObj = paginate(10, content);
paginateObj.firstPage(); // paginateObj.getPage() === 0
```

Returns `boolean` false


## `paginate.getCount`

Get the current number of items per page



### Examples

```js
var content = function() { return [1,2,3]; };
var paginateObj = paginate(10, content);
paginateObj.getCount() === 5;
```

Returns `integer` Current count


## `paginate.getIsFirstPage`

Get if the current page is the first page



### Examples

```js
var content = function() { return [1,2,3]; };
var paginateObj = paginate(10, content);
paginateObj.getIsFirstPage() === true;
```

Returns `boolean` The current page is the first page


## `paginate.getIsLastPage`

Get if the current page is the last page



### Examples

```js
var content = function() { return [1,2,3]; };
var paginateObj = paginate(2, content);
paginateObj.nextPage();
paginateObj.getIsLastPage() === true;
```

Returns `boolean` The current page is the last page


## `paginate.getNumPages`

Get the current number of pages based on total number of items and items per page



### Examples

```js
var content = function() { return [1,2,3]; };
var paginateObj = paginate(2, content);
paginateObj.getNumPages() === 2;
```

Returns `integer` Number of pages


## `paginate.getPage`

get the current page, index 0



### Examples

```js
var content = function() { return [1,2,3]; };
var paginateObj = paginate(10, content);
paginateObj.getPage() === 0;
```

Returns `integer` Current page


## `paginate.lastPage`

Set the current page to the last page



### Examples

```js
var content = function() { return [1,2,3]; };
var paginateObj = paginate(2, content);
paginateObj.lastPage(5); // paginateObj.getPage() === 1
```

Returns `boolean` false


## `paginate.nextPage`

Set the current page to the next page



### Examples

```js
var content = function() { return [1,2,3]; };
var paginateObj = paginate(2, content);
paginateObj.nextPage(); // paginateObj.getPage() === 1
```

Returns `boolean` false


## `paginate.prevPage`

Set the current page to the previous page



### Examples

```js
var content = function() { return [1,2,3]; };
var paginateObj = paginate(2, content);
paginateObj.nextPage();
paginateObj.prevPage(); // paginateObj.getPage() === 0
```

Returns `boolean` false


## `paginate.setCount`

Set the number of items per page

### Parameters

* `newCount` **`integer`** The number of items to be shown per page


### Examples

```js
var content = function() { return [1,2,3]; };
var paginateObj = paginate(10, content);
paginateObj.setCount(5); // paginateObj.getCount() === 5
```

Returns `boolean` false


