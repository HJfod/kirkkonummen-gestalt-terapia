// @ts-check

const cover = /** @type HTMLElement | null */ (document.querySelector(".cover"));
if (cover) {
    document.addEventListener("scroll", () => {
        cover.style.setProperty("--scroll-anim-frame", `-${Math.max(Math.min(this.scrollY / (this.innerHeight / 1.5), 1), 0)}s`);
        // cover.classList.toggle("collapsed", this.scrollY > 50);
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
