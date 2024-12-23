// @ts-check

const cover = document.querySelector(".cover");
if (cover) {
    document.addEventListener("scroll", () => {
        cover.classList.toggle("collapsed", this.scrollY > 10);
    });
}
const nav = document.querySelector("nav");
const navBtn = document.querySelector("nav button");
if (navBtn) {
    navBtn.addEventListener("click", () => {
        nav?.classList.toggle("open");
    });
}
