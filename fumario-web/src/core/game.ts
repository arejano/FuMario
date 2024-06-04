export enum GameState {
	Menu,
	Running,
	Paused,
	GameOver,
	Quit
}

export enum GameEventType {
	Key,
}

export interface GameEvent {
	event_type: GameEventType,
	value: any,
}

export default interface Game {
	events: Array<GameEvent>;
	world: World;
	game_state: GameState;
	init(): void;
	update(): void;
	exit(): void;
}

export class World implements ECS {
	//game_loop
	private lastUpdateTime: number;
	private running: boolean;

	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;

	world_status = WorldStatus.Paused;
	systems: Map<number, System> = new Map();
	entities: Map<number, Entity> = new Map();

	constructor() {
		this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
		this.context = this.canvas.getContext("2d");

		this.lastUpdateTime = 0;
		this.running = false;
	}

	stop() {
		this.running = false;
	}

	public start() {
		this.running = true;
		this.lastUpdateTime = performance.now();
		requestAnimationFrame(this.gameLoop.bind(this));
	}

	private gameLoop(currentTime: number) {
		if (!this.running) return;

		const deltaTime = currentTime - this.lastUpdateTime;
		this.lastUpdateTime = currentTime;

		this.update(deltaTime);
		this.render();

		requestAnimationFrame(this.gameLoop.bind(this));
	}

	add_entity(entity: Entity): void {
		//Registrar Entidade

		this.entities.set(entity.id, entity)
	}

	add_system(system: System): void {
		//Registrar System
		//Validar Se ele ja existe
		//Se ja existe registrar na entidades
		this.systems.set(system.id, system);
	}

	update(dt: number) {
		console.log(dt)

		const systems : Array<System> = Array.from(this.systems.values());
		console.log(systems)

		systems.forEach((system: System) => {
			const entity = this.entities.get(0);
			system.update(entity);
		})
	}

	private render() {
		// Adicione aqui a lógica de renderização do jogo

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Desenhe a entidade no canvas
		this.context.fillStyle = "red";
		this.context.fillRect(0, 0, 32, 64); // Desenha um quadrado representando a entidade	}
	}
}

export enum WorldStatus {
	Running,
	Paused,
}

export interface ECS {
	world_status: WorldStatus;
	systems: Map<number, System>;
	entities: Map<number, Entity>;
}

export class System {
	static id: number = 0;

	constructor() {
		this.id = System.id++;
	}

	update(entity: Entity) {
		console.log(`entidade`,entity)
	}
}

export class Entity {
	components: Map<number, Component<any>> = new Map();

	static id: number = 0;

	constructor() {
		this.id = Entity.id++;
	}


	add_component<T>(component: Component<T>): void {
		this.components.set(component.id, component)
	}
}

class MoveSystem implements System {
	update() {
	}
}

export class Component<T> {
	static id: number = 0;
	data: T

	constructor() {
		this.id = Component.id++;
	}

}

export interface PositionData { x: number, y: number }
export class PositionComponent implements Component<PositionData> {
	data: PositionData;

	constructor(x: number, y: number) {
		this.id = Component.id++;
		this.data = { x, y }
	}
}
