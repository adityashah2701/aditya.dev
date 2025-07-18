import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { User, Heart, Coffee, Code2, Lightbulb, Rocket, Target, Award, Zap, Brain, Users } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [countingStats, setCountingStats] = useState(false);
  const [hasCountedStats, setHasCountedStats] = useState(false);

  const stats = [
    { icon: Code2, value: 50, suffix: "+", label: "Projects Completed", color: "from-blue-400 to-purple-600" },
    { icon: Coffee, value: 2000, suffix: "+", label: "Coffee Cups", color: "from-amber-400 to-orange-600" },
    { icon: Heart, value: 100, suffix: "%", label: "Client Satisfaction", color: "from-pink-400 to-red-600" },
    { icon: Award, value: 3, suffix: "+", label: "Years Experience", color: "from-green-400 to-emerald-600" }
  ];

  const journey = [
    {
      year: "2021",
      title: "Started Programming",
      description: "Fell in love with coding and began learning JavaScript",
      icon: Lightbulb,
      color: "from-yellow-400 to-orange-500",
      achievement: "First Hello World!"
    },
    {
      year: "2022",
      title: "First Full Stack Project",
      description: "Built my first complete web application with React and Node.js",
      icon: Rocket,
      color: "from-blue-400 to-purple-500",
      achievement: "10+ Technologies Learned"
    },
    {
      year: "2023",
      title: "Freelance Developer",
      description: "Started working with clients and building production applications",
      icon: Target,
      color: "from-green-400 to-emerald-500",
      achievement: "20+ Happy Clients"
    },
    {
      year: "2024",
      title: "Full Stack Expert",
      description: "Mastered modern web technologies and cloud deployment",
      icon: Award,
      color: "from-purple-400 to-pink-500",
      achievement: "Expert Level Reached"
    }
  ];

  const qualities = [
    {
      title: "Problem Solver",
      description: "I love tackling complex challenges and finding elegant solutions that make a real impact.",
      icon: Brain,
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "Team Player",
      description: "Collaboration and communication are the foundation of every successful project.",
      icon: Users,
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Continuous Learner",
      description: "Always staying ahead with the latest technologies and industry best practices.",
      icon: Zap,
      color: "from-yellow-400 to-orange-500"
    }
  ];

  const skillCategories = [
    { name: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind"], color: "from-blue-400 to-purple-500" },
    { name: "Backend", skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"], color: "from-green-400 to-emerald-500" },
    { name: "Tools", skills: ["Git", "Docker", "AWS", "Figma"], color: "from-orange-400 to-red-500" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasCountedStats) {
            setTimeout(() => {
              setCountingStats(true);
              setHasCountedStats(true);
            }, 500);
          }
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [hasCountedStats]);

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

  const timelineVariants = {
    hidden: { 
      opacity: 0,
      x: -50 
    },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut"
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

  // Counter animation for stats - runs only once
  const CountingNumber = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (!countingStats || hasAnimated) return;
      
      setHasAnimated(true);
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutProgress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, [countingStats, end, duration, hasAnimated]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <section id="about" className="min-h-screen relative py-20 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
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
        className="absolute top-20 right-20 w-32 h-32 border-2 border-amber-400/20 rounded-full"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-24 h-24 border-2 border-purple-400/20"
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
            <User className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 font-medium">About Me</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Who I{' '}
            <motion.span 
              className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Am
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            I'm a passionate developer who loves creating beautiful, functional, and user-friendly applications. 
            Here's a bit more about my journey and what drives me.
          </motion.p>
        </motion.div>

        {/* Animated Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
        >
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center group cursor-pointer"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "rgba(251, 191, 36, 0.4)",
                  boxShadow: "0 20px 40px rgba(251, 191, 36, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredStat(index)}
                onHoverEnd={() => setHoveredStat(null)}
              >
                <motion.div 
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4`}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <StatIcon className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.h3 
                  className="text-3xl font-bold text-white mb-2"
                  animate={hoveredStat === index ? { 
                    scale: 1.1,
                    color: "#fbbf24"
                  } : {}}
                >
                  <CountingNumber end={stat.value} suffix={stat.suffix} />
                </motion.h3>
                
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </p>

                {/* Particle effect on hover */}
                {hoveredStat === index && (
                  <motion.div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-amber-400 rounded-full"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [1, 0.5, 0],
                          x: Math.random() * 200 - 100,
                          y: Math.random() * 200 - 100
                        }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        style={{
                          left: "50%",
                          top: "50%"
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Personal Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Story Section */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              whileHover={{ 
                borderColor: "rgba(251, 191, 36, 0.3)",
                boxShadow: "0 0 30px rgba(251, 191, 36, 0.1)"
              }}
            >
              <motion.h3 
                className="text-2xl font-bold text-white mb-6 flex items-center"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <User className="w-6 h-6 mr-3 text-amber-400" />
                My Story
              </motion.h3>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  My journey into programming began with curiosity and has evolved into a genuine passion for creating digital solutions that make a difference. What started as a hobby quickly became my career focus.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  I believe in writing clean, maintainable code and creating user experiences that are both beautiful and functional. Every project is an opportunity to learn something new and push the boundaries of what's possible.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
                </motion.p>
              </div>
            </motion.div>

            {/* Qualities Section */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
              whileHover={{ 
                borderColor: "rgba(251, 191, 36, 0.3)",
                boxShadow: "0 0 30px rgba(251, 191, 36, 0.1)"
              }}
            >
              <motion.h3 
                className="text-2xl font-bold text-white mb-6 flex items-center"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Heart className="w-6 h-6 mr-3 text-amber-400" />
                What Drives Me
              </motion.h3>
              
              <div className="space-y-4">
                {qualities.map((quality, index) => {
                  const QualityIcon = quality.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 group cursor-pointer"
                      whileHover={{ 
                        backgroundColor: "rgba(255,255,255,0.15)",
                        scale: 1.02,
                        x: 10
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + index * 0.2 }}
                    >
                      <motion.div 
                        className={`p-2 rounded-lg bg-gradient-to-r ${quality.color}`}
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 360
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <QualityIcon className="w-5 h-5 text-white" />
                      </motion.div>
                      
                      <div>
                        <h4 className="text-white font-medium group-hover:text-amber-300 transition-colors">
                          {quality.title}
                        </h4>
                        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                          {quality.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 sticky top-8"
              whileHover={{ 
                borderColor: "rgba(251, 191, 36, 0.3)",
                boxShadow: "0 0 30px rgba(251, 191, 36, 0.1)"
              }}
            >
              <motion.h3 
                className="text-2xl font-bold text-white mb-8 flex items-center"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Rocket className="w-6 h-6 mr-3 text-amber-400" />
                My Journey
              </motion.h3>
              
              <div className="space-y-8">
                {journey.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className="relative"
                      custom={index}
                      variants={timelineVariants}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                    >
                      {/* Timeline Line */}
                      {index !== journey.length - 1 && (
                        <motion.div 
                          className="absolute left-6 top-14 w-0.5 h-16 bg-gradient-to-b from-amber-400/50 to-transparent"
                          initial={{ height: 0 }}
                          animate={{ height: 64 }}
                          transition={{ delay: 1 + index * 0.3, duration: 0.5 }}
                        />
                      )}
                      
                      <motion.div 
                        className="flex items-start space-x-4 group cursor-pointer"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className={`p-3 rounded-xl bg-gradient-to-r ${item.color} relative z-10`}
                          whileHover={{ 
                            scale: 1.2,
                            rotate: 360,
                            boxShadow: "0 0 30px rgba(255,255,255,0.5)"
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <ItemIcon className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <motion.span 
                              className="text-sm font-bold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full"
                              whileHover={{ scale: 1.1 }}
                            >
                              {item.year}
                            </motion.span>
                            <motion.span 
                              className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.5 + index * 0.3 }}
                            >
                              {item.achievement}
                            </motion.span>
                          </div>
                          
                          <motion.h4 
                            className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            {item.title}
                          </motion.h4>
                          
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;