import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Globe, Palette, Server, Zap, Monitor, Smartphone, Award, Star, TrendingUp } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [animateProgress, setAnimateProgress] = useState(false);

  const skillCategories = [
    {
      title: "Frontend",
      icon: Monitor,
      color: "from-blue-400 to-purple-600",
      bgColor: "from-blue-500/20 to-purple-500/20",
      skills: [
        { name: "React", level: 95, color: "from-blue-400 to-blue-600", description: "Component architecture & hooks" },
        { name: "TypeScript", level: 88, color: "from-blue-500 to-indigo-600", description: "Type safety & enterprise apps" },
        { name: "Next.js", level: 85, color: "from-gray-600 to-gray-800", description: "SSR & full-stack development" },
        { name: "Tailwind CSS", level: 92, color: "from-cyan-400 to-blue-500", description: "Utility-first styling" },
        { name: "JavaScript", level: 90, color: "from-yellow-400 to-orange-500", description: "ES6+ & modern features" },
        { name: "HTML/CSS", level: 93, color: "from-orange-400 to-red-500", description: "Semantic & responsive design" }
      ]
    },
    {
      title: "Backend",
      icon: Server,
      color: "from-green-400 to-emerald-600",
      bgColor: "from-green-500/20 to-emerald-500/20",
      skills: [
        { name: "Node.js", level: 87, color: "from-green-400 to-green-600", description: "Server-side JavaScript" },
        { name: "Express.js", level: 85, color: "from-gray-500 to-gray-700", description: "Web application framework" },
        { name: "Python", level: 78, color: "from-blue-400 to-yellow-500", description: "Django & data processing" },
        { name: "RESTful APIs", level: 90, color: "from-purple-400 to-pink-500", description: "API design & development" },
        { name: "GraphQL", level: 75, color: "from-pink-400 to-purple-500", description: "Query language for APIs" },
        { name: "Socket.io", level: 80, color: "from-indigo-400 to-purple-500", description: "Real-time communication" }
      ]
    },
    {
      title: "Database",
      icon: Database,
      color: "from-orange-400 to-red-600",
      bgColor: "from-orange-500/20 to-red-500/20",
      skills: [
        { name: "MongoDB", level: 85, color: "from-green-500 to-emerald-600", description: "NoSQL document database" },
        { name: "PostgreSQL", level: 80, color: "from-blue-500 to-indigo-600", description: "Relational database design" },
        { name: "Firebase", level: 88, color: "from-yellow-400 to-orange-500", description: "Real-time cloud database" },
        { name: "Redis", level: 75, color: "from-red-400 to-red-600", description: "In-memory data caching" },
        { name: "Supabase", level: 82, color: "from-green-400 to-teal-500", description: "Open source Firebase alternative" }
      ]
    },
    {
      title: "Tools & Cloud",
      icon: Globe,
      color: "from-purple-400 to-pink-600",
      bgColor: "from-purple-500/20 to-pink-500/20",
      skills: [
        { name: "AWS", level: 78, color: "from-orange-400 to-yellow-500", description: "Cloud infrastructure & services" },
        { name: "Docker", level: 75, color: "from-blue-400 to-cyan-500", description: "Containerization & deployment" },
        { name: "Git", level: 92, color: "from-orange-500 to-red-500", description: "Version control & collaboration" },
        { name: "Vercel", level: 88, color: "from-gray-600 to-gray-800", description: "Frontend deployment platform" },
        { name: "Netlify", level: 85, color: "from-teal-400 to-cyan-500", description: "JAMstack deployment" }
      ]
    }
  ];

  const certifications = [
    {
      title: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2024",
      status: "In Progress",
      icon: Globe,
      color: "from-orange-400 to-yellow-500"
    },
    {
      title: "React Developer Certification",
      issuer: "Meta",
      year: "2023",
      status: "Completed",
      icon: Code,
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Full Stack Web Development",
      issuer: "FreeCodeCamp",
      year: "2023",
      status: "Completed",
      icon: Monitor,
      color: "from-green-400 to-emerald-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateProgress(true), 800);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
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

  const tabVariants = {
    inactive: { 
      scale: 1,
      backgroundColor: "rgba(255,255,255,0.05)",
      borderColor: "rgba(255,255,255,0.1)"
    },
    active: { 
      scale: 1.05,
      backgroundColor: "linear-gradient(135deg, #f59e0b, #ea580c)",
      borderColor: "rgba(251, 191, 36, 0.5)",
      boxShadow: "0 10px 30px rgba(251, 191, 36, 0.3)"
    },
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(255,255,255,0.1)",
      borderColor: "rgba(251, 191, 36, 0.3)"
    }
  };

  const skillCardVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      scale: 0.9
    },
    visible: (index) => ({
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      y: -5,
      backgroundColor: "rgba(255,255,255,0.15)",
      transition: { duration: 0.2 }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.3
      }
    })
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="skills" className="min-h-screen relative py-20 overflow-hidden">
      {/* Enhanced Background Elements */}
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
              duration: Math.random() * 4 + 2,
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

      {/* Floating geometric shapes */}
      <motion.div 
        className="absolute top-32 right-16 w-20 h-20 border-2 border-blue-400/20 rounded-lg rotate-45"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute bottom-32 left-16 w-16 h-16 border-2 border-purple-400/20 rounded-full"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      />

      <motion.div 
        className="relative z-10 container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.div 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-amber-500/30 mb-6"
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(251, 191, 36, 0.6)",
              boxShadow: "0 0 30px rgba(251, 191, 36, 0.3)"
            }}
          >
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 font-medium">Skills & Expertise</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What I{' '}
            <motion.span 
              className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Know
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            A comprehensive overview of my technical skills and the technologies I use to bring ideas to life.
          </motion.p>
        </motion.div>

        {/* Interactive Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          {skillCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full border backdrop-blur-sm font-medium transition-colors duration-300 ${
                  activeCategory === index
                    ? 'text-white'
                    : 'text-gray-300'
                }`}
                variants={tabVariants}
                initial="inactive"
                animate={activeCategory === index ? "active" : "inactive"}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={activeCategory === index ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CategoryIcon className="w-5 h-5" />
                </motion.div>
                <span>{category.title}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Animated Skills Grid */}
        <motion.div className="mb-20" variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                borderColor: "rgba(251, 191, 36, 0.3)",
                boxShadow: "0 0 40px rgba(251, 191, 36, 0.1)"
              }}
            >
              {(() => {
                const ActiveCategoryIcon = skillCategories[activeCategory].icon;
                return (
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-8 flex items-center"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className={`p-2 rounded-lg bg-gradient-to-r ${skillCategories[activeCategory].color} mr-3`}
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ActiveCategoryIcon className="w-6 h-6 text-white" />
                    </motion.div>
                    {skillCategories[activeCategory].title} Skills
                  </motion.h3>
                );
              })()}
              
              <div className="grid md:grid-cols-2 gap-6">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    custom={index}
                    variants={skillCardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-white/5 rounded-2xl p-6 group cursor-pointer border border-white/10"
                    onHoverStart={() => setHoveredSkill(index)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${skill.color}`}
                          animate={hoveredSkill === index ? { scale: [1, 1.3, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="text-white font-medium group-hover:text-amber-300 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <motion.span 
                        className="text-amber-400 font-bold"
                        animate={hoveredSkill === index ? { scale: 1.1 } : { scale: 1 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3 overflow-hidden">
                      <motion.div 
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color} relative`}
                        custom={skill.level}
                        variants={progressVariants}
                        initial="hidden"
                        animate={animateProgress ? "visible" : "hidden"}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={hoveredSkill === index ? { x: ["-100%", "100%"] } : {}}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        />
                      </motion.div>
                    </div>
                    
                    <motion.p 
                      className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors"
                      initial={{ opacity: 0, height: 0 }}
                      animate={hoveredSkill === index ? { opacity: 1, height: "auto" } : { opacity: 0.7, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {skill.description}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Certifications */}
        <motion.div variants={itemVariants}>
          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            whileHover={{ 
              borderColor: "rgba(251, 191, 36, 0.3)",
              boxShadow: "0 0 40px rgba(251, 191, 36, 0.1)"
            }}
          >
            <motion.h3 
              className="text-2xl font-bold text-white mb-8 flex items-center"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="p-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 mr-3"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
              Certifications & Learning
            </motion.h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => {
                const CertIcon = cert.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white/5 rounded-2xl p-6 group border border-white/10"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.03,
                      y: -5,
                      borderColor: "rgba(251, 191, 36, 0.4)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <motion.div 
                        className={`p-2 rounded-lg bg-gradient-to-r ${cert.color}`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CertIcon className="w-5 h-5 text-white" />
                      </motion.div>
                      <motion.span 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          cert.status === 'Completed' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {cert.status}
                      </motion.span>
                    </div>
                    
                    <motion.h4 
                      className="text-white font-medium group-hover:text-amber-300 transition-colors mb-2"
                      whileHover={{ x: 5 }}
                    >
                      {cert.title}
                    </motion.h4>
                    
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors mb-1">
                      {cert.issuer}
                    </p>
                    
                    <motion.p 
                      className="text-amber-400 text-xs font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      {cert.year}
                    </motion.p>

                    {/* Hover effect particles */}
                    <motion.div 
                      className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-amber-400 rounded-full"
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                            x: Math.random() * 200,
                            y: Math.random() * 200
                          }}
                          transition={{
                            duration: 1,
                            delay: i * 0.2,
                            repeat: Infinity
                          }}
                          style={{
                            left: "50%",
                            top: "50%"
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;