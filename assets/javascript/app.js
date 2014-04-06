function SynthCtrl($scope) {
    
    $scope.frequency = 440

    $scope.start = function() {
        o.start(0);
    };
    $scope.stop = function() {
        o.stop(0);
    };


    $scope.changeFreq = function () {
        o.frequency.value = $scope.frequency;
    }

    $scope.changeType = function (type) {
        o.type = type;
    }


    var synth = new webkitAudioContext();
    var o = synth.createOscillator();
    o.frequency.value = $scope.frequency;
    o.type = "triangle";
    o.connect(synth.destination);

    console.log($scope);
}