import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineMenuFold, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigationOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleNavItemClick = (item) => {
    console.log(`Navigating to ${item}`);
    setIsOpen(false);
    
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Animation variants
  const overlayVariants = {
    hidden: { 
      opacity: 0,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const slideVariants = {
    hidden: { 
      x: "-100%",
      opacity: 0,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const navItemVariants = {
    hidden: { 
      y: 50,
      opacity: 0,
      scale: 0.8,
      rotateX: -45
    },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: index * 0.1 + 0.2,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }),
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      y: 0
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      rotate: 180,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.9 }
  };

  const starVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (index) => ({
      scale: 1,
      opacity: [0, 1, 0],
      transition: {
        delay: index * 0.1,
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    })
  };

  const orbVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (index) => ({
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.4, 0.2],
      rotate: 360,
      transition: {
        delay: index * 0.2,
        duration: 4,
        repeat: Infinity,
        repeatType: "loop"
      }
    })
  };

  const rippleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (index) => ({
      scale: [1, 2, 3],
      opacity: [0.4, 0.2, 0],
      transition: {
        delay: index * 0.5,
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    })
  };

  const decorativeVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: (index) => ({
      scale: 1,
      rotate: 0,
      opacity: 0.3,
      transition: {
        delay: index * 0.3 + 0.5,
        duration: 0.8,
        ease: "backOut"
      }
    }),
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <>
      {/* Backdrop overlay with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm"
            onClick={handleNavigationOpen}
          />
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="px-4 sm:px-8 md:px-16 lg:px-20 py-4 flex items-center justify-between backdrop-blur-md fixed top-0 left-0 w-full z-40"
      >
        {/* Logo Section */}
        <motion.div 
          variants={logoVariants}
          whileHover="hover"
          className="logo flex items-center justify-between h-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
            CODE x AADI
          </h1>
        </motion.div>

        {/* Menu Button */}
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleNavigationOpen}
          className="text-2xl sm:text-3xl font-black text-amber-400 hover:text-orange-500 transition-colors duration-300 focus:outline-none p-2 rounded-full"
          aria-label="Toggle navigation menu"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer "
          >
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenuFold />}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Sliding Menu with enhanced animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 left-0 h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-2xl z-50 flex flex-col items-center justify-center overflow-hidden w-full sm:w-96 md:w-[500px] lg:w-[600px]"
          >
            {/* Animated Background Stars */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={starVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Gradient Orbs */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`orb-${i}`}
                  custom={i}
                  variants={orbVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute rounded-full bg-gradient-to-r from-amber-400/20 to-orange-500/20 blur-xl"
                  style={{
                    width: `${Math.random() * 200 + 100}px`,
                    height: `${Math.random() * 200 + 100}px`,
                    left: `${Math.random() * 80}%`,
                    top: `${Math.random() * 80}%`,
                  }}
                />
              ))}
            </div>

            {/* Ripple Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[96, 64, 32].map((size, index) => (
                <motion.div
                  key={size}
                  custom={index}
                  variants={rippleVariants}
                  initial="hidden"
                  animate="visible"
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-${size} h-${size} rounded-full border-2 border-amber-400/30`}
                />
              ))}
            </div>

            {/* Close Button inside sliding menu */}
            <div className="absolute top-4 right-4 z-20">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNavigationOpen}
                className="text-3xl sm:text-4xl font-black text-white hover:text-amber-400 transition-colors duration-300 focus:outline-none p-2"
                aria-label="Close navigation menu"
              >
                <AiOutlineClose />
              </motion.button>
            </div>

            {/* Navigation Links with enhanced animations */}
            <ul className="flex flex-col items-center space-y-8 px-6 relative z-10">
              {[
                { name: "HOME", section: "home" },
                { name: "ABOUT", section: "about" },
                { name: "SKILLS", section: "skills" },
                { name: "PROJECTS", section: "projects" },
                { name: "CONTACT", section: "contact" }
              ].map((item, index) => (
                <motion.li 
                  key={item.name}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative"
                >
                  <motion.button
                    onClick={() => handleNavItemClick(item.section)}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-amber-400 hover:via-orange-500 hover:to-amber-600 hover:bg-clip-text cursor-pointer transition-all duration-300 relative group px-6 py-3 rounded-2xl hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg border border-transparent hover:border-amber-500/30"
                    whileHover={{
                      boxShadow: "0 0 30px rgba(251, 191, 36, 0.3)",
                    }}
                  >
                    {item.name}
                    
                    {/* Animated underline */}
                    <motion.span 
                      className="absolute bottom-1 left-6 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "calc(100% - 3rem)" }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Hover particle effects */}
                    <motion.div className="absolute inset-0 rounded-2xl overflow-hidden">
                      {[
                        { size: 4, color: "amber-400", delay: 0 },
                        { size: 3, color: "orange-500", delay: 0.1 },
                        { size: 2, color: "purple-400", delay: 0.2 }
                      ].map((particle, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-${particle.size} h-${particle.size} bg-${particle.color} rounded-full`}
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ 
                            scale: [0, 1, 0],
                            opacity: [0, 0.6, 0],
                            x: [0, Math.random() * 20 - 10],
                            y: [0, Math.random() * 20 - 10]
                          }}
                          transition={{ 
                            duration: 1,
                            delay: particle.delay,
                            repeat: Infinity 
                          }}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.button>
                </motion.li>
              ))}
            </ul>

            {/* Enhanced Decorative Elements */}
            {[
              { size: 16, colors: "from-amber-400 to-orange-500", position: "top-8 right-8", delay: 0 },
              { size: 12, colors: "from-purple-400 to-blue-500", position: "bottom-8 left-8", delay: 1 },
              { size: 8, colors: "from-blue-400 to-purple-500", position: "top-1/4 left-12", delay: 2 },
              { size: 6, colors: "from-orange-400 to-amber-500", position: "bottom-1/4 right-12", delay: 3 }
            ].map((decoration, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={decorativeVariants}
                initial="hidden"
                animate={["visible", "animate"]}
                className={`absolute w-${decoration.size} h-${decoration.size} bg-gradient-to-r ${decoration.colors} rounded-full ${decoration.position}`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;