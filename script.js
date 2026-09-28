// ==========================================
// SNOOPY & HTS INTERACTIVE WEB LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- AUDIO CONTEXT SETUP (Web Audio API Fallback & Sound Effects) ---
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx;
    let soundEnabled = true;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new AudioContext();
        }
    }

    // Sound effect generator for pops/chimes
    function playSound(type) {
        if (!soundEnabled) return;
        initAudio();
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        if (type === 'pop') {
            // Cute pop sound
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.1);
        } else if (type === 'chime') {
            // Happy chime for gift/slider
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(1200, audioCtx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.5);
        }
    }

    // Toggle sound
    const soundToggle = document.getElementById('soundToggle');
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
            soundToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            soundToggle.classList.add('active');
            playSound('pop');
        } else {
            soundToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            soundToggle.classList.remove('active');
        }
    });


    // --- TYPEWRITER EFFECT ---
    const textStr = "Aku bikin sesuatu yang khusus buat kamu hari ini... Coba lihat deh! ✨";
    const typewriterEl = document.getElementById('typewriter');
    let i = 0;

    function typeWriter() {
        if (i < textStr.length) {
            typewriterEl.innerHTML += textStr.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Speed
        }
    }
    // Start after small delay
    setTimeout(typeWriter, 1000);


    // --- EVASIVE "NO" BUTTON LOGIC ---
    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    const heroSection = document.getElementById('hero');
    const mainContent = document.getElementById('mainContent');

    btnNo.addEventListener('mouseover', moveButton);
    btnNo.addEventListener('touchstart', moveButton, {passive: true});

    function moveButton() {
        // Get random coordinates within reasonable range
        const maxMoveX = 150;
        const maxMoveY = 100;
        
        const randomX = (Math.random() - 0.5) * maxMoveX * 2;
        const randomY = (Math.random() - 0.5) * maxMoveY * 2;
        
        btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
        playSound('pop');
    }

    // --- YES BUTTON UNLOCKS CONTENT ---
    btnYes.addEventListener('click', () => {
        playSound('chime');
        initAudio(); // Initialize audio context on user gesture
        
        // Confetti burst
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#E63946', '#F4A261', '#ffffff']
        });

        // Hide hero question box, reveal main content
        document.querySelector('.question-box').style.display = 'none';
        btnYes.style.display = 'none';
        btnNo.style.display = 'none';
        
        // Change hero text
        typewriterEl.innerHTML = "Yeay! Selamat datang di tempat spesial kita! 🐾💖";
        
        mainContent.classList.remove('hidden');
        
        // Start background music (attempt)
        const bgAudio = document.getElementById('bgAudio');
        bgAudio.volume = 0.3;
        bgAudio.play().catch(e => console.log("Auto-play prevented by browser. User needs to click play."));
        if(!bgAudio.paused) {
            toggleMusicUI(true);
        }
    });


    // --- AUDIO PLAYER CONTROLS ---
    const bgMusicToggle = document.getElementById('bgMusicToggle');
    const playAudioBtn = document.getElementById('playAudioBtn');
    const playIcon = document.getElementById('playIcon');
    const bgAudio = document.getElementById('bgAudio');
    const vinylDisc = document.getElementById('vinylDisc');
    const equalizer = document.getElementById('equalizer');

    let isPlaying = false;

    function toggleMusicUI(playing) {
        isPlaying = playing;
        if (playing) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            vinylDisc.classList.add('playing');
            equalizer.classList.add('active');
            bgMusicToggle.classList.add('active');
        } else {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            vinylDisc.classList.remove('playing');
            equalizer.classList.remove('active');
            bgMusicToggle.classList.remove('active');
        }
    }

    function toggleMusic() {
        initAudio();
        if (isPlaying) {
            bgAudio.pause();
            toggleMusicUI(false);
        } else {
            bgAudio.play().then(() => {
                toggleMusicUI(true);
            }).catch(e => {
                console.log("Play failed", e);
                // Fallback: If no audio source works, we just pretend it plays and use synth tones if we wanted to
                toggleMusicUI(true); 
            });
        }
    }

    playAudioBtn.addEventListener('click', toggleMusic);
    bgMusicToggle.addEventListener('click', toggleMusic);


    // --- SENENG METER LOGIC ---
    const senengSlider = document.getElementById('senengSlider');
    const meterPercent = document.getElementById('meterPercent');
    const meterEmoji = document.getElementById('meterEmoji');
    const meterResponse = document.getElementById('meterResponse');

    senengSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        let displayVal = (val / 1000).toFixed(0); 
        if(val >= 1000000) displayVal = "1 JUTA"; // Special case
        else if (val < 1000) displayVal = val;
        else displayVal = displayVal + "k";
        
        meterPercent.innerText = displayVal;

        // Change response based on value
        if (val < 200000) {
            meterEmoji.innerText = "🙂";
            meterResponse.innerText = "\"Wah, lumayan ya... Semoga abis lihat web ini senengnya makin nambah! 🐾\"";
        } else if (val < 500000) {
            meterEmoji.innerText = "😊";
            meterResponse.innerText = "\"Asik! Aku juga seneng banget bisa ngobrol-ngobrol sama kamu. ✨\"";
        } else if (val < 800000) {
            meterEmoji.innerText = "🥰";
            meterResponse.innerText = "\"Aww manis banget! Aku juga ngerasa nyaman deket kamu akhir-akhir ini. 💖\"";
        } else {
            meterEmoji.innerText = "😍🔥";
            meterResponse.innerText = "\"WAAAH 1.000.000%! 🚀 Pokoknya aku bahagia banget kita bisa deket!\"";
            // Random pop sound if they slide to max occasionally
            if(Math.random() > 0.8) playSound('pop');
        }
    });


    // --- GIFT BOX LOGIC ---
    const giftBox = document.getElementById('giftBox');
    const couponsGrid = document.getElementById('couponsGrid');

    giftBox.addEventListener('click', () => {
        if (giftBox.classList.contains('opened')) return; // Already opened

        playSound('chime');
        giftBox.classList.add('opened');
        
        // Blast confetti from center
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.8 }
        });

        // Show coupons
        setTimeout(() => {
            couponsGrid.classList.remove('hidden');
            // Scroll to coupons smoothly
            couponsGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 500);
    });

    // Global function for claim button (called from HTML onclick)
    window.claimCoupon = function(couponName) {
        playSound('pop');
        alert(`Yeay! Kamu berhasil mengklaim: ${couponName}! 🎉\n\nScreenshot ini dan kirim ke aku buat dituker ya! 🙈`);
        // Visual feedback
        event.target.innerText = "Sudah Diklaim! ✔️";
        event.target.classList.add('claimed');
    };


    // --- ENVELOPE MODAL LOGIC ---
    const envelopeBtn = document.getElementById('envelopeBtn');
    const letterModal = document.getElementById('letterModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const btnModalClose = document.getElementById('btnModalClose');

    envelopeBtn.addEventListener('click', () => {
        playSound('chime');
        letterModal.classList.remove('hidden');
        confetti({
            particleCount: 50,
            spread: 60,
            colors: ['#E63946', '#ffffff']
        });
    });

    function closeModal() {
        playSound('pop');
        letterModal.classList.add('hidden');
    }

    closeModalBtn.addEventListener('click', closeModal);
    btnModalClose.addEventListener('click', closeModal);

    // Close modal if clicked outside card
    letterModal.addEventListener('click', (e) => {
        if (e.target === letterModal) {
            closeModal();
        }
    });


    // --- BACKGROUND CANVAS (FLOATING HEARTS) ---
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particles Array
    const particles = [];
    const particleCount = 40; // Adjust for density

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 1 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            
            // 50% heart, 50% star/circle
            this.type = Math.random() > 0.5 ? 'heart' : 'circle';
            this.color = Math.random() > 0.5 ? '#E63946' : '#FFD166'; // Red or Yellow
        }
        
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            
            // Reset to bottom if goes off screen
            if (this.y < -20) {
                this.y = canvas.height + 20;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            
            if (this.type === 'circle') {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size/2, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.type === 'heart') {
                // Draw heart shape
                const topCurveHeight = this.size * 0.3;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y + topCurveHeight);
                // top left curve
                ctx.bezierCurveTo(
                    this.x, this.y, 
                    this.x - this.size / 2, this.y, 
                    this.x - this.size / 2, this.y + topCurveHeight
                );
                // bottom left
                ctx.bezierCurveTo(
                    this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
                    this.x, this.y + (this.size + topCurveHeight) / 2, 
                    this.x, this.y + this.size
                );
                // bottom right
                ctx.bezierCurveTo(
                    this.x, this.y + (this.size + topCurveHeight) / 2, 
                    this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
                    this.x + this.size / 2, this.y + topCurveHeight
                );
                // top right curve
                ctx.bezierCurveTo(
                    this.x + this.size / 2, this.y, 
                    this.x, this.y, 
                    this.x, this.y + topCurveHeight
                );
                ctx.closePath();
                ctx.fill();
            }
            ctx.globalAlpha = 1; // reset
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

});
