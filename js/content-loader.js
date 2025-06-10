// content-loader.js (Path corrected version for GitHub Pages project sites)

class ContentLoader {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadContent();
    }

    async loadContent() {
        try {
            const introContent = await this.loadMarkdown("content/introduction.md");
            this.updateSection("introduction", introContent);

            const conceptContent = await this.loadMarkdown("content/concept.md");
            this.updateSection("concept", conceptContent);

            const tracksContent = await this.loadMarkdown("content/tracks.md");
            this.updateSection("tracks", tracksContent);

        } catch (error) {
            console.error("Content files not found or could not be loaded:", error);
        }
    }

    async loadMarkdown(filePath) {
        try {
            // Get the base URL for the GitHub Pages project site
            // Example: https://akm19gu.github.io/post251test/
            const projectBaseUrl = window.location.origin + window.location.pathname;
            
            // Ensure projectBaseUrl ends with a slash for correct path concatenation
            const normalizedProjectBaseUrl = projectBaseUrl.endsWith('/' ) ? projectBaseUrl : projectBaseUrl + '/';

            // Construct the full URL
            const fullUrl = normalizedProjectBaseUrl + filePath;
            
            console.log(`Attempting to load: ${fullUrl}`); // Debugging log

            const response = await fetch(fullUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            return this.parseMarkdown(text);
        } catch (error) {
            console.error(`Could not load ${filePath}:`, error);
            return null;
        }
    }

    parseMarkdown(markdown) {
        let html = markdown
            .replace(/^### (.*$)/gim, "<h3>$1</h3>")
            .replace(/^## (.*$)/gim, "<h2>$1</h2>")
            .replace(/^# (.*$)/gim, "<h1>$1</h1>")
            .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
            .replace(/\*(.*)\*/gim, "<em>$1</em>")
            .replace(/^\- (.*$)/gim, "<li>$1</li>")
            .replace(/\n\n/gim, "</p><p>")
            .replace(/\n/gim, "<br>");

        html = "<p>" + html + "</p>";
        html = html.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");
        html = html.replace(/<p><\/p>/gim, "");
        html = html.replace(/<p><br><\/p>/gim, "");

        return html;
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
