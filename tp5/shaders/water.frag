#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D waterTex;
uniform sampler2D waterMap;

uniform float timeFactor;


void main() {
    vec2 offset = vec2(timeFactor*0.005, timeFactor*0.005);

	vec4 color = texture2D(waterTex, vTextureCoord + offset);
	vec4 filter = texture2D(waterMap, vec2(0.0,0.1) + vTextureCoord);

	gl_FragColor = color;
}