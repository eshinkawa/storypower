'use strict';

/**
 * @ngdoc function
 * @name yangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yangApp
 */


angular.module('yangApp')
    .controller('ModalInstanceCtrl', function($scope, $http, $modal, $location, $modalInstance, $rootScope, $firebaseObject, $localstorage, restService) {

        var ref = new Firebase("https://brilliant-fire-3725.firebaseio.com");
        var dataAventura = $localstorage.getObject('dataAventura');

        $scope.ok = function() {
            $rootScope.iniciativa = false;
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.close();
            $scope.open();
        };

         $rootScope.fecharModal = function () {
            $modalInstance.close();
          };

        var d = new Date().toISOString().slice(0, 19).replace('T', ' '); 
        var dataCampanha = $localstorage.getObject('dataCampanha');

        $scope.dataAnotacoes = {           

            campanhaID: dataAventura.dataAventura[0][0].campanhaID,
            textNotas: "",
            checkVisivel: "",
            dataNotas: d
            
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
                    $rootScope.dataCombate = dataCombate;
                    $modalInstance.close();
                    $scope.iniciarAvent();

                })
                .error(function(data, status, headers, config) {

                });

        };

        $scope.open = function() {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent5.html',
                controller: 'ModalInstanceCtrl',
                backdrop: 'static'
            });
        };

        
        $scope.openTeste = function() {


            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent3.html',
                controller: 'AventuraCtrl'
            });
        };

        var post = $localstorage.getObject('dataCombate');
        //console.log(post.dataCombate[0]);

        $scope.valoresDados = [];
        var dataCombate = post.dataCombate[0];

        $scope.calInic = function(valor, index) {

            angular.forEach(dataCombate, function(item, index) {

                item.iniciativaComDados = item.iniciativaSemDados + valor[index];
                console.log(item.iniciativaComDados);
                console.log(dataCombate);

            });

            var dataC = [];
            dataC.push(dataCombate);

            $localstorage.setObject('dataC', {
                dataC
            });

            

            $rootScope.postSemDados = $localstorage.getObject('dataC');
            $rootScope.dataD = $rootScope.postSemDados.dataC[0];
            $rootScope.dataC = $rootScope.dataD.sort(function(a, b) {
                return b.iniciativaComDados - a.iniciativaComDados;
            });

            $modalInstance.close();

            $location.path('/combateJogadorSemDados');

        };
    });

angular.module('yangApp')
    .controller('CombateCtrl', function($scope, $modal, $http, $rootScope, $cookies, $location, $firebaseObject, $localstorage, restService) {

        var post = $localstorage.getObject('dataCombate');
        var postSemDados = $localstorage.getObject('dataC');
        var fichaIDJogador = $localstorage.getObject('dataC');
        // var fichaID = $localstorage.getObject('dataJogadorAtivo').fichaID;
        var campanhaID = $localstorage.getObject('dataCampanha').dataCampanha[0][0].campanhaID;
        $scope.oneAtATime = true;


        console.log(campanhaID);
        var ref = new Firebase("https://brilliant-fire-3725.firebaseio.com");

        $scope.getPvFirebase = function(id, pvMaxToken){
            $scope.testeCartasJog = $firebaseObject(ref.child("storypower").child(campanhaID).child(id).child("testes").child("testecartas"));
            $scope.testeDadoJog = $firebaseObject(ref.child("storypower").child(campanhaID).child(id).child("testes").child("testedado"));
            $scope.testeMoedaJog = $firebaseObject(ref.child("storypower").child(campanhaID).child(id).child("testes").child("testemoeda"));
            $scope.textoJog = $firebaseObject(ref.child("storypower").child(campanhaID).child(id).child("texto"));

            $scope.pv = $firebaseObject(ref.child("storypower").child(campanhaID).child(id).child("powerBar").child("valor"));
            console.log($scope.pv.$value);
             $scope.pv.$loaded().then(function() {

             if($scope.pv.$value !== null){
                $scope.valorInicial = $scope.pv.$value;
                console.log($scope.valorInicial)

            }

            else{
                console.log("elsening");
                $scope.pathFB = ref.child("storypower").child(campanhaID).child(id).child("powerBar");
                $scope.pathFB.set({
                    valor: pvMaxToken,
                    valorPV: pvMaxToken
                });

                $scope.valorInicial = $scope.pv.$value;
                console.log($scope.valorInicial)

            }


            });


        };

        // $scope.pvContinua = ref.child("storypower").child(campanhaID).child(fichaID).child("powerBar").valor;

        $rootScope.dataCombate = post.dataCombate[0];
        //$rootScope.dataC = postSemDados.dataC[0];
        console.log($scope.dataCombate);
        //console.log($scope.dataC);

        $scope.enviarFB = function(texto) {

            console.log(campanhaID);
            console.log(texto);

            $scope.pathFB = ref.child("storypower").child(campanhaID).child("texto");
            $scope.pathFB.set({
                texto: texto
            });

        };

        $scope.atacarToken = function(ataque, token){
            $scope.pathFB = ref.child("storypower").child(campanhaID).child("tokenstatus");
            $scope.pathFB.set({
                texto: "O token " +token+ " levou um ataque de " +ataque+ " ponto(s)."
            });
        };

        $scope.curarToken = function(cura, token){
            $scope.pathFB = ref.child("storypower").child(campanhaID).child("tokenstatus");
            $scope.pathFB.set({
                texto: "O token " +token+ " foi curado em " +cura+ " ponto(s)."
            });
        };

        $scope.atacarJog = function(valor, valorPV, fichaID, jogador, valorAtaque) {
            console.log(valor, valorPV, fichaID);

            $scope.pathFB = ref.child("storypower").child(campanhaID).child(fichaID).child("powerBar");
            $scope.pathFBJog = ref.child("storypower").child(campanhaID).child("jogstatus");

            $scope.pathFB.set({
                valor: valor,
                valorPV: valorPV
            });

             $scope.pathFBJog.set({
                texto: "O jogador " +jogador+ " levou um ataque de " +valorAtaque+ " ponto(s). PV atual: " + valor +"/" + valorPV
            });

        };

        $scope.curarJog = function(valor, valorPV, fichaID, jogador, valorCura) {
            console.log(valor, valorPV, fichaID);

            $scope.pathFB = ref.child("storypower").child(campanhaID).child(fichaID).child("powerBar");
            $scope.pathFBJog = ref.child("storypower").child(campanhaID).child("jogstatus");
            $scope.pathFB.set({
                valor: valor,
                valorPV: valorPV
            });

             $scope.pathFBJog.set({
                texto: "O jogador " +jogador+ " foi curado em " +valorCura+ " ponto(s). PV atual: " + valor +"/" + valorPV
            });

        };

        //var fichaID = "ficha2";

        // $scope.testeDados = $firebaseObject(ref.child("storypower").child(campanhaID).child("testes").child("testeDados"));
        // $scope.testeCartas = $firebaseObject(ref.child("storypower").child(campanhaID).child("testes").child("testeCartas"));
        // $scope.profile = $firebaseObject(ref.child("storypower").child(campanhaID).child(fichaID).child("powerBar"));

        // console.log($scope.profile);

        $scope.open = function() {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                backdrop: 'static'
            });
        };

        $scope.openTeste = function() {


            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent3.html',
                controller: 'AventuraCtrl'
            });
        };

        $scope.openTesteCombate = function() {


            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent3.html',
                controller: 'CombateCtrl'
            });
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

        $scope.jogarMoedaCombate = function(){

            Array.prototype.sample = function(){
              return this[Math.floor(Math.random()*this.length)];
            };

            $scope.resultMoeda = ["cara", "coroa"].sample() 
            console.log($scope.resultMoeda);
            $scope.pathFB = ref.child("storypower").child(campanhaID).child("testes").child("testeMoeda");
            $scope.pathFB.set({
                resultMoeda: $scope.resultMoeda
            });

        };
        

        $scope.ok = function() {
            $modalInstance.close();
        };

        $scope.voltarAventuraJog = function() {
            $location.path('/aventuraJogador');
        };

        $scope.rolarDados = function(min, max) {
            $scope.resultDados = Math.floor(Math.random() * (max - min + 1)) + min;
        };

        $scope.jogarCartas = function() {

            var myArray = ['Ás de', 'Dois de ', 'Três de ', 'Quatro de', 'Cinco de', 'Seis de', 'Sete de', 'Oito de', 'Nove de', 'Dez de', 'Valete de', 'Dama de', 'Rei de'];
            var myArray2 = ['Paus', 'Ouros', 'Copas', 'Espadas'];
            var rand = myArray[Math.floor(Math.random() * myArray.length)];
            var rand1 = myArray2[Math.floor(Math.random() * myArray2.length)];

            $scope.resultCartas = rand + " " + rand1;

        };

    });



angular.module('yangApp')
    .controller('CombateJogCtrl', function($scope, $modal, $http, $rootScope, $cookies, $location, $firebaseObject, $localstorage, restService) {

        var post = $localstorage.getObject('dataCombate');
        var postSemDados = $localstorage.getObject('dataC');
        var fichaIDJogador = $localstorage.getObject('dataC');
        var campanhaIDJogador = $localstorage.getObject('dataJogadorAtivo');
        var fichaID = $localstorage.getObject('dataJogadorAtivo').fichaID;
        var campanhaID = $localstorage.getObject('dataJogadorAtivo').campanhaID;
        $scope.oneAtATime = true;


        console.log($localstorage.getObject('dataCampanha').dataCampanha[0][0].aventuraID);
        var ref = new Firebase("https://brilliant-fire-3725.firebaseio.com");

        $scope.getPvFirebase = function(id, pvMaxToken){
            $scope.pv = $firebaseObject(ref.child("storypower").child(campanhaID).child(id).child("powerBar").child("valor"));
            console.log($scope.pv.$value);
             $scope.pv.$loaded().then(function() {

             if($scope.pv.$value !== null){
                $scope.valorInicial = $scope.pv.$value;
                console.log($scope.valorInicial)

            }

            else{
                console.log("elsening");
                $scope.pathFB = ref.child("storypower").child(campanhaID).child(id).child("powerBar");
                $scope.pathFB.set({
                    valor: pvMaxToken,
                    valorPV: pvMaxToken
                });

                $scope.valorInicial = $scope.pv.$value;
                console.log($scope.valorInicial)

            }


            });


        };

        $scope.pvContinua = ref.child("storypower").child(campanhaID).child(fichaID).child("powerBar").valor;

        // $rootScope.dataCombate = post.dataCombate[0];
        //$rootScope.dataC = postSemDados.dataC[0];
        // console.log($scope.dataCombate);
        //console.log($scope.dataC);


        $scope.fire = function(valor, valorPV, fichaID) {
            console.log(valor, valorPV, fichaID);

            $scope.pathFB = ref.child("storypower").child(campanhaID).child(fichaID).child("powerBar");
            $scope.pathFB.set({
                valor: valor,
                valorPV: valorPV
            });

        };

        //var fichaID = "ficha2";

        $scope.testeDados = $firebaseObject(ref.child("storypower").child(campanhaID).child("testes").child("testeDados"));
        $scope.testeCartas = $firebaseObject(ref.child("storypower").child(campanhaID).child("testes").child("testeCartas"));  
        $scope.testeMoeda = $firebaseObject(ref.child("storypower").child(campanhaID).child("testes").child("testeMoeda"));  
        $scope.textoMestre = $firebaseObject(ref.child("storypower").child(campanhaID).child("texto")); 
        $scope.statusToken = $firebaseObject(ref.child("storypower").child(campanhaID).child("tokenstatus"));
        $scope.statusJog = $firebaseObject(ref.child("storypower").child(campanhaID).child("jogstatus"));

        $scope.profile = $firebaseObject(ref.child("storypower").child(campanhaID).child(fichaID).child("powerBar"));

        console.log($scope.profile);

        $scope.enviarFB = function(texto) {

            console.log(campanhaID);
            console.log(texto);
            $scope.pathFB = ref.child("storypower").child(campanhaID).child(fichaID).child("texto");
            $scope.pathFB.set({
                texto: texto
            });

        };

        $scope.open = function() {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                backdrop: 'static'
            });
        };

         $scope.cancel = function () {
             $modalInstance.dismiss('cancel');
          };

        $scope.openTeste = function() {


            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent3.html',
                controller: 'AventuraCtrl'
            });
        };

        $scope.openTesteCombate = function() {


            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent55.html',
                controller: 'CombateJogCtrl'
            });
        };        

        $scope.openTesteCombateJog = function() {


            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent3.html',
                controller: 'AventuraCtrl'
            });
        };


        $scope.ok = function() {
            $modalInstance.close();
        };

        $scope.voltarAventuraJog = function() {
            $location.path('/aventuraJogador');
        };

        $scope.rolarDadosCombate = function(min, max) {
            $scope.pathFBJog = ref.child("storypower").child(campanhaID).child(fichaID).child("testes").child("testedado");
            $scope.resultDados = Math.floor(Math.random() * (max - min + 1)) + min;
            $scope.pathFBJog.set({
                resultDados: $scope.resultDados
            });
        };

        $scope.jogarCartasCombate = function() {

            var myArray = ['Ás de', 'Dois de ', 'Três de ', 'Quatro de', 'Cinco de', 'Seis de', 'Sete de', 'Oito de', 'Nove de', 'Dez de', 'Valete de', 'Dama de', 'Rei de'];
            var myArray2 = ['Paus', 'Ouros', 'Copas', 'Espadas'];
            var rand = myArray[Math.floor(Math.random() * myArray.length)];
            var rand1 = myArray2[Math.floor(Math.random() * myArray2.length)];
            $scope.pathFBJog = ref.child("storypower").child(campanhaID).child(fichaID).child("testes").child("testecartas");
            $scope.resultCartas = rand + " " + rand1;              
            $scope.pathFBJog.set({
                resultCartas: $scope.resultCartas
            });

        };

        $scope.jogarMoedaCombate = function(){

            Array.prototype.sample = function(){
              return this[Math.floor(Math.random()*this.length)];
            };

            $scope.resultMoeda = ["cara", "coroa"].sample() 
            console.log($scope.resultMoeda);
            $scope.pathFBJog = ref.child("storypower").child(campanhaID).child(fichaID).child("testes").child("testemoeda");
            $scope.pathFBJog.set({
                resultMoeda: $scope.resultMoeda
            });


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
                    $rootScope.dataAventura = dataAventura;
                    $location.path('/aventuraJogador');

                })
                .error(function(data, status, headers, config) {


                });
        }
        var aventuraID = $localstorage.getObject('dataCampanha').dataCampanha[0][0].aventuraID;
         $scope.voltarAventuraJog = function(aventuraID){

            var newInfoReq = {
                method: 'POST',
                url: restService.restUrl + '/getaventuraquery',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {"aventuraID" : "avent1"}
                        
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

    });