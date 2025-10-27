// =========================
// Hero Text Rotation
// =========================
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

function updateHeroContent() {
  if (!heroElement || !heroBtn) return;

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

let heroInterval;
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!heroInterval) {
        updateHeroContent();
        heroInterval = setInterval(updateHeroContent, 3000);
      }
    } else {
      clearInterval(heroInterval);
      heroInterval = null;
    }
  });
}, { threshold: 0.5 });

if (heroSection) heroObserver.observe(heroSection);


// =========================
// Fade Animations on Scroll
// =========================
const faders = document.querySelectorAll(".fade-up, .fade-left, .fade-right, .fade-up-section, .private-label-section .fade-up");

const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));


// =========================
// Number Counters
// =========================
const counters = document.querySelectorAll(".counter-box h3");
const numbersSection = document.querySelector(".numbers-section");
let startedCounting = false;

const countObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !startedCounting) {
      startedCounting = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const duration = 2000;
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
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (numbersSection) countObserver.observe(numbersSection);


// =========================
// Our Services Section
// =========================
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const serviceCards = document.querySelectorAll(".our-services-section .service-card");
    const servicesCTA = document.querySelector(".services-cta");

    if (servicesCTA) {
        servicesCTA.style.opacity = 0;
        servicesCTA.style.transform = "translateY(20px)";
    }

    const serviceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("show");

                    // Show icons inside the card
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons({ parent: entry.target });
                    }

                    // Show CTA button after all cards appear
                    const allVisible = Array.from(serviceCards).every(card => card.classList.contains("show"));
                    if (allVisible && servicesCTA) {
                        servicesCTA.style.transition = "all 0.6s ease";
                        servicesCTA.style.opacity = 1;
                        servicesCTA.style.transform = "translateY(0)";
                    }
                }, i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    serviceCards.forEach(card => serviceObserver.observe(card));
});


// =========================
// Alisar Brand Section
// =========================


const alisarSection = document.querySelector(".alisar-brand-section");

const alisarObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if(alisarSection){
  alisarObserver.observe(alisarSection);
}

document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll('.fade-in-section');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
});

