//navBar javaScript
const homeBtn = document.getElementById("nav-home");
const homeSection = document.querySelector(".home");
const newArrivalBtn = document.getElementById("nav-new-arrival");
const newArrivalSection = document.getElementById("newArrivalSection");
const menBtn = document.getElementById("nav-men");
const menSection = document.getElementById("menSection");
const womenBtn = document.getElementById("nav-women");
const womenSection = document.getElementById("womenSection");
const kidsBtn = document.getElementById("nav-kids");
const kidsSection = document.getElementById("kidsSection");
const saleBtn = document.getElementById("nav-sale");
const saleSection = document.getElementById("saleSection");
const cartBtn = document.querySelector(".navCart");
const cartSection = document.getElementById("cartSection");
const wishlistBtn = document.querySelector(".navWishlist");
const wishlistSection = document.getElementById("wishlistSection");
const addToCartBtn = document.getElementById("nav-cart");
const addToWishlistBtn = document.getElementById("nav-wishlist");

// Add to Cart Js
let bagItems = [];

const storedCart = localStorage.getItem("bagItems");
if (storedCart) {
  bagItems = JSON.parse(storedCart);
}


document.addEventListener("click", function (e) {
  // Add to Bag button clicked
  if (e.target.closest(".bag-btn")) {
    const card = e.target.closest(".section-card");
    const imgSrc = card.querySelector("img").src;
    const name = card.querySelector("h4").textContent;
    const price = card.dataset.price || card.querySelector("p").textContent;


    const existingIndex = bagItems.findIndex(item => item.name === name);
    if (existingIndex !== -1) {
      bagItems[existingIndex].quantity++;
    } else {
      bagItems.push({ imgSrc, name, price, quantity: 1 });
    }

    renderBagItems();
    showToast("Item added to your bag");
    updateCardQtyButton(name);
  }

  // Remove item from cart
  if (e.target.classList.contains("remove-cart-btn")) {
    const index = e.target.dataset.index;
    bagItems.splice(index, 1);
    renderBagItems();
  }
});

function renderBagItems() {
  const cartContainer = document.getElementById("cartItemsContainer");
  cartContainer.innerHTML = "";

  bagItems.forEach((item, index) => {
    const priceNum = parseInt(item.price.replace(/[₹,]/g, ""));
    const totalPrice = priceNum * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}" />
      <div class="item-details">
        <h3>${item.name}</h3>
        <p>Price: ₹${priceNum}</p>
        <div class="cart-qty-selector" data-index="${index}">
          <button class="cart-qty-btn minus">−</button>
          <span class="cart-qty-value">${item.quantity}</span>
          <button class="cart-qty-btn plus">+</button>
        </div>
      </div>
      <div class="item-price">₹${totalPrice}</div>
      <button class="remove-cart-btn" data-index="${index}">Remove</button>
    `;

    cartContainer.appendChild(cartItem);
  });

  handleQuantityButtons();
  calculateTotal();
  localStorage.setItem("bagItems", JSON.stringify(bagItems));

}

function handleQuantityButtons() {
  document.querySelectorAll(".cart-qty-selector").forEach(selector => {
    const index = selector.dataset.index;
    const minusBtn = selector.querySelector(".minus");
    const plusBtn = selector.querySelector(".plus");

    minusBtn.addEventListener("click", () => {
      if (bagItems[index].quantity > 1) {
        bagItems[index].quantity--;
        renderBagItems();
      }
    });

    plusBtn.addEventListener("click", () => {
      bagItems[index].quantity++;
      renderBagItems();
    });
  });
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function calculateTotal() {
  let subtotal = 0;
  const taxRate = 0.08;

  bagItems.forEach(item => {
    const price = parseFloat(item.price.replace(/[₹,]/g, ""));
    subtotal += price * item.quantity;
  });

  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + tax;

  // update DOM
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const totalEl = document.getElementById("total");

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (taxEl) taxEl.textContent = `₹${tax}`;
  if (totalEl) totalEl.textContent = `₹${total}`;

  // Disable checkout if cart is empty
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.disabled = bagItems.length === 0;
    checkoutBtn.style.opacity = bagItems.length === 0 ? "0.5" : "1";
    checkoutBtn.style.cursor = bagItems.length === 0 ? "not-allowed" : "pointer";
  }
}
// wishlist setup
let wishlistItems = [];

const storedWishlist = localStorage.getItem("wishlistItems");
if (storedWishlist) {
  wishlistItems = JSON.parse(storedWishlist);
}

// DOM Event Listener
document.addEventListener("click", function (e) {
  // Add to wishlist
  if (e.target.closest(".wishlist-btn")) {
    const card = e.target.closest(".section-card");
    const imgSrc = card.querySelector("img").src;
    const name = card.querySelector("h4").textContent;
    const price = card.dataset.price || card.querySelector("p").textContent;

    const exists = wishlistItems.some(item => item.name === name);
    if (!exists) {
      wishlistItems.push({ imgSrc, name, price });
      showToast("Added to Wishlist ❤️");
    } else {
      showToast("Already in Wishlist 😉");
    }

    renderWishlistItems();
  }

  // Remove from wishlist
  if (e.target.classList.contains("remove-wishlist-btn")) {
    const index = e.target.dataset.index;
    wishlistItems.splice(index, 1);
    renderWishlistItems();
    showToast("Removed from Wishlist 🗑️");
  }
});
function renderWishlistItems() {
  const container = document.getElementById("wishlist-container");
  if (!container) return;

  container.innerHTML = "";

  wishlistItems.forEach((item, index) => {
    const wishlistItem = document.createElement("div");
    wishlistItem.classList.add("wishlist-item");

    wishlistItem.innerHTML = `
  <div class="item-info">
    <img src="${item.imgSrc}" alt="${item.name}">
    <div>
      <h3>${item.name}</h3>
      <p>${item.price}</p>
    </div>
  </div>
  <div class="actions">
    <button class="add-btn" data-index="${index}">Add to Bag</button>
    <button class="remove-wishlist-btn" data-index="${index}">Remove</button>
  </div>
`;

    container.appendChild(wishlistItem);
  });

  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  truncateText(".item-info h3", 25); // limit product name to 25 chars
  truncateText(".item-info p", 20);  // limit price/desc to 20 chars

}

function truncateText(selector, maxLength) {
  document.querySelectorAll(selector).forEach(el => {
    if (el.textContent.length > maxLength) {
      el.textContent = el.textContent.slice(0, maxLength - 3) + "...";
    }
  });
}

//home seection
function showSection(sectionToShow) {
  homeSection.style.display = "none";
  newArrivalSection.style.display = "none";
  menSection.style.display = "none";
  womenSection.style.display = "none";
  kidsSection.style.display = "none";
  saleSection.style.display = "none";
  wishlistSection.style.display = "none";
  cartSection.style.display = "none";

  sectionToShow.style.display = "block";
}

function handleNavClick(btn, section) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    showSection(section);
    localStorage.setItem("activeSection", section.id);

    document.querySelectorAll(".navTag a, .navCart, .navWishlist").forEach(link =>
      link.classList.remove("active")
    );

    btn.classList.add("active");
  });
}

handleNavClick(homeBtn, homeSection);
handleNavClick(newArrivalBtn, newArrivalSection,);
handleNavClick(menBtn, menSection);
handleNavClick(womenBtn, womenSection);
handleNavClick(kidsBtn, kidsSection);
handleNavClick(saleBtn, saleSection);
handleNavClick(cartBtn, cartSection);
handleNavClick(wishlistBtn, wishlistSection);

window.addEventListener("DOMContentLoaded", () => {
  generateArrivalCard();
  menSectionCard();
  womenSectionCard();
  kidsSectionCard();
  saleSectionCard();

  const savedSectionId = localStorage.getItem("activeSection");
  const section = document.getElementById(savedSectionId) || homeSection;

  showSection(section);
  renderBagItems();
  renderWishlistItems();



  // Remove all active classes first
  document.querySelectorAll(".navTag a, .navCart, .navWishlist").forEach(link => {
    link.classList.remove("active");
  });

  // Re-add active class to correct nav item
  switch (savedSectionId) {
    case "newArrivalSection": newArrivalBtn.classList.add("active"); break;
    case "menSection": menBtn.classList.add("active"); break;
    case "womenSection": womenBtn.classList.add("active"); break;
    case "kidsSection": kidsBtn.classList.add("active"); break;
    case "saleSection": saleBtn.classList.add("active"); break;
    case "cartSection": cartBtn.classList.add("active"); break;
    case "wishlistSection": wishlistBtn.classList.add("active"); break;
    default: homeBtn.classList.add("active");
  }
});



//hero section javaScript
const heroImages = [
  { src: "Hero Section images/hero nike.png", title: "NIKE AIR JORDAN 1" },
  { src: "Hero Section images/hero puma.png", title: "PUMA SOFTRIDE ENZO EVO" },
  { src: "Hero Section images/hero adidas.png", title: "ADIDAS SAMBA OG" },
  { src: "Hero Section images/hero campus.png", title: "CAMPUS OG-38" },
  { src: "Hero Section images/hero redtape.png", title: "REDTAPE ETPU LIFESTYLE" },
  { src: "Hero Section images/hero levis.png", title: "LEVI'S COLORBLOCK SNEAKERS" }
];

let heroIndex = 0;

const heroImgEl = document.querySelector(".mainContent img");
const heroH1El = document.querySelector(".mainContent h1");

function updateSlide(direction) {
  heroImgEl.style.transform = direction === "right" ? "translateX(-150%)" : "translateX(150%)";
  heroImgEl.style.transition = "transform 0.5s ease";
  heroH1El.style.opacity = "0";

  setTimeout(() => {
    heroIndex = direction === "right"
      ? (heroIndex + 1) % heroImages.length
      : (heroIndex - 1 + heroImages.length) % heroImages.length;

    heroImgEl.src = heroImages[heroIndex].src;
    heroH1El.innerText = heroImages[heroIndex].title;

    heroImgEl.style.transition = "none";
    heroImgEl.style.transform = direction === "right" ? "translateX(150%)" : "translateX(-150%)";
    void heroImgEl.offsetWidth;

    heroImgEl.style.transition = "transform 0.5s ease";
    heroImgEl.style.transform = "translateX(0)";
    heroH1El.style.transition = "opacity 0.5s ease";
    heroH1El.style.opacity = "1";
  }, 300);
}

document.querySelector(".arrow.right").onclick = () => {
  updateSlide("right");
  resetAutoSlide();
};
document.querySelector(".arrow.left").onclick = () => {
  updateSlide("left");
  resetAutoSlide();
};

let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    updateSlide("right");
  }, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}
startAutoSlide();

//New Arrival JavaScript
const newArrivalImages = [
  { src: "New Arrival Images/Froh Feet.jpg", name: "Froh Feet", price: "₹2499" },
  { src: "New Arrival Images/U.S. Polo Assn.jpg", name: "U.S. Polo Assn", price: "₹2349" },
  { src: "New Arrival Images/Server Boat Shoes.jpg", name: "SERVER LACE-UPS BOAT ", price: "₹3599" },
  { src: "New Arrival Images/Brekins.jpg", name: "BERKINS Casual Regular Boots", price: "₹2449" },
  { src: "New Arrival Images/HRX Unisex Back To School Shoes.jpg", name: "HRX Unisex Back To School Shoes", price: "₹1199" },
  { src: "New Arrival Images/Badminton Smash Sprint.jpg", name: "PUMA Badminton Smash Sprint ", price: "₹2499" },
  { src: "New Arrival Images/Red Tape Women Mesh Walking Shoes.jpg", name: "Red Tape Women Mesh Walking Shoes", price: "₹2369" },
  { src: "New Arrival Images/Bata Formal Oxfords.jpg", name: "Bata Formal Oxfords", price: "₹1277" },
  { src: "New Arrival Images/HRX Men Mesh Running Shoes.jpg", name: "HRX Men Mesh Running Shoes", price: "₹999" },
  { src: "New Arrival Images/Red Tape Men Textured Lace-Up ETPU Walking Shoes.jpg", name: "Red Tape Men ETPU Walking Shoes", price: "₹2519" },
  { src: "New Arrival Images/asian Men Round Toe Sneakers.jpg", name: "ASIAN Men Round Toe Sneakers", price: "₹899" },
  { src: "New Arrival Images/Red Tape Men Round Toe Memory Foam.jpg", name: "Red Tape Men Round Toe Memory Foam", price: "₹7199" },
  //repeat
  { src: "New Arrival Images/Froh Feet.jpg", name: "Froh Feet", price: "₹2499" },
  { src: "New Arrival Images/U.S. Polo Assn.jpg", name: "U.S. Polo Assn", price: "₹2349" },
  { src: "New Arrival Images/Server Boat Shoes.jpg", name: "SERVER LACE-UPS BOAT ", price: "₹3599" },
  { src: "New Arrival Images/Brekins.jpg", name: "BERKINS Casual Regular Boots", price: "₹2449" },
  { src: "New Arrival Images/HRX Unisex Back To School Shoes.jpg", name: "HRX Unisex Back To School Shoes", price: "₹1199" },
  { src: "New Arrival Images/Badminton Smash Sprint.jpg", name: "PUMA Badminton Smash Sprint ", price: "₹2499" },
  { src: "New Arrival Images/Red Tape Women Mesh Walking Shoes.jpg", name: "Red Tape Women Mesh Walking Shoes", price: "₹2369" },
  { src: "New Arrival Images/Bata Formal Oxfords.jpg", name: "Bata Formal Oxfords", price: "₹1277" },
  { src: "New Arrival Images/HRX Men Mesh Running Shoes.jpg", name: "HRX Men Mesh Running Shoes", price: "₹999" },
  { src: "New Arrival Images/Red Tape Men Textured Lace-Up ETPU Walking Shoes.jpg", name: "Red Tape Men ETPU Walking Shoes", price: "₹2519" },
  { src: "New Arrival Images/asian Men Round Toe Sneakers.jpg", name: "ASIAN Men Round Toe Sneakers", price: "₹899" },
  { src: "New Arrival Images/Red Tape Men Round Toe Memory Foam.jpg", name: "Red Tape Men Round Toe Memory Foam", price: "₹7199" },
];

const newArrivalGrid = document.getElementById("newArrivalGrid");

function generateArrivalCard() {
  const container = document.getElementById("newArrivalGrid");
  container.innerHTML = ""; // ✅ This clears old cards

  newArrivalImages.forEach(item => {
    const card = document.createElement("div");
    card.className = "section-card";

    card.innerHTML = `
    <img src="${item.src}" alt="${item.name}">
    <h4>${item.name}</h4>
    <p>${item.price}</p>
    <div class="card-buttons">
       <button class="wishlist-btn"><i class="fa-regular fa-heart"></i> Wishlist</button>
        <button class="bag-btn"><i class="fa-solid fa-bag-shopping"></i> Add to Bag</button>
    </div>

    `;
    newArrivalGrid.appendChild(card);
  });

}

window.addEventListener("DOMContentLoaded", generateArrivalCard);

// men section
const menSectionImages = [
  { src: "Men Section Images/HRX Unisex Mesh Running Shoes.jpg", name: "HRX Unisex Mesh Running Shoes", price: "₹1149" },
  { src: "Men Section Images/Red Tape Men Sneakers.jpg", name: "Red Tape Men Sneakers", price: "₹1899" },
  { src: "Men Section Images/NIKE Men Court Vision Low Sneakers.jpg", name: "NIKE Men Court Vision Low Sneakers", price: "₹5699" },
  { src: "Men Section Images/PUMA Smashic Soft Suede Sneakers.jpg", name: "PUMA Smashic Soft Suede Sneakers", price: "₹1999" },
  { src: "Men Section Images/USPA CLARKIN 4.0 Men Canvas Sneakers.jpg", name: "USPA CLARKIN 4.0 Men Canvas Sneakers", price: "₹1699" },
  { src: "Men Section Images/Red Tape Round Toe Memory Sneakers.jpg", name: "Red Tape Round Toe Memory Sneakers", price: "₹2199" },
  { src: "Men Section Images/ADIDAS Men Samba OG Leather Sneakers.jpg", name: "ADIDAS Men Samba OG Leather Sneakers", price: "₹10999" },
  { src: "Men Section Images/NIKE Men Air Max Fusion Sneakers.jpg", name: "NIKE Men Air Max Fusion Sneakers", price: "₹5999" },
  { src: "Men Section Images/Campus Men Lace-Up Running Shoes.jpg", name: "Campus Men Lace-Up Running Shoes", price: "₹1249" },
  { src: "Men Section Images/USPA Men Signature Tape PU Loafers.jpg", name: "USPA Men Signature Tape PU Loafers", price: "₹1959" },
  { src: "Men Section Images/Campus Men Colourblocked PU Sneakers.jpg", name: "Campus Men Colourblocked PU Sneakers", price: "₹1499" },
  { src: "Men Section Images/PUMA Court Shatter.jpg", name: "PUMA Court Shatter", price: "₹3499" },
  //repeat
  { src: "Men Section Images/HRX Unisex Mesh Running Shoes.jpg", name: "HRX Unisex Mesh Running Shoes", price: "₹1149" },
  { src: "Men Section Images/Red Tape Men Sneakers.jpg", name: "Red Tape Men Sneakers", price: "₹1899" },
  { src: "Men Section Images/NIKE Men Court Vision Low Sneakers.jpg", name: "NIKE Men Court Vision Low Sneakers", price: "₹5699" },
  { src: "Men Section Images/PUMA Smashic Soft Suede Sneakers.jpg", name: "PUMA Smashic Soft Suede Sneakers", price: "₹1999" },
  { src: "Men Section Images/USPA CLARKIN 4.0 Men Canvas Sneakers.jpg", name: "USPA CLARKIN 4.0 Men Canvas Sneakers", price: "₹1699" },
  { src: "Men Section Images/Red Tape Round Toe Memory Sneakers.jpg", name: "Red Tape Round Toe Memory Sneakers", price: "₹2199" },
  { src: "Men Section Images/ADIDAS Men Samba OG Leather Sneakers.jpg", name: "ADIDAS Men Samba OG Leather Sneakers", price: "₹10999" },
  { src: "Men Section Images/NIKE Men Air Max Fusion Sneakers.jpg", name: "NIKE Men Air Max Fusion Sneakers", price: "₹5999" },
  { src: "Men Section Images/Campus Men Lace-Up Running Shoes.jpg", name: "Campus Men Lace-Up Running Shoes", price: "₹1249" },
  { src: "Men Section Images/USPA Men Signature Tape PU Loafers.jpg", name: "USPA Men Signature Tape PU Loafers", price: "₹1959" },
  { src: "Men Section Images/Campus Men Colourblocked PU Sneakers.jpg", name: "Campus Men Colourblocked PU Sneakers", price: "₹1499" },
  { src: "Men Section Images/PUMA Court Shatter.jpg", name: "PUMA Court Shatter", price: "₹3499" },

];

const mansectionGrid = document.getElementById("menSectionGrid");

function menSectionCard() {
  const container = document.getElementById("menSectionGrid");
  container.innerHTML = "";

  menSectionImages.forEach(item => {
    const card = document.createElement("div");
    card.className = "section-card";

    card.innerHTML = `
    <img src="${item.src}" alt="${item.name}">
    <h4>${item.name}</h4>
    <p>${item.price}</p>
    <div class="card-buttons">
       <button class="wishlist-btn"><i class="fa-regular fa-heart"></i> Wishlist</button>
        <button class="bag-btn"><i class="fa-solid fa-bag-shopping"></i> Add to Bag</button>
    </div>

    `;
    menSectionGrid.appendChild(card);
  });

}
window.addEventListener("DOMContentLoaded", menSectionCard);

//women Section JS
const womenSectionImages = [
  { src: "Women Section Images/PUMA Court Classic Lux.jpg", name: "PUMA Court Classic Lux", price: "₹3299" },
  { src: "Women Section Images/BARKER Bonnie Navy Grain.jpg", name: "BARKER Bonnie Navy Grain", price: "₹27600" },
  { src: "Women Section Images/NIKE Run Defy.jpg", name: "NIKE Run Defy ", price: "₹3995" },
  { src: "Women Section Images/Adidas Unisex Superstar.jpg", name: "Adidas Unisex Superstar", price: "₹9599" },
  { src: "Women Section Images/The Souled Store Urban Blaze.jpg", name: "The Souled Store Urban Blaze", price: "₹2618" },
  { src: "Women Section Images/Red Tape Women Sneakers.jpg", name: "Red Tape Women Sneakers", price: "₹1549" },
  { src: "Women Section Images/NIKE Air Force 1 '07.jpg", name: "NIKE Air Force 1 '07", price: "₹9695" },
  { src: "Women Section Images/PUMA X-Ray 2 Square.jpg", name: "PUMA X-Ray 2 Square", price: "₹3999" },
  { src: "Women Section Images/JodyHub Square Toe Slip-On Ballerinas.jpg", name: "JodyHub Square Toe Slip-On Ballerinas", price: "₹1499" },
  { src: "Women Section Images/ERIDANI Seren Strappy Block Heel Sandal.jpg", name: "ERIDANI Seren Strappy Block Heel Sandal", price: "₹1659" },
  { src: "Women Section Images/Mochi Women Black Comfort Heels.jpg", name: "Mochi Women Black Comfort Heels", price: "₹1249" },
  { src: "Women Section Images/Adidas  GAZELLE.jpg", name: "Adidas  GAZELLE", price: "₹7149" },
  //repeat
  { src: "Women Section Images/PUMA Court Classic Lux.jpg", name: "PUMA Court Classic Lux", price: "₹3299" },
  { src: "Women Section Images/BARKER Bonnie Navy Grain.jpg", name: "BARKER Bonnie Navy Grain", price: "₹27600" },
  { src: "Women Section Images/NIKE Run Defy.jpg", name: "NIKE Run Defy ", price: "₹3995" },
  { src: "Women Section Images/Adidas Unisex Superstar.jpg", name: "Adidas Unisex Superstar", price: "₹9599" },
  { src: "Women Section Images/The Souled Store Urban Blaze.jpg", name: "The Souled Store Urban Blaze", price: "₹2618" },
  { src: "Women Section Images/Red Tape Women Sneakers.jpg", name: "Red Tape Women Sneakers", price: "₹1549" },
  { src: "Women Section Images/NIKE Air Force 1 '07.jpg", name: "NIKE Air Force 1 '07", price: "₹9695" },
  { src: "Women Section Images/PUMA X-Ray 2 Square.jpg", name: "PUMA X-Ray 2 Square", price: "₹3999" },
  { src: "Women Section Images/JodyHub Square Toe Slip-On Ballerinas.jpg", name: "JodyHub Square Toe Slip-On Ballerinas", price: "₹1499" },
  { src: "Women Section Images/ERIDANI Seren Strappy Block Heel Sandal.jpg", name: "ERIDANI Seren Strappy Block Heel Sandal", price: "₹1659" },
];

const womensectionGrid = document.getElementById("womenSectionGrid");

function womenSectionCard() {
  const container = document.getElementById("womenSectionGrid");
  container.innerHTML = "";

  womenSectionImages.forEach(item => {
    const card = document.createElement("div");
    card.className = "section-card";

    card.innerHTML = `
    <img src="${item.src}" alt="${item.name}">
    <h4>${item.name}</h4>
    <p>${item.price}</p>
    <div class="card-buttons">
       <button class="wishlist-btn"><i class="fa-regular fa-heart"></i> Wishlist</button>
        <button class="bag-btn"><i class="fa-solid fa-bag-shopping"></i> Add to Bag</button>
    </div>

    `;
    womenSectionGrid.appendChild(card);
  });

}
window.addEventListener("DOMContentLoaded", womenSectionCard);

//Kids Section JS
const kidsSectionImages = [
  { src: "Kids Section Images/Koburg.jpg", name: "Koburg", price: "₹699" },
  { src: "Kids Section Images/asian kids.jpg", name: "Asian kids", price: "₹419" },
  { src: "Kids Section Images/Fame Forever by Lifestyle.jpg", name: "Fame Forever by Lifestyle", price: "₹499" },
  { src: "Kids Section Images/Shoetophia.jpg", name: "Shoetophia", price: "₹749 " },
  { src: "Kids Section Images/FEETWELL SHOES.jpg", name: "Feetwelll Shoes", price: "₹549" },
  { src: "Kids Section Images/BIRDE.jpg", name: "BIRDE", price: "₹459" },
  { src: "Kids Section Images/Shoetopia Girls.jpg", name: "Shoetopia Girls", price: "₹799" },
  { src: "Kids Section Images/KazarMax.jpg", name: "KazarMax", price: "₹1099" },
  { src: "Kids Section Images/Liberty.jpg", name: "Liberty", price: "₹599" },
  { src: "Kids Section Images/Bride Kids Mid Top.jpg", name: "Bride Kids Mid Top ", price: "₹499" },
  { src: "Kids Section Images/Crazyly.jpg", name: "Crazyly", price: "₹459" },
  { src: "Kids Section Images/HOOH.jpg", name: "HOOH", price: "₹499" },
];

const kidssectionGrid = document.getElementById("kidsSectionGrid");

function kidsSectionCard() {
   const container = document.getElementById("kidsSectionGrid");
  container.innerHTML = "";


  kidsSectionImages.forEach(item => {
    const card = document.createElement("div");
    card.className = "section-card";

    card.innerHTML = `
    <img src="${item.src}" alt="${item.name}">
    <h4>${item.name}</h4>
    <p>${item.price}</p>
    <div class="card-buttons">
       <button class="wishlist-btn"><i class="fa-regular fa-heart"></i> Wishlist</button>
        <button class="bag-btn"><i class="fa-solid fa-bag-shopping"></i> Add to Bag</button>
    </div>

    `;
    kidsSectionGrid.appendChild(card);
  });

}
window.addEventListener("DOMContentLoaded", kidsSectionCard);

// sale section Js
const saleSectionImages = [
  { src: "Hero Section images/hero nike.png", name: "NIKE AIR JORDAN 1", originalPrice: "₹9900", discount: "10" },
  { src: "Hero Section images/hero puma.png", name: "PUMA SOFTRIDE ENZO EVO", originalPrice: "₹8499", discount: "15" },
  { src: "Hero Section images/hero adidas.png", name: "ADIDAS SAMBA OG", originalPrice: "₹7499", discount: "20" },
  { src: "Hero Section images/hero campus.png", name: "CAMPUS OG-38", originalPrice: "₹2599", discount: "25" },
  { src: "Hero Section images/hero redtape.png", name: "REDTAPE ETPU LIFESTYLE", originalPrice: "₹3899", discount: "30" },
  { src: "Hero Section images/hero levis.png", name: "LEVI'S COLORBLOCK SNEAKERS", originalPrice: "₹4799", discount: "5" }
];

function saleSectionCard() {
  console.log("Running saleSectionCard...");

  const saleSectionGrid = document.getElementById("saleSectionGrid");

  saleSectionImages.forEach(item => {
    const originalPrice = parseFloat(item.originalPrice.replace(/[₹,]/g, ""));
    const discount = parseFloat(item.discount);
    const price = (originalPrice - (originalPrice * (discount / 100))).toFixed(0);

    const card = document.createElement("div");
    card.className = "section-card";
    card.setAttribute("data-price", price);

    card.innerHTML = `
  <img src="${item.src}" alt="${item.name}">
  <h4>${item.name}</h4>
  <p>
    <del>₹${originalPrice}</del> 
    <strong>₹${price}</strong> 
    <span class="discount-badge">${discount}% OFF</span>
  </p>
  <div class="card-buttons">
    <button class="wishlist-btn"><i class="fa-regular fa-heart"></i> Wishlist</button>
    <button class="bag-btn"><i class="fa-solid fa-bag-shopping"></i> Add to Bag</button>
  </div>
`;


    saleSectionGrid.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", saleSectionCard);

