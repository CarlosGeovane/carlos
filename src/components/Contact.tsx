import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './Contact.css'

export default function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let W = canvas.offsetWidth
    let H = canvas.offsetHeight

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    const PR = Math.min(window.devicePixelRatio, 2)
    renderer.setPixelRatio(PR)
    renderer.setSize(W, H)
    renderer.autoClear = false

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 1000)
    camera.position.z = 3.1

    const NOISE = `
      vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
      vec4 permute4(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
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
    `

    const SIM_SIZE = 64
    const COUNT = SIM_SIZE * SIM_SIZE

    function generatePositions() {
      const data = new Float32Array(COUNT * 4)
      const golden = Math.PI * (3 - Math.sqrt(5))
      for (let i = 0; i < COUNT; i++) {
        const r = Math.sqrt((i + 0.5) / COUNT)
        const theta = i * golden
        data[i * 4 + 0] = r * Math.cos(theta)
        data[i * 4 + 1] = r * Math.sin(theta)
        data[i * 4 + 2] = 0.3 + Math.random() * 0.7
        data[i * 4 + 3] = Math.random()
      }
      return data
    }

    const posData = generatePositions()
    const makeTex = (data: Float32Array) => {
      const t = new THREE.DataTexture(data, SIM_SIZE, SIM_SIZE, THREE.RGBAFormat, THREE.FloatType)
      t.needsUpdate = true
      return t
    }

    const posTex = makeTex(posData)
    const posRefTex = makeTex(new Float32Array(posData))

    const rtOpts = {
      wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping,
      minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat, type: THREE.FloatType,
      depthBuffer: false, stencilBuffer: false,
    }
    let rt1 = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtOpts)
    let rt2 = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, rtOpts)

    const simScene = new THREE.Scene()
    const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const simMat = new THREE.ShaderMaterial({
      uniforms: {
        uPosition: { value: posTex }, uPosRefs: { value: posRefTex },
        uRingPos: { value: new THREE.Vector2(0, 0) }, uTime: { value: 0 },
        uDeltaTime: { value: 0 }, uIsHovering: { value: 0 },
        uRingRadius: { value: 0.2 }, uRingWidth: { value: 0.15 },
        uRingWidth2: { value: 0.05 }, uRingDisplacement: { value: 0.15 },
      },
      vertexShader: `void main(){gl_Position=vec4(position,1.);}`,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uPosition;
        uniform sampler2D uPosRefs;
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
          float scale = pFrame.z; float velocity = pFrame.w;
          vec2 refPos = texture2D(uPosRefs, simTexCoords).xy;
          float time = uTime * .5;
          vec2 curentPos = refPos;
          vec2 pos = pFrame.xy; pos *= .8;
          float dist = distance(curentPos.xy, uRingPos);
          float noise0 = snoise(vec3(curentPos.xy * .2 + vec2(18.4924, 72.9744), time * 0.5));
          float dist1 = distance(curentPos.xy + (noise0 * .005), uRingPos);
          float t  = smoothstep(uRingRadius-(uRingWidth*2.), uRingRadius, dist) - smoothstep(uRingRadius, uRingRadius+uRingWidth, dist1);
          float t2 = smoothstep(uRingRadius-(uRingWidth2*2.), uRingRadius, dist) - smoothstep(uRingRadius, uRingRadius+uRingWidth2, dist1);
          float t3 = smoothstep(uRingRadius+uRingWidth2, uRingRadius, dist);
          t = pow(t, 2.); t2 = pow(t2, 3.);
          t += t2 * 3.; t += t3 * .4;
          t += snoise(vec3(curentPos.xy*30.+vec2(11.4924,12.9744), time*.5)) * t3 * .5;
          float nS = snoise(vec3(curentPos.xy*2.+vec2(18.4924,72.9744), time*.5));
          t += pow((nS+1.5)*.5, 2.) * .6;
          float noise1 = snoise(vec3(curentPos.xy*4.+vec2(88.494,32.4397), time*0.35));
          float noise2 = snoise(vec3(curentPos.xy*4.+vec2(50.904,120.947), time*0.35));
          float noise3 = snoise(vec3(curentPos.xy*20.+vec2(18.4924,72.9744), time*.5));
          float noise4 = snoise(vec3(curentPos.xy*20.+vec2(50.904,120.947), time*.5));
          vec2 disp = vec2(noise1,noise2)*.03 + vec2(noise3,noise4)*.005;
          disp.x += sin((refPos.x*20.)+(time*4.))*.02 * clamp(dist,0.,1.);
          disp.y += cos((refPos.y*20.)+(time*3.))*.02 * clamp(dist,0.,1.);
          pos -= (uRingPos-(curentPos+disp)) * pow(t2,.75) * uRingDisplacement;
          float scaleDiff = t - scale; scaleDiff *= .2; scale += scaleDiff;
          vec2 finalPos = curentPos + disp + (pos*.25);
          velocity *= .5; velocity += scale * .25;
          gl_FragColor = vec4(finalPos, scale, velocity);
        }
      `,
    })
    simScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMat))

    const geo = new THREE.BufferGeometry()
    const uvArr = new Float32Array(COUNT * 2)
    const posArr = new Float32Array(COUNT * 3)
    const seedArr = new Float32Array(COUNT * 4)
    for (let i = 0; i < COUNT; i++) {
      uvArr[i * 2] = (i % SIM_SIZE) / SIM_SIZE
      uvArr[i * 2 + 1] = Math.floor(i / SIM_SIZE) / SIM_SIZE
      seedArr[i * 4] = Math.random(); seedArr[i * 4 + 1] = Math.random()
      seedArr[i * 4 + 2] = Math.random(); seedArr[i * 4 + 3] = Math.random()
    }
    geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
    geo.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2))
    geo.setAttribute('seeds', new THREE.BufferAttribute(seedArr, 4))

    const renderMat = new THREE.ShaderMaterial({
      uniforms: {
        uPosition: { value: posTex }, uTime: { value: 0 },
        // ── cores azul neon ──
        uColor1: { value: new THREE.Color('#00b4ff') },
        uColor2: { value: new THREE.Color('#0066ff') },
        uColor3: { value: new THREE.Color('#00eeff') },
        uAlpha: { value: 1 }, uIsHovering: { value: 0 },
        uPulseProgress: { value: 0 },
        uRingPos: { value: new THREE.Vector2(0, 0) },
        uRez: { value: new THREE.Vector2(W * PR, H * PR) },
        uParticleScale: { value: (W / PR / 2000) * 0.75 },
        uPixelRatio: { value: PR }, uColorScheme: { value: 1 },
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
          float noiseX2 = snoise(vec3(pos.xy*.5, uTime*.15+45.));
          float noiseY2 = snoise(vec3(pos.xy*.5, uTime*.15+87.));
          float cDist = length(pos.xy);
          float progress = uPulseProgress;
          float t = smoothstep(progress-.25, progress, cDist) - smoothstep(progress, progress+.25, cDist);
          t *= smoothstep(1., .0, cDist);
          pos.xy *= 1. + (t*.02);
          pos.y += noiseY2 * 0.02;
          pos.x += noiseX2 * 0.02;
          vVelocity = pos.w; vScale = pos.z; vLocalPos = pos.xy;
          vec4 viewSpace = modelViewMatrix * vec4(pos.xy, 0., 1.);
          gl_Position = projectionMatrix * viewSpace;
          vScreenPos = gl_Position.xy;
          float minScale = .25 + float(uColorScheme) * .75;
          gl_PointSize = (vScale*7.)*(uPixelRatio*0.5)*uParticleScale + (minScale*uPixelRatio);
        }
      `,
      fragmentShader: `
        precision highp float;
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
        float sdRoundBox(in vec2 p, in vec2 b, in vec4 r){
          r.xy=(p.x>0.0)?r.xy:r.zw; r.x=(p.y>0.0)?r.x:r.y;
          vec2 q=abs(p)-b+r.x;
          return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r.x;
        }
        vec2 rotate(vec2 v, float a){
          float s=sin(a); float c=cos(a);
          return mat2(c,s,-s,c)*v;
        }
        void main(){
          float noiseAngle = snoise(vec3(vLocalPos*10.+vec2(18.4924,72.9744), uTime*.85));
          float noiseColor = snoise(vec3(vLocalPos*2.+vec2(74.664,91.556), uTime*.5));
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
          float rounded = sdRoundBox(uv, vec2(0.5,0.2), vec4(.25));
          rounded = smoothstep(.1, 0., rounded);
          float a = uAlpha * rounded * smoothstep(0.1, 0.2, vScale);
          if(a < 0.01) discard;
          vec3 color = clamp(col, 0., 1.);
          color = mix(color, color*clamp(vVelocity,0.,1.), float(uColorScheme));
          gl_FragColor = vec4(color, clamp(a,0.,1.));
        }
      `,
      transparent: true, depthTest: false, depthWrite: false,
    })

    const points = new THREE.Points(geo, renderMat)
    points.scale.set(5, 5, 5)
    scene.add(points)

    const MAX_V = 256, MASK = MAX_V - 1
    const rArr = Array.from({ length: MAX_V }, () => Math.random())
    const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t
    const valueNoise = (x: number) => {
      const xi = Math.floor(x), xf = x - xi
      const s = xf * xf * (3 - 2 * xf)
      return lerp(rArr[xi & MASK], rArr[(xi + 1) & MASK], s)
    }

    const rayPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(12.5, 12.5),
      new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })
    )
    scene.add(rayPlane)

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const intersectionPoint = new THREE.Vector3()
    let isIntersecting = false
    let ringPosX = 0, ringPosY = 0
    let hoverProgress = 0, everRendered = false
    let lastT = 0, simTime = 0, pulseProgress = 0
    let animId: number

    const onMouseMove = (e: MouseEvent) => {
      mouse.x =  (e.clientX / W) * 2 - 1
      mouse.y = -(e.clientY / H) * 2 + 1
      isIntersecting = true
      hoverProgress = Math.min(1, hoverProgress + 0.08)
    }
    const onMouseLeave = () => { isIntersecting = false; hoverProgress = 0 }
    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      renderer.setSize(W, H)
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderMat.uniforms.uRez.value.set(W * PR, H * PR)
      renderMat.uniforms.uParticleScale.value = (W / PR / 2000) * 0.75
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', onResize)

    function animate() {
      animId = requestAnimationFrame(animate)
      const now = performance.now() * 0.001
      const dt = Math.min(now - lastT, 0.05)
      lastT = now; simTime += dt
      hoverProgress = Math.max(0, hoverProgress - 0.015)
      pulseProgress = (simTime * 0.3) % 1.2
      const vx = (valueNoise(simTime * 0.66 + 94.234) - 0.5) * 2
      const vy = (valueNoise(simTime * 0.75 + 21.028) - 0.5) * 2
      if (isIntersecting) {
        raycaster.setFromCamera(mouse, camera)
        const hits = raycaster.intersectObject(rayPlane)
        if (hits.length > 0) intersectionPoint.copy(hits[0].point)
        ringPosX += (intersectionPoint.x * 0.175 + vx * 0.1 - ringPosX) * 0.02
        ringPosY += (intersectionPoint.y * 0.175 + vy * 0.1 - ringPosY) * 0.02
      } else {
        ringPosX += (vx * 0.2 - ringPosX) * 0.01
        ringPosY += (vy * 0.1 - ringPosY) * 0.01
      }
      const ringRadius = 0.175 + Math.sin(simTime) * 0.03 + Math.cos(simTime * 3) * 0.02
      simMat.uniforms.uPosition.value = everRendered ? rt1.texture : posTex
      simMat.uniforms.uTime.value = simTime
      simMat.uniforms.uDeltaTime.value = dt
      simMat.uniforms.uRingPos.value.set(ringPosX, ringPosY)
      simMat.uniforms.uRingRadius.value = ringRadius
      simMat.uniforms.uIsHovering.value = hoverProgress
      renderer.setRenderTarget(rt2)
      renderer.setClearColor(0, 0); renderer.clear()
      renderer.render(simScene, simCamera)
      renderer.setRenderTarget(null)
      renderMat.uniforms.uPosition.value = everRendered ? rt2.texture : posTex
      renderMat.uniforms.uTime.value = simTime
      renderMat.uniforms.uRingPos.value.set(ringPosX, ringPosY)
      renderMat.uniforms.uIsHovering.value = hoverProgress
      renderMat.uniforms.uPulseProgress.value = pulseProgress
      renderer.clear(); renderer.render(scene, camera)
      const tmp = rt1; rt1 = rt2; rt2 = tmp
      everRendered = true
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
      renderer.dispose(); rt1.dispose(); rt2.dispose()
      geo.dispose(); simMat.dispose(); renderMat.dispose()
    }
  }, [])

  return (
    <section id="contact">
      <canvas ref={canvasRef} className="contact-canvas" />

      <div className="contact-container">
        <div className="contact-header">
          <div className="contact-icon-wrapper">
            <div className="contact-icon-glow"></div>
            <div className="contact-icon">
              <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
                <rect x="2" y="4" width="20" height="16" rx="2"/>
              </svg>
            </div>
          </div>
          <h2>Vamos fazer algo incrível?</h2>
          <p>Estou aberto a oportunidades, projetos e parcerias ☕️</p>
        </div>

        <div className="contact-grid">
          {/* Cards esquerda */}
          <div className="contact-cards">
            <a href="mailto:carlosgeovaneoficiall@gmail.com" className="contact-card glass">
              <div className="contact-card-icon" style={{ background: 'rgba(44,100,237,0.2)' }}>
                <svg width="20" height="20" fill="none" stroke="#6b9fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>carlosgeovaneoficiall@gmail.com</p>
                <span className="contact-cta" style={{ color: '#6b9fff' }}>Enviar email →</span>
              </div>
            </a>

            <a href="https://api.whatsapp.com/send?phone=5531981087576" target="_blank" rel="noopener noreferrer" className="contact-card glass">
              <div className="contact-card-icon" style={{ background: 'rgba(37,211,102,0.2)' }}>
                <svg width="20" height="20" fill="#25d366" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <h4>WhatsApp</h4>
                <p>+55 (31) 98108-7576</p>
                <span className="contact-cta" style={{ color: '#25d366' }}>Iniciar conversa →</span>
              </div>
            </a>

            <a href="https://linkedin.com/in/carlosgeovanebelan" target="_blank" rel="noopener noreferrer" className="contact-card glass">
              <div className="contact-card-icon" style={{ background: 'rgba(10,102,194,0.2)' }}>
                <svg width="20" height="20" fill="none" stroke="#0a66c2" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </div>
              <div>
                <h4>LinkedIn</h4>
                <p>carlosgeovanebelan</p>
                <span className="contact-cta" style={{ color: '#0a66c2' }}>Ver perfil →</span>
              </div>
            </a>

            <div className="contact-card glass">
              <div className="contact-card-icon" style={{ background: 'rgba(139,92,246,0.2)' }}>
                <svg width="20" height="20" fill="none" stroke="#a78bfa" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <h4>Localização</h4>
                <p>Belo Horizonte, MG, Brasil</p>
              </div>
            </div>
          </div>

          {/* Formulário direita */}
          <div className="contact-form-card glass">
            <h3>Me envie uma mensagem</h3>
            <p>Estou sempre aberto a discutir novas oportunidades ou projetos!</p>

            <div className="form-row">
              <div className="form-group">
                <label>Nome</label>
                <input className="form-input" type="text" placeholder="Seu nome" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input className="form-input" type="email" placeholder="seu@email.com" />
              </div>
            </div>

            <div className="form-group">
              <label>Assunto</label>
              <input className="form-input" type="text" placeholder="Assunto do projeto" />
            </div>

            <div className="form-group">
              <label>Mensagem</label>
              <textarea className="form-textarea" rows={4} placeholder="Me conte sobre sua ideia..."></textarea>
            </div>

            <div className="form-actions">
              <button className="btn-whatsapp">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                Enviar via WhatsApp
              </button>
              <button className="btn-email">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
                Enviar via Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}