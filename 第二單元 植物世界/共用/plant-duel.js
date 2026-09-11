/* Shared local two-player match. Both frames use the same seed and this one clock. */
(() => {
'use strict';
if (new URLSearchParams(location.search).get('duel') === 'player') return;
const gameName = document.title.split('｜')[0];
const isLuffa = gameName === '絲瓜攀登王';
const startButton = document.getElementById(isLuffa ? 'start' : 'startButton');
if (!startButton) return;
const style = document.createElement('style');
style.textContent = `
.duel-host{overflow:hidden}
.duel-choice{margin:18px 0;padding:15px;border:1px solid #78966c;border-radius:15px;background:#eef1d7;color:#183e30}.duel-choice p{margin:0 0 10px!important;font-size:14px!important;font-weight:800;color:#183e30!important}.duel-choice>div{display:flex;gap:9px}.duel-choice button{flex:1;min-height:54px;border:2px solid #375d42;border-radius:10px;font:inherit;font-size:16px;font-weight:900;padding:10px;cursor:pointer;background:#fff9e8;color:#214432}.duel-choice button:first-child{background:#234735;color:#f3f7d8}.duel-choice small{display:block;font-size:12px;margin-top:8px}
#plantDuel{max-width:none;max-height:none;width:100%;height:100dvh;margin:0;padding:0;border:0;border-radius:0;background:#f7f2e5;color:#193e31;overflow:hidden;font:18px/1.5 "Microsoft JhengHei",sans-serif}#plantDuel::backdrop{background:#102b22}#plantDuel button{font:inherit;font-weight:800;min-height:48px;border:1px solid #587354;border-radius:11px;padding:9px 17px;cursor:pointer;touch-action:manipulation;background:#edf2df;color:#183c2a}#plantDuel button:focus-visible{outline:4px solid #dc8c18;outline-offset:3px}.duel-shell{height:100%;display:flex;flex-direction:column}.duel-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 18px;background:#173f32;color:#fff8e4;flex-shrink:0}.duel-bar h2{font-size:19px;margin:0}.duel-clock{font-size:32px;font-weight:900;font-variant-numeric:tabular-nums;white-space:nowrap}.duel-clock small{font-size:14px}.duel-tools{display:flex;gap:8px}.duel-arenas{display:grid;grid-template-columns:1fr 1fr;gap:8px;flex:1;min-height:0;padding:8px}.duel-lane{display:flex;flex-direction:column;min-width:0;border:3px solid var(--team);border-radius:18px;overflow:hidden;background:#fffaf0;position:relative}.duel-player-label{display:flex;justify-content:space-between;align-items:center;background:var(--team);color:white;padding:7px 17px;font-weight:900;font-size:22px}.duel-player-label b{font-size:27px}.duel-lane iframe{flex:1;min-height:0;width:100%;border:0;background:#faf5e9;touch-action:none}.duel-ready{position:absolute;inset:52px 0 0;background:#183d2ee8;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;text-align:center;padding:16px;color:white}.duel-ready strong{font-size:32px}.duel-ready p{font-size:17px;margin:0;max-width:300px}.duel-ready button{min-height:64px!important;min-width:180px;background:#edf5bc!important}.duel-bottom{font-size:13px;text-align:center;padding:3px 12px 8px;color:#536b58;flex-shrink:0}.duel-message{position:absolute;inset:0;z-index:5;background:#102c23d9;backdrop-filter:blur(5px);display:grid;place-items:center;padding:20px}.duel-message[hidden],.duel-ready[hidden]{display:none!important}.duel-message-card{width:min(570px,100%);max-height:calc(100dvh - 40px);overflow:auto;background:#fffbed;border-radius:24px;border:2px solid #b9c799;padding:30px;text-align:center;box-shadow:0 20px 80px #0005}.duel-message h2{font-size:34px;line-height:1.25;margin:8px 0 18px}.duel-message p{margin:12px 0;color:#3d5e43}.duel-message button{margin:5px}.duel-count{font-size:100px!important;margin:0!important;font-variant-numeric:tabular-nums}.duel-result-pair{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0}.duel-result-pair article{background:#e9efdd;padding:16px;border-radius:14px}.duel-result-pair b{display:block;font-size:40px}.duel-result-pair small{display:block;font-size:14px}.duel-result-pair span{font-weight:800}
@media(min-width:1800px){.duel-bar{padding:15px 25px}.duel-bar h2{font-size:27px}.duel-clock{font-size:40px}.duel-player-label{font-size:28px}.duel-player-label b{font-size:34px}#plantDuel button{min-height:62px}.duel-bottom{font-size:17px}}
@media(max-width:650px){.duel-bar{padding:7px 10px;gap:7px}.duel-bar h2{font-size:14px;max-width:100px}.duel-clock{font-size:25px}.duel-tools{gap:4px}#plantDuel .duel-tools button{padding:7px 9px;font-size:13px}.duel-player-label{font-size:17px;padding:4px 12px}.duel-player-label b{font-size:23px}.duel-ready{inset:43px 0 0}.duel-ready strong{font-size:24px}.duel-ready button{min-width:0}.duel-ready p{font-size:14px}.duel-message-card{padding:20px}.duel-message h2{font-size:27px}.duel-result-pair article{padding:12px}.duel-bottom{font-size:11px}}
@media(max-width:650px) and (orientation:portrait){.duel-arenas{grid-template-columns:1fr;grid-template-rows:1fr 1fr}.duel-ready{flex-direction:row;gap:12px}.duel-ready strong{font-size:20px}.duel-ready p{display:none}.duel-ready button{min-height:50px!important;font-size:15px!important}.duel-bottom{display:none}}
`;
document.head.append(style);
const picker = document.createElement('section');
picker.className='duel-choice';
picker.innerHTML='<p>遊玩人數</p><div><button type="button" aria-pressed="true" id="soloChoice">單人遊玩</button><button type="button" id="duelChoice">雙人比賽 ⇄</button></div><small>双人同時操作，60 秒比高低。適合大螢幕或平板橫向。</small>'.replace('双人','雙人');
if(isLuffa)document.querySelector('.modes').before(picker);
else document.querySelector('.intro').after(picker);
picker.querySelector('#soloChoice').addEventListener('click',()=>startButton.focus());
let dialog,frames=[],bridges=[],ready=[false,false],matchState='closed',elapsed=0,countdown=0,last=0,raf=0,pauseFrom='running',syncing=false;
function el(id){return document.getElementById(id);}
function report(){
  const result=bridges.map(b=>b.snapshot());
  result.forEach((r,i)=>{el('duel-score-'+i).textContent=r.score;});
  el('duelClock').textContent=Math.ceil(Math.max(0,60000-elapsed)/1000);
  return result;
}
function showMessage(html){el('duelMessage').hidden=false;el('duelMessageCard').innerHTML=html;const b=el('duelMessageCard').querySelector('button');if(b)b.focus();}
function hideMessage(){el('duelMessage').hidden=true;}
function finish(){
  if(matchState==='result')return;
  matchState='result';bridges.forEach(b=>b.finish());const scores=report(),a=scores[0],b=scores[1];
  const headline=a.score===b.score?'平手！旗鼓相當。':(a.score>b.score?'玩家 1':'玩家 2')+' 獲勝！';
  const cards=scores.map((s,i)=>'<article><span>玩家 '+(i+1)+'</span><b>'+s.score+' <small>分</small></b><small>'+(isLuffa?'攀登 '+s.height+' 層 · 陽光 '+s.light+' 格':'捕獲 '+s.caught+' 隻 · 最高連續 '+s.maxStreak+' 次')+'</small></article>').join('');
  showMessage('<p>雙人比賽 · 60 秒挑戰完成</p><h2>'+headline+'</h2><div class="duel-result-pair">'+cards+'</div><p>'+(isLuffa?'卷鬚幫助絲瓜攀附，讓枝葉向上爭取陽光。':'捕蟲的是特化的葉。捕蠅草也需要光合作用。')+'</p><p style="font-size:13px">雙人局不會改寫單人最佳紀錄。</p><button id="duelAgain">再比一場</button><button id="duelDone">回到單人／雙人選單</button>');
  el('duelAgain').onclick=prepare;el('duelDone').onclick=close;
  el('duelPause').disabled=true;
}
function sync(){
  if(syncing||!bridges.length)return;
  syncing=true;
  const now=performance.now(),dt=Math.max(0,now-last);last=now;
  if(matchState==='countdown'){
    countdown+=dt;el('duelCount').textContent=Math.max(1,3-Math.floor(countdown/1000));
    if(countdown>=3000){elapsed=0;matchState='running';hideMessage();bridges.forEach(b=>b.start());last=performance.now();}
  }else if(matchState==='running'){
    elapsed=Math.min(60000,elapsed+dt);bridges.forEach(b=>b.step(elapsed));report();if(elapsed>=60000)finish();
  }
  syncing=false;
}
window.plantDuelSync=sync;
function frame(){if(matchState==='closed')return;sync();raf=requestAnimationFrame(frame);}
function act(player,action){sync();if(matchState!=='running')return;bridges[player].action(action);report();}
window.plantDuelKey=(code,repeat)=>{
  if(repeat||matchState!=='running')return;
  const keys=isLuffa?{KeyA:[0,0],KeyS:[0,1],KeyD:[0,2],KeyJ:[1,0],KeyK:[1,1],KeyL:[1,2]}:{KeyF:[0,0],KeyJ:[1,0]};
  if(keys[code])act(...keys[code]);
};
document.addEventListener('keydown',e=>{if(matchState==='closed')return;if(['KeyA','KeyS','KeyD','KeyJ','KeyK','KeyL','KeyF'].includes(e.code)){e.preventDefault();window.plantDuelKey(e.code,e.repeat);}});
function beginCountdown(){matchState='countdown';countdown=0;last=performance.now();showMessage('<p>兩人都準備好了！</p><h2 class="duel-count" id="duelCount">3</h2><p>同時出發，用植物本領一決高下。</p>');}
function setReady(i){if(matchState!=='ready')return;ready[i]=true;el('duelReadyButton'+i).disabled=true;el('duelReadyButton'+i).textContent='準備好了 ✓';if(ready.every(Boolean)){document.querySelectorAll('.duel-ready').forEach(d=>d.hidden=true);beginCountdown();}}
function prepare(){
  hideMessage();matchState='ready';elapsed=0;ready=[false,false];last=performance.now();el('duelPause').disabled=false;
  bridges.forEach((b,i)=>{b.prepare(isLuffa?437:2045042);el('duelReady'+i).hidden=false;const btn=el('duelReadyButton'+i);btn.disabled=false;btn.textContent='玩家 '+(i+1)+' 準備好了';});
  report();el('duelReadyButton0').focus();
}
function pause(){
  if(!['running','countdown'].includes(matchState))return;
  sync();if(!['running','countdown'].includes(matchState))return;pauseFrom=matchState;matchState='paused';bridges.forEach(b=>b.pause());
  showMessage('<p>兩邊一起休息</p><h2>比賽已暫停</h2><p>共同倒數和兩邊的遊戲都已暫停。</p><button id="duelResume">一起繼續</button><button id="duelExitAsk">離開比賽</button>');
  el('duelResume').onclick=resume;el('duelExitAsk').onclick=askExit;
}
function resume(){
  if(matchState!=='paused')return;matchState=pauseFrom;last=performance.now();bridges.forEach(b=>b.resume());
  if(matchState==='countdown')showMessage('<p>準備一起出發</p><h2 class="duel-count" id="duelCount">'+Math.max(1,3-Math.floor(countdown/1000))+'</h2>');else hideMessage();
}
function askExit(){
  if(matchState==='running'||matchState==='countdown')pause();
  if(matchState==='result'||matchState==='ready'||matchState==='loading'||matchState==='error'){close();return;}
  showMessage('<h2>結束這場比賽嗎？</h2><p>未完成的雙人局不會記錄勝負。</p><button id="duelKeep">繼續這場比賽</button><button id="duelExit">確定離開</button>');
  el('duelKeep').onclick=resume;el('duelExit').onclick=close;
}
function close(){matchState='closed';cancelAnimationFrame(raf);if(dialog){dialog.close();dialog.remove();}bridges=[];frames=[];document.body.classList.remove('duel-host');picker.querySelector('#duelChoice').focus();}
async function open(){
  if(matchState!=='closed')return;
  matchState='loading';document.body.classList.add('duel-host');
  dialog=document.createElement('dialog');dialog.id='plantDuel';dialog.setAttribute('aria-label',gameName+'雙人同時比賽');
  dialog.innerHTML='<div class="duel-shell"><header class="duel-bar"><h2>'+gameName+'<br>雙人比賽</h2><div class="duel-clock"><span id="duelClock">60</span> <small>秒</small></div><div class="duel-tools"><button id="duelPause">暫停</button><button id="duelExitTop">離開</button></div></header><div class="duel-arenas">'+[0,1].map(i=>'<section class="duel-lane" style="--team:'+(i===0?'#286b8b':'#ad5a2f')+'"><header class="duel-player-label"><span>玩家 '+(i+1)+'</span><b><span id="duel-score-'+i+'">0</span> 分</b></header><iframe title="玩家 '+(i+1)+' 的遊戲" id="duelFrame'+i+'"></iframe><div class="duel-ready" id="duelReady'+i+'"><strong>玩家 '+(i+1)+'</strong><p>'+(isLuffa?'觀察路線，點選自己的支架。':'昆蟲進圈時，按自己的閉合按鈕。')+'</p><button id="duelReadyButton'+i+'" disabled>準備遊戲中…</button></div></section>').join('')+'</div><footer class="duel-bottom">相同路線 · 同時起跑 · 各自操作　'+(isLuffa?'鍵盤：玩家 1 用 A／S／D，玩家 2 用 J／K／L':'鍵盤：玩家 1 用 F，玩家 2 用 J')+'</footer></div><div class="duel-message" id="duelMessage" hidden><div class="duel-message-card" id="duelMessageCard" role="status"></div></div>';
  document.body.append(dialog);dialog.showModal();
  dialog.addEventListener('cancel',e=>{e.preventDefault();if(matchState==='paused')resume();else if(['running','countdown'].includes(matchState))pause();else askExit();});
  el('duelPause').onclick=pause;el('duelExitTop').onclick=askExit;
  frames=[el('duelFrame0'),el('duelFrame1')];
  frames.forEach((f,i)=>el('duelReadyButton'+i).onclick=()=>setReady(i));
  try{
    const loaded=await Promise.all(frames.map(f=>new Promise((resolve,reject)=>{
      const timeout=setTimeout(()=>reject(new Error('載入時間較長')),15000);
      f.onload=()=>{clearTimeout(timeout);try{const b=f.contentWindow.plantGameBridge;if(!b)throw new Error('遊戲尚未就緒');resolve(b);}catch(e){reject(e);}};
      const url=new URL(location.href);url.search='?duel=player';url.hash='';f.src=url.href;
    })));
    if(matchState==='closed')return;bridges=loaded;prepare();raf=requestAnimationFrame(frame);
  }catch(_){if(matchState==='closed')return;matchState='error';showMessage('<h2>遊戲還沒有準備好</h2><p>請從教材網站或本機預覽網址開啟，再試一次雙人模式。</p><button id="duelErrorClose">回到選單</button>');el('duelErrorClose').onclick=close;}
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
picker.querySelector('#duelChoice').onclick=open;
})();
