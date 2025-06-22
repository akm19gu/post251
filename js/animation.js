// animation.js (SyntaxError corrected version)

console.log("animation.js loaded and starting initialization.");

// 既に変数が二重宣言される事故を防ぐガード
if (window._mediaArtBooted) { 
    console.log("animation.js: already init");  
} else {
    window._mediaArtBooted = true;
    console.log("🟢 animation.js start");

    const container = document.getElementById("background-animation");
    console.log("Background container found:", container);
    
    if (!container) { 
        console.warn("背景用divが見つからない");  
    } else {
        console.log("✅ Background container found, initializing animation...");
        
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
                console.log("✅ Container found in constructor:", this.container);
                this.elements = [];
                this.maxElements = 50;
                this.init();
            }

            init() {
                console.log("Initializing animation with", this.maxElements, "elements");
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
                console.log("✅ Created", this.elements.length, "floating elements");
                
                // デバッグ: 最初の要素の詳細を確認
                if (this.elements.length > 0) {
                    const firstElement = this.elements[0].element;
                    console.log("🔍 First element details:", {
                        element: firstElement,
                        text: firstElement.textContent,
                        left: firstElement.style.left,
                        top: firstElement.style.top,
                        fontSize: firstElement.style.fontSize,
                        opacity: firstElement.style.opacity,
                        color: firstElement.style.color,
                        backgroundColor: firstElement.style.backgroundColor,
                        animation: firstElement.style.animation,
                        zIndex: window.getComputedStyle(firstElement).zIndex,
                        position: window.getComputedStyle(firstElement).position,
                        display: window.getComputedStyle(firstElement).display,
                        visibility: window.getComputedStyle(firstElement).visibility,
                        computedColor: window.getComputedStyle(firstElement).color,
                        computedOpacity: window.getComputedStyle(firstElement).opacity
                    });
                    
                    // 親要素のスタイルも確認
                    console.log("🔍 Container details:", {
                        zIndex: window.getComputedStyle(this.container).zIndex,
                        position: window.getComputedStyle(this.container).position,
                        display: window.getComputedStyle(this.container).display,
                        visibility: window.getComputedStyle(this.container).visibility,
                        overflow: window.getComputedStyle(this.container).overflow,
                        width: window.getComputedStyle(this.container).width,
                        height: window.getComputedStyle(this.container).height
                    });
                    
                    // 要素が実際にDOMに存在するか確認
                    console.log("🔍 Element in DOM:", this.container.contains(firstElement));
                    console.log("🔍 Number of child elements:", this.container.children.length);
                }
            }

            createElement() {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.textContent = jazzElements[Math.floor(Math.random() * jazzElements.length)];
                
                // 初期位置はビューポートサイズに基づくピクセル値にする（画面内に収める）
                const maxLeft = Math.max(0, window.innerWidth - 100);
                const maxTop = Math.max(0, window.innerHeight - 50);
                element.style.left = Math.random() * maxLeft + 'px';
                element.style.top = Math.random() * maxTop + 'px';
                
                // フォントサイズを大きくして読みやすく
                const size = Math.random() * 15 + 16; // 16-31pxの範囲
                element.style.fontSize = size + 'px';
                
                // 透明度を高くして読みやすく
                const opacity = Math.random() * 0.4 + 0.6; // 0.6-1.0の範囲
                element.style.opacity = opacity.toString();
                
                // 色をより濃くして読みやすく
                const grayValue = Math.floor(Math.random() * 60 + 40); // 40-100の範囲（より濃く）
                element.style.color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
                
                // 各要素で回転量を変えるため CSS 変数に保存
                const startRot = Math.random() * 360;
                element.style.setProperty('--r', `${startRot}deg`);
                
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                
                // より確実にアニメーションを適用
                element.style.animation = `float ${duration}s linear ${delay}s infinite`;
                element.style.animationName = 'float';
                element.style.animationDuration = `${duration}s`;
                element.style.animationTimingFunction = 'linear';
                element.style.animationDelay = `${delay}s`;
                element.style.animationIterationCount = 'infinite';
                element.style.animationDirection = 'normal';
                element.style.animationFillMode = 'both';
                
                // 確実に表示されるようにスタイルを設定
                element.style.position = 'absolute';
                element.style.pointerEvents = 'none';
                element.style.whiteSpace = 'nowrap';
                element.style.userSelect = 'none';
                element.style.zIndex = '2'; // CSSファイルの設定に合わせる
                element.style.display = 'block';
                element.style.visibility = 'visible';
                
                // 背景色を削除（読みやすさのため）
                // element.style.backgroundColor = 'rgba(255, 0, 0, 0.1)'; // 一時的に赤い背景
                
                // アニメーションが適用されているか確認
                setTimeout(() => {
                    const computedAnimation = window.getComputedStyle(element).animation;
                    console.log(`🔍 Animation for element "${element.textContent}":`, computedAnimation);
                }, 100);
                
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
            console.log("DOMContentLoaded event fired, creating MediaArtAnimation instance");
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
    }
}
