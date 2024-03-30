attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;
uniform sampler2D waterMap;
varying vec2 vTextureCoord;

void main() {
	vTextureCoord = aTextureCoord;
	vec3 offset = vec3(0.0, 0.05, 0.0) * texture2D(waterMap, vTextureCoord + vec2( timeFactor, timeFactor)).r;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

}

