function SynthCtrl($scope) {

    $scope.running = false;
    $scope.frequency = 440;
    $scope.detune = 5;
    $scope.type = "triangle";
    $scope.amountOfoscillators = 3;
    $scope.oscillators = [];
    $scope.gain = 1.0;
    $scope.speak = "Baby, i'm wasted. All I wanna do is drive home to you.";
    $scope.speechSynth = new SpeechSynthesisUtterance($scope.speak);

    $scope.start = function() {
        $scope.oscillators.forEach(function(osc){
            osc.start();
        })
        $scope.running = true;
    };
    $scope.stop = function() {
        $scope.gain = -1;
        $scope.changeGain();
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

    // that's the prefixing sorted.
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var synth = new webkitAudioContext();
    for (var i = 0; i < $scope.amountOfoscillators; i++) {
        $scope.oscillators[i] = synth.createOscillator();
        $scope.oscillators[i].frequency.value = $scope.frequency - ($scope.detune * i);
        $scope.oscillators[i].type = "triangle";
        $scope.oscillators[i].connect(synth.destination);
    }

    // Gain
    var gainNode = synth.createGainNode();
    for (var i = 0; i < $scope.amountOfoscillators; i++) {
        $scope.oscillators[i].connect(gainNode);
    }
    gainNode.connect(synth.destination);

    $scope.changeGain = function () {
        gainNode.gain.value = $scope.gain;
    }


    // Speech
    $scope.talk = function () {
        $scope.speechSynth.text = $scope.speak;
        speechSynthesis.speak($scope.speechSynth);
    }

    console.log($scope);
}
