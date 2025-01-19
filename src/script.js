// @ts-check

const nav = document.querySelector("nav");
const navBtn = document.querySelector("nav button");
const cover = /** @type HTMLElement | null */ (document.querySelector(".cover"));
if (cover && nav) {
    document.addEventListener("scroll", () => {
        const style = getComputedStyle(cover);
        const max = parseFloat(style.getPropertyValue("--max-cover-height"));
        const min = parseFloat(style.getPropertyValue("--min-cover-height"));
        cover.style.setProperty("--scroll-anim-frame", `-${Math.max(Math.min(this.scrollY / (max - min), 1), 0)}s`);
        // cover.classList.toggle("collapsed", this.scrollY > 50);
    });
}
if (navBtn) {
    navBtn.addEventListener("click", () => {
        let open = nav?.classList.toggle("open");
        navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
}
