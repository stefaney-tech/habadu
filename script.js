document.addEventListener("DOMContentLoaded", () => {
  // ==================== 1. MUSIC PLAYER LOGIC ====================
  const music = document.getElementById("music");
  const vinyl = document.getElementById("vinyl");
  const tonearm = document.getElementById("tonearm");
  const musicBadge = document.getElementById("musicBadge");
  const musicHint = document.getElementById("musicHint");

  async function togglePlay() {
    if (music.paused) {
      try {
        await music.play();
        vinyl.classList.add("spinning");
        tonearm.classList.add("playing");
        musicBadge.textContent = "Playing 🎵";
        musicBadge.classList.add("playing");
        musicHint.textContent = "Tap vinyl to pause song";
      } catch (err) {
        console.error("Audio playback error:", err);
        musicBadge.textContent = "Tap again";
      }
    } else {
      music.pause();
      vinyl.classList.remove("spinning");
      tonearm.classList.remove("playing");
      musicBadge.textContent = "Paused";
      musicBadge.classList.remove("playing");
      musicHint.textContent = "Tap vinyl to play song";
    }
  }

  vinyl.addEventListener("click", togglePlay);

  music.addEventListener("ended", () => {
    vinyl.classList.remove("spinning");
    tonearm.classList.remove("playing");
    musicBadge.textContent = "Ended";
    musicBadge.classList.remove("playing");
    musicHint.textContent = "Tap vinyl to replay song";
  });

  // ==================== ENVELOPE TOGGLE LOGIC ====================
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const envelopeHint = document.getElementById("envelopeHint");

  envelopeWrapper.addEventListener("click", () => {
    envelopeWrapper.classList.toggle("open");

    if (envelopeWrapper.classList.contains("open")) {
      envelopeHint.textContent = "Tap envelope to close letter";
    } else {
      envelopeHint.textContent = "Tap the heart seal to open your letter";
    }
  });

  // ==================== 3. 22 CANDLES LOGIC ====================
  const candlesContainer = document.getElementById("candlesContainer");
  const blowButton = document.getElementById("blowButton");
  let candlesBlown = false;

  // Render 22 candles dynamically
  for (let i = 0; i < 22; i++) {
    const candle = document.createElement("div");
    candle.className = "candle";

    const flame = document.createElement("div");
    flame.className = "flame";

    candle.appendChild(flame);
    candlesContainer.appendChild(candle);
  }

  blowButton.addEventListener("click", () => {
    const flames = document.querySelectorAll(".flame");

    if (!candlesBlown) {
      // Extinguish all flames & add smoke
      flames.forEach((flame) => {
        flame.classList.add("off");

        // Spawn smoke cloud element
        const smoke = document.createElement("div");
        smoke.className = "smoke";
        flame.parentElement.appendChild(smoke);

        setTimeout(() => smoke.remove(), 1000);
      });

      blowButton.textContent = "✨ Wish Made! (Relight)";
      candlesBlown = true;

      // Trigger Confetti Explosion
      if (typeof confetti === "function") {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      // Relight candles
      flames.forEach((flame) => flame.classList.remove("off"));
      blowButton.textContent = "🕯️ Blow Out Candles";
      candlesBlown = false;
    }
  });

  // ==================== 4. AMBIENT SPARKLE CANVAS ====================
  const canvas = document.getElementById("sparkleCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = Array.from({ length: 35 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    alpha: Math.random(),
    speed: Math.random() * 0.4 + 0.1,
  }));

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.y -= p.speed;
      p.alpha += Math.sin(Date.now() * 0.002) * 0.01;

      if (p.y < 0) {
        p.y = canvas.height;
        p.x = Math.random() * canvas.width;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 79, 124, ${Math.max(0.1, Math.abs(p.alpha))})`;
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }
  animateParticles();
});
