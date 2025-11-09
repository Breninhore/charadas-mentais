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

// ===== Contador de respostas =====
const sessionKey = 'reveals_count_v3';
function getSessionCount(){ return Number(sessionStorage.getItem(sessionKey) || 0); }
function setSessionCount(v){ sessionStorage.setItem(sessionKey, String(v)); updateCountUI(); }
function incrementSessionCount(){
  const v = getSessionCount() + 1;
  setSessionCount(v);
  return v;
}
function updateCountUI(){
  document.getElementById('countInfo').textContent = 'Respostas vistas nessa sessão: ' + getSessionCount();
}

// ===== Renderizar charadas =====
const list = document.getElementById('list');
puzzles.forEach((p, idx) => {
  const card = document.createElement('div'); card.className = 'card';
  const q = document.createElement('div'); q.className = 'question'; q.textContent = (idx+1) + '. ' + p.q;
  const btn = document.createElement('button'); btn.textContent = 'Ver resposta';
  const ans = document.createElement('div'); ans.className = 'answer'; ans.textContent = p.a;

  btn.onclick = () => {
    if(ans.style.display === 'block'){ ans.style.display = 'none'; return; }
    ans.style.display = 'block';
    const newCount = incrementSessionCount();
    if(newCount % 3 === 0){ showAd(card); }
  };

  card.appendChild(q);
  card.appendChild(btn);
  card.appendChild(ans);
  list.appendChild(card);
});
updateCountUI();

// ===== Placeholder do anúncio =====
function showAd(card){
  if(card.querySelector('.ad')) return;
  const ad = document.createElement('div'); ad.className = 'ad';
  ad.innerHTML = '<strong>Anúncio (placeholder)</strong><div style="margin-top:6px; font-size:0.9rem;">Aqui um anúncio real apareceria.</div>';
  card.appendChild(ad);
  ad.style.display = 'block';
  setTimeout(()=> { ad.style.display = 'none'; }, 6000);
}

