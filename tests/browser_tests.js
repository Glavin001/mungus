test( "qunit test", function() {
  ok( 1 == "1", "Passed!" );
});

module("find");

test("basic query", function() {
  var arr = [
    {a:1, b:2},
    {a:1, c:3},
    {a:2, b:2}
    ];

  var results = arr.find({a:1});
  var r = results.length === 2;
  console.log(results, results.length, r);
  ok( r, "Passed! Returned only 2 results.");
});

test("compound query", function() {
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
  console.log(results, results.length, r);
  ok( r, "Passed! Returned only 1 results.");
});


test("nested query", function() {
  var arr = [
    {a: { b:2 }, c: 3 },
    {a:1, c:3},
    {a:2, b:2}
    ];

  var results = arr.find({
    "a.b": 2
  });
  var r = results.length === 1;
  console.log(results, results.length, r);
  ok( r, "Passed! Returned only 1 results.");
});


module("aggregate");
