import Game, { Entity, GameState, PositionComponent, PositionData, System, World } from "./game";
import { MoveSystemKeyboard } from "./systems/keyboard_system";

export default class Fumario implements Game {

	game_state: GameState = GameState.Menu;
	world: World = new World()

	init(): void {
		const player = new Entity();
		const enemy = new Entity();

		const position_component = new PositionComponent(0,0)
		const position_component2 = new PositionComponent(10,10);

		enemy.add_component<PositionData>(position_component);
		player.add_component<PositionData>(position_component);
		player.add_component<PositionData>(position_component2)

		this.world.add_entity(player);
		this.world.add_entity(enemy);

		const moveSystem = new MoveSystemKeyboard();

		this.world.add_system(moveSystem);

		this.world.start();

	}

	stop(){
		this.world.stop();
	}

	update(): void {
		switch (this.game_state) {
			case GameState.Menu:
				break;
			case GameState.Running:
				this.world.update();
				// Add Enemy?
				// Add Bonus?
				break;
			case GameState.Paused:
				this.world.pause()
				break;
			case GameState.GameOver:
				//Save States
				//Restart
				break;
			case GameState.Quit:
				//Save States
				//Destroy World??
				break;
		}
	}

	spawn_enemy(){  }

	exit(): void {
		throw new Error("Method not implemented.");
	}

}
