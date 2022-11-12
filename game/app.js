function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHP: 100,
      monsterHP: 100,
      roundCount: 0,
      winner: null,
      specialAttackCount: 0,
      isDisable: "false",
      logMessage: [],
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHP < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHP + "%" };
    },
    playerBarStyle() {
      if (this.playerHP < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHP + "%" };
    },
    specialAttackDisable() {
      return this.isDisable === "true";
    },
  },

  watch: {
    playerHP(value) {
      if (value <= 0 && this.monsterHP <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHP(value) {
      if (value <= 0 && this.playerHP <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
    specialAttackCount(value) {
      if (value % 3 !== 0) {
        return (this.isDisable = "true");
      } else {
        return (this.isDisable = "false");
      }
    },
  },

  methods: {
    attackMonster() {
      this.roundCount++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHP = this.monsterHP - attackValue;
      this.battleLogBox('player','attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 18);
      this.playerHP = this.playerHP - attackValue;
      if (this.isDisable === "true") {
        this.specialAttackCount++;
      }
      this.battleLogBox('monster','attack', attackValue);
    },
    specialAttackMonster() {
      this.roundCount++;
      this.specialAttackCount++;
      const attackValue = getRandomValue(20, 30);
      this.monsterHP -= attackValue;
      this.battleLogBox('player','special-attack', attackValue);
      this.attackPlayer();
     
    },
    healPlayer() {
      this.roundCount++;
      const healValue = getRandomValue(10, 20);
      if (this.playerHP + healValue > 100) {
        this.playerHP = 100;
      } else {
        this.playerHP += healValue;
      }
      this.battleLogBox('player','heal', healValue);
      this.attackPlayer();
    },
    startGame() {
      this.playerHP = 100;
      this.monsterHP = 100;
      this.roundCount = 0;
      this.winner = null;
      this.specialAttackCount = 0;
      this.logMessage = [];
    },
    surrender(){
        this.winner = 'monster';
    },
    battleLogBox(who,what,value){
        this.logMessage.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value,
        });
    }
  },
});
app.mount("#game");
