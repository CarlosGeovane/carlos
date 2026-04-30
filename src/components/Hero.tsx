import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Hero.css";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    const PR = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(PR);
    renderer.setSize(W, H);
    renderer.autoClear = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 1000);
    camera.position.z = 3.1;

    const NOISE = `
      vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
      vec4 permute4(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
      float permutef(float x){return floor(mod(((x*34.0)+1.0)*x,289.0));}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
      float taylorInvSqrtF(float r){return 1.79284291400159-0.85373472095314*r;}
      float snoise(vec2 v){
        const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
        vec2 i=floor(v+dot(v,C.yy));
        vec2 x0=v-i+dot(i,C.xx);
        vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
        vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
        i=mod(i,289.0);
        vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
        vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
        m=m*m; m=m*m;
        vec3 x=2.*fract(p*C.www)-1.;
        vec3 h=abs(x)-.5;
        vec3 ox=floor(x+.5);
        vec3 a0=x-ox;
        m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
        vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
        return 130.*dot(m,g);
      }
      float snoise(vec3 v){
        const vec2 C=vec2(1./6.,1./3.);
        const vec4 D=vec4(0.,.5,1.,2.);
        vec3 i=floor(v+dot(v,C.yyy));
        vec3 x0=v-i+dot(i,C.xxx);
        vec3 g2=step(x0.yzx,x0.xyz);
        vec3 l=1.-g2;
        vec3 i1=min(g2.xyz,l.zxy);
        vec3 i2=max(g2.xyz,l.zxy);
        vec3 x1=x0-i1+C.xxx;
        vec3 x2=x0-i2+2.*C.xxx;
        vec3 x3=x0-1.+3.*C.xxx;
        i=mod(i,289.);
        vec4 p=permute4(permute4(permute4(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
        float n_=1./7.;
        vec3 ns=n_*D.wyz-D.xzx;
        vec4 j=p-49.*floor(p*ns.z*ns.z);
        vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.*x_);
        vec4 xx=x_*ns.x+ns.yyyy; vec4 yy=y_*ns.x+ns.yyyy;
        vec4 hh=1.-abs(xx)-abs(yy);
        vec4 b0=vec4(xx.xy,yy.xy); vec4 b1=vec4(xx.zw,yy.zw);
        vec4 s0=floor(b0)*2.+1.; vec4 s1=floor(b1)*2.+1.;
        vec4 sh=-step(hh,vec4(0.));
        vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
        vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
        vec3 p0=vec3(a0.xy,hh.x); vec3 p1=vec3(a0.zw,hh.y);
        vec3 p2=vec3(a1.xy,hh.z); vec3 p3=vec3(a1.zw,hh.w);
        vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
        p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
        vec4 m2=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
        m2=m2*m2;
        return 42.*dot(m2*m2,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
      }
    `;

    const SIM_SIZE = 128;
    const COUNT = SIM_SIZE * SIM_SIZE;

    function generatePositions() {
      const data = new Float32Array(COUNT * 4);
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < COUNT; i++) {
        const r = Math.sqrt((i + 0.5) / COUNT);
        const theta = i * golden;
        data[i * 4 + 0] = r * Math.cos(theta);
        data[i * 4 + 1] = r * Math.sin(theta);
        data[i * 4 + 2] = 0.3 + Math.random() * 0.7;
        data[i * 4 + 3] = Math.random();
      }
      return data;
    }

    const posData = generatePositions();

    function makeTex(data: Float32Array) {
      const t = new THREE.DataTexture(
        data,
        SIM_SIZE,
        SIM_SIZE,
        THREE.RGBAFormat,
        THREE.FloatType,
      );
      t.needsUpdate = true;
      return t;
    }

    const posTex = makeTex(posData);
    const posRefTex = makeTex(new Float32Array(posData));

    const rtOpts = {
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      depthBuffer: false,
      stencilBuffer: false,
    };
    let rt1 = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtOpts);
    let rt2 = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtOpts);

    const simScene = new THREE.Scene();
    const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const simMat = new THREE.ShaderMaterial({
      uniforms: {
        uPosition: { value: posTex },
        uPosRefs: { value: posRefTex },
        uMousePos: { value: new THREE.Vector2(0, 0) },
        uRingPos: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uDeltaTime: { value: 0 },
        uIsHovering: { value: 0 },
        uRingRadius: { value: 0.2 },
        uRingWidth: { value: 0.15 },
        uRingWidth2: { value: 0.05 },
        uRingDisplacement: { value: 0.15 },
      },
      vertexShader: `void main(){gl_Position=vec4(position,1.);}`,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uPosition;
        uniform sampler2D uPosRefs;
        uniform vec2 uMousePos;
        uniform vec2 uRingPos;
        uniform float uTime;
        uniform float uDeltaTime;
        uniform float uIsHovering;
        uniform float uRingRadius;
        uniform float uRingWidth;
        uniform float uRingWidth2;
        uniform float uRingDisplacement;
        ${NOISE}
        void main() {
          vec2 simTexCoords = gl_FragCoord.xy / vec2(${SIM_SIZE}.0, ${SIM_SIZE}.0);
          vec4 pFrame = texture2D(uPosition, simTexCoords);
          float scale    = pFrame.z;
          float velocity = pFrame.w;
          vec2 refPos    = texture2D(uPosRefs, simTexCoords).xy;
          float time = uTime * .5;
          vec2 curentPos = refPos;
          vec2 pos = pFrame.xy;
          pos *= .8;
          float dist   = distance(curentPos.xy, uRingPos);
          float noise0 = snoise(vec3(curentPos.xy * .2 + vec2(18.4924, 72.9744), time * 0.5));
          float dist1  = distance(curentPos.xy + (noise0 * .005), uRingPos);
          float t  = smoothstep(uRingRadius-(uRingWidth*2.), uRingRadius, dist)
                   - smoothstep(uRingRadius, uRingRadius+uRingWidth, dist1);
          float t2 = smoothstep(uRingRadius-(uRingWidth2*2.), uRingRadius, dist)
                   - smoothstep(uRingRadius, uRingRadius+uRingWidth2, dist1);
          float t3 = smoothstep(uRingRadius+uRingWidth2, uRingRadius, dist);
          t  = pow(t, 2.);
          t2 = pow(t2, 3.);
          t  += t2 * 3.;
          t  += t3 * .4;
          t  += snoise(vec3(curentPos.xy*30.+vec2(11.4924,12.9744), time*.5)) * t3 * .5;
          float nS = snoise(vec3(curentPos.xy*2.+vec2(18.4924,72.9744), time*.5));
          t += pow((nS+1.5)*.5, 2.) * .6;
          float noise1 = snoise(vec3(curentPos.xy*4.+vec2(88.494,32.4397),  time*0.35));
          float noise2 = snoise(vec3(curentPos.xy*4.+vec2(50.904,120.947),  time*0.35));
          float noise3 = snoise(vec3(curentPos.xy*20.+vec2(18.4924,72.9744),time*.5));
          float noise4 = snoise(vec3(curentPos.xy*20.+vec2(50.904,120.947), time*.5));
          vec2 disp = vec2(noise1,noise2)*.03 + vec2(noise3,noise4)*.005;
          disp.x += sin((refPos.x*20.)+(time*4.))*.02 * clamp(dist,0.,1.);
          disp.y += cos((refPos.y*20.)+(time*3.))*.02 * clamp(dist,0.,1.);
          pos -= (uRingPos-(curentPos+disp)) * pow(t2,.75) * uRingDisplacement;
          float scaleDiff = t - scale;
          scaleDiff *= .2;
          scale += scaleDiff;
          vec2 finalPos = curentPos + disp + (pos*.25);
          velocity *= .5;
          velocity += scale * .25;
          gl_FragColor = vec4(finalPos, scale, velocity);
        }
      `,
    });
    simScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMat));

    const geo = new THREE.BufferGeometry();
    const uvArr = new Float32Array(COUNT * 2);
    const posArr = new Float32Array(COUNT * 3);
    const seedArr = new Float32Array(COUNT * 4);
    for (let i = 0; i < COUNT; i++) {
      uvArr[i * 2] = (i % SIM_SIZE) / SIM_SIZE;
      uvArr[i * 2 + 1] = Math.floor(i / SIM_SIZE) / SIM_SIZE;
      seedArr[i * 4] = Math.random();
      seedArr[i * 4 + 1] = Math.random();
      seedArr[i * 4 + 2] = Math.random();
      seedArr[i * 4 + 3] = Math.random();
    }
    geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(uvArr, 2));
    geo.setAttribute("seeds", new THREE.BufferAttribute(seedArr, 4));

    const renderMat = new THREE.ShaderMaterial({
      uniforms: {
        uPosition: { value: posTex },
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#2c64ed") },
        uColor2: { value: new THREE.Color("#f84242") },
        uColor3: { value: new THREE.Color("#ffcf03") },
        uAlpha: { value: 1 },
        uIsHovering: { value: 0 },
        uPulseProgress: { value: 0 },
        uRingPos: { value: new THREE.Vector2(0, 0) },
        uRez: { value: new THREE.Vector2(W * PR, H * PR) },
        uParticleScale: { value: (W / PR / 2000) * 0.75 },
        uPixelRatio: { value: PR },
        uColorScheme: { value: 1 },
      },
      vertexShader: `
        precision highp float;
        attribute vec4 seeds;
        uniform sampler2D uPosition;
        uniform float uTime;
        uniform float uParticleScale;
        uniform float uPixelRatio;
        uniform int uColorScheme;
        uniform float uIsHovering;
        uniform float uPulseProgress;
        varying vec4 vSeeds;
        varying float vVelocity;
        varying vec2 vLocalPos;
        varying vec2 vScreenPos;
        varying float vScale;
        ${NOISE}
        void main(){
          vec4 pos = texture2D(uPosition, uv);
          vSeeds = seeds;
          float noiseX  = snoise(vec3(pos.xy*10.,  uTime*.2+100.));
          float noiseY  = snoise(vec3(pos.xy*10.,  uTime*.2));
          float noiseX2 = snoise(vec3(pos.xy*.5,   uTime*.15+45.));
          float noiseY2 = snoise(vec3(pos.xy*.5,   uTime*.15+87.));
          float cDist   = length(pos.xy);
          float progress = uPulseProgress;
          float t = smoothstep(progress-.25, progress, cDist)
                  - smoothstep(progress, progress+.25, cDist);
          t *= smoothstep(1., .0, cDist);
          pos.xy *= 1. + (t*.02);
          float dist = smoothstep(0., 0.9, pos.w);
          dist = mix(0., dist, uIsHovering);
          pos.y += noiseY  * 0.005 * dist;
          pos.x += noiseX  * 0.005 * dist;
          pos.y += noiseY2 * 0.02;
          pos.x += noiseX2 * 0.02;
          vVelocity = pos.w;
          vScale    = pos.z;
          vLocalPos = pos.xy;
          vec4 viewSpace = modelViewMatrix * vec4(pos.xy, 0., 1.);
          gl_Position = projectionMatrix * viewSpace;
          vScreenPos  = gl_Position.xy;
          float minScale = .25 + float(uColorScheme) * .75;
          gl_PointSize = (vScale*7.)*(uPixelRatio*0.5)*uParticleScale + (minScale*uPixelRatio);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec4 vSeeds;
        varying vec2 vScreenPos;
        varying vec2 vLocalPos;
        varying float vScale;
        varying float vVelocity;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec2 uRingPos;
        uniform vec2 uRez;
        uniform float uAlpha;
        uniform float uTime;
        uniform int uColorScheme;
        ${NOISE}
        #define PI 3.1415926535897932384626433832795
        float sdRoundBox(in vec2 p, in vec2 b, in vec4 r){
          r.xy=(p.x>0.0)?r.xy:r.zw;
          r.x=(p.y>0.0)?r.x:r.y;
          vec2 q=abs(p)-b+r.x;
          return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r.x;
        }
        vec2 rotate(vec2 v, float a){
          float s=sin(a); float c=cos(a);
          mat2 m=mat2(c,s,-s,c);
          return m*v;
        }
        void main(){
          float ratio = uRez.x / uRez.y;
          float noiseAngle = snoise(vec3(vLocalPos*10.+vec2(18.4924,72.9744), uTime*.85));
          float noiseColor = snoise(vec3(vLocalPos*2.+vec2(74.664,91.556),    uTime*.5));
          noiseColor = (noiseColor+1.)*.5;
          float angle = atan(vLocalPos.y - uRingPos.y, vLocalPos.x - uRingPos.x);
          vec2 uv = gl_PointCoord.xy - vec2(0.5);
          uv.y *= -1.;
          uv = rotate(uv, -angle + (noiseAngle*.5));
          float h = 0.8;
          float progress = smoothstep(0., .75, pow(noiseColor, 2.));
          vec3 col = mix(
            mix(uColor1, uColor2, progress/h),
            mix(uColor2, uColor3, (progress-h)/(1.-h)),
            step(h, progress)
          );
          vec3 color = col;
          float rounded = sdRoundBox(uv, vec2(0.5,0.2), vec4(.25));
          rounded = smoothstep(.1, 0., rounded);
          float a = uAlpha * rounded * smoothstep(0.1, 0.2, vScale);
          if(a < 0.01) discard;
          color = clamp(color, 0., 1.);
          color = mix(color, color*clamp(vVelocity,0.,1.), float(uColorScheme));
          gl_FragColor = vec4(color, clamp(a,0.,1.));
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, renderMat);
    points.position.set(0, 0, 0);
    points.scale.set(5, 5, 5);
    scene.add(points);

    const MAX_V = 256;
    const MASK = MAX_V - 1;
    const rArr = Array.from({ length: MAX_V }, () => Math.random());
    const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
    const valueNoise = (x: number) => {
      const xi = Math.floor(x);
      const xf = x - xi;
      const s = xf * xf * (3 - 2 * xf);
      return lerp(rArr[xi & MASK], rArr[(xi + 1) & MASK], s);
    };

    const rayPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(12.5, 12.5),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        visible: false,
        side: THREE.DoubleSide,
      }),
    );
    scene.add(rayPlane);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const intersectionPoint = new THREE.Vector3();
    let isIntersecting = false;
    let ringPosX = 0,
      ringPosY = 0;
    let hoverProgress = 0;
    let everRendered = false;
    let lastT = 0,
      simTime = 0;
    let pulseProgress = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / W) * 2 - 1;
      mouse.y = -(e.clientY / H) * 2 + 1;
      isIntersecting = true;
      hoverProgress = Math.min(1, hoverProgress + 0.08);
    };
    const onMouseLeave = () => {
      isIntersecting = false;
      hoverProgress = 0;
    };
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderMat.uniforms.uRez.value.set(W * PR, H * PR);
      renderMat.uniforms.uParticleScale.value = (W / PR / 2000) * 0.75;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    function animate() {
      animId = requestAnimationFrame(animate);
      const now = performance.now() * 0.001;
      const dt = Math.min(now - lastT, 0.05);
      lastT = now;
      simTime += dt;

      hoverProgress = Math.max(0, hoverProgress - 0.015);
      pulseProgress = (simTime * 0.3) % 1.2;

      const vx = (valueNoise(simTime * 0.66 + 94.234) - 0.5) * 2;
      const vy = (valueNoise(simTime * 0.75 + 21.028) - 0.5) * 2;

      if (isIntersecting) {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObject(rayPlane);
        if (hits.length > 0) intersectionPoint.copy(hits[0].point);
        ringPosX += (intersectionPoint.x * 0.175 + vx * 0.1 - ringPosX) * 0.02;
        ringPosY += (intersectionPoint.y * 0.175 + vy * 0.1 - ringPosY) * 0.02;
      } else {
        ringPosX += (vx * 0.2 - ringPosX) * 0.01;
        ringPosY += (vy * 0.1 - ringPosY) * 0.01;
      }

      const ringRadius =
        0.175 + Math.sin(simTime) * 0.03 + Math.cos(simTime * 3) * 0.02;

      simMat.uniforms.uPosition.value = everRendered ? rt1.texture : posTex;
      simMat.uniforms.uTime.value = simTime;
      simMat.uniforms.uDeltaTime.value = dt;
      simMat.uniforms.uRingPos.value.set(ringPosX, ringPosY);
      simMat.uniforms.uRingRadius.value = ringRadius;
      simMat.uniforms.uRingWidth.value = 0.15;
      simMat.uniforms.uRingWidth2.value = 0.05;
      simMat.uniforms.uRingDisplacement.value = 0.15;
      simMat.uniforms.uIsHovering.value = hoverProgress;

      renderer.setRenderTarget(rt2);
      renderer.setClearColor(0, 0);
      renderer.clear();
      renderer.render(simScene, simCamera);
      renderer.setRenderTarget(null);

      renderMat.uniforms.uPosition.value = everRendered ? rt2.texture : posTex;
      renderMat.uniforms.uTime.value = simTime;
      renderMat.uniforms.uRingPos.value.set(ringPosX, ringPosY);
      renderMat.uniforms.uIsHovering.value = hoverProgress;
      renderMat.uniforms.uPulseProgress.value = pulseProgress;

      renderer.clear();
      renderer.render(scene, camera);

      const tmp = rt1;
      rt1 = rt2;
      rt2 = tmp;
      everRendered = true;
    }

    animate();

    // limpeza quando o componente desmonta
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      rt1.dispose();
      rt2.dispose();
      geo.dispose();
      simMat.dispose();
      renderMat.dispose();
    };
  }, []);

  return (
    <section id="hero">
      <canvas ref={canvasRef} />

      <div className="hero-content">
        <div className="hero-avatar">
          <img src="/avatar.jpg" alt="Carlos" />
        </div>

        <h1 className="hero-title">Olá, sou o Carlos!</h1>

        <p className="hero-subtitle">
          Transformando café em código e lógica em <em>experiências</em>.
          Desenvolvedor Fullstack (estagiário) apaixonado por elevar a
          experiência a outro nível. ✨
        </p>

        <div className="hero-cta">
  <button
    className="btn-primary"
    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
  >
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
    Ver Projetos
  </button>

  <button
    className="btn-glass"
    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
  >
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
    </svg>
    Contato
  </button>
</div>

<div className="hero-socials">
  <a href="https://github.com/CarlosGeovane" target="_blank" rel="noopener noreferrer" className="hero-social-btn" title="GitHub">
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  </a>
  <a href="https://linkedin.com/in/carlosgeovanebelan" target="_blank" rel="noopener noreferrer" className="hero-social-btn" title="LinkedIn">
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  </a>
</div>

        
        
      </div>
      <div className="hero-scroll-indicator">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
