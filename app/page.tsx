"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import * as THREE from "three";
import {
  ArrowRight,
  ChevronRight,
  Circle,
  Gem,
  Menu,
  MoveRight,
  Sparkles,
  X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const collections = [
  {
    name: "Lumen Pleat",
    line: "Architectural silk gown",
    detail: "Pearl silk, platinum rib, champagne clasp",
    image: "/images/ethere-collection-portrait.png"
  },
  {
    name: "Auralis",
    line: "Glass organza cape",
    detail: "Ivory mesh, suspended collar, hand folded train",
    image: "/images/ethere-campaign.png"
  },
  {
    name: "Nocturne Blanc",
    line: "Futurist atelier suit",
    detail: "Matte crepe, white lacquer, silver micro seam",
    image: "/images/ethere-runway-hero.png"
  }
];

const looks = [
  "Oracle Veil",
  "Halo Tailoring",
  "Pearl Signal",
  "Silent Volume",
  "White Circuit",
  "Celestial Bias"
];

const testimonials = [
  "ÉTHERE feels less like a collection and more like a private future.",
  "Every silhouette has the hush of couture and the precision of technology.",
  "A white world with cinematic gravity, edited to a single perfect breath."
];

function useLuxuryMotion() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0, filter: "blur(18px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%"
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax || -12),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      ctx.revert();
    };
  }, []);
}

function CursorAtmosphere() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let gx = x;
    let gy = y;
    let tx = x;
    let ty = y;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.closest(".magnetic") ||
          target.closest("[role='button']") ||
          target.style.cursor === "pointer")
      ) {
        cursorRef.current?.classList.add("cursor-hover");
        glowRef.current?.classList.add("glow-hover");
      }
    };

    const onMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.closest(".magnetic") ||
          target.closest("[role='button']"))
      ) {
        cursorRef.current?.classList.remove("cursor-hover");
        glowRef.current?.classList.remove("glow-hover");
      }
    };

    const render = () => {
      // 0.38 easing is extremely responsive, snappy and organic without lag
      x += (tx - x) * 0.38;
      y += (ty - y) * 0.38;

      // 0.08 easing creates a beautiful fluid, lagging glow atmosphere
      gx += (tx - gx) * 0.08;
      gy += (ty - gy) * 0.08;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="luxury-cursor" />
      <div ref={glowRef} className="luxury-cursor-glow" />
    </>
  );
}

function RunwayCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1.55, 7);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = Math.random() * 4 - 0.5;
      positions[i * 3 + 2] = Math.random() * -8;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: 0xd6c3a5,
        size: 0.018,
        transparent: true,
        opacity: 0.5
      })
    );
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const key = new THREE.PointLight(0xffffff, 18, 10);
    key.position.set(0, 3, 3);
    scene.add(key);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const clock = new THREE.Clock();
    let frame = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      particles.rotation.y = Math.sin(t * 0.18) * 0.08;
      camera.position.x = Math.sin(t * 0.2) * 0.16;
      camera.lookAt(0, -0.42, -1.8);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
      particlesGeometry.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="runway-canvas" aria-hidden="true" />;
}

function MagneticButton({
  children,
  variant = "default",
  className
}: {
  children: React.ReactNode;
  variant?: "default" | "ghost" | "outline";
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    event.currentTarget.style.transform = `translate(${x * 0.16}px, ${y * 0.22}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <Button ref={ref} variant={variant} size="lg" className={cn("magnetic", className)} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </Button>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const navItems = ["Collection", "Runway", "Lookbook", "Maison", "Membership"];

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-1/2 top-5 z-50 flex w-[min(calc(100%-28px),1120px)] -translate-x-1/2 items-center justify-between rounded-full border border-white/80 bg-white/55 px-4 py-3 shadow-glass backdrop-blur-2xl md:px-6"
      >
        <a href="#top" className="font-display text-xl uppercase text-graphite">
          ÉTHERE
        </a>
        <nav className="hidden items-center gap-7 text-xs uppercase text-graphite/70 md:flex">
          {navItems.slice(0, 4).map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </nav>
        <button className="icon-button" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu size={18} />
        </button>
      </motion.header>

      <motion.div
        className="menu-overlay"
        initial={false}
        animate={{ clipPath: open ? "circle(150% at 90% 8%)" : "circle(0% at 90% 8%)" }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        aria-hidden={!open}
      >
        <button className="icon-button absolute right-7 top-7" aria-label="Close menu" onClick={() => setOpen(false)}>
          <X size={18} />
        </button>
        <div className="mx-auto flex min-h-screen w-[min(1120px,calc(100%-32px))] flex-col justify-center">
          <p className="mb-8 text-xs uppercase text-graphite/50">Private navigation</p>
          <div className="grid gap-5">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-graphite/10 py-4 font-display text-5xl leading-none text-graphite md:text-7xl lg:text-8xl"
                initial={{ y: 30, opacity: 0 }}
                animate={open ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ delay: open ? 0.08 * index + 0.15 : 0, duration: 0.7 }}
              >
                {item}
                <MoveRight className="opacity-0 transition group-hover:opacity-100" size={36} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="section-intro" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default function Home() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const runwaySectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.35]);

  const { scrollYProgress: runwayProgress } = useScroll({
    target: runwaySectionRef,
    offset: ["start center", "end center"]
  });

  useLuxuryMotion();

  const onGalleryPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const slider = galleryRef.current;
    if (!slider) return;
    slider.setPointerCapture(event.pointerId);
    const startX = event.clientX;
    const startScroll = slider.scrollLeft;

    const move = (moveEvent: PointerEvent) => {
      slider.scrollLeft = startScroll - (moveEvent.clientX - startX);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <main id="top" className="relative overflow-hidden bg-white text-graphite">
      <CursorAtmosphere />
      <Navbar />
      <RunwayCanvas />

      <section className="hero-section">
        <div className="hero-image-wrap" data-parallax="-7">
          <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="relative h-full w-full">
            <Image src="/images/ethere-runway-hero.png" alt="White futuristic couture runway for ÉTHERE" fill priority className="object-cover" />
          </motion.div>
        </div>
        <div className="hero-veil" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
          className="hero-content"
        >
          <motion.p initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45, duration: 0.8 }} className="eyebrow">
            ÉTHERE maison futur
          </motion.p>
          <div className="mask-line">
            <motion.h1 initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.55, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}>
              THE FUTURE OF LUXURY
            </motion.h1>
          </div>
          <motion.p
            initial={{ y: 28, opacity: 0, filter: "blur(12px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="hero-subtitle"
          >
            An immersive couture experience crafted beyond trends.
          </motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 0.7 }} className="flex flex-col gap-3 sm:flex-row">
            <MagneticButton>
              Explore Collection <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton variant="ghost">
              Enter The Runway <Sparkles size={16} />
            </MagneticButton>
          </motion.div>
        </motion.div>
        <div className="hero-meta">
          <span>Maison 2036</span>
          <span>White Couture System</span>
          <span>Paris, Lunar Atelier</span>
        </div>
      </section>

      <section id="collection" className="section-shell pt-24 md:pt-32">
        <SectionIntro
          eyebrow="New collection showcase"
          title="Garments that behave like light."
          text="A white monochrome study of sculptural gowns, precise tailoring, and pearl-lit materials designed for motion."
        />
        <div className="collection-grid">
          {collections.map((item, index) => (
            <motion.article
              key={item.name}
              className={cn("collection-card", index === 1 && "md:translate-y-16")}
              whileHover={{ y: -12 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              data-reveal
            >
              <div className="relative h-[440px] overflow-hidden rounded-[8px] bg-pearl">
                <Image src={item.image} alt={item.name} fill className="collection-image object-cover" />
                <div className="card-sheen" />
              </div>
              <div className="glass-caption">
                <div>
                  <p className="font-display text-3xl">{item.name}</p>
                  <p className="text-sm text-graphite/55">{item.line}</p>
                </div>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-5 text-sm text-graphite/60">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section ref={runwaySectionRef} id="runway" className="story-section">
        <div className="story-sticky">
          <div className="story-copy" data-reveal>
            <p className="eyebrow">Interactive runway experience</p>
            <h2 className="mb-8">Scroll through a white cinematic runway.</h2>

            {/* Premium Interactive Runway Timeline */}
            <div className="runway-timeline hidden md:flex">
              <div className="absolute left-[3px] top-1 bottom-1 w-[1px] bg-graphite/10">
                <motion.div 
                  className="timeline-progress-line" 
                  style={{ scaleY: runwayProgress }} 
                />
              </div>
              
              <div className="timeline-step relative pl-6 group">
                <div className="timeline-dot" />
                <span className="text-[10px] font-mono tracking-widest text-champagne-gold block mb-1">01 / CONCEPT</span>
                <span className="text-sm font-semibold tracking-wider text-graphite group-hover:text-champagne-gold transition-colors duration-300">SILHOUETTE</span>
                <p className="text-xs text-graphite/45 mt-1 max-w-[240px] leading-relaxed">The structural form, silent volume, and architectural contours of ÉTHERE.</p>
              </div>

              <div className="timeline-step relative pl-6 group">
                <div className="timeline-dot" />
                <span className="text-[10px] font-mono tracking-widest text-champagne-gold block mb-1">02 / CRAFT</span>
                <span className="text-sm font-semibold tracking-wider text-graphite group-hover:text-champagne-gold transition-colors duration-300">MATERIAL</span>
                <p className="text-xs text-graphite/45 mt-1 max-w-[240px] leading-relaxed">Textiles behaving like light: pearl silk, lacquered seams, and suspended trains.</p>
              </div>

              <div className="timeline-step relative pl-6 group">
                <div className="timeline-dot" />
                <span className="text-[10px] font-mono tracking-widest text-champagne-gold block mb-1">03 / ATELIER</span>
                <span className="text-sm font-semibold tracking-wider text-graphite group-hover:text-champagne-gold transition-colors duration-300">MOTION</span>
                <p className="text-xs text-graphite/45 mt-1 max-w-[240px] leading-relaxed">The final cinematic transition as looks dissolve into pure atelier light.</p>
              </div>
            </div>
          </div>
          <div className="runway-frames">
            {["Silhouette", "Material", "Motion"].map((label, index) => (
              <div className="runway-frame" key={label} data-parallax={index % 2 ? "-14" : "10"}>
                <span>{label}</span>
                <div className="frame-line" />
                <p>{index === 0 ? "An entrance in silence." : index === 1 ? "Textile becomes atmosphere." : "The final look dissolves into light."}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lookbook" className="section-shell">
        <SectionIntro
          eyebrow="Interactive lookbook"
          title="Drag through the house codes."
          text="Horizontal editorial pacing, tactile image reveals, and softly distorted panels for a private couture preview."
        />
        <div ref={galleryRef} className="lookbook-strip" onPointerDown={onGalleryPointer}>
          {looks.map((look, index) => (
            <article key={look} className="look-card">
              <div className="look-visual">
                <Image
                  src={index % 3 === 0 ? "/images/ethere-collection-portrait.png" : index % 3 === 1 ? "/images/ethere-campaign.png" : "/images/ethere-runway-hero.png"}
                  alt={look}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="look-panel">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{look}</h3>
                <ChevronRight size={18} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="maison" className="maison-section">
        <div className="maison-grid">
          <div data-reveal>
            <p className="eyebrow">Maison philosophy</p>
            <h2>Luxury reduced to its most luminous form.</h2>
          </div>
          <div className="maison-text" data-reveal>
            <p>
              ÉTHERE creates couture as a quiet architecture. Every piece begins with silence, then receives structure,
              gesture, and a precise future-facing sensuality.
            </p>
            <div className="metrics">
              <span><strong>01</strong> White craft</span>
              <span><strong>18</strong> Atelier processes</span>
              <span><strong>∞</strong> Private runway states</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionIntro
          eyebrow="Featured couture pieces"
          title="Objects of absence, edited by hand."
          text="Soft metallic reflections, floating glass captions, and tactile hover movement reveal the garment details."
        />
        <div className="pieces-grid">
          {collections.concat(collections.slice(0, 1)).map((item, index) => (
            <motion.article key={`${item.name}-${index}`} className="piece-card" whileHover={{ y: -10, rotate: index % 2 ? -0.7 : 0.7 }}>
              <div className="piece-orbit"><Gem size={20} /></div>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
              <button aria-label={`View ${item.name}`}><ArrowRight size={16} /></button>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="campaign-section">
        <Image src="/images/ethere-campaign.png" alt="ÉTHERE editorial campaign in white couture" fill className="object-cover" />
        <div className="campaign-gradient" />
        <div className="campaign-copy" data-reveal>
          <p className="eyebrow">Editorial campaign</p>
          <h2>THE SILENCE BEFORE THE APPLAUSE</h2>
          <p>A cinematic study of white tailoring, reflective atelier light, and bodies moving like architecture.</p>
        </div>
      </section>

      <section className="section-shell">
        <SectionIntro
          eyebrow="Luxury testimonials"
          title="A private room of reactions."
          text="Collectors, stylists, and patrons describe a maison designed to feel impossibly calm."
        />
        <div className="testimonial-grid">
          {testimonials.map((quote, index) => (
            <article key={quote} className="testimonial-card" data-reveal>
              <Circle size={18} />
              <p>“{quote}”</p>
              <span>{["Editor, Paris", "Private Client", "Runway Director"][index]}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="membership" className="membership-section">
        <div className="membership-panel" data-reveal>
          <div>
            <p className="eyebrow">Exclusive membership</p>
            <h2>Enter the private white salon.</h2>
            <p>Receive atelier previews, runway access, and appointment invitations from the ÉTHERE maison.</p>
          </div>
          <form className="vip-form">
            <input aria-label="Name" placeholder="Name" />
            <input aria-label="Email" placeholder="Email" type="email" />
            <button type="button">
              Request Access <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-word">ÉTHERE</div>
        <div className="footer-row">
          <span>Paris</span>
          <span>Maison Futur</span>
          <span>White Couture</span>
          <span>2036</span>
        </div>
      </footer>
    </main>
  );
}
