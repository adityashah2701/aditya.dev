import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Terminal, Zap, Globe, Database, Cpu, ChevronDown, Github, Linkedin, Mail, ExternalLink, Play, Pause } from 'lucide-react';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isCodePlaying, setIsCodePlaying] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);

  const roles = [
    "Full Stack Developer",
    "React Specialist", 
    "Node.js Expert",
    "UI/UX Designer",
    "Problem Solver"
  ];

  const codeLines = [
    "const developer = {",
    "  name: 'Aadi',",
    "  passion: 'Creating Magic',",
    "  skills: ['React', 'Node.js'],",
    "  status: 'Building Dreams',",
    "  mission: 'Code + Creativity',",
    "};",
    "",
    "developer.createAmazingApps();"
  ];

  const floatingElements = [
    { icon: Code, label: "Clean Code", delay: 0, color: "from-blue-400 to-blue-600" },
    { icon: Zap, label: "Fast Performance", delay: 0.5, color: "from-yellow-400 to-orange-500" },
    { icon: Globe, label: "Global Reach", delay: 1, color: "from-green-400 to-emerald-500" },
    { icon: Terminal, label: "Modern Tech", delay: 1.5, color: "from-purple-400 to-purple-600" },
    { icon: Database, label: "Scalable DB", delay: 2, color: "from-pink-400 to-pink-600" },
    { icon: Cpu, label: "Optimized", delay: 2.5, color: "from-indigo-400 to-indigo-600" }
  ];

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const roleInterval = setInterval(() => {
      setCurrentRole(prev => (prev + 1) % roles.length);
    }, 3000);

    return () => {
      clearInterval(roleInterval);
    };
  }, [roles.length]);

  useEffect(() => {
    if (isCodePlaying) {
      const codeInterval = setInterval(() => {
        setCurrentLine(prev => (prev + 1) % codeLines.length);
      }, 1000);
      return () => clearInterval(codeInterval);
    }
  }, [isCodePlaying, codeLines.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const codeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="home" className="min-h-screen relative pt-16 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Main Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            
            {/* Greeting */}
            <div className="space-y-4">
              <motion.div 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-500/30"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(251, 191, 36, 0.6)",
                  boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-amber-300 font-medium">Available for hire</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Hi, I'm{' '}
                <motion.span 
                  className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0%", "100%", "0%"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Aadi
                </motion.span>
              </motion.h1>
              
              <div className="text-2xl lg:text-3xl text-gray-300 h-12 overflow-hidden">
                I'm a{' '}
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={currentRole}
                    className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold inline-block"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {roles[currentRole]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Description */}
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed max-w-2xl"
              variants={itemVariants}
            >
              I craft exceptional digital experiences with modern technologies. 
              Passionate about clean code, innovative solutions, and turning complex problems into elegant applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
              <motion.button 
                onClick={scrollToProjects}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span 
                  className="relative z-10 flex items-center space-x-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>View My Work</span>
                  <ExternalLink className="w-5 h-5" />
                </motion.span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.button 
                className="px-8 py-4 border-2 border-amber-500/50 text-amber-400 font-bold rounded-full"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(251, 191, 36, 0.1)",
                  borderColor: "rgba(251, 191, 36, 0.8)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div className="flex space-x-6 pt-4" variants={itemVariants}>
              {[
                { icon: Github, href: "#", label: "GitHub", color: "from-gray-400 to-gray-600" },
                { icon: Linkedin, href: "#", label: "LinkedIn", color: "from-blue-400 to-blue-600" },
                { icon: Mail, href: "#", label: "Email", color: "from-red-400 to-red-600" }
              ].map((social, index) => {
                const SocialIcon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="group p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 text-white"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "rgba(251, 191, 36, 0.2)",
                      borderColor: "rgba(251, 191, 36, 0.5)",
                      boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <SocialIcon className="w-6 h-6 group-hover:text-amber-400 transition-colors duration-300" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Code Terminal */}
          <motion.div 
            className="relative"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Floating Tech Icons */}
            <div className="absolute inset-0 pointer-events-none">
              {floatingElements.map((element, index) => {
                const IconComponent = element.icon;
                return (
                  <motion.div
                    key={index}
                    className={`absolute w-12 h-12 rounded-full bg-gradient-to-r ${element.color} p-3 shadow-lg`}
                    style={{
                      left: `${15 + (index % 3) * 30}%`,
                      top: `${20 + Math.floor(index / 3) * 25}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 0.7, 
                      scale: 1,
                      y: [-10, 10, -10],
                      rotate: [-5, 5, -5]
                    }}
                    transition={{
                      delay: element.delay,
                      duration: 0.6,
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      opacity: 1,
                      boxShadow: "0 0 30px rgba(255,255,255,0.3)"
                    }}
                  >
                    <IconComponent className="w-full h-full text-white" />
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Code Terminal */}
            <motion.div 
              className="relative z-10 bg-slate-900/90 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl"
              whileHover={{ 
                borderColor: "rgba(251, 191, 36, 0.5)",
                boxShadow: "0 0 40px rgba(251, 191, 36, 0.2)"
              }}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-4 bg-slate-800/80 border-b border-slate-700/50">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm font-mono">~/developer-portfolio</span>
                <motion.button
                  onClick={() => setIsCodePlaying(!isCodePlaying)}
                  className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors bg-slate-700/50 px-3 py-1 rounded-md"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  title={isCodePlaying ? "Pause animation" : "Play animation"}
                >
                  {isCodePlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span className="text-xs font-mono">{isCodePlaying ? "PAUSE" : "PLAY"}</span>
                </motion.button>
              </div>

              {/* Terminal Content */}
              <div className="p-6 h-80 overflow-hidden">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-green-400 font-mono">aadi@portfolio:</span>
                  <motion.span 
                    className="text-blue-400 font-mono"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ~$
                  </motion.span>
                  <motion.div
                    className="w-2 h-5 bg-amber-400"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>

                <div className="space-y-2 font-mono text-sm">
                  {codeLines.map((line, index) => (
                    <AnimatePresence key={index}>
                      {index <= currentLine && (
                        <motion.div
                          variants={codeVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={`${
                            line.includes('name') ? 'text-blue-400' :
                            line.includes('passion') ? 'text-purple-400' :
                            line.includes('skills') ? 'text-green-400' :
                            line.includes('status') ? 'text-yellow-400' :
                            line.includes('mission') ? 'text-pink-400' :
                            line.includes('const') || line.includes('};') ? 'text-red-400' :
                            line.includes('createAmazingApps') ? 'text-amber-400' :
                            'text-gray-300'
                          }`}
                        >
                          {line || '\u00A0'}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}
                </div>

                {/* Terminal Output */}
                <motion.div 
                  className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-600/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: codeLines.length * 1 + 1 }}
                >
                  <div className="text-green-400 font-mono text-sm">
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨ Magic Application Created Successfully! ✨
                    </motion.div>
                    <div className="text-gray-400 mt-2">
                      Status: Ready to build amazing things
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Dashboard */}
            <motion.div 
              className="mt-6 grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {[
                { label: "Projects", value: "50+", color: "from-blue-500 to-purple-500" },
                { label: "Experience", value: "3Y+", color: "from-green-500 to-emerald-500" },
                { label: "Happy Clients", value: "25+", color: "from-orange-500 to-red-500" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(251, 191, 36, 0.3)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center space-y-2 text-amber-400">
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Interactive Floating Code Snippets */}
      <motion.div 
        className="absolute top-16 right-4 lg:right-16 opacity-20 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
        animate={{ 
          opacity: 0.3, 
          scale: 1, 
          rotate: 12,
          y: [-5, 5, -5],
          x: [-2, 2, -2]
        }}
        transition={{
          opacity: { delay: 2, duration: 1 },
          scale: { delay: 2, duration: 1 },
          rotate: { delay: 2, duration: 1 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 },
          x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }
        }}
        whileHover={{ 
          opacity: 0.7, 
          scale: 1.05,
          rotate: 0,
          transition: { duration: 0.3 }
        }}
      >
        <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-md rounded-xl p-6 border border-amber-500/20 shadow-2xl min-w-[280px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400 font-mono">innovation.js</span>
          </div>
          <pre className="text-sm leading-relaxed">
            <code>
              <span className="text-purple-400">const</span> <span className="text-blue-300">innovation</span> <span className="text-gray-300">=</span> <span className="text-yellow-400">()</span> <span className="text-gray-300">=&gt; {`{`}</span>
              <br />
              <span className="text-gray-400">  // Building the future</span>
              <br />
              <span className="text-purple-400">  return</span> <span className="text-green-300">creativity</span> <span className="text-amber-400">+</span> <span className="text-green-300">code</span><span className="text-gray-300">;</span>
              <br />
              <span className="text-gray-300">{`};`}</span>
            </code>
          </pre>
          <div className="mt-3 flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">Ready to innovate</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-16 left-4 lg:left-16 opacity-20 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        animate={{ 
          opacity: 0.3, 
          scale: 1, 
          rotate: -12,
          y: [5, -5, 5],
          x: [2, -2, 2]
        }}
        transition={{
          opacity: { delay: 3, duration: 1 },
          scale: { delay: 3, duration: 1 },
          rotate: { delay: 3, duration: 1 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 },
          x: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }
        }}
        whileHover={{ 
          opacity: 0.7, 
          scale: 1.05,
          rotate: 0,
          transition: { duration: 0.3 }
        }}
      >
        <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-md rounded-xl p-6 border border-purple-500/20 shadow-2xl min-w-[300px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400 font-mono">dreamBig.ts</span>
          </div>
          <pre className="text-sm leading-relaxed">
            <code>
              <span className="text-blue-400">function</span> <span className="text-yellow-300">dreamBig</span><span className="text-gray-300">()</span> <span className="text-gray-300">{`{`}</span>
              <br />
              <span className="text-purple-400">  while</span><span className="text-gray-300">(</span><span className="text-green-300">coding</span><span className="text-gray-300">) {`{`}</span>
              <br />
              <span className="text-green-300">    create</span><span className="text-gray-300">.</span><span className="text-pink-400">magic</span><span className="text-gray-300">();</span>
              <br />
              <span className="text-gray-300">  {`}`}</span>
              <br />
              <span className="text-gray-300">{`}`}</span>
            </code>
          </pre>
          <div className="mt-3 flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-purple-400 font-mono">Executing dreams...</span>
          </div>
        </div>
      </motion.div>

      {/* Additional floating code snippet */}
      <motion.div 
        className="absolute top-1/2 right-2 lg:right-8 opacity-15 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, scale: 0.7, rotate: 25 }}
        animate={{ 
          opacity: 0.25, 
          scale: 1, 
          rotate: 20,
          y: [-8, 8, -8],
          x: [-3, 3, -3]
        }}
        transition={{
          opacity: { delay: 4, duration: 1 },
          scale: { delay: 4, duration: 1 },
          rotate: { delay: 4, duration: 1 },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 },
          x: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }
        }}
        whileHover={{ 
          opacity: 0.6, 
          scale: 1.05,
          rotate: 0,
          transition: { duration: 0.3 }
        }}
      >
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-blue-500/20 shadow-xl min-w-[220px]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400 font-mono">magic.jsx</span>
          </div>
          <pre className="text-xs leading-relaxed">
            <code>
              <span className="text-cyan-400">export</span> <span className="text-purple-400">const</span> <span className="text-blue-300">Magic</span> <span className="text-gray-300">= () =&gt; {`{`}</span>
              <br />
              <span className="text-purple-400">  return</span> <span className="text-amber-400">&lt;</span><span className="text-red-400">Dreams</span> <span className="text-green-400">reality</span><span className="text-gray-300">=</span><span className="text-yellow-400">{`{true}`}</span> <span className="text-amber-400">/&gt;</span><span className="text-gray-300">;</span>
              <br />
              <span className="text-gray-300">{`};`}</span>
            </code>
          </pre>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;