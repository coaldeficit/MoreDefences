#define HIGHP

uniform sampler2D u_texture;

uniform vec2 u_campos;
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_texCoords;

const float mscl = 280;
const float mth = 80;
const float patternScale = 0.1;

void main(){

  vec2 c = v_texCoords;
  vec2 v = vec2(1.0/u_resolution.x, 1.0/u_resolution.y);
  vec2 coords = vec2(c.x / v.x + u_campos.x, c.y / v.y + u_campos.y);

  float stime = u_time / 5.0;

  vec4 sampled = texture2D(u_texture, c + vec2(sin(stime/3 + coords.y/2) * v.x, 0.0));
  vec3 color = sampled.rgb * vec3(1, 0.9, 1);

  float tester = mod((coords.x - coords.y) +
    (sin((stime/21.2 + coords.x)*patternScale) * 48) +
    (sin((stime/13.2 + coords.y + (coords.x/3))*patternScale) * 92) +
    (sin((stime/36.4 + coords.x+coords.y)*patternScale) * 124) -
    (sin((stime/6.7 + coords.y)*patternScale) * 84) +
    (sin((stime/53.2 + coords.y/(5+(sin(stime/123.2)*0.05)) + coords.x/(5+(sin(stime/116.4)*0.05)))*patternScale) * 400) + 
    (sin(stime/3.16 + coords.x+coords.y) * 1.5) +
    (sin(stime/2.32 + coords.x) * 1.5) + 
    (sin(stime/1.86 + (coords.y/2)) * 1.5)
  , mscl);

  if(tester < mth){
    color *= 1.2;
  }

  gl_FragColor = vec4(color.rgb, min(sampled.a * 100.0, 1.0));
}