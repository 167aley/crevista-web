import { listings, type Listing, type DealType, type PropertyTypeId } from "./data";

export interface SearchQuery {
  deal?: string;
  type?: string;
  q?: string;
  minPrice?: string;
  minSize?: string;
  sort?: string;
  exchange1031?: string;
}

const priceValue: Record<string, number> = {
  "$1M": 1_000_000, "$5M": 5_000_000, "$10M": 10_000_000,
  "$25M": 25_000_000, "$50M": 50_000_000, "$100M+": 100_000_000,
};
const sizeValue: Record<string, number> = {
  "5,000 SF": 5000, "10,000 SF": 10000, "25,000 SF": 25000,
  "50,000 SF": 50000, "100,000 SF+": 100000,
};

export function filterListings(query: SearchQuery): Listing[] {
  let result = [...listings];

  const deal = query.deal as DealType | undefined;
  if (deal === "sale" || deal === "lease") {
    result = result.filter((l) => l.deal === deal);
  }

  if (query.type && query.type !== "all") {
    // supports a single type or a comma-separated list (multi-select)
    const types = query.type.split(",").map((t) => t.trim()).filter(Boolean) as PropertyTypeId[];
    if (types.length) {
      result = result.filter((l) => types.includes(l.type));
    }
  }

  if (query.q) {
    const q = query.q.toLowerCase();
    result = result.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.state.toLowerCase().includes(q) ||
        l.market.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q) ||
        l.zip.includes(q),
    );
  }

  if (query.minPrice && priceValue[query.minPrice]) {
    const min = priceValue[query.minPrice];
    result = result.filter((l) => (l.deal === "sale" ? l.price >= min : true));
  }

  if (query.minSize && sizeValue[query.minSize]) {
    const min = sizeValue[query.minSize];
    result = result.filter((l) => l.sqft >= min);
  }

  if (query.exchange1031 === "1") {
    result = result.filter((l) => l.exchange1031);
  }

  switch (query.sort) {
    case "Newest":
      result.sort((a, b) => a.daysOnMarket - b.daysOnMarket);
      break;
    case "Price: Low to High":
      result.sort((a, b) => effectivePrice(a) - effectivePrice(b));
      break;
    case "Price: High to Low":
      result.sort((a, b) => effectivePrice(b) - effectivePrice(a));
      break;
    case "Cap Rate: High to Low":
      result.sort((a, b) => (b.capRate ?? 0) - (a.capRate ?? 0));
      break;
    case "Price / SF":
      result.sort((a, b) => a.pricePerSqft - b.pricePerSqft);
      break;
    case "Building Size":
      result.sort((a, b) => b.sqft - a.sqft);
      break;
  }

  return result;
}

function effectivePrice(l: Listing) {
  return l.deal === "lease" ? (l.leaseRate ?? 0) * 1000 : l.price;
}
