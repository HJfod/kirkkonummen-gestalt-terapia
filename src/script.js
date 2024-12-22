// @ts-check

const cover = document.querySelector(".cover");
if (cover) {
    document.addEventListener("scroll", () => {
        cover.classList.toggle("collapsed", this.scrollY > 10);
    });
}
