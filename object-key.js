/*! ObjectKey 0.0.0 | Copyright (c) 2014 Gias Kay Lee | MIT License */

'use strict';

angular.module('ObjectKey', []).

constant('ObjectKey', new function() {
  var _deepTransform = function(style) {
    var stylize = function(object) {
      var o = {};

      for (var k in object) {
        object.hasOwnProperty(k) && (
          o[style(k)] = 'object' === typeof object[k] ? stylize(object[k]) : object[k]
        );
      }

      return o;
    };

    return stylize;
  };

  this.camelize = _deepTransform(function(string) {
    return string.replace(/[-_\s]+(.)?/g, function(match, $1) {return $1 ? $1.toUpperCase() : ''});
  });
}());
