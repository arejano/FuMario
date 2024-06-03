import Game, { Entity, GameState, PositionComponent, PositionData, World } from "./game";

export default class Fumario implements Game {

	game_state: GameState = GameState.Menu;
	world: World = new World()

	init(): void {
		const player = new Entity();
		const position_component = new PositionComponent(0,0)

		player.add_component<PositionData>(position_component);

		this.world.add_entity(player);

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
