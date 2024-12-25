// @ts-check

/** @typedef {{ title: string, nav?: string, file: string }} Page */

import { compile } from "sass";
import { minify } from "html-minifier";
import { transform } from "lightningcss";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

// If this is just root, then leave empty, otherwise prefix via / (as in /dir/path)
const BASE_URL = process.argv.length > 2 ? process.argv[2] : "/out";

/** @type {Page[]} */
const PAGES = [
    {
        title: "Kirkkonummen gestalt-terapia",
        nav: "Etusivu",
        file: "index.html",
    },
    {
        title: "Gestalt-terapeutti Juha Silvo",
        file: "minusta.html"
    },
    {
        title: "Mitä on gestalt-terapia",
        file: "terapia.html"
    },
    {
        title: "Mitä terapiassa tehdään",
        file: "mita-terapiassa-tehdaan.html"
    },
    {
        title: "Uskalla olla elossa",
        file: "kirja.html"
    },
    {
        title: "Hinnasto ja yhteystiedot",
        file: "hinnasto.html"
    }
];

/** @type {import("html-minifier").Options} */
const MINIFY_OPTIONS = {
    removeComments: true,
    collapseWhitespace: true,
};

// # Actual build code

console.log(`Starting build for ${BASE_URL}`);

// Delete & create a clean output directory (has to be made beforehand to be able to write files into it)
if (existsSync("out")) {
    rmSync("out", { recursive: true });
}
mkdirSync("out", { recursive: true });

// Transpile & minify CSS with sass
console.log(`- Processing CSS`);
writeFileSync("out/style.css", transform({
    filename: "style.css",
    code: Buffer.from(compile("src/style.scss").css),
    minify: true,
    sourceMap: false,
}).code);

// Minify JS
console.log(`- Processing JS`);
writeFileSync("out/script.js", minify(readFileSync("src/script.js").toString()));

/** @type {{ [name: string]: { sizes: number[] } }} */
const images = {};

console.log(`- Processing images`);
mkdirSync("out/images", { recursive: true });
for (const img of readdirSync("images")) {
    const name = img.replace(/\.jpg$/, "");
    images[name] = { sizes: [] };

    const process = sharp(`images/${img}`);

    // Generate smaller images for mobile devices
    let width = (await process.metadata()).width;
    if (!width) throw `Unable to get ${img} width`;
    while (width > 512) {
        process.resize(width).toFile(`out/images/${name}-${width}.webp`);
        images[name].sizes.push(width);
        width = Math.floor(width / 1.5);
    }

    // For fallback
    process.resize(width).toFile(`out/images/${name}.jpg`);
}

/**
 * @param {Page} page 
 */
function getPageRelativeURL(page) {
    return page.file === "index.html" ? "" : path.basename(page.file, ".html");
}

const template = readFileSync("src/template.html").toString();
for (const page of PAGES) {
    console.log(`- Processing ${page.file}`);
    const data = readFileSync(`src/${page.file}`).toString();
    const path = `out/${getPageRelativeURL(page)}`;

    /** @type {string[]} */
    const navItems = [];
    for (const navPage of PAGES) {
        navItems.push(`<a
            href="${BASE_URL}/${getPageRelativeURL(navPage)}"
            class="${navPage.file === page.file ? "current" : ""}"
        >${navPage.nav ?? navPage.title}</a>`);
    }

    mkdirSync(path, { recursive: true });
    writeFileSync(`${path}/index.html`, minify(template
        .replace(/INSERT_PAGE_HERE/g, data)
        .replace(/INSERT_NAV_HERE/g, navItems.join(''))
        .replace(/INSERT_BASE_URL_HERE/g, BASE_URL)
        .replace(/INSERT_IMAGE_HERE=(?<img_name>\w+)/g, (_, imgName) => {
            if (!(imgName in images)) {
                throw `Image ${imgName} not found!`;
            }
            const sizes = images[imgName].sizes;
            return `
                <picture>
                    ${sizes.map((size, i) => `
                        <source
                            type="image/webp"
                            srcset="${BASE_URL}/images/${imgName}-${size}.webp"
                            ${i === sizes.length - 1 ?
                                `media="(min-width: ${(sizes[i] + sizes[i + 1]) / 2}px)"` :
                                ""
                            }
                        >
                    `).join("")}
                    <img
                        class="${imgName}-image"
                        src="${BASE_URL}/images/${imgName}.jpg"
                    >
                </picture>
            `;
        })
        .replace(/INSERT_TITLE_HERE/g, page.title),
    MINIFY_OPTIONS));
}

console.log("Done!");
