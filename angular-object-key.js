/*! Angular ObjectKey 0.1.1 | Copyright (c) 2014 Gias Kay Lee | MIT License */

'use strict';

angular.module('ObjectKey', []).

constant('ObjectKey', new function() {
  var _deepTransform = function(style) {
    var isException,
        stylize = function(object, config) {
          /*
          // config
          // | except
          */

          var config = config || {},
              o = {};

          if (!isException) {
            if (config.except instanceof RegExp) {
              isException = function(string) {
                return string.match(config.except);
              };
            } else {
              isException = function() {return false};
            }
          }

          for (var k in object) {
            object.hasOwnProperty(k) && (
              o[isException(k) ? k : style(k)] = 'object' === typeof object[k] ? stylize(object[k]) : object[k]
            );
          }

          return o;
        };

    return stylize;
  };

  this.toCamelCase = _deepTransform(function(string) {
    return string.replace(/[-_\s]+(.)?/g, function(match, $1) {return $1 ? $1.toUpperCase() : ''});
  });

  this.toSnakeCase = _deepTransform(function(string) {
    return string.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-_\s]+/g, '_').toLowerCase();
  });

  this.toPoodleCase = _deepTransform(function(string) {
    return string.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
  });
}());
