function SynthCtrl($scope) {
    
    $scope.frequency = 440;
    $scope.detune = 5;
    $scope.type = "triangle";
    $scope.amountOfoscillators = 3;
    $scope.oscillators = [];

    $scope.start = function() {
        $scope.oscillators.forEach(function(osc){
            osc.start();
        })
    };
    $scope.stop = function() {
        $scope.oscillators.forEach(function(osc){
            osc.stop();
        })
    };


    $scope.changeFreq = function () {
        $scope.oscillators.forEach(function(osc, index){
            osc.frequency.value = $scope.frequency - ($scope.detune * index);
        })
    }

    $scope.changeNote = function (freq) {
        $scope.oscillators.forEach(function(osc, index){
            osc.frequency.value = freq - ($scope.detune * index);
        })
    }

    $scope.changeType = function (type) {
        $scope.oscillators.forEach(function(osc, index){
            $scope.oscillators[index].type = type;
        })

        $scope.oscillators[osc].type = type;
    }


    var synth = new webkitAudioContext();
    for (var i = 0; i < $scope.amountOfoscillators; i++) {
        $scope.oscillators[i] = synth.createOscillator();
        $scope.oscillators[i].frequency.value = $scope.frequency - ($scope.detune * i);
        $scope.oscillators[i].type = "triangle";
        $scope.oscillators[i].connect(synth.destination);
    }

    // Gain
    var g = synth.createGainNode();
    g.gain.value = 1;

    console.log($scope);
}