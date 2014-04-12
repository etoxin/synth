function SynthCtrl($scope, $timeout) {

    $scope.running = false;
    $scope.frequency = 440;
    $scope.detune = 0.5;
    $scope.type = "triangle";
    $scope.amountOfoscillators = 3;
    $scope.oscillators = [];
    $scope.gain = -0.7;
    $scope.speak = "Push me. and then just touch me. Till I can get my. Satisfaction.";
    $scope.speechSynth = new SpeechSynthesisUtterance($scope.speak);
    $scope.tempo = 2000;
    $scope.stepper = 0;

    $scope.start = function() {
        $scope.oscillators.forEach(function(osc){
            osc.start();
            $scope.gain = -0.7;
            $scope.changeGain();
        })
        $scope.running = true;
    };
    $scope.stop = function() {
        $scope.gain = -0.7;
        $scope.changeGain();
    };


    $scope.changeFreq = function () {
        $scope.oscillators.forEach(function(osc, index){
            osc.frequency.value = $scope.frequency - ($scope.detune * index);
        })
    }

    $scope.changeNote = function (freq) {
        $scope.frequency = freq;
        $scope.oscillators.forEach(function(osc, index){
            osc.frequency.value = freq - ($scope.detune * index);
        })
    }

    $scope.changeType = function (type) {
        $scope.type = type;
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

    // sequencer

    $scope.run = false;
    $scope.sequence = [
        {step: 1, freq: 600},
        {step: 2, freq: 500},
        {step: 3, freq: 60},
        {step: 4, freq: 200},
        {step: 4, freq: 200},
        {step: 4, freq: 100},
        {step: 4, freq: 200},
        {step: 4, freq: 5000},
        {step: 4, freq: 4000},
        {step: 4, freq: 2000},
        {step: 4, freq: 5000},
        {step: 4, freq: 50},
        {step: 4, freq: 300},
        {step: 4, freq: 800},
        {step: 4, freq: 600},
        {step: 4, freq: 5000}
    ]


    $scope.nextStep = function (step) {
        if ($scope.stepper >= $scope.sequence.length) {
            $scope.stepper = 0;
            step = 0;
        }
        $scope.frequency = $scope.sequence[step].freq;
        $scope.changeFreq();

        if($scope.run === true){
            $scope.stepper++;



            console.log($scope.stepper);
            window.setTimeout(function() {
                $scope.nextStep($scope.stepper);
            }, $scope.tempo);
        }
    }

    $scope.play = function () {
        $scope.run = true;
        $timeout($scope.nextStep(0));
    }

    // console.log($scope);
}
