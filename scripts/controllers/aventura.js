'use strict';

/**
 * @ngdoc function
 * @name yangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yangApp
 */



angular.module('yangApp')
    .controller('AventuraCtrl', function($scope, $http, $rootScope, $firebaseObject, $modal, $cookies, $localstorage, $location, restService) {

         var dataAventura = $localstorage.getObject('dataAventura');
         console.log(dataAventura);

        $scope.dataAventura = dataAventura.dataAventura;
        $scope.aventura = $scope.dataAventura[0][0];
        $scope.monstros = $scope.dataAventura[1];
        $scope.anotacoes = $scope.dataAventura[2];
        $scope.fichas = $scope.dataAventura[3];
        //var campanhaID = $rootScope.dataCampanha[0][0].campanhaID;
        var ref = new Firebase("https://brilliant-fire-3725.firebaseio.com");

        console.log($scope.dataAventura[0][0].aventuraID);

        var post = $localstorage.getObject('post');
        console.log($scope.anotacoes[0]);

        //$scope.fichasJog = $rootScope.dataAventura[3];
        //$scope.fichas = $rootScope.formAventura.fichaID;

        console.log(dataAventura.dataAventura[0][0].campanhaID);

        $rootScope.formCombate = {

            fichaID: [],
            tokenID: []
        };


        $scope.open = function(fichaID) {

            getFichaAventura(fichaID);

            console.log($rootScope.dataFicha);

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent1.html',
                controller: 'AventuraCtrl'
            });

        };


        $scope.openToken = function(index) {

            console.log(index);

            getTokenAventura(index);

            console.log($rootScope.dataToken);

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent2.html',
                controller: 'AventuraCtrl'
            });

        };

        $scope.openTeste = function() {


            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent3.html',
                controller: 'AventuraCtrl'
            });

        };

        $scope.openAnot = function() {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent4.html',
                controller: 'ModalInstanceCtrl'
            });

        };

        $scope.rolarDados = function(min, max) {
            $scope.resultDados = Math.floor(Math.random() * (max - min + 1)) + min;
        };
        
        $scope.jogarCartas = function(){
  
            var myArray = ['Ás de', 'Dois de ', 'Três de ', 'Quatro de', 'Cinco de', 'Seis de', 'Sete de', 'Oito de', 'Nove de', 'Dez de', 'Valete de', 'Dama de', 'Rei de'];   
            var myArray2 = ['Paus', 'Ouros', 'Copas', 'Espadas'];
            var rand = myArray[Math.floor(Math.random() * myArray.length)];
            var rand1 = myArray2[Math.floor(Math.random() * myArray2.length)];
            
            $scope.resultCartas = rand + " " + rand1;
             
          };

        $scope.rolarDadosCombate = function(min, max) {
            $scope.resultDados = Math.floor(Math.random() * (max - min + 1)) + min;
            $scope.pathFB = ref.child("storypower").child(campanhaID).child("testes").child("testeDados");
            $scope.pathFB.set({
                resultDados: $scope.resultDados
            });
        };

        $scope.jogarMoeda = function(){

            Array.prototype.sample = function(){
              return this[Math.floor(Math.random()*this.length)];
            };

            $scope.resultMoeda = ["cara", "coroa"].sample() 
            console.log($scope.resultMoeda);

        };


        $scope.jogarMoedaCombate = function(){

            Array.prototype.sample = function(){
              return this[Math.floor(Math.random()*this.length)];
            };

            $scope.resultMoeda = ["cara", "coroa"].sample() 
            console.log($scope.resultMoeda);

        };
        
        $scope.jogarCartasCombate = function(){
  
            var myArray = ['Ás de', 'Dois de ', 'Três de ', 'Quatro de', 'Cinco de', 'Seis de', 'Sete de', 'Oito de', 'Nove de', 'Dez de', 'Valete de', 'Dama de', 'Rei de'];   
            var myArray2 = ['Paus', 'Ouros', 'Copas', 'Espadas'];
            var rand = myArray[Math.floor(Math.random() * myArray.length)];
            var rand1 = myArray2[Math.floor(Math.random() * myArray2.length)];
            
            $scope.resultCartas = rand + " " + rand1;
            $scope.pathFB = ref.child("storypower").child(campanhaID).child("testes").child("testeCartas");
            $scope.pathFB.set({
                resultCartas: $scope.resultCartas
            });
             
          };

          $scope.closeModal = function(){

             $modalInstance.close();

          };


          var d = new Date().toISOString().slice(0, 19).replace('T', ' '); 

          $scope.dataAnotacoes = {           

            campanhaID: dataAventura.dataAventura[0][0].campanhaID,
            textNotas: "",
            visivelJogadores: "",
            dataNotas: d
            
            };


        function getTokenAventura(index) {

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/gettokenaventura',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "aventuraID": $scope.dataAventura[0][0].aventuraID,
                }
            };

            $http(newInfoReq)

            .success(function(dataToken) {

                    console.log(dataToken);
                    $rootScope.dataToken = dataToken[index];
                })
                .error(function(data, status, headers, config) {


                });
        };

        function getFichaAventura(fichaID) {

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getfichaaventura',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "fichaID": fichaID,
                }
            };

            $http(newInfoReq)

            .success(function(dataFicha) {
                    console.log(dataFicha);
                    $rootScope.dataFicha = dataFicha;
                })
                .error(function(data, status, headers, config) {


                });


        };

        $scope.getFichaLogado = function(fichaID){

             var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getfichaaventura',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "fichaID": fichaID,
                }
            };

            $http(newInfoReq)

            .success(function(fichaLogada) {
                    console.log(fichaLogada);
                    $scope.fichaLogada = fichaLogada;
                })
                .error(function(data, status, headers, config) {


                });

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

            .success(function(dataCombate) {

                     $localstorage.setObject('dataCombate', {
                        dataCombate
                      });
                    $location.path('/aventura');
                    $rootScope.dataCombate = dataCombate;
                })
                .error(function(data, status, headers, config) {

                });

        };

        $scope.fechar = function() {
            $modalInstance.close();
        };

        $scope.iniciarCombate = function(formCombate){

               var monstros=document.getElementsByName("monstros");
               var jogadores=document.getElementsByName("jogadores");
                var okay=false;
                var okay1=false;
                for(var i=0,l=monstros.length;i<l;i++)
                {
                    if(monstros[i].checked)
                    {
                        okay=true;
                        break;
                    }
                }                
                for(var i=0,l=jogadores.length;i<l;i++)
                {
                    if(jogadores[i].checked)
                    {
                        okay1=true;
                        break;
                    }
                }
                if(okay && okay1){            

                console.log(formCombate);
                var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getcombate',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formCombate
            };

            $http(newInfoReq)

            .success(function(dataCombate) {
                console.log(dataCombate);
                     $localstorage.setObject('dataCombate', {
                        dataCombate
                      });
                    $rootScope.dataCombate = dataCombate;
                    $location.path('/combate');

                })
                .error(function(data, status, headers, config) {

                });


                }
                else alert("Selecione pelo menos um jogador/monstro");
            


        };

        $scope.iniciarCombateJogador = function(formCombate) {
            /*
            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getcombate',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formCombate
            };

            $http(newInfoReq)

            .success(function(dataCombate) {
                     $localstorage.setObject('dataCombate', {
                        dataCombate
                      });
                    $rootScope.dataCombate = dataCombate;
                    $location.path('/combatejogador');

                })
                .error(function(data, status, headers, config) {

                }); */

                    $location.path('/combateJogador');


        };
    });


angular.module('yangApp')
    .controller('AventuraJogCtrl', function($scope, $http, $rootScope, $firebaseObject, $modal, $cookies, $localstorage, $location, restService) {

        var dataAventura = $localstorage.getObject('dataAventura');
        var dataJogadorAtivo = $localstorage.getObject('dataJogadorAtivo');

        $scope.dataAventura = dataAventura.dataAventura;
        $scope.aventura = $scope.dataAventura[0][0];
        $scope.monstros = $scope.dataAventura[1];
        $scope.anotacoes = $scope.dataAventura[2];
        $scope.fichas = $scope.dataAventura[3];

        var campanhaID = $scope.aventura.campanhaID;
        var ref = new Firebase("https://brilliant-fire-3725.firebaseio.com");
        $scope.fichaIDLogado = dataJogadorAtivo.fichaID;

        console.log($scope.fichaIDLogado);

        var post = $localstorage.getObject('post');
        console.log($scope.anotacoes[0]);

        //$scope.fichasJog = $rootScope.dataAventura[3];
        //$scope.fichas = $rootScope.formAventura.fichaID;

        //$scope.fichasJog = $rootScope.dataAventura[3];

        $rootScope.formCombate = {

            fichaID: [],
            tokenID: []
        };

       $scope.atualizarPV = function(valor, fichaIDLogado) {
            console.log(valor, fichaIDLogado);
            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getfichaaventura',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "fichaID": fichaIDLogado,
                }
            };

            $http(newInfoReq)

            .success(function(dataFicha) {
                    console.log(dataFicha[0].pvAtual);
                    $scope.pvAtual = dataFicha[0].pvAtual;

                    $scope.pathFB = ref.child("storypower").child(campanhaID).child(fichaIDLogado).child("powerBar");
                    $scope.pathFB.set({
                        valor: valor,
                        valorPV: $scope.pvAtual
                    });
                })
                .error(function(data, status, headers, config) {


                });

        };

        $scope.valorPV = $firebaseObject(ref.child("storypower").child(campanhaID).child($scope.fichaIDLogado).child("powerBar"));


        $scope.open = function(fichaID) {

            getFichaAventura(fichaID);

            console.log($rootScope.dataFicha);

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent1.html',
                controller: 'AventuraCtrl'
            });

        };


        $scope.openToken = function(index) {

            getTokenAventura(index);

            console.log($rootScope.dataToken);

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent2.html',
                controller: 'AventuraCtrl'
            });

        };

        $scope.openTeste = function() {


            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent3.html',
                controller: 'AventuraCtrl'
            });

        };

        $scope.openAnot = function() {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent4.html',
                controller: 'ModalInstanceCtrl'
            });

        };

        $scope.rolarDados = function(min, max) {
            $scope.resultDados = Math.floor(Math.random() * (max - min + 1)) + min;
        };
        
        $scope.jogarCartas = function(){
  
            var myArray = ['Ás de', 'Dois de ', 'Três de ', 'Quatro de', 'Cinco de', 'Seis de', 'Sete de', 'Oito de', 'Nove de', 'Dez de', 'Valete de', 'Dama de', 'Rei de'];   
            var myArray2 = ['Paus', 'Ouros', 'Copas', 'Espadas'];
            var rand = myArray[Math.floor(Math.random() * myArray.length)];
            var rand1 = myArray2[Math.floor(Math.random() * myArray2.length)];
            
            $scope.resultCartas = rand + " " + rand1;
             
          };

        $scope.rolarDadosCombate = function(min, max) {
            $scope.resultDados = Math.floor(Math.random() * (max - min + 1)) + min;
            $scope.pathFB = ref.child("storypower").child(campanhaID).child("testes").child("testeDados");
            $scope.pathFB.set({
                resultDados: $scope.resultDados
            });
        };
        
        $scope.jogarCartasCombate = function(){
  
            var myArray = ['Ás de', 'Dois de ', 'Três de ', 'Quatro de', 'Cinco de', 'Seis de', 'Sete de', 'Oito de', 'Nove de', 'Dez de', 'Valete de', 'Dama de', 'Rei de'];   
            var myArray2 = ['Paus', 'Ouros', 'Copas', 'Espadas'];
            var rand = myArray[Math.floor(Math.random() * myArray.length)];
            var rand1 = myArray2[Math.floor(Math.random() * myArray2.length)];
            
            $scope.resultCartas = rand + " " + rand1;
            $scope.pathFB = ref.child("storypower").child(campanhaID).child("testes").child("testeCartas");
            $scope.pathFB.set({
                resultCartas: $scope.resultCartas
            });
             
          };

         $scope.jogarMoeda = function(){

            Array.prototype.sample = function(){
              return this[Math.floor(Math.random()*this.length)];
            };

            $scope.resultMoeda = ["cara", "coroa"].sample() 
            console.log($scope.resultMoeda);

        };

          $scope.closeModal = function(){

             $modalInstance.close();

          };


          var d = new Date().toISOString().slice(0, 19).replace('T', ' '); 

          $scope.dataAnotacoes = {           

            campanhaID: $scope.dataAventura[0][0].campanhaID,
            textNotas: "",
            visivelJogadores: "",
            dataNotas: d
            
            };


        function getTokenAventura(index) {

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/gettokenaventura',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "aventuraID": "avent1",
                }
            };

            $http(newInfoReq)

            .success(function(dataToken) {

                    console.log(dataToken);
                    $rootScope.dataToken = dataToken[index];
                })
                .error(function(data, status, headers, config) {


                });
        };

        function getFichaAventura(fichaID) {

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getfichaaventura',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "fichaID": fichaID,
                }
            };

            $http(newInfoReq)

            .success(function(dataFicha) {
                    console.log(dataFicha);
                    $rootScope.dataFicha = dataFicha;
                })
                .error(function(data, status, headers, config) {


                });


        };

        $scope.getFichaLogado = function(fichaID){

             var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getfichaaventura',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "fichaID": fichaID,
                }
            };

            $http(newInfoReq)

            .success(function(fichaLogada) {
                    console.log(fichaLogada);
                    $scope.fichaLogada = fichaLogada;
                })
                .error(function(data, status, headers, config) {


                });

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

            .success(function(dataCombate) {

                     $localstorage.setObject('dataCombate', {
                        dataCombate
                      });
                    $location.path('/aventura');
                    window.alert("Anotação gravada com sucesso!")
                    $rootScope.dataCombate = dataCombate;
                })
                .error(function(data, status, headers, config) {

                });

        };

        $scope.fechar = function() {
            $modalInstance.close();
        };


        $scope.iniciarCombate = function(formCombate) {
            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getcombate',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formCombate
            };

            $http(newInfoReq)

            .success(function(dataCombate) {
                     $localstorage.setObject('dataCombate', {
                        dataCombate
                      });
                    $rootScope.dataCombate = dataCombate;
                    $location.path('/combate');

                })
                .error(function(data, status, headers, config) {

                });

        };

        $scope.iniciarCombateJogador = function(formCombate) {
            /*
            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getcombate',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formCombate
            };

            $http(newInfoReq)

            .success(function(dataCombate) {
                     $localstorage.setObject('dataCombate', {
                        dataCombate
                      });
                    $rootScope.dataCombate = dataCombate;
                    $location.path('/combatejogador');

                })
                .error(function(data, status, headers, config) {

                }); */

                    $location.path('/combateJogador');


        };
    });