# 👑 Kulcha King — Restaurant Website UI/UX Design Specification

A design document tailored for building the web application for **Kulcha King**.

---

## 1. Project Overview & Aesthetic Direction

* **Brand Name:** Kulcha King
* **Niche:** Authentic North Indian / Punjabi Fast-Casual Dining & Online Food Ordering
* **UI Style:** Modern, clean, warm-toned food app dashboard (inspired by TasteHouse layout)
* **Core Themes:** High readability, appetizing imagery, high-contrast visual hierarchy, soft rounded cards, smooth drop shadows.

---

## 2. Design System & Theme Tokens

### **Color Palette**

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `primary-orange` | `#FF6B00` | Primary buttons, active states, key highlights |
| `primary-orange-hover` | `#E05E00` | Button hover states |
| `accent-green` | `#2D8A4E` | Veg indicators, Bestseller tags, offer banners |
| `accent-green-bg` | `#EBF7EE` | Offer card background |
| `bg-primary` | `#FAF8F5` | Main application background (Warm off-white) |
| `bg-card` | `#FFFFFF` | Component / Product card background |
| `text-dark` | `#1F1F1F` | Main headings, product names, price |
| `text-muted` | `#666666` | Subtitles, descriptions, secondary text |
| `border-light` | `#EAEAEA` | Card borders, dividers |

### **Typography Specification**
* **Font Family:** `Plus Jakarta Sans` or `Inter`, sans-serif
* **Headings:** Bold / ExtraBold (`font-weight: 700 / 800`)
* **Body & Descriptions:** Medium / Regular (`font-weight: 400 / 500`)

---

## 3. Structural Layout Architecture

```
+-----------------------------------------------------------------------------------------+
|                                  TOP HEADER BAR                                         |
|  [Search Dish/Menu...]                                     (Favs)  (Cart: 3)  (Account) |
+--------------+--------------------------------------------------------------------------+
|  SIDEBAR     |  HERO BANNER                                                             |
|              |  "Crispy, Butter-Drenched Kulchas Delivered Hot."                        |
|  * Home      |  [ Order Now ]  [ Explore Menu ]                                         |
|  * Menu      +--------------------------------------------------------------------------+
|  * Category  |  FEATURE HIGHLIGHTS (Express Fresh | Authentic Recipes | 100% Pure Desi) |
|  * Offers    +--------------------------------------------------------------------------+
|  * Orders    |  EXPLORE BY CATEGORY                                                     |
|  * Reviews   |  [ Amritsari Stuffed ]  [ Fusion ]  [ Chole & Sides ]  [ Lassi & Drinks ] |
|  * Support   +--------------------------------------------------------------------------+
|              |  POPULAR DISHES (5-Column Responsive Card Grid)                          |
|  PROMO CARD  |  +------------+  +------------+  +------------+  +------------+          |
|  "20% OFF"   |  | Aloo Kulcha|  | Paneer Kul |  | CheeseBurst|  | Mix Veg Kul|          |
|              |  +------------+  +------------+  +------------+  +------------+          |
|              +--------------------------------------------------------------------------+
|              |  OFFER BANNERS (2-Column Grid)                                           |
|              |  [ 30% Off First Order ]        [ Family Kulcha Combo Deals ]            |
+--------------+--------------------------------------------------------------------------+
```

---

## 4. Component Technical Specifications

### **A. Navigation Sidebar (Left Fixed)**
* **Width:** `240px`
* **Style:** Border-right `#EAEAEA`, background `#FFFFFF`.
* **Nav Links:** Icon + Label (`Home`, `Menu`, `Categories`, `Offers`, `Reservations`, `Orders`, `Reviews`, `Support`).
* **Active State:** Orange left-border indicator, soft orange tint background (`#FFF2E8`), text `#FF6B00`.

### **B. Top Header Bar**
* **Height:** `72px`
* **Search Input:** Rounded pill shape (`rounded-full`), soft background (`#F3F3F3`), centered search icon.
* **Action Badges:** Round white icon buttons with drop shadows for Favorites, Cart (with numeric orange notification badge), and User Profile.

### **C. Hero Banner**
* **Background:** Radial gradient from `#FFF8F0` to `#FFEEDD`.
* **Left Column:**
  * Badge: "GOOD FOOD, GOOD MOOD" in orange text.
  * Headline: "Delicious Kulchas Delivered Fast." (42px Bold).
  * CTA Buttons: Primary filled orange button (`Order Now`) + Soft pill button with play icon (`Explore Menu`).
  * Social proof: Avatar stack + "10K+ Happy Foodies".
* **Right Column:** Large hero image showing butter-loaded Kulcha platter with Chole bowl and Kulhad Lassi.

### **D. Category Navigation Cards**
* **Card Style:** Soft pastel background tints (Green, Orange, Light Blue, Cream).
* **Hover Effect:** Scale `1.03` with smooth ease transition.
* **Dimensions:** Equal height, centered circular image + category title + item count subtext.

### **E. Popular Dishes Grid (Product Card UI)**
Each card includes:
1. **Top Badge:** Absolute positioned tag top-left (`Bestseller` in Green or `15% OFF` in Red/Orange).
2. **Product Image:** High-res food image, centered with transparent/clean background.
3. **Dish Title:** `font-weight: 700`, dark text.
4. **Sub-description:** Accompaniments text (e.g., "Served with Pindi Chole & Onion Chutney").
5. **Footer:** Price (`₹180`) on the left, Star Rating (`4.8 ★`) in center, and Orange Circle `+` Button on the right.

---

## 5. Sample Data Schema & Content Mapping

```json
[
  {
    "id": "k-01",
    "name": "Amritsari Aloo Kulcha",
    "category": "Classic Stuffed",
    "description": "Crispy tandoori flatbread stuffed with spiced potatoes, onions & green chilies.",
    "accompaniments": "Served with spicy Pindi Chole & Iced Onion Chutney",
    "price": "₹149",
    "rating": "4.9",
    "reviews_count": 320,
    "badge": "Bestseller",
    "badge_type": "success",
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "k-02",
    "name": "Paneer Pyaz Special Kulcha",
    "category": "Classic Stuffed",
    "description": "Loaded with fresh grated cottage cheese, diced onions, coriander, and authentic spices.",
    "accompaniments": "Served with Pindi Chole & Butter Float",
    "price": "₹189",
    "rating": "4.8",
    "reviews_count": 215,
    "badge": "Top Rated",
    "badge_type": "primary",
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "k-03",
    "name": "Maharaja Cheese Burst Kulcha",
    "category": "Fusion Kulcha",
    "description": "Gourmet fusion kulcha stuffed with rich mozzarella cheese and marinated paneer tikka.",
    "accompaniments": "Served with Makhani Gravy & Dip",
    "price": "₹229",
    "rating": "4.9",
    "reviews_count": 180,
    "badge": "Chef Special",
    "badge_type": "primary",
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "k-04",
    "name": "Chur Chur Mix Veg Kulcha",
    "category": "Crispy Delights",
    "description": "Multi-layered flaky crushed kulcha dripping with pure desi ghee and stuffed with fresh veggies.",
    "accompaniments": "Served with Pindi Chole & Boondi Raita",
    "price": "₹169",
    "rating": "4.7",
    "reviews_count": 140,
    "badge": "15% OFF",
    "badge_type": "warning",
    "image": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "k-05",
    "name": "Royal Kulhad Malai Lassi",
    "category": "Beverages",
    "description": "Traditional chilled creamy sweet lassi served in an authentic earthen kulhad topped with rabri & saffron.",
    "accompaniments": "Garnished with pistachios and almonds",
    "price": "₹89",
    "rating": "5.0",
    "reviews_count": 450,
    "badge": "Must Try",
    "badge_type": "success",
    "image": "https://images.unsplash.com/photo-1571006682858-a458b8d22383?auto=format&fit=crop&w=600&q=80"
  }
]
```

---

## 6. Tailwind CSS Implementation Snippets

### **A. Menu Item Card Component**
```html
<div class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col justify-between relative group">
  <!-- Top Badge -->
  <div class="absolute top-3 left-3 z-10">
    <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-md">
      Bestseller
    </span>
  </div>

  <!-- Image Section -->
  <div class="w-full h-40 flex items-center justify-center overflow-hidden rounded-xl bg-amber-50/50 my-2">
    <img
      src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
      alt="Amritsari Aloo Kulcha"
      class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
  </div>

  <!-- Dish Info -->
  <div class="mt-2">
    <h3 class="text-gray-900 font-bold text-base leading-snug">Amritsari Aloo Kulcha</h3>
    <p class="text-gray-500 text-xs mt-1 line-clamp-1">Served with spicy Pindi Chole & Onion Chutney</p>
  </div>

  <!-- Price & Action Footer -->
  <div class="flex items-center justify-between mt-4 pt-2 border-t border-gray-50">
    <div>
      <span class="text-lg font-extrabold text-gray-900">₹149</span>
      <span class="text-xs text-amber-500 font-semibold ml-2">★ 4.9</span>
    </div>
    <button class="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-xl transition-colors shadow-sm active:scale-95">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
      </svg>
    </button>
  </div>
</div>
```

---

## 7. Responsiveness & Grid Standards

* **Desktop (`≥1280px`):** 5 Columns for Menu Grid, Sidebar visible.
* **Tablet (`768px - 1023px`):** 3 Columns for Menu Grid, Sidebar collapses to top bar hamburger menu.
* **Mobile (`<768px`):** 1 or 2 Columns for Menu Grid, Sticky bottom cart bar.