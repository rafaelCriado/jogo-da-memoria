class MemoryGame {
  cards = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  state = {
    cards: [],
    timeForStart: 5000,
    buttons: null,
    cardSelect: null,
    attempts: 0,
    rightAttempts: 0,
    remainingPairs: this.cards.length,
    foundPair: [],
    time: {
      id: "",
      seconds: 0
    }
  };

  constructor() {
    this.createDeck();
    this.printDeck();
    this.hideDeck();
  }

  //Cria relogio
  startTime = () => {
    this.state.time.id = setInterval(() => {
      this.setTime(++this.state.time.seconds);
    }, 1000);
  };

  setTime = seconds => {
    document.getElementById("time").textContent = seconds;
  };

  //Cria uma carta do baralho
  createCard = (value, id) => {
    let elementCard = document.createElement("button");
    elementCard.textContent = value;
    elementCard.id = id;

    let cards = document.getElementById("cards");

    cards.appendChild(elementCard);
  };

  //Gera um novo baralho para o jogo
  createDeck = () => {
    this.state.cards = [...this.cards, ...this.cards];
    this.state.cards = this.shuffleArray(this.state.cards);
  };

  //Imprime o baralho na tela
  printDeck = () => {
    this.state.cards.forEach((card, index) => {
      this.createCard(card, index);
    });
  };

  //Bagunça o baralho
  shuffleArray = array => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  //Esconde o baralho
  hideDeck = () => {
    setTimeout(() => {
      this.state.buttons = document.querySelectorAll("#cards>button");
      this.state.buttons.forEach(bt => {
        bt.textContent = "*";
      });
      this.startTime();
      this.eventCards();
    }, this.state.timeForStart);
  };

  eventCards = () => {
    this.state.buttons.forEach(bt => {
      bt.addEventListener("click", () => {
        this.testPair(bt.id);
      });
    });
  };

  isFound = card => {
    let response = false;
    this.state.foundPair.forEach(c => {
      if (c === card) {
        response = true;
      }
    });
    return response;
  };

  testPair = position => {
    let positionCardSelect = this.state.cardSelect;
    this.showCard(position);

    //Caso clicar em um que ja tenha sido encontrado sai da função
    if (this.isFound(this.card(position))) return;

    //Verificar se cardSelect está vazio
    if (positionCardSelect === null) {
      this.state.cardSelect = position;
    } else {
      this.addAttempts();

      //Verifica se cardSelect é igual a carta selecionada
      if (
        this.card(positionCardSelect) === this.card(position) &&
        positionCardSelect !== position
      ) {
        alert(`Você achou o número ${this.card(positionCardSelect)}`);
        this.state.foundPair.push(this.card(positionCardSelect));
        this.addRightAttempts();
        this.addRemainningPairs();
      } else {
        alert("Tente novamente!");
        this.hideCard([positionCardSelect, position]);
      }

      this.state.cardSelect = null;
    }
    console.log(this.state);
  };

  hideCard = position => {
    if (Array.isArray(position)) {
      position.forEach(p => {
        this.state.buttons[p].textContent = "*";
      });
    } else {
      this.state.buttons[position].textContent = "*";
    }
  };

  showCard = position => {
    this.state.buttons[position].textContent = this.state.cards[position];
  };

  card = position => this.state.cards[position];

  addAttempts = () => {
    this.state.attempts++;
    document.getElementById("attempts").innerHTML = this.state.attempts;
  };

  addRightAttempts = () => {
    this.state.rightAttempts++;
    document.getElementById(
      "rightAttempts"
    ).innerHTML = this.state.rightAttempts;
  };

  addRemainningPairs = () => {
    this.state.remainingPairs--;
    document.getElementById(
      "remainingPairs"
    ).innerHTML = this.state.remainingPairs;

    if (this.state.remainingPairs === 0) {
      this.congratulations();
    }
  };

  congratulations = () => {
    alert(`Parabéns você conseguiu em ${this.state.attempts} tentativas`);
  };
}

const game = new MemoryGame();
