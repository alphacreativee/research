document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  const slides = document.querySelectorAll(".sticky-slider");
  const navItems = document.querySelectorAll(".sticky-nav li");
  const navLinks = document.querySelectorAll(".sticky-nav a");

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

  // Xử lý click cho navigation
  navLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Tính progress tương ứng với slide index
      const progress = index / (slides.length - 1);

      // Lấy ScrollTrigger của timeline
      const st = tl.scrollTrigger;

      // Tính vị trí scroll dựa trên progress
      const scrollPosition = st.start + (st.end - st.start) * progress;

      // Scroll đến vị trí đó
      gsap.to(window, {
        duration: 1,
        scrollTo: scrollPosition,
        ease: "power2.inOut",
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
  gsap.to(".direction-column .direction-item img", {
    xPercent: -10,
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
