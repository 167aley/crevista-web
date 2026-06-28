/**
 * Curated mapping of the real CRE photography exported from the CREVISTA
 * Figma file (public/assets). Grouped by role and dimension so components can
 * pull intentional imagery instead of guessing hashes.
 */

const A = (name: string) => `/assets/${name}`;

/** Wide skyline / cityscape shots for hero + full-bleed sections */
export const heroImages = [
  A("175b9b9c09e3.jpg"),
  A("af7732336f1f.jpg"),
  A("d7aa0d64af32.jpg"),
  A("53a9287b375a.jpg"),
  A("fdb183cd3656.jpg"),
  A("bd6d33662228.jpg"),
  A("95fee5836d25.jpg"),
  A("37d77774e0e3.jpg"),
  A("e604adab5057.jpg"),
];

/** Landscape building photos used for listing cards & galleries */
export const propertyPhotos = [
  A("a24daeb13427.jpg"),
  A("423d7fef97b1.jpg"),
  A("0870517341e1.jpg"),
  A("819877b857c0.jpg"),
  A("a8a31b70a749.jpg"),
  A("d9f968f9aebb.jpg"),
  A("e5ced9c24562.jpg"),
  A("b1de5012383e.jpg"),
  A("536ed1bf0b4d.jpg"),
  A("24d71eb0e2a8.jpg"),
  A("06c9dbed6ce9.jpg"),
  A("6fc2acc8f7f8.jpg"),
  A("653d97a0cd21.png"),
  A("729e1afd1143.png"),
  A("eee17dcb332d.jpg"),
  A("c2ea207ba3f3.jpg"),
  A("601411de0903.jpg"),
  A("7df400742755.jpg"),
  A("476e78cf2585.jpg"),
  A("dc156c94f370.jpg"),
  A("ac364d9c3979.jpg"),
  A("7efd3a250826.jpg"),
];

/** Square-ish imagery for property-type tiles & feature blocks */
export const squareImages = [
  A("76ec2f468069.png"),
  A("8c6d39609107.png"),
  A("aeb77aa94c47.png"),
  A("565123d6f8ad.png"),
  A("2e4ad61e9991.png"),
  A("2bfc25cd0e86.png"),
  A("5e6b41fae38b.png"),
  A("1d835ef4e243.png"),
  A("66c8a7fbac23.png"),
  A("40f040c880f8.png"),
  A("0d5ee0d120f4.png"),
  A("d0841fec2ca0.png"),
];

/** Professional headshots for testimonials / agents */
export const avatars = [
  A("462abdd946a6.jpg"),
  A("92a1c0af1c6f.jpg"),
  A("8c74f2c76fa1.jpg"),
  A("f5504179be52.jpg"),
  A("efaa1d54030b.jpg"),
  A("4ff2e6b33e1a.jpg"),
  A("d597775e4e54.jpg"),
  A("45082fcf831d.jpg"),
];

/** Named imagery for the "Browse by Property Type" tiles (public/property-types/<id>.png) */
export const propertyTypeImages: Record<string, string> = {
  office: "/property-types/office.svg",
  retail: "/property-types/retail.svg",
  industrial: "/property-types/industrial.svg",
  multifamily: "/property-types/multifamily.svg",
  land: "/property-types/land.svg",
  hospitality: "/property-types/hospitality.svg",
  "self-storage": "/property-types/self-storage.svg",
  "mixed-use": "/property-types/mixed-use.png",
  "data-center": "/property-types/data-center.png",
  "special-purpose": "/property-types/special-purpose.svg",
};

export const featureImages = {
  pro: "/frame11.png", // CREvista Pro — provided asset
  intelligence: "/frame12.png", // Market Intelligence — provided asset
  cta: A("e604adab5057.jpg"), // 3840×2160, ~860KB
};

/** Deterministic pick so SSR and client agree (no Math.random in render). */
export function pick<T>(arr: T[], seed: number): T {
  return arr[((seed % arr.length) + arr.length) % arr.length];
}
