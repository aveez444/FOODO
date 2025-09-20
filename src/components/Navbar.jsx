import { useState, useRef, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown, FaChevronUp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { CartContext } from '../context/CartContext';
import logo from '../assets/logo.png';

const dropdownData = {
  'Dry Fruits': [
    {
      title: 'Dry Fruits for Sheer Khurma',
      items: ['Khajoor (Dates)', 'Kishmish (Raisins)', 'Badam (Almonds)', 'Kaju (Cashews)', 'Pista (Pistachios)', 'Anjeer (Figs)'],
    },
  ],
  Products: [
    {
      title: 'Dry Fruit Packs',
      items: ['Organic Dates', 'Premium Almonds', 'Cashews', 'Pistachios', 'Mixed Dry Fruits', 'Gift Boxes'],
    },
  ],
  Offers: [
    {
      title: 'Special Offers',
      items: ['Festive Discounts', 'Combo Packs', 'Seasonal Deals'],
    },
  ],
};

function Navbar() {
  const { cartCount } = useContext(CartContext);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoHovered, setLogoHovered] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && window.innerWidth >= 768) {
        setSearchExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setSearchExpanded(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    let animationInterval;
    if (logoHovered) {
      animationInterval = setInterval(() => {}, 3000);
    }
    return () => clearInterval(animationInterval);
  }, [logoHovered]);

  return (
    <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg bg-white' : 'bg-white'}`}>
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 w-full py-2 flex items-center justify-center text-white text-sm select-none px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <MdLocalShipping className="text-amber-200" />
              <span className="hidden xs:inline">Free shipping on orders above ₹999</span>
              <span className="xs:hidden">Free shipping above ₹999</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <FaPhoneAlt className="text-amber-200 text-xs" />
              <span>+91 98765 43210</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <FaEnvelope className="text-amber-200" />
              <span>info@foodo.com</span>
            </div>
            <div className="flex gap-3">
              <Link to="/track-order" className="hover:text-amber-200 transition">Track Order</Link>
              <Link to="/contact" className="hover:text-amber-200 transition">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link
          to="/home"
          className="flex items-center gap-3 z-10 group"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <div className="relative">
            <img
              src={logo}
              alt="Food-o Logo"
              className={`h-10 transition-all duration-1000 ${logoHovered ? 'animate-pulse' : ''}`}
            />
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 bg-amber-500 rounded-full ${logoHovered ? 'animate-ping' : ''}`}></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-amber-600 transition-colors">FOOD - O</span>
            <span className="text-xs text-amber-600 font-medium -mt-1">Premium Dry Fruits</span>
          </div>
        </Link>
        <ul className="hidden lg:flex gap-8 font-medium relative" ref={dropdownRef}>
          {['Home', 'Dry Fruits', 'Products', 'Offers', 'About'].map((link) => (
            <li
              key={link}
              className="relative cursor-pointer group"
              onMouseEnter={() => setActiveDropdown(link)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink
                to={link === 'Home' ? '/home' : `/${link.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) =>
                  `pb-1 transition-all duration-300 flex items-center gap-1 ${
                    isActive ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'
                  }`
                }
              >
                {link}
                {dropdownData[link] && dropdownData[link].length > 0 && (
                  <FaChevronDown className="text-xs mt-0.5 transition-transform duration-300 group-hover:rotate-180" />
                )}
              </NavLink>
              {dropdownData[link] && activeDropdown === link && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-xl rounded-lg p-4 z-50 border border-gray-100 animate-fadeIn">
                  <div className={`grid ${dropdownData[link].length > 1 ? 'grid-cols-2 gap-4' : 'grid-cols-1'}`}>
                    {dropdownData[link].map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-gray-800 mb-2 text-base border-b border-amber-100 pb-1">
                          {section.title}
                        </h4>
                        <ul className="space-y-1 text-gray-600">
                          {section.items.map((item, i) => (
                            <li key={i}>
                              <Link
                                to={`/${link.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="flex items-center py-1 px-2 rounded-md hover:bg-amber-50 hover:text-amber-700 transition-all group/item text-sm"
                              >
                                <span className="flex-1 truncate">{item}</span>
                                <span className="text-amber-500 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                  <FaChevronDown className="rotate-90 text-xs" />
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {link === 'Dry Fruits' && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <Link
                        to="/dry-fruits"
                        className="flex items-center justify-center gap-1 text-amber-600 font-medium hover:text-amber-700 transition text-sm"
                      >
                        View All Dry Fruits
                        <FaChevronDown className="rotate-90 text-xs" />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-5">
          <div
            ref={searchRef}
            className={`flex items-center rounded-full transition-all duration-300 overflow-hidden ${
              searchExpanded ? 'bg-white shadow-lg border border-amber-200 pl-4 pr-2 py-1' : 'bg-amber-50 hover:bg-amber-100 pl-4 pr-4 py-1'
            }`}
          >
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchExpanded ? 'Search dry fruits...' : ''}
                className={`outline-none bg-transparent text-sm transition-all ${searchExpanded ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}
                onFocus={() => setSearchExpanded(true)}
              />
              <button type="submit" className="p-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors">
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/account" className="relative group">
              <div className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-600 transition-all duration-300 group-hover:shadow-md">
                <FaUser className="text-lg" />
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </Link>
            <Link to="/cart" className="relative group">
              <div className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-600 transition-all duration-300 group-hover:shadow-md">
                <FaShoppingCart className="text-lg" />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        <div className="md:hidden flex items-center gap-3">
          <button
            className="p-2 rounded-full bg-amber-100 text-amber-600"
            onClick={() => {
              setSearchExpanded(!searchExpanded);
              setMobileMenu(false);
            }}
          >
            <FaSearch />
          </button>
          <Link to="/cart" className="relative">
            <div className="p-2 rounded-full bg-gray-100 text-gray-600">
              <FaShoppingCart className="text-lg" />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => {
              setMobileMenu(!mobileMenu);
              setSearchExpanded(false);
            }}
          >
            {mobileMenu ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>
      {searchExpanded && (
        <div className="md:hidden bg-white border-t border-amber-100 px-4 py-3">
          <form onSubmit={handleSearch} className="flex items-center border-2 border-amber-200 rounded-full px-4 py-2 bg-white">
            <FaSearch className="text-amber-500 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dry fruits..."
              className="outline-none bg-transparent text-sm flex-grow"
              autoFocus
            />
            <button
              type="button"
              className="text-gray-500 ml-2"
              onClick={() => {
                setSearchExpanded(false);
                setSearchQuery('');
              }}
            >
              <FaTimes />
            </button>
          </form>
        </div>
      )}
      <div className={`lg:hidden bg-white shadow-lg absolute w-full z-40 transition-all duration-500 ease-in-out overflow-hidden ${mobileMenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-4 py-6 space-y-6">
          <div className="space-y-4">
            {['Home', 'Dry Fruits', 'Products', 'Offers', 'About'].map((link) => (
              <div key={link} className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-center">
                  <NavLink
                    to={link === 'Home' ? '/home' : `/${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className={({ isActive }) => `text-lg font-medium ${isActive ? 'text-amber-600' : 'text-gray-700'}`}
                    onClick={() => {
                      setMobileMenu(false);
                      setActiveDropdown(null);
                    }}
                  >
                    {link}
                  </NavLink>
                  {dropdownData[link] && (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link ? null : link)}
                      className="p-2 text-amber-600"
                    >
                      {activeDropdown === link ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  )}
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${activeDropdown === link ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
                >
                  {dropdownData[link] && (
                    <div className="pl-2 space-y-3">
                      {dropdownData[link].map((section, idx) => (
                        <div key={idx}>
                          <h4 className="font-semibold text-gray-800 mb-2 text-base">{section.title}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {section.items.slice(0, 4).map((item, i) => (
                              <Link
                                key={i}
                                to={`/${link.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block py-2 px-3 rounded-lg bg-amber-50 text-amber-700 text-sm font-medium text-center hover:bg-amber-100 transition-colors truncate"
                                onClick={() => setMobileMenu(false)}
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                          {section.items.length > 4 && (
                            <div className="mt-2">
                              <Link
                                to={`/${link.toLowerCase()}`}
                                className="text-amber-600 text-sm font-medium inline-flex items-center"
                                onClick={() => setMobileMenu(false)}
                              >
                                View all {section.items.length} items
                                <FaChevronDown className="rotate-90 text-xs ml-1" />
                              </Link>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/account"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-amber-50 transition-colors"
                onClick={() => setMobileMenu(false)}
              >
                <FaUser className="text-amber-600 text-xl mb-1" />
                <span className="text-sm font-medium">Account</span>
              </Link>
              <Link
                to="/track-order"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-amber-50 transition-colors"
                onClick={() => setMobileMenu(false)}
              >
                <MdLocalShipping className="text-amber-600 text-xl mb-1" />
                <span className="text-sm font-medium">Track Order</span>
              </Link>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <FaPhoneAlt className="text-amber-500" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaEnvelope className="text-amber-500" />
                <span>info@foodo.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;