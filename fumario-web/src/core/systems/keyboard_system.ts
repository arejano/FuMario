import { Component, Entity, PositionData, System } from "../game";

export class MoveSystemKeyboard implements System {
	private keys: { [key: string]: boolean } = {};

	constructor() {
		window.addEventListener("keydown", this.keydown.bind(this));
		window.addEventListener("keyup", this.keyup.bind(this));
	}

	private keydown(event: KeyboardEvent) {
		this.keys[event.key] = true;
	}

	private keyup(event: KeyboardEvent) {
		this.keys[event.key] = false;
	}

	public update(entity: Entity, deltaTime: number) {
		const speed = 0.1 * deltaTime; // Pixels per millisecond

		const component: Component<PositionData> = entity.components.get(0);

		if (this.keys["ArrowUp"]) {
			component.data.y -= speed;
		}
		if (this.keys["ArrowDown"]) {
			component.data.y += speed;
		}
		if (this.keys["ArrowLeft"]) {
			component.data.x -= speed;
		}
		if (this.keys["ArrowRight"]) {
			component.data.x += speed;
		}
	}
}