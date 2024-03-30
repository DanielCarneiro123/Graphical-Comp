attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {
    vec3 offset = vec3(sin(timeFactor), 0.0, 0.0);

	vec4 vertex = vec4(aVertexPosition+aVertexNormal * normScale * 0.1 + offset, 1.0);

	gl_Position = uPMatrix * uMVMatrix * vertex;

	vTextureCoord = aTextureCoord;
}

