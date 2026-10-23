// =======================================
// MTC196 OFFICIAL
// =======================================


// =======================================
// LINKS
// =======================================

const MTC196 = {

  channel: {

    whatsapp:
      "https://wa.link/tums26",

    telegram:
      "https://t.me/mtc196c"

  },


  customerService: {

    whatsapp:
      "https://wa.link/tums26",

    telegram:
      "https://t.me/MTC196m"

  }

};


// =======================================
// CURRENT YEAR
// =======================================

const year =
  document.getElementById("year");


if (year) {

  year.textContent =
    new Date().getFullYear();

}


// =======================================
// AUTO GAME LOGO
// =======================================

const realGameLogos =
  document.querySelectorAll(
    ".real-game-logo"
  );


realGameLogos.forEach(image => {

  const logoBox =
    image.closest(
      ".game-logo-auto"
    );


  // LOGO BERHASIL DIMUAT
  image.addEventListener(
    "load",
    () => {

      if (
        image.naturalWidth > 0 &&
        image.naturalHeight > 0
      ) {

        logoBox.classList.add(
          "has-logo"
        );

      }

    }
  );


  // LOGO BELUM ADA / ERROR
  image.addEventListener(
    "error",
    () => {

      logoBox.classList.remove(
        "has-logo"
      );

    }
  );


  /*
    Untuk browser yang sudah
    menyimpan gambar di cache.
  */

  if (image.complete) {

    if (
      image.naturalWidth > 0 &&
      image.naturalHeight > 0
    ) {

      logoBox.classList.add(
        "has-logo"
      );

    } else {

      logoBox.classList.remove(
        "has-logo"
      );

    }

  }

});


// =======================================
// POPUP ELEMENTS
// =======================================

const popup =
  document.getElementById(
    "gamePopup"
  );


const popupGame =
  document.getElementById(
    "popupGame"
  );


const popupClose =
  document.getElementById(
    "popupClose"
  );


const gameCards =
  document.querySelectorAll(
    ".game-card"
  );


let popupOpening = false;


// =======================================
// OPEN POPUP
// =======================================

function openPopup(gameName) {

  if (
    !popup ||
    popupOpening
  ) {

    return;

  }


  popupOpening = true;


  if (popupGame) {

    popupGame.textContent =
      gameName;

  }


  requestAnimationFrame(() => {

    requestAnimationFrame(() => {

      popup.classList.add(
        "show"
      );


      setTimeout(() => {

        popupOpening = false;

      }, 380);

    });

  });

}


// =======================================
// GAME CLICK
// =======================================

gameCards.forEach(card => {

  card.addEventListener(
    "click",
    event => {

      event.preventDefault();


      const gameName =
        card.dataset.game ||
        "GAME";


      openPopup(
        gameName
      );

    }
  );

});


// =======================================
// CLOSE POPUP
// =======================================

function closePopup() {

  if (!popup) {

    return;

  }


  popup.classList.remove(
    "show"
  );


  popupOpening = false;

}


// =======================================
// CLOSE BUTTON
// =======================================

if (popupClose) {

  popupClose.addEventListener(
    "click",
    event => {

      event.preventDefault();

      event.stopPropagation();

      closePopup();

    }
  );

}


// =======================================
// CLICK OUTSIDE POPUP
// =======================================

if (popup) {

  popup.addEventListener(
    "click",
    event => {

      if (
        event.target === popup
      ) {

        closePopup();

      }

    }
  );

}


// =======================================
// ESC KEY
// =======================================

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      popup &&
      popup.classList.contains("show")
    ) {

      closePopup();

    }

  }
);