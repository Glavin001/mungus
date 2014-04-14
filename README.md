[Mungus](https://github.com/Glavin001/mungus)
======

*In-memory queries of Arrays with [MongoDB query language](http://docs.mongodb.org/manual/reference/method/js-collection/).*

> The database phlegm that sticks your JSON together.


----

## Examples

```javascript
var arr = [
  {a: {b: 2 }, c: 3 },
  {a:1, c:3},
  {a:2, b:2}
];

var results = arr.find({
  "a.b": 2
});
// results => [{"a":{"b":2},"c":3}] 
```
