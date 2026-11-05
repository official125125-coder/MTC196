
// ======================================
// MTC196 DYNAMIC LUXURY EDITION
// ======================================

// CURRENT YEAR
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


// ======================================
// AUTO GAME LOGOS
// ======================================

document.querySelectorAll(".real-game-logo").forEach(image => {
  const logoBox = image.closest(".game-logo-auto");

  if (!logoBox) return;

  function updateLogo() {
    const loaded =
      image.complete &&
      image.naturalWidth > 0 &&
      image.naturalHeight > 0;

    logoBox.classList.toggle("has-logo", loaded);
  }

  image.addEventListener("load", updateLogo);

  image.addEventListener("error", () => {
    logoBox.classList.remove("has-logo");
  });

  if (image.complete) {
    updateLogo();
  }
});


// ======================================
// SMOOTH SCROLL REVEAL
// ======================================

const revealElements = document.querySelectorAll(".reveal");

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else if (
          entry.boundingClientRect.top > 0
        ) {
          // Allows the effect again when scrolling back down.
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -20px 0px"
    }
  );

  revealElements.forEach(element => observer.observe(element));

  document.documentElement.classList.add("js-ready");
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}


// ======================================
// GAME POPUP
// ======================================

const popup = document.getElementById("gamePopup");
const popupGame = document.getElementById("popupGame");
const popupClose = document.getElementById("popupClose");
const gameCards = document.querySelectorAll(".game-card");

let popupOpening = false;
let popupTimer = null;
let lastFocusedElement = null;

function openPopup(gameName) {
  if (!popup || popupOpening || popup.classList.contains("show")) {
    return;
  }

  popupOpening = true;
  lastFocusedElement = document.activeElement;

  if (popupGame) {
    popupGame.textContent = gameName;
  }

  popup.setAttribute("aria-hidden", "false");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!popupOpening) return;

      popup.classList.add("show");

      if (popupClose) {
        popupClose.focus({ preventScroll: true });
      }

      clearTimeout(popupTimer);

      popupTimer = setTimeout(() => {
        popupOpening = false;
      }, 380);
    });
  });
}

function closePopup() {
  if (!popup) return;

  clearTimeout(popupTimer);
  popupOpening = false;

  popup.classList.remove("show");
  popup.setAttribute("aria-hidden", "true");

  if (lastFocusedElement) {
    lastFocusedElement.focus({ preventScroll: true });
  }
}

gameCards.forEach(card => {
  card.addEventListener("click", event => {
    event.preventDefault();
    openPopup(card.dataset.game || "GAME");
  });
});

if (popupClose) {
  popupClose.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    closePopup();
  });
}

if (popup) {
  popup.addEventListener("click", event => {
    if (event.target === popup) {
      closePopup();
    }
  });
}

document.addEventListener("keydown", event => {
  if (!popup || !popup.classList.contains("show")) return;

  if (event.key === "Escape") {
    closePopup();
    return;
  }

  if (event.key === "Tab") {
    const focusable = Array.from(
      popup.querySelectorAll('button:not([disabled]),a[href]')
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }
});
