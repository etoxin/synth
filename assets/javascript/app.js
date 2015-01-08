'use strict';
angular.module('synthApp', [])
    .controller('SynthController', ['$scope','$timeout', function($scope, $timeout) {
        $scope.running = false;
        $scope.frequency = 50;
        $scope.detune = 0.5;
        $scope.type = "sawtooth";
        $scope.amountOfoscillators = 3;
        $scope.oscillators = [];
        $scope.gain = -0.7;
        $scope.speak = "Push me. and then just touch me. Till I can get my. Satisfaction.";
        // $scope.speechSynth = new SpeechSynthesisUtterance($scope.speak);
        $scope.tempo = 160;
        $scope.stepper = 0;

        $scope.start = function() {
            $scope.oscillators.forEach(function(osc){
                osc.start();
                $scope.gain = -0.7;
                $scope.changeGain();
            });
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
        };

        $scope.changeNote = function (freq) {
            $scope.frequency = freq;
            $scope.oscillators.forEach(function(osc, index){
                osc.frequency.value = freq - ($scope.detune * index);
            })
        };

        $scope.changeType = function (type) {
            $scope.type = type;
            $scope.oscillators.forEach(function(osc, index){
                $scope.oscillators[index].type = type;
            });

            $scope.oscillators[osc].type = type;
        };

        // that's the prefixing sorted.
        // window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var synth = new webkitAudioContext();
        for (var i = 0; i < $scope.amountOfoscillators; i++) {
            $scope.oscillators[i] = synth.createOscillator();
            $scope.oscillators[i].frequency.value = $scope.frequency - ($scope.detune * i);
            $scope.oscillators[i].type = "sawtooth";
            $scope.oscillators[i].connect(synth.destination);
        }

        // Gain
        var gainNode = synth.createGain();
        for (var i = 0; i < $scope.amountOfoscillators; i++) {
            $scope.oscillators[i].connect(gainNode);
        }
        gainNode.connect(synth.destination);

        $scope.changeGain = function () {
            gainNode.gain.value = $scope.gain;
        };


        // Speech
        //$scope.talk = function () {
        //    // $scope.speechSynth.text = $scope.speak;
        //    // speechSynthesis.speak($scope.speechSynth);
        //};

        // sequencer

        $scope.run = false;
        $scope.sequence = [
            {step: 1, freq: 262},
            {step: 2, freq: 294},
            {step: 3, freq: 262},
            {step: 4, freq: 294},

            {step: 5, freq: 330},
            {step: 6, freq: 349},
            {step: 7, freq: 330},
            {step: 8, freq: 349},

            {step: 9, freq: 392},
            {step: 10, freq: 440},
            {step: 11, freq: 392},
            {step: 12, freq: 349},

            {step: 13, freq: 330},
            {step: 14, freq: 330},
            {step: 15, freq: 330},
            {step: 16, freq: 330}
        ];


        $scope.nextStep = function (step) {
            if ($scope.stepper >= $scope.sequence.length) {
                $scope.stepper = 0;
                step = 0;
            }
            $scope.frequency = $scope.sequence[step].freq;
            $scope.changeFreq();

            if($scope.run === true){
                $scope.stepper++;

                window.setTimeout(function() {
                    $scope.nextStep($scope.stepper);
                },  (60000  / $scope.tempo) );
            }
        };

        $scope.play = function () {
            $scope.run = true;
            $timeout($scope.nextStep(0));
        };

// Accelerometer Data
        window.addEventListener('devicemotion', function(e) {
            var x = e.accelerationIncludingGravity.x;
            var y = e.accelerationIncludingGravity.y;
            var z = e.accelerationIncludingGravity.z;
            console.log(e);
            $scope.frequency = x * 30;
            $scope.changeFreq();
        });

    }]);






