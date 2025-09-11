import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ChevronDown, Brain, Map, Target, Users, Zap, Award, Globe } from 'lucide-react';

const About = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationIdRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    sceneRef.current = { scene, camera, renderer };

    // Particle system
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;
      
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Floating geometric shapes
    const shapes = [];
    const geometries = [
      new THREE.OctahedronGeometry(0.5),
      new THREE.TetrahedronGeometry(0.6),
      new THREE.IcosahedronGeometry(0.4),
      new THREE.DodecahedronGeometry(0.5)
    ];
    
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6),
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Rotate particles
      particleSystem.rotation.x += 0.001;
      particleSystem.rotation.y += 0.002;
      
      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.001;
        shape.rotation.y += 0.003 + index * 0.0005;
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });
      
      // Camera movement based on scroll
      camera.position.x = Math.sin(Number(scrollY) * 0.001) * 2;
      camera.position.y = Math.cos(Number(scrollY) * 0.001) * 1;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section
      const sections = document.querySelectorAll('.section') as NodeListOf<HTMLElement>;
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Aptitude Testing",
      description: "Advanced AI algorithms analyze student strengths and learning patterns to provide personalized course and career recommendations.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Dynamic Career Mapping",
      description: "Interactive visualizations that connect academic degrees to real industry opportunities and career pathways.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Geo-Tagged Directory",
      description: "Intelligent map-based college finder with real-time course updates and admission requirements.",
      color: "from-green-500 to-teal-500"
    }
  ];

  const impacts = [
    { label: "Educational Impact", value: "Improved enrollment & reduced dropouts", icon: <Award /> },
    { label: "Social Equity", value: "Democratized career guidance access", icon: <Users /> },
    { label: "Economic Growth", value: "Future-ready workforce development", icon: <Zap /> },
    { label: "Environmental", value: "Digital platform reducing waste", icon: <Globe /> }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background */}
      <div 
        ref={mountRef} 
        className="fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(20,20,40,0.8) 0%, rgba(0,0,0,0.9) 100%)' }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="section min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-6xl mx-auto">
            <div className="mb-8 transform transition-all duration-1000 ease-out"
                 style={{ 
                   transform: `translateY(${scrollY * 0.3}px) scale(${Math.max(0.8, 1 - scrollY * 0.0003)})`,
                   opacity: Math.max(0.3, 1 - scrollY * 0.001)
                 }}>
              <h1 className="text-8xl md:text-9xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                VORTEX
              </h1>
              <div className="text-2xl md:text-4xl font-light mb-8 text-cyan-300">
                Smart India Hackathon 2025
              </div>
              <div className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                One-Stop Personalized Career & Education Advisor
                <br />
                <span className="text-purple-400 font-semibold">Problem Statement ID: SIH25094</span>
              </div>
            </div>
            
            <div className="animate-bounce">
              <ChevronDown className="w-12 h-12 mx-auto text-blue-400" />
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="section min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-200 mb-16">
              Empowering every Indian student with 
              <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text font-bold"> personalized career guidance</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`group p-8 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 border border-opacity-20 border-white hover:scale-105 transform transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animation: activeSection >= 1 ? 'slideUp 0.8s ease-out forwards' : 'none'
                  }}
                >
                  <div className={`mb-6 p-4 rounded-full bg-gradient-to-br ${feature.color} inline-block group-hover:rotate-12 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="section min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold text-center mb-16 bg-gradient-to-r from-red-400 via-yellow-500 to-pink-500 bg-clip-text text-transparent">
              Tech Arsenal
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { category: "Frontend", techs: ["React JS", "Redux", "Tailwind CSS"], color: "from-blue-500 to-purple-600" },
                { category: "Backend", techs: ["Node JS", "Express JS", "PostgreSQL"], color: "from-green-500 to-teal-600" },
                { category: "AI/ML", techs: ["OpenAI GPT", "LLaMA 2", "LangChain"], color: "from-orange-500 to-red-600" },
                { category: "Deployment", techs: ["Vercel", "Google Maps API"], color: "from-pink-500 to-purple-600" }
              ].map((stack, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl bg-gradient-to-br ${stack.color} bg-opacity-10 border border-opacity-30 border-white hover:scale-105 transform transition-all duration-500`}
                >
                  <h3 className="text-2xl font-bold mb-4 text-center text-white">
                    {stack.category}
                  </h3>
                  <div className="space-y-2">
                    {stack.techs.map((tech, techIndex) => (
                      <div 
                        key={techIndex}
                        className="text-center p-2 rounded-lg bg-black bg-opacity-30 text-gray-200 hover:text-white hover:bg-opacity-50 transition-all duration-300"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="section min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Impact & Vision
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {impacts.map((impact, index) => (
                <div 
                  key={index}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-opacity-10 border border-opacity-20 border-white hover:scale-105 transform transition-all duration-700 hover:shadow-2xl"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mr-4 group-hover:rotate-12 transition-transform duration-300">
                      {impact.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {impact.label}
                    </h3>
                  </div>
                  <p className="text-xl text-gray-200 leading-relaxed">
                    {impact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competitive Advantage */}
        <section className="section min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-16 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              Why Vortex Wins
            </h2>
            
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-700 mb-12">
              <div className="overflow-x-auto">
                <table className="w-full text-left table-fixed">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="pb-4 px-6 text-xl font-bold text-cyan-400 w-1/3">Feature</th>
                      <th className="pb-4 px-6 text-xl font-bold text-green-400 w-1/3">CareerPath (Our App)</th>
                      <th className="pb-4 px-6 text-lg text-gray-400 w-1/3">Competitors</th>
                    </tr>
                  </thead>
                  <tbody className="text-lg">
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-6 font-semibold text-purple-300">Aptitude Test</td>
                      <td className="py-4 px-6 text-green-400 font-bold">✓ Advanced AI</td>
                      <td className="py-4 px-6 text-red-400">✗ Limited/None</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-6 font-semibold text-purple-300">Career Mapping</td>
                      <td className="py-4 px-6 text-green-400 font-bold">✓ Interactive & Dynamic</td>
                      <td className="py-4 px-6 text-yellow-400">◐ Basic/Static</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-6 font-semibold text-purple-300">AI Recommendations</td>
                      <td className="py-4 px-6 text-green-400 font-bold">✓ Personalized ML</td>
                      <td className="py-4 px-6 text-red-400">✗ Generic/None</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-purple-300">User Experience</td>
                      <td className="py-4 px-6 text-green-400 font-bold">★★★★★ Premium</td>
                      <td className="py-4 px-6 text-yellow-400">★★☆☆☆ Average</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="text-2xl md:text-3xl font-light text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text">
              The future of career guidance is here.
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="section py-20 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Ready to Transform Education?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join us in revolutionizing how students discover their perfect career paths.
            </p>
            <div className="text-gray-500">
              <p>Team Vortex • Smart India Hackathon 2025</p>
              <p className="mt-2">Building the future, one student at a time.</p>
            </div>
          </div>
        </footer>
      </div>
      
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .section {
          scroll-snap-align: start;
        }
        
        html {
          scroll-snap-type: y proximity;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;