[Mungus](https://github.com/Glavin001/mungus)
======

*In-memory queries of Arrays with [MongoDB query language](http://docs.mongodb.org/manual/reference/method/js-collection/).*

> The database phlegm that sticks your JSON together.

----

## See [Tests](http://glavin001.github.io/mungus/) for Verifying Support

Go to http://glavin001.github.io/mungus/

## API

### `Array.find(criteria, projection)`

#### Parameters

- `criteria` <Object>
- `projection` <Object>

#### Example Usage

```javascript
var arr = [
    {a: { b: 1 }, c: 3 },
    {a: { b: 2 }, c:3},
    {a: 3, b:2}
  ];

var results = arr.find({"a.b":2}, {
  d: "$a.b",
  c: 1
});
// results => [{"d":2,"c":3}]
```
### `Array.aggregate(pipeline, options)`

#### Paramters
- `pipeline` <Array> 
- `options` <Object>

#### Example Usage

```javascript
var arr = [
    {a: { b: 1 }, c: 3 },
    {a: { b: 2 }, c:3},
    {a: 3, b:2}
  ];

var results = arr.aggregate([
  {
    "$match": {
      "a.b": 2
    }
  },
  {
    "$project": {
      d: "$a.b",
      c: 1
    }
  }
]);
// results => [{"d":2,"c":3}]
```
