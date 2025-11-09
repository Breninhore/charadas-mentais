// ===== Dados das charadas =====
const puzzles = [
  { q: "O que tem quatro rodas e voa?", a: "Um caminhão de lixo em sonho (piada clássica)." },
  { q: "O que é que quanto mais se tira, maior fica?", a: "Buraco." },
  { q: "O que é que tem dentes mas não morde?", a: "Pente." },
  { q: "O que corre ao redor da casa mas nunca se move?", a: "A cerca." },
  { q: "Qual palavra fica errada no dicionário?", a: "Errada." },
  { q: "O que cai em pé e corre deitado?", a: "Chuva." },
  { q: "Qual é o livro que se lê pelas pontas?", a: "Livro de contos (contos = pontas)." },
  { q: "O que é que tem cabeça e não tem corpo?", a: "Alfinete." },
  { q: "O que é que tem um pescoço mas não tem cabeça?", a: "Garrafa." },
  { q: "O que é que passa na frente do sol e ainda deixa sombra?", a: "Nuvem." }
];

// ===== LocalStorage para progresso =====
const storageKey = 'charadasProgress_v1';
let progress = JSON.parse(localStorage.getItem(storageKey)) || { count:0, shownIndices: [] };

function saveProgress() { localStorage.setItem(storageKey, JSON.stringify(progress)); }

// ===== Atualiza contador =====
function updateCountUI(){
  document.getElementById('countInfo').textContent = 'Respostas vistas: ' + progress.count;
}

// ===== Escolhe charada aleatória não repetida =====
function getRandomIndex(){
  if(progress.shownIndices.length >= puzzles.length) progress.shownIndices = [];
  let idx;
  do { idx = Math.floor(Math.random() * puzzles.length); } 
  while(progress.shownIndices.includes(idx));
  progress.shownIndices.push(idx);
  saveProgress();
  return idx;
}

// ===== Renderiza card =====
const list = document.getElementById('list');
const nextBtn = document.getElementById('nextPuzzleBtn');

function showPuzzle(idx){
  const oldCard = list.querySelector('.card');
  if(oldCard){
    oldCard.style.opacity = 0;
    setTimeout(()=> { list.innerHTML=''; createCard(idx); }, 300);
  } else { createCard(idx); }
}

function createCard(idx){
  const p = puzzles[idx];
  const card = document.createElement('div'); card.className='card';
  card.style.opacity = 0;

  const q = document.createElement('div'); q.className='question'; q.textContent=(idx+1)+'. '+p.q;
  const btn = document.createElement('button'); btn.textContent='Ver resposta';
  const ans = document.createElement('div'); ans.className='answer'; ans.textContent=p.a;

  btn.onclick = () => {
    if(ans.classList.contains('show')) return;

    progress.count += 1;
    saveProgress();
    updateCountUI();

    // Se múltiplo de 3 → delay 5s + anúncio
    if(progress.count % 3 === 0){
      btn.disabled=true;
      btn.textContent='Aguarde 5 segundos...';
      setTimeout(()=>{
        ans.style.display='block';
        setTimeout(()=>ans.classList.add('show'),10);
        showAd(card);
        btn.disabled=false;
        btn.textContent='Ver resposta';
      },5000);
    } else {
      ans.style.display='block';
      setTimeout(()=>ans.classList.add('show'),10);
    }
  };

  card.appendChild(q);
  card.appendChild(btn);
  card.appendChild(ans);
  list.appendChild(card);

  setTimeout(()=>{ card.style.opacity=1; },10);
}

// ===== Placeholder do anúncio =====
function showAd(card){
  if(card.querySelector('.ad')) return;
  const ad=document.createElement('div'); ad.className='ad';
  ad.innerHTML='<strong>Anúncio (placeholder)</strong><div style="margin-top:6px; font-size:0.9rem;">Aqui um anúncio real apareceria.</div>';
  card.appendChild(ad);
  ad.style.display='block';
  setTimeout(()=>{ ad.style.display='none'; },6000);
}

// ===== Inicialização =====
let currentIndex = getRandomIndex();
showPuzzle(currentIndex);

nextBtn.onclick = () => {
  currentIndex = getRandomIndex();
  showPuzzle(currentIndex);
};

updateCountUI();
