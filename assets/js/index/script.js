document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  const slides = document.querySelectorAll(".sticky-slider");
  const navItems = document.querySelectorAll(".sticky-nav li");
  const tl = gsap.timeline({
    defaults: {
      ease: "none",
      duration: 1,
    },
    scrollTrigger: {
      trigger: ".sticky-container",
      start: "top top",
      end: `top+=${slides.length * 1000}px top`,
      pin: true,
      markers: true,
      scrub: true,
      onUpdate: (self) => {
        navItems.forEach((item) => item.classList.remove("active"));

        const activeIndex = Math.round(self.progress * (slides.length - 1));
        navItems[activeIndex].classList.add("active");
      },
    },
  });

  document.querySelectorAll(".sticky-slider").forEach((slide, index) => {
    if (index === 0) return;
    tl.from(slide, {
      yPercent: 100,
      stagger: 0.5,
    });
  });

  const links = gsap.utils.toArray(".sticky-nav a");

  function setActive(link) {
    links.forEach((el) => el.classList.remove("active"));
    link.classList.add("active");
  }

  links.forEach((a) => {
    const element = document.querySelector(a.getAttribute("href"));
    const linkST = ScrollTrigger.create({
      trigger: element,
      start: "top top",
    });
    ScrollTrigger.create({
      trigger: element,
      start: "top top",
      end: "top top",
      markers: true,
      onToggle: (self) => self.isActive && setActive(a),
    });
    a.addEventListener("click", (e) => {
      e.preventDefault();
      gsap.to(window, {
        duration: 1,
        scrollTo: linkST.start,
        overwrite: "auto",
      });
    });
  });
});
function initDirectionAnimation() {
  // Pin section
  ScrollTrigger.create({
    trigger: ".direction",
    start: "top top",
    end: "+=200%",
    pin: true,
    anticipatePin: 1,
  });

  gsap.to(".direction-column:first-child .direction-list", {
    // yPercent: 60,
    y: 960,
    ease: "none",
    scrollTrigger: {
      trigger: ".direction",
      start: "top top",
      end: "+=200%",
      scrub: 1,
    },
  });

  gsap.to(".direction-column:last-child .direction-list", {
    // yPercent: -60,
    y: -960,
    ease: "none",
    scrollTrigger: {
      trigger: ".direction",
      start: "top top",
      end: "+=200%",
      scrub: 1,
    },
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initDirectionAnimation();
});
