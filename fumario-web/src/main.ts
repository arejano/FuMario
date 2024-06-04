import Fumario from "./core/fumario"

const game = new Fumario()
game.init();
console.log(game)
setTimeout(() => {
  
  game.stop();
}, 1000)