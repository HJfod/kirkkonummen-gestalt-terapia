// @ts-check

const cover = document.querySelector(".cover");
if (cover) {
    document.addEventListener("scroll", () => {
        cover.classList.toggle("collapsed", this.scrollY > 50);
    });
}
const nav = document.querySelector("nav");
const navBtn = document.querySelector("nav button");
if (navBtn) {
    navBtn.addEventListener("click", () => {
        let open = nav?.classList.toggle("open");
        navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
}
