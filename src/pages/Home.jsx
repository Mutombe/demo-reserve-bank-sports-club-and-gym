import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowDown, MapPin, Phone, WhatsappLogo, Star, Quotes,
  CaretLeft, CaretRight, CheckCircle, Lightning, Heart, Users, Trophy, Timer, Fire,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import siteData from '../data/siteData';

const iconMap = { Heart, Star, Lightning, Trophy, Users, Timer, Fire };

function AnimatedCounter({ target, suffix = '', duration = 2.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10) || 0;
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = numericTarget / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) { setCount(numericTarget); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, numericTarget, duration]);
  return <span ref={ref}>{inView ? count.toLocaleString() : '0'}{suffix}</span>;
}

function NoiseTexture({ opacity = 0.035 }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10" style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat', backgroundSize: '128px 128px',
    }} />
  );
}

function NeonParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {[...Array(18)].map((_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: `${Math.random() * 4 + 2}px`, height: `${Math.random() * 4 + 2}px`,
          background: `radial-gradient(circle, rgba(255,193,7,${Math.random() * 0.5 + 0.2}) 0%, transparent 70%)`,
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          animation: `sparkle-float ${Math.random() * 8 + 6}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }} />
      ))}
    </div>
  );
}

/* ================================================================
   1. HERO — Dark with Neon Accent Glow
   ================================================================ */
function HeroSection() {
  const { business, hero } = siteData;
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = hero.backgroundImages?.map(img => img.url) || [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=80',
  ];
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] overflow-hidden bg-black">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <AnimatePresence mode="sync">
          <motion.img key={currentSlide} src={heroImages[currentSlide]}
            alt={hero.backgroundImages?.[currentSlide]?.alt || 'Reserve Bank Sports Club'}
            className="absolute inset-0 w-full h-[130%] object-cover object-center"
            initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }} loading="eager" />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/95 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40 z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FFC107]/10 to-transparent z-[2]" />
      </motion.div>
      <NeonParticles />
      <NoiseTexture opacity={0.04} />
      <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)}
            className={`w-[3px] transition-all duration-700 ${i === currentSlide ? 'h-10 bg-[#FFC107]' : 'h-4 bg-white/20 hover:bg-white/40'}`}
            aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
      <div className="absolute top-[15%] left-0 w-[3px] h-32 sm:h-48 bg-gradient-to-b from-transparent via-[#FFC107] to-transparent z-20"
        style={{ boxShadow: '0 0 20px rgba(255,193,7,0.4)' }} />
      <motion.div className="relative z-20 flex flex-col justify-center h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36"
        style={{ y: textY, opacity }}>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="w-16 h-[3px] bg-gradient-to-r from-[#FFC107] to-[#FFC107]/50 mb-6 origin-left"
          style={{ boxShadow: '0 0 15px rgba(255,193,7,0.5)' }} />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[#FFC107] text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] mb-8"
          style={{ fontFamily: 'var(--font-sans)' }}>
          {hero.badge || "Harare's Premier Fitness Destination"}
        </motion.p>
        <div className="overflow-hidden">
          {(hero.titleLines || ['ELEVATE', 'YOUR', 'GAME.']).map((line, i) => (
            <motion.div key={line} initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}>
              <h1 className={`font-heading leading-[0.92] tracking-tight ${i === 1 ? 'text-[#FFC107]' : 'text-white'}`}
                style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', fontWeight: i === 1 ? 800 : 300,
                  textShadow: i === 1 ? '0 0 40px rgba(255,193,7,0.3)' : 'none' }}>
                {line}
              </h1>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center gap-3 mt-8">
          <div className="w-8 h-[2px] bg-[#FFC107]/60" />
          <p className="text-white/30 text-xs sm:text-sm uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>
            {hero.trustLine || '3.9 Stars \u00b7 237+ Reviews \u00b7 Harare, Zimbabwe'}
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }} className="flex flex-wrap gap-4 mt-10">
          <Link to="/contact"
            className="group relative inline-flex items-center gap-3 bg-[#FFC107] text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:shadow-xl hover:shadow-[#FFC107]/30"
            style={{ fontFamily: 'var(--font-sans)' }}>
            {hero.ctaPrimary || 'Start Your Journey'}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/services"
            className="group inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:border-[#FFC107]/50 hover:text-[#FFC107]"
            style={{ fontFamily: 'var(--font-sans)' }}>
            {hero.ctaSecondary || 'View Programs'}
          </Link>
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-white/20 text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-sans)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ArrowDown size={14} className="text-[#FFC107]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   2. HORIZONTAL STATS STRIP
   ================================================================ */
function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { stats } = siteData;
  const defaults = [{ number: '31', label: 'Google Reviews' }, { number: '4.5', label: 'Star Rating' }, { number: '500', label: 'Active Members' }, { number: '15', label: 'Programs' }];
  const displayStats = stats?.length ? stats : defaults;
  return (
    <section ref={ref} className="relative bg-black border-y border-[#FFC107]/15 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFC107]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFC107]/40 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {displayStats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.12 }}
              className="text-center relative">
              <div className="font-heading text-[#FFC107] leading-none font-bold"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', textShadow: '0 0 30px rgba(255,193,7,0.2)' }}>
                <AnimatedCounter target={String(stat.number).replace(/[^0-9]/g, '')} suffix={String(stat.number).replace(/[0-9]/g, '')} />
              </div>
              <div className="text-white/30 text-xs sm:text-sm uppercase tracking-[0.25em] mt-3" style={{ fontFamily: 'var(--font-sans)' }}>{stat.label}</div>
              {i < displayStats.length - 1 && <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-[1px] bg-gradient-to-b from-transparent via-[#FFC107]/15 to-transparent" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   3. MARQUEE
   ================================================================ */
function MarqueeTicker() {
  const items = siteData.marqueeItems || ['STRENGTH', 'CARDIO', 'HIIT', 'YOGA', 'BOXING', 'CROSSFIT', 'SPINNING', 'PERSONAL TRAINING'];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className="bg-[#FFC107] py-4 sm:py-5 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-6 sm:gap-8 mx-6 sm:mx-8">
            <span className="text-white font-heading text-base sm:text-xl font-bold tracking-wider uppercase">{item}</span>
            <span className="text-white/30 text-sm">&diams;</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   4. SERVICES IMAGE GRID
   ================================================================ */
function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { servicesPreview, services } = siteData;
  const fallbackImages = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  ];
  return (
    <section ref={ref} className="bg-neutral-950 py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-14 sm:mb-20">
          <div className="w-12 h-[3px] bg-[#FFC107] mb-6" style={{ boxShadow: '0 0 10px rgba(255,193,7,0.4)' }} />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-[#FFC107]/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Our Programs</p>
              <h2 className="font-heading text-white leading-[0.92] font-bold" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Train Your <span className="text-[#FFC107]">Way</span>
              </h2>
            </div>
            <Link to="/services" className="group text-white/30 text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:text-[#FFC107] transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}>All Programs <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {(servicesPreview || []).slice(0, 6).map((service, i) => {
            const IconComp = iconMap[service.icon] || iconMap[service.iconName] || Star;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08 * i }}
                className={i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}>
                <Link to={`/services#${services?.items?.[i]?.slug || ''}`}
                  className={`group relative block overflow-hidden ${i === 0 ? 'aspect-[16/9] sm:aspect-[2/1]' : 'aspect-[3/4]'}`}>
                  <img src={service.image || fallbackImages[i] || fallbackImages[0]} alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 opacity-90" />
                  <div className="absolute top-4 right-5 z-10">
                    <span className="text-[#FFC107]/10 font-heading text-6xl sm:text-7xl font-bold leading-none">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="absolute top-5 left-5 z-10 w-10 h-10 bg-[#FFC107] flex items-center justify-center">
                    <IconComp size={18} weight="fill" className="text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                    <h3 className="font-heading text-white text-xl sm:text-2xl font-bold tracking-wide mb-2">{service.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{service.desc}</p>
                    <div className="flex items-center gap-2 mt-3 text-[#FFC107] group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>Explore</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFC107] to-[#FFC107]/60 z-10" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   5. ABOUT SECTION
   ================================================================ */
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { business, about } = siteData;
  const points = about?.highlights || [
    'State-of-the-art equipment and facilities',
    'Certified professional trainers',
    'Group classes for all fitness levels',
    'Flexible membership plans',
  ];
  return (
    <section ref={ref} className="bg-black py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}>
            <div className="w-12 h-[3px] bg-[#FFC107] mb-6" />
            <p className="text-[#FFC107]/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Who We Are</p>
            <h2 className="font-heading text-white leading-[0.95] font-bold mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              More Than A <span className="text-[#FFC107]">Gym</span>
            </h2>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 max-w-lg" style={{ fontFamily: 'var(--font-sans)' }}>
              {about?.description || "Located at the heart of Harare on Fifth Avenue, Reserve Bank Sports Club is where passion meets performance. We've built a community of dedicated athletes, weekend warriors, and first-time gym-goers \u2014 all unified by the desire to be better than yesterday."}
            </p>
            <div className="space-y-4 mb-10">
              {points.map((point, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FFC107] flex items-center justify-center shrink-0">
                    <CheckCircle size={14} weight="fill" className="text-white" />
                  </div>
                  <span className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>{typeof point === 'string' ? point : point.text || point.title}</span>
                </motion.div>
              ))}
            </div>
            <Link to="/about" className="group inline-flex items-center gap-3 text-[#FFC107] text-sm uppercase tracking-[0.15em] font-semibold hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}>Our Full Story <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }} className="relative">
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80" alt="Reserve Bank Sports Club floor"
                className="w-full aspect-[4/5] object-cover object-center" loading="eager" />
            </div>
            <div className="absolute -top-3 -right-3 w-20 h-20 border-t-[3px] border-r-[3px] border-[#FFC107]/40" />
            <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-[3px] border-l-[3px] border-[#FFC107]/40" />
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#FFC107] text-white p-5 sm:p-6">
              <div className="text-center">
                <div className="font-heading text-3xl sm:text-4xl font-bold leading-none">{business.rating || 3.9}</div>
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, j) => <Star key={j} size={10} weight="fill" className="text-white/80" />)}
                </div>
                <div className="text-white/70 text-[9px] uppercase tracking-[0.15em] mt-1" style={{ fontFamily: 'var(--font-sans)' }}>Google</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   6. CLASS SCHEDULE
   ================================================================ */
function SchedulePreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const classes = [
    { time: '06:00', name: 'Rise & Grind', trainer: 'Coach Brian', level: 'All Levels' },
    { time: '08:00', name: 'Strength & Conditioning', trainer: 'Coach Sarah', level: 'Intermediate' },
    { time: '10:00', name: 'Yoga Flow', trainer: 'Coach Fari', level: 'Beginner' },
    { time: '16:00', name: 'Boxing Bootcamp', trainer: 'Coach Kuda', level: 'Advanced' },
    { time: '18:00', name: 'Spinning Class', trainer: 'Coach Tatenda', level: 'All Levels' },
  ];
  return (
    <section ref={ref} className="bg-black py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center mb-14 sm:mb-20">
          <div className="w-12 h-[3px] bg-[#FFC107] mx-auto mb-6" />
          <p className="text-[#FFC107]/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Today's Classes</p>
          <h2 className="font-heading text-white leading-[0.95] font-bold" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            Class <span className="text-[#FFC107]">Schedule</span>
          </h2>
        </motion.div>
        <div className="space-y-2">
          {classes.map((cls, i) => (
            <motion.div key={cls.name} initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex items-center justify-between bg-neutral-950 border border-white/5 p-5 sm:p-6 hover:border-[#FFC107]/20 hover:bg-[#FFC107]/5 transition-all duration-500">
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="text-[#FFC107] font-heading text-xl sm:text-2xl font-bold w-16 sm:w-20">{cls.time}</span>
                <div>
                  <h4 className="text-white font-heading text-base sm:text-lg font-semibold">{cls.name}</h4>
                  <p className="text-white/30 text-xs sm:text-sm" style={{ fontFamily: 'var(--font-sans)' }}>{cls.trainer}</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <span className="text-[#FFC107]/40 text-xs uppercase tracking-wider border border-[#FFC107]/20 px-3 py-1" style={{ fontFamily: 'var(--font-sans)' }}>{cls.level}</span>
                <ArrowRight size={16} className="text-white/10 group-hover:text-[#FFC107] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center mt-10">
          <Link to="/services" className="group inline-flex items-center gap-3 border border-[#FFC107]/30 text-[#FFC107] px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold hover:bg-[#FFC107]/10 transition-all duration-300"
            style={{ fontFamily: 'var(--font-sans)' }}>Full Weekly Schedule <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   7. TESTIMONIALS
   ================================================================ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const { homeTestimonials } = siteData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const defaults = [
    { text: 'Best gym in Harare. The trainers push you to your best every single day.', name: 'Tatenda M.', role: 'Member since 2022', rating: 5 },
    { text: 'The atmosphere is electric. Every session challenges me to grow stronger.', name: 'Chiedza K.', role: 'Fitness Enthusiast', rating: 5 },
    { text: 'Clean facilities, great community, and flexible hours. Everything you need.', name: 'Brian T.', role: 'Personal Training Client', rating: 5 },
  ];
  const testimonials = homeTestimonials?.length ? homeTestimonials : defaults;
  const next = useCallback(() => setActive(prev => (prev + 1) % testimonials.length), [testimonials.length]);
  const prev = useCallback(() => setActive(prev => (prev - 1 + testimonials.length) % testimonials.length), [testimonials.length]);
  useEffect(() => { const timer = setInterval(next, 7000); return () => clearInterval(timer); }, [next]);
  const t = testimonials[active];
  return (
    <section ref={ref} className="relative bg-neutral-950 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <NoiseTexture opacity={0.02} />
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center">
          <Quotes size={48} weight="fill" className="text-[#FFC107]/15 mx-auto mb-8" />
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
              <blockquote className="text-white text-lg sm:text-xl lg:text-2xl leading-relaxed font-heading font-bold mb-10">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center gap-3">
                {t.avatar && <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover object-center border-2 border-[#FFC107]/30" loading="eager" />}
                <div className="w-8 h-[2px] bg-[#FFC107]" />
                <div className="text-white text-sm uppercase tracking-[0.15em] font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>{t.name}</div>
                <div className="text-white/40 text-xs uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-sans)' }}>{t.role}</div>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(t.rating || 5)].map((_, j) => <Star key={j} size={12} weight="fill" className="text-[#FFC107]" />)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-6 mt-12">
            <button onClick={prev} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-[#FFC107] hover:border-[#FFC107]/30 transition-colors" aria-label="Previous"><CaretLeft size={16} /></button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`h-[2px] transition-all duration-500 ${i === active ? 'w-10 bg-[#FFC107]' : 'w-3 bg-white/10'}`} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-[#FFC107] hover:border-[#FFC107]/30 transition-colors" aria-label="Next"><CaretRight size={16} /></button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   8. CTA SECTION
   ================================================================ */
function CTASection() {
  const { business, homeCta } = siteData;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  return (
    <section ref={ref} className="relative py-28 sm:py-36 lg:py-48 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={homeCta?.backgroundImage || 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200&q=80'} alt="Reserve Bank Sports Club"
          className="w-full h-[130%] object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>
      <NoiseTexture opacity={0.03} />
      <div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1 }}>
          <div className="w-16 h-[3px] bg-[#FFC107] mx-auto mb-8" />
          <h2 className="font-heading text-white leading-[0.92] font-bold mb-8" style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)' }}>
            THE GRIND<br /><span className="text-[#FFC107]">NEVER STOPS</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-lg mx-auto mb-12 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            {homeCta?.subtitle || 'Join hundreds of members who have already transformed their lives at Reserve Bank Sports. Your first session is on us.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact"
              className="group inline-flex items-center gap-3 bg-[#FFC107] text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:shadow-xl hover:shadow-[#FFC107]/25"
              style={{ fontFamily: 'var(--font-sans)' }}>
              {homeCta?.ctaPrimary || 'Claim Free Trial'} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={`https://wa.me/${business.whatsappNumber || '263713533988'}?text=${encodeURIComponent(homeCta?.whatsappText || "Hi Reserve Bank Sports! I'd like to learn about membership options.")}`}
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-green-500/40 text-green-400 px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-500 hover:bg-green-500/10"
              style={{ fontFamily: 'var(--font-sans)' }}>
              <WhatsappLogo size={20} weight="fill" /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   9. LOCATION
   ================================================================ */
function LocationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { business } = siteData;
  return (
    <section ref={ref} className="bg-black py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="w-12 h-[3px] bg-[#FFC107] mb-6" />
            <p className="text-[#FFC107]/60 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Find Us</p>
            <h2 className="font-heading text-white leading-[0.95] font-bold mb-8" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
              Visit <span className="text-[#FFC107]">Reserve Bank Sports</span>
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FFC107] flex items-center justify-center shrink-0"><MapPin size={18} weight="fill" className="text-white" /></div>
                <div><h4 className="text-white text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-sans)' }}>Address</h4>
                  <p className="text-white/40 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>{business.address || 'Harare, Zimbabwe'}</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FFC107] flex items-center justify-center shrink-0"><Phone size={18} weight="fill" className="text-white" /></div>
                <div><h4 className="text-white text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-sans)' }}>Phone</h4>
                  <a href={`tel:${business.phone || '+263713533988'}`} className="text-white/40 text-sm hover:text-[#FFC107] transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
                    {business.phone || '+263 71 353 3988'}</a></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FFC107] flex items-center justify-center shrink-0"><WhatsappLogo size={18} weight="fill" className="text-white" /></div>
                <div><h4 className="text-white text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-sans)' }}>WhatsApp</h4>
                  <a href={`https://wa.me/${business.whatsappNumber || '263713533988'}`} target="_blank" rel="noopener noreferrer"
                    className="text-white/40 text-sm hover:text-[#FFC107] transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>Message us on WhatsApp</a></div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }} className="relative aspect-[4/3] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80" alt="Reserve Bank Sports Club"
              className="w-full h-full object-cover object-center" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-4 py-2">
              <MapPin size={14} className="text-[#FFC107]" />
              <span className="text-white text-xs uppercase tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>Harare, Zimbabwe</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <StatsStrip />
      <MarqueeTicker />
      <ServicesGrid />
      <AboutSection />
      <SchedulePreview />
      <TestimonialsSection />
      <CTASection />
      <LocationSection />
    </PageTransition>
  );
}
