/* ==========================================================
   題庫示意圖產生器（第一、三、四單元的看圖題用參數畫示意圖）
   每一種圖都由參數決定，題目資料只寫 fig:{type:..., ...}，
   不在題目裡手寫 SVG，幾何才不會畫錯。
   候選位置的代號用 lab 陣列指定（例：["乙","甲","丙"]），
   這樣正確答案不會永遠是「甲」。
   ========================================================== */
(function(){
  const C={ink:"#1E1E1E",sun:"#FFC93C",sunEdge:"#E0A100",ground:"#8CC56B",soil:"#C9A46A",
           stick:"#7A5230",shadow:"rgba(40,40,40,.55)",water:"#BFE3F7",waterEdge:"#2E86C1",
           ray:"#E4574C",ray2:"#2E86C1",muted:"#6B7A82",bg:"#FFFDF8",arc1:"#E4574C",arc2:"#2E7D4F",arc3:"#2E86C1"};
  const DIR={N:[0,-1],NE:[.707,-.707],E:[1,0],SE:[.707,.707],S:[0,1],SW:[-.707,.707],W:[-1,0],NW:[-.707,-.707]};
  const OPP={N:"S",S:"N",E:"W",W:"E",NE:"SW",SW:"NE",NW:"SE",SE:"NW"};
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const svg=(vb,body,title)=>`<svg class="qfig" viewBox="${vb}" role="img" aria-label="${esc(title||"示意圖")}" xmlns="http://www.w3.org/2000/svg" font-family="Microsoft JhengHei,PingFang TC,Noto Sans TC,sans-serif">${body}</svg>`;
  const txt=(x,y,s,o={})=>`<text x="${x}" y="${y}" font-size="${o.size||16}" font-weight="${o.w||700}" fill="${o.fill||C.ink}" text-anchor="${o.anchor||"middle"}" dominant-baseline="middle" stroke="#fff" stroke-width="4" stroke-linejoin="round" paint-order="stroke">${esc(s)}</text>`;
  const badge=(x,y,s)=>`<circle cx="${x}" cy="${y}" r="13" fill="#fff" stroke="${C.ink}" stroke-width="2.5"/>`+txt(x,y+1,s,{size:15,w:900});
  const sunIcon=(x,y,r=14)=>{let b="";for(let i=0;i<8;i++){const a=i*Math.PI/4;b+=`<line x1="${x+Math.cos(a)*(r+3)}" y1="${y+Math.sin(a)*(r+3)}" x2="${x+Math.cos(a)*(r+9)}" y2="${y+Math.sin(a)*(r+9)}" stroke="${C.sunEdge}" stroke-width="3" stroke-linecap="round"/>`;}
    return b+`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.sun}" stroke="${C.sunEdge}" stroke-width="2.5"/>`;};
  const arrowHead=(x1,y1,x2,y2,col,sz=10)=>{const a=Math.atan2(y2-y1,x2-x1);return `<polygon points="${x2},${y2} ${x2-sz*Math.cos(a-0.4)},${y2-sz*Math.sin(a-0.4)} ${x2-sz*Math.cos(a+0.4)},${y2-sz*Math.sin(a+0.4)}" fill="${col}"/>`;};
  const line=(x1,y1,x2,y2,col,w=3,dash)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"${dash?` stroke-dasharray="${dash}"`:""}/>`;
  const ray=(x1,y1,x2,y2,col=C.ray,w=3.5)=>line(x1,y1,x2,y2,col,w)+arrowHead(x1,y1,x2,y2,col);
  const compass=(cx,cy,r)=>{let b=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#F4F9EE" stroke="${C.muted}" stroke-width="2" stroke-dasharray="4 5"/>`;
    [["北",0,-1],["東",1,0],["南",0,1],["西",-1,0]].forEach(([s,dx,dy])=>{b+=txt(cx+dx*(r+18),cy+dy*(r+18),s,{size:17,w:900});});
    return b;};

  const F={};

  /* 1. 影子（俯視圖）：一根竿子與它的影子。
        shadow：影子朝向（N/NE/E/SE/S/SW/W/NW）；len：0.2–1（相對長度）；
        sun：true 時把太陽畫在影子相反方向；cands：true 時在東南西北畫出 4 個候選太陽位置，依序是北、東、南、西（代號用 lab）；用 cands 時 shadow 必須是 N/E/S/W */
  F.shadow=p=>{
    const cx=200,cy=150,R=100,d=DIR[p.shadow||"W"],L=(p.len==null?0.6:p.len)*R;
    let b=`<rect width="400" height="300" fill="${C.bg}"/>`+compass(cx,cy,R);
    b+=`<line x1="${cx}" y1="${cy}" x2="${cx+d[0]*L}" y2="${cy+d[1]*L}" stroke="${C.shadow}" stroke-width="12" stroke-linecap="round"/>`;
    b+=`<circle cx="${cx}" cy="${cy}" r="9" fill="${C.stick}" stroke="${C.ink}" stroke-width="2"/>`;
    b+=txt(cx+d[0]*L/2+(d[1]?16:0),cy+d[1]*L/2+(d[0]?-16:0),"影子",{size:14,fill:"#333"});
    if(p.sun){const s=DIR[OPP[p.shadow||"W"]];b+=sunIcon(cx+s[0]*(R-18),cy+s[1]*(R-18),13);}
    if(p.cands){const lab=p.lab||["甲","乙","丙","丁"];["N","E","S","W"].forEach((k,i)=>{const s=DIR[k];b+=badge(cx+s[0]*(R-22)+(s[1]?26:0),cy+s[1]*(R-22)+(s[0]?-24:0),lab[i]);});}
    b+=txt(200,290,"（俯視示意圖：從上往下看，上方是北）",{size:12,w:400,fill:C.muted});
    return svg("0 0 400 300",b,"竿子影子的俯視示意圖");
  };

  /* 2. 一天中的影子（俯視圖）：同一根竿子在上午、中午、下午的三條影子，代號用 lab（依序是：上午／中午／下午）。
        noon：中午影子方向（N，預設；夏至北回歸線上可用 "none" 表示幾乎沒有影子） */
  F.shadowday=p=>{
    const cx=200,cy=150,R=110,lab=p.lab||["甲","乙","丙"];
    let b=`<rect width="400" height="300" fill="${C.bg}"/>`+compass(cx,cy,R);
    const S=[[DIR.W,0.95,DIR.W],[DIR.N,0.35,DIR.N],[DIR.E,0.95,DIR.E]];
    S.forEach(([d,l],i)=>{const L=l*R;b+=`<line x1="${cx}" y1="${cy}" x2="${cx+d[0]*L}" y2="${cy+d[1]*L}" stroke="${C.shadow}" stroke-width="11" stroke-linecap="round"/>`;
      b+=badge(cx+d[0]*(L+2)+(d[1]?22:0),cy+d[1]*(L+2)+(d[0]?-22:0),lab[i]);});
    b+=`<circle cx="${cx}" cy="${cy}" r="9" fill="${C.stick}" stroke="${C.ink}" stroke-width="2"/>`;
    b+=txt(200,290,"（俯視示意圖：同一根竿子在一天中三個時間的影子）",{size:12,w:400,fill:C.muted});
    return svg("0 0 400 300",b,"一天中三個時間的影子");
  };

  /* 3. 太陽高度角（側視圖）：吸管、棉線、影子。deg：太陽高度角；show：是否寫出度數；
        marks：true 時標出三個角（依序：影子末端的角＝高度角／吸管頂端的角／吸管底部的直角），代號用 lab */
  F.altitude=p=>{
    const deg=p.marks?Math.min(p.deg||35,40):(p.deg||40),rad=deg*Math.PI/180,H=120,gx=110,gy=230,sl=H/Math.tan(rad),tipX=gx+sl;
    let b=`<rect width="420" height="280" fill="${C.bg}"/>`;
    b+=`<rect x="0" y="${gy}" width="420" height="50" fill="${C.ground}" opacity=".45"/>`+line(0,gy,420,gy,C.ink,2.5);
    b+=`<line x1="${gx}" y1="${gy}" x2="${tipX}" y2="${gy}" stroke="${C.shadow}" stroke-width="9" stroke-linecap="round"/>`;
    b+=line(gx,gy,gx,gy-H,C.stick,7);
    b+=line(gx,gy-H,tipX,gy,"#B03A30",2.5,"6 4");
    /* 太陽在棉線延長線（往左上） */
    const ux=-Math.cos(rad),uy=-Math.sin(rad),sx=gx+ux*70,sy=gy-H+uy*70;
    if(sx>20&&sy>20) b+=sunIcon(sx,sy,14);
    b+=txt(gx-26,gy-H/2,"吸管",{size:14});
    b+=txt((gx+tipX)/2,gy+22,"影子",{size:14});
    b+=txt(Math.min(tipX+10,395),gy-H/2-10,"棉線",{size:14,anchor:"start",fill:"#B03A30"});
    if(p.marks){
      const lab=p.lab||["甲","乙","丙"];
      /* 甲：影子末端 */
      b+=`<path d="M ${tipX-34} ${gy} A 34 34 0 0 1 ${tipX-34*Math.cos(rad)} ${gy-34*Math.sin(rad)}" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`;
      b+=badge(tipX-52,gy-16,lab[0]);
      /* 乙：吸管頂端 */
      const a2=Math.PI/2-rad;
      b+=`<path d="M ${gx} ${gy-H+30} A 30 30 0 0 0 ${gx+30*Math.sin(a2)} ${gy-H+30*Math.cos(a2)}" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`;
      b+=badge(gx+17,gy-H+46,lab[1]);
      /* 丙：吸管底部（直角） */
      b+=`<path d="M ${gx} ${gy-18} L ${gx+18} ${gy-18} L ${gx+18} ${gy}" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`;
      b+=badge(gx+38,gy-13,lab[2]);
    }else if(p.show){
      b+=`<path d="M ${tipX-34} ${gy} A 34 34 0 0 1 ${tipX-34*Math.cos(rad)} ${gy-34*Math.sin(rad)}" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`;
      b+=txt(tipX-60,gy-14,deg+"°",{size:16,w:900});
    }
    b+=txt(210,270,"（側視示意圖，不是真實比例）",{size:12,w:400,fill:C.muted});
    return svg("0 0 420 280",b,"太陽高度角的示意圖");
  };

  /* 4. 四季太陽軌跡（圓頂）：三條軌跡，依序是夏至／春分秋分／冬至，代號用 lab */
  F.sunpath=p=>{
    const lab=p.lab||["甲","乙","丙"],cx=210,cy=205,rx=170,ry=52;
    let b=`<rect width="420" height="300" fill="${C.bg}"/>`;
    b+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${C.ground}" fill-opacity=".35" stroke="${C.ink}" stroke-width="2"/>`;
    b+=`<path d="M ${cx-rx} ${cy} A ${rx} 175 0 0 1 ${cx+rx} ${cy}" fill="none" stroke="${C.muted}" stroke-width="1.5" stroke-dasharray="3 6"/>`;
    b+=txt(cx,cy+ry+18,"南",{size:17,w:900})+txt(cx-110,cy-ry+14,"北",{size:15,w:900})+txt(cx-rx-16,cy,"東",{size:17,w:900})+txt(cx+rx+16,cy,"西",{size:17,w:900});
    /* 觀察者 */
    b+=`<circle cx="${cx}" cy="${cy}" r="6" fill="${C.ink}"/>`+txt(cx,cy+16,"觀察者",{size:11,w:700});
    /* 三條軌跡：從地平線上的日出點到日落點，拱高不同（冬至偏南且低；夏至偏北且高，接近頭頂） */
    const P=[
      {rise:[cx-150,cy-28],set:[cx+150,cy-28],top:[cx,22],col:C.arc1},     /* 夏至：東偏北→西偏北，最高 */
      {rise:[cx-rx,cy],set:[cx+rx,cy],top:[cx,78],col:C.arc2},              /* 春分、秋分：正東→正西 */
      {rise:[cx-150,cy+28],set:[cx+150,cy+28],top:[cx,140],col:C.arc3}     /* 冬至：東偏南→西偏南，最低 */
    ];
    P.forEach((a,i)=>{
      const q1=[a.rise[0]+20,a.top[1]],q2=[a.set[0]-20,a.top[1]];
      b+=`<path d="M ${a.rise[0]} ${a.rise[1]} C ${q1[0]} ${q1[1]}, ${q2[0]} ${q2[1]}, ${a.set[0]} ${a.set[1]}" fill="none" stroke="${a.col}" stroke-width="4"/>`;
      b+=arrowHead(q2[0],q2[1]+(a.set[1]-q2[1])*0.2,a.set[0],a.set[1],a.col,12);
      const mx=cx, my=0.125*a.rise[1]+0.375*q1[1]+0.375*q2[1]+0.125*a.set[1];
      b+=badge(mx+[-60,0,60][i],my+(i===2?3:-2),lab[i]);
    });
    b+=txt(210,290,"（在北回歸線附近，想像天空是一個圓頂）",{size:12,w:400,fill:C.muted});
    return svg("0 0 420 300",b,"四季代表日太陽在天空運行軌跡的示意圖");
  };

  /* 5. 光的折射：光從 from（"air" 或 "water"）射向水面。
        oblique：true＝斜射、false＝垂直；三條候選路線依序：①不偏折直走 ②偏向法線（折得比較陡）③偏離法線，代號用 lab。
        cands:false 時只畫出正確的路線（當作結論圖）。 */
  F.refraction=p=>{
    const lab=p.lab||["甲","乙","丙"],W=420,H=330,sx=210,sy=150;
    const fromAir=(p.from||"air")==="air",obl=p.oblique!==false;
    let b=`<rect width="${W}" height="${H}" fill="#F7FBFF"/>`;
    b+=`<rect x="0" y="${sy}" width="${W}" height="${H-sy}" fill="${C.water}"/>`+line(0,sy,W,sy,C.waterEdge,3);
    b+=txt(28,24,"空氣",{size:15,anchor:"start"})+txt(28,H-40,"水",{size:15,anchor:"start"});
    b+=line(sx,20,sx,H-20,C.muted,1.5,"5 5");
    const inAng=obl?40:0, t=v=>v*Math.PI/180;
    const len=120, dirIn=fromAir?1:-1;
    const x0=sx-Math.sin(t(inAng))*len, y0=sy-dirIn*Math.cos(t(inAng))*len;
    b+=ray(x0,y0,sx,sy,C.ray);
    b+=txt(x0-6,y0+(fromAir?-12:12),"光",{size:15,fill:C.ray});
    const outs=obl?[inAng,fromAir?24:60,fromAir?60:24]:[0,22,-22];
    const correct=obl?1:0;
    if(p.cands===false){
      const a=outs[correct];b+=ray(sx,sy,sx+Math.sin(t(a))*len,sy+dirIn*Math.cos(t(a))*len,C.ray);
    }else{
      outs.forEach((a,i)=>{const x=sx+Math.sin(t(a))*len,y=sy+dirIn*Math.cos(t(a))*len;
        b+=line(sx,sy,x,y,C.ray2,3,"8 5")+arrowHead(sx,sy,x,y,C.ray2);
        b+=badge(x+Math.sin(t(a))*16+(a<0?-4:4),y+dirIn*14,lab[i]);});
    }
    b+=txt(W/2,H-10,"（虛線：和水面垂直的線）",{size:12,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"光從"+(fromAir?"空氣":"水")+(obl?"斜斜的":"垂直的")+"射向水面");
  };

  /* 6. 放大鏡聚光：kind "convex"（放大鏡：兩邊薄中間厚）或 "flat"（平面玻璃）；三條平行的陽光 */
  F.lens=p=>{
    const W=420,H=240,lx=190,cy=120;let b=`<rect width="${W}" height="${H}" fill="${C.bg}"/>`;
    const ys=[70,120,170];
    if((p.kind||"convex")==="convex"){
      b+=`<path d="M ${lx} ${cy-80} Q ${lx+26} ${cy} ${lx} ${cy+80} Q ${lx-26} ${cy} ${lx} ${cy-80} Z" fill="#DDF0FA" stroke="${C.waterEdge}" stroke-width="3"/>`;
      const fx=lx+130;
      ys.forEach(y=>{b+=line(20,y,lx,y,C.ray,3)+arrowHead(20,y,lx-40,y,C.ray);const ey=cy+(cy-y)/(fx-lx)*60;b+=line(lx,y,fx+60,ey,C.ray,3)+arrowHead(lx,y,(lx+fx)/2,(y+cy)/2,C.ray);});
      b+=`<circle cx="${fx}" cy="${cy}" r="7" fill="${C.sun}" stroke="${C.sunEdge}" stroke-width="2"/>`+txt(fx,cy+24,"很亮的一點",{size:13});
      b+=txt(lx,cy+100,"放大鏡（凸透鏡）",{size:14});
    }else{
      b+=`<rect x="${lx-6}" y="${cy-80}" width="12" height="160" fill="#DDF0FA" stroke="${C.waterEdge}" stroke-width="3"/>`;
      ys.forEach(y=>{b+=line(20,y,W-20,y,C.ray,3)+arrowHead(20,y,lx-40,y,C.ray)+arrowHead(lx,y,W-20,y,C.ray);});
      b+=txt(lx,cy+100,"平面玻璃",{size:14});
    }
    b+=txt(40,24,"陽光",{size:14,fill:C.ray});
    return svg(`0 0 ${W} ${H}`,b,(p.kind==="flat"?"陽光穿過平面玻璃":"陽光穿過放大鏡")+"的示意圖");
  };

  /* 7. 彩虹：左邊有太陽、中間有水霧；兩位同學，依序是：背對太陽看水霧／面對太陽看水霧，代號用 lab */
  F.rainbow=p=>{
    const lab=p.lab||["甲","乙"],W=440,H=240;let b=`<rect width="${W}" height="${H}" fill="#F4FAFF"/>`;
    b+=`<rect x="0" y="200" width="${W}" height="40" fill="${C.ground}" opacity=".5"/>`;
    b+=sunIcon(40,50,18)+txt(40,90,"太陽",{size:13});
    /* 水霧（在圖的右半邊） */
    for(let i=0;i<40;i++){const x=300+((i*37)%110),y=70+((i*53)%110);b+=`<circle cx="${x}" cy="${y}" r="2.6" fill="#7FB8DB"/>`;}
    b+=txt(355,190,"水霧",{size:13});
    const person=(x,face,l)=>{const dx=face>0?1:-1;return `<circle cx="${x}" cy="150" r="10" fill="#FCE2C4" stroke="${C.ink}" stroke-width="2"/>`+line(x,160,x,195,C.ink,3)+line(x,195,x-7,215,C.ink,3)+line(x,195,x+7,215,C.ink,3)
      +`<polygon points="${x+dx*12},148 ${x+dx*22},150 ${x+dx*12},153" fill="${C.ink}"/>`+badge(x,122,l);};
    /* 甲：站在太陽和水霧之間，面向水霧（背對太陽） */
    b+=person(220,+1,lab[0]);
    /* 乙：站在水霧的另一邊，面向太陽（看過去是水霧，陽光在前面） */
    b+=person(425-10,-1,lab[1]);
    b+=txt(W/2,232,"（示意圖：三角形表示眼睛看的方向）",{size:12,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"兩位同學看水霧的位置");
  };

  /* 8. 日晷：kind "vertical"（直立式：晷面垂直）／"horizontal"（地平型：晷面水平）／"equatorial"（赤道型：晷面和晷針垂直） */
  F.sundial=p=>{
    const W=320,H=220,gx=160,gy=180;let b=`<rect width="${W}" height="${H}" fill="${C.bg}"/>`;
    b+=`<rect x="0" y="${gy}" width="${W}" height="40" fill="${C.ground}" opacity=".45"/>`+line(0,gy,W,gy,C.ink,2.5);
    const t=(p.kind||"horizontal"), lat=23.5*Math.PI/180, gn=110;
    if(t==="horizontal"){
      b+=`<rect x="${gx-100}" y="${gy-14}" width="200" height="14" fill="#D9D2C3" stroke="${C.ink}" stroke-width="2"/>`;
      b+=line(gx-60,gy-14,gx-60+Math.cos(lat)*gn,gy-14-Math.sin(lat)*gn,"#B87333",6);
      b+=txt(gx+40,gy-30,"晷面（水平）",{size:13});
    }else if(t==="vertical"){
      b+=`<rect x="${gx-8}" y="${gy-150}" width="16" height="150" fill="#D9D2C3" stroke="${C.ink}" stroke-width="2"/>`;
      b+=line(gx-8,gy-110,gx-8-Math.cos(lat)*gn,gy-110+Math.sin(lat)*gn,"#B87333",6);
      b+=txt(gx+60,gy-80,"晷面（垂直）",{size:13});
    }else{
      const cxp=gx,cyp=gy-80,len=90,ang=lat;
      b+=line(cxp-Math.cos(ang)*len,cyp+Math.sin(ang)*len,cxp+Math.cos(ang)*len,cyp-Math.sin(ang)*len,"#B87333",6);
      const px=Math.sin(ang)*60,py=Math.cos(ang)*60;
      b+=line(cxp-px,cyp-py,cxp+px,cyp+py,C.ink,12)+line(cxp-px,cyp-py,cxp+px,cyp+py,"#D9D2C3",8);
      b+=line(cxp-Math.cos(ang)*len,cyp+Math.sin(ang)*len,cxp-Math.cos(ang)*len,gy,C.muted,4);
      b+=txt(gx+96,gy-120,"晷面和晷針垂直",{size:13});
    }
    b+=txt(40,24,"晷針",{size:13,fill:"#B87333"});
    b+=txt(W/2,H-8,"（側面示意圖）",{size:12,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"日晷的側面示意圖");
  };

  /* 9. 素養題組的統計圖：{type:"bar"|"line", xLabel, yLabel, x:[...], series:[{name,data:[數字或 null]}],
        yMin, yMax（可省略，自動取整）, labels（可省略：一條資料時預設標數值）}
        只有一個 y 軸；兩條以上資料一定有圖例；文字一律用墨色，顏色只給資料記號。 */
  const SERIES=["#2E86C1","#D9822B","#2E7D4F"];
  const niceStep=span=>{ const raw=span/5, p=Math.pow(10,Math.floor(Math.log10(raw||1))), m=raw/p;
    return (m<=1?1:m<=2?2:m<=2.5?2.5:m<=5?5:10)*p; };
  const fmtNum=v=>Number.isInteger(v)?String(v):String(Math.round(v*100)/100);
  const chart=c=>{
    const x=c.x||[], se=(c.series||[]).slice(0,3), n=x.length||1, vals=se.flatMap(s=>s.data||[]).filter(v=>v!=null);
    const W=480, T=se.length>1?66:42, B=60, Lm=50, R=14, H=310, pw=W-Lm-R, ph=H-T-B;
    let lo=c.yMin!=null?c.yMin:Math.min(0,...vals), hi=c.yMax!=null?c.yMax:Math.max(1,...vals);
    const step=niceStep(hi-lo); lo=Math.floor(lo/step)*step; hi=c.yMax!=null?hi:Math.ceil(hi/step)*step; if(hi<=lo) hi=lo+step;
    const Y=v=>T+ph-(v-lo)/(hi-lo)*ph, band=pw/n, X=i=>Lm+band*(i+.5);
    const lab=c.labels!=null?c.labels:se.length===1;
    let b=`<rect width="${W}" height="${H}" fill="#fff"/>`;
    for(let v=lo;v<=hi+1e-9;v+=step){ const y=Y(v);
      b+=`<line x1="${Lm}" y1="${y}" x2="${W-R}" y2="${y}" stroke="${v===lo?"#8A949A":"#E6E1D6"}" stroke-width="1"/>`;
      b+=`<text x="${Lm-7}" y="${y}" font-size="15" fill="${C.muted}" text-anchor="end" dominant-baseline="middle">${fmtNum(v)}</text>`; }
    if(c.yLabel) b+=`<text x="${Lm-8}" y="${T-16}" font-size="15" font-weight="700" fill="${C.ink}" text-anchor="start">${esc(c.yLabel)}</text>`;
    x.forEach((s,i)=>{ const parts=String(s).length>4&&band<80&&/\s/.test(s)?String(s).split(/\s+/):[String(s)];
      parts.forEach((t,k)=>{ b+=`<text x="${X(i)}" y="${T+ph+20+k*17}" font-size="15" fill="${C.ink}" text-anchor="middle">${esc(t)}</text>`; }); });
    if(c.xLabel) b+=`<text x="${W-R}" y="${H-6}" font-size="15" font-weight="700" fill="${C.ink}" text-anchor="end">${esc(c.xLabel)}</text>`;
    if(se.length>1){ let lx=12; se.forEach((s,k)=>{ const col=SERIES[k];
      b+=c.type==="line"?`<line x1="${lx}" y1="16" x2="${lx+22}" y2="16" stroke="${col}" stroke-width="2.5"/><circle cx="${lx+11}" cy="16" r="4.5" fill="${col}" stroke="#fff" stroke-width="2"/>`
                        :`<rect x="${lx}" y="8" width="16" height="16" rx="3" fill="${col}"/>`;
      b+=`<text x="${lx+(c.type==="line"?28:22)}" y="17" font-size="15" font-weight="700" fill="${C.ink}" dominant-baseline="middle">${esc(s.name||"")}</text>`;
      lx+=48+String(s.name||"").length*15; }); }
    const valTxt=(x0,y0,v)=>`<text x="${x0}" y="${y0}" font-size="14" font-weight="700" fill="${C.ink}" text-anchor="middle" stroke="#fff" stroke-width="3" paint-order="stroke">${fmtNum(v)}</text>`;
    if(c.type==="line"){
      se.forEach((s,k)=>{ const col=SERIES[k], d=s.data||[]; let path="", pen=false;
        d.forEach((v,i)=>{ if(v==null){ pen=false; return; } path+=`${pen?"L":"M"}${X(i)},${Y(v)} `; pen=true; });
        b+=`<path d="${path}" fill="none" stroke="${col}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
        d.forEach((v,i)=>{ if(v==null) return; b+=`<circle cx="${X(i)}" cy="${Y(v)}" r="4.5" fill="${col}" stroke="#fff" stroke-width="2"/>`;
          if(lab) b+=valTxt(X(i),Y(v)-12,v); }); });
    }else{
      const bw=Math.min(24,(band*.72-2*(se.length-1))/se.length), gw=bw*se.length+2*(se.length-1), base=Y(Math.max(lo,Math.min(0,hi)));
      se.forEach((s,k)=>{ const col=SERIES[k];
        (s.data||[]).forEach((v,i)=>{ if(v==null) return; const x0=X(i)-gw/2+k*(bw+2), y=Y(v), h=Math.abs(base-y), r=Math.min(4,h,bw/2);
          const top=Math.min(y,base);
          b+= v>=0 ? `<path d="M${x0},${base} V${top+r} Q${x0},${top} ${x0+r},${top} H${x0+bw-r} Q${x0+bw},${top} ${x0+bw},${top+r} V${base} Z" fill="${col}"/>`
                   : `<rect x="${x0}" y="${top}" width="${bw}" height="${h}" fill="${col}"/>`;
          if(lab) b+=valTxt(x0+bw/2,top-8,v); }); });
    }
    const desc=`${c.type==="line"?"折線圖":"長條圖"}：`+se.map(s=>`${s.name||""} `+x.map((t,i)=>`${t} ${s.data&&s.data[i]!=null?fmtNum(s.data[i]):"沒有資料"}`).join("、")).join("；");
    return `<svg class="qchart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(desc)}" xmlns="http://www.w3.org/2000/svg" font-family="Microsoft JhengHei,PingFang TC,Noto Sans TC,sans-serif">${b}</svg>`;
  };

  /* ====================== 第三單元 水溶液 ====================== */
  const lines2=(s,max)=>{ s=String(s||""); if(s.length<=max) return [s]; const k=Math.ceil(s.length/2); return [s.slice(0,k),s.slice(k)]; };
  const nameAt=(x,y,s,max=4,size=13)=>lines2(s,max).map((t,k,a)=>txt(x,y+(k-(a.length-1)/2)*(size+3),t,{size})).join("");

  /* 10. 石蕊試紙：每一種水溶液滴在藍色、紅色石蕊試紙上的結果（上排藍色、下排紅色，和課本 p.73 一樣）。
        items:[{lab:"甲"（或 name:"醋"）, res:"acid"|"neutral"|"base"}]（最多 6 個）；
        paper："both"（預設）／"blue"（只畫藍色試紙）／"red"（只畫紅色試紙）；blank:true 只畫試紙、不畫結果。
        顏色規則：酸性讓藍色試紙變紅、紅色不變；鹼性讓紅色試紙變藍、藍色不變；中性兩種都不變。 */
  F.litmus=p=>{
    const items=(p.items||[]).slice(0,6), rows=p.paper==="blue"?["blue"]:p.paper==="red"?["red"]:["blue","red"];
    const n=Math.max(1,items.length), cw=80, W=Math.max(380,116+n*cw+12), L=116+(W-(116+n*cw+12))/2, top=54, rh=58, H=top+rows.length*rh+34;
    const PAPER={blue:"#9CC3EC",red:"#F3B0B0"}, SPOT={blue:"#D9414E",red:"#2F62C9"};
    let b=`<rect width="${W}" height="${H}" fill="${C.bg}"/>`;
    items.forEach((it,i)=>{ const cx=L+cw*i+cw/2; b+=it.lab?badge(cx,26,it.lab):nameAt(cx,26,it.name,4,14); });
    rows.forEach((r,j)=>{ const y=top+j*rh+8;
      b+=txt(L-106,y+14,r==="blue"?"藍色石蕊試紙":"紅色石蕊試紙",{size:14,anchor:"start"});
      items.forEach((it,i)=>{ const x=L+cw*i+8, w=cw-16;
        b+=`<rect x="${x}" y="${y}" width="${w}" height="28" rx="3" fill="${PAPER[r]}" stroke="${C.muted}" stroke-width="1.2"/>`;
        if(!p.blank){ const ch=(r==="blue"&&it.res==="acid")||(r==="red"&&it.res==="base");
          b+=`<ellipse cx="${x+w/2}" cy="${y+14}" rx="16" ry="10" fill="${ch?SPOT[r]:PAPER[r]}" stroke="#55606A" stroke-width="1.4" stroke-dasharray="3 2"/>`; } }); });
    b+=txt(W/2,H-12,p.blank?"（示意圖：還沒滴水溶液的試紙）":"（示意圖：虛線圈是滴上水溶液的地方）",{size:12,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"水溶液滴在石蕊試紙上的結果");
  };

  /* 11. 紫色高麗菜汁：試管裡的顏色。tubes:[{lab（或 name）, res:"acid"|"neutral"|"base"|"base-green"}]（最多 7 支）；
        juice:true 在最左邊多畫一支「紫色高麗菜汁」。
        顏色依課本 p.75、p.83：酸性偏紅、中性偏紫、鹼性偏藍綠（base，例如小蘇打水）或偏綠（base-green，例如肥皂水）。 */
  F.cabbage=p=>{
    const COL={acid:"#E2557F",neutral:"#8A5BB8",base:"#3A9AA8","base-green":"#5AAA4A",juice:"#7B4FA6"};
    const all=(p.juice?[{name:"紫色高麗菜汁",res:"juice"}]:[]).concat((p.tubes||[]).slice(0,7));
    const cw=72, W=Math.max(320,all.length*cw+40), H=262, x0=(W-all.length*cw)/2;
    let b=`<rect width="${W}" height="${H}" fill="${C.bg}"/>`;
    all.forEach((t,i)=>{ const cx=x0+cw*i+cw/2, top=34, bot=186, r=15, col=COL[t.res]||"#ddd";
      b+=`<path d="M${cx-r} ${top+56} V${bot-r} A${r} ${r} 0 0 0 ${cx+r} ${bot-r} V${top+56} Z" fill="${col}"/>`;
      b+=`<path d="M${cx-r} ${top} V${bot-r} A${r} ${r} 0 0 0 ${cx+r} ${bot-r} V${top}" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`+line(cx-r-6,top,cx+r+6,top,C.ink,3);
      b+=t.lab?badge(cx,bot+24,t.lab):nameAt(cx,bot+26,t.name,3,13); });
    b+=txt(W/2,H-10,p.juice?"（示意圖：最左邊是紫色高麗菜汁，其他是滴入後的顏色）":"（示意圖：滴入紫色高麗菜汁後的顏色）",{size:12,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"滴入紫色高麗菜汁後試管裡的顏色");
  };

  /* 12. 導電測試：電池盒、LED、兩條電線放進燒杯裡的水溶液（課本 p.79 的裝置）。
        on:true/false（LED 亮不亮）；lab：燒杯上的代號；name：燒杯裡寫的水溶液名稱（可省略）；
        legs:"ok"（預設：長腳接電池正極出來的電線）／"reversed"（長腳接到負極那一邊）；showLegs:true 標出長腳、短腳；
        touch:true 燒杯裡兩條電線碰在一起（錯誤的做法）。 */
  F.led=p=>{
    const W=460,H=280, on=!!p.on, rev=p.legs==="reversed";
    let b=`<rect width="${W}" height="${H}" fill="${C.bg}"/>`;
    /* 電池盒 */
    b+=`<rect x="300" y="40" width="130" height="44" rx="6" fill="#2B2B2B"/>`+`<rect x="310" y="48" width="52" height="28" rx="12" fill="#C8642A"/><rect x="366" y="48" width="52" height="28" rx="12" fill="#C8642A"/>`;
    b+=txt(302,28,"＋",{size:20,w:900,fill:"#C62828"})+txt(428,28,"－",{size:22,w:900})+txt(365,24,"電池盒",{size:13});
    /* LED：長腳在左、短腳在右 */
    const lx=90, ly=70, legL=[lx-8,ly+18,lx-8,ly+78], legS=[lx+8,ly+18,lx+8,ly+60];
    if(on){ for(let i=0;i<8;i++){ const a=i*Math.PI/4; b+=line(lx+Math.cos(a)*22,ly+Math.sin(a)*22,lx+Math.cos(a)*32,ly+Math.sin(a)*32,"#F2B705",3); }
      b+=`<circle cx="${lx}" cy="${ly}" r="20" fill="#FFE58A" opacity=".75"/>`; }
    b+=`<path d="M${lx-12} ${ly+18} V${ly} A12 12 0 0 1 ${lx+12} ${ly} V${ly+18} Z" fill="${on?"#FF4D4D":"#E8B4B4"}" stroke="${C.ink}" stroke-width="2"/>`;
    b+=line(...legL,"#888",3)+line(...legS,"#888",3);
    if(p.showLegs){ b+=txt(lx-38,ly+70,"長腳",{size:13})+txt(lx+38,ly+56,"短腳",{size:13}); }
    b+=txt(lx,ly-34,"LED",{size:14});
    /* 燒杯與水溶液 */
    const bx=150,by=150,bw=130,bh=100;
    b+=`<rect x="${bx}" y="${by+30}" width="${bw}" height="${bh-30}" fill="#CFE8F6" opacity=".9"/>`;
    b+=`<path d="M${bx} ${by} V${by+bh} H${bx+bw} V${by}" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`;
    if(p.name) b+=txt(bx+bw/2,by+bh-16,p.name,{size:14});
    if(p.lab) b+=badge(bx+bw+22,by+bh-18,p.lab);
    const e1=bx+38, e2=bx+bw-38, eb=by+bh-34;
    if(p.touch){ b+=line(e1,by-6,e1,eb-14,"#B87333",4)+line(e1,eb-14,bx+bw/2,eb,"#B87333",4)+line(e2,by-6,e2,eb-14,"#B87333",4)+line(e2,eb-14,bx+bw/2,eb,"#B87333",4); }
    else{ b+=line(e1,by-6,e1,eb,"#B87333",4)+line(e2,by-6,e2,eb,"#B87333",4); }
    /* 電線：正極（紅）→ LED 一隻腳；LED 另一隻腳 → 左邊電線；負極（黑）→ 右邊電線 */
    const toPos=rev?legS:legL, toBeaker=rev?legL:legS;
    b+=`<path d="M300 62 C 250 62, 200 12, ${toPos[0]} 12 L ${toPos[0]} ${toPos[1]}" fill="none" stroke="#D32F2F" stroke-width="3"/>`;
    b+=`<path d="M${toBeaker[2]} ${toBeaker[3]} C ${toBeaker[2]} ${toBeaker[3]+40}, ${e1} ${by-60}, ${e1} ${by-6}" fill="none" stroke="#333" stroke-width="3"/>`;
    b+=`<path d="M430 62 C 470 62, 450 ${by-40}, ${e2} ${by-40} L ${e2} ${by-6}" fill="none" stroke="#333" stroke-width="3"/>`;
    b+=txt(W/2,H-10,"（導電測試的示意圖：紅線接電池正極、黑線接負極）",{size:12,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"用 LED 測試水溶液導電性的裝置");
  };

  /* 13. 電子秤（溶解前後的重量，課本 p.65）：items:[{lab, state:"before"|"after"|"water", g:數字}]（最多 3 台）。
        before：燒杯裝水＋旁邊紙上有一堆食鹽；after：食鹽已倒進燒杯溶解（看不見顆粒），紙是空的；water：只有燒杯裝水。
        g：螢幕上的數字（公克重）；省略時顯示「?」。 */
  F.weigh=p=>{
    const items=(p.items||[]).slice(0,3), n=Math.max(1,items.length), cw=170, W=n*cw+20, H=230;
    let b=`<rect width="${W}" height="${H}" fill="${C.bg}"/>`;
    items.forEach((it,i)=>{ const x=10+i*cw, cx=x+cw/2;
      b+=`<path d="M${x+12} 190 L${x+24} 140 H${x+cw-24} L${x+cw-12} 190 Z" fill="#D7DBDE" stroke="${C.ink}" stroke-width="2"/>`;
      b+=`<rect x="${x+20}" y="132" width="${cw-40}" height="10" rx="4" fill="#B9C0C5" stroke="${C.ink}" stroke-width="2"/>`;
      b+=`<rect x="${cx-34}" y="156" width="68" height="24" rx="3" fill="#2F3B2F"/>`+`<text x="${cx}" y="169" font-size="17" font-weight="700" fill="#9CFF8A" text-anchor="middle" dominant-baseline="middle" font-family="Consolas,monospace">${esc(it.g==null?"?":it.g)}</text>`;
      /* 燒杯 */
      const bx=x+30, bw=58;
      b+=`<rect x="${bx}" y="92" width="${bw}" height="40" fill="#CFE8F6"/>`+`<path d="M${bx} 70 V132 H${bx+bw} V70" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`;
      /* 紙與食鹽 */
      if(it.state!=="water"){ b+=`<path d="M${x+100} 131 L${x+106} 122 H${x+144} L${x+150} 131 Z" fill="#F7C6D9" stroke="${C.ink}" stroke-width="1.5"/>`;
        if(it.state==="before") b+=`<path d="M${x+112} 124 Q${x+125} 106 ${x+138} 124 Z" fill="#fff" stroke="#999" stroke-width="1.5"/>`; }
      if(it.lab) b+=badge(cx,24,it.lab);
      b+=txt(cx,210,it.state==="before"?"食鹽還在紙上":it.state==="after"?"食鹽已攪拌溶解":"只有燒杯和水",{size:13,w:400}); });
    b+=txt(W/2,H-4,"（示意圖：螢幕數字的單位是公克重）",{size:11,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"電子秤測量重量的示意圖");
  };

  /* ====================== 第四單元 力與運動 ====================== */
  /* 14. 彈簧和直尺：支架上掛著彈簧，最左邊是直尺（0 在上面，單位公分），彈簧上端對齊 0。
        items:[{lab, n:砝碼個數, len:彈簧總長度（公分）}]（最多 3 條；len 省略時＝base＋per×n，base 預設 4.5、per 預設 1.1）；
        show:true 在彈簧旁邊寫出總長度。每個砝碼都一樣重（題目自己寫幾公克重）。 */
  F.spring=p=>{
    const items=(p.items||[{n:0}]).slice(0,3), base=p.base==null?4.5:p.base, per=p.per==null?1.1:p.per, k=17, top=46, maxCm=14;
    const lens=items.map(it=>it.len==null?base+per*(it.n||0):it.len);
    const W=Math.max(360,110+items.length*110), H=top+Math.max(maxCm*k+10,...items.map((it,i)=>lens[i]*k+(it.n||0)*20+24))+56;
    let b=`<rect width="${W}" height="${H}" fill="${C.bg}"/>`+line(10,top-16,W-10,top-16,C.ink,5);
    /* 直尺 */
    b+=`<rect x="24" y="${top}" width="46" height="${maxCm*k+10}" rx="3" fill="#F4F4F0" stroke="${C.ink}" stroke-width="1.5"/>`;
    for(let c=0;c<=maxCm*10;c++){ const y=top+c*k/10, big=c%10===0, mid=c%5===0;
      b+=line(70,y,70-(big?14:mid?10:6),y,C.ink,big?1.6:1);
      if(big) b+=`<text x="34" y="${y}" font-size="11" fill="${C.ink}" text-anchor="middle" dominant-baseline="middle">${c/10}</text>`; }
    b+=txt(47,top+maxCm*k+24,"公分",{size:12});
    const x0=130+(W-(110+items.length*110))/2;
    items.forEach((it,i)=>{ const x=x0+i*110, len=lens[i], y1=top, y2=top+len*k;
      b+=line(x,top-16,x,top,C.ink,2);
      /* 線圈 */
      let d=`M${x} ${y1}`; const turns=14; for(let t=1;t<=turns;t++){ const yy=y1+(y2-y1)*t/turns; d+=` L${x+(t%2?9:-9)} ${yy-(y2-y1)/turns/2} L${x} ${yy}`; }
      b+=`<path d="${d}" fill="none" stroke="#6C7A86" stroke-width="2.5"/>`;
      b+=line(x-60,y2,x-14,y2,C.muted,1.2,"4 3");
      for(let w=0;w<(it.n||0);w++){ const wy=y2+8+w*20; b+=line(x,wy-8,x,wy,C.ink,1.5)+`<rect x="${x-12}" y="${wy}" width="24" height="14" rx="3" fill="#B0B6BB" stroke="${C.ink}" stroke-width="1.5"/>`; }
      if(it.lab) b+=badge(x+30,top+6,it.lab);
      if(p.show) b+=txt(x+38,y2,`${len} 公分`,{size:13}); });
    b+=txt(W/2,H-10,"（示意圖：彈簧上端對齊直尺的 0，虛線對到彈簧下端）",{size:12,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"彈簧掛砝碼和直尺的示意圖");
  };

  /* 15. 彈簧秤（直立，像課本 p.92）：max 最大刻度（預設 250）、step 寫數字的間隔（預設 50）、minor 小刻度（預設 10）、val 指針位置；
        load："weight"（下面掛東西，預設）／"hand"（手往下拉）／"none"；
        eyes:true 在右邊畫三個眼睛（依序：比指針高／和指針一樣高／比指針低），代號用 lab。 */
  F.springscale=p=>{
    const max=p.max||250, step=p.step||50, minor=p.minor||10, val=Math.max(0,Math.min(max,p.val||0));
    const W=p.eyes?400:300, H=456, bx=110, bw=56, sy=80, sh=260, Y=v=>sy+v/max*sh;
    let b=`<rect width="${W}" height="${H}" fill="${C.bg}"/>`+line(20,22,W-20,22,C.ink,5);
    b+=`<path d="M${bx+bw/2} 22 V36" stroke="${C.ink}" stroke-width="3"/><rect x="${bx+bw/2-14}" y="36" width="28" height="22" rx="10" fill="none" stroke="${C.ink}" stroke-width="3"/>`;
    b+=`<rect x="${bx}" y="56" width="${bw}" height="${sh+50}" rx="6" fill="#F6D24A" stroke="${C.ink}" stroke-width="2"/>`;
    b+=`<rect x="${bx+bw/2-7}" y="${sy-14}" width="14" height="${sh+22}" rx="5" fill="#FBEBB0" stroke="#C9A43A" stroke-width="1"/>`;
    { const y1=sy-12, y2=Y(val)-3, t=Math.max(6,Math.round((y2-y1)/7)); let d=`M${bx+bw/2} ${y1}`;
      for(let i=1;i<=t;i++){ const yy=y1+(y2-y1)*i/t; d+=` L${bx+bw/2+(i%2?5:-5)} ${yy-(y2-y1)/t/2} L${bx+bw/2} ${yy}`; }
      b+=`<path d="${d}" fill="none" stroke="#8C5A2B" stroke-width="2.2"/>`; }
    for(let v=0;v<=max+1e-9;v+=minor){ const y=Y(v), big=Math.abs(v/step-Math.round(v/step))<1e-9;
      b+=line(bx+6,y,bx+(big?20:13),y,C.ink,big?1.8:1.1);
      if(big) b+=`<text x="${bx-8}" y="${y}" font-size="14" font-weight="700" fill="${C.ink}" text-anchor="end" dominant-baseline="middle">${v}</text>`; }
    b+=`<rect x="${bx+bw/2-10}" y="${Y(val)-3}" width="20" height="6" fill="#E53935" stroke="#fff" stroke-width="1"/>`;
    b+=txt(bx+bw/2,56+sh+38,`${max}g`,{size:12});
    b+=line(bx+bw/2,56+sh+50,bx+bw/2,56+sh+66,C.ink,3)+`<path d="M${bx+bw/2} ${56+sh+66} q 0 14 -10 14 q -8 0 -8 -8" fill="none" stroke="${C.ink}" stroke-width="3"/>`;
    const ly=56+sh+80;
    if((p.load||"weight")==="weight"&&val>0) b+=`<rect x="${bx+bw/2-16}" y="${ly}" width="32" height="20" rx="4" fill="#B0B6BB" stroke="${C.ink}" stroke-width="2"/>`;
    if(p.load==="hand") b+=ray(bx+bw/2+40,ly-10,bx+bw/2+40,ly+20,C.ray)+txt(bx+bw/2+70,ly+4,"手往下拉",{size:13});
    b+=txt(36,Y(max/2),"公克重",{size:13});
    if(p.eyes){ const lab=p.lab||["甲","乙","丙"], py=Y(val), ex=W-70;
      [py-60,py,py+60].forEach((ey,i)=>{ b+=`<ellipse cx="${ex}" cy="${ey}" rx="16" ry="9" fill="#fff" stroke="${C.ink}" stroke-width="2"/><circle cx="${ex-6}" cy="${ey}" r="5" fill="${C.ink}"/>`;
        b+=line(ex-18,ey,bx+bw/2+10,py,C.muted,1.5,"5 4")+badge(ex+32,ey,lab[i]); }); }
    b+=txt(W/2,H-8,"（示意圖：紅色是指針）",{size:12,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"彈簧秤的示意圖");
  };

  /* 16. 模擬拔河（課本 p.95）：桌面中線、中間一根迴紋針，左右各用一個彈簧秤拉。
        left、right：兩邊的拉力（公克重，會寫在彈簧秤下面）；labs：左右兩方的名稱（預設 ["甲","乙"]）。 */
  F.tug=p=>{
    const W=500,H=200, L=p.left||0, R=p.right||0, labs=p.labs||["甲","乙"], max=p.max||250, cy=96;
    let b=`<rect width="${W}" height="${H}" fill="#F3EBDD"/>`;
    b+=line(250,30,250,170,"#D32F2F",2,"6 5")+txt(250,20,"中心線",{size:13,fill:"#C62828"});
    b+=`<rect x="214" y="${cy-9}" width="72" height="18" rx="9" fill="none" stroke="#7B8794" stroke-width="3"/><rect x="224" y="${cy-5}" width="52" height="10" rx="5" fill="none" stroke="#7B8794" stroke-width="2.5"/>`+line(250,cy-12,250,cy+12,C.ink,2);
    const scale=(x0,dir,v,name)=>{ const x1=x0+dir*150, bl=Math.min(x0,x1);
      let s=`<rect x="${bl}" y="${cy-14}" width="150" height="28" rx="5" fill="#F6D24A" stroke="${C.ink}" stroke-width="2"/>`;
      for(let t=0;t<=max;t+=10){ const xx=x0+dir*(10+t/max*130), big=t%50===0; s+=line(xx,cy-14,xx,cy-14+(big?9:5),C.ink,1);
        if(big&&p.nums===false) s+=`<text x="${xx}" y="${cy+9}" font-size="9" fill="${C.ink}" text-anchor="middle">${t}</text>`; }
      const px=x0+dir*(10+Math.min(v,max)/max*130); s+=`<rect x="${px-2.5}" y="${cy-6}" width="5" height="18" fill="#E53935"/>`;
      s+=line(x0,cy,x0-dir*0,cy,C.ink,2)+ray(x1,cy,x1+dir*34,cy,C.ray,3.5);
      s+=txt(bl+75,cy+32,p.nums===false?"彈簧秤":`拉力 ${v} 公克重`,{size:14})+txt(x1+dir*20,cy-28,name,{size:16,w:900});
      return s; };
    b+=scale(212,-1,L,labs[0])+scale(288,1,R,labs[1]);
    b+=txt(W/2,H-10,"（俯視示意圖：手先壓住迴紋針，再同時用兩個彈簧秤往兩邊拉）",{size:12,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"兩個彈簧秤拉迴紋針的示意圖");
  };

  /* 17. 拉盒子（摩擦力實驗，課本 p.97）：rows:[{lab, surf:"smooth"|"sand"|"towel", g:彈簧秤讀數（可省略）}]（最多 3 列）。
        每一列：桌面（光滑／鋪砂紙／鋪毛巾）上放一個裝砝碼的盒子，用彈簧秤往右拉。 */
  F.friction=p=>{
    const rows=(p.rows||[]).slice(0,3), rh=96, W=500, H=rows.length*rh+30;
    const SURF={smooth:["#E9E4D8","光滑桌面"],sand:["#C9A46A","鋪砂紙"],towel:["#BFD7EA","鋪毛巾"]};
    let b=`<rect width="${W}" height="${H}" fill="${C.bg}"/>`;
    rows.forEach((r,i)=>{ const y=10+i*rh, sy=y+64, s=SURF[r.surf]||SURF.smooth;
      b+=`<rect x="40" y="${sy}" width="440" height="14" fill="${s[0]}" stroke="${C.ink}" stroke-width="1.5"/>`;
      if(r.surf==="sand") for(let k=0;k<110;k++) b+=`<circle cx="${44+(k*37)%432}" cy="${sy+3+(k*7)%9}" r="1.3" fill="#6B4E2A"/>`;
      if(r.surf==="towel") for(let k=0;k<44;k++) b+=line(44+k*10,sy,44+k*10,sy-4,"#7FA7C9",2);
      b+=txt(440,sy+30,s[1],{size:13});
      b+=`<rect x="70" y="${y+24}" width="90" height="40" rx="3" fill="#F7E7C6" stroke="${C.ink}" stroke-width="2"/>`;
      for(let k=0;k<3;k++) b+=`<rect x="${80+k*26}" y="${y+40}" width="20" height="20" rx="3" fill="#B0B6BB" stroke="${C.ink}" stroke-width="1.2"/>`;
      b+=line(160,y+44,200,y+44,C.ink,2)+`<rect x="200" y="${y+32}" width="140" height="24" rx="5" fill="#F6D24A" stroke="${C.ink}" stroke-width="2"/>`;
      b+=ray(340,y+44,400,y+44,C.ray,3.5)+txt(420,y+44,"拉",{size:14});
      if(r.g!=null) b+=txt(270,y+20,`彈簧秤 ${r.g} 公克重`,{size:14});
      if(r.lab) b+=badge(30,y+44,r.lab); });
    b+=txt(W/2,H-8,"（示意圖：每個盒子都放一樣多的砝碼）",{size:12,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"用彈簧秤拉盒子的示意圖");
  };

  /* 18. 盪秋千：三個位置（依序：左邊最高點／最低點／右邊最高點），代號用 lab。 */
  F.swing=p=>{
    const lab=p.lab||["甲","乙","丙"], W=420, H=280, px=210, py=34, Lr=170, A=[-46,0,46];
    let b=`<rect width="${W}" height="${H}" fill="#F4FAFF"/>`+`<rect x="0" y="246" width="${W}" height="34" fill="${C.ground}" opacity=".5"/>`;
    b+=line(70,34,350,34,"#8D6E63",8)+line(80,34,40,246,"#8D6E63",6)+line(340,34,380,246,"#8D6E63",6);
    b+=`<path d="M${px+Lr*Math.sin(-50*Math.PI/180)} ${py+Lr*Math.cos(50*Math.PI/180)} A ${Lr} ${Lr} 0 0 0 ${px+Lr*Math.sin(50*Math.PI/180)} ${py+Lr*Math.cos(50*Math.PI/180)}" fill="none" stroke="${C.muted}" stroke-width="2" stroke-dasharray="6 5"/>`;
    A.forEach((a,i)=>{ const r=a*Math.PI/180, sx=px+Lr*Math.sin(r), sy=py+Lr*Math.cos(r);
      b+=line(px,py,sx,sy,"#555",2.5)+`<rect x="${sx-18}" y="${sy-4}" width="36" height="9" rx="3" fill="#D84315"/>`;
      b+=`<circle cx="${sx}" cy="${sy-24}" r="11" fill="#FCE2C4" stroke="${C.ink}" stroke-width="2"/>`+line(sx,sy-13,sx,sy-3,C.ink,3);
      b+=badge(sx+(i===1?0:(a<0?-30:30)),sy+(i===1?30:14),lab[i]); });
    b+=txt(W/2,H-10,"（示意圖：同一次擺盪的三個位置）",{size:12,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"盪秋千的三個位置");
  };

  /* 19. 溜滑梯：三個位置（依序：最高處／滑到中間／滑到最下面），代號用 lab。 */
  F.slide=p=>{
    const lab=p.lab||["甲","乙","丙"], W=440, H=270;
    let b=`<rect width="${W}" height="${H}" fill="#F4FAFF"/>`+`<rect x="0" y="232" width="${W}" height="38" fill="${C.ground}" opacity=".5"/>`;
    b+=line(70,70,70,232,"#8D6E63",5)+line(100,70,100,232,"#8D6E63",5);
    for(let y=90;y<232;y+=22) b+=line(70,y,100,y,"#8D6E63",4);
    b+=`<rect x="64" y="62" width="44" height="10" fill="#8D6E63"/>`;
    const P=t=>[106+t*290, 66+166*(t*t*(3-2*t))];
    let d="M106 66"; for(let t=0.05;t<=1.0001;t+=0.05){ const [x,y]=P(t); d+=` L${x} ${y}`; }
    b+=`<path d="${d} L410 232" fill="none" stroke="#E53935" stroke-width="9" stroke-linecap="round"/>`;
    [0,0.5,1].forEach((t,i)=>{ const [x,y]=P(t);
      b+=`<circle cx="${x}" cy="${y-24}" r="11" fill="#FCE2C4" stroke="${C.ink}" stroke-width="2"/>`+line(x,y-13,x,y-4,C.ink,3);
      b+=badge(x+(i===2?0:26),y-(i===2?52:44),lab[i]); });
    b+=txt(W/2,H-10,"（示意圖：同一個人從滑梯上滑下來的三個位置）",{size:12,w:400,fill:C.muted});
    return svg(`0 0 ${W} ${H}`,b,"溜滑梯的三個位置");
  };

  /* 20. 一般題也可以放統計圖：{type:"chart", chart:{同第 9 種的格式}} */
  F.chart=p=>chart(p.chart||{});

  window.QFIG={render:p=>{ const f=F[p&&p.type]; return f?f(p):""; }, chart, types:Object.keys(F)};
})();
