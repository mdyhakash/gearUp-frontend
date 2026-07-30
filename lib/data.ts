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
export const mockOrders = [
  {
    id: "ORD-1042",
    gearName: "4-Person Dome Tent",
    dates: "Aug 2 – Aug 5",
    total: 54,
    status: "PICKED_UP" as const,
  },
  {
    id: "ORD-1041",
    gearName: "Carbon Mountain Bike",
    dates: "Jul 28 – Jul 30",
    total: 64,
    status: "CONFIRMED" as const,
  },
  {
    id: "ORD-1039",
    gearName: "Inflatable Kayak",
    dates: "Jul 20 – Jul 22",
    total: 50,
    status: "RETURNED" as const,
  },
  {
    id: "ORD-1035",
    gearName: "Climbing Harness Set",
    dates: "Jul 10 – Jul 12",
    total: 30,
    status: "CANCELLED" as const,
  },
];

export const mockInventory = [
  {
    id: "1",
    name: "4-Person Dome Tent",
    category: "Camping",
    dailyRate: 18,
    stock: 4,
    isAvailable: true,
  },
  {
    id: "6",
    name: "60L Hiking Backpack",
    category: "Hiking",
    dailyRate: 12,
    stock: 8,
    isAvailable: true,
  },
  {
    id: "7",
    name: "2-Person Kayak",
    category: "Water Sports",
    dailyRate: 22,
    stock: 0,
    isAvailable: false,
  },
];

export const mockIncomingOrders = [
  {
    id: "ORD-2091",
    customerName: "Maria Chen",
    gearName: "4-Person Dome Tent",
    dates: "Aug 4 – Aug 6",
    status: "PLACED" as const,
  },
  {
    id: "ORD-2088",
    customerName: "Tom Baker",
    gearName: "60L Hiking Backpack",
    dates: "Aug 1 – Aug 3",
    status: "PAID" as const,
  },
  {
    id: "ORD-2081",
    customerName: "Lena Fox",
    gearName: "4-Person Dome Tent",
    dates: "Jul 25 – Jul 27",
    status: "PICKED_UP" as const,
  },
];

export const mockUsers = [
  {
    id: "u1",
    name: "Maria Chen",
    email: "maria@example.com",
    role: "CUSTOMER" as const,
    status: "ACTIVE" as const,
  },
  {
    id: "u2",
    name: "Trailhead Outfitters",
    email: "hello@trailhead.co",
    role: "PROVIDER" as const,
    status: "ACTIVE" as const,
  },
  {
    id: "u3",
    name: "Tom Baker",
    email: "tom@example.com",
    role: "CUSTOMER" as const,
    status: "BLOCKED" as const,
  },
  {
    id: "u4",
    name: "Ridgeline Bikes",
    email: "team@ridgeline.co",
    role: "PROVIDER" as const,
    status: "ACTIVE" as const,
  },
];
export const mockCategories = [
  {
    id: "c1",
    name: "Camping",
    description: "Tents, sleeping bags, and campsite essentials.",
    gearCount: 24,
  },
  {
    id: "c2",
    name: "Water Sports",
    description: "Kayaks, paddleboards, and life vests.",
    gearCount: 15,
  },
  {
    id: "c3",
    name: "Winter Sports",
    description: "Snowboards, skis, and cold-weather gear.",
    gearCount: 9,
  },
  {
    id: "c4",
    name: "Cycling",
    description: "Mountain bikes, road bikes, and accessories.",
    gearCount: 18,
  },
  {
    id: "c5",
    name: "Climbing",
    description: "Harnesses, ropes, and climbing protection.",
    gearCount: 11,
  },
  {
    id: "c6",
    name: "Hiking",
    description: "Backpacks, trekking poles, and boots.",
    gearCount: 20,
  },
];
