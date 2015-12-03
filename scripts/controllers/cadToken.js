'use strict';

/**
 * @ngdoc function
 * @name yangApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yangApp
 */
angular.module('yangApp')
    .controller('cadToken', function($scope, $rootScope, $http, $cookies, $location, $localstorage, restService) {

    	$scope.formAventura = {};
    	$scope.formToken = {};
        $scope.senhaUsr = "";
		var dataJogadorAtivo = $localstorage.getObject('dataJogadorAtivo');
		var dataCampanhaIDNome = $localstorage.getObject('dataCampanhaIDNome');
		var dataAventura = $localstorage.getObject('dataAventura');
		$scope.aventuraForm = $localstorage.getObject('formAventura');

		console.log($scope.aventuraForm.formAventura);

        $scope.formToken.aventuraID = dataAventura.dataAventura[0][0].aventuraID;

        $scope.cadastraToken = function(formToken) {

        var newInfoReq = {
            method: 'POST',
            url: restService.restUrl + '/settoken',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.formToken
        };

        $http(newInfoReq)

        .success(function(dataCampanha) {
                window.alert("cadastro do token feito efetuado com sucesso");
                 $scope.iniciarAvent($scope.aventuraForm.formAventura);
            })
            .error(function(data) {

                console.log("erro ao cadastrar aventura")

            });

    };


    $scope.iniciarAvent = function(formAventura){

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getaventura',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formAventura
                        
            };

            $http(newInfoReq)

            .success(function(dataAventura) {

                    $localstorage.setObject('dataAventura', {
                        dataAventura: dataAventura
                    });
                    $location.path('/aventura');
                    

                })
                .error(function(data, status, headers, config) {


                });

        };

     $scope.goCampanha = function() {

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getcampanha',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "campanhaID": dataCampanhaIDNome.campanhaID,
                }
            };

            $http(newInfoReq)

            .success(function(dataCampanha) {
                  
                console.log(dataCampanha);

                //$rootScope.campanhaNome = campanhaNome;
                $rootScope.dataCampanha = dataCampanha;
                $scope.fichas = dataCampanha[1][0];

                $localstorage.setObject('dataCampanha', {
                    dataCampanha: dataCampanha
                });

               /*$localstorage.setObject('dataCampanhaNome', {
                    campanhaNome: campanhaNome
                }); */

                $location.path('/campanha');

                })
                .error(function(data) {


                });

        };


    });