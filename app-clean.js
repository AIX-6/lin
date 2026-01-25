/* 20 秒均匀版：200 个弹窗，每 100ms 一个，不自动消失，无小球 */
const msgs = [
  '别太累了啦，偶尔偷懒也好','你超棒的','我想你了','保持微笑呀',
  '别熬夜','今天也要开心','加油，你一定行','愿你被温柔以待'
];
const themes = [
  'theme-blue','theme-green','theme-purple','theme-orange','theme-pink'
];
const anims = ['anim-bottom','anim-top','anim-left','anim-right'];

const layer = document.getElementById('popup-layer');
const music = document.getElementById('bgMusic');
music.volume = 0.6;

let count = 0;
const maxCount = 200;       // 总量
const interval = 100;       // 100 ms → 10 个/秒 → 20 秒整

/* 初始弹窗 */
document.getElementById('confirm-btn').addEventListener('click', () => {
  document.getElementById('start-backdrop').style.display = 'none';
  music.play().catch(()=>{});
  startSequence();          // 开始均匀序列
}, {once:true});

/* 均匀序列：每 100 ms 一个 */
function startSequence(){
  const timer = setInterval(() => {
    if(count >= maxCount){ clearInterval(timer); return; }
    createPopup();
    count++;
  }, interval);
}

/* 创建单个弹窗（不自动消失） */
function createPopup(){
  const div = document.createElement('div');
  div.className = `popup ${rand(themes)} ${rand(anims)}`;
  div.innerHTML = `
    <div class="header">
      <span class="icon">💝</span>
      <span class="title">提示</span>
    </div>
    <div class="content">${rand(msgs)}</div>
  `;
  const {innerWidth:w,innerHeight:h} = window;
  div.style.left = Math.random() * Math.max(0, w - 230) + 'px';
  div.style.top  = Math.random() * Math.max(0, h - 100) + 'px';
  layer.appendChild(div);
  /* ❌ 不删除，常驻屏幕 */
}

function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }