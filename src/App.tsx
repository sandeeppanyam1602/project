import { useState } from "react"
import {
  Home, Package, MapPin, DollarSign, User, ChevronLeft, ChevronRight,
  Camera, CheckCircle, Clock, Truck, Recycle, Leaf, Shield, ShieldCheck,
  Battery, Monitor, Zap, Phone, Laptop, Cpu, Cable,
  TrendingUp, TrendingDown, Minus, ArrowRight, Plus, Settings, Globe,
  BarChart3, Volume2, LogIn, UserPlus, Star, Bell, Heart,
  Navigation, Search, Filter, Calendar, Tag, ShoppingBag, X,
  AlertCircle, Check, MapIcon
} from "lucide-react"

/* ── TYPES ──────────────────────────────────────────────────────── */

type Screen =
  | "splash" | "language" | "role"
  | "user-home" | "scrap-category" | "add-scrap"
  | "estimated-value" | "book-kabadiwala" | "collector-detail"
  | "select-address" | "select-datetime" | "review-pickup"
  | "pickup-confirmed" | "track-pickup" | "recycling-journey"
  | "earnings" | "safety" | "profile" | "marketplace"
  | "kabadiwala-login" | "kabadiwala-register" | "kabadiwala-id"
  | "kabadiwala-dashboard" | "todays-pickups" | "price-board"
  | "recycler-dashboard" | "find-recycler"

type Role = "user" | "kabadiwala" | "recycler"

const LANGUAGES = ["English", "हिंदी", "मराठी", "తెలుగు", "தமிழ்"]

const SCRAP_CATEGORIES = [
  { icon: <Zap size={26} />, label: "Electronics" },
  { icon: <Phone size={26} />, label: "Mobile Phones" },
  { icon: <Laptop size={26} />, label: "Computers" },
  { icon: <Cpu size={26} />, label: "PCBs" },
  { icon: <Cable size={26} />, label: "Cables" },
  { icon: <Battery size={26} />, label: "Batteries" },
  { icon: <Monitor size={26} />, label: "CRT / LCD" },
  { icon: <Zap size={26} />, label: "Motors" },
  { icon: <Package size={26} />, label: "Plastics" },
  { icon: <Recycle size={26} />, label: "Other Scrap" },
]

const COLLECTORS = [
  { name: "Ramesh Kumar", id: "KC-10482", area: "Koramangala", available: "Available Today", rating: 4.8, dist: "1.8 km", materials: ["Electronics", "Cables", "PCBs"], eta: "30–45 min" },
  { name: "Suresh Yadav", id: "KC-20831", area: "Indiranagar", available: "Available Today", rating: 4.6, dist: "2.4 km", materials: ["Plastic", "Paper", "Metal"], eta: "45–60 min" },
  { name: "Mohan Das", id: "KC-30149", area: "HSR Layout", available: "Tomorrow 9 AM", rating: 4.5, dist: "3.1 km", materials: ["Batteries", "Motors"], eta: "Tomorrow" },
]

const RECYCLERS = [
  { name: "ABC E-Waste Recycling", dist: "4.2 km", materials: "PCB • Electronics • Batteries", area: "Peenya Industrial Area", rate: "₹45–65 / kg", pickup: "Available" },
  { name: "GreenTech Recyclers", dist: "6.8 km", materials: "Electronics • Cables • Motors", area: "Bommasandra", rate: "₹38–55 / kg", pickup: "Available" },
  { name: "EcoCycle Solutions", dist: "9.1 km", materials: "Plastics • Metals • PCB", area: "Whitefield", rate: "₹42–60 / kg", pickup: "Tomorrow" },
]

const PRICE_DATA = [
  { name: "PCBs", price: "₹55–70", unit: "kg", trend: "up" },
  { name: "Copper Cable", price: "₹420–480", unit: "kg", trend: "up" },
  { name: "Batteries", price: "₹28–35", unit: "kg", trend: "stable" },
  { name: "Mixed Plastic", price: "₹12–18", unit: "kg", trend: "down" },
  { name: "Aluminium", price: "₹85–95", unit: "kg", trend: "stable" },
  { name: "Mobile Phones", price: "₹180–350", unit: "piece", trend: "up" },
]

const MARKETPLACE_ITEMS = [
  { name: "Copper Wire Scrap", qty: "50 kg", price: "₹420/kg", seller: "GreenTech", badge: "Hot" },
  { name: "Aluminium Sheets", qty: "120 kg", price: "₹88/kg", seller: "EcoCycle", badge: "" },
  { name: "PCB Lot Grade A", qty: "20 kg", price: "₹65/kg", seller: "ABC E-Waste", badge: "New" },
  { name: "Mixed Plastic", qty: "200 kg", price: "₹15/kg", seller: "Ramesh Kabadi", badge: "" },
]

/* ── PRIMITIVE COMPONENTS ─────────────────────────────────────── */

function Btn({
  variant = "primary", size: sz = "md", onClick, children,
  iconStart, iconEnd, className = "", disabled = false,
}: {
  variant?: "primary" | "neutral" | "subtle"
  size?: "md" | "sm"
  onClick?: () => void
  children?: React.ReactNode
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
  className?: string
  disabled?: boolean
}) {
  const base = "inline-flex items-center justify-center gap-xs font-medium transition-colors rounded-corner-full cursor-pointer border"
  const sizes = sz === "sm" ? "px-lg py-xs text-label-sm" : "px-xl py-md text-label-sm"
  const variants = {
    primary: "bg-brand-primary text-on-brand border-brand-primary hover:bg-brand-hover",
    neutral: "bg-surface-bg text-text-primary border-border-primary hover:bg-surface-hover",
    subtle: "bg-transparent text-text-primary border-transparent hover:bg-bg-hover",
  }
  return (
    <button onClick={onClick} disabled={disabled}
      className={`${base} ${sizes} ${variants[variant]} ${className}`}>
      {iconStart}{children}{iconEnd}
    </button>
  )
}

function BadgePill({ label, variant = "default" }: {
  label: string
  variant?: "default" | "success" | "warning" | "danger" | "brand" | "secondary"
}) {
  const variants = {
    default: "bg-bg-subtle text-text-secondary",
    success: "bg-success text-success",
    warning: "bg-warning text-warning",
    danger: "bg-danger text-danger",
    brand: "bg-status-brand text-brand-primary",
    secondary: "bg-surface-secondary-bg text-text-secondary",
  }
  return (
    <span className={`inline-flex items-center px-md py-xs text-video-title font-medium rounded-corner-sm ${variants[variant]}`}>
      {label}
    </span>
  )
}

function Field({ label, description, placeholder = "", type = "text" }: {
  label: string; description?: string; placeholder?: string; type?: string
}) {
  return (
    <div className="flex flex-col gap-xs">
      <label className="text-label-sm text-text-primary font-medium">{label}</label>
      {description && <p className="text-video-title text-text-secondary">{description}</p>}
      <input type={type} placeholder={placeholder}
        className="w-full px-lg py-md text-input border border-border-primary rounded-corner-md bg-surface-bg text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-selected transition-colors" />
    </div>
  )
}

function SelectField({ label, description, options }: {
  label: string; description?: string; options: { label: string; value: string }[]
}) {
  return (
    <div className="flex flex-col gap-xs">
      <label className="text-label-sm text-text-primary font-medium">{label}</label>
      {description && <p className="text-video-title text-text-secondary">{description}</p>}
      <select className="w-full px-lg py-md text-input border border-border-primary rounded-corner-md bg-surface-bg text-text-primary outline-none focus:border-border-selected transition-colors appearance-none">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

/* ── MOCK MAP ────────────────────────────────────────────────────
   Static SVG map — no real API, purely visual prototype.          */
function MockMap({ collectorName, dist, compact = false }: {
  collectorName: string; dist: string; compact?: boolean
}) {
  const h = compact ? 160 : 220
  return (
    <div className={`w-full bg-surface-bg rounded-corner-lg overflow-hidden border border-border-primary relative ${compact ? "mock-map-compact" : "mock-map-full"}`}>
      {/* map background tiles */}
      <svg width="100%" height="100%" viewBox={`0 0 360 ${h}`} xmlns="http://www.w3.org/2000/svg">
        {/* base fill */}
        <rect width="360" height={h} fill="#e8f0e8" />
        {/* blocks */}
        <rect x="0" y="0" width="90" height="60" fill="#d4e8d4" />
        <rect x="100" y="10" width="70" height="45" fill="#c8dfc8" rx="4" />
        <rect x="180" y="5" width="80" height="50" fill="#d4e8d4" rx="4" />
        <rect x="270" y="0" width="90" height="55" fill="#c8dfc8" />
        <rect x="0" y="80" width="60" height="70" fill="#c8dfc8" rx="4" />
        <rect x="70" y="90" width="100" height="55" fill="#d4e8d4" rx="4" />
        <rect x="180" y="75" width="75" height="60" fill="#c8dfc8" rx="4" />
        <rect x="265" y="80" width="95" height="65" fill="#d4e8d4" />
        <rect x="0" y={h - 60} width="80" height="60" fill="#d4e8d4" rx="4" />
        <rect x="90" y={h - 55} width="90" height="55" fill="#c8dfc8" rx="4" />
        <rect x="190" y={h - 60} width="70" height="60" fill="#d4e8d4" rx="4" />
        <rect x="270" y={h - 55} width="90" height="55" fill="#c8dfc8" />
        {/* roads */}
        <rect x="0" y="68" width="360" height="14" fill="#f5f0e8" />
        <rect x="0" y={h - 68} width="360" height="12" fill="#f5f0e8" />
        <rect x="160" y="0" width="16" height={h} fill="#f5f0e8" />
        <rect x="290" y="0" width="12" height={h} fill="#f5f0e8" />
        {/* road dashes */}
        <line x1="0" y1="75" x2="360" y2="75" stroke="#d4c87a" strokeWidth="1" strokeDasharray="12,8" />
        {/* route line */}
        <line x1="80" y1={compact ? 120 : 165} x2="280" y2="40" stroke="#5250f3" strokeWidth="3" strokeDasharray="6,4" strokeLinecap="round" />
        {/* user marker */}
        <circle cx="80" cy={compact ? 120 : 165} r="10" fill="#5250f3" />
        <circle cx="80" cy={compact ? 120 : 165} r="5" fill="white" />
        {/* collector marker */}
        <circle cx="280" cy="40" r="10" fill="#16a34a" />
        <circle cx="280" cy="40" r="5" fill="white" />
        {/* label pills */}
        <rect x="90" y={compact ? 112 : 157} width="52" height="18" rx="9" fill="#5250f3" />
        <text x="116" y={compact ? 125 : 170} textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui">You 📍</text>
        <rect x="220" y="32" width="70" height="18" rx="9" fill="#16a34a" />
        <text x="255" y="45" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui">Collector 📍</text>
      </svg>
      {/* map controls */}
      <div className="absolute top-md right-md flex flex-col gap-xs">
        <button className="w-7 h-7 bg-surface-bg border border-border-primary rounded-corner-md flex items-center justify-center text-text-primary text-label font-semibold shadow">+</button>
        <button className="w-7 h-7 bg-surface-bg border border-border-primary rounded-corner-md flex items-center justify-center text-text-secondary text-label font-semibold shadow">−</button>
      </div>
      {/* distance chip */}
      <div className="absolute bottom-md left-md bg-surface-bg border border-border-primary rounded-corner-full px-md py-xs flex items-center gap-xs shadow">
        <Navigation size={10} className="text-brand-primary" />
        <span className="text-video-title text-text-primary font-medium">{dist} · {collectorName}</span>
      </div>
    </div>
  )
}

/* ── PROGRESS STEPS ─────────────────────────────────────────────── */
function ProgressSteps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-xs overflow-x-auto pb-xs">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-xs flex-shrink-0">
          <div className={`flex items-center gap-xs px-md py-xs rounded-corner-full text-video-title font-medium ${
            i < current ? "bg-brand-primary text-on-brand"
            : i === current ? "bg-brand-secondary text-brand-primary border border-brand-primary"
            : "bg-surface-bg text-text-tertiary border border-border-secondary"
          }`}>
            <span className="w-4 h-4 rounded-corner-full flex items-center justify-center text-video-title"
              className={i < current ? "step-bg-active" : ""}>
              {i < current ? <Check size={10} /> : i + 1}
            </span>
            {s}
          </div>
          {i < steps.length - 1 && <div className={`h-px w-4 ${i < current ? "bg-brand-primary" : "bg-border-secondary"}`} />}
        </div>
      ))}
    </div>
  )
}

/* ── LAYOUT HELPERS ───────────────────────────────────────────── */

function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-secondary-bg flex items-center justify-center p-lg">
      <div className="mobile-shell-inner bg-brand-tertiary">
        {children}
      </div>
    </div>
  )
}

function StatusBar() {
  return (
    <div className="flex justify-between items-center px-xl pt-lg pb-sm">
      <span className="text-video-title text-text-secondary font-medium">9:41</span>
      <div className="flex gap-xs items-center text-text-secondary">
        <span className="text-video-title">●●●●</span>
        <span className="text-video-title ml-xs">WiFi</span>
        <span className="text-video-title ml-xs">🔋</span>
      </div>
    </div>
  )
}

function TopBar({ title, onBack, action }: { title?: string; onBack?: () => void; action?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-md px-xl py-lg bg-surface-bg border-b border-border-secondary">
      {onBack && (
        <button onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-corner-full bg-brand-tertiary border border-border-primary text-text-primary"
          className="flex-shrink-0">
          <ChevronLeft size={16} />
        </button>
      )}
      {title && <span className="text-label text-text-primary font-semibold topbar-title">{title}</span>}
      {action}
    </div>
  )
}

function BottomNav({ active, onNav }: { active: string; onNav: (s: Screen) => void }) {
  const items: { icon: React.ReactNode; label: string; screen: Screen }[] = [
    { icon: <Home size={20} />, label: "Home", screen: "user-home" },
    { icon: <Package size={20} />, label: "Sell", screen: "scrap-category" },
    { icon: <MapPin size={20} />, label: "Track", screen: "track-pickup" },
    { icon: <ShoppingBag size={20} />, label: "Market", screen: "marketplace" },
    { icon: <User size={20} />, label: "Profile", screen: "profile" },
  ]
  return (
    <div className="bg-surface-bg border-t border-border-primary px-sm py-md flex justify-around">
      {items.map((item) => (
        <button key={item.label} onClick={() => onNav(item.screen)}
          className={`flex flex-col items-center gap-xs px-md py-xs rounded-corner-md transition-colors ${active === item.screen ? "text-brand-primary" : "text-text-secondary"}`}>
          {item.icon}
          <span className="text-video-title font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  )
}

function KabBottomNav({ active, onNav }: { active: string; onNav: (s: Screen) => void }) {
  const items: { icon: React.ReactNode; label: string; screen: Screen }[] = [
    { icon: <Home size={20} />, label: "Home", screen: "kabadiwala-dashboard" },
    { icon: <Package size={20} />, label: "Pickups", screen: "todays-pickups" },
    { icon: <BarChart3 size={20} />, label: "Prices", screen: "price-board" },
    { icon: <DollarSign size={20} />, label: "Earnings", screen: "earnings" },
    { icon: <User size={20} />, label: "Profile", screen: "profile" },
  ]
  return (
    <div className="bg-surface-bg border-t border-border-primary px-sm py-md flex justify-around">
      {items.map((item) => (
        <button key={item.label} onClick={() => onNav(item.screen)}
          className={`flex flex-col items-center gap-xs px-md py-xs rounded-corner-md transition-colors ${active === item.screen ? "text-brand-primary" : "text-text-secondary"}`}>
          {item.icon}
          <span className="text-video-title font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  )
}

/* ── SCREENS ─────────────────────────────────────────────────── */

function SplashScreen({ onStart }: { onStart: () => void }) {
  const features = [
    { icon: <Recycle size={18} />, text: "Sell scrap from your doorstep" },
    { icon: <Truck size={18} />, text: "Connect with verified collectors" },
    { icon: <ShieldCheck size={18} />, text: "Track your recycling journey" },
  ]
  return (
    <MobileShell>
      <div className="flex-1 flex flex-col">
        <div className="bg-brand-primary splash-hero">
          <div className="bg-surface-bg splash-icon flex items-center justify-center">
            <Recycle size={40} className="text-brand-primary" />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-between px-2xl py-2xl text-center">
          <div className="flex flex-col items-center gap-lg mt-2xl w-full">
            <div>
              <h1 className="splash-title">Kabadiwala Connect</h1>
              <p className="text-label-sm text-text-secondary mt-xs">Making recycling simple and trustworthy.</p>
            </div>
            <div className="flex flex-col gap-md w-full mt-lg">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-lg bg-surface-bg rounded-corner-lg px-lg py-md border border-border-primary">
                  <span className="text-brand-primary">{f.icon}</span>
                  <span className="text-label-sm text-text-primary font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-md mt-2xl">
            <button onClick={onStart} className="splash-cta">
              Get Started <ArrowRight size={18} />
            </button>
            <p className="text-video-title text-text-tertiary">For households · Collectors · Recyclers</p>
          </div>
        </div>
      </div>
    </MobileShell>
  )
}

function LanguageScreen({ selectedLang, onChangeLang, onSelect }: {
  selectedLang: string; onChangeLang: (l: string) => void; onSelect: () => void
}) {
  return (
    <MobileShell>
      <StatusBar />
      <div className="flex-1 flex flex-col p-2xl">
        <div className="flex items-center gap-md mb-2xl mt-lg">
          <div className="w-12 h-12 rounded-corner-lg bg-brand-primary flex items-center justify-center">
            <Recycle size={24} className="text-on-brand" />
          </div>
          <div>
            <p className="text-video-title text-text-tertiary">Kabadiwala</p>
            <p className="text-label text-text-primary font-semibold">Connect</p>
          </div>
        </div>
        <h1 className="text-title text-text-primary mb-xs">Welcome to<br />Kabadiwala Connect</h1>
        <p className="text-label-sm text-text-secondary mb-2xl">Making recycling simple and trustworthy.</p>
        <p className="text-label-sm text-text-secondary mb-lg font-medium">Select your language / भाषा चुनें</p>
        <div className="flex flex-col gap-md flex-1">
          {LANGUAGES.map((lang) => {
            const active = selectedLang === lang
            return (
              <button key={lang} onClick={() => onChangeLang(lang)}
                className={`w-full p-lg rounded-corner-lg text-left transition-all flex items-center justify-between ${
                  active ? "bg-brand-primary text-on-brand" : "bg-surface-bg text-text-primary border border-border-primary"
                }`}>
                <span className="text-label font-medium">{lang}</span>
                {active && <CheckCircle size={18} />}
              </button>
            )
          })}
        </div>
        <div className="mt-2xl">
          <Btn variant="primary" onClick={onSelect} iconEnd={<ArrowRight size={16} />} className="w-full justify-center">Continue</Btn>
        </div>
      </div>
    </MobileShell>
  )
}

function RoleScreen({ onRole }: { onRole: (r: Role) => void }) {
  const roles: { role: Role; icon: React.ReactNode; label: string; desc: string }[] = [
    { role: "user", icon: <Home size={30} />, label: "Sell Scrap", desc: "Sell or give your recyclable items to a nearby collector." },
    { role: "kabadiwala", icon: <Truck size={30} />, label: "Kabadiwala / Collector", desc: "Collect scrap from users and connect with recyclers." },
    { role: "recycler", icon: <Recycle size={30} />, label: "Recycler", desc: "Receive recyclable materials from collectors." },
  ]
  return (
    <MobileShell>
      <StatusBar />
      <div className="flex-1 flex flex-col p-2xl">
        <h1 className="text-title text-text-primary mt-lg mb-xs">How will you use<br />Kabadiwala Connect?</h1>
        <p className="text-label-sm text-text-secondary mb-2xl">Choose your role to get started</p>
        <div className="flex flex-col gap-lg flex-1">
          {roles.map((r) => (
            <button key={r.role} onClick={() => onRole(r.role)}
              className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary flex gap-lg items-start text-left hover:border-brand-primary transition-colors">
              <div className="w-14 h-14 rounded-corner-lg bg-brand-tertiary flex items-center justify-center text-brand-primary flex-shrink-0">{r.icon}</div>
              <div className="flex-1">
                <p className="text-label text-text-primary font-semibold mb-xs">{r.label}</p>
                <p className="text-label-sm text-text-secondary">{r.desc}</p>
              </div>
              <ChevronRight size={20} className="text-text-tertiary mt-xs flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </MobileShell>
  )
}

function UserHomeScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const mainActions = [
    { icon: <Package size={28} />, label: "Sell Scrap", screen: "scrap-category" as Screen },
    { icon: <Truck size={28} />, label: "Book Pickup", screen: "book-kabadiwala" as Screen },
    { icon: <BarChart3 size={28} />, label: "Check Prices", screen: "price-board" as Screen },
    { icon: <MapPin size={28} />, label: "Track Pickup", screen: "track-pickup" as Screen },
  ]
  const secondaryActions = [
    { icon: <DollarSign size={20} />, label: "My Earnings", screen: "earnings" as Screen },
    { icon: <Recycle size={20} />, label: "Recycling Journey", screen: "recycling-journey" as Screen },
    { icon: <Shield size={20} />, label: "Safety Tips", screen: "safety" as Screen },
  ]
  return (
    <MobileShell>
      <StatusBar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="px-xl pt-lg pb-xl bg-surface-bg mx-xl mt-md rounded-corner-lg">
          <p className="text-label-sm text-text-secondary">Hello! 👋</p>
          <h1 className="text-title text-text-primary mt-xs">What would you like<br />to recycle today?</h1>
        </div>
        <div className="px-xl mt-xl">
          <div className="grid grid-cols-2 gap-lg">
            {mainActions.map((a) => (
              <button key={a.label} onClick={() => onNav(a.screen)}
                className="bg-surface-bg rounded-corner-lg p-xl flex flex-col items-center gap-md border border-border-primary hover:border-brand-primary transition-colors">
                <div className="w-14 h-14 rounded-corner-lg bg-brand-tertiary flex items-center justify-center text-brand-primary">{a.icon}</div>
                <span className="text-label-sm text-text-primary font-medium text-center">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="px-xl mt-xl">
          <p className="text-label-sm text-text-secondary font-medium mb-lg">Quick Access</p>
          <div className="flex flex-col gap-md">
            {secondaryActions.map((a) => (
              <button key={a.label} onClick={() => onNav(a.screen)}
                className="bg-surface-bg rounded-corner-lg p-lg flex items-center gap-lg border border-border-primary hover:border-brand-primary transition-colors">
                <div className="w-10 h-10 rounded-corner-md bg-brand-tertiary flex items-center justify-center text-brand-primary">{a.icon}</div>
                <span className="text-label text-text-primary font-medium flex-1">{a.label}</span>
                <ChevronRight size={16} className="text-text-tertiary" />
              </button>
            ))}
          </div>
        </div>
        <div className="spacer-lg" />
      </div>
      <BottomNav active="user-home" onNav={onNav} />
    </MobileShell>
  )
}

function ScrapCategoryScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="What do you want to recycle?" onBack={() => onNav("user-home")} />
      <div className="flex-1 overflow-y-auto px-xl py-xl">
        <div className="grid grid-cols-3 gap-lg">
          {SCRAP_CATEGORIES.map((cat) => (
            <button key={cat.label} onClick={() => onNav("add-scrap")}
              className="bg-surface-bg rounded-corner-lg p-lg flex flex-col items-center gap-sm border border-border-primary hover:border-brand-primary transition-colors">
              <div className="w-12 h-12 rounded-corner-md bg-brand-tertiary flex items-center justify-center text-brand-primary">{cat.icon}</div>
              <span className="text-video-title text-text-primary font-medium text-center leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </MobileShell>
  )
}

function AddScrapScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [condition, setCondition] = useState("Good")
  const STEPS = ["Waste", "Collector", "Address", "Time", "Confirm"]
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Add Your Scrap" onBack={() => onNav("scrap-category")} />
      <div className="flex-1 overflow-y-auto px-xl pb-xl flex flex-col gap-xl">
        <div className="overflow-x-auto pt-xl"><ProgressSteps steps={STEPS} current={0} /></div>
        <div className="border-dashed-primary rounded-corner-lg p-2xl flex flex-col items-center gap-lg bg-surface-bg">
          <div className="w-16 h-16 rounded-corner-full bg-brand-tertiary flex items-center justify-center text-brand-primary"><Camera size={30} /></div>
          <div className="text-center">
            <p className="text-label text-text-primary font-medium">Take a Photo</p>
            <p className="text-label-sm text-text-secondary">Show your scrap item clearly</p>
          </div>
          <Btn variant="neutral" size="sm" iconStart={<Camera size={16} />}>Open Camera</Btn>
        </div>
        <div className="bg-surface-bg rounded-corner-lg p-xl flex flex-col gap-lg border border-border-primary">
          <SelectField label="Material Category" description="Select the type of scrap"
            options={SCRAP_CATEGORIES.map((c) => ({ label: c.label, value: c.label.toLowerCase() }))} />
          <Field label="Approximate Weight" description='Example: "5 kg"' placeholder="Enter weight in kg" />
          <div>
            <p className="text-label-sm text-text-primary font-medium mb-lg">Condition</p>
            <div className="flex gap-md">
              {["Good", "Used", "Damaged"].map((c) => (
                <button key={c} onClick={() => setCondition(c)}
                  className={`flex-1 py-md rounded-corner-full border text-label-sm font-medium transition-colors ${
                    condition === c ? "bg-brand-primary border-brand-primary text-on-brand" : "bg-surface-bg border-border-primary text-text-primary"
                  }`}>{c}</button>
              ))}
            </div>
          </div>
        </div>
        <Btn variant="primary" onClick={() => onNav("estimated-value")} iconEnd={<ArrowRight size={16} />} className="w-full justify-center">
          Check Estimated Value
        </Btn>
      </div>
    </MobileShell>
  )
}

function EstimatedValueScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const STEPS = ["Waste", "Collector", "Address", "Time", "Confirm"]
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Estimated Value" onBack={() => onNav("add-scrap")} />
      <div className="flex-1 flex flex-col px-xl pb-xl gap-xl">
        <div className="overflow-x-auto pt-xl"><ProgressSteps steps={STEPS} current={0} /></div>
        <div className="bg-surface-bg rounded-corner-lg p-2xl border border-border-primary flex flex-col items-center text-center gap-lg">
          <div className="w-16 h-16 rounded-corner-full bg-brand-tertiary flex items-center justify-center">
            <DollarSign size={30} className="text-brand-primary" />
          </div>
          <div>
            <p className="text-label-sm text-text-secondary mb-xs">Estimated Value</p>
            <p className="text-title text-text-primary font-semibold">₹450 – ₹550</p>
          </div>
          <BadgePill label="Demo Value" variant="warning" />
          <p className="text-label-sm text-text-secondary">Approximate value based on selected material and weight. Actual price may vary.</p>
        </div>
        <div className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary flex flex-col gap-md">
          {[["Material", "Electronics"], ["Weight", "5 kg"], ["Condition", "Good"]].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-label-sm text-text-secondary">{k}</span>
              <span className="text-label-sm text-text-primary font-medium">{v}</span>
            </div>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex flex-col gap-md">
          <Btn variant="primary" onClick={() => onNav("book-kabadiwala")} iconEnd={<Truck size={16} />} className="w-full justify-center">
            Book Kabadiwala
          </Btn>
          <Btn variant="neutral" onClick={() => onNav("add-scrap")} className="w-full justify-center">Edit Scrap</Btn>
        </div>
      </div>
    </MobileShell>
  )
}

/* NEW: Book Kabadiwala — map on top, collector cards below */
function BookKabadiScreen({ onNav, onSelectCollector }: {
  onNav: (s: Screen) => void; onSelectCollector: (idx: number) => void
}) {
  const STEPS = ["Waste", "Collector", "Address", "Time", "Confirm"]
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Choose a Collector" onBack={() => onNav("estimated-value")} />
      <div className="flex-1 overflow-y-auto flex flex-col gap-lg px-xl pb-xl">
        <div className="overflow-x-auto pt-xl"><ProgressSteps steps={STEPS} current={1} /></div>
        {/* Map showing multiple collector markers */}
        <div className="w-full bg-surface-bg rounded-corner-lg overflow-hidden border border-border-primary mock-map-medium">
          <svg width="100%" height="180" viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="180" fill="#e8f0e8" />
            <rect x="0" y="0" width="90" height="60" fill="#d4e8d4" />
            <rect x="100" y="10" width="70" height="45" fill="#c8dfc8" rx="4" />
            <rect x="180" y="5" width="80" height="50" fill="#d4e8d4" rx="4" />
            <rect x="270" y="0" width="90" height="55" fill="#c8dfc8" />
            <rect x="0" y="80" width="60" height="70" fill="#c8dfc8" rx="4" />
            <rect x="70" y="90" width="100" height="55" fill="#d4e8d4" rx="4" />
            <rect x="180" y="75" width="75" height="60" fill="#c8dfc8" rx="4" />
            <rect x="265" y="80" width="95" height="65" fill="#d4e8d4" />
            <rect x="0" y="68" width="360" height="14" fill="#f5f0e8" />
            <rect x="160" y="0" width="16" height="180" fill="#f5f0e8" />
            <rect x="290" y="0" width="12" height="180" fill="#f5f0e8" />
            {/* User marker */}
            <circle cx="168" cy="120" r="12" fill="#5250f3" />
            <circle cx="168" cy="120" r="6" fill="white" />
            <rect x="142" y="107" width="52" height="16" rx="8" fill="#5250f3" />
            <text x="168" y="119" textAnchor="middle" fill="white" fontSize="8" fontFamily="system-ui">You 📍</text>
            {/* Collector markers */}
            <circle cx="80" cy="50" r="10" fill="#16a34a" />
            <circle cx="80" cy="50" r="5" fill="white" />
            <text x="80" y="38" textAnchor="middle" fill="#16a34a" fontSize="8" fontFamily="system-ui" fontWeight="600">A</text>
            <circle cx="270" cy="90" r="10" fill="#16a34a" />
            <circle cx="270" cy="90" r="5" fill="white" />
            <text x="270" y="78" textAnchor="middle" fill="#16a34a" fontSize="8" fontFamily="system-ui" fontWeight="600">B</text>
            <circle cx="300" cy="30" r="10" fill="#16a34a" />
            <circle cx="300" cy="30" r="5" fill="white" />
            <text x="300" y="18" textAnchor="middle" fill="#16a34a" fontSize="8" fontFamily="system-ui" fontWeight="600">C</text>
            {/* Route lines */}
            <line x1="168" y1="120" x2="80" y2="50" stroke="#5250f3" strokeWidth="2" strokeDasharray="5,3" />
            <line x1="168" y1="120" x2="270" y2="90" stroke="#5250f3" strokeWidth="2" strokeDasharray="5,3" />
          </svg>
        </div>

        {COLLECTORS.map((c, i) => (
          <div key={c.id} className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary flex flex-col gap-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-lg">
                <div className="w-11 h-11 rounded-corner-full bg-brand-tertiary flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-label text-text-primary font-semibold">{c.name}</p>
                  <p className="text-video-title text-text-secondary">ID: {c.id}</p>
                </div>
              </div>
              <BadgePill label="✓ Verified" variant="success" />
            </div>
            <div className="flex flex-wrap gap-lg">
              <div className="flex items-center gap-xs"><MapPin size={12} className="text-text-secondary" /><span className="text-label-sm text-text-secondary">{c.dist}</span></div>
              <div className="flex items-center gap-xs"><Star size={12} className="text-brand-primary" /><span className="text-label-sm text-text-primary font-medium">{c.rating}</span></div>
              <div className="flex items-center gap-xs"><Clock size={12} className="text-text-secondary" /><span className="text-label-sm text-text-secondary">{c.available}</span></div>
            </div>
            <div className="flex flex-wrap gap-xs">
              {c.materials.map((m) => <span key={m} className="text-video-title bg-brand-tertiary text-brand-primary px-md py-xs rounded-corner-sm">♻ {m}</span>)}
            </div>
            <div className="flex gap-md">
              <Btn variant="neutral" size="sm" onClick={() => { onSelectCollector(i); onNav("collector-detail") }} className="flex-1 justify-center">View Details</Btn>
              <Btn variant="primary" size="sm" onClick={() => { onSelectCollector(i); onNav("select-address") }} className="flex-1 justify-center">Select</Btn>
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  )
}

/* NEW: Collector detail screen with full map */
function CollectorDetailScreen({ onNav, collectorIdx }: {
  onNav: (s: Screen) => void; collectorIdx: number
}) {
  const c = COLLECTORS[collectorIdx] ?? COLLECTORS[0]
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Collector Details" onBack={() => onNav("book-kabadiwala")} />
      <div className="flex-1 overflow-y-auto flex flex-col">
        <MockMap collectorName={c.name} dist={c.dist} />
        <div className="flex-1 flex flex-col gap-lg px-xl pb-xl pt-lg">
          {/* collector card */}
          <div className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary flex flex-col gap-lg">
            <div className="flex items-center gap-lg">
              <div className="w-14 h-14 rounded-corner-full bg-brand-tertiary flex items-center justify-center flex-shrink-0">
                <User size={26} className="text-brand-primary" />
              </div>
              <div className="flex-1">
                <p className="text-label text-text-primary font-semibold">{c.name}</p>
                <div className="flex items-center gap-md mt-xs">
                  <div className="flex items-center gap-xs"><Star size={12} className="text-brand-primary" /><span className="text-label-sm text-text-primary">{c.rating}</span></div>
                  <div className="flex items-center gap-xs"><MapPin size={12} className="text-text-secondary" /><span className="text-label-sm text-text-secondary">{c.dist} away</span></div>
                </div>
              </div>
              <BadgePill label={c.available.includes("Today") ? "Available" : "Tomorrow"} variant={c.available.includes("Today") ? "success" : "warning"} />
            </div>

            <div>
              <p className="text-label-sm text-text-primary font-medium mb-lg">Accepted Materials</p>
              <div className="flex flex-wrap gap-xs">
                {c.materials.map((m) => <span key={m} className="text-label-sm bg-brand-tertiary text-brand-primary px-lg py-xs rounded-corner-sm">♻ {m}</span>)}
              </div>
            </div>

            <div className="bg-bg-faint rounded-corner-md p-lg">
              <p className="text-label-sm text-text-secondary font-medium mb-xs">Pickup Information</p>
              <p className="text-label-sm text-text-primary">Estimated pickup: <span className="font-medium">{c.eta}</span></p>
              <p className="text-video-title text-text-secondary mt-xs">ID: {c.id} · {c.area}</p>
            </div>
          </div>

          <div className="flex flex-col gap-md">
            <Btn variant="primary" onClick={() => onNav("select-address")} iconEnd={<ArrowRight size={16} />} className="w-full justify-center">
              Select Collector
            </Btn>
            <Btn variant="neutral" className="w-full justify-center" iconStart={<Phone size={16} />}>
              Contact Collector
            </Btn>
          </div>
        </div>
      </div>
    </MobileShell>
  )
}

/* NEW: Select Address */
function SelectAddressScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const STEPS = ["Waste", "Collector", "Address", "Time", "Confirm"]
  const [selected, setSelected] = useState(0)
  const addresses = [
    { label: "Home", addr: "12, 5th Cross, Koramangala, Bengaluru – 560034" },
    { label: "Office", addr: "Tower B, Embassy Tech Village, Outer Ring Road, Bengaluru – 560103" },
  ]
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Select Address" onBack={() => onNav("book-kabadiwala")} />
      <div className="flex-1 overflow-y-auto px-xl pb-xl flex flex-col gap-xl">
        <div className="overflow-x-auto pt-xl"><ProgressSteps steps={STEPS} current={2} /></div>
        <div className="flex flex-col gap-md">
          {addresses.map((a, i) => (
            <button key={a.label} onClick={() => setSelected(i)}
              className={`w-full bg-surface-bg rounded-corner-lg p-xl border-2 text-left flex items-start gap-lg transition-all ${
                selected === i ? "border-brand-primary" : "border-border-primary"
              }`}>
              <div className={`w-5 h-5 rounded-corner-full border-2 flex items-center justify-center mt-xs flex-shrink-0 ${selected === i ? "border-brand-primary" : "border-border-primary"}`}>
                {selected === i && <div className="w-2.5 h-2.5 rounded-corner-full bg-brand-primary" />}
              </div>
              <div>
                <p className="text-label text-text-primary font-semibold mb-xs">{a.label}</p>
                <p className="text-label-sm text-text-secondary">{a.addr}</p>
              </div>
            </button>
          ))}
          <button className="w-full bg-surface-bg rounded-corner-lg p-xl border border-dashed border-border-primary flex items-center gap-lg hover:border-brand-primary transition-colors">
            <div className="w-10 h-10 rounded-corner-full bg-brand-tertiary flex items-center justify-center text-brand-primary"><Plus size={20} /></div>
            <span className="text-label-sm text-brand-primary font-medium">Add New Address</span>
          </button>
        </div>
        <div className="flex-1" />
        <Btn variant="primary" onClick={() => onNav("select-datetime")} iconEnd={<ArrowRight size={16} />} className="w-full justify-center">
          Continue to Time Slot
        </Btn>
      </div>
    </MobileShell>
  )
}

/* NEW: Select Date & Time */
function SelectDateTimeScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const STEPS = ["Waste", "Collector", "Address", "Time", "Confirm"]
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState(0)
  const days = ["Today", "Tomorrow", "Thu 26", "Fri 27", "Sat 28"]
  const slots = ["8:00 AM – 10:00 AM", "10:00 AM – 12:00 PM", "12:00 PM – 2:00 PM", "2:00 PM – 4:00 PM", "4:00 PM – 6:00 PM"]
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Select Date & Time" onBack={() => onNav("select-address")} />
      <div className="flex-1 overflow-y-auto px-xl pb-xl flex flex-col gap-xl">
        <div className="overflow-x-auto pt-xl"><ProgressSteps steps={STEPS} current={3} /></div>

        <div className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary flex flex-col gap-lg">
          <p className="text-label text-text-primary font-semibold">Select Date</p>
          <div className="flex gap-md overflow-x-auto pb-xs">
            {days.map((d, i) => (
              <button key={d} onClick={() => setSelectedDay(i)} className="flex-shrink-0"
                className={`px-lg py-md rounded-corner-lg border text-label-sm font-medium transition-colors ${
                  selectedDay === i ? "bg-brand-primary border-brand-primary text-on-brand" : "bg-surface-bg border-border-primary text-text-primary"
                }`}>{d}</button>
            ))}
          </div>
        </div>

        <div className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary flex flex-col gap-md">
          <p className="text-label text-text-primary font-semibold mb-xs">Select Time Slot</p>
          {slots.map((s, i) => (
            <button key={s} onClick={() => setSelectedSlot(i)}
              className={`w-full px-lg py-md rounded-corner-md border text-left text-label-sm font-medium transition-colors flex items-center justify-between ${
                selectedSlot === i ? "bg-brand-tertiary border-brand-primary text-brand-primary" : "bg-surface-bg border-border-primary text-text-primary"
              }`}>
              <span>{s}</span>
              {selectedSlot === i && <CheckCircle size={16} />}
            </button>
          ))}
        </div>

        <Btn variant="primary" onClick={() => onNav("review-pickup")} iconEnd={<ArrowRight size={16} />} className="w-full justify-center">
          Review Pickup
        </Btn>
      </div>
    </MobileShell>
  )
}

/* NEW: Review & Confirm Pickup */
function ReviewPickupScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const STEPS = ["Waste", "Collector", "Address", "Time", "Confirm"]
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Review Pickup" onBack={() => onNav("select-datetime")} />
      <div className="flex-1 overflow-y-auto px-xl pb-xl flex flex-col gap-xl">
        <div className="overflow-x-auto pt-xl"><ProgressSteps steps={STEPS} current={4} /></div>

        {[
          { title: "Scrap Details", rows: [["Material", "Electronics"], ["Weight", "5 kg"], ["Condition", "Good"], ["Estimated Value", "₹450–₹550"]], nav: "add-scrap" },
          { title: "Collector", rows: [["Name", "Ramesh Kumar"], ["ID", "KC-10482"], ["Distance", "1.8 km"], ["ETA", "30–45 min"]], nav: "book-kabadiwala" },
          { title: "Address", rows: [["Type", "Home"], ["Address", "12, 5th Cross, Koramangala"]], nav: "select-address" },
          { title: "Date & Time", rows: [["Date", "Today, 24 Sep 2026"], ["Slot", "10:00 AM – 12:00 PM"]], nav: "select-datetime" },
        ].map((sec) => (
          <div key={sec.title} className="bg-surface-bg rounded-corner-lg border border-border-primary overflow-hidden">
            <div className="flex justify-between items-center px-xl py-lg border-b border-border-secondary">
              <p className="text-label-sm text-text-primary font-semibold">{sec.title}</p>
              <button onClick={() => onNav(sec.nav as Screen)} className="text-video-title text-brand-primary font-medium">Edit</button>
            </div>
            <div className="px-xl py-lg flex flex-col gap-md">
              {sec.rows.map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-label-sm text-text-secondary">{k}</span>
                  <span className="text-label-sm text-text-primary font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Btn variant="primary" onClick={() => onNav("pickup-confirmed")} className="w-full justify-center">
          Confirm Pickup
        </Btn>
        <Btn variant="subtle" className="w-full justify-center">
          Cancel Request
        </Btn>
      </div>
    </MobileShell>
  )
}

/* NEW: Pickup Confirmed */
function PickupConfirmedScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <MobileShell>
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center px-2xl gap-2xl">
        <div className="bg-surface-bg rounded-corner-lg p-2xl border border-border-primary w-full flex flex-col items-center gap-xl text-center">
          <div className="w-20 h-20 rounded-corner-full bg-success flex items-center justify-center">
            <Check size={40} className="text-white" />
          </div>
          <div>
            <p className="text-title text-text-primary font-semibold">Pickup Scheduled!</p>
            <p className="text-label-sm text-text-secondary mt-xs">Your pickup has been confirmed.</p>
          </div>
          <div className="w-full bg-bg-faint rounded-corner-md p-lg flex flex-col gap-md">
            {[["Pickup ID", "KC10245"], ["Collector", "Ramesh Kumar"], ["Date", "24 September 2026"], ["Time", "10:00 AM – 12:00 PM"], ["Location", "Home, Koramangala"]].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-label-sm text-text-secondary">{k}</span>
                <span className="text-label-sm text-text-primary font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-md">
          <Btn variant="primary" onClick={() => onNav("track-pickup")} iconEnd={<MapPin size={16} />} className="w-full justify-center">Track Pickup</Btn>
          <Btn variant="neutral" onClick={() => onNav("user-home")} className="w-full justify-center">Back to Home</Btn>
        </div>
      </div>
    </MobileShell>
  )
}

function TrackPickupScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const steps = [
    { label: "Request Created", done: true },
    { label: "Pickup Confirmed", done: true },
    { label: "Collector Assigned", done: true, active: true },
    { label: "Collector Arriving", done: false },
    { label: "Waste Collected", done: false },
    { label: "Completed", done: false },
  ]
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Track Pickup" onBack={() => onNav("user-home")} />
      <div className="flex-1 overflow-y-auto px-xl pb-xl flex flex-col gap-xl">
        <div className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary mt-lg">
          <div className="flex justify-between mb-lg">
            <div>
              <p className="text-label-sm text-text-secondary">Pickup ID</p>
              <p className="text-label text-text-primary font-semibold">KC10245</p>
            </div>
            <BadgePill label="Collector Assigned" variant="warning" />
          </div>
          <div className="flex justify-between">
            <div><p className="text-label-sm text-text-secondary">Collector</p><p className="text-label-sm text-text-primary font-medium">Ramesh Kumar</p></div>
            <div className="text-right"><p className="text-label-sm text-text-secondary">ETA</p><p className="text-label-sm text-text-primary font-medium">~30 min</p></div>
          </div>
        </div>

        {/* Small map showing collector approaching */}
        <MockMap collectorName="Ramesh Kumar" dist="1.8 km" compact />

        <div className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary">
          <p className="text-label text-text-primary font-semibold mb-xl">Status Timeline</p>
          <div className="flex flex-col gap-md">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-start gap-lg">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-corner-full flex items-center justify-center ${
                    step.done && !step.active ? "bg-brand-primary" : step.active ? "bg-warning border-2 border-warning" : "bg-surface-bg border-2 border-border-primary"
                  }`}>
                    {step.done && !step.active ? <CheckCircle size={16} className="text-white" /> :
                     step.active ? <div className="w-3 h-3 rounded-corner-full bg-surface-bg" /> :
                     <div className="w-2 h-2 rounded-corner-full bg-border-primary" />}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`timeline-line ${step.done ? "bg-brand-primary" : "bg-border-secondary"}`} />
                  )}
                </div>
                <p className={`text-label-sm font-medium pt-xs ${step.done || step.active ? "text-text-primary" : "text-text-tertiary"}`}>{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-md">
          <Btn variant="neutral" className="flex-1 justify-center" iconStart={<Phone size={16} />}>Contact Collector</Btn>
          <Btn variant="subtle" size="sm">View Details</Btn>
        </div>
      </div>
      <BottomNav active="track-pickup" onNav={onNav} />
    </MobileShell>
  )
}

function RecyclingJourneyScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const stops = [
    { icon: <Home size={18} />, label: "My Home", sub: "Koramangala, Bengaluru" },
    { icon: <Truck size={18} />, label: "Kabadiwala", sub: "Ramesh Kumar · KC-10482" },
    { icon: <Package size={18} />, label: "Scrap Lot", sub: "LOT-KC-24091 · 5 kg · Electronics" },
    { icon: <ShieldCheck size={18} />, label: "Authorized Recycler", sub: "ABC E-Waste Recycling" },
    { icon: <Recycle size={18} />, label: "Recycling Facility", sub: "Peenya Industrial Area" },
  ]
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="My Recycling Journey" onBack={() => onNav("user-home")} />
      <div className="flex-1 overflow-y-auto px-xl pb-xl flex flex-col gap-xl">
        <div className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary mt-lg">
          <div className="flex justify-between items-center mb-lg">
            <p className="text-label text-text-primary font-semibold">HANDOVER-KC-82741</p>
            <BadgePill label="✓ Confirmed" variant="success" />
          </div>
          <p className="text-video-title text-text-secondary">Date: 24 Sep 2026 · 5 kg · Electronics</p>
        </div>
        <div className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary">
          <p className="text-label text-text-primary font-semibold mb-xl">Scrap Trail</p>
          <div className="flex flex-col gap-md">
            {stops.map((stop, i) => (
              <div key={stop.label} className="flex items-start gap-lg">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-corner-full bg-brand-primary flex items-center justify-center text-white flex-shrink-0">{stop.icon}</div>
                  {i < stops.length - 1 && <div className="timeline-line-tall bg-brand-primary" />}
                </div>
                <div className="pt-xs flex-1">
                  <p className="text-label-sm text-text-primary font-medium">{stop.label}</p>
                  <p className="text-video-title text-text-secondary">{stop.sub}</p>
                </div>
                <CheckCircle size={15} className="text-success mt-xs" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-corner-lg p-xl border border-brand-primary bg-brand-muted">
          <div className="flex items-center gap-md mb-xs">
            <Leaf size={18} className="text-brand-primary" />
            <p className="text-label-sm text-brand-primary font-semibold">You recycled responsibly!</p>
          </div>
          <p className="text-video-title text-text-secondary">Your scrap has been tracked end-to-end.</p>
        </div>
      </div>
      <BottomNav active="user-home" onNav={onNav} />
    </MobileShell>
  )
}

function EarningsScreen({ onNav, role }: { onNav: (s: Screen) => void; role: Role }) {
  const txns = [
    { material: "Electronics (5 kg)", price: "₹520", status: "Paid", method: "Cash" },
    { material: "Cables (2 kg)", price: "₹180", status: "Paid", method: "UPI" },
    { material: "Batteries (3 kg)", price: "₹95", status: "Pending", method: "Cash" },
  ]
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="My Earnings" onBack={() => onNav(role === "kabadiwala" ? "kabadiwala-dashboard" : "user-home")} />
      <div className="flex-1 overflow-y-auto px-xl pb-xl flex flex-col gap-xl">
        <div className="grid grid-cols-3 gap-lg mt-lg">
          {[["Total Earned", "₹2,840"], ["Pending", "₹95"], ["Completed", "₹2,745"]].map(([label, amt]) => (
            <div key={label} className="bg-surface-bg rounded-corner-lg p-lg border border-border-primary flex flex-col items-center text-center gap-xs">
              <p className="text-label text-text-primary font-semibold">{amt}</p>
              <p className="text-video-title text-text-secondary">{label}</p>
            </div>
          ))}
        </div>
        <div className="bg-surface-bg rounded-corner-lg border border-border-primary overflow-hidden">
          <div className="px-xl py-lg border-b border-border-secondary"><p className="text-label text-text-primary font-semibold">Transactions</p></div>
          {txns.map((t, i) => (
            <div key={i} className={`px-xl py-lg flex justify-between items-center ${i < txns.length - 1 ? "border-b border-border-secondary" : ""}`}>
              <div className="flex flex-col gap-xs">
                <p className="text-label-sm text-text-primary font-medium">{t.material}</p>
                <p className="text-video-title text-text-secondary">{t.method}</p>
              </div>
              <div className="flex flex-col items-end gap-xs">
                <p className="text-label-sm text-text-primary font-semibold">{t.price}</p>
                <BadgePill label={t.status} variant={t.status === "Paid" ? "success" : "warning"} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {role === "kabadiwala" ? <KabBottomNav active="earnings" onNav={onNav} /> : <BottomNav active="earnings" onNav={onNav} />}
    </MobileShell>
  )
}

function SafetyScreen({ onNav, role }: { onNav: (s: Screen) => void; role: Role }) {
  const tips = [
    { icon: "🔥", label: "Do not burn wires", desc: "Burning releases toxic fumes harmful to health." },
    { icon: "🔋", label: "Handle batteries carefully", desc: "Keep away from heat and puncture." },
    { icon: "⚠️", label: "Do not open damaged batteries", desc: "Acid leaks can cause severe burns." },
    { icon: "🖥️", label: "Do not break CRT screens", desc: "Contains lead and toxic phosphors." },
    { icon: "🧪", label: "Avoid unsafe chemical handling", desc: "Wear gloves when handling e-waste." },
  ]
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Safe Recycling" onBack={() => onNav(role === "kabadiwala" ? "kabadiwala-dashboard" : "user-home")} />
      <div className="flex-1 overflow-y-auto px-xl pb-xl flex flex-col gap-lg">
        <button className="bg-brand-primary rounded-corner-lg p-xl flex items-center gap-lg text-white w-full text-left mt-lg">
          <Volume2 size={26} /><div><p className="text-label font-semibold">Listen to Safety Guide</p><p className="text-label-sm opacity-80">Audio guide available</p></div>
        </button>
        {tips.map((tip) => (
          <div key={tip.label} className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary flex items-start gap-lg">
            <span className="icon-emoji">{tip.icon}</span>
            <div><p className="text-label text-text-primary font-semibold mb-xs">{tip.label}</p><p className="text-label-sm text-text-secondary">{tip.desc}</p></div>
          </div>
        ))}
      </div>
    </MobileShell>
  )
}

function ProfileScreen({ onNav, role, language }: { onNav: (s: Screen) => void; role: Role; language: string }) {
  const items = [
    { icon: <User size={16} />, label: "Personal Information" },
    { icon: <MapPin size={16} />, label: "My Addresses", sublabel: "Nandyal - Andra Pradesh" },
    { icon: <Clock size={16} />, label: "Pickup History" },
    { icon: <DollarSign size={16} />, label: "Transactions" },
    { icon: <Bell size={16} />, label: "Notifications" },
    { icon: <Globe size={16} />, label: "Language", sublabel: language, screen: "language" as Screen },
    { icon: <Shield size={16} />, label: "Help & Support" },
    { icon: <Settings size={16} />, label: "Settings" },
    { icon: <Shield size={16} />, label: "Safety Tips", screen: "safety" as Screen },
  ]
  return (
    <MobileShell>
      <StatusBar />
      <div className="flex-1 overflow-y-auto pb-xl">
        <div className="bg-surface-bg mx-xl mt-lg mb-xl rounded-corner-lg p-xl flex items-center gap-lg border border-border-primary">
          <div className="w-16 h-16 rounded-corner-full bg-brand-tertiary flex items-center justify-center">
            <User size={30} className="text-brand-primary" />
          </div>
          <div>
            <p className="text-label text-text-primary font-semibold">Sandeep Panyam</p>
            <p className="text-label-sm text-text-secondary capitalize">{role === "kabadiwala" ? "Kabadiwala / Collector" : role}</p>
            <p className="text-video-title text-text-tertiary">{language} · Nandyal - Andra Pradesh</p>
          </div>
        </div>
        <div className="mx-xl bg-surface-bg rounded-corner-lg border border-border-primary overflow-hidden">
          {items.map((item, i) => (
            <button key={item.label} onClick={() => item.screen && onNav(item.screen)}
              className={`w-full px-xl py-lg flex items-center gap-lg hover:bg-surface-hover transition-colors text-left ${i < items.length - 1 ? "border-b border-border-secondary" : ""}`}>
              <span className="text-text-secondary">{item.icon}</span>
              <div className="flex-1">
                <span className="text-label-sm text-text-primary font-medium block">{item.label}</span>
                {"sublabel" in item && (item as { sublabel?: string }).sublabel && (
                  <span className="text-video-title text-text-secondary">{(item as { sublabel?: string }).sublabel}</span>
                )}
              </div>
              <ChevronRight size={15} className="text-text-tertiary" />
            </button>
          ))}
        </div>
        <div className="mx-xl mt-xl">
          <Btn variant="subtle" onClick={() => onNav("role")} className="w-full justify-center">Switch Role / Logout</Btn>
        </div>
      </div>
      {role === "kabadiwala" ? <KabBottomNav active="profile" onNav={onNav} /> : <BottomNav active="profile" onNav={onNav} />}
    </MobileShell>
  )
}

/* NEW: Marketplace */
function MarketplaceScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <MobileShell>
      <StatusBar />
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="px-xl pt-lg pb-xl bg-surface-bg mx-xl mt-md rounded-corner-lg">
          <h1 className="text-title text-text-primary">Marketplace</h1>
          <p className="text-label-sm text-text-secondary mt-xs">Buy and sell bulk scrap materials</p>
        </div>
        {/* search + filter */}
        <div className="flex gap-md px-xl mt-xl">
          <div className="flex-1 flex items-center gap-md bg-surface-bg border border-border-primary rounded-corner-full px-lg py-md">
            <Search size={16} className="text-text-tertiary" />
            <span className="text-input text-text-tertiary">Search materials…</span>
          </div>
          <button className="w-10 h-10 bg-surface-bg border border-border-primary rounded-corner-full flex items-center justify-center text-text-secondary">
            <Filter size={16} />
          </button>
        </div>
        {/* categories */}
        <div className="flex gap-md px-xl mt-lg overflow-x-auto pb-xs">
          {["All", "Metals", "Plastics", "Electronics", "Paper"].map((c, i) => (
            <button key={c} className="flex-shrink-0"
              className={`px-lg py-xs rounded-corner-full text-label-sm font-medium border transition-colors ${i === 0 ? "bg-brand-primary border-brand-primary text-on-brand" : "bg-surface-bg border-border-primary text-text-secondary"}`}>
              {c}
            </button>
          ))}
        </div>
        {/* listings */}
        <div className="px-xl mt-xl flex flex-col gap-lg pb-xl">
          {MARKETPLACE_ITEMS.map((item) => (
            <div key={item.name} className="bg-surface-bg rounded-corner-lg border border-border-primary overflow-hidden">
              <div className="px-xl py-lg border-b border-border-secondary flex items-center justify-between">
                <div className="flex items-center gap-md">
                  <div className="w-9 h-9 rounded-corner-md bg-brand-tertiary flex items-center justify-center text-brand-primary"><Package size={18} /></div>
                  <div>
                    <p className="text-label-sm text-text-primary font-semibold">{item.name}</p>
                    <p className="text-video-title text-text-secondary">{item.seller}</p>
                  </div>
                </div>
                {item.badge && <BadgePill label={item.badge} variant={item.badge === "Hot" ? "danger" : "brand"} />}
              </div>
              <div className="px-xl py-lg flex items-center justify-between">
                <div>
                  <p className="text-label text-text-primary font-semibold">{item.price}</p>
                  <p className="text-video-title text-text-secondary">Available: {item.qty}</p>
                </div>
                <Btn variant="primary" size="sm">Buy Now</Btn>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="marketplace" onNav={onNav} />
    </MobileShell>
  )
}

/* ── KABADIWALA SCREENS ─────────────────────────────────────────── */

function KabadiLoginScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <MobileShell>
      <StatusBar />
      <div className="flex-1 flex flex-col p-2xl">
        <div className="flex items-center gap-md mb-2xl mt-lg">
          <div className="w-12 h-12 rounded-corner-lg bg-brand-primary flex items-center justify-center">
            <Truck size={22} className="text-white" />
          </div>
          <p className="text-label text-text-primary font-semibold">Kabadiwala Login</p>
        </div>
        <div className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary flex flex-col gap-lg mb-xl">
          <Field label="Kabadiwala ID" description="Enter your registered ID (e.g. KC-10482)" placeholder="KC-XXXXX" />
          <Field label="Mobile Number" placeholder="+91 XXXXX XXXXX" />
        </div>
        <Btn variant="primary" iconStart={<LogIn size={16} />} onClick={() => onNav("kabadiwala-dashboard")} className="w-full justify-center">Login</Btn>
        <div className="mt-auto text-center pt-2xl">
          <p className="text-label-sm text-text-secondary mb-lg">Don&apos;t have a Kabadiwala ID?</p>
          <Btn variant="neutral" iconStart={<UserPlus size={16} />} onClick={() => onNav("kabadiwala-register")} className="w-full justify-center">Register as Kabadiwala</Btn>
        </div>
      </div>
    </MobileShell>
  )
}

function KabadiRegisterScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Register as Kabadiwala" onBack={() => onNav("kabadiwala-login")} />
      <div className="flex-1 overflow-y-auto px-xl pb-xl flex flex-col gap-xl">
        <div className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary flex flex-col gap-lg mt-lg">
          <Field label="Full Name" placeholder="Your full name" />
          <Field label="Mobile Number" placeholder="+91 XXXXX XXXXX" />
          <SelectField label="Operating Area" description="Select your work area"
            options={[{ label: "Koramangala", value: "koramangala" }, { label: "Indiranagar", value: "indiranagar" }, { label: "HSR Layout", value: "hsr" }, { label: "Whitefield", value: "whitefield" }]} />
          <SelectField label="Preferred Language" options={LANGUAGES.map((l) => ({ label: l, value: l }))} />
        </div>
        <Btn variant="primary" onClick={() => onNav("kabadiwala-id")} iconEnd={<ArrowRight size={16} />} className="w-full justify-center">Generate Kabadiwala ID</Btn>
      </div>
    </MobileShell>
  )
}

function KabadiIdScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <MobileShell>
      <StatusBar />
      <div className="flex-1 flex flex-col items-center justify-center px-2xl gap-2xl">
        <div className="bg-surface-bg rounded-corner-lg p-2xl border border-border-primary w-full flex flex-col items-center gap-xl text-center">
          <div className="w-20 h-20 rounded-corner-full bg-brand-tertiary flex items-center justify-center">
            <ShieldCheck size={38} className="text-brand-primary" />
          </div>
          <div>
            <p className="text-label-sm text-text-secondary mb-xs">Your Kabadiwala ID</p>
            <p className="text-title text-brand-primary font-semibold">KC-10482</p>
          </div>
          <BadgePill label="Registration Successful" variant="success" />
          <p className="text-label-sm text-text-secondary">Keep this ID safe. You will need it to log in and receive pickup requests.</p>
        </div>
        <Btn variant="primary" onClick={() => onNav("kabadiwala-dashboard")} iconEnd={<ArrowRight size={16} />} className="w-full justify-center">Continue to Dashboard</Btn>
      </div>
    </MobileShell>
  )
}

function KabadiDashboardScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const actions = [
    { icon: <Package size={20} />, label: "My Pickups", screen: "todays-pickups" as Screen },
    { icon: <Plus size={20} />, label: "Create Scrap Lot", screen: "todays-pickups" as Screen },
    { icon: <BarChart3 size={20} />, label: "Price Board", screen: "price-board" as Screen },
    { icon: <Recycle size={20} />, label: "Find Recycler", screen: "find-recycler" as Screen },
    { icon: <DollarSign size={20} />, label: "Earnings", screen: "earnings" as Screen },
    { icon: <User size={20} />, label: "Profile", screen: "profile" as Screen },
  ]
  return (
    <MobileShell>
      <StatusBar />
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="px-xl pt-lg pb-xl bg-surface-bg mx-xl mt-md rounded-corner-lg">
          <p className="text-label-sm text-text-secondary">Kabadiwala Dashboard</p>
          <h1 className="text-title text-text-primary mt-xs">Welcome, Ramesh! 👋</h1>
          <p className="text-video-title text-text-tertiary">ID: KC-10482 · Koramangala</p>
        </div>
        <div className="px-xl mt-xl grid grid-cols-3 gap-lg">
          {[["Today's Pickups", "4"], ["Pending", "2"], ["Today's Earnings", "₹620"]].map(([label, val]) => (
            <div key={label} className="bg-surface-bg rounded-corner-lg p-lg border border-border-primary flex flex-col items-center text-center gap-xs">
              <p className="text-label text-text-primary font-semibold">{val}</p>
              <p className="text-video-title text-text-secondary">{label}</p>
            </div>
          ))}
        </div>
        <div className="px-xl mt-xl">
          <p className="text-label-sm text-text-secondary font-medium mb-lg">Actions</p>
          <div className="grid grid-cols-2 gap-lg">
            {actions.map((a) => (
              <button key={a.label} onClick={() => onNav(a.screen)}
                className="bg-surface-bg rounded-corner-lg p-lg flex items-center gap-md border border-border-primary hover:border-brand-primary transition-colors">
                <div className="w-9 h-9 rounded-corner-md bg-brand-tertiary flex items-center justify-center text-brand-primary flex-shrink-0">{a.icon}</div>
                <span className="text-label-sm text-text-primary font-medium">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="spacer-lg" />
      </div>
      <KabBottomNav active="kabadiwala-dashboard" onNav={onNav} />
    </MobileShell>
  )
}

function TodaysPickupsScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const pickups = [
    { num: "01", location: "Koramangala 5th Block", scrap: "Electronics + Cables", weight: "8 kg", time: "10:30 AM" },
    { num: "02", location: "HSR Layout, Sector 2", scrap: "Batteries + PCBs", weight: "5 kg", time: "1:00 PM" },
    { num: "03", location: "Indiranagar 12th Main", scrap: "Mixed Plastic", weight: "12 kg", time: "3:30 PM" },
  ]
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Today's Pickups" onBack={() => onNav("kabadiwala-dashboard")} />
      <div className="flex-1 overflow-y-auto px-xl pb-xl flex flex-col gap-lg">
        {pickups.map((p) => (
          <div key={p.num} className="bg-surface-bg rounded-corner-lg border border-border-primary overflow-hidden mt-lg">
            <div className="flex justify-between items-center px-xl py-lg bg-bg-faint border-b border-border-secondary">
              <p className="text-label-sm text-text-primary font-semibold">Pickup #{p.num}</p>
              <p className="text-video-title text-text-secondary">{p.time}</p>
            </div>
            <div className="px-xl py-lg flex flex-col gap-md">
              <div className="flex items-center gap-xs"><MapPin size={13} className="text-text-secondary" /><p className="text-label-sm text-text-secondary">{p.location}</p></div>
              <div className="flex items-center gap-xs"><Package size={13} className="text-text-secondary" /><p className="text-label-sm text-text-secondary">{p.scrap}</p></div>
              <div className="flex items-center gap-xs"><BarChart3 size={13} className="text-text-secondary" /><p className="text-label-sm text-text-secondary">Approx. {p.weight}</p></div>
            </div>
            <div className="px-xl pb-lg flex gap-md">
              <Btn variant="primary" size="sm" className="flex-1 justify-center">Accept</Btn>
              <Btn variant="neutral" size="sm" className="flex-1 justify-center">View Details</Btn>
            </div>
          </div>
        ))}
      </div>
      <KabBottomNav active="todays-pickups" onNav={onNav} />
    </MobileShell>
  )
}

function PriceBoardScreen({ onNav, role }: { onNav: (s: Screen) => void; role: Role }) {
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Today's Scrap Prices" onBack={() => onNav(role === "kabadiwala" ? "kabadiwala-dashboard" : "user-home")} />
      <div className="flex-1 overflow-y-auto px-xl pb-xl flex flex-col gap-lg">
        <div className="flex gap-md mt-lg">
          <BadgePill label="Live Rates" variant="brand" />
          <BadgePill label="24 Sep 2026" variant="secondary" />
        </div>
        <div className="bg-surface-bg rounded-corner-lg border border-border-primary overflow-hidden">
          {PRICE_DATA.map((item, i) => (
            <div key={item.name} className={`px-xl py-lg flex items-center justify-between ${i < PRICE_DATA.length - 1 ? "border-b border-border-secondary" : ""}`}>
              <div>
                <p className="text-label-sm text-text-primary font-medium">{item.name}</p>
                <p className="text-video-title text-text-secondary">per {item.unit}</p>
              </div>
              <div className="flex items-center gap-md">
                <p className="text-label-sm text-text-primary font-semibold">{item.price}</p>
                {item.trend === "up" && <TrendingUp size={13} className="text-success" />}
                {item.trend === "down" && <TrendingDown size={13} className="text-danger" />}
                {item.trend === "stable" && <Minus size={13} className="text-text-tertiary" />}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-bg-faint rounded-corner-md p-lg flex gap-lg">
          <div className="flex items-center gap-xs"><TrendingUp size={11} className="text-success" /><span className="text-video-title text-text-secondary">Rising</span></div>
          <div className="flex items-center gap-xs"><Minus size={11} className="text-text-tertiary" /><span className="text-video-title text-text-secondary">Stable</span></div>
          <div className="flex items-center gap-xs"><TrendingDown size={11} className="text-danger" /><span className="text-video-title text-text-secondary">Falling</span></div>
        </div>
      </div>
      {role === "kabadiwala" ? <KabBottomNav active="price-board" onNav={onNav} /> : <BottomNav active="price-board" onNav={onNav} />}
    </MobileShell>
  )
}

function RecyclerDashboardScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const cards = [
    { label: "Incoming Lots", value: "6", icon: <Package size={20} /> },
    { label: "Material Requests", value: "3", icon: <Bell size={20} /> },
    { label: "Available Collections", value: "8", icon: <Truck size={20} /> },
    { label: "Completed Handovers", value: "42", icon: <CheckCircle size={20} /> },
  ]
  return (
    <MobileShell>
      <StatusBar />
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="px-xl pt-lg pb-xl bg-surface-bg mx-xl mt-md rounded-corner-lg">
          <p className="text-label-sm text-text-secondary">Recycler Dashboard</p>
          <h1 className="text-title text-text-primary mt-xs">ABC E-Waste Recycling</h1>
          <div className="flex items-center gap-xs mt-xs">
            <ShieldCheck size={13} className="text-success" />
            <span className="text-video-title text-success font-medium">Authorized Recycler</span>
          </div>
        </div>
        <div className="px-xl mt-xl grid grid-cols-2 gap-lg">
          {cards.map((c) => (
            <div key={c.label} className="bg-surface-bg rounded-corner-lg p-xl border border-border-primary flex flex-col gap-md">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-corner-md bg-brand-tertiary flex items-center justify-center text-brand-primary">{c.icon}</div>
                <p className="text-title text-text-primary font-semibold">{c.value}</p>
              </div>
              <p className="text-label-sm text-text-secondary">{c.label}</p>
            </div>
          ))}
        </div>
        <div className="px-xl mt-xl mb-2xl">
          <Btn variant="primary" onClick={() => onNav("find-recycler")} iconEnd={<ArrowRight size={16} />} className="w-full justify-center">View Incoming Collections</Btn>
        </div>
      </div>
    </MobileShell>
  )
}

function FindRecyclerScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <MobileShell>
      <StatusBar />
      <TopBar title="Find a Recycler" onBack={() => onNav("kabadiwala-dashboard")} />
      <div className="flex-1 overflow-y-auto px-xl pb-xl flex flex-col gap-lg">
        {RECYCLERS.map((r) => (
          <div key={r.name} className="bg-surface-bg rounded-corner-lg border border-border-primary overflow-hidden mt-lg">
            <div className="px-xl pt-xl pb-lg flex justify-between items-start">
              <div className="flex-1">
                <p className="text-label text-text-primary font-semibold mb-xs">{r.name}</p>
                <div className="flex items-center gap-xs mb-xs"><ShieldCheck size={11} className="text-success" /><span className="text-video-title text-success">Authorized Recycler</span></div>
                <div className="flex items-center gap-xs"><MapPin size={11} className="text-text-secondary" /><span className="text-video-title text-text-secondary">{r.dist} · {r.area}</span></div>
              </div>
              <BadgePill label={r.pickup} variant={r.pickup === "Available" ? "success" : "warning"} />
            </div>
            <div className="px-xl pb-xl flex flex-col gap-xs">
              <p className="text-video-title text-text-secondary">Materials: {r.materials}</p>
              <p className="text-label-sm text-text-primary font-medium">{r.rate}</p>
              <div className="mt-md"><Btn variant="primary" size="sm">Select Recycler</Btn></div>
            </div>
          </div>
        ))}
      </div>
    </MobileShell>
  )
}

/* ── MAIN APP ───────────────────────────────────────────────────── */

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash")
  const [role, setRole] = useState<Role>("user")
  const [language, setLanguage] = useState("English")
  const [selectedCollector, setSelectedCollector] = useState(0)

  const nav = (s: Screen) => setScreen(s)

  const handleRole = (r: Role) => {
    setRole(r)
    if (r === "user") setScreen("user-home")
    else if (r === "kabadiwala") setScreen("kabadiwala-login")
    else setScreen("recycler-dashboard")
  }

  return (
    <>
      {screen === "splash" && <SplashScreen onStart={() => nav("language")} />}
      {screen === "language" && <LanguageScreen selectedLang={language} onChangeLang={setLanguage} onSelect={() => nav("role")} />}
      {screen === "role" && <RoleScreen onRole={handleRole} />}

      {screen === "user-home" && <UserHomeScreen onNav={nav} />}
      {screen === "scrap-category" && <ScrapCategoryScreen onNav={nav} />}
      {screen === "add-scrap" && <AddScrapScreen onNav={nav} />}
      {screen === "estimated-value" && <EstimatedValueScreen onNav={nav} />}
      {screen === "book-kabadiwala" && <BookKabadiScreen onNav={nav} onSelectCollector={setSelectedCollector} />}
      {screen === "collector-detail" && <CollectorDetailScreen onNav={nav} collectorIdx={selectedCollector} />}
      {screen === "select-address" && <SelectAddressScreen onNav={nav} />}
      {screen === "select-datetime" && <SelectDateTimeScreen onNav={nav} />}
      {screen === "review-pickup" && <ReviewPickupScreen onNav={nav} />}
      {screen === "pickup-confirmed" && <PickupConfirmedScreen onNav={nav} />}
      {screen === "track-pickup" && <TrackPickupScreen onNav={nav} />}
      {screen === "recycling-journey" && <RecyclingJourneyScreen onNav={nav} />}
      {screen === "safety" && <SafetyScreen onNav={nav} role={role} />}
      {screen === "earnings" && <EarningsScreen onNav={nav} role={role} />}
      {screen === "profile" && <ProfileScreen onNav={nav} role={role} language={language} />}
      {screen === "price-board" && <PriceBoardScreen onNav={nav} role={role} />}
      {screen === "marketplace" && <MarketplaceScreen onNav={nav} />}

      {screen === "kabadiwala-login" && <KabadiLoginScreen onNav={nav} />}
      {screen === "kabadiwala-register" && <KabadiRegisterScreen onNav={nav} />}
      {screen === "kabadiwala-id" && <KabadiIdScreen onNav={nav} />}
      {screen === "kabadiwala-dashboard" && <KabadiDashboardScreen onNav={nav} />}
      {screen === "todays-pickups" && <TodaysPickupsScreen onNav={nav} />}

      {screen === "recycler-dashboard" && <RecyclerDashboardScreen onNav={nav} />}
      {screen === "find-recycler" && <FindRecyclerScreen onNav={nav} />}
    </>
  )
}
