import React from 'react';
import { Heart, Code, Coffee, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              CODE x AADI
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Building exceptional digital experiences with modern technologies and creative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Made with Love */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Made with</h4>
            <div className="flex items-center space-x-2 text-gray-300">
              <Heart className="w-5 h-5 text-red-400" />
              <span>Love</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Code className="w-5 h-5 text-blue-400" />
              <span>Clean Code</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Coffee className="w-5 h-5 text-amber-400" />
              <span>Lots of Coffee</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Aadi. All rights reserved. Built with React & Tailwind CSS.
          </p>
          
          <button
            onClick={scrollToTop}
            className="group p-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-orange-500 hover:to-amber-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/25"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;