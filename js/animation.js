// animation.js (SyntaxError corrected version)

console.log("animation.js loaded and starting initialization.");

// 既に変数が二重宣言される事故を防ぐガード
if (window._mediaArtBooted) { console.log("animation.js: already init");  return; }
window._mediaArtBooted = true;
console.log("🟢 animation.js start");

const container = document.getElementById("background-animation");
if (!container) { console.warn("背景用divが見つからない");  return; }

// Jazz theory and phrases for animation (Simplified to avoid syntax errors)
const jazzElements = [
    // コード進行
    "ii-V-I", "I-vi-ii-V", "iii-vi-ii-V-I", "I-VI-ii-V",
    "Cmaj7", "Am7", "Dm7", "G7", "Em7", "A7", "Fmaj7", "Bb7",
    "C7", "F7", "Bb7", "Eb7", "Ab7", "Db7", "Gb7", "B7",
    
    // スケール
    "Dorian", "Mixolydian", "Bebop", "Blues Scale", "Pentatonic",
    "Chromatic", "Whole Tone", "Diminished", "Altered", "Lydian",
    
    // ジャズ用語
    "Swing", "Bebop", "Cool Jazz", "Hard Bop", "Free Jazz",
    "Modal", "Fusion", "Latin Jazz", "Avant-garde", "Post-bop",

    // 楽器名
    "Sax", "Trumpet", "Piano", "Bass", "Drums", "Guitar", "Vibes",
    
    // リズム記号
    "4/4", "3/4", "5/4", "7/8", "6/8", "9/8", "12/8",
    
    // 度数表記
    "I", "ii", "iii", "IV", "V", "vi", "vii", "bII", "bIII", "bVI", "bVII"
];

class MediaArtAnimation {
    constructor() {
        console.log("MediaArtAnimation constructor called.");
        this.container = document.getElementById('background-animation');
        if (!this.container) {
            console.error("Background animation container not found!");
            return;
        }
        this.elements = [];
        this.maxElements = 50;
        this.init();
    }

    init() {
        this.createElements();
        this.animate();
        
        window.addEventListener('resize', () => {
            this.updateElementPositions();
        });
    }

    createElements() {
        for (let i = 0; i < this.maxElements; i++) {
            this.createElement();
        }
    }

    createElement() {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = jazzElements[Math.floor(Math.random() * jazzElements.length)];
        
        // 初期位置はビューポートサイズに基づくピクセル値にする
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = Math.random() * window.innerHeight + 'px';
        
        const size = Math.random() * 20 + 10;
        element.style.fontSize = size + 'px';
        
        element.style.opacity = Math.random() * 0.3 + 0.1;
        
        const grayValue = Math.floor(Math.random() * 100 + 100);
        element.style.color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
        
        // 各要素で回転量を変えるため CSS 変数に保存
        const startRot = Math.random() * 360;
        element.style.setProperty('--r', `${startRot}deg`);
        
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        element.style.animation = `float ${duration}s linear ${delay}s infinite`;
        
        this.container.appendChild(element);
        this.elements.push({
            element: element,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            rotationSpeed: (Math.random() - 0.5) * 2
        });
    }

    animate() {
        this.elements.forEach((item, index) => {
            const element = item.element;

            // 位置の更新
            let left = parseFloat(element.style.left);
            let top = parseFloat(element.style.top);
            left += item.speedX;
            top += item.speedY;

            // 画面外に出たら反対側へ移動
            if (left > window.innerWidth) {
                left = -100;
            } else if (left < -100) {
                left = window.innerWidth;
            }

            if (top > window.innerHeight) {
                top = -100;
            } else if (top < -100) {
                top = window.innerHeight;
            }

            element.style.left = `${left}px`;
            element.style.top = `${top}px`;

            // 回転量更新
            const currentRot = parseFloat(element.style.getPropertyValue('--r')) || 0;
            const nextRot = currentRot + item.rotationSpeed;
            element.style.setProperty('--r', `${nextRot}deg`);

            // まれに表示テキストを変更
            if (Math.random() < 0.001) {
                element.textContent = jazzElements[Math.floor(Math.random() * jazzElements.length)];
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }

    updateElementPositions() {
        this.elements.forEach(item => {
            const element = item.element;
            const rect = element.getBoundingClientRect();

            if (rect.left > window.innerWidth || rect.top > window.innerHeight) {
                element.style.left = Math.random() * window.innerWidth + 'px';
                element.style.top = Math.random() * window.innerHeight + 'px';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MediaArtAnimation();
});

document.addEventListener('visibilitychange', () => {
    const elements = document.querySelectorAll('.floating-element');
    if (document.hidden) {
        elements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        elements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});
