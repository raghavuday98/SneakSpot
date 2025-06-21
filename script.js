const homeBtn = document.getElementById("nav-home");
const homeSection = document.querySelector(".home"); // use querySelector for class
const newArrivalBtn = document.getElementById("nav-new-arrrival");
const newArrivalSection = document.getElementById("newArrivalSection");
const menBtn = document.getElementById("nav-men");
const menSection = document.getElementById("menSection");
const womenBtn = document.getElementById("nav-women");
const womenSection = document.getElementById("womenSection");
const kidsBtn = document.getElementById("nav-kids");
const kidsSection = document.getElementById("kidsSection");
const saleBtn = document.getElementById("nav-sale");
const saleSection = document.getElementById("saleSection");

// function to show only one section
function showSection(sectionToShow) {
  homeSection.style.display = "none";
  newArrivalSection.style.display = "none";
  menSection.style.display = "none";
  womenSection.style.display = "none";
  kidsSection.style.display = "none";
  saleSection.style.display = "none";

  sectionToShow.style.display = "block";
}

// reusable nav handler
function handleNavClick(btn, section) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    showSection(section);

    // remove active from all nav links
    document.querySelectorAll(".navTag a").forEach(link =>
      link.classList.remove("active")
    );

    // add active to clicked nav
    btn.classList.add("active");
  });
}

// call function for each nav
handleNavClick(homeBtn, homeSection);
handleNavClick(newArrivalBtn, newArrivalSection);
handleNavClick(menBtn, menSection);
handleNavClick(womenBtn, womenSection);
handleNavClick(kidsBtn, kidsSection);
handleNavClick(saleBtn, saleSection);

showSection(homeSection);
homeBtn.classList.add("active");


const images = [
  { src: "Hero Section images/hero nike.png", title: "NIKE AIR JORDAN 1" },
  { src: "Hero Section images/hero puma.png", title: "PUMA SOFTRIDE ENZO EVO" },
  { src: "Hero Section images/hero adidas.png", title: "ADIDAS SAMBA OG" },
  { src: "Hero Section images/hero campus.png", title: "CAMPUS OG-38" },
  { src: "Hero Section images/hero redtape.png", title: "REDTAPE ETPU LIFESTYLE" },
  { src: "Hero Section images/hero levis.png", title: "LEVI'S COLORBLOCK SNEAKERS" }
];

let index = 0;

const imgEl = document.querySelector(".mainContent img");
const h1El = document.querySelector(".mainContent h1");

function updateSlide(direction) {
  // Slide image out + fade h1 out
  imgEl.style.transform = direction === "right" ? "translateX(-150%)" : "translateX(150%)";
  imgEl.style.transition = "transform 0.5s ease";
  h1El.style.opacity = "0";

  setTimeout(() => {
    // Update index
    index = direction === "right"
      ? (index + 1) % images.length
      : (index - 1 + images.length) % images.length;

    // Set new content
    imgEl.src = images[index].src;
    h1El.innerText = images[index].title;

    // Jump image to opposite side without animation
    imgEl.style.transition = "none";
    imgEl.style.transform = direction === "right" ? "translateX(150%)" : "translateX(-150%)";

    // Trigger reflow (forces browser to register change)
    void imgEl.offsetWidth;

    // Animate image in + fade in h1
    imgEl.style.transition = "transform 0.5s ease";
    imgEl.style.transform = "translateX(0)";
    h1El.style.transition = "opacity 0.5s ease";
    h1El.style.opacity = "1";
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
