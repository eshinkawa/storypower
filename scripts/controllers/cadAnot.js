'use strict';

/**
 * @ngdoc function
 * @name yangApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yangApp
 */
angular.module('yangApp')
    .controller('cadAnot', function($scope, $rootScope, $http, $cookies, $location, $localstorage, restService) {
     
        var dataAventura = $localstorage.getObject('dataAventura');
        var d = new Date().toISOString().slice(0, 19).replace('T', ' '); 
        
    	 $scope.dataAnotacoes = {      
            campanhaID: dataAventura.dataAventura[0][0].campanhaID,
            textNotas: "",
            checkVisivel: "",
            dataNotas: d
            
            };

        $scope.setAnot = function(dataAnotacoes) {
            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/setanotacoes',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dataAnotacoes
            };

            $http(newInfoReq)

            .success(function(data) {

                    /*$localstorage.setObject('dataCombate', {
                        dataCombate
                      });
                    $rootScope.dataCombate = dataCombate; */

                    console.log(data);
                    $scope.iniciarAvent();

                })
                .error(function(data, status, headers, config) {

                });

        };


         $scope.iniciarAvent = function(){
            
         var formAventura = $localstorage.getObject('formAventura');
         console.log(formAventura);

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getaventura',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formAventura.formAventura
                        
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

    });