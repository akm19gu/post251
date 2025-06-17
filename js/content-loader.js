// content-loader.js – public フォルダから HTML を読み込む

class ContentLoader {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadContent();
    }

    async loadContent() {
        try {
            const base = "public/";

            const introContent   = await this.loadHtml(base + "introduction.html");
            this.updateSection("introduction", introContent);

            const conceptContent = await this.loadHtml(base + "concept.html");
            this.updateSection("concept", conceptContent);

            const tracksContent  = await this.loadHtml(base + "tracks.html");
            this.updateSection("tracks", tracksContent);

        } catch (error) {
            console.log("Content files not found, using default content", error);
        }
    }

    async loadHtml(filePath) {
        try {
            const response = await fetch(encodeURI(filePath));  // 日本語名を URL-encode
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.text();
        } catch (error) {
            console.error(`Could not load ${filePath}:`, error);
            return null;
        }
    }

    updateSection(sectionId, content) {
        if (!content) return;
        const section = document.getElementById(sectionId);
        if (section) {
            const placeholder = section.querySelector(".content-placeholder");
            if (placeholder) placeholder.innerHTML = content;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => new ContentLoader());
