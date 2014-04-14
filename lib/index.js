(function() {

  var getFieldValue = function(obj, str) {
    return str.split(".").reduce(function(o, x) { return o[x] }, obj);
  };

  /*
  Object.prototype.getFieldValue = function(field) {
    return getFieldValue(this, field);
  };
  */

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

  Array.prototype.aggregate = function(pipeline, options) {
    return this;
  };

  Array.prototype.count = function(query) {
    var results = this.find(query);
    return results.length;
  };

  Array.prototype.find = function(criteria, projection) {
    var data = this;
    var results = [];
    for (var i=0, len=data.length; i<len; i++) {
      var d = data[i];
      if (satisfiesQuery(d, criteria)) {
        results.push(d);
      }
    }
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
