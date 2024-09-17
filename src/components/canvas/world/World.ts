import { IApp } from "@/types/interfaces"
import { Sphere } from "../sphere/Sphere"
import { WavedPlane } from "../waved-plane/waved-plane"

export default class World {
	private box!: Sphere
	public app: IApp
	private plane!: WavedPlane

	constructor(app: IApp) {
		this.app = app

		this.setup()
	}
	private setup(): void {
		// initialize components once resources are loaded
		this.box = new Sphere(this.app)
		this.plane = new WavedPlane(this.app)
	}
	public update(): void {
		this.box.update()
		this.plane.update()
	}
}
