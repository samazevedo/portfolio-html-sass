precision highp float;

// outputs to fragment shader
out vec2 vUv;

void main() {

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}