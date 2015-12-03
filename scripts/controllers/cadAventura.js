'use strict';

/**
 * @ngdoc function
 * @name yangApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yangApp
 */
angular.module('yangApp')
    .controller('cadAventura', function($scope, $rootScope, $http, $cookies, $location, $localstorage, restService) {

    	$scope.formAventura = {};
    	$scope.formToken = {};
        $scope.senhaUsr = "";
		var dataJogadorAtivo = $localstorage.getObject('dataJogadorAtivo');
		var dataCampanhaIDNome = $localstorage.getObject('dataCampanhaIDNome');
		//var dataAventura = $localstorage.getObject('dataAventura');
		//console.log(dataAventura.dataAventura[0][0].aventuraID);

        $scope.formAventura.campanhaID = dataCampanhaIDNome.campanhaID;
        $scope.formAventura.aventuraSituacao = 1;

        //$scope.formToken.aventuraID = dataAventura.dataAventura[0][0].aventuraID;

        $scope.cadastraAventura = function(formAventura) {

        var newInfoReq = {
            method: 'POST',
            url: restService.restUrl + '/setaventura',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.formAventura
        };

        $http(newInfoReq)

        .success(function(dataCampanha) {
                window.alert("cadastro da aventura realizado com sucesso");
                 $scope.goCampanha();
            })
            .error(function(data) {

                console.log("erro ao cadastrar aventura")

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