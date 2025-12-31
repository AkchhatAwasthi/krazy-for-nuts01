import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-brown-800 to-brown-900 text-beige-50">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-gold-500 to-gold-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-inter font-bold text-brown-900 mb-4">
            Get Exclusive Offers & dry fruits knowledge.
          </h3>
          <p className="text-lg md:text-xl font-inter text-brown-800 mb-8 max-w-2xl mx-auto">
            Join our community and receive premium recipes, health benefits, and special discounts directly in your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full border-0 focus:ring-4 focus:ring-brown-300 font-inter text-brown-800 placeholder-brown-600"
            />
            <button className="bg-brown-800 hover:bg-brown-900 text-beige-50 font-inter font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Untitled_design-removebg-preview.png" 
                alt="K-R-A-Z-Y for Nuts Logo" 
                className="h-12 w-auto"
              />
              <h3 className="text-2xl font-inter font-bold text-beige-50">K-R-A-Z-Y for Nuts</h3>
            </div>
            <p className="text-beige-200 font-inter leading-relaxed mb-8 text-base">
              Premium quality dry fruits sourced directly from nature's finest orchards, 
              bringing you the freshest nuts with unmatched taste and nutrition
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="bg-brown-700 hover:bg-gold-600 p-3 rounded-full transition-all duration-300 group">
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="bg-brown-700 hover:bg-gold-600 p-3 rounded-full transition-all duration-300 group">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="bg-brown-700 hover:bg-gold-600 p-3 rounded-full transition-all duration-300 group">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="bg-brown-700 hover:bg-gold-600 p-3 rounded-full transition-all duration-300 group">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-inter font-bold mb-6 text-gold-400">Quick Links</h4>
            <ul className="space-y-4 font-inter">
              <li><a href="/" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Home</a></li>
              <li><a href="/products" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Dry Fruit Delights</a></li>
              <li><a href="/crisps-sips" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Crisps & Sips</a></li>
              <li><a href="/gift-boxes" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Gift Boxes</a></li>
              <li><a href="#" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">About Us</a></li>
              <li><a href="#" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Contact</a></li>
              <li><a href="#" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Gift Cards</a></li>
              <li><a href="#" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Bulk Orders</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xl font-inter font-bold mb-6 text-gold-400">Categories</h4>
            <ul className="space-y-4 font-inter">
              <li><a href="#" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Premium Almonds</a></li>
              <li><a href="#" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Roasted Cashews</a></li>
              <li><a href="#" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Turkish Pistachios</a></li>
              <li><a href="#" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Mixed Nuts</a></li>
              <li><a href="#" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Gift Boxes</a></li>
              <li><a href="#" className="text-beige-200 hover:text-gold-400 transition-all duration-300 hover:translate-x-2 inline-block text-base">Organic Collection</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-inter font-bold mb-6 text-gold-400">Contact Us</h4>
            <div className="space-y-5 font-inter">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-beige-200 text-base">+91 9831130580</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-beige-200 text-base">+91 8697797654</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <span className="text-beige-200 text-base">krazyfornuts@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                <span className="text-beige-200 text-base leading-relaxed">
                  SHREE JAGDAMBA TRADERS<br />
                  125, TIRATH EXOTICA, Salua Mondal Para, <br />
                  Ground Floor, Rajarhat, Block-A, Shop No. 1 & 2,<br />
                  Kolkata-700136
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brown-700 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center font-inter">
            <p className="text-beige-300 mb-4 md:mb-0 text-base">
              © 2024 K-R-A-Z-Y for Nuts. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <a href="#" className="text-beige-200 hover:text-gold-400 transition-colors duration-300 text-base">Privacy Policy</a>
              <a href="#" className="text-beige-200 hover:text-gold-400 transition-colors duration-300 text-base">Terms of Service</a>
              <a href="#" className="text-beige-200 hover:text-gold-400 transition-colors duration-300 text-base">Shipping Info</a>
              <a href="#" className="text-beige-200 hover:text-gold-400 transition-colors duration-300 text-base">Returns</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;