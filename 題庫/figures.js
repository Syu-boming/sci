/* ==========================================================
   題庫示意圖產生器（第一單元沒有照片，用參數畫示意圖）
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

  window.QFIG={render:p=>{ const f=F[p&&p.type]; return f?f(p):""; }, types:Object.keys(F)};
})();
