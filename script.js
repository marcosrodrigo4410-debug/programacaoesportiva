// ===============================
// 🇧🇷 JOGOS DO BRASIL
// ===============================

const brasil = {
  nome: "Brasil",
  bandeira: "https://flagcdn.com/w40/br.png",
};

const jogosBrasil = [
  {
    data: new Date("2026-07-05T14:00:00"),
    adversario: {
      proximo: "próximo jogo",
      nome: "Noruega",
      bandeira:
        "https://images.emojiterra.com/twitter/v12.1.5/512px/1f1f3-1f1f4.png",
    },
  },
];

// ===============================
// 🔎 PRÓXIMO JOGO
// ===============================

function pegarProximoJogo() {
  const agora = new Date();
  return jogosBrasil.find((jogo) => jogo.data > agora);
}

// ===============================
// ⏳ CONTADOR
// ===============================

function atualizarContadorBrasil() {
  const elemento = document.getElementById("contador-copa");
  if (!elemento) return;

  const jogo = pegarProximoJogo();

  if (!jogo) {
    elemento.innerHTML = "🏁 Jogos do Brasil finalizados";
    return;
  }

  const agora = new Date();
  const diferenca = jogo.data - agora;

  // Só renderiza a tag <img> se houver um link válido (diferente de "#")
  const imgAdversario =
    jogo.adversario.bandeira !== "#"
      ? `<img src="${jogo.adversario.bandeira}" style="width:22px; vertical-align:middle;">`
      : "";

  // Jogo começou
  if (diferenca <= 0) {
    elemento.innerHTML = `
      <p style="margin: 0 0 10px 0; font-weight: bold; color: #ffd700;">⚽ Em andamento:</p>
      <img src="${brasil.bandeira}" style="width:22px; vertical-align:middle;">
      ${brasil.nome}
      ⚽ x ⚽
      ${imgAdversario}
      ${jogo.adversario.nome}
    `;
    return;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
  const segundos = Math.floor((diferenca / 1000) % 60);

  // Aqui adicionamos o "Próximo jogo:" no topo do card
  elemento.innerHTML = `
    <p style="margin: 0 0 10px 0; font-size: 1.5rem; text-transform: uppercase; letter-spacing: 1px; color: #aaa;">Próximo jogo:</p>
    <img src="${brasil.bandeira}" style="width:22px; vertical-align:middle;">
    <strong>${brasil.nome}</strong> 
    x 
    ${imgAdversario}
    <strong>${jogo.adversario.nome}</strong>
    <br><br>
    ⏳ ${dias}d ${horas}h ${minutos}m ${segundos}s
  `;
}

// ===============================
// ▶ LOOP
// ===============================

setInterval(atualizarContadorBrasil, 1000);
atualizarContadorBrasil();

// ===============================
// 🖼️ TELA CHEIA (MODAL)
// ===============================

const modal = document.getElementById("modalImagem");
const modalImg = document.getElementById("imgExpandida");
const fechar = document.querySelector(".fechar");

function abrirModal(src) {
  modalImg.src = src;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// abre imagem
document.querySelectorAll(".btn-fullscreen").forEach((btn) => {
  btn.addEventListener("click", function () {
    const img = this.parentElement.querySelector("img");
    abrirModal(img.src);
  });
});

// fechar no X
fechar.onclick = () => fecharModal();

// fechar clicando fora da imagem
modal.onclick = (e) => {
  if (e.target === modal) {
    fecharModal();
  }
};

// fechar com a tecla Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    fecharModal();
  }
});

// ===============================
// 📱 MENU MOBILE
// ===============================

const botao = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const menuBackdrop = document.getElementById("menu-backdrop");

function abrirMenuMobile() {
  menu.classList.add("active");
  botao.classList.add("open");
  menuBackdrop.classList.add("active");
  botao.innerHTML = "&times;";
}

function fecharMenuMobile() {
  menu.classList.remove("active");
  botao.classList.remove("open");
  menuBackdrop.classList.remove("active");
  botao.innerHTML = "&#9776;";
}

botao.addEventListener("click", () => {
  if (menu.classList.contains("active")) {
    fecharMenuMobile();
  } else {
    abrirMenuMobile();
  }
});

// fecha ao tocar fora do menu
menuBackdrop.addEventListener("click", fecharMenuMobile);

// ===============================
// ✨ SCROLL REVEAL
// ===============================

// Se o elemento já está visível no instante em que começa a ser observado
// (comum em telas mobile, onde textos menores fazem a 1ª seção já "nascer"
// dentro da tela), o navegador pula direto pro estado final sem nunca
// pintar a opacidade 0 — a transição some. Forçar 2 frames de espera
// garante que o estado inicial seja pintado antes de revelar.
function revelar(el) {
  revealObserver.unobserve(el);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.classList.add("is-visible");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        revelar(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Pular direto para uma seção via âncora (link do menu ou URL com #hash)
// não dispara o IntersectionObserver a tempo, deixando a seção invisível.
// Revela na hora o alvo do link clicado ou do hash já presente na URL.
function revelarAlvoHash(hash) {
  if (!hash) return;
  const alvo = document.querySelector(hash);
  if (alvo && alvo.classList.contains("reveal") && !alvo.classList.contains("is-visible")) {
    revelar(alvo);
  }
}

document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    revelarAlvoHash(link.getAttribute("href"));
    fecharMenuMobile();
  });
});

revelarAlvoHash(window.location.hash);

// ===============================
// 🖼️ SKELETON / LOADING DE IMAGENS
// ===============================

document.querySelectorAll(".div-imagens img").forEach((img) => {
  if (img.complete) {
    img.classList.add("loaded");
  } else {
    img.addEventListener("load", () => img.classList.add("loaded"));
  }
});

