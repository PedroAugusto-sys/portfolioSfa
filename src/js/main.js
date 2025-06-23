// Animação do botão de início e transição para o quadro de cortiça
const startBtn = document.getElementById('start-btn');
const mainBoard = document.getElementById('main-board');
const neonSign = document.getElementById('neon-sign');

startBtn.addEventListener('click', () => {
  neonSign.style.transition = 'opacity 1s';
  neonSign.style.opacity = 0;
  startBtn.style.transition = 'opacity 1s';
  startBtn.style.opacity = 0;
  setTimeout(() => {
    neonSign.style.display = 'none';
    startBtn.style.display = 'none';
    mainBoard.style.display = 'flex';
    mainBoard.style.opacity = 0;
    setTimeout(() => {
      mainBoard.style.transition = 'opacity 1.2s';
      mainBoard.style.opacity = 1;
    }, 100);
  }, 1000);
  // Iniciar som ambiente
  const bgSound = document.getElementById('bg-sound');
  if(bgSound) bgSound.play();
});

// Função para criar e mostrar ficha de caso
function mostrarFichaCaso(projeto) {
  let modal = document.getElementById('case-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'case-modal';
    modal.innerHTML = `
      <div class="case-modal-bg"></div>
      <div class="case-modal-content">
        <button class="close-modal">×</button>
        <div class="modal-img-wrap"><img class="modal-img" src="" alt=""></div>
        <h3 class="modal-title"></h3>
        <p class="modal-desc"></p>
      </div>
    `;
    document.body.appendChild(modal);
    // Fechar ao clicar no fundo ou botão
    modal.querySelector('.close-modal').onclick = fecharModal;
    modal.querySelector('.case-modal-bg').onclick = fecharModal;
  }
  // Preencher dados
  modal.querySelector('.modal-img').src = `../src/assets/images/${projeto.imagem}`;
  modal.querySelector('.modal-img').alt = projeto.titulo;
  modal.querySelector('.modal-title').textContent = projeto.titulo;
  modal.querySelector('.modal-desc').textContent = projeto.descricao;
  // Exibir com animação
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 50);
}
function fecharModal() {
  const modal = document.getElementById('case-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 400);
  }
}

// Função para criar cartaz de procurado
function criarCartaz(projeto, idx) {
  const poster = document.createElement('div');
  poster.className = 'poster';
  poster.style.animationDelay = (idx * 0.15) + 's';

  const img = document.createElement('img');
  img.className = 'poster-img';
  img.src = `../src/assets/images/projeto${idx+1}.jpg`;
  img.alt = `Imagem do projeto: ${projeto.titulo}`;
  poster.appendChild(img);

  const title = document.createElement('div');
  title.className = 'poster-title';
  title.textContent = projeto.titulo;
  poster.appendChild(title);

  const desc = document.createElement('div');
  desc.className = 'poster-desc';
  desc.textContent = projeto.descricao;
  poster.appendChild(desc);

  // Efeito de revelação ao aparecer
  poster.style.opacity = 0;
  setTimeout(() => {
    poster.style.transition = 'opacity 1s';
    poster.style.opacity = 1;
  }, 300 + idx * 200);

  // Clique abre ficha de caso
  poster.addEventListener('click', () => {
    mostrarFichaCaso(projeto);
  });

  return poster;
}

// Carregar projetos do JSON e exibir cartazes
fetch('../src/data/projects.json')
  .then(res => res.json())
  .then(projetos => {
    const board = document.getElementById('case-board');
    board.innerHTML = '';
    projetos.forEach((projeto, idx) => {
      const poster = criarCartaz(projeto, idx);
      board.appendChild(poster);
    });
  });

// Animação da névoa (movimento suave)
function animarNévoa() {
  const fog = document.getElementById('fog');
  let offset = 0;
  function moveFog() {
    offset += 0.15;
    fog.style.backgroundPositionX = offset + 'px';
    requestAnimationFrame(moveFog);
  }
  moveFog();
}
if (document.getElementById('fog')) animarNévoa();

// Animação de sombras passando ao fundo
function criarSombras() {
  const shadows = document.getElementById('shadows');
  if (!shadows) return;
  for (let i = 0; i < 3; i++) {
    const sombra = document.createElement('div');
    sombra.className = 'shadow-figure';
    sombra.style.top = (40 + i * 20) + '%';
    sombra.style.animationDelay = (i * 3) + 's';
    shadows.appendChild(sombra);
  }
}
criarSombras();

// Animação dos postes piscando
function criarPostes() {
  const alley = document.getElementById('alley-bg');
  if (!alley) return;
  for (let i = 0; i < 2; i++) {
    const poste = document.createElement('div');
    poste.className = 'lamp-post';
    poste.style.left = (20 + i * 50) + 'vw';
    alley.appendChild(poste);
    // Luz do poste
    const luz = document.createElement('div');
    luz.className = 'lamp-light';
    poste.appendChild(luz);
  }
}
criarPostes();

// Sons ambiente: chuva, passos e rádio jazz
function criarAudioAmbiente() {
  // Chuva
  let audioChuva = document.getElementById('audio-chuva');
  if (!audioChuva) {
    audioChuva = document.createElement('audio');
    audioChuva.id = 'audio-chuva';
    audioChuva.src = '../src/assets/sounds/chuva.mp3';
    audioChuva.loop = true;
    audioChuva.volume = 0.45;
    document.body.appendChild(audioChuva);
  }
  audioChuva.play();

  // Rádio jazz
  let audioJazz = document.getElementById('audio-jazz');
  if (!audioJazz) {
    audioJazz = document.createElement('audio');
    audioJazz.id = 'audio-jazz';
    audioJazz.src = '../src/assets/sounds/jazz.mp3';
    audioJazz.loop = true;
    audioJazz.volume = 0.22;
    document.body.appendChild(audioJazz);
  }
  setTimeout(() => audioJazz.play(), 2000);

  // Passos ocasionais
  let audioPassos = document.getElementById('audio-passos');
  if (!audioPassos) {
    audioPassos = document.createElement('audio');
    audioPassos.id = 'audio-passos';
    audioPassos.src = '../src/assets/sounds/passos.mp3';
    audioPassos.volume = 0.18;
    document.body.appendChild(audioPassos);
  }
  function tocarPassosAleatorio() {
    setTimeout(() => {
      audioPassos.currentTime = 0;
      audioPassos.play();
      tocarPassosAleatorio();
    }, 8000 + Math.random() * 12000);
  }
  tocarPassosAleatorio();

  // Controles de volume/mute
  let controles = document.getElementById('audio-controls');
  if (!controles) {
    controles = document.createElement('div');
    controles.id = 'audio-controls';
    controles.innerHTML = `
      <button id="mute-btn" title="Ativar/Desativar som">🔊</button>
    `;
    document.body.appendChild(controles);
    document.getElementById('mute-btn').onclick = () => {
      const muted = !audioChuva.muted;
      audioChuva.muted = muted;
      audioJazz.muted = muted;
      audioPassos.muted = muted;
      document.getElementById('mute-btn').textContent = muted ? '🔇' : '🔊';
    };
  }
}
window.addEventListener('DOMContentLoaded', criarAudioAmbiente);

// Placeholder: Animações de névoa, sombras, etc.
// (Sugestão: usar GSAP ou Three.js em arquivos separados) 