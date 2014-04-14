test( "qunit test", function() {
  ok( 1 == "1", "Passed!" );
});

module("Array.find(criteria)");

test("Basic query", function() {
  var arr = [
    {a:1, b:2},
    {a:1, c:3},
    {a:2, b:2}
    ];

  var results = arr.find({a:1});
  var r = results.length === 2;
  //console.log(results, results.length, r);
  ok( r, "Passed! Returned only 2 results.");
});

test("Compound query", function() {
  var arr = [
    {a:1, b:2},
    {a:1, c:3},
    {a:2, b:2}
    ];

  var results = arr.find({
    a: 1,
    b: 2
  });
  var r = results.length === 1;
  //console.log(results, results.length, r);
  ok( r, "Passed! Returned only 1 results.");
});


test("Nested query", function() {
  var arr = [
    {a: { b:2 }, c: 3 },
    {a:1, c:3},
    {a:2, b:2}
    ];

  var results = arr.find({
    "a.b": 2
  });
  var r = results.length === 1;
  //console.log(results, results.length, r);
  ok( r, "Passed! Returned only 1 results.");
});

module("Array.find(criteria, projection)");

test("Nested query with projection", function() {
  var arr = [
    {a: { b:2 }, c: 3 },
    {a:1, c:3},
    {a:2, b:2}
    ];

  var results = arr.find({
    "a.b": 2
  }, {
    a: 0,
    c: 1
  });
  var r = results.length === 1 && results[0].c === 3;
  //console.log(results, r);
  ok( r, "Passed!");
});

test("Renaming projection", function() {
  var arr = [
    {a: { b: 1 }, c: 3 },
    {a: { b: 2 }, c:3},
    {a: 3, b:2}
    ];

  var results = arr.find({"a.b":2}, {
    d: "$a.b",
    c: 1
  });
  var r = results.length === 1 && results[0].d === 2;
  //console.log(results, results.length, r);
  ok( r, "Passed!");
});


module("Array.aggregate(pipeline)");


test("$match and $project", function() {
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
  var r = results.length === 1 && results[0].d === 2;
  //console.log(results, results.length, r);
  ok( r, "Passed!");
});

module("Array.aggregate(pipeline, options)");
