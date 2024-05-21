#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;
uniform float factor;
uniform float speedFactor;

varying vec2 vTextureCoord;

void main() {
   
    vec3 offset = vec3(0.0, 0.0, 0.75 * sin(0.5 * factor * speedFactor));
    vec3 offset2 = vec3(0.0, 0.0, 1.75 * sin(0.5 * factor * speedFactor));

    vec4 vertex = vec4(aVertexPosition, 1.0);

    if (aVertexPosition.y > 5.0) {
        vertex.xyz += aVertexNormal * normScale * 0.1 + offset;
    }
    if (aVertexPosition.y > 7.0) {
        vertex.xyz += aVertexNormal * normScale * 0.1 + offset2;

    }
   


	gl_Position = uPMatrix * uMVMatrix * vertex;

    vTextureCoord = aTextureCoord;
}
