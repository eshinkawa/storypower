'use strict';

/**
 * @ngdoc function
 * @name yangApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yangApp
 */
angular.module('yangApp')
    .controller('cadUser', function($scope, $rootScope, $http, $cookies, $location, $localstorage, restService) {

    	$scope.formUser = {};
        $scope.senhaUsr = "";

        $scope.cadastraUser = function(formUser, senhaUsr) {

        $scope.formUser.senhaUsr = MD5(senhaUsr);
        console.log(formUser);

            
        var newInfoReq = {
            method: 'POST',
            url: restService.restUrl + '/setusers',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.formUser
        };

        $http(newInfoReq)

        .success(function(data) {
                window.alert("cadastro de usuário realizado com sucesso");
                $location.path('/login');
            })
            .error(function(data) {

                console.log("erro ao cadastrar usuário")

            });

    };


    });