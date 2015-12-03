'use strict';

/**
 * @ngdoc function
 * @name yangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yangApp
 */
angular.module('yangApp')
    .controller('CampanhasCtrl', function($scope, $http, $rootScope, $cookies, $location, $localstorage, restService) {

        var dataCamps = $localstorage.getObject('dataCampanhas');
        $scope.campanhas = dataCamps.dataCampanhas[1];

        //objeto do mestre da campanhas
        console.log(dataCamps.dataCampanhas[0].usrID);
        $scope.usrIDCamp = dataCamps.dataCampanhas[0].usrID;

        //array das campanhas
        console.log(dataCamps.dataCampanhas[1]);


        $scope.goCampanha = function(campanhaID, campanhaNome, campanhaVariacao) {
            console.log(campanhaID);

            $localstorage.setObject('dataCampanhaIDNome', {
                "campanhaID": campanhaID,
                "campanhaNome" : campanhaNome,
                "campanhaVariacao" : campanhaVariacao
            });

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getcampanha',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "emailUsr" : dataCamps.dataCampanhas[0].emailUsr,
                    "campanhaID": campanhaID,
                }
            };

            $http(newInfoReq)

            .success(function(dataCampanha) {

                    console.log(dataCampanha, campanhaNome);

                    $rootScope.campanhaNome = campanhaNome;
                    $rootScope.dataCampanha = dataCampanha;
                    $scope.fichas = dataCampanha[1][0];

                    $localstorage.setObject('dataCampanha', {
                        dataCampanha: dataCampanha
                    });

                   $localstorage.setObject('dataCampanhaNome', {
                        campanhaNome: campanhaNome
                    });

                    $localstorage.setObject('dataJogadorAtivo', {
                        campanhaID: campanhaID,
                        fichaID: dataCampanha[2].fichaID
                    });

                    $location.path('/campanha');
                })
                .error(function(data) {


                });

        };

        $scope.goCampanhaJog = function(campanhaID, campanhaNome) {
            console.log(campanhaID);

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getcampanha',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "emailUsr" : $rootScope.emailAtivo,
                    "campanhaID": campanhaID
                }
            };

            $http(newInfoReq)

            .success(function(dataCampanha) {

                    $rootScope.campanhaNome = campanhaNome;
                    $rootScope.dataCampanha = dataCampanha;
                    $scope.fichas = dataCampanha[1][0];

                    console.log(dataCampanha[2].fichaID);

                    $localstorage.setObject('dataCampanha', {
                        dataCampanha: dataCampanha
                    });

                    $localstorage.setObject('dataJogadorAtivo', {
                        campanhaID: $rootScope.dataCampanha[0][0].campanhaID,
                        fichaID: dataCampanha[2].fichaID
                    });

                    $location.path('/campanhaJogador');
                })
                .error(function(data) {


                });

        };

    });