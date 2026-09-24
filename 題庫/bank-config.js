/* ==========================================================
   自然線上題庫 — 設定檔（老師要加題、加單元、加評量時改這裡）

   怎麼擴充：
   1. 加題目：在 questions/ 的檔案裡用 QBANK_ADD([...]) 加進去。
      每一題的 id 一定要「唯一、而且以後都不要改」（例：u1-shadow-25），
      學生的練習紀錄是用 id 記的，改了 id 那一題的紀錄就會對不上。
      刪題目沒關係：學生紀錄裡找不到的 id 會被略過、但不會被刪掉。
   2. 加單元：在下面 units 加一個單元（含 topics），
      再新增 questions/u3.js，並在 index.html 的 <script> 清單加一行。
   3. 加評量：在 exams 加一筆（例：第二次評量 units:["u3","u4"]），
      首頁就會多一個可以選的評量範圍；模擬考只從該範圍出題。

   題目格式（一題一個物件）：
   { id:"u1-shadow-01", topic:"u1-shadow", type:"single" 或 "tf",
     diff:1(基礎)/2(進階)/3(挑戰), q:"題目",
     opts:["選項",...]（單選題；是非題不用）, ans: 單選＝正確選項的索引（從 0 算）；是非＝1(○) 或 0(╳),
     exp:"解析", src:"課本 p.13",
     img:"照片代號"（看 questions/photos.js，可省略）, cap:"照片說明"（可省略）,
     fig:{type:"shadow",...}（示意圖，看 figures.js，可省略） }
   ========================================================== */
window.BANK = {
  title: "自然線上題庫",
  storageKey: "pig-sci-bank",          /* 所有評量共用一份紀錄；不要改，改了學生的舊紀錄就讀不到 */
  photoRoot: "../",                    /* 照片路徑相對於網站根目錄 */
  units: [
    { id: "u1", name: "第一單元 太陽與光", topics: [
      { id: "u1-shadow",     name: "影子與太陽的位置",     pages: "課本 12–13" },
      { id: "u1-altitude",   name: "太陽高度角與測量",     pages: "課本 14–17" },
      { id: "u1-seasons",    name: "四季的太陽變化",       pages: "課本 18–21" },
      { id: "u1-refraction", name: "光的折射",             pages: "課本 22–23" },
      { id: "u1-rainbow",    name: "美麗的彩虹",           pages: "課本 24–25" },
      { id: "u1-lens",       name: "放大鏡的聚光與成像",   pages: "課本 26–27" },
      { id: "u1-sundial",    name: "用太陽來計時：日晷",   pages: "課本 28–29" }
    ]},
    { id: "u2", name: "第二單元 植物世界", topics: [
      { id: "u2-water",    name: "植物體內水的運輸",     pages: "課本 34–39" },
      { id: "u2-levels",   name: "組成植物體的層次",     pages: "課本 40–41" },
      { id: "u2-organs",   name: "多功能的營養器官",     pages: "課本 42–45" },
      { id: "u2-flower",   name: "繁殖器官的功能",       pages: "課本 46–47" },
      { id: "u2-disperse", name: "果實和種子的傳播方式", pages: "課本 48–51" },
      { id: "u2-vegrepro", name: "營養器官的繁殖",       pages: "課本 52–53" },
      { id: "u2-human",    name: "植物與人類生活",       pages: "課本 54–57" },
      { id: "u2-family",   name: "植物家族",             pages: "課本 58–59" }
    ]}
  ],
  exams: [
    /* size：模擬考題數；mix：各難度題數（加起來＝size） */
    { id: "exam1", name: "第一次評量", units: ["u1", "u2"], size: 25, mix: { 1: 10, 2: 10, 3: 5 } }
  ]
};

/* 題目與照片清單由 questions/*.js 加進來 */
window.QBANK = [];
window.QBANK_ADD = function (list) { Array.prototype.push.apply(window.QBANK, list); };
window.QPHOTOS = {};
