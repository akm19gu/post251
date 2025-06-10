// content-loader.js (Path corrected version)

class ContentLoader {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadContent();
    }

    async loadContent() {
        try {
            const introContent = await this.loadMarkdown('content/introduction.md');
            this.updateSection('introduction', introContent);

            const conceptContent = await this.loadMarkdown('content/concept.md');
            this.updateSection('concept', conceptContent);

            const tracksContent = await this.loadMarkdown('content/tracks.md');
            this.updateSection('tracks', tracksContent);

        } catch (error) {
            console.log('Content files not found, using default content');
        }
    }

    async loadMarkdown(filePath) {
        try {
            // For GitHub Pages project sites, the path is relative to the root of the project.
            const response = await fetch(filePath);
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
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/^\- (.*$)/gim, '<li>$1</li>')
            .replace(/\n\n/gim, '</p><p>')
            .replace(/\n/gim, '<br>');

        html = '<p>' + html + '</p>';
        html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
        html = html.replace(/<p><\/p>/gim, '');
        html = html.replace(/<p><br><\/p>/gim, '');

        return html;
    }

    updateSection(sectionId, content) {
        if (!content) return;

        const section = document.getElementById(sectionId);
        if (section) {
            const placeholder = section.querySelector('.content-placeholder');
            if (placeholder) {
                placeholder.innerHTML = content;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ContentLoader();
});
