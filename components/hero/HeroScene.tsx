"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------
   Scène 3D du hero — trois métaphores en une :
   · noyau fluide irisé (Design)       · coque géométrique (Structure)
   · réseau de neurones + paquets de données qui circulent (IA / Data)
   Rendu en pause hors écran / onglet caché, pixel ratio plafonné à 2.
   ------------------------------------------------------------------ */

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}`;

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Couleurs identiques à l'export (pas de conversion sRGB ↔ linéaire)
    THREE.ColorManagement.enabled = false;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setFailed(true);
      return;
    }
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    const root = new THREE.Group();
    scene.add(root);

    // 1) Noyau fluide
    const coreMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uAmp: { value: 0.32 }, uMouse: { value: new THREE.Vector2() } },
      vertexShader:
        NOISE +
        /* glsl */ `
        uniform float uTime; uniform float uAmp; uniform vec2 uMouse;
        varying vec3 vN; varying vec3 vV; varying float vD;
        void main(){
          vec3 p = position;
          float d = snoise(normal*1.1 + vec3(uTime*.18, uTime*.12, uMouse.x*.6));
          d += .5*snoise(normal*2.4 + uTime*.3 + uMouse.y);
          vD = d;
          p += normal * d * uAmp;
          vec4 mv = modelViewMatrix * vec4(p,1.);
          vN = normalize(normalMatrix * normal);
          vV = -mv.xyz;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform float uTime; varying vec3 vN; varying vec3 vV; varying float vD;
        void main(){
          vec3 n = normalize(vN); vec3 v = normalize(vV);
          float fr = pow(1. - max(dot(n,v),0.), 2.2);
          vec3 deep = vec3(.08,.22,.62), sky = vec3(.25,.58,1.), steel = vec3(.24,.35,.54);
          float t = .5 + .5*sin(vD*3. + uTime*.6 + n.y*2.);
          vec3 col = mix(deep, sky, t);
          col = mix(col, steel, smoothstep(.2,.9, n.x*.5+.5) * .2);
          col += vec3(.0,1.,.88) * pow(fr, 3.) * .35;
          col *= .35 + fr*1.25;
          gl_FragColor = vec4(col, .95);
        }`,
      transparent: true,
    });
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 48);
    const core = new THREE.Mesh(coreGeo, coreMat);
    root.add(core);

    // 2) Coque filaire
    const shellGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.25, 1));
    const shell = new THREE.LineSegments(shellGeo, new THREE.LineBasicMaterial({ color: 0x7fffef, transparent: true, opacity: 0.22 }));
    root.add(shell);

    // 3) Nœuds du réseau
    const N = innerWidth < 700 ? 90 : 150;
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      const r = 2.7 + Math.random() * 1.3;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      nodes.push(new THREE.Vector3(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th) * 0.8, r * Math.cos(ph)));
    }
    const palette = [0x2563eb, 0x7fffef, 0x7fa7e8, 0xb8c4d9, 0x7fa7e8].map((c) => new THREE.Color(c));
    const pPos = new Float32Array(N * 3);
    const pCol = new Float32Array(N * 3);
    const pSize = new Float32Array(N);
    nodes.forEach((v, i) => {
      pPos.set([v.x, v.y, v.z], i * 3);
      const c = palette[i % 4 === 3 && Math.random() < 0.5 ? 3 : Math.floor(Math.random() * 5)];
      pCol.set([c.r, c.g, c.b], i * 3);
      pSize[i] = 6 + Math.random() * 12;
    });
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    pGeo.setAttribute("size", new THREE.BufferAttribute(pSize, 1));
    const pointMat = new THREE.ShaderMaterial({
      uniforms: { uPR: { value: renderer.getPixelRatio() }, uTime: { value: 0 } },
      vertexShader: /* glsl */ `
        attribute float size; attribute vec3 color; varying vec3 vC; uniform float uPR; uniform float uTime;
        void main(){ vC = color; vec4 mv = modelViewMatrix*vec4(position,1.); float tw = .75+.25*sin(uTime*2.+position.x*3.);
        gl_PointSize = size*uPR*tw*(6./-mv.z); gl_Position = projectionMatrix*mv; }`,
      fragmentShader: /* glsl */ `
        varying vec3 vC; void main(){ float d = length(gl_PointCoord-.5); float a = smoothstep(.5,0.,d); a = pow(a,1.8);
        gl_FragColor = vec4(vC + .25, a); }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    root.add(new THREE.Points(pGeo, pointMat));

    // Arêtes entre nœuds proches
    const edges: [number, number][] = [];
    const lPos: number[] = [];
    const lCol: number[] = [];
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.15) {
          edges.push([i, j]);
          lPos.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
          lCol.push(pCol[i * 3], pCol[i * 3 + 1], pCol[i * 3 + 2], pCol[j * 3], pCol[j * 3 + 1], pCol[j * 3 + 2]);
        }
      }
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.Float32BufferAttribute(lPos, 3));
    lGeo.setAttribute("color", new THREE.Float32BufferAttribute(lCol, 3));
    root.add(
      new THREE.LineSegments(
        lGeo,
        new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false }),
      ),
    );

    // Rayons noyau → nœuds (les données entrent dans le modèle)
    const sPos: number[] = [];
    nodes.forEach((v, i) => {
      if (i % 7 === 0) {
        const s = v.clone().normalize().multiplyScalar(1.45);
        sPos.push(s.x, s.y, s.z, v.x, v.y, v.z);
      }
    });
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.Float32BufferAttribute(sPos, 3));
    root.add(new THREE.LineSegments(sGeo, new THREE.LineBasicMaterial({ color: 0x7fa7e8, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending })));

    // Paquets de données qui voyagent sur les arêtes
    const S = Math.min(46, edges.length);
    const sig = Array.from({ length: S }, () => ({ e: edges[Math.floor(Math.random() * edges.length)], t: Math.random(), sp: 0.25 + Math.random() * 0.6 }));
    const sigPos = new Float32Array(S * 3);
    const sigGeo = new THREE.BufferGeometry();
    sigGeo.setAttribute("position", new THREE.BufferAttribute(sigPos, 3));
    root.add(
      new THREE.Points(
        sigGeo,
        new THREE.PointsMaterial({ color: 0xffffff, size: 0.09, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }),
      ),
    );

    // Anneaux orbitaux
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.3, 0.006, 6, 220), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 }));
    ring1.rotation.x = 1.25;
    root.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.1, 0.005, 6, 220), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.07 }));
    ring2.rotation.set(1.1, 0.5, 0);
    root.add(ring2);

    // Mise en page responsive
    let baseX = 0;
    let baseScale = 1;
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (w > 1100) [baseX, baseScale] = [2.9, 1];
      else if (w > 700) [baseX, baseScale] = [2.0, 0.85];
      else [baseX, baseScale] = [0.6, 0.72];
      canvas.style.opacity = w > 700 ? "1" : ".55";
    };
    resize();
    addEventListener("resize", resize);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      mouse.tx = (e.clientX / innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / innerHeight) * 2 - 1;
    };
    addEventListener("pointermove", onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(canvas);

    const timer = new THREE.Timer();
    const tmp = new THREE.Vector3();
    let raf = 0;

    const frame = (now?: number) => {
      raf = requestAnimationFrame(frame);
      timer.update(now);
      if (!visible || document.hidden) return;
      const dt = Math.min(timer.getDelta(), 0.05);
      const t = timer.getElapsed();
      const scrollP = Math.min(1, scrollY / innerHeight);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      coreMat.uniforms.uTime.value = t;
      pointMat.uniforms.uTime.value = t;
      coreMat.uniforms.uMouse.value.set(mouse.x, mouse.y);
      coreMat.uniforms.uAmp.value = 0.28 + Math.hypot(mouse.x, mouse.y) * 0.14;

      root.rotation.y = t * 0.08 + mouse.x * 0.55;
      root.rotation.x = mouse.y * 0.35 + scrollP * 0.6;
      root.position.x = baseX + mouse.x * 0.25;
      root.position.y = -mouse.y * 0.2 + scrollP * 1.6;
      root.scale.setScalar(baseScale * (1 - scrollP * 0.15));
      core.rotation.y = -t * 0.2;
      core.rotation.z = t * 0.07;
      shell.rotation.y = -t * 0.12;
      shell.rotation.x = t * 0.05;
      ring1.rotation.z = t * 0.1;
      ring2.rotation.z = -t * 0.07;

      for (let k = 0; k < S; k++) {
        const g = sig[k];
        g.t += dt * g.sp;
        if (g.t > 1) {
          g.t = 0;
          g.e = edges[Math.floor(Math.random() * edges.length)];
        }
        tmp.copy(nodes[g.e[0]]).lerp(nodes[g.e[1]], g.t);
        sigPos[k * 3] = tmp.x;
        sigPos[k * 3 + 1] = tmp.y;
        sigPos[k * 3 + 2] = tmp.z;
      }
      sigGeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    if (reduce) {
      root.position.x = baseX;
      root.scale.setScalar(baseScale);
      renderer.render(scene, camera);
    } else frame();

    return () => {
      cancelAnimationFrame(raf);
      timer.dispose();
      io.disconnect();
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onPointer);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
    };
  }, []);

  if (failed) {
    return (
      <div
        aria-hidden
        className="absolute top-[22%] right-[6%] -z-10 aspect-square w-[min(40vw,460px)] rounded-full opacity-60 blur-[10px]"
        style={{ background: "radial-gradient(circle at 35% 30%,#7FFFEF,#2563EB 45%,#3D5A8A 80%)" }}
      />
    );
  }

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 -z-10 block size-full transition-opacity duration-700" />;
}
