const heroTexts = [
  {text: "ALISAR, where the Dead Sea’s minerals meet luxurious skincare.", 
   btn: {text: "Discover More", link:"#about"}, 
   btn2: {text: "View Products", link:"#products"}},
  {text: "Crafting pure and rejuvenating skincare, inspired by nature.", 
   btn: {text: "Learn More", link:"#services"}},
  {text: "ALISAR, your partner in creating exceptional private label products.", 
   btn: {text: "Contact Us", link:"#contact"}},
  {text: "From Jordan’s Dead Sea to the world — quality you can trust.", 
   btn: {text: "Our Products", link:"#products"}},
  {text: "Elevating skincare with mineral-rich, naturally effective formulations.", 
   btn: {text: "Discover More", link:"#about"}},
  {text: "ALISAR, guiding your brand every step of the way with excellence.", 
   btn: {text: "Learn More", link:"#services"}},
  {text: "Innovation, purity, and elegance — that’s the ALISAR promise.", 
   btn: {text: "Our Products", link:"#products"}},
  {text: "Transforming natural ingredients into luxury skincare experiences.", 
   btn: {text: "Contact Us", link:"#contact"}}
];

let index = 0;
const heroElement = document.getElementById("hero-text");
const heroBtn = document.getElementById("hero-btn");
const secondaryBtn = document.querySelector(".cta-buttons .secondary-btn");
const heroSection = document.querySelector(".hero");

// Function to update hero text and buttons
function updateHeroContent() {
  if (!heroElement || !heroBtn) return; // Basic error handling

  heroElement.style.opacity = 0;
  heroBtn.style.opacity = 0;
  if (secondaryBtn) secondaryBtn.style.opacity = 0;

  setTimeout(() => {
    heroElement.textContent = heroTexts[index].text;
    heroBtn.textContent = heroTexts[index].btn.text;
    heroBtn.href = heroTexts[index].btn.link;

    if (heroTexts[index].btn2 && secondaryBtn) {
      secondaryBtn.textContent = heroTexts[index].btn2.text;
      secondaryBtn.href = heroTexts[index].btn2.link;
      secondaryBtn.style.display = "inline-block";
    } else if (secondaryBtn) {
      secondaryBtn.style.display = "none";
    }

    heroElement.style.opacity = 1;
    heroBtn.style.opacity = 1;
    if (secondaryBtn) secondaryBtn.style.opacity = 1;

    index = (index + 1) % heroTexts.length;
  }, 1000);
}

// IntersectionObserver for Hero Section to manage text rotation
let heroInterval;
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!heroInterval) {
        updateHeroContent(); // Initial call
        heroInterval = setInterval(updateHeroContent, 3000);
      }
    } else {
      clearInterval(heroInterval);
      heroInterval = null;
    }
  });
}, { threshold: 0.5 }); // Trigger when 50% of the hero section is visible

if (heroSection) {
  heroObserver.observe(heroSection);
}

// Consolidated Scroll Reveal Animation
const faders = document.querySelectorAll(
  ".fade-up, .fade-left, .fade-up-section, .private-label-section .fade-up"
);

const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// Number Counter Animation with IntersectionObserver
const counters = document.querySelectorAll(".counter-box h3");
const numbersSection = document.querySelector(".numbers-section");
let startedCounting = false;

const countObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !startedCounting) {
      startedCounting = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const duration = 2000; // 2 seconds
        const step = target / (duration / 20);
        let count = 0;

        const update = setInterval(() => {
          count += step;
          if (count >= target) {
            count = target;
            clearInterval(update);
          }
          counter.textContent = Math.floor(count);
        }, 20);
      });
      observer.unobserve(entry.target); // Stop observing once counting starts
    }
  });
}, { threshold: 0.5 }); // Trigger when 50% of the section is visible

if (numbersSection) {
  countObserver.observe(numbersSection);
}

document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-right, .fade-up, .fade-left");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  fadeElements.forEach((el) => observer.observe(el));
});
