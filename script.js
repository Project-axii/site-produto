// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navLinks = document.querySelector(".nav-links")

mobileMenuBtn.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex"

  if (navLinks.style.display === "flex") {
    navLinks.style.position = "absolute"
    navLinks.style.top = "100%"
    navLinks.style.left = "0"
    navLinks.style.right = "0"
    navLinks.style.backgroundColor = "var(--color-background)"
    navLinks.style.flexDirection = "column"
    navLinks.style.padding = "var(--spacing-lg)"
    navLinks.style.borderTop = "1px solid var(--color-border)"
  }
})

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Close mobile menu if open
      if (window.innerWidth <= 768) {
        navLinks.style.display = "none"
      }
    }
  })
})

// Form Submission
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)

  // Show success message (in a real app, this would send data to a server)
  alert("Obrigado pelo interesse! Entraremos em contato em breve.")

  // Reset form
  contactForm.reset()
})

// Navbar Background on Scroll
let lastScroll = 0
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.style.backgroundColor = "rgba(10, 10, 10, 0.95)"
  } else {
    navbar.style.backgroundColor = "rgba(10, 10, 10, 0.8)"
  }

  lastScroll = currentScroll
})

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all cards and sections
document.querySelectorAll(".feature-card, .problem-card, .mission-card, .benefit-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
  observer.observe(el)
})

// Add hover effect to visual buttons
const visualButtons = document.querySelectorAll(".visual-btn")
visualButtons.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(-2px)"
  })

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0)"
  })
})

// Dynamic stats counter animation
const animateValue = (element, start, end, duration) => {
  let startTimestamp = null
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    const value = Math.floor(progress * (end - start) + start)
    element.textContent = value + (element.dataset.suffix || "")
    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

// Observe stats section
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statValues = entry.target.querySelectorAll(".stat-value")
        statValues.forEach((stat) => {
          const text = stat.textContent
          const number = Number.parseInt(text.match(/\d+/)?.[0] || 0)
          if (number > 0) {
            stat.dataset.suffix = text.replace(/\d+/, "")
            stat.textContent = "0" + stat.dataset.suffix
            animateValue(stat, 0, number, 2000)
          }
        })
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const heroStats = document.querySelector(".hero-stats")
if (heroStats) {
  statsObserver.observe(heroStats)
}
