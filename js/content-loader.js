// Content loader for Post 251 website
class ContentLoader {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadContent();
    }

    async loadContent() {
        try {
            // Load introduction content
            const introContent = await this.loadMarkdown('content/introduction.md');
            this.updateSection('introduction', introContent);

            // Load concept content
            const conceptContent = await this.loadMarkdown('content/concept.md');
            this.updateSection('concept', conceptContent);

            // Load tracks content
            const tracksContent = await this.loadMarkdown('content/tracks.md');
            this.updateSection('tracks', tracksContent);

        } catch (error) {
            console.log('Content files not found, using default content');
            // Fallback to default content if files are not available
        }
    }

    async loadMarkdown(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            return this.parseMarkdown(text);
        } catch (error) {
            console.log(`Could not load ${filePath}:`, error);
            return null;
        }
    }

    parseMarkdown(markdown) {
        // Simple markdown parser for basic formatting
        let html = markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            // Lists
            .replace(/^\- (.*$)/gim, '<li>$1</li>')
            // Paragraphs
            .replace(/\n\n/gim, '</p><p>')
            // Line breaks
            .replace(/\n/gim, '<br>');

        // Wrap in paragraph tags
        html = '<p>' + html + '</p>';
        
        // Fix list items
        html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
        
        // Clean up empty paragraphs
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

// Initialize content loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContentLoader();
});

