const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const sidebarClose = document.getElementById("sidebarClose");
const sidebarLinks = sidebar ? sidebar.querySelectorAll(".sidebar-nav a") : [];
const root = document.documentElement;
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const starsLayer = document.getElementById("starsLayer");
const cloudTopLayer = document.querySelector(".cloud-top");
const cloudBottomLayer = document.querySelector(".cloud-bottom");
let sceneTicking = false;

function openSidebar() {
  if (!menuToggle || !sidebar || !sidebarOverlay) {
    return;
  }

  sidebar.classList.add("open");
  sidebarOverlay.classList.add("active");
  document.body.classList.add("sidebar-open");
  sidebar.setAttribute("aria-hidden", "false");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeSidebar() {
  if (!menuToggle || !sidebar || !sidebarOverlay) {
    return;
  }

  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("active");
  document.body.classList.remove("sidebar-open");
  sidebar.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && sidebar && sidebarOverlay && sidebarClose) {
  menuToggle.addEventListener("click", openSidebar);
  sidebarClose.addEventListener("click", closeSidebar);
  sidebarOverlay.addEventListener("click", closeSidebar);

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function mixColor(colorA, colorB, amount) {
  const start = hexToRgb(colorA);
  const end = hexToRgb(colorB);

  const red = Math.round(lerp(start.r, end.r, amount));
  const green = Math.round(lerp(start.g, end.g, amount));
  const blue = Math.round(lerp(start.b, end.b, amount));

  return `rgb(${red}, ${green}, ${blue})`;
}

function segmentProgress(progress, start, end) {
  return clamp((progress - start) / (end - start));
}

function easeInOut(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function easeOut(value) {
  return 1 - Math.pow(1 - value, 3);
}

function createStars(count = 90) {
  if (!starsLayer) {
    return;
  }

  starsLayer.innerHTML = "";

  for (let index = 0; index < count; index += 1) {
    const star = document.createElement("div");
    star.className = "star-dot";

    const size = Math.random() < 0.82
      ? lerp(1.5, 3.8, Math.random())
      : lerp(4, 7, Math.random());

    const left = Math.random() * 100;
    const top = Math.random() * 55 + 8;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${left}%`;
    star.style.top = `${top}%`;

    starsLayer.appendChild(star);
  }
}

function updateScene() {
  if (!sun || !moon) {
    return;
  }

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? clamp(scrollTop / docHeight) : 0;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const sunBox = sun.getBoundingClientRect();
  const moonBox = moon.getBoundingClientRect();
  const sunWidth = sunBox.width || 196;
  const moonWidth = moonBox.width || 140;

  const sunX = lerp(-sunWidth * 0.65, viewportWidth - sunWidth * 0.35, progress);
  const sunArc = Math.sin(progress * Math.PI);
  const sunBaseY = viewportHeight * 0.74;
  const sunRiseHeight = viewportHeight * 0.5;
  const sunY = sunBaseY - sunArc * sunRiseHeight;
  const sunRotate = lerp(-8, 185, progress);

  root.style.setProperty("--sun-x", `${sunX}px`);
  root.style.setProperty("--sun-y", `${sunY}px`);
  root.style.setProperty("--sun-rotate", `${sunRotate}deg`);

  const moonProgress = segmentProgress(progress, 0.62, 1);
  const moonX = lerp(viewportWidth * 0.72, viewportWidth * 0.08, moonProgress);
  const moonArc = Math.sin(moonProgress * Math.PI * 0.9);
  const moonBaseY = viewportHeight * 0.82;
  const moonRiseHeight = viewportHeight * 0.33;
  const moonY = moonBaseY - moonArc * moonRiseHeight;
  const moonRotate = lerp(8, -32, moonProgress);

  root.style.setProperty("--moon-x", `${moonX}px`);
  root.style.setProperty("--moon-y", `${moonY}px`);
  root.style.setProperty("--moon-rotate", `${moonRotate}deg`);

  const daySky = {
    top: "#d8ecfa",
    mid: "#8fc5e8",
    bottom: "#5aa6d5"
  };

  const sunsetSky = {
    top: "#ffd79e",
    mid: "#f28b73",
    bottom: "#b95aa0"
  };

  const nightSky = {
    top: "#1a245c",
    mid: "#24367f",
    bottom: "#10193d"
  };

  let skyTop;
  let skyMid;
  let skyBottom;

  if (progress <= 0.55) {
    const blend = easeInOut(segmentProgress(progress, 0, 0.55));
    skyTop = mixColor(daySky.top, sunsetSky.top, blend);
    skyMid = mixColor(daySky.mid, sunsetSky.mid, blend);
    skyBottom = mixColor(daySky.bottom, sunsetSky.bottom, blend);
  } else {
    const blend = easeInOut(segmentProgress(progress, 0.55, 1));
    skyTop = mixColor(sunsetSky.top, nightSky.top, blend);
    skyMid = mixColor(sunsetSky.mid, nightSky.mid, blend);
    skyBottom = mixColor(sunsetSky.bottom, nightSky.bottom, blend);
  }

  root.style.setProperty("--sky-top", skyTop);
  root.style.setProperty("--sky-mid", skyMid);
  root.style.setProperty("--sky-bottom", skyBottom);

  const dayCloud = {
    top: "#eef3f8",
    mid: "#c3d8e9",
    bottom: "#95bad7"
  };

  const sunsetCloud = {
    top: "#ffe0c0",
    mid: "#f3ae9a",
    bottom: "#cf7a84"
  };

  const nightCloud = {
    top: "#bfc9e3",
    mid: "#7f92c8",
    bottom: "#5b6ea4"
  };

  let cloudTopColor;
  let cloudMidColor;
  let cloudBottomColor;

  if (progress <= 0.55) {
    const blend = easeInOut(segmentProgress(progress, 0, 0.55));
    cloudTopColor = mixColor(dayCloud.top, sunsetCloud.top, blend);
    cloudMidColor = mixColor(dayCloud.mid, sunsetCloud.mid, blend);
    cloudBottomColor = mixColor(dayCloud.bottom, sunsetCloud.bottom, blend);
  } else {
    const blend = easeInOut(segmentProgress(progress, 0.55, 1));
    cloudTopColor = mixColor(sunsetCloud.top, nightCloud.top, blend);
    cloudMidColor = mixColor(sunsetCloud.mid, nightCloud.mid, blend);
    cloudBottomColor = mixColor(sunsetCloud.bottom, nightCloud.bottom, blend);
  }

  root.style.setProperty("--cloud-top", cloudTopColor);
  root.style.setProperty("--cloud-mid", cloudMidColor);
  root.style.setProperty("--cloud-bottom", cloudBottomColor);

  const sunFade = 1 - easeOut(segmentProgress(progress, 0.64, 0.86));
  const moonFade = easeOut(segmentProgress(progress, 0.72, 0.92));
  const starsFade = easeInOut(segmentProgress(progress, 0.68, 0.92));

  root.style.setProperty("--sun-opacity", `${clamp(sunFade)}`);
  root.style.setProperty("--moon-opacity", `${clamp(moonFade)}`);
  root.style.setProperty("--stars-opacity", `${clamp(starsFade)}`);

  if (cloudTopLayer && cloudBottomLayer) {
    const drift = progress * 40;
    const sunset = clamp((progress - 0.4) / 0.3);
    const night = clamp((progress - 0.7) / 0.3);
    const cloudFilter = [
      "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.12))",
      `saturate(${1 + sunset * 0.4})`,
      `brightness(${1 - night * 0.4})`,
      `hue-rotate(${sunset * 10}deg)`
    ].join(" ");

    cloudTopLayer.style.transform = `translateX(${drift * 0.2}px) scaleY(1.05)`;
    cloudBottomLayer.style.transform = `translateX(${drift * 0.1}px) rotate(180deg) scaleX(1.05)`;
    cloudTopLayer.style.filter = cloudFilter;
    cloudBottomLayer.style.filter = cloudFilter;
  }
}

function requestSceneUpdate() {
  if (sceneTicking) {
    return;
  }

  window.requestAnimationFrame(() => {
    updateScene();
    sceneTicking = false;
  });
  sceneTicking = true;
}

window.addEventListener("scroll", requestSceneUpdate, { passive: true });
window.addEventListener("resize", () => {
  createStars(90);
  updateScene();
});

createStars(90);
updateScene();

const revealTargets = document.querySelectorAll([
  ".header-panel",
  ".dashboard-platform-grid > *",
  ".control-bar",
  ".meta-strip > *",
  ".board-grid > *",
  ".section-topbar",
  ".calendar-panel",
  ".key-dates-panel",
  ".strategic-angles .content-card",
  ".module",
  ".week-overview",
  ".day-card",
  ".footer-note"
].join(", "));

root.classList.add("motion-ready");

revealTargets.forEach((element, index) => {
  element.classList.add("reveal-on-scroll");
  element.style.setProperty("--reveal-delay", `${(index % 6) * 70}ms`);
});

if (!("IntersectionObserver" in window)) {
  revealTargets.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.04,
  rootMargin: "0px 0px -8% 0px"
});

revealTargets.forEach((element) => {
  revealObserver.observe(element);
});
}
