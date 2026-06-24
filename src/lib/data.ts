import { propertyPhotos, avatars, pick } from "./assets";

/* ============================ Property types ============================ */

export type PropertyTypeId =
  | "office"
  | "retail"
  | "self-storage"
  | "industrial"
  | "mixed-use"
  | "multifamily"
  | "hospitality"
  | "data-center"
  | "land"
  | "special-purpose";

export interface PropertyType {
  id: PropertyTypeId;
  label: string;
  /** lucide-react icon name */
  icon: string;
  color: string;
  count: number;
}

// Exact 10 categories + order from Figma node 164:104 (Browse by Property Type)
export const propertyTypes: PropertyType[] = [
  { id: "office", label: "Office", icon: "Building2", color: "#2f6fed", count: 4821 },
  { id: "retail", label: "Retail", icon: "Store", color: "#e8743b", count: 3940 },
  { id: "industrial", label: "Industrial", icon: "Warehouse", color: "#c8a14b", count: 5210 },
  { id: "multifamily", label: "Multifamily", icon: "Building", color: "#8a94a6", count: 2876 },
  { id: "land", label: "Land", icon: "Trees", color: "#1f3a5f", count: 6190 },
  { id: "hospitality", label: "Hospitality", icon: "Hotel", color: "#d6477b", count: 1133 },
  { id: "self-storage", label: "Self-Storage", icon: "Container", color: "#15b8c7", count: 980 },
  { id: "mixed-use", label: "Mixed-Use", icon: "LayoutGrid", color: "#22a559", count: 1422 },
  { id: "data-center", label: "Data Centers", icon: "Server", color: "#3b82f6", count: 214 },
  { id: "special-purpose", label: "Specialty", icon: "Landmark", color: "#f97316", count: 745 },
];

export const propertyTypeMap = Object.fromEntries(
  propertyTypes.map((t) => [t.id, t]),
) as Record<PropertyTypeId, PropertyType>;

/* ============================== Listings =============================== */

export type DealType = "sale" | "lease";
export type ListingStatus = "active" | "new" | "under-contract" | "price-drop";

export interface Broker {
  name: string;
  firm: string;
  phone: string;
  avatar: string;
  title: string;
}

export interface Listing {
  id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  market: string;
  type: PropertyTypeId;
  deal: DealType;
  status: ListingStatus;
  /** sale: total price · lease: annual $/sqft handled separately */
  price: number;
  /** lease rate, $ per sqft / year */
  leaseRate?: number;
  sqft: number;
  pricePerSqft: number;
  capRate?: number;
  yearBuilt: number;
  occupancy?: number;
  units?: number;
  parking?: number;
  lotAcres?: number;
  class: "A" | "B" | "C";
  lat: number;
  lng: number;
  photos: string[];
  highlights: string[];
  description: string;
  broker: Broker;
  daysOnMarket: number;
  exchange1031: boolean;
}

const brokers: Broker[] = [
  { name: "Marcus Vaughn", firm: "Sovereign Capital Advisors", phone: "(212) 555-0143", avatar: avatars[0], title: "Managing Director, Investment Sales" },
  { name: "Elena Rodriguez", firm: "Pinnacle CRE Group", phone: "(312) 555-0199", avatar: avatars[1], title: "SVP, Capital Markets" },
  { name: "David Chen", firm: "Meridian Net Lease", phone: "(214) 555-0177", avatar: avatars[2], title: "Principal, Net Lease Advisory" },
  { name: "Sarah Whitfield", firm: "Apex Industrial Partners", phone: "(206) 555-0162", avatar: avatars[3], title: "Director, Industrial Brokerage" },
];

function photos(seed: number, n = 6): string[] {
  return Array.from({ length: n }, (_, i) => pick(propertyPhotos, seed * 5 + i));
}

export const listings: Listing[] = [
  {
    id: "1", slug: "sovereign-plaza", title: "The Sovereign Plaza",
    address: "450 Financial District Blvd", city: "New York", state: "NY", zip: "10004",
    market: "New York, NY", type: "office", deal: "sale", status: "new",
    price: 142500000, sqft: 385000, pricePerSqft: 370, capRate: 5.4, yearBuilt: 2021,
    occupancy: 94, parking: 320, class: "A", lat: 40.7041, lng: -74.0121,
    photos: photos(1), exchange1031: true, daysOnMarket: 6,
    highlights: ["Class A institutional asset", "94% leased to credit tenants", "LEED Gold certified", "Below replacement cost"],
    description:
      "The Sovereign Plaza stands as a testament to contemporary architectural excellence and institutional-grade real estate in the heart of the city's financial core. Completed in early 2021, this Class A asset offers state-of-the-art infrastructure designed for high-performance corporate occupants.",
    broker: brokers[0],
  },
  {
    id: "2", slug: "gateway-logistics-center", title: "Gateway Logistics Center",
    address: "8800 Distribution Pkwy", city: "Dallas", state: "TX", zip: "75247",
    market: "Dallas–Fort Worth, TX", type: "industrial", deal: "sale", status: "active",
    price: 68900000, sqft: 612000, pricePerSqft: 113, capRate: 6.1, yearBuilt: 2019,
    occupancy: 100, parking: 140, class: "A", lat: 32.8121, lng: -96.8716,
    photos: photos(2), exchange1031: true, daysOnMarket: 21,
    highlights: ["36' clear height", "100% leased — single tenant NNN", "Cross-dock configuration", "Interstate frontage"],
    description:
      "A best-in-class bulk distribution facility positioned at a critical inland port intersection. Fully leased on a long-term NNN basis to an investment-grade logistics operator, offering durable, passive cash flow.",
    broker: brokers[3],
  },
  {
    id: "3", slug: "the-harlow-residences", title: "The Harlow Residences",
    address: "2100 Lakeshore Ave", city: "Chicago", state: "IL", zip: "60614",
    market: "Chicago, IL", type: "multifamily", deal: "sale", status: "price-drop",
    price: 54250000, sqft: 248000, pricePerSqft: 219, capRate: 5.0, yearBuilt: 2018,
    occupancy: 96, units: 214, parking: 230, class: "A", lat: 41.9211, lng: -87.6440,
    photos: photos(3), exchange1031: true, daysOnMarket: 44,
    highlights: ["214 luxury units", "96% occupancy, strong rent growth", "Resort-style amenity deck", "Transit-oriented location"],
    description:
      "A trophy multifamily community delivering premium lakeside living with a deep amenity package. Stabilized operations and proven rent momentum make this a core-plus opportunity in a supply-constrained submarket.",
    broker: brokers[1],
  },
  {
    id: "4", slug: "meridian-retail-galleria", title: "Meridian Retail Galleria",
    address: "775 Commerce Square", city: "Miami", state: "FL", zip: "33131",
    market: "Miami, FL", type: "retail", deal: "lease", status: "active",
    price: 0, leaseRate: 48, sqft: 18500, pricePerSqft: 48, yearBuilt: 2016,
    occupancy: 88, parking: 90, class: "A", lat: 25.7669, lng: -80.1918,
    photos: photos(4), exchange1031: false, daysOnMarket: 12,
    highlights: ["Prime ground-floor retail", "High street visibility", "Anchored by national brands", "Average daily traffic 42,000"],
    description:
      "Flagship retail space in a luxury mixed-use destination. Exceptional frontage, dense daytime population, and an affluent trade area make this an ideal location for experiential and premium retail concepts.",
    broker: brokers[2],
  },
  {
    id: "5", slug: "innovation-tech-campus", title: "Innovation Tech Campus",
    address: "1500 Research Way", city: "Austin", state: "TX", zip: "78759",
    market: "Austin, TX", type: "office", deal: "lease", status: "new",
    price: 0, leaseRate: 52, sqft: 96000, pricePerSqft: 52, yearBuilt: 2022,
    occupancy: 70, parking: 410, class: "A", lat: 30.4014, lng: -97.7264,
    photos: photos(5), exchange1031: false, daysOnMarket: 4,
    highlights: ["Creative office / R&D", "Full building branding available", "Structured + surface parking 4.3/1k", "Move-in ready spec suites"],
    description:
      "A next-generation creative office campus engineered for innovation-driven tenants. Floor-to-ceiling glass, flexible floor plates, and a wellness-forward amenity base support hybrid teams at scale.",
    broker: brokers[0],
  },
  {
    id: "6", slug: "summit-self-storage-portfolio", title: "Summit Self-Storage Portfolio",
    address: "3 Property Portfolio", city: "Phoenix", state: "AZ", zip: "85008",
    market: "Phoenix, AZ", type: "self-storage", deal: "sale", status: "active",
    price: 31200000, sqft: 268000, pricePerSqft: 116, capRate: 6.4, yearBuilt: 2015,
    occupancy: 91, class: "B", lat: 33.4625, lng: -111.9826,
    photos: photos(6), exchange1031: true, daysOnMarket: 33,
    highlights: ["3-property portfolio", "Climate-controlled units", "Below-market in-place rents", "Strong population growth corridor"],
    description:
      "A geographically diversified self-storage portfolio with meaningful mark-to-market upside. Professionally managed with automated access and high physical occupancy across all three assets.",
    broker: brokers[3],
  },
  {
    id: "7", slug: "the-grand-marquis-hotel", title: "The Grand Marquis Hotel",
    address: "200 Waterfront Promenade", city: "Seattle", state: "WA", zip: "98101",
    market: "Seattle, WA", type: "hospitality", deal: "sale", status: "active",
    price: 98750000, sqft: 410000, pricePerSqft: 241, capRate: 7.2, yearBuilt: 2014,
    occupancy: 78, units: 312, parking: 180, class: "A", lat: 47.6079, lng: -122.3401,
    photos: photos(7), exchange1031: true, daysOnMarket: 58,
    highlights: ["312-key full-service hotel", "Waterfront location", "Recently renovated F&B", "RevPAR premium to comp set"],
    description:
      "An irreplaceable waterfront hospitality asset with strong group and transient demand. Recent capital improvements position the property to capture continued RevPAR growth in a recovering urban market.",
    broker: brokers[1],
  },
  {
    id: "8", slug: "cedar-crossing-mixed-use", title: "Cedar Crossing Mixed-Use",
    address: "640 Midtown Exchange", city: "Denver", state: "CO", zip: "80205",
    market: "Denver, CO", type: "mixed-use", deal: "sale", status: "new",
    price: 47600000, sqft: 196000, pricePerSqft: 243, capRate: 5.6, yearBuilt: 2020,
    occupancy: 92, units: 128, parking: 210, class: "A", lat: 39.7570, lng: -104.9784,
    photos: photos(8), exchange1031: true, daysOnMarket: 9,
    highlights: ["Retail + residential + office", "Live-work-play destination", "Walk Score 94", "Diversified income streams"],
    description:
      "A vibrant mixed-use development blending ground-floor retail, boutique office, and residential lofts. The asset anchors a fast-growing urban node with exceptional walkability and durable, diversified cash flow.",
    broker: brokers[2],
  },
  {
    id: "9", slug: "pacific-flex-business-park", title: "Pacific Flex Business Park",
    address: "5500 Enterprise Dr", city: "Los Angeles", state: "CA", zip: "90040",
    market: "Los Angeles, CA", type: "mixed-use", deal: "lease", status: "active",
    price: 0, leaseRate: 21, sqft: 142000, pricePerSqft: 21, yearBuilt: 2012,
    occupancy: 85, parking: 260, class: "B", lat: 34.0118, lng: -118.1531,
    photos: photos(9), exchange1031: false, daysOnMarket: 27,
    highlights: ["Flexible office/warehouse mix", "Divisible from 8,000 SF", "Dock + grade-level loading", "Central infill location"],
    description:
      "A versatile flex business park serving last-mile, light manufacturing, and showroom users. Suites are divisible with a flexible office-to-warehouse ratio, ideal for growing regional operators.",
    broker: brokers[3],
  },
  {
    id: "10", slug: "northgate-land-assemblage", title: "Northgate Land Assemblage",
    address: "I-85 & Northgate Rd", city: "Atlanta", state: "GA", zip: "30340",
    market: "Atlanta, GA", type: "land", deal: "sale", status: "active",
    price: 18900000, sqft: 0, pricePerSqft: 0, yearBuilt: 0, lotAcres: 42.5,
    class: "C", lat: 33.8908, lng: -84.2680,
    photos: photos(10), exchange1031: true, daysOnMarket: 71,
    highlights: ["42.5 acres entitled", "Industrial / logistics zoning", "Interstate interchange access", "Utilities to site"],
    description:
      "A rare entitled land assemblage positioned for industrial or logistics development at a major interstate interchange. Utilities are available to the site with favorable zoning already in place.",
    broker: brokers[3],
  },
  {
    id: "11", slug: "atlas-data-center", title: "Atlas Data Center",
    address: "900 Power Grid Ln", city: "Ashburn", state: "VA", zip: "20147",
    market: "Northern Virginia", type: "data-center", deal: "sale", status: "under-contract",
    price: 215000000, sqft: 320000, pricePerSqft: 672, capRate: 6.8, yearBuilt: 2021,
    occupancy: 100, class: "A", lat: 39.0438, lng: -77.4874,
    photos: photos(11), exchange1031: true, daysOnMarket: 38,
    highlights: ["48MW critical IT load", "Tier III+ design", "Hyperscale tenant in place", "Redundant power & cooling"],
    description:
      "A mission-critical hyperscale data center in the world's largest data center market. Leased to an investment-grade cloud tenant with substantial remaining term and built-in rent escalations.",
    broker: brokers[0],
  },
  {
    id: "12", slug: "riverside-medical-office", title: "Riverside Medical Office",
    address: "1820 Health Campus Dr", city: "Boston", state: "MA", zip: "02134",
    market: "Boston, MA", type: "office", deal: "sale", status: "active",
    price: 39400000, sqft: 124000, pricePerSqft: 318, capRate: 6.0, yearBuilt: 2017,
    occupancy: 97, parking: 300, class: "A", lat: 42.3540, lng: -71.1290,
    photos: photos(12), exchange1031: true, daysOnMarket: 18,
    highlights: ["Class A medical office", "97% leased to health systems", "On-campus location", "Long-weighted lease term"],
    description:
      "A stabilized medical office building adjacent to a major hospital system. Sticky healthcare tenancy and high renewal probability deliver defensive, recession-resilient income.",
    broker: brokers[1],
  },
];

export const listingMap = Object.fromEntries(listings.map((l) => [l.slug, l]));

/* ============================ Filters / UI ============================ */

export const markets = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Dallas–Fort Worth, TX",
  "Miami, FL", "Austin, TX", "Seattle, WA", "Boston, MA", "Denver, CO",
  "Phoenix, AZ", "Atlanta, GA", "Northern Virginia",
];

export const saleSortOptions = [
  "Recommended", "Newest", "Price: Low to High", "Price: High to Low",
  "Cap Rate: High to Low", "Price / SF", "Building Size",
];

export const priceBuckets = [
  "No min", "$1M", "$5M", "$10M", "$25M", "$50M", "$100M+",
];

export const sizeBuckets = [
  "No min", "5,000 SF", "10,000 SF", "25,000 SF", "50,000 SF", "100,000 SF+",
];

/* ============================= Pricing ================================ */

export interface PricingPlan {
  name: string;
  tagline?: string;
  monthly: number;
  annual: number;
  featured?: boolean;
  cta: string;
  features: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Pro",
    monthly: 79, annual: 67, cta: "Start Free Trial",
    features: [
      "Unlimited saved searches",
      "Full contact info on listings",
      "Advanced filter access",
      "Export results to CSV",
      "Deal alerts & notifications",
      "Save listings to Deal Folder",
      "Print-ready listing reports",
    ],
  },
  {
    name: "Market Intelligence",
    monthly: 199, annual: 169, featured: true, cta: "Get Intelligence",
    features: [
      "Everything in Pro",
      "Market reports & analytics dashboards",
      "Verified sales & lease comp data",
      "Broker Opinion of Value (BOV) generator",
      "Submarket heat maps",
      "Deal pipeline & tracking dashboard",
      "AI-powered deal scoring",
    ],
  },
];

export const pricingFaqs = [
  { q: "Can I change my plan later?", a: "Yes — upgrade, downgrade, or cancel anytime from your account settings. Changes prorate automatically." },
  { q: "How does the 14-day free trial work?", a: "Start with full access to your chosen plan for 14 days. No credit card required, and you can cancel before the trial ends with no charge." },
  { q: "What is included in 'Market Intelligence' data?", a: "Market reports, verified sales & lease comps, BOV generation, submarket heat maps, a deal pipeline dashboard, and AI-powered deal scoring across 50,000+ listings nationwide." },
  { q: "Do you offer institutional enterprise pricing?", a: "Yes — for teams and institutions we offer custom seats, API access, portfolio monitoring, and SSO. Contact our sales team for a tailored quote." },
];

/* ============================== Tools ================================= */

export interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  badge?: string;
}

export const tools: Tool[] = [
  {
    slug: "bov",
    name: "Broker Opinion of Value (BOV)",
    description: "Generate a professional BOV report with market comps, property details, valuation range, and deal summary narrative. Export as branded PDF. Includes comparable sales pull from the CREvista comp database and a one-page executive summary.",
    icon: "FileBarChart", category: "Valuation",
  },
  {
    slug: "underwriting",
    name: "Underwriting Calculator",
    description: "Model NOI, cap rate, cash-on-cash return, IRR, equity multiple, and DSCR. Input purchase price, loan terms, rent roll, operating expenses, and exit assumptions. Exportable pro forma in Excel or PDF format. Includes sensitivity analysis table.",
    icon: "Calculator", category: "Analysis",
  },
  {
    slug: "lease-vs-buy",
    name: "Lease vs. Buy Analyzer",
    description: "Compare the total occupancy cost of leasing vs. purchasing for commercial tenants and owner-occupants. Inputs: term, rent escalation, purchase price, financing terms, opportunity cost rate. Output: NPV comparison chart and break-even year.",
    icon: "Scale", category: "Analysis",
  },
  {
    slug: "comps",
    name: "Market Comp Search",
    description: "Search verified sales and lease comps by submarket, property type, date range, and size range. Display: price/SF, cap rate, buyer/seller (where available), days on market, and distance from subject property.",
    icon: "Search", category: "Market Data",
  },
];

/* ============================ Navigation ============================== */

export const navLinks = [
  { label: "Sale", href: "/search?deal=sale" },
  { label: "Lease", href: "/search?deal=lease" },
  { label: "Auction", href: "/auctions" },
  { label: "Products", href: "/pricing" },
  { label: "Tools", href: "/tools" },
];

export const footerColumns = [
  {
    title: "About",
    links: [
      { label: "Sale", href: "/search?deal=sale" },
      { label: "Lease", href: "/search?deal=lease" },
      { label: "Auction", href: "/auctions" },
      { label: "Products", href: "/pricing" },
      { label: "Tools", href: "/tools" },
    ],
  },
  {
    title: "Help & Information",
    links: [
      { label: "Add Listing", href: "/sell" },
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
