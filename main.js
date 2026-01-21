/**
 * main.js - Shared Logic for Nexus Digital Demo
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. ACTIVE NAV LINK HIGHLIGHTER
  // Highlights the current page in the header
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // 2. FOOTER NEWSLETTER LOGIC (ONE-TIME SUBMIT)
  const newsletterForm = document.getElementById("footer_newsletter");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const emailInput = this.querySelector('input[type="email"]');

      // Step A: Disable button & show loader immediately
      submitBtn.disabled = true;
      emailInput.disabled = true;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status"></span>';

      // Step B: Push to DataLayer for GTM Practice
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "newsletter_signup",
        form_id: "footer_newsletter",
      });

      // Step C: After a short delay, remove form and show Thank You message
      setTimeout(() => {
        const parentDiv = this.parentElement;
        // This removes the form from the page completely
        parentDiv.innerHTML = `
                    <div class="text-success fw-bold py-2 d-flex align-items-center animate__animated animate__fadeIn">
                        <svg class="me-2" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Thanks for joining the demo!
                    </div>
                `;
      }, 1000);
    });
  }
});
