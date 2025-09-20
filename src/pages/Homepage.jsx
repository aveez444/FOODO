import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegStar, FaStar, FaArrowRight, FaShippingFast } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";


const categories = [
  { name: "Almonds", img: "src/assets/categories/almonds_.png" },
  { name: "Cashews", img: "src/assets/categories/cashews.png" },
  { name: "Walnuts", img: "src/assets/categories/walnuts.png" },
  { name: "Pistachios", img: "src/assets/categories/pistachios.png" },
  { name: "Dates", img: "src/assets/categories/dates.png" },
  { name: "Mix Dry Fruits", img: "src/assets/categories/mix.png" },
  { name: "Raisins", img: "src/assets/categories/raisins.png" },
  { name: "Figs", img: "src/assets/categories/figs.png" },
];


const banners = [
  "src/assets/banners/dryfruit-banner1.png",
  "src/assets/banners/dryfruit-banner2.jpg",
  "src/assets/banners/dryfruit-banner3.png",
];


const products = [
  {
    label: "Premium California Almonds (500g)",
    price: "400",
    original: "599",
    offer: "25% OFF",
    img: "src/assets/products/almonds.jpg",
    badge: "BEST SELLER",
    rating: 4.5,
    shipping: "Free delivery. Next day for select locations.",
  },
  {
    "label": "Food-O Mixed Nuts (200g)",
    "price": "250",
    "original": "350",
    "offer": "28% OFF",
    "img": "src/assets/products/mixed-nuts.jpeg",
    "badge": "FRESH PACK",
    "rating": 4.6,
    "shipping": "Free delivery. Next day for select locations."
},
{
    label: "Whole Cashews W320 (500g)",
    price: "499",
    original: "650",
    offer: "23% OFF",
    img: "src/assets/products/cashews.jfif",
    badge: "HOT DEAL",
    rating: 4.0,
    description: "Premium whole cashews. Delicious and packed with protein.",
    care: "Store airtight. Protect from moisture.",
    shipping: "Free delivery available.",
    returns: "7-day return policy applies.",
  },
  {
    label: "Fresh Green Pistachios (250g)",
    price: "399",
    img: "src/assets/products/pistachios.jpg",
    badge: "NEW ARRIVAL",
    rating: 4.8,
    description: "Fresh green pistachios sourced from select farms.",
    care: "Keep dry, consume within 4 months.",
    shipping: "Ships in 1-2 days.",
    returns: "No-questions-asked returns for 5 days.",
  },
  {
    label: "Medjool Dates (400g)",
    price: "349",
    img: "src/assets/products/dates.jfif",
    rating: 4.2,
    description: "Soft, sweet Medjool dates with rich flavour.",
    care: "Refregiate after opening.",
    shipping: "Free delivery.",
    returns: "Return within 7 days.",
  },
  {
    label: "Premium Khajoor Dates",
    price: "999",
    img: "src/assets/products/khajoor-dates.jfif",
    badge: "BEST SELLER",
    rating: 4.7,
    description: "Premium dates, perfect for gifting and health.",
    care: "Store airtight.",
    shipping: "Fast delivery service.",
    returns: "3-day easy returns.",
  },
  {
    label: "Organic Almonds",
    price: "1499",
    img: "src/assets/products/organic-almonds.jfif",
    badge: "NEW ARRIVAL",
    rating: 4.9,
    description: "Certified organic almonds for nutrition and taste.",
    care: "Protect from sunlight.",
    shipping: "Delivered within 2-4 working days.",
    returns: "Easy returns accepted.",
  },
  {
    label: "Roasted Cashews",
    price: "1299",
    img: "src/assets/products/roasted-cashews.jfif",
    rating: 4.3,
    description: "Salted, perfectly roasted cashews for snacks.",
    care: "Keep airtight.",
    shipping: "Ships in 24 hours.",
    returns: "Return eligible for 7 days.",
  },
  {
    label: "Saffron Pistachios",
    price: "1999",
    img: "src/assets/products/saffron-pistachios.jpg",
    rating: 4.6,
    description: "Saffron infused pistachios with aromatic flavour.",
    care: "Store in dry, cool place.",
    shipping: "Express delivery available.",
    returns: "Returns accepted within 5 days.",
  },
];


const promoGrid = [
  {
    label: "IMMUNITY BOOSTERS",
    img: "src/assets/promo/immunity.png",
    offer: "UPTO 30% OFF",
  },
  {
    label: "PROTEIN RICH",
    img: "src/assets/promo/protein.png",
    offer: "FLAT 20% OFF",
  },
  {
    label: "GIFT PACKS",
    img: "src/assets/promo/gift.jpg",
    offer: "STARTS FROM ₹899",
  },
  {
    label: "FESTIVE COMBOS",
    img: "src/assets/promo/festive.jpg",
    offer: "NEW COLLECTION",
  },
];


// Function to navigate to another page
const navigateToPage = (url) => {
  window.location.href = url;
};


export default function Homepage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [direction, setDirection] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  // Render star rating
  function renderStars(rating) {
    const stars = [];
    let r = Math.floor(rating);
    let half = rating % 1 >= 0.4;
    for(let i = 1; i <= 5; i++) {
      if(i <= r) stars.push(<FaStar key={i} className="text-yellow-400 inline mx-0.5" />);
      else if(i === r+1 && half) stars.push(<FaRegStar key={i} className="text-yellow-400 inline mx-0.5" />);
      else stars.push(<FaRegStar key={i} className="text-gray-300 inline mx-0.5" />);
    }
    return stars;
  }


  // Handle manual banner navigation
  const handleBannerChange = (index) => {
    setDirection(index > currentBanner ? 1 : -1);
    setCurrentBanner(index);
  };


  // Variants for banner animation
  const bannerVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  };


  return (
    <div className="w-full">
      {/* Top Ribbon Banner */}
      <div 
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-4 text-center cursor-pointer"
      >
        <div className="flex items-center justify-center flex-wrap">
          <span className="font-bold text-sm sm:text-base animate-pulse">
            🎉 Special Festival Sale - Upto 40% OFF on Premium Dry Fruits! 🎉
          </span>
          <span className="ml-2 flex items-center text-xs sm:text-sm bg-amber-700 px-2 py-1 rounded-full mt-1 sm:mt-0">
            Shop Now <FaArrowRight className="ml-1" />
          </span>
        </div>
      </div>


      {/* Categories Section */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-6 py-4 sm:py-8 px-3 md:px-16">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center text-center cursor-pointer"
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full border-4 border-amber-500 flex items-center justify-center overflow-hidden shadow-md bg-white p-1">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-amber-200">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
              </div>
            </div>
            <p className="mt-2 text-xs sm:text-base font-semibold text-gray-800">{cat.name}</p>
          </motion.div>
        ))}
      </div>


      {/* Banner Section with Enhanced Animation */}
      <div className="w-full px-3 md:px-16 mb-6 sm:mb-10 relative">
        <div className="rounded-xl overflow-hidden shadow-xl border-4 border-amber-100 relative h-40 sm:h-80 md:h-[450px]">
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.img
              key={currentBanner}
              src={banners[currentBanner]}
              alt="Banner"
              custom={direction}
              variants={bannerVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="w-full h-full object-cover absolute inset-0"
            />
          </AnimatePresence>
          {/* Banner indicators */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${currentBanner === index ? 'bg-amber-500 scale-125' : 'bg-white'}`}
                onClick={() => handleBannerChange(index)}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>


      {/* Best Sellers Section */}
      <div className="px-3 md:px-16 py-6 sm:py-10 bg-amber-50 rounded-xl mx-2 sm:mx-4 md:mx-16 mb-6 sm:mb-10">
        <h2 className="text-center text-xl sm:text-3xl font-bold text-amber-800 mb-4 sm:mb-8">
          BEST SELLERS
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
          {products.map((prod, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer border border-amber-100"
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => {
                const routeMap = {
                  "Premium California Almonds (500g)": "/PremiumAlmonds",
                  "Food-O Mixed Nuts (200g)": "/food-o-mixed-nuts",
                  "Whole Cashews W320 (500g)": "/WholeCashews",
                  "Fresh Green Pistachios (250g)": "/fresh-green-pistachios",
                  "Medjool Dates (400g)": "/medjool-dates",
                  "Premium Khajoor Dates": "/khajoor-dates",
                  "Organic Almonds": "/organic-almonds",
                  "Roasted Cashews": "/roasted-cashews",
                  "Saffron Pistachios": "/saffron-pistachios",
                };
                navigateToPage(routeMap[prod.label]);
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {prod.badge && (
                  <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {prod.badge}
                  </span>
                )}
                <div className="p-3 bg-white">
                  <motion.img
                    src={prod.img}
                    alt={prod.label}
                    className="w-full h-28 sm:h-48 object-contain"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 h-10">
                  {prod.label}
                </h3>
                <div className="flex items-center gap-1 sm:gap-2 mt-2 flex-wrap">
                  <span className="text-sm sm:text-lg font-bold text-amber-700">₹ {prod.price}</span>
                  {prod.original && (
                    <span className="text-xs line-through text-gray-500">
                      ₹ {prod.original}
                    </span>
                  )}
                  {prod.offer && (
                    <span className="text-xs text-red-500 font-semibold">{prod.offer}</span>
                  )}
                </div>
                <div className="mt-2 text-xs">
                  {renderStars(prod.rating)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      {/* Promo Section */}
      <div className="px-3 md:px-16 py-6 sm:py-10">
        <h2 className="text-center text-xl sm:text-3xl font-bold text-amber-800 mb-4 sm:mb-8">
          SPECIAL PROMOS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {promoGrid.map((promo, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer border-2 border-amber-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.img
                src={promo.img}
                alt={promo.label}
                className="w-full h-40 sm:h-64 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-4">
                <h3 className="text-base sm:text-xl font-bold text-white">{promo.label}</h3>
                <p className="text-xs sm:text-base text-amber-300 font-semibold mt-1">
                  {promo.offer}
                </p>
                <motion.button 
                  className="mt-2 sm:mt-3 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      {/* Small Ad Strip */}
      <div className="px-3 md:px-16 my-6">
        <motion.div 
          className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-xl p-3 sm:p-4 border border-amber-300 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center">
              <div className="bg-amber-500 rounded-full p-1 sm:p-2 mr-2 sm:mr-3">
                <FaShippingFast className="text-white text-sm sm:text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-amber-800 text-sm sm:text-base">Free Shipping on Orders Above ₹999</h3>
                <p className="text-xs text-amber-700">Limited time offer - shop now!</p>
              </div>
            </div>
            <motion.button 
              className="mt-2 sm:mt-0 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center"
              onClick={() => navigateToPage('/free-shipping')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Products <FaArrowRight className="ml-1 sm:ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
