# 豬豬的自然探索

放在 GitHub Pages 的自然科教學資源網站（南一版・五年級）。
首頁依**資源類型分區**呈現：📚 數位教材、📖 單元重點整理、📝 數位學習單。
純靜態（HTML / CSS / JS），不需建置流程即可上線。

## 目錄結構
教材本體依「單元 → 主題」放，每個主題最多三件套（互動教材 / 學習單 / 重點整理）：
```
.
├── index.html                 首頁（由 build_index.py 產生，三個類型分區）
├── build_index.py             首頁產生器：掃描各單元資料夾自動建卡片
├── .nojekyll                  關閉 Jekyll 處理
├── css/style.css             首頁共用樣式（.zone/.card/頁首…）
├── image/icon.svg            站標 / favicon
├── materials/                延伸工具（例：sun-path-explorer.html 3D 太陽路徑）
└── 第一單元 太陽與光/
    ├── 影子方位與太陽高度角/
    │   ├── …_互動教材.html
    │   ├── …_學習單.html
    │   └── …_重點整理.html
    ├── 太陽高度角的測量/          （無學習單）
    ├── 太陽高度角與四季/
    ├── 凸透鏡與凹透鏡/
    ├── 光的折射與彩虹/
    └── 補充教材 直立式與地平式日晷/
```
> 互動教材與學習單為自成一頁、內含樣式的獨立檔；重點整理頁（`…_重點整理.html`）
> 亦為獨立頁，先前由互動教材的「重點卡」抽出。

## 新增教材的流程
1. 在單元資料夾下建立主題子資料夾，放入檔案，檔名以
   `_互動教材.html`、`_學習單.html`、`_重點整理.html` 結尾（前綴＝主題名）。
2. 執行 `python build_index.py` → 首頁自動長出對應卡片（含正確網址編碼）。
   - 教學順序：編輯 `build_index.py` 裡的 `UNITS[...]["order"]` 清單；未列到的主題自動附加在後。
   - 新單元（例：第二單元 植物世界）＝在 `UNITS` 增加一筆，並建 `第二單元 植物世界/` 資料夾。

## 本機預覽
`python -m http.server 8000` 後開 `http://localhost:8000`
（中文路徑用伺服器預覽最穩，直接雙擊開啟 file:// 有時會受瀏覽器限制）。

## 部署到 GitHub Pages
1. `git init` → 建立 GitHub repo → push（不熟指令可用 GitHub Desktop）。
2. Repo Settings → Pages → 選 `main` 分支、`/root` → 取得網址。
3. 之後改完（記得先跑 `build_index.py`）再 push 即自動更新。

> 注意：本資料夾在 Google Drive 內。互動教材檔可達數百 KB，若遇 `.git` 同步異常，
> 可考慮將 repo 移出雲端同步資料夾。
