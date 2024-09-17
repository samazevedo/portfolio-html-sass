import * as THREE from "three"
import { IApp } from "@/types/interfaces"
// import vertex from "@/shaders/vertex.glsl"
// import fragment from "@/shaders/fragment.glsl"

export class Sphere {
	private ball!: THREE.Mesh
	private clock!: THREE.Clock
	constructor(private app: IApp) {
		this.app = app
		this.clock = new THREE.Clock()

		this.setup()
	}

	private setup(): void {
		const geometry = new THREE.PlaneGeometry(1, 1)
		const material = new THREE.ShaderMaterial({
			uniforms: {
				uProgress: { value: 0 },
				uTexture1: { value: new THREE.TextureLoader().load("images/t1.jpg") },
				uTexture2: { value: new THREE.TextureLoader().load("images/t2.jpg") },
			},
			vertexShader: `
				out vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				uniform sampler2D uTexture1;
				uniform sampler2D uTexture2;
				uniform float uProgress;
				in vec2 vUv;
				float rand(vec2 n){
					return fract(sin(dot(n, vec2(12.9898, 78.233))) * 43758.5453);
				}
				float noise(vec2 p){
					vec2 ip = floor(p);
					vec2 u = fract(p);
					u = u*u*(3.0-2.0*u);

					float res = mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
					return res*res;
				}
				void main() {
					float intensity = sin(3.1415926 * uProgress);
					float distortion = noise(vUv * 30.0)* 1.0 * intensity;
					vec2 distortedPosition = fract(
						vec2(intensity * 0.5, 0.0) +
						vec2(vUv.x + distortion , vUv.y + distortion));
					vec4 color1 = texture(uTexture1, distortedPosition);
					vec4 color2 = texture(uTexture2, distortedPosition);
					gl_FragColor = mix(color1, color2, uProgress);
				}
			`,
		})

		this.ball = new THREE.Mesh(geometry, material)

		this.app.scene.add(this.ball)
	}

	public update(): void {
		let time = this.clock.getElapsedTime()

		let nprogress = Math.sin(time * 0.5) * 0.5 + 0.5

		;(this.ball.material as THREE.ShaderMaterial).uniforms.uProgress.value =
			nprogress
	}
}
