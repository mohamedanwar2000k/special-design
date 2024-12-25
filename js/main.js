/*
  =================================
  = Check Colors In Local Storage =
  =================================
*/
let mainColor = localStorage.getItem("main_color");
const colorsLi = document.querySelectorAll(".colors-list li");
if (mainColor) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  colorsLi.forEach((color) => {
    color.classList.remove("active");
    if (color.dataset.color == mainColor) {
      color.classList.add("active");
    }
  });
}

/*
  ===================================
  = Check Randomly In Local Storage =
  ===================================
*/
let backgroundToggler = document.querySelector("#randomBackgrounds div");
let backgroundRandomly = localStorage.getItem("background_randomly");
let randomly = true;

if (backgroundRandomly) {
  if (backgroundRandomly == "true") {
    backgroundToggler.classList.add("active");
    randomly = true;
  } else {
    backgroundToggler.classList.remove("active");
    randomly = false;
  }
}

/*
  =======================================
  = Check Show Bullets In Local Storage =
  =======================================
*/
let bulletsToggler = document.querySelector("#showBullets div");
let bulletsContainer = document.getElementById("navBullets");
let showBulletsState = localStorage.getItem("show_bullets");

if (showBulletsState) {
  if (showBulletsState == "true") {
    bulletsToggler.classList.add("active");
    bulletsContainer.style.display = "block";
  } else {
    bulletsToggler.classList.remove("active");
    bulletsContainer.style.display = "none";
  }
}

/*
  =============================
  = Toggle Spin Class On Icon =
  =============================
*/
let settingsToggler = document.querySelector("#gearButton");
let settingsBox = document.querySelector("#settingsBox");

let navToggler = document.getElementById("navToggle");
let nav = document.querySelector(".nav");

settingsToggler.addEventListener("click", function (e) {
  e.stopPropagation();
  document.querySelector(".fa-gear").classList.toggle("fa-spin");
  settingsBox.classList.toggle("open");

  if (nav.classList.contains("open")) {
    navToggler.classList.toggle("open");
    nav.classList.toggle("open");
  }
});

settingsBox.addEventListener("click", (e) => {
  e.stopPropagation();
});

/*
  =================
  = Switch Colors =
  =================
*/
colorsLi.forEach((color) => {
  color.addEventListener("click", (e) => {
    colorsLi.forEach((color) => {
      color.classList.remove("active");
    });
    e.target.classList.add("active");

    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Add Color To Local Storage
    localStorage.setItem("main_color", e.target.dataset.color);
  });
});

/*
  ==============================
  = Switch Background Randomly =
  ==============================
*/
backgroundToggler.addEventListener("click", () => {
  backgroundToggler.classList.toggle("active");
  if (backgroundToggler.classList.contains("active")) {
    randomly = true;
    randomizeImgs();
  } else {
    randomly = false;
    clearInterval(rantomlyInterval);
  }
  localStorage.setItem("background_randomly", randomly);
});

/*
  ================
  = Show Bullets =
  ================
*/
bulletsToggler.addEventListener("click", () => {
  bulletsToggler.classList.toggle("active");
  if (bulletsToggler.classList.contains("active")) {
    bulletsContainer.style.display = "block";
    localStorage.setItem("show_bullets", true);
  } else {
    bulletsContainer.style.display = "none";
    localStorage.setItem("show_bullets", false);
  }
});

/*
  =================
  = Reset Options =
  =================
*/
document.getElementById("resetOptionsBtn").addEventListener("click", () => {
  localStorage.removeItem("main_color");
  localStorage.removeItem("background_randomly");
  localStorage.removeItem("show_bullets");

  window.location.reload();
});

/*
  ==============================
  = Select All Links & Bullets =
  ==============================
*/
let allLinks = document.querySelectorAll("header ul li a");
let allBullets = document.querySelectorAll("#navBullets .bullet");

function selectSections(allElements) {
  allElements.forEach((element) => {
    element.addEventListener("click", (e) => {
      document.getElementById(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

selectSections(allLinks);
selectSections(allBullets);

/*
  ========================
  = Toggle Nav In Mobile =
  ========================
*/
navToggler.addEventListener("click", (e) => {
  e.stopPropagation();
  navToggler.classList.toggle("open");
  nav.classList.toggle("open");

  if (settingsBox.classList.contains("open")) {
    document.querySelector(".fa-gear").classList.toggle("fa-spin");
    settingsBox.classList.toggle("open");
  }
});

/*
  ===============================================
  = Click Every Way To Close Settings Box & Nav =
  ===============================================
*/
document.addEventListener("click", (e) => {
  if (
    e.target != settingsToggler &&
    e.target != settingsBox &&
    e.target != navToggler
  ) {
    // For Settings Box
    if (settingsBox.classList.contains("open")) {
      document.querySelector(".fa-gear").classList.toggle("fa-spin");
      settingsBox.classList.toggle("open");
    }

    // For Nav
    if (nav.classList.contains("open")) {
      navToggler.classList.toggle("open");
      nav.classList.toggle("open");
    }
  }
});

/*
  ==============================
  = Change Background Randomly =
  ==============================
*/
let imgsArray = [
  "url('imgs/01.jpg')",
  "url('imgs/02.jpg')",
  "url('imgs/03.jpg')",
  "url('imgs/04.jpg')",
  "url('imgs/05.jpg')",
];
let rantomlyInterval;

function randomizeImgs() {
  if (randomly) {
    rantomlyInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      document.getElementById("landingPage").style.backgroundImage =
        imgsArray[randomNumber];
    }, 10000);
  }
}

randomizeImgs();

/*
  ==========================
  = Select Skills Selector =
  ==========================
*/
let ourSkills = document.getElementById("ourSkills");

let progressAnimate = () => {
  // let skillsOffsetTop = ourSkills.offsetTop;
  // let skillsOuterHeight = ourSkills.offsetHeight;
  // let windowHeight = this.innerHeight;
  // let windowScrollTop = this.scrollY;

  // if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
  //   let allSkills = document.querySelectorAll(".progress-box span");

  //   allSkills.forEach((skill) => {
  //     skill.style.width = skill.dataset.progress;
  //   });
  // }

  const isElementOnScreen =
    ourSkills.getBoundingClientRect().top + ourSkills.offsetHeight * 0.3 <
    window.innerHeight;

  let allSkills = document.querySelectorAll(".progress-box span");

  if (isElementOnScreen) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    allSkills.forEach((skill) => {
      skill.style.width = "0";
    });
  }
};

window.addEventListener("load", progressAnimate);
window.addEventListener("scroll", progressAnimate);

/*
  ===============================
  = Create Popup With The Image =
  ===============================
*/
let ourGallery = document.querySelectorAll("#gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", () => {
    // Create Overlay
    let overLay = document.createElement("div");
    overLay.className = "popup-overlay";
    document.body.append(overLay);

    // Create Popup
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupTitle = document.createElement("h3");
    if (img.alt != null) {
      popupTitle.textContent = img.alt;
      popupBox.append(popupTitle);
    }
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.append(popupImg);
    let closeButton = document.createElement("span");
    closeButton.textContent = "X";
    popupBox.append(closeButton);
    overLay.append(popupBox);

    // Close Popup
    closeButton.addEventListener("click", () => {
      overLay.remove();
    });
  });
});

/*
  ====================
  = AOS Library Init =
  ====================
*/
AOS.init();
