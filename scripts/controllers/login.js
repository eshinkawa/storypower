'use strict';

/**
 * @ngdoc function
 * @name yangApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yangApp
 */
angular.module('yangApp')
    .controller('LoginCtrl', function($scope, $rootScope, $http, $cookies, $location, $localstorage, restService) {

      console.log(restService.restUrl);


        $scope.login = function(email, senha) {

        $rootScope.emailAtivo = email;

        var senhamd5 = MD5(senha);
        console.log(senhamd5);

            console.log(email, senha);

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getusers',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "emailUsr": email,
                    "senhaUsr": senhamd5
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

                  window.alert("Usuário ou Senha incorreta");


                });

        };




    });