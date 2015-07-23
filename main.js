function App() {
    'use strict';
    var self = this;
    
    var gameTimer;
    var currentTime;
    var $time = $('#time');
    var $start = $('#btnStart');
    var $reset = $('#btnReset');
    var $word = $('#word');
    var $score = $('#score');
    
    self.resetTimer = function() {
        currentTime = new Date() - 0;
        self.timeLimit = 60000;
    }
    
    self.formatTime = function(time) {
        var sec = time / 1000;
        var p1 = Math.floor(sec / 60);
        var p2 = Math.floor(sec % 60);
        p1 = (p1 < 10 ? '0' : '') + p1;
        p2 = (p2 < 10 ? '0' : '') + p2;
        return p1 + ' : ' + p2;
    };
    
    self.generateWord = function() {
        // prevent making the same word
        var newWord, currWord = self.currentWord;
        while(!newWord || newWord == currWord)
            newWord = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        self.currentWord = newWord;
    };
    
    self.updateView = function() {
        $word.html(self.currentWord);
        $score.html(self.score);
    };
    
    self.startGame = function() {
        $start.attr('disabled', 'disabled');
        $reset.removeAttr('disabled');
        self.resetTimer();
        gameTimer = setInterval(function() {
            var diff = self.timeLimit - (new Date() - currentTime);
            $time.html(self.formatTime(diff));
            if (diff <= 0) self.endGame();
        }, 500);
        self.score = 0;
        self.generateWord();
        self.updateView();
    };
    
    self.endGame = function() {
        $reset.attr('disabled', 'disabled');
        $start.removeAttr('disabled');
        self.currentWord = null;
        $time.html(self.formatTime(0));
        self.updateView();
        clearInterval(gameTimer);
        gameTimer = null;
    };
    
    $start.click(self.startGame);
    $reset.click(self.endGame);
    
    $('body').keypress(function(evt) {
        var key = String.fromCharCode(evt.which).toUpperCase();
        // let it delegate
        if (!gameTimer || key < 'A' || key > 'Z') return true;
        if (key == self.currentWord) {
            self.score += 50;
            self.generateWord();
        } else {
            self.score -= 10;   
        }
        self.updateView();
    });

};

App.prototype.timeLimit = null;
App.prototype.score = null;
App.prototype.currentWord = null;

var app = new App();
