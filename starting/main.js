const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._userLine = 0;
    this._userColumn = 0;
    this._field = [];
    for(let i=0; i<width; i+=1) {
      let aux = [];
      for(let j=0; j<height; j+=1) {
        aux.push('');
      }
      this._field.push(aux);
    }
  }

  get field() {
    return this._field;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get userLine() {
    return this._userLine;
  }
  get userColumn() {
    return this._userColumn;
  }

  set field(newField) {
    this._field = newField;
  }
  set width(newWidth) {
    this._width = newWidth;
  }
  set height(newHeight) {
    this._height = newHeight;
  }
  set userLine(newUserLine) {
    this._userLine = newUserLine;
  }
  set userColumn(newUserColumn) {
    this._userColumn = newUserColumn;
  }

  print() {
    for(let i=0; i<this.field.length; i+=1) {
      console.log(this.field[i].join(''));
    }
  }

  generateField(height, width, percentage) {
    const symbols = [hole, fieldCharacter];
    this.field[0][0] = pathCharacter;
    let hatLine = 0;
    let hatColumn = 0;
    while(!hatLine || !hatColumn) {
      hatLine = Math.floor(Math.random()*this.width);
      hatColumn = Math.floor(Math.random()*this.height);
    }
    this.field[hatLine][hatColumn] = hat;
    let numberOfHoles = 0;
    for(let i=0; i<this.width; i+=1) {
      for(let j=0; j<this.height; j+=1) {
        if(this.field[i][j]==='') {
          const element = symbols[Math.floor(Math.random()*2)];
          if(element === hole) {
            numberOfHoles += 1;
            if(numberOfHoles/(height*width) <= percentage) {
              this.field[i][j] = hole;
            } else {
              this.field[i][j] = fieldCharacter;
            }
          } else {
            this.field[i][j] = fieldCharacter;
          }
        }
      }
    }
  }

  move(direction) {
    switch(direction) {
      case 'r':
        if(this.userColumn<this.width-1) {
          this.userColumn+=1;
          break;
        } else {
          console.log("You're not allowed to exit the maze!");
        }
        break;
      case 'l':
        if(this.userColumn>0) {
          this.userColumn-=1;
          break;
        } else {
          console.log("You're not allowed to exit the maze!");
        }
        break;
      case 'u':
        if(this.userLine>0) {
          this.userLine-=1;
          break;
        } else {
          console.log("You're not allowed to exit the maze!");
        }
        break;
      case 'd':
        if(this.userLine<this.height-1) {
          this.userLine+=1;
          break;
        } else {
          console.log("You're not allowed to exit the maze!");
        }
        break;
      default:
        console.log("Please enter a valid direction!")
    }
    if(this.field[this.userLine][this.userColumn] === fieldCharacter) {
      this.field[this.userLine][this.userColumn] = pathCharacter;
    }
  }

  winOrLose() {
    if(this.field[this.userLine][this.userColumn] === hat) {
      console.log("Congrats, man!! You won!");
      return 0;
    } else if(this.field[this.userLine][this.userColumn] === hole) {
      console.log("Damn, that's too bad! You lost! :(");
      return 0;
    } else {
      return 1;
    }
  }

  game() {
    console.log("Welcome to Find Your Hat! In this game, you must find the hat that was lost on the field below. Your path will be marked using *. O represents a hole, and the hat is marked with ^. Type r for right, l for left, u for up and d for down. Type X to exit the game. Have fun!");
    this.generateField(this.width, this.height, 0.3);
    this.print();
    while(this.winOrLose()) {
      const direction = prompt("Which way?");
      if(direction === 'X') {
        return 0;
      }
      this.move(direction);
      this.print();
    }
  }
}

const myField = new Field(10, 10);
myField.game();