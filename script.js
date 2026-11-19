"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuButton && navigation) {
  const desktop = matchMedia("(min-width: 821px)");
  const closeMenu = () => menuButton.setAttribute("aria-expanded", "false");

  const syncMenu = () => {
    menuButton.hidden = desktop.matches;
    closeMenu();
  };

  syncMenu();
  desktop.addEventListener("change", syncMenu);
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
  });
  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || desktop.matches) return;
    closeMenu();
    const href = link.getAttribute("href");
    const section = href?.startsWith("#") && document.getElementById(href.slice(1));
    const sectionHeading = section && section.querySelector("h2");
    if (sectionHeading) {
      sectionHeading.tabIndex = -1;
      sectionHeading.focus({ preventScroll: true });
    } else {
      menuButton.focus();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });
}

const filterTools = document.querySelector(".catalogue-tools");
const filters = Array.from(document.querySelectorAll("[data-filter]"));
const settings = Array.from(document.querySelectorAll("#settings-list [data-family]"));
const resultCount = document.querySelector(".result-count");

if (filterTools && filters.length && settings.length && resultCount) {
  function filterSettings(selected) {
    const family = selected.dataset.filter;
    filters.forEach((button) => button.setAttribute("aria-pressed", String(button === selected)));

    const visible = settings.filter((entry) => {
      entry.hidden = family !== "all" && entry.dataset.family !== family;
      entry.removeAttribute("data-last-visible");
      return !entry.hidden;
    });
    visible.at(-1)?.setAttribute("data-last-visible", "");
    resultCount.textContent = `${visible.length} ${visible.length === 1 ? "setting" : "settings"}`;
  }

  filters.forEach((button) => button.addEventListener("click", () => filterSettings(button)));
  filterSettings(filters[0]);
  filterTools.hidden = false;
}

function selectText(element) {
  const selection = window.getSelection();
  if (!selection) return false;
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
}

const statusTimers = new WeakMap();

document.querySelectorAll("[data-copy]").forEach((button) => {
  const target = document.getElementById(button.dataset.copy);
  const label = button.querySelector("span");
  const status = document.getElementById(button.closest("footer") ? "footer-feedback" : "copy-feedback");
  if (!target || !label || !status) return;
  const restingLabel = label.textContent;
  let timer;
  button.hidden = false;

  button.addEventListener("click", async () => {
    clearTimeout(timer);
    clearTimeout(statusTimers.get(status));
    status.textContent = "";
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(target.textContent.trim());
      label.textContent = "Copied";
      status.textContent = "Copied to the clipboard.";
    } catch {
      const selected = selectText(target);
      label.textContent = selected ? "Selected" : restingLabel;
      status.textContent = selected ? "Text selected. Use your device’s copy command." : "Copy unavailable. Select the text and copy it manually.";
    }
    timer = setTimeout(() => { label.textContent = restingLabel; }, 3600);
    clearTimeout(statusTimers.get(status));
    statusTimers.set(status, setTimeout(() => { status.textContent = ""; }, 3600));
  });
});
