precision highp float;

// Input from vertex shader
in vec2 vUv;

// Output color
out vec4 outColor;

// Uniforms
uniform float time;

void main() {
    vec3 color = vec3(0.37, 0.51, 0.84);
    outColor = vec4(color , 1.0);
}