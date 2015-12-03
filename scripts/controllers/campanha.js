'use strict';

/**
 * @ngdoc function
 * @name yangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yangApp
 */
angular.module('yangApp')
    .controller('CampanhaCtrl', function($scope, $http, $rootScope, $cookies, $modal, $localstorage, $location, restService) {

        var fichaID = [];
        var dataCamps = $localstorage.getObject('dataCampanhas');

        //console.log($rootScope.dataCampanha[0][0].campanhaID);

        var dataCampanha = $localstorage.getObject('dataCampanha');
        var campanhaNome = $localstorage.getObject('dataCampanhaNome');
        var campanhaIDNome = $localstorage.getObject('dataCampanhaIDNome');
        console.log(campanhaNome);

        $scope.campanhaNome = campanhaNome.campanhaNome;
        $scope.aventuras = dataCampanha.dataCampanha[0];
        $scope.fichas = dataCampanha.dataCampanha[1];

        $scope.formFicha = {};
        $scope.formFicha.ficha = {};

        $scope.formFicha.ficha.aventuraID = "";
        $scope.formFicha.ficha.usrID = dataCamps.dataCampanhas[0].usrID;
        $scope.formFicha.ficha.campanhaID = dataCampanha.dataCampanha[0].campanhaID;
        //$scope.formAventura.campanhaID = dataCampanha.dataCampanha[0].campanhaID;
        $scope.formAventura = {

            fichaID : [],
            emailUsr : dataCamps.dataCampanhas[0].emailUsr,
            campanhaID : campanhaIDNome.campanhaID

        };
        //$scope.formAventura.campanhaID = dataCampanha.dataCampanha[0].campanhaID;
        /*
        $rootScope.formAventuraNomePers = {

            nomePers : []
        };
        */

        //$scope.formAventura.campanhaID = dataCampanha.dataCampanha[0].campanhaID;
        $scope.oneAtATime = true;

        $scope.addFicha = function() {
            console.log("entrando aqui");

            $location.path('/cadastraFicha');
        };

        $scope.cadastrarFicha = function(ficha) {

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/setficha',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: ficha.ficha
            };

            $http(newInfoReq)

            .success(function(data, status) {
                console.log(data);


                console.log(ficha.dinheiro, data.fichaID);
                console.log(ficha.variacao.variacaoJogo, data.fichaID);
                console.log(ficha.pvpm, data.fichaID);

                cadastrarDinheiro(ficha.dinheiro, data.fichaID);
                cadastrarPvpm(ficha.pvpm, data.fichaID);
                cadastrarHabil(ficha.variacao.variacaoJogo, data.fichaID);


                })
                .error(function(data, status, headers, config) {

                    window.alert("Erro no cadastro da ficha")

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
                    "campanhaID": $scope.formFicha.ficha.campanhaID,
                }
            };

            $http(newInfoReq)

            .success(function(dataCampanha) {


                    $location.path('/campanha');


                })
                .error(function(data) {


                });

        };

        function cadastrarDinheiro(dinheiro, fichaID){

            console.log(dinheiro);

            $scope.dinheiro = {};
            $scope.dinheiro = dinheiro;
            $scope.dinheiro.fichaID = fichaID;

            console.log("$scope.dinheiro é: " + $scope.dinheiro.fichaID);
            console.log("$scope.dinheiro é: " + $scope.dinheiro.totPrata);

                var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/setficdinheiro',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.dinheiro
                        
            };

            $http(newInfoReq)

            .success(function(data) {
                    console.log(data, "tabela dinheiro gravada com sucesso");

                })
                .error(function(data, status, headers, config) {
                    console.log(data, "tabela dinheiro nao gravada");

                });
        }

        function cadastrarPvpm(pvpm, fichaID){

            $scope.pvpm = {};
            $scope.pvpm = pvpm;
            $scope.pvpm.fichaID = fichaID;

           console.log("$scope.pvpm é: " + $scope.pvpm);


                var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/setficpvpm',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.pvpm
                        
            };

            $http(newInfoReq)

            .success(function(data) {
                    console.log(data, "tabela pvpm gravada com sucesso");

                })
                .error(function(data, status, headers, config) {
                    console.log(data, "tabela pvpm nao gravada");

                });
        }

        function cadastrarHabil(habil, fichaID){

            $scope.habil = {};
            $scope.habil.variacaoJogo = habil;
            $scope.habil.fichaID = fichaID;

            console.log("$scope.habil.variacaoJogo é: " + $scope.habil.variacaoJogo + " " + $scope.habil.fichaID);


                var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/setperihabil',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                        "fichaID" : $scope.habil.fichaID,
                        "variacaoJogo" : $scope.habil.variacaoJogo,
                }
                        
            };

            $http(newInfoReq)

            .success(function(data) {
                    console.log(data, "tabela habil gravada com sucesso");

                })
                .error(function(data, status, headers, config) {
                    console.log(data, "tabela habil nao gravada");

                });
        }



        $scope.getInfoJog = function(jogadorID) {
            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getfichaaventura',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {"fichaID" : jogadorID}
            };

            $http(newInfoReq)

            .success(function(jogInfo) {
                console.log(jogInfo[0]);
                $scope.jog = jogInfo[0];

                })
                .error(function(data, status, headers, config) {

                });
        };

        $scope.iniciarAvent = function(formAventura){

               var checkboxs=document.getElementsByName("awesome");
                var okay=false;
                for(var i=0,l=checkboxs.length;i<l;i++)
                {
                    if(checkboxs[i].checked)
                    {
                        okay=true;
                        break;
                    }
                }
                if(okay){

                $localstorage.setObject('formAventura', {
                formAventura: formAventura
            });

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


                }
                else alert("Selecione pelo menos um jogador");
            


        };

        function IrAventuraJogador(objetoAvent){

                var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getaventura',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: objetoAvent
                        
            };

            $http(newInfoReq)

            .success(function(dataAventura) {
                    console.log(dataAventura);
                    $localstorage.setObject('dataAventura', {
                        dataAventura: dataAventura
                    });
                    $location.path('/aventuraJogador');

                })
                .error(function(data, status, headers, config) {

                });
        }


        function IrAventuraJogador(objetoAvent){

                var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getaventura',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: objetoAvent
                        
            };

            $http(newInfoReq)

            .success(function(dataAventura) {
                    $localstorage.setObject('dataAventura', {
                        dataAventura: dataAventura
                    });
                    $location.path('/aventuraJogador');

                })
                .error(function(data, status, headers, config) {

                });
        }


        $rootScope.iniciarAventJog = function(formAventura){

            $rootScope.formAventura = formAventura;

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getaventuraquery',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formAventura
                        
            };

            $http(newInfoReq)

            .success(function(dataAventura) {

                    // $rootScope.dataAventura = dataAventura;
                    // console.log($rootScope.formAventura);
                    // $location.path('/aventuraJogador');
                    console.log(dataAventura[0]);
                    var str = dataAventura[0];
                    str = str.replace(/\\/g, '');
                    var objetoAventura = JSON.parse(str);
                    console.log(objetoAventura);
                    //$rootScope.fichasJog = objetoAventura.fichaID;

                    IrAventuraJogador(objetoAventura);

                })
                .error(function(data, status, headers, config) {


                });

        };
        $scope.isCheckboxChecked = function() {
            return ($rootScope.formAventura);
        }

    });

