import * as THREE from "three"
import { IApp } from "@/types/interfaces"
import vertex from "@/shaders/vertex.glsl"
import fragment from "@/shaders/fragment.glsl"

export class Box {
	constructor(private app: IApp) {
		this.app = app

		this.setup()
	}

	private setup(): void {
		const geometry = new THREE.BoxGeometry(1, 1, 1)
		const material = new THREE.ShaderMaterial({
			vertexShader: vertex,
			fragmentShader: fragment,
			glslVersion: THREE.GLSL3,
			uniforms: {
				uTime: { value: 0 },
			},
		})

		this.app.scene.add(new THREE.Mesh(geometry, material))
	}

	public update(): void {}
}
