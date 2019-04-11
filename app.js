new Vue({
    el: '#app',
    data: {
        playerHealth: 25,
        monsterHealth: 25,
        gameIsRunning: false,
        turns: [],
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3,11);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits the monster for ' + damage,
            })
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10,21);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits the monster hard for ' + damage,
            })
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },
        heal: function() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }

            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals to ' + this.playerHealth,
            })

            this.monsterAttack();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        monsterAttack: function() {
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage,
            })
            this.checkWin();
        },
        calculateDamage: function(minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage), minDamage); // random number or if random < 3 take minDamage
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won. Do you want to play another game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost. Do you want to play another game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
    },
});