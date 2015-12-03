'use strict';

/**
 * @ngdoc overview
 * @name yangApp
 * @description
 * # yangApp
 *
 * Main module of the application.
 */
angular
  .module('yangApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    "firebase",
    'angular-svg-round-progress'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/campanhas', {
        templateUrl: 'views/campanhas.html',
        controller: 'CampanhasCtrl',
        controllerAs: 'campanhas'
      })
      .when('/cadUser', {
        templateUrl: 'views/cadastraUser.html',
        controller: 'cadUser',
        controllerAs: 'cadUser'
      })
      .when('/cadAventura', {
        templateUrl: 'views/cadastraAventura.html',
        controller: 'cadAventura',
        controllerAs: 'cadAventura'
      })
      .when('/cadAnotacao', {
        templateUrl: 'views/cadastraAnot.html',
        controller: 'cadAnot',
        controllerAs: 'cadAnot'
      })
      .when('/cadToken', {
        templateUrl: 'views/cadastraToken.html',
        controller: 'cadToken',
        controllerAs: 'cadToken'
      })
      .when('/cadFicha', {
        templateUrl: 'views/cadastraFicha.html',
        controller: 'cadFicha',
        controllerAs: 'cadFicha'
      })
      .when('/cadFicha2', {
        templateUrl: 'views/cadastraFicha2.html',
        controller: 'cadFicha',
        controllerAs: 'cadFicha'
      })
      .when('/cadCampanha', {
        templateUrl: 'views/cadastraCampanha.html',
        controller: 'cadCampanha',
        controllerAs: 'cadCampanha'
      })
      .when('/campanha', {
        templateUrl: 'views/campanha.html',
        controller: 'CampanhaCtrl',
        controllerAs: 'campanha'
      })
      .when('/campanhaJogador', {
        templateUrl: 'views/campanhaJogador.html',
        controller: 'CampanhaCtrl',
        controllerAs: 'campanha'
      })
      .when('/aventura', {
        templateUrl: 'views/aventura.html',
        controller: 'AventuraCtrl',
        controllerAs: 'aventura'
      })
      .when('/aventuraJogador', {
        templateUrl: 'views/aventuraJogador.html',
        controller: 'AventuraJogCtrl',
        controllerAs: 'aventura'
      })
      .when('/combate', {
        templateUrl: 'views/combate.html',
        controller: 'CombateCtrl',
        controllerAs: 'combate'
      })
      .when('/combateJogador', {
        templateUrl: 'views/combateJogador.html',
        controller: 'CombateJogCtrl',
        controllerAs: 'combate'
      })
      .when('/combateJogadorSemDados', {
        templateUrl: 'views/combateSemDados.html',
        controller: 'CombateCtrl',
        controllerAs: 'combate'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
