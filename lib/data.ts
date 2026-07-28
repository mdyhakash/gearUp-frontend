import { GearItem } from "./types";

export const categories = [
  "Camping",
  "Water Sports",
  "Winter Sports",
  "Cycling",
  "Climbing",
  "Hiking",
];

export const mockGear: GearItem[] = [
  {
    id: "1",
    name: "4-Person Dome Tent",
    brand: "Coleman",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
    dailyRate: 18,
    stock: 4,
    condition: "GOOD",
    isAvailable: true,
    category: "Camping",
    providerName: "Trailhead Outfitters",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Carbon Mountain Bike",
    brand: "Trek",
    image:
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&q=80",
    dailyRate: 32,
    stock: 2,
    condition: "NEW",
    isAvailable: true,
    category: "Cycling",
    providerName: "Ridgeline Bikes",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Inflatable Kayak (2-Seat)",
    brand: "Intex",
    image:
      "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=600&q=80",
    dailyRate: 25,
    stock: 3,
    condition: "GOOD",
    isAvailable: true,
    category: "Water Sports",
    providerName: "Lakeside Rentals",
    rating: 4.6,
  },
  {
    id: "4",
    name: "All-Mountain Snowboard",
    brand: "Burton",
    image:
      "https://images.unsplash.com/photo-1522056615691-da7b8106c665?w=600&q=80",
    dailyRate: 28,
    stock: 0,
    condition: "FAIR",
    isAvailable: false,
    category: "Winter Sports",
    providerName: "Summit Gear Co.",
    rating: 4.4,
  },
  {
    id: "5",
    name: "Climbing Harness + Rope Set",
    brand: "Black Diamond",
    image:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80",
    dailyRate: 15,
    stock: 6,
    condition: "GOOD",
    isAvailable: true,
    category: "Climbing",
    providerName: "Vertical Ascent",
    rating: 4.7,
  },
  {
    id: "6",
    name: "60L Hiking Backpack",
    brand: "Osprey",
    image:
      "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=600&q=80",
    dailyRate: 12,
    stock: 8,
    condition: "NEW",
    isAvailable: true,
    category: "Hiking",
    providerName: "Trailhead Outfitters",
    rating: 4.9,
  },
];
export const mockReviews = [
  {
    id: "r1",
    customerName: "Sarah M.",
    rating: 5,
    comment:
      "Tent was in great shape, easy pickup and drop-off. Would rent again.",
    date: "2 weeks ago",
  },
  {
    id: "r2",
    customerName: "James O.",
    rating: 4,
    comment:
      "Good quality, one pole was slightly bent but didn't affect setup.",
    date: "1 month ago",
  },
  {
    id: "r3",
    customerName: "Priya K.",
    rating: 5,
    comment: "Provider was responsive and gear matched the listing exactly.",
    date: "1 month ago",
  },
];

export const mockGearImages = [
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=80",
  "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=900&q=80",
  "https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=900&q=80",
  "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=900&q=80",
];
