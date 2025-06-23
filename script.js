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

function showSection(sectionToShow) {
  homeSection.style.display = "none";
  newArrivalSection.style.display = "none";
  menSection.style.display = "none";
  womenSection.style.display = "none";
  kidsSection.style.display = "none";
  saleSection.style.display = "none";

  sectionToShow.style.display = "block";
}

function handleNavClick(btn, section) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    showSection(section);
    localStorage.setItem("activeSection", section.id);

    document.querySelectorAll(".navTag a").forEach(link =>
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

window.addEventListener("DOMContentLoaded", () => {
  generateArrivalCard();
  menSectionCard();
  womenSectionCard();
  kidsSectionCard();
  saleSectionCard();

  const savedSectionId = localStorage.getItem("activeSection");
  const section = document.getElementById(savedSectionId) || homeSection;

  showSection(section);

  // Remove active class from all nav links
  document.querySelectorAll(".navTag a").forEach(link => {
    link.classList.remove("active");
  });

  // Set the correct nav link as active
  if (savedSectionId) {
    const activeBtnId = `nav-${savedSectionId.replace("Section", "").toLowerCase()}`;
    const activeBtn = document.getElementById(activeBtnId);
    if (activeBtn) activeBtn.classList.add("active");
  } else {
    homeBtn.classList.add("active"); // default to Home
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
  { src: "Hero Section images/hero nike.png", name: "NIKE AIR JORDAN 1", price: "₹X,XXX" },
  { src: "Hero Section images/hero puma.png", name: "PUMA SOFTRIDE ENZO EVO", price: "₹X,XXX" },
  { src: "Hero Section images/hero adidas.png", name: "ADIDAS SAMBA OG", price: "₹X,XXX" },
  { src: "Hero Section images/hero campus.png", name: "CAMPUS OG-38", price: "₹X,XXX" },
  { src: "Hero Section images/hero redtape.png", name: "REDTAPE ETPU LIFESTYLE", price: "₹X,XXX" },
  { src: "Hero Section images/hero levis.png", name: "LEVI'S COLORBLOCK SNEAKERS", price: "₹X,XXX" }
];

const newArrivalGrid = document.getElementById("newArrivalGrid");

function generateArrivalCard() {

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
  { src: "Hero Section images/hero nike.png", name: "NIKE AIR JORDAN 1", price: "₹X,XXX" },
  { src: "Hero Section images/hero puma.png", name: "PUMA SOFTRIDE ENZO EVO", price: "₹X,XXX" },
  { src: "Hero Section images/hero adidas.png", name: "ADIDAS SAMBA OG", price: "₹X,XXX" },
  { src: "Hero Section images/hero campus.png", name: "CAMPUS OG-38", price: "₹X,XXX" },
  { src: "Hero Section images/hero redtape.png", name: "REDTAPE ETPU LIFESTYLE", price: "₹X,XXX" },
  { src: "Hero Section images/hero levis.png", name: "LEVI'S COLORBLOCK SNEAKERS", price: "₹X,XXX" }
];

const mansectionGrid = document.getElementById("menSectionGrid");

function menSectionCard() {

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
  { src: "Hero Section images/hero nike.png", name: "NIKE AIR JORDAN 1", price: "₹X,XXX" },
  { src: "Hero Section images/hero puma.png", name: "PUMA SOFTRIDE ENZO EVO", price: "₹X,XXX" },
  { src: "Hero Section images/hero adidas.png", name: "ADIDAS SAMBA OG", price: "₹X,XXX" },
  { src: "Hero Section images/hero campus.png", name: "CAMPUS OG-38", price: "₹X,XXX" },
  { src: "Hero Section images/hero redtape.png", name: "REDTAPE ETPU LIFESTYLE", price: "₹X,XXX" },
  { src: "Hero Section images/hero levis.png", name: "LEVI'S COLORBLOCK SNEAKERS", price: "₹X,XXX" }
];

const womensectionGrid = document.getElementById("womenSectionGrid");

function womenSectionCard() {

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
  { src: "Hero Section images/hero nike.png", name: "NIKE AIR JORDAN 1", price: "₹X,XXX" },
  { src: "Hero Section images/hero puma.png", name: "PUMA SOFTRIDE ENZO EVO", price: "₹X,XXX" },
  { src: "Hero Section images/hero adidas.png", name: "ADIDAS SAMBA OG", price: "₹X,XXX" },
  { src: "Hero Section images/hero campus.png", name: "CAMPUS OG-38", price: "₹X,XXX" },
  { src: "Hero Section images/hero redtape.png", name: "REDTAPE ETPU LIFESTYLE", price: "₹X,XXX" },
  { src: "Hero Section images/hero levis.png", name: "LEVI'S COLORBLOCK SNEAKERS", price: "₹X,XXX" }
];

const kidssectionGrid = document.getElementById("kidsSectionGrid");

function kidsSectionCard() {

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

