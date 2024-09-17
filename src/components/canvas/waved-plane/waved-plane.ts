import * as THREE from "three"
import { IApp } from "@/types/interfaces"
// import vertex from "@/shaders/vertex.glsl"
// import fragment from "@/shaders/fragment.glsl"

export class WavedPlane {
	private plane!: THREE.Mesh
	private clock!: THREE.Clock
	private originalPositions!: Float32Array
	constructor(private app: IApp) {
		this.app = app
		this.clock = new THREE.Clock()

		this.setup()
	}

	private setup(): void {
		const geometry = new THREE.PlaneGeometry(2, 2, 300, 300).rotateX(-Math.PI / 2)
		const matcapTexture = new THREE.TextureLoader().load(
			"matcaps/blue-matcap.png"
		)
		matcapTexture.colorSpace = THREE.SRGBColorSpace
		const material = new THREE.MeshMatcapMaterial({
			matcap: matcapTexture,
			side: THREE.DoubleSide,
		})

		this.originalPositions = geometry.attributes.position.array as Float32Array
		this.plane = new THREE.Mesh(geometry, material)

		this.app.scene.add(this.plane)
	}

	public update(): void {
		let positions = this.plane.geometry.attributes.position.array as Float32Array
		let time = this.clock.getElapsedTime()

		for (let i = 0; i < positions.length; i += 3) {
			let x = this.originalPositions[i]
			let y = this.originalPositions[i + 1]

			const waveHeight = 0.0002
			const waveFrequency = 0.0001
			const waveSpeed = 0.5
			const waveDistortion = 0.1

			positions[i] = x
			positions[i + 1] = y

			let wave = Math.sin(time * waveSpeed + i * waveFrequency) * waveHeight
			positions[i + 1] += wave
			positions[i] += Math.cos(time * waveSpeed + i * waveFrequency) * waveHeight

			positions[i + 2] += wave * waveDistortion * Math.sin(time * waveSpeed)
			positions[i] += wave * waveDistortion * Math.cos(time * waveSpeed)
		}

		this.plane.geometry.attributes.position.needsUpdate = true
		this.plane.geometry.computeVertexNormals()
	}
}
