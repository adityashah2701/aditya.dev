import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, Folder, Star, GitBranch, Eye, Calendar, Code, Globe, Sparkles, Zap, Rocket, Award } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with modern UI, secure payments, and admin dashboard. Built with React, Node.js, and MongoDB.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      status: "Live",
      github: "https://github.com",
      live: "https://example.com",
      features: ["User Authentication", "Payment Integration", "Admin Dashboard", "Responsive Design"],
      date: "2024",
      stats: { stars: 47, forks: 12, views: "2.1k" },
      gradient: "from-purple-500 via-pink-500 to-red-500"
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with real-time data visualization and scheduling features.",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "frontend",
      technologies: ["Next.js", "TypeScript", "Chart.js", "Tailwind CSS"],
      status: "In Progress",
      github: "https://github.com",
      live: "https://example.com",
      features: ["Real-time Analytics", "Post Scheduling", "Multi-platform Support", "Dark Mode"],
      date: "2024",
      stats: { stars: 32, forks: 8, views: "1.8k" },
      gradient: "from-blue-500 via-cyan-500 to-teal-500"
    },
    {
      id: 3,
      title: "AI Chat Application",
      description: "Intelligent chatbot with OpenAI integration, featuring conversation history and customizable personalities.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "fullstack",
      technologies: ["React", "OpenAI API", "Firebase", "Socket.io"],
      status: "Completed",
      github: "https://github.com",
      live: "https://example.com",
      features: ["AI Integration", "Real-time Chat", "Conversation History", "Custom Personalities"],
      date: "2023",
      stats: { stars: 89, forks: 23, views: "3.4k" },
      gradient: "from-green-400 via-emerald-500 to-teal-600"
    },
    {
      id: 4,
      title: "Task Management App",
      description: "Collaborative task management tool with team features, deadlines, and progress tracking.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "frontend",
      technologies: ["React", "Redux", "Material-UI", "Firebase"],
      status: "Live",
      github: "https://github.com",
      live: "https://example.com",
      features: ["Team Collaboration", "Deadline Tracking", "Progress Analytics", "Mobile App"],
      date: "2023",
      stats: { stars: 56, forks: 15, views: "2.7k" },
      gradient: "from-orange-400 via-red-500 to-pink-600"
    },
    {
      id: 5,
      title: "Weather App",
      description: "Beautiful weather application with detailed forecasts, location search, and weather maps.",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "frontend",
      technologies: ["React", "Weather API", "CSS3", "Chart.js"],
      status: "Live",
      github: "https://github.com",
      live: "https://example.com",
      features: ["Location Search", "7-day Forecast", "Weather Maps", "Responsive Design"],
      date: "2023",
      stats: { stars: 34, forks: 9, views: "1.5k" },
      gradient: "from-indigo-500 via-purple-500 to-pink-500"
    },
    {
      id: 6,
      title: "Blog Platform",
      description: "Content management system with markdown support, user authentication, and SEO optimization.",
      image: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "fullstack",
      technologies: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
      status: "Live",
      github: "https://github.com",
      live: "https://example.com",
      features: ["Markdown Editor", "SEO Optimization", "User Management", "Comment System"],
      date: "2023",
      stats: { stars: 67, forks: 18, views: "3.1k" },
      gradient: "from-yellow-400 via-orange-500 to-red-500"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length, icon: Folder },
    { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length, icon: Rocket },
    { id: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length, icon: Sparkles }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('projects');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse tracking for cursor effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
      rotateX: -45
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.5, 1],
      rotate: [0, 180, 360],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="projects" className="min-h-screen relative py-20 overflow-hidden" ref={sectionRef}>
      {/* Enhanced Background with Parallax */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: 360,
              x: Math.random() * 50 - 25,
              y: Math.random() * 50 - 25
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes with parallax */}
      <motion.div 
        className="absolute top-20 right-20 w-32 h-32 border-2 border-purple-400/30 rounded-lg"
        style={{ y, rotate }}
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute bottom-32 left-20 w-24 h-24 border-2 border-blue-400/30 rounded-full"
        style={{ y: useTransform(y, [0, 1], [0, -50]), rotate: useTransform(rotate, [0, 360], [360, 0]) }}
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full blur-xl"
        style={{ scale }}
        variants={floatingVariants}
        animate="animate"
      />

      <motion.div 
        className="relative z-10 container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Spectacular Header */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.div 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-amber-500/30 mb-6 relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(251, 191, 36, 0.6)",
              boxShadow: "0 0 50px rgba(251, 191, 36, 0.4)"
            }}
          >
           
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Folder className="w-5 h-5 text-amber-400" />
            </motion.div>
            <span className="text-amber-300 font-medium relative z-10">My Work</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Featured{' '}
            <motion.span 
              className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent relative"
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"],
                textShadow: [
                  "0 0 20px rgba(251, 191, 36, 0.5)",
                  "0 0 40px rgba(251, 191, 36, 0.8)",
                  "0 0 20px rgba(251, 191, 36, 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Projects
              {/* Floating sparkles around the text */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                >
                  <Sparkles className="w-full h-full text-amber-400" />
                </motion.div>
              ))}
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            A showcase of my recent work, featuring modern web applications built with cutting-edge technologies.
          </motion.p>
        </motion.div>

        {/* Dynamic Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          {filters.map((filter, index) => {
            const FilterIcon = filter.icon;
            return (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full border backdrop-blur-sm font-medium relative overflow-hidden ${
                  activeFilter === filter.id
                    ? 'text-white'
                    : 'text-gray-300'
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                layout
              >
                {/* Animated background for active state */}
                <AnimatePresence>
                  {activeFilter === filter.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500"
                      layoutId="activeFilterBg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                
                <motion.div
                  className="relative z-10 flex items-center space-x-3"
                  animate={activeFilter === filter.id ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: activeFilter === filter.id ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FilterIcon className="w-5 h-5" />
                  </motion.div>
                  <span>{filter.label}</span>
                  <motion.span 
                    className={`px-2 py-1 rounded-full text-xs ${
                      activeFilter === filter.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {filter.count}
                  </motion.span>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Mind-Blowing Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-white/5 backdrop-blur-sm rounded-md overflow-hidden border border-white/10 group relative flex-shrink-0"
                onHoverStart={() => {
                  setHoveredProject(index);
                  setCursorVariant("project");
                }}
                onHoverEnd={() => {
                  setHoveredProject(null);
                  setCursorVariant("default");
                }}
              >
                {/* Subtle border animation */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent"
                  animate={hoveredProject === index ? {
                    borderColor: ["rgba(251, 191, 36, 0)", "rgba(251, 191, 36, 0.3)", "rgba(251, 191, 36, 0)"]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Project Image with 3D effect */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    variants={imageVariants}
                    whileHover="hover"
                  />
                  
                  {/* Subtle gradient overlay */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 mix-blend-overlay`}
                    animate={hoveredProject === index ? { opacity: 0.3 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Floating action buttons */}
                  <AnimatePresence>
                    {hoveredProject === index && (
                      <motion.div 
                        className="absolute top-4 right-4 flex space-x-2"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <motion.a
                          href={project.github}
                          className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white"
                          whileHover={{ 
                            scale: 1.2, 
                            backgroundColor: "rgba(251, 191, 36, 0.8)",
                            rotate: 360
                          }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="View source code"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          href={project.live}
                          className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white"
                          whileHover={{ 
                            scale: 1.2, 
                            backgroundColor: "rgba(251, 191, 36, 0.8)",
                            rotate: 360
                          }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="View live demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Animated status badge */}
                  <motion.div 
                    className="absolute top-4 left-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      project.status === 'Live' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : project.status === 'In Progress'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {project.status}
                    </span>
                  </motion.div>

                  {/* Project stats */}
                  <motion.div 
                    className="absolute bottom-4 left-4 flex space-x-3 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={hoveredProject === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  >
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="w-3 h-3" />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <GitBranch className="w-3 h-3" />
                      <span>{project.stats.forks}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <Eye className="w-3 h-3" />
                      <span>{project.stats.views}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Enhanced Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <motion.h3 
                      className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {project.title}
                    </motion.h3>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{project.date}</span>
                    </div>
                  </div>

                  <motion.p 
                    className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors"
                  >
                    {project.description}
                  </motion.p>

                  {/* Animated Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium border border-amber-500/30"
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "rgba(251, 191, 36, 0.3)",
                          boxShadow: "0 0 20px rgba(251, 191, 36, 0.4)"
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: techIndex * 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <motion.span 
                        className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs font-medium border border-gray-500/30"
                        whileHover={{ scale: 1.1 }}
                      >
                        +{project.technologies.length - 3} more
                      </motion.span>
                    )}
                  </div>

                  {/* Expandable Features */}
                  <AnimatePresence>
                    {hoveredProject === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/10 pt-4">
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <Star className="w-4 h-4 mr-2 text-amber-400" />
                            Key Features
                          </h4>
                          <ul className="space-y-1">
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Spectacular Action Buttons */}
                  <div className="flex space-x-3 mt-4">
                    <motion.a
                      href={project.live}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(251, 191, 36, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div className="relative z-10 flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span className="text-sm font-medium">Live Demo</span>
                      </motion.div>
                    </motion.a>
                    
                    <motion.a
                      href={project.github}
                      className="flex items-center justify-center px-4 py-2 border border-white/20 text-gray-300 rounded-full relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderColor: "rgba(251, 191, 36, 0.5)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Code className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>

                {/* Subtle hover particles */}
                <AnimatePresence>
                  {hoveredProject === index && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-amber-400 rounded-full"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0, 1, 0],
                            opacity: [0, 0.8, 0],
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50]
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.1,
                            ease: "easeOut"
                          }}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Epic View More Button */}
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <motion.button 
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full overflow-hidden"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {/* Animated particles inside button */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 50 - 25]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>

            {/* Button content */}
            <motion.span className="relative z-10 flex items-center space-x-2">
              <span>View All Projects</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ExternalLink className="w-5 h-5" />
              </motion.div>
            </motion.span>

            {/* Animated background gradient */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Ripple effect on hover */}
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              initial={{ scale: 0, opacity: 0.5 }}
              whileHover={{ 
                scale: 4, 
                opacity: 0,
                transition: { duration: 0.6 }
              }}
            />
          </motion.button>
        </motion.div>

        {/* Subtle achievement badges */}
        <div className="absolute top-20 left-20 pointer-events-none opacity-30">
          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 0.4, x: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              { icon: Award, label: "50+ Projects", color: "from-purple-400 to-pink-500" },
              { icon: Star, label: "500+ Stars", color: "from-yellow-400 to-orange-500" },
              { icon: Zap, label: "3+ Years", color: "from-blue-400 to-cyan-500" }
            ].map((badge, index) => {
              const BadgeIcon = badge.icon;
              return (
                <motion.div
                  key={index}
                  className={`flex items-center space-x-2 bg-gradient-to-r ${badge.color} p-2 rounded-full backdrop-blur-sm`}
                  animate={{
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 1,
                    ease: "easeInOut"
                  }}
                >
                  <BadgeIcon className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-medium">{badge.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Simple project counter */}
        <motion.div
          className="absolute bottom-20 right-20 pointer-events-none opacity-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 0.5, scale: 1 } : {}}
          transition={{ delay: 2, duration: 0.5 }}
        >
         
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;