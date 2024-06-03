export enum GameState {
	Menu,
	Running,
	Paused,
	GameOver,
	Quit
}

export default interface Game {
	world: World;
	game_state: GameState;

	init(): void;

	update(): void;

	exit(): void;

}

export class World implements ECS {
	world_status = WorldStatus.Paused;

	systems: Array<System> = []
	entities: Array<Entity> = []

	add_entity(entity: Entity): void {
		//Registrar Entidade

		this.entities.push(entity)
	}

	add_system(system: System): void {
		//Registrar Systema
		//Validar Se ele ja existe
		//Se ja existe registrar na entidades
		this.systems.push(system);
	}

	update() {
		this.systems.forEach((system: System) => {
			system.update(this);
		})
	}
}

export enum WorldStatus {
	Running,
	Paused,
}

export interface ECS {
	world_status: WorldStatus;
	systems: Array<System>;
	entities: Array<Entity>;

}

export interface System {
		update(world:ECS): void;
}

export class Entity {
	components: Array<Component<any>> = [];

	add_component<T>(component: Component<T>): void {
		this.components.push(component)
	}
}

export interface Component<T> {
	data: T
}

export interface PositionData { x: number, y: number }
export class PositionComponent implements Component<PositionData> {
	data: PositionData;

	constructor(x: number, y: number) {
		this.data = { x, y }
	}
}
