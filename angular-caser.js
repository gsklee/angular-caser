/*! Angular Caser 0.1.4 | Copyright (c) 2014 Gias Kay Lee | MIT License */

'use strict';

angular.module('angularCaser', []).

constant('$caser', new function() {
  var transform = function(style) {
    var isException,

        stylize = function(input, config) {
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

          switch (typeof input) {
            case 'string':
              o = style(input);

              break
            case 'object':
              for (var k in input) {
                input.hasOwnProperty(k) && (
                  o[isException(k) ? k : style(k)] = 'object' === typeof input[k] ? stylize(input[k]) : input[k]
                );
              }

              break;
          }

          return o;
        };

    return stylize;
  };

  this.toCamelCase = transform(function(string) {
    return string.replace(/[-_\s]+(.)?/g, function(match, $1) {return $1 ? $1.toUpperCase() : ''});
  });

  this.toSnakeCase = transform(function(string) {
    return string.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-_\s]+/g, '_').toLowerCase();
  });

  this.toPoodleCase = transform(function(string) {
    return string.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
  });
}());
