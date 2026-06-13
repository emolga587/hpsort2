import {DOMParser} from "jsr:@b-fuze/deno-dom";
import * as path from "node:path";
import * as fs from "node:fs/promises";

const hp_top_page = await (await fetch("https://helloproject.com/index.html")).text();
const group_divs = new DOMParser().parseFromString(hp_top_page, "text/html").querySelectorAll("div.commonGrid--artists a")

for (const group_url of Array.from(group_divs).map(group => group.getAttribute("href")!)) {
    const group_page = await (await fetch(`https://helloproject.com${group_url}`)).text();
    const member_divs = new DOMParser().parseFromString(group_page, "text/html").querySelectorAll("div.MemberPanel > a")
    for (const member_url of Array.from(member_divs).map(member => member.getAttribute("href")!)) {
        const member_page = await (await fetch(`https://helloproject.com${member_url}`)).text();
        const member_name = new DOMParser().parseFromString(member_page, "text/html").querySelector("div.MemberHeader__content > div > h1")!.textContent.trim();
        console.log(`helloproject.com:${member_name}`);
        const largest_img = (await Promise.all(Array.from(new DOMParser().parseFromString(member_page, "text/html")
            .querySelectorAll(`div.MemberHeader__images div[data-id="memberImages"] img`)).map(img => img.getAttribute("src")!).map(
            async (img_url) => (await (await fetch(`https://helloproject.com${img_url}`)).blob())
        ))).sort((a, b) => b.size - a.size).at(0)!;
        await fs.writeFile(path.join("public", "member_pics", `${member_name}.webp`), Buffer.from(await largest_img.arrayBuffer()));
    }
}

const hp_og_member_names: string[] = [];

const hp_og_page = await (await fetch("https://helloproject.com/og/index.html")).text();
const hp_og_member_divs = new DOMParser().parseFromString(hp_og_page, "text/html").querySelectorAll("div.MemberPanel")
for (const hp_og_member_div of Array.from(hp_og_member_divs)) {
    const hp_og_member_pic_url = hp_og_member_div.querySelector("img")!.getAttribute("src")!;
    const hp_og_member_name = hp_og_member_div.querySelector("div.MemberPanel__nameJa")!.textContent.trim();
    console.log(`helloproject.com/og:${hp_og_member_name}`);
    const hp_og_member_pic = await (await fetch(`https://helloproject.com${hp_og_member_pic_url}`)).blob();
    await fs.writeFile(path.join("public", "member_pics", `${hp_og_member_name}.webp`), Buffer.from(await hp_og_member_pic.arrayBuffer()));
    hp_og_member_names.push(hp_og_member_name);
}

const ufc_page = await (await fetch("https://www.up-front-create.com/index.html")).text();
const ufc_member_divs = new DOMParser().parseFromString(ufc_page, "text/html").querySelectorAll("div.CommonArtistList a.CommonArtistPanel")
for (const ufc_member_div of Array.from(ufc_member_divs)) {
    const ufc_member_name = ufc_member_div.querySelector("div.CommonArtistPanel__name")!.textContent.trim();
    if (!hp_og_member_names.includes(ufc_member_name)) continue;
    console.log(`up-front-create.com:${ufc_member_name}`);
    let largest_img;
    if (ufc_member_div.getAttribute("href")!.startsWith("/")) {
        const ufc_member_page = await (await fetch(`https://www.up-front-create.com${ufc_member_div.getAttribute("href")!}`)).text();
        largest_img = (await Promise.all(Array.from(new DOMParser().parseFromString(ufc_member_page, "text/html")
            .querySelectorAll(`div.MemberHeader__images div[data-id="memberImages"] img`)).map(img => img.getAttribute("src")!).map(
            async (img_url) => (await (await fetch(`https://www.up-front-create.com${img_url}`)).blob())
        ))).sort((a, b) => b.size - a.size).at(0)!;
    } else {
        const ufc_member_thumb_url = ufc_member_div.querySelector("img")!.getAttribute("src")!;
        largest_img = await (await fetch(`https://www.up-front-create.com${ufc_member_thumb_url}`)).blob();

    }
    await fs.writeFile(path.join("public", "member_pics", `${ufc_member_name}.webp`), Buffer.from(await largest_img.arrayBuffer()));
}


const jp_room_page = await (await fetch("https://www.jp-r.co.jp/index.html")).text();
const jp_room_member_divs = new DOMParser().parseFromString(jp_room_page, "text/html").querySelectorAll("section#Artist a.CommonArtistPanel");
for (const jp_room_member_url of Array.from(jp_room_member_divs).map(member => member.getAttribute("href")!)) {
    const jp_room_member_page = await (await fetch(`https://www.jp-r.co.jp${jp_room_member_url}`)).text();
    const member_name = new DOMParser().parseFromString(jp_room_member_page, "text/html").querySelector("div.MemberHeader__content > div > h1")!.textContent.trim();
    console.log(`jp-r.com:${member_name}`);
    const largest_img = (await Promise.all(Array.from(new DOMParser().parseFromString(jp_room_member_page, "text/html")
        .querySelectorAll(`div.MemberHeader__images div[data-id="memberImages"] img`)).map(img => img.getAttribute("src")!).map(
        async (img_url) => (await (await fetch(`https://www.jp-r.co.jp${img_url}`)).blob())
    ))).sort((a, b) => b.size - a.size).at(0)!;
    await fs.writeFile(path.join("public", "member_pics", `${member_name}.webp`), Buffer.from(await largest_img.arrayBuffer()));
}
