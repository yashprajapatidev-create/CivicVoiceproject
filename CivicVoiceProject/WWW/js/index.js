// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Highlight active nav link
  const navLinks = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
                                if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

                              // Smooth scroll for internal links
  const smoothLinks = document.querySelectorAll("a[href^='#']");
  smoothLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
                            const targetId = link.getAttribute("href").substring(1);
                                            const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

                 // Scroll-triggered animations (basic fade-in)
                                                          const fadeElements = document.querySelectorAll(".step, .feature, .testimonial");
  const observer = new IntersectionObserver(entries => {
                                                    entries.forEach(entry => {
                                    if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  fadeElements.forEach(el => observer.observe(el));

  
                    const buttons = document.querySelectorAll(".btn-primary");
  buttons.forEach(btn => {
                               btn.addEventListener("mouseenter", () => btn.classList.add("hovered"));
    btn.addEventListener("mouseleave", () => btn.classList.remove("hovered"));
  });

  
  console.log("CivicVoice homepage script loaded.");
});