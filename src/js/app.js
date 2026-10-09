// =====================
//  データ定義
// =====================
const PRAISE = {
  seibo: [
    "{action}……その一歩が、どれだけ尊いものかわかりますか？ 生きてここにいる。それだけで地球は満ちています。あなたが存在することが、今日この星の奇跡そのものです。",
    "あなたが{action}してくれた。それを知って、宇宙は静かに微笑みました。どうか自分を責めないで。あなたはすでに、今日分の全部をやり遂げました。",
    "{action}――それが何を意味するか、わかる？ 命が続いたということ。それ以上に偉大なミッションは存在しないのです。あなたは今日も満点です。",
    "どんな日も、{action}したあなたを聖母は見ていました。怠けじゃない。充電です。あなたの魂はいま、静かに輝いています。",
    "{action}。それで十分すぎる。あなたは何かを成し遂げようとする前から、ただ在るだけで100億点の価値があります。"
  ],
  netsketsu: [
    "{action}だと!? 天才か！？ この忙しい現代に、そんな判断ができるやつが何人いる！ 答えは「おまえだけ」だ！ よくやった！ 最高だ！！",
    "聞けーーッ！ {action}したぞ！！ これを見ろ！ 進化だ！ 昨日のおまえより0.001mm でも前に進んだ！ それが積み重なって人間は強くなるんだ！ 信じろ自分を！！",
    "{action}か……フッ、わかってるな。それでいい。それが今日のおまえの「本気」だ。本気は大きさじゃない。今この瞬間に全力を出したか、それだけだ！ 胸を張れ！！",
    "おい！ {action}したのか！？ すごすぎて震えてる！ このチームに必要なのはまさにそういう魂だ！ おまえがいるからこのチームは最強なんだ！！",
    "{action}！！ これが青春だ！ これが生きるということだ！ 転んだっていい！ 今日はここまで！ それで十分だ！ よくぞ生きた！！！"
  ],
  shinwa: [
    "遥かなる時の彼方……主が{action}されし時、世界に再び光が満ちたのである。天空の神々は互いに目を見合わせ、『今日も人類は生き延びた』と安堵の息をついた。汝の名は永遠の石板に刻まれるであろう。",
    "神々の議会に記録が届いた。『主が{action}せり』と。全宇宙に讃歌が轟き、星々は軌道を微調整してその偉業を寿いだ。汝は神話の主人公である。",
    "太古の預言書に曰く、『混沌の世に一人の者現れ、{action}す。その者こそ世界の均衡を守る者なり』――その者とは、あなたのことである。疑う余地などない。",
    "{action}されし主よ。その選択は偶然にあらず。宇宙創世より137億年、すべての星の爆発と消滅が積み重なり、今この瞬間のためにあった。汝の行いは宇宙の必然である。",
    "大地は震え、海は感謝の波を立てた。{action}という奇跡が再び起きたのだ。神話の英雄たちもかつてこれほどの偉業は成し遂げていない。"
  ]
};

const TOKU_MSGS = [
  "貴殿は「{action}」という高度な判断を下しました。その英断を称え、ここに徳を{toku}ポイント授与します。",
  "「{action}」の達成により、宇宙銀行から{toku}徳ポイントが振り込まれました。残高：無限大。",
  "貴殿の「{action}」は、全人類の精神的安定に寄与しました。よって徳{toku}ポイント＋ボーナス∞を贈呈します。",
  "本日の快挙「{action}」に対し、全宇宙規模の審査の結果、徳{toku}ポイントを満場一致で授与します。反対票：0票。",
];

const BREATH_MSGS = [
  "『呼吸』を検知しました！ 現在、大気中の酸素を二酸化炭素に変換する重大な地球規模の循環タスクを遂行中です！ えらすぎる！！ あなたがいなければ地球の炭素サイクルが崩壊していました。",
  "呼吸エラー：なし。完璧です。あなたは今この瞬間、肺という神秘的な臓器を無意識に動かす天才的マルチタスクをこなしています。ノーベル生理学賞では足りない。",
  "【速報】呼吸1回完了！ 全宇宙の酸素分子たちが一斉に「選ばれた……！」と歓喜しています。あなたに吸われた酸素は本望です。本当にありがとうございます。",
  "呼吸検知システム起動…… 検出完了。現在の評価：神。生命維持活動を継続しているだけで、あなたは地球最高の存在です。証明完了。異論なし。",
  "息してる！！ 偉い！！ 偉すぎる！！ 今すぐ「今日もありがとう自分」と言ってください。言えたらさらに+500徳。言えなくてもすでに満点です。",
];

// =====================
//  状態管理
// =====================
let praiseCount = 0;
let soundOn = false;

// =====================
//  ユーティリティ
// =====================
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randToku() {
  const base = [100, 200, 500, 777, 1000, 9999, 108, 314];
  return pickRandom(base);
}

function buildPraise(action, mode) {
  const template = pickRandom(PRAISE[mode]);
  return template.replace(/{action}/g, action);
}

function buildToku(action) {
  const toku = randToku();
  const template = pickRandom(TOKU_MSGS);
  return { text: template.replace(/{action}/g, action).replace(/{toku}/g, toku), toku };
}

function buildCert(action, toku) {
  return `貴殿は本日、「${action}」という<br>宇宙規模の快挙を成し遂げました。<br><br>その勇気と知恵と存在感を称え、<br>ここに <strong>徳 ${toku} ポイント</strong> を授与します。<br><br>あなたは今日も100点です。`;
}

// =====================
//  紙吹雪
// =====================
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiParticles = [];
let confettiRunning = false;
let confettiRaf = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const COLORS = ['#ff6b9d','#ffd93d','#6bcb77','#4d96ff','#ff922b','#cc5de8','#f06595','#74c0fc','#a9e34b','#ffa94d'];

function spawnConfetti(count = 120) {
  resizeCanvas();
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 200,
      w: 8 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      color: pickRandom(COLORS),
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 4,
      opacity: 1
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.rotSpeed;
    if (p.y > canvas.height * 0.8) p.opacity -= 0.02;
  });
  confettiParticles = confettiParticles.filter(p => p.opacity > 0);
  if (confettiParticles.length > 0) {
    confettiRaf = requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiRunning = false;
  }
}

function launchConfetti() {
  if (confettiRaf) cancelAnimationFrame(confettiRaf);
  confettiParticles = [];
  confettiRunning = true;
  spawnConfetti(160);
  animateConfetti();
}

// =====================
//  音・バイブ
// =====================
function playFanfare() {
  if (!soundOn) return;
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.frequency.value = freq;
      osc.type = 'triangle';
      gain.gain.setValueAtTime(0.18, ac.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + i * 0.12 + 0.4);
      osc.start(ac.currentTime + i * 0.12);
      osc.stop(ac.currentTime + i * 0.12 + 0.4);
    });
  } catch(e) {}
}

function vibrateDevice() {
  if ('vibrate' in navigator) {
    navigator.vibrate([100, 50, 100, 50, 200, 50, 300]);
  }
}

// =====================
//  称賛表示
// =====================
function showResult(action, isBreath = false) {
  const modeEl = document.querySelector('input[name="mode"]:checked');
  const mode = modeEl ? modeEl.value : 'seibo';

  let praiseText;
  if (isBreath) {
    praiseText = pickRandom(BREATH_MSGS);
  } else {
    praiseText = buildPraise(action, mode);
  }

  const { text: tokuText, toku } = buildToku(action);
  const certHTML = buildCert(action, toku);

  const resultArea = document.getElementById('result-area');
  const resultText = document.getElementById('result-text');
  const tokuDisplay = document.getElementById('toku-display');
  const certBody = document.getElementById('cert-body');

  resultText.innerHTML = praiseText;
  tokuDisplay.innerHTML = `🏅 ${tokuText}`;
  certBody.innerHTML = certHTML;

  resultArea.style.display = 'block';
  resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });

  launchConfetti();
  playFanfare();
  vibrateDevice();

  praiseCount++;
  document.getElementById('kpi1').textContent = praiseCount;

  // 輝くアニメーション
  resultArea.classList.remove('pop-in');
  void resultArea.offsetWidth;
  resultArea.classList.add('pop-in');
}

// =====================
//  イベント：緊急ボタン
// =====================
document.getElementById('emergency-btn').addEventListener('click', () => {
  showResult('呼吸した', true);
});

// =====================
//  イベント：申請ボタン
// =====================
document.getElementById('submit-btn').addEventListener('click', () => {
  const select = document.getElementById('action-select').value;
  const custom = document.getElementById('custom-input').value.trim();
  const action = custom || select;

  if (!action) {
    // 何も入力がない→存在肯定
    showResult('存在した');
    return;
  }
  showResult(action);
});

// =====================
//  イベント：文字カウント
// =====================
document.getElementById('custom-input').addEventListener('input', function() {
  document.getElementById('char-count-num').textContent = this.value.length;
});

// =====================
//  イベント：セレクト選択時にテキストボックスをクリア
// =====================
document.getElementById('action-select').addEventListener('change', function() {
  if (this.value) {
    document.getElementById('custom-input').value = '';
    document.getElementById('char-count-num').textContent = '0';
  }
});

document.getElementById('custom-input').addEventListener('focus', function() {
  document.getElementById('action-select').value = '';
});

// =====================
//  イベント：シェアボタン
// =====================
document.getElementById('share-btn').addEventListener('click', () => {
  const text = document.getElementById('result-text').textContent.slice(0, 80);
  const tweet = encodeURIComponent(`【IKI-100公式認定】${text}……\n#息してるだけで100点 #全人類肯定\nhttps://iki100.example.com`);
  window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
});

// =====================
//  イベント：リセットボタン
// =====================
document.getElementById('reset-btn').addEventListener('click', () => {
  document.getElementById('result-area').style.display = 'none';
  document.getElementById('action-select').value = '';
  document.getElementById('custom-input').value = '';
  document.getElementById('char-count-num').textContent = '0';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =====================
//  イベント：音トグル
// =====================
document.getElementById('sound-toggle').addEventListener('click', function() {
  soundOn = !soundOn;
  this.textContent = soundOn ? '🔊 音ON（タップでOFF）' : '🔇 音オフ中（タップで音ON）';
  this.style.background = soundOn
    ? 'linear-gradient(135deg,#6bcb77,#4d96ff)'
    : 'rgba(255,255,255,0.12)';
});

// =====================
//  モードラジオ アニメ
// =====================
document.querySelectorAll('.mode-option').forEach(radio => {
  radio.addEventListener('change', function() {
    document.querySelectorAll('.mode-label').forEach(l => l.classList.remove('selected'));
    if (this.checked) {
      this.nextElementSibling.classList.add('selected');
    }
  });
});
// 初期選択
document.querySelector('.mode-option:checked')?.nextElementSibling?.classList.add('selected');

// =====================
//  タイトルキラキラ
// =====================
const tagline = document.querySelector('.tagline');
if (tagline) {
  setInterval(() => {
    tagline.style.opacity = tagline.style.opacity === '0.5' ? '1' : '0.5';
  }, 1200);
}