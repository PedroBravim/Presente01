document.addEventListener("DOMContentLoaded", () => {

    /* ================= SLIDER ================= */
    let slideAtual = 0;
    const slides = document.querySelectorAll(".slide");

    if (slides.length > 0) {
        slides[slideAtual].classList.add("ativo");

        setInterval(() => {
            slides[slideAtual].classList.remove("ativo");
            slideAtual = (slideAtual + 1) % slides.length;
            slides[slideAtual].classList.add("ativo");
        }, 4000);
    }

    /* ================= CORAÇÕES ================= */
    const coracoes = document.querySelectorAll(".coracoes span");
    coracoes.forEach((c, i) => {
        c.style.left = `${Math.random() * 100}%`;
        c.style.animationDelay = `${i * 1}s`;
    });

    /* ================= FOGOS ================= */
    const canvas = document.getElementById("fogosCanvas");
    if (!canvas) return; // só roda na página 2

    const ctx = canvas.getContext("2d");
    let particulas = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    class Particula {
        constructor(x, y, cor) {
            this.x = x;
            this.y = y;
            this.cor = cor;
            this.raio = Math.random() * 2 + 1;
            this.velX = (Math.random() - 0.5) * 6;
            this.velY = (Math.random() - 0.5) * 6;
            this.vida = 100;
        }

        atualizar() {
            this.x += this.velX;
            this.y += this.velY;
            this.velY += 0.03;
            this.vida--;
        }

        desenhar() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
            ctx.fillStyle = this.cor;
            ctx.fill();
        }
    }

    function explodir(x, y) {
        const cores = ["#ff4d6d", "#ffd166", "#ffffff", "#ff9f1c", "#f72585"];
        for (let i = 0; i < 80; i++) {
            particulas.push(new Particula(
                x,
                y,
                cores[Math.floor(Math.random() * cores.length)]
            ));
        }
    }

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particulas.forEach((p, i) => {
            p.atualizar();
            p.desenhar();
            if (p.vida <= 0) particulas.splice(i, 1);
        });

        requestAnimationFrame(animar);
    }
    animar();

    /* fogos automáticos */
    setInterval(() => {
        const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
        const y = Math.random() * canvas.height * 0.5 + 50;
        explodir(x, y);
    }, 1200);

});

/* ================= FULLSCREEN IMAGENS ================= */

const modal = document.getElementById("modalImagem");
const imagemModal = document.getElementById("imagemModal");
const fechar = document.querySelector(".modal-imagem .fechar");

document.querySelectorAll(".timeline .evento img").forEach(img => {
    img.addEventListener("click", () => {
        imagemModal.src = img.src;
        modal.classList.add("ativo");
    });
});

fechar.addEventListener("click", () => {
    modal.classList.remove("ativo");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("ativo");
    }
});


/* ================= CONTADOR DE TEMPO JUNTOS ================= */

const inicioRelacionamento = new Date("2024-07-07T00:00:00"); 

function atualizarContador() {
    const agora = new Date();
    let diff = agora - inicioRelacionamento;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= (1000 * 60 * 60 * 24);

    const horas = Math.floor(diff / (1000 * 60 * 60));
    diff %= (1000 * 60 * 60);

    const minutos = Math.floor(diff / (1000 * 60));
    const segundos = Math.floor((diff / 1000) % 60);

    const contador = document.getElementById("tempoJuntos");
    if (contador) {
        contador.innerHTML = `
            <strong>${dias}</strong> dias,
            <strong>${horas}</strong> horas,
            <strong>${minutos}</strong> minutos e
            <strong>${segundos}</strong> segundos 
        `;
    }
}

setInterval(atualizarContador, 1000);
atualizarContador();
