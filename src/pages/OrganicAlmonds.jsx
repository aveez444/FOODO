import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  HeartOff,
  Truck,
  RotateCcw,
  Star,
  Minus,
  Plus,
  ChevronRight,
  ChevronLeft,
  Check,
  Shield,
  ShoppingCart,
  Share2,
  MapPin,
  DollarSign,
  Box,
  Headphones,
  Mail

} from "lucide-react";
// LOCAL IMAGE IMPORTS
import demo1 from "../assets/products/organic-almonds.jfif";
import demo2 from "../assets/products/cashews.jfif";
import demo3 from "../assets/products/dates.jfif";
import demo4 from "../assets/products/khajoor-dates.jfif";
const ORANGE = {
  base: "#fb923c",
  strong: "#f59e0b",
  hover: "#fbbf24",
  ring: "ring-amber-500/30",
};
const productData = {
  id: "organic-almonds-123",
  title: "Organic Almonds",
  rating: 4.9,
  reviews: 175,
  price: 520,
  currency: "₹",
  inStock: true,
  short: "Certified organic almonds, rich in nutrients and perfect for healthy snacking or cooking.",
  images: [demo1, demo2, demo3, demo4],
};
const related = [
  {
    id: "rel-1",
    title: "Organic Raisins",
    price: 120,
    compareAt: 160,
    discount: 40,
    rating: 4.6,
    img: demo2,
  },
  {
    id: "rel-2",
    title: "Premium Cashews",
    price: 960,
    compareAt: 1160,
    discount: 35,
    rating: 4.5,
    img: demo3,
  },
  {
    id: "rel-3",
    title: "Dried Figs",
    price: 370,
    compareAt: 400,
    discount: 30,
    rating: 4.7,
    img: demo4,
  },
];
function classNames(...c) {
  return c.filter(Boolean).join(" ");
}
function useDebounced(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}
function Toast({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, 2200);
    return () => clearTimeout(id);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-neutral-900 px-4 py-3 text-white shadow-2xl"
          role="status"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
function RatingStars({ value, size = 16 }) {
  const count = Math.round(value);
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < count ? "fill-amber-400 stroke-amber-400" : "stroke-neutral-400"}
        />
      ))}
    </div>
  );
}
function Breadcrumbs() {
  const crumbs = ["Home", "Nuts", productData.title];
  return (
    <nav className="text-sm text-neutral-500" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((c, i) => (
          <li key={c} className="flex items-center gap-2">
            <span className={i === crumbs.length - 1 ? "text-neutral-900" : "hover:text-amber-600 cursor-pointer"}>
              {c}
            </span>
            {i < crumbs.length - 1 && <ChevronRight size={14} className="text-neutral-400" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
// UPDATED ImageGallery (object-contain for full image visible)
function ImageGallery({ images }) {
  const [index, setIndex] = useState(0);
  const [isZoomed, setZoomed] = useState(false);
  const mainRef = useRef(null);
  const active = useDebounced(index, 90);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);
  const go = (dir) => {
    setIndex((p) => (p + dir + images.length) % images.length);
  };
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-6">
      {/* Thumbnails */}
      <div className="col-span-4 order-2 flex gap-3 overflow-x-auto md:order-1 md:col-span-1 md:flex-col md:overflow-visible">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setIndex(i)}
            className={classNames(
              "relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border transition md:w-full",
              i === index ? "border-amber-500 ring-2 ring-amber-500/30" : "border-neutral-200 hover:border-amber-300"
            )}
          >
            <img
              src={src}
              alt={`Thumbnail ${i + 1}`}
              className="h-full w-full object-contain"
              style={{ backgroundColor: "#fff" }}
            />
            {i === index && <motion.div layoutId="thumb" className="absolute inset-0 ring-2 ring-amber-500/60 rounded-xl" />}
          </button>
        ))}
      </div>
      {/* Main */}
      <div className="col-span-4 order-1 relative overflow-hidden rounded-2xl bg-neutral-50 md:order-2 md:col-span-3">
        <button
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur hover:bg-white"
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur hover:bg-white"
          aria-label="Next image"
        >
          <ChevronRight />
        </button>
        <div
          ref={mainRef}
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          className="relative aspect-[4/3] w-full overflow-hidden flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              alt="Product"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: isZoomed ? 1.05 : 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full w-full object-contain transition-transform duration-500"
              style={{ backgroundColor: "#fff" }}
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
        </div>
      </div>
    </div>
  );
}
function QtySelector({ value, onChange }) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-neutral-300">
      <button
        className="grid h-10 w-10 place-items-center hover:bg-neutral-50"
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <div className="w-12 text-center text-sm font-semibold">{value}</div>
      <button
        className="grid h-10 w-10 place-items-center hover:bg-neutral-50"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
function MicroInfo({ icon: Icon, title, subtitle }) {
  return (
    <motion.div
      whileHover={{ translateY: -4 }}
      className="group flex w-full items-center gap-3 rounded-xl border p-3"
    >
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-amber-50 text-amber-700">
        <Icon size={20} />
      </div>
      <div className="flex-1 text-sm">
        <div className="font-semibold text-neutral-900">{title}</div>
        <div className="text-neutral-500 text-xs">{subtitle}</div>
      </div>
    </motion.div>
  );
}
function RelatedRibbon({ items }) {
  const ref = useRef(null);
  const scrollBy = (dx) => ref.current?.scrollBy({ left: dx, behavior: "smooth" });
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Related Items</h3>
        <div className="flex gap-2">
          <button onClick={() => scrollBy(-320)} className="rounded-full border p-2 hover:bg-neutral-50" aria-label="Scroll left">
            <ChevronLeft />
          </button>
          <button onClick={() => scrollBy(320)} className="rounded-full border p-2 hover:bg-neutral-50" aria-label="Scroll right">
            <ChevronRight />
          </button>
        </div>
      </div>
      <div ref={ref} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
        {items.map((p) => (
          <motion.article key={p.id} whileHover={{ y: -2 }} className="snap-start w-56 shrink-0 overflow-hidden rounded-2xl border">
            <div className="relative aspect-[4/3]">
              <img src={p.img} alt={p.title} className="h-full w-full object-contain" />
              {p.discount ? <div className="absolute left-3 top-3 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">-{p.discount}%</div> : null}
            </div>
            <div className="space-y-2 p-3">
              <h4 className="line-clamp-1 text-sm font-medium">{p.title}</h4>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">₹{p.price}</span>
                {p.compareAt && <span className="text-neutral-400 line-through">₹{p.compareAt}</span>}
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-500">
                <RatingStars value={p.rating} size={12} />
                <span>{p.rating.toFixed(1)}</span>
              </div>
              <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-amber-400">
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
function SpecTable() {
  const rows = [
    ["Brand", "Organic Farms"],
    ["Type", "Almonds"],
    ["Origin", "California"],
    ["Shelf Life", "12 months"],
    ["Storage", "Cool dry place"],
  ];
  return (
    <section className="mt-6 rounded-2xl border">
      <header className="border-b p-4">
        <h3 className="text-lg font-semibold">Description</h3>
        <p className="text-sm text-neutral-600">Product specifications and details.</p>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-neutral-50 text-sm">
            <tr>
              <th className="px-4 py-3 font-semibold text-neutral-600">Property</th>
              <th className="px-4 py-3 font-semibold text-neutral-600">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map(([k, v]) => (
              <tr key={k} className="text-sm">
                <td className="px-4 py-3 text-neutral-700">{k}</td>
                <td className="px-4 py-3 text-neutral-900">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
function DriveRates() {
  const [weight, setWeight] = useState(200); // Default to 200g
  const weightOptions = [
    { weight: 200, price: 290.99, label: "Small Pack" },
    { weight: 500, price: 520.00, label: "Medium Pack" },
    { weight: 1000, price: 980.00, label: "Large Pack" },
    { weight: 2000, price: 1800.00, label: "Family Pack" },
  ];
  const selectedWeight = weightOptions.find(option => option.weight === weight) || weightOptions;
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border p-4">
      <div className="text-sm font-semibold">Delivery Options</div>
      <div className="mt-3 grid gap-3">
        <div className="text-xs text-neutral-600">Select package size</div>
        <div className="grid grid-cols-2 gap-2">
          {weightOptions.map((option) => (
            <button 
              key={option.weight}
              onClick={() => setWeight(option.weight)}
              className={`rounded-xl border p-3 text-sm transition ${
                weight === option.weight 
                  ? "border-amber-500 bg-amber-50 text-amber-700" 
                  : "border-neutral-300 hover:border-amber-300"
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-xs">
                {option.weight >= 1000 
                  ? `${option.weight / 1000}kg` 
                  : `${option.weight}g`
                } • ₹{option.price.toFixed(2)}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between rounded-lg bg-neutral-50 p-3">
          <div className="text-sm font-medium">Delivery Price</div>
          <div className="text-lg font-bold">₹{selectedWeight.price.toFixed(2)}</div>
        </div>
      </div>
    </motion.div>
  );
}
export default function ProductDetailPage() {
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);
  const [toast, setToast] = useState("");
  const price = useMemo(() => (productData.price * qty).toFixed(2), [qty]);
  const handleAdd = () => {
    setToast(`Added ${qty} to cart — ${productData.currency}${price}`);
  };
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: productData.title, text: productData.short, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setToast("Link copied to clipboard");
      }
    } catch (e) {
      setToast("Unable to share");
    }
  };
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="text-lg font-extrabold">Organic Almonds</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={share} className="rounded-xl border px-3 py-2 text-sm hover:bg-neutral-50">
              <Share2 size={16} />
            </button>
            <button className="rounded-xl border px-3 py-2 text-sm hover:bg-neutral-50">
              <Heart size={16} />
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <Breadcrumbs />
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ImageGallery images={productData.images} />
          </div>
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-semibold md:text-3xl">{productData.title}</h1>
                <div className="mt-1 flex items-center gap-3 text-sm text-neutral-600">
                  <RatingStars value={productData.rating} />
                  <span>({productData.reviews} Reviews)</span>
                  <span className="hidden text-emerald-600 md:inline">{productData.inStock ? "In Stock" : "Out of stock"}</span>
                </div>
              </div>
              <div className="text-3xl font-bold tracking-tight">{productData.currency}{productData.price.toFixed(2)}</div>
              <p className="text-sm leading-relaxed text-neutral-700">{productData.short}</p>
              <DriveRates />
              <div className="flex flex-wrap items-center gap-3">
                <QtySelector value={qty} onChange={setQty} />
                <button
                  onClick={handleAdd}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-400 md:flex-none md:px-6"
                >
                  <ShoppingCart size={18} /> Buy Now
                </button>
                <button
                  onClick={() => setWish((w) => !w)}
                  className={classNames(
                    "grid h-12 w-12 place-items-center rounded-xl border transition",
                    wish ? "border-amber-500 text-amber-600" : "hover:bg-neutral-50"
                  )}
                  aria-label="Add to wishlist"
                >
                  {wish ? <HeartOff /> : <Heart />}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-3">
                <MicroInfo icon={Truck} title="Free Delivery" subtitle="On orders over ₹50" />
                <MicroInfo icon={Shield} title="Secure" subtitle="256-bit SSL" />
                <MicroInfo icon={RotateCcw} title="Easy Returns" subtitle="30 days" />
              </div>
              <div className="rounded-2xl border p-4 text-sm">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Order summary</div>
                  <div className="text-neutral-600">Qty {qty}</div>
                </div>
                <div className="mt-2 flex items-center justify-between font-semibold">
                  <div>Total</div>
                  <div>
                    {productData.currency}
                    {price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SpecTable />
        <RelatedRibbon items={related} />
      </main>
<footer className="border-t bg-neutral-50">
  <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
    {/* Secure Payments */}
    <div className="flex items-center gap-3">
      <Shield size={22} className="text-amber-500" />
      <div>
        <div className="font-bold text-neutral-900">100% Secure Payments</div>
        <div className="text-xs text-neutral-600">Your payment info is protected</div>
      </div>
    </div>
    {/* Customer Support */}
    <div className="flex items-center gap-3">
      <Headphones size={22} className="text-amber-500" />
      <div>
        <div className="font-bold text-neutral-900">24/7 Support</div>
        <div className="text-xs text-neutral-600">Live chat or call: <span className="font-medium">+123 456 7890</span></div>
      </div>
    </div>
    {/* Newsletter Signup */}
    <div className="flex items-center gap-1">
      <Mail size={22} className="text-amber-500" />
      <div>
        <div className="font-bold text-neutral-900">Get Deals & News</div>
        <form className="flex mt-1">
          <input type="email" placeholder="Your email" className="border rounded-l-xl p-2 text-sm outline-none" />
          <button
            type="submit"
            className="rounded-r-xl bg-amber-500 px-4 text-white font-semibold text-sm"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
    {/* Premium Benefits */}
    <div className="flex flex-col gap-3">
      <div className="font-bold text-neutral-900 mb-2">Why Shop With Us?</div>
      <div className="flex items-center gap-2 text-sm text-neutral-700">
        <Shield size={18} className="text-amber-500" />
        <span>Authentic Premium Quality</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-neutral-700">
        <Truck size={18} className="text-amber-500" />
        <span>Fast & Free Delivery over ₹50</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-neutral-700">
        <RotateCcw size={18} className="text-amber-500" />
        <span>Easy 30-Day Returns</span>
      </div>
    </div>
  </div>
</footer>
      <Toast open={!!toast} onClose={() => setToast("")}>{toast}</Toast>
    </div>
  );
}
