'use strict';

/**
 * @ngdoc function
 * @name yangApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yangApp
 */
angular.module('yangApp')
    .controller('cadCampanha', function($scope, $rootScope, $http, $cookies, $location, $localstorage, restService) {

    	var dataCamps = $localstorage.getObject('dataCampanhas');
    	console.log(dataCamps.dataCampanhas[0].usrID);
    	$scope.formCampanha = {};
    	$scope.formCampanha.usrID = dataCamps.dataCampanhas[0].usrID;



    	$scope.login = function(email, senha) {

            console.log(email, senha);

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getusers',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "emailUsr": email,
                    "senhaUsr": senha
                }
            };

            $http(newInfoReq)

            .success(function(data) {

                    $localstorage.setObject('dataCampanhas', {
                        dataCampanhas: data
                    });
/*
                    $localstorage.setObject('dataJogadorAtivo', {
                        campanhaID: $rootScope.dataCampanha[0][0].campanhaID,
                        fichaID: dataCampanha[2].fichaID
                    });
*/

                    var dataCamps = $localstorage.getObject('dataCampanhas');
                    
                    //objeto do mestre da campanhas
                    console.log(dataCamps.dataCampanhas[0]);

                    //array das campanhas
                    console.log(dataCamps.dataCampanhas[1]);

                    $rootScope.campanhas = data[1];
                    console.log(data);
                    $location.path('/campanhas');

                })
                .error(function(data, status, headers, config) {

                  window.alert("Usuário e/ou Senha incorreta");


                });

        };

    	$scope.cadastraCampanha = function(formCampanha) {
            console.log(formCampanha);

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/setcampanha',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formCampanha
            };

            $http(newInfoReq)

            .success(function(status) {
            		console.log(status);
                    window.alert("cadastro da campanha realizado com sucesso");
                	$scope.login(dataCamps.dataCampanhas[0].emailUsr,dataCamps.dataCampanhas[0].senhaUsr);
                })
                .error(function(data) {


                });

        };

        $scope.getVariacao = function() {

            var newInfoReq = {
                method: 'GET',
                url: restService.restUrl + '/getvariacaojogo',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http(newInfoReq)

            .success(function(data) {
                    console.log(data);
                    $scope.variacoes = data;
                })
                .error(function(data) {


                });

        };
    });