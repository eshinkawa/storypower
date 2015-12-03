'use strict';

/**
 * @ngdoc function
 * @name yangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yangApp
 */
angular.module('yangApp')
  .controller('MainCtrl', function ($scope, $http, $location, $timeout) {

      $timeout(function() {
      $location.path('login');
      }, 3000);


  });
