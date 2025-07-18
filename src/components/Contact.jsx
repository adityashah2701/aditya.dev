import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "aadi@example.com",
      description: "Send me an email",
      color: "from-amber-400 to-orange-600",
      href: "mailto:aadi@example.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Call me directly",
      color: "from-amber-400 to-orange-600",
      href: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      description: "Available for remote work",
      color: "from-amber-400 to-orange-600",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "https://github.com",
      color: "from-amber-400 to-orange-600"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://linkedin.com",
      color: "from-amber-400 to-orange-600"
    },
    {
      icon: Twitter,
      name: "Twitter",
      href: "https://twitter.com",
      color: "from-amber-400 to-orange-600"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="min-h-screen relative py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-amber-500/30 mb-6">
            <MessageCircle className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 font-medium">Get In Touch</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Let's{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className={`grid md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {contactInfo.map((info, index) => {
            const InfoIcon = info.icon;
            return (
              <a
                key={index}
                href={info.href}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10 text-center"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${info.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <InfoIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {info.title}
                </h3>
                <p className="text-gray-300 font-medium mb-1 group-hover:text-white transition-colors">
                  {info.value}
                </p>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {info.description}
                </p>
              </a>
            );
          })}
        </div>

        {/* Contact Form & Social */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-amber-500/20 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Send className="w-6 h-6 mr-3 text-amber-400" />
                Send Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:bg-white/20 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:bg-white/20 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:bg-white/20 transition-all duration-300"
                    placeholder="Project discussion"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:bg-white/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </form>
            </div>
          </div>

          {/* Social & Additional Info */}
          <div className={`space-y-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-amber-500/20 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Github className="w-6 h-6 mr-3 text-amber-400" />
                Connect Online
              </h3>
              
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/30 transition-all duration-300 group"
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${social.color} group-hover:scale-110 transition-transform duration-300`}>
                        <SocialIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium group-hover:text-amber-300 transition-colors">
                          {social.name}
                        </h4>
                        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                          Follow me on {social.name}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-amber-500/20 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-amber-400" />
                Availability
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium">Available for new projects</span>
                </div>
                <div className="text-gray-300 space-y-2">
                  <p>• Response time: Within 24 hours</p>
                  <p>• Time zone: PST (UTC-8)</p>
                  <p>• Preferred communication: Email, Slack</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;