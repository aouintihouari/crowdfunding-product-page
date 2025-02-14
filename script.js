const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");
const navigation = document.querySelector(".navigation__list");

const bookmarkBtn = document.querySelector(".bookmark__btn");
const benchmark = document.querySelector(".benchmark");
const benchmarkTxt = document.querySelector(".bookmark__text");
const circle = document.querySelector(".circle");

const totalRaisedText = document.querySelector(".total-raised");
const totalBackersText = document.querySelector(".total-backers");
const bambooLeftText = document.querySelector(".bamboo-left");
const blackLeftText = document.querySelector(".black-left");
const progress = document.querySelector(".progress");

const modal = document.getElementById("modal");
const closeModal = document.querySelector(".modal__close");

const backProjectBtn = document.querySelector(".back__project__btn");
const bambooBtn = document.querySelector(".bamboo__btn");
const blackEditionBtn = document.querySelector(".black-edition__btn");

const bambooErr = document.getElementById("bamboo-error-message");
const bambooLeftMobile = document.getElementById("bamboo-left-quantity-mobile");
const bambooLeftDesktop = document.getElementById(
  "bamboo-left-quantity-desktop"
);

const blackEditionErr = document.getElementById("black-edition-error-message");
const blackEditionLeftMobile = document.getElementById(
  "black-edition-quantity-mobile"
);
const blackEditionLeftDesktop = document.getElementById(
  "black-edition-quantity-desktop"
);

const modalPlans = document.querySelectorAll(".modal__plan");

const thankYou = document.querySelector(".thank-you");
const gotItButton = document.querySelector(".got-it");

const bambooPrice = 25;
const blackEditionPrice = 75;

let totalRaised = 59914;
let totalBackers = 5007;
let goalAmount = 100000;
let bambooStand = 101;
let blackEdition = 64;

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function updateUI() {
  totalRaisedText.textContent = formatNumber(totalRaised);
  totalBackersText.textContent = formatNumber(totalBackers);
  let percentage = (totalRaised / goalAmount) * 100;
  progress.style.width = `${Math.min(percentage, 100)}%`;
  bambooLeftText.textContent = bambooStand;
  bambooLeftMobile.textContent = bambooStand;
  bambooLeftDesktop.textContent = bambooStand;
  blackLeftText.textContent = blackEdition;
  blackEditionLeftMobile.textContent = blackEdition;
  blackEditionLeftDesktop.textContent = blackEdition;
}

function setBambooStand() {
  bambooStand--;
  updateUI();
}

function setBlackStand() {
  blackEdition--;
  updateUI();
}

function displayModelView() {
  modal.style.display = "block";
  overlay.style.display = "block";
}

function hideModalView() {
  modal.style.display = "none";
}

function displayThankYou() {
  thankYou.style.display = "flex";
  gotItButton.addEventListener("click", () => {
    overlay.style.display = "none";
    thankYou.style.display = "none";
  });
}

function updateData(radioBtn, footer, modal, input, error) {
  const value = parseInt(input.value, 10);
  if (radioBtn.id === "option-1") {
    totalRaised += value;
    totalBackers++;
    input.value = "";
    radioBtn.checked = false;
    footer.style.display = "none";
    modal.style.borderColor = "rgba(177, 177, 177, 0.5)";
    updateUI();
    hideModalView();
    displayThankYou();
  } else if (radioBtn.id == "option-2") {
    if (value >= bambooPrice) {
      totalRaised += value;
      totalBackers++;
      bambooStand--;
      input.value = "";
      error.style.display = "none";
      radioBtn.checked = false;
      footer.style.display = "none";
      modal.style.borderColor = "rgba(177, 177, 177, 0.5)";
      updateUI();
      hideModalView();
      displayThankYou();
    } else {
      error.style.display = "block";
    }
  } else {
    if (value >= blackEditionPrice) {
      totalRaised += value;
      totalBackers++;
      blackEdition--;
      input.value = "";
      error.style.display = "none";
      radioBtn.checked = false;
      footer.style.display = "none";
      modal.style.borderColor = "rgba(177, 177, 177, 0.5)";
      updateUI();
      hideModalView();
      displayThankYou();
    } else {
      error.style.display = "block";
    }
  }
}

updateUI();

menu.addEventListener("click", () => {
  if (menu.src.endsWith("images/icon-hamburger.svg")) {
    menu.src = "images/icon-close-menu.svg";
    overlay.style.display = "block";
    navigation.style.display = "flex";
  } else {
    menu.src = "images/icon-hamburger.svg";
    overlay.style.display = "none";
    navigation.style.display = "none";
  }
});

bookmarkBtn.addEventListener("click", () => {
  bookmarkBtn.classList.toggle("active");
  benchmarkTxt.classList.toggle("active");
  benchmark.classList.toggle("active");
  circle.classList.toggle("active");
  benchmarkTxt.textContent = bookmarkBtn.classList.contains("active")
    ? "Bookmarked"
    : "Bookmark";
});

backProjectBtn.addEventListener("click", displayModelView);
bambooBtn.addEventListener("click", displayModelView);
blackEditionBtn.addEventListener("click", displayModelView);
closeModal.addEventListener("click", () => {
  hideModalView();
  overlay.style.display = "none";
});

function updateModalPlanBackground() {
  modalPlans.forEach((modal, index) => {
    const radioBtn = modal.querySelector(".radio__btn");
    const input = modal.querySelector(".input");
    const footer = modal.querySelector(".modal__plan__footer");
    const error = modal.querySelector(".error-message-container");
    const confirm = modal.querySelector(".model__btn");

    if (radioBtn && footer) {
      if (radioBtn.checked) {
        modal.style.borderColor = "#3cb3ab";
        footer.style.display = "block";
        confirm.addEventListener("click", (e) => {
          e.preventDefault();
          updateData(radioBtn, footer, modal, input, error);
        });
      } else {
        modal.style.borderColor = "rgba(177, 177, 177, 0.5)";
        footer.style.display = "none";
      }
    }
  });
}

modalPlans.forEach((modal) => {
  const radioBtn = modal.querySelector(".radio__btn");
  if (radioBtn) {
    radioBtn.addEventListener("change", updateModalPlanBackground);
  }
});

document.querySelectorAll(".input").forEach((input) => {
  input.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "");
  });
});
