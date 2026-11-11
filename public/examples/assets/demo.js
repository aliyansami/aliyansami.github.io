// Tiny interactions for the demo pages: toggle chips and day/slot pickers, and keep the
// demo forms from sending anything.
document.querySelectorAll("[data-pick]").forEach((group) => {
  group.addEventListener("click", (e) => {
    const item = e.target.closest("button");
    if (!item || item.classList.contains("off")) return;
    group.querySelectorAll("button").forEach((b) => {
      b.classList.remove("on");
      b.setAttribute("aria-pressed", "false");
    });
    item.classList.add("on");
    item.setAttribute("aria-pressed", "true");
  });
});

document.querySelectorAll("form.form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = form.querySelector(".form-msg");
    if (msg) msg.textContent = "Demo only: this sample form doesn't send anything.";
  });
});
