import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaLeaf,
  FaAward,
  FaShippingFast
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const footerLinks = {
  price: {
    "Packs Under 1000": "/dry-fruits/packs-under-1000",
    "Packs Under 2000": "/dry-fruits/packs-under-2000",
    "Packs Under 3000": "/dry-fruits/packs-under-3000",
    "Packs Under 5000": "/dry-fruits/packs-under-5000",
  },
  dryFruitsUsage: {
    "Used in Sheer Khurma": "/dry-fruits/sheer-khurma",
    "Used in Sweets": "/dry-fruits/sweets",
    "Used in Savories": "/dry-fruits/savories",
  },
  about: {
    "Our Story": "/about/story",
    "Our Sourcing": "/about/sourcing",
    Sustainability: "/about/sustainability",
    "Contact Us": "/contact",
  },
  offers: {
    "Festive Offers": "/offers/festive",
    "Seasonal Discounts": "/offers/seasonal",
    "Combo Deals": "/offers/combo",
  },
};

export default function Footer({ bgImage = "src/assets/dryfruits-footer.jpg" }) {
  const containerRef = useRef();
  const [footerMinHeight, setFooterMinHeight] = useState("auto");

  useEffect(() => {
    function handleResize() {
      const vh = window.innerHeight;
      const y = containerRef.current?.getBoundingClientRect()?.top || 0;
      setFooterMinHeight(`${Math.max(vh - y, 250)}px`);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      className="relative w-full bg-no-repeat bg-cover bg-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 63, 41, 0.9), rgba(34, 63, 41, 0.9)), url(${bgImage})`,
        minHeight: footerMinHeight,
      }}
      ref={containerRef}
    >
      {/* Top decorative border */}
      <div className="w-full h-2 bg-gradient-to-r from-amber-500 to-emerald-600"></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col h-full justify-between">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-10 flex-grow">
          {/* Brand section - spans 2 columns on larger screens */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-amber-500 p-2 rounded-lg mr-3">
                <FaLeaf className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-amber-400">FOOD - O</h2>
            </div>
            
            <p className="text-gray-200 mb-6 text-sm leading-relaxed max-w-md">
              Premium quality dry fruits and nuts sourced directly from farms. 
              We bring nature's finest to your doorstep with care and commitment to quality.
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center bg-white/10 py-1 px-3 rounded-full">
                <FaAward className="text-amber-400 mr-1" />
                <span className="text-xs">Premium Quality</span>
              </div>
              <div className="flex items-center bg-white/10 py-1 px-3 rounded-full">
                <FaShippingFast className="text-amber-400 mr-1" />
                <span className="text-xs">Fast Delivery</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3 mt-auto">
              {[
                {
                  href: "https://wa.me/919011233445",
                  icon: <FaWhatsapp className="text-lg" />,
                  color: "hover:bg-green-500 bg-white/20",
                  title: "WhatsApp"
                },
                {
                  href: "https://facebook.com/dryfruits",
                  icon: <FaFacebookF className="text-lg" />,
                  color: "hover:bg-blue-600 bg-white/20",
                  title: "Facebook"
                },
                {
                  href: "https://instagram.com/dryfruits",
                  icon: <FaInstagram className="text-lg" />,
                  color: "hover:bg-pink-500 bg-white/20",
                  title: "Instagram"
                },
                {
                  href: "https://x.com/dryfruits",
                  icon: <FaTwitter className="text-lg" />,
                  color: "hover:bg-black bg-white/20",
                  title: "Twitter"
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white transition-all duration-300 transform hover:-translate-y-1 ${item.color}`}
                  title={item.title}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop By Price */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
              Shop by Price
            </h3>
            <nav className="flex flex-col space-y-3">
              {Object.entries(footerLinks.price).map(([text, link]) => (
                <a 
                  key={text} 
                  href={link} 
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center group text-sm"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {text}
                </a>
              ))}
            </nav>
          </div>

          {/* Dry Fruits Usage */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
              Usage Ideas
            </h3>
            <nav className="flex flex-col space-y-3">
              {Object.entries(footerLinks.dryFruitsUsage).map(([text, link]) => (
                <a 
                  key={text} 
                  href={link} 
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center group text-sm"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {text}
                </a>
              ))}
            </nav>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
              About Us
            </h3>
            <nav className="flex flex-col space-y-3">
              {Object.entries(footerLinks.about).map(([text, link]) => (
                <a 
                  key={text} 
                  href={link} 
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center group text-sm"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {text}
                </a>
              ))}
            </nav>
          </div>

          {/* Offers & Contact */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
              Offers & Contact
            </h3>
            
            {/* Offers */}
            <nav className="flex flex-col space-y-3 mb-6">
              {Object.entries(footerLinks.offers).map(([text, link]) => (
                <a 
                  key={text} 
                  href={link} 
                  className="text-gray-300 hover:text-amber-400 transition-colors flex items-center group text-sm"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {text}
                </a>
              ))}
            </nav>
            
            {/* Contact Info */}
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-medium mb-3 text-amber-300 flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                Contact Info
              </h4>
              
              <div className="space-y-2">
                <p className="text-sm flex items-center">
                  <FaPhoneAlt className="text-amber-400 mr-2" />
                  <a
                    href="tel:+919011233445"
                    className="hover:text-amber-300 transition"
                  >
                    +91 7775980069
                  </a>
                </p>

                <p className="text-sm flex items-center">
                  <FaClock className="text-amber-400 mr-2" />
                  Mon-Sat 10AM - 6PM IST
                </p>

                <p className="text-sm flex items-center">
                  <FaEnvelope className="text-amber-400 mr-2" />
                  <a
                    href="mailto:help@dryfruits.com"
                    className="hover:text-amber-300 transition"
                  >
                    foodoindia@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-center text-gray-300 text-sm mb-3 md:mb-0">
            &copy; {new Date().getFullYear()} FOOD - O. All rights reserved.
          </p>
          
          <div className="flex items-center text-xs text-gray-400">
            <span>Made with</span>
            <FaHeart className="text-red-400 mx-1" />
            <span>for nature lovers</span>
          </div>
          
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a href="/privacy" className="text-gray-300 hover:text-amber-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-300 hover:text-amber-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="/refund" className="text-gray-300 hover:text-amber-400 text-sm transition-colors">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}