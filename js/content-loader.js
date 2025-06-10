// content-loader.js (Final path corrected version for GitHub Pages project sites with HTML conversion)

class ContentLoader {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadContent();
    }

    async loadContent() {
        try {
            const introContent = await this.loadHtml("public/introduction.html");
            this.updateSection("introduction", introContent);

            const conceptContent = await this.loadHtml("public/concept.html");
            this.updateSection("concept", conceptContent);

            const tracksContent = await this.loadHtml("public/tracks.html");
            this.updateSection("tracks", tracksContent);

        } catch (error) {
            console.error("Content files not found or could not be loaded:", error);
        }
    }

    async loadHtml(filePath) {
        try {
            const pathSegments = window.location.pathname.split("/").filter(segment => segment !== "");
            const repoName = pathSegments[0];
            const basePath = window.location.origin + "/" + repoName + "/";
            
            const fullUrl = basePath + filePath;
            
            console.log(`Attempting to load: ${fullUrl}`);

            const response = await fetch(fullUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            return text;
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
            if (placeholder) {
                placeholder.innerHTML = content;
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ContentLoader();
});
