
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ShieldCheck, ShoppingBag } from 'lucide-react';
import QRCode from 'qrcode.react';

const CustomerFooter = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: "About Us", path: "/about" },
    { label: "Careers", path: "/careers" },
    { label: "Press", path: "/press" },
    { label: "Blog", path: "/blog" },
  ];

  const helpLinks = [
    { label: "Contact Us", path: "/contact" },
    { label: "FAQs", path: "/help" },
    { label: "Shipping Information", path: "/shipping" },
    { label: "Returns & Exchanges", path: "/returns" },
    { label: "Track Order", path: "/track-order" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Cookie Policy", path: "/cookies" },
  ];
  
  const socialIcons = [
    { icon: Facebook, href: "https://facebook.com/kalartz", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/kalartz", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/kalartz", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/kalartz", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/kalartz", label: "Youtube" },
  ];

  return (
    <footer className="bg-slate-800 text-slate-300 border-t border-slate-700">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Top section: Links and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Logo and Brief */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/62e67930-f4e8-4ec4-a65d-cbee00a9d575/2d4e61dba6bbe8e092f7a2fff0d23cfd.png" alt="Kalartz Logo" className="h-10 w-auto filter brightness-0 invert" />
              <span className="text-2xl font-bold text-white">Kalartz</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Discover quality, variety, and convenience. Your trusted online marketplace for everything you need.
            </p>
             <div className="bg-slate-700 p-3 rounded-lg inline-block shadow-md">
                <QRCode value={typeof window !== 'undefined' ? window.location.origin + "/app-download-page-placeholder" : "https://kalartz.example.com"} size={70} fgColor="#ffffff" bgColor="#334155" level="H"/>
            </div>
            <p className="text-xs text-slate-400">Scan for quick access or app info.</p>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <span className="text-lg font-semibold text-white block mb-3">Company</span>
            {companyLinks.map(link => (
              <Link key={link.label} to={link.path} className="block text-sm hover:text-purple-400 transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Help & Support */}
          <div className="space-y-3">
            <span className="text-lg font-semibold text-white block mb-3">Help & Support</span>
            {helpLinks.map(link => (
              <Link key={link.label} to={link.path} className="block text-sm hover:text-purple-400 transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Contact Info */}
           <div className="space-y-3">
            <span className="text-lg font-semibold text-white block mb-3">Contact Us</span>
            <a href="mailto:support@kalartz.com" className="flex items-center text-sm hover:text-purple-400 transition-colors duration-200">
              <Mail className="w-4 h-4 mr-2.5 flex-shrink-0" /> support@kalartz.com
            </a>
            <a href="tel:+1234567890" className="flex items-center text-sm hover:text-purple-400 transition-colors duration-200">
              <Phone className="w-4 h-4 mr-2.5 flex-shrink-0" /> +1 (234) 567-890
            </a>
            <div className="flex items-start text-sm">
              <MapPin className="w-4 h-4 mr-2.5 mt-0.5 flex-shrink-0" /> 
              <span>123 Kalartz Avenue,<br/>Innovation City, Webland 404</span>
            </div>
          </div>
        </div>

        {/* Middle section: Social Media and Newsletter (optional) */}
        <div className="border-t border-slate-700 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex space-x-5">
            {socialIcons.map(social => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                 className="text-slate-400 hover:text-purple-400 transition-colors duration-200">
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          {/* Placeholder for a newsletter signup if needed in future */}
          {/* <form className="flex gap-2 w-full md:w-auto max-w-sm">
            <Input type="email" placeholder="Your email for newsletter" className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-purple-500 flex-grow" />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Subscribe</Button>
          </form> */}
        </div>

        {/* Bottom section: Copyright and Legal Links */}
        <div className="border-t border-slate-700 pt-8 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400">
            &copy; {currentYear} Kalartz. All rights reserved. Platform by Hostinger Horizons.
          </p>
          <div className="flex space-x-4">
            {legalLinks.map(link => (
              <Link key={link.label} to={link.path} className="hover:text-purple-400 transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;