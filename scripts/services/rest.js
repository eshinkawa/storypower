

angular.module('yangApp')

.service('restService', function(){

	this.restUrl =  'http:///0.0.0.0:8080';
    //this.restUrl =  'http://192.168.1.34:8080';
    //this.restUrl =  'http://10.167.71.231:8080';
    //this.restUrl =  'http://192.168.1.42:8080';    
     

/*
        $scope.restConn = function(newInfoReq) {


            var newInfoReq = {
                method: 'POST',
                url: 'http://10.211.55.3:8080/getcampanha/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "campanhaID": campanhaID,
                }
            };

            $http(newInfoReq)

            .success(function(dataCampanha) {

                    $rootScope.dataCampanha = dataCampanha;
                    $scope.fichas = dataCampanha[1][0];
                    $scope.mestre = dataCampanha[2].usrID;
                    $location.path('/campanha');
                    

                })
                .error(function(data, status, headers, config) {


                });

        };

*/
});