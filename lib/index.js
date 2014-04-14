(function() {

  var getFieldValue = function(obj, str) {
    return str.split(".").reduce(function(o, x) { return o[x] }, obj);
  };

  var cloneArray = function(data) {
    return JSON.parse(JSON.stringify(data))
  };

  var satisfiesQuery = function(obj, query) {
    for (var field in query) {
        var value = getFieldValue(obj, field);
        var cond = query[field];
        // Primitives
        if (typeof cond === "string") {
          if (cond !== value) {
            return false;
          }
        }
        else if (typeof cond === "number") {
          if (cond !== value) {
            return false;
          }
        } else {
          // Query Selectors

          //- Comparison

          //- Logical

          //- Element

          //- Evaulation

          //- Geospatial

          //- Array

          //- Projection Operators

        }
    }
    return true;
  };

  var projectObject = function(obj, projection) {
    if (!projection) {
      return obj;
    }
    var result = {};
    for (var field in projection) {
      var op = projection[field];

      if (typeof op === "number") {
        // Include / Exclude
        if (!op) {
          // Exclude
          delete result[field];
        } else {
          // Include
          result[field] = obj[field];
        }
      }
      else if (typeof op === "object") {
        // Nested
        result[field] = projectObject(obj, op);
      } else if (typeof op === "string") {
        // TODO: implement renaming
        // ex: "key": "$old_key"
        if (op.charAt(0) === '$') {
            var f = op.substring(1);
            result[field] = getFieldValue(obj, f);
        }
        else {
          result[field] = op;
        }
      } else {
        // TODO: implement expression operators
        result[field] = op;
      }

    }
    return result;
  };

  var projectArray = function(arr, projection) {
    if (!projection) {
      return arr;
    }
    var results = [];
    for (var i=0, len=arr.length; i<len; i++) {
      var obj = arr[i];
      results.push(projectObject(obj, projection));
    }
    return results;
  };

  Array.prototype.aggregate = function(pipeline, options) {
    var data = this;
    var results = cloneArray(data);
    for (var p=0, len=pipeline.length; p<len; p++) {
      var pipe = pipeline[p];
      var type = Object.keys(pipe)[0];
      console.log(results, type, pipe);
      if (type === "$match") {
        results = results.find(pipe[type]);
      }
      else if (type === "$project") {
        results = projectArray(results, pipe[type]);
      }
    }
    return results;
  };

  Array.prototype.count = function(query) {
    var results = this.find(query);
    return results.length;
  };

  Array.prototype.find = function(criteria, projection) {
    var data = this;
    var results = [];
    if (!criteria) {
        results = cloneArray(data);
    } else {
      for (var i=0, len=data.length; i<len; i++) {
        var d = data[i];
        if (satisfiesQuery(d, criteria)) {
          results.push(d);
        }
      }
    }
    // Project
    results = projectArray(results, projection);
    return results;
  };

  Array.prototype.findOne = function(criteria, projection) {
    var results = this.find(criteria, projection);
    return results.length > 0 ? results[0] : null;
  };

  Array.prototype.findAndModify = function(document) {
    return this;
  };

  Array.prototype.distinct = function(field, query) {
    return this;
  };

  Array.prototype.insert = function(document, options) {
    return this;
  };

  Array.prototype.mapReduce = function(map, reduce, options) {
    return this;
  };

  Array.prototype.remove = function(query, justOne) {
    return this;
  };

  Array.prototype.update = function(query, update, options) {
    return this;
  };

})();
