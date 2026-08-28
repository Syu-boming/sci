# 「植物醫生」遊戲美術素材生成指示書（給 Codex）

## 0. 你的角色與任務範圍

你是本專案的**遊戲美術素材生成代理**。請使用你的圖像生成能力（gpt-image-2）產生下列所有素材。

**你只負責素材，請勿做以下事情：**

- ❌ 不要撰寫或修改遊戲程式碼（index.html 由另一位工程師負責）
- ❌ 不要修改 `gameDesign.md` 或本文件
- ❌ 不要更動本文件指定的任何檔名與存放路徑
- ❌ 圖片內不得出現任何文字、字母、數字、浮水印、Logo

**你要交付的東西（詳見第 6 節）：**

1. `./assets/` 資料夾內的全部 PNG 圖檔（檔名必須與本文件完全一致）
2. `./assets/manifest.json`（素材清單與生成狀態）
3. `./assets/preview.html`（素材預覽頁，供人工驗收）
4. 完成報告（直接回覆即可）

---

## 1. 產出清單總覽

### 核心素材（必做，共 19 張）

| # | 檔名 | 內容 | 尺寸 | 背景 |
|---|------|------|------|------|
| 1 | `bg-clinic.png` | 主場景背景：溫馨植物診所 | 1536×1024 | 不透明（淺色） |
| 2 | `mascot-doctor.png` | 植物醫生吉祥物 | 1024×1024 | 透明 |
| 3 | `plant-healthy.png` | 健康植物（**風格基準圖**，兼康復圖） | 1024×1024 | 透明 |
| 4 | `plant-sick-01-etiolated.png` | 病株①缺光：葉黃化、徒長傾斜 | 1024×1024 | 透明 |
| 5 | `plant-sick-02-wilted.png` | 病株②缺水：全株枯萎、土壤龜裂 | 1024×1024 | 透明 |
| 6 | `plant-sick-03-broken-stem.png` | 病株③向日葵倒伏折莖 | 1024×1024 | 透明 |
| 7 | `plant-sick-04-loose-roots.png` | 病株④根部鬆動裸露、植株不穩 | 1024×1024 | 透明 |
| 8 | `plant-sick-05-pest.png` | 病株⑤葉片蟲蛀坑洞 | 1024×1024 | 透明 |
| 9 | `icon-part-root.png` | 部位圖示：根 | 1024×1024 | 透明 |
| 10 | `icon-part-stem.png` | 部位圖示：莖 | 1024×1024 | 透明 |
| 11 | `icon-part-leaf.png` | 部位圖示：葉 | 1024×1024 | 透明 |
| 12 | `icon-tool-watering-can.png` | 處置圖示：澆水壺 | 1024×1024 | 透明 |
| 13 | `icon-tool-sun.png` | 處置圖示：太陽（代表移到陽光下） | 1024×1024 | 透明 |
| 14 | `icon-tool-stake.png` | 處置圖示：支架 | 1024×1024 | 透明 |
| 15 | `icon-tool-trowel.png` | 處置圖示：培土小鏟 | 1024×1024 | 透明 |
| 16 | `icon-tool-spray.png` | 處置圖示：除蟲噴瓶 | 1024×1024 | 透明 |
| 17 | `ui-badge-success.png` | 康復成功勳章（打勾金牌） | 1024×1024 | 透明 |
| 18 | `ui-star.png` | 計分星星 | 1024×1024 | 透明 |
| 19 | `ui-btn-next.png` | 下一關按鈕（純圖形箭頭，無文字） | 1024×1024 | 透明 |

### 建議加值素材（強烈建議一併生成，共 4 張）

| # | 檔名 | 內容 | 理由 |
|---|------|------|------|
| 20 | `plant-healthy-sunflower.png` | 健康的向日葵 | 病株③是向日葵，康復動畫若切回一般盆栽會穿幫，需要專屬康復圖 |
| 21 | `ui-rank-1.png` | 等級徽章：實習醫生（銅色＋單片嫩芽） | 遊戲有「實習醫生→見習醫師→植物醫師」升級進度，用徽章呈現 |
| 22 | `ui-rank-2.png` | 等級徽章：見習醫師（銀色＋雙葉幼苗） | 同上 |
| 23 | `ui-rank-3.png` | 等級徽章：植物醫師（金色＋盛開花朵） | 同上 |

> 尺寸備註：若 gpt-image-2 不支援 1536×1024，背景圖可改用最接近的橫式尺寸；若只支援正方形，則以 1024×1024 生成，但構圖需預留安全區，確保置中裁切成 16:9 後主要元素不被切掉。

---

## 2. 全域風格規範（每一張都必須套用）

### 2.1 風格基準句（STYLE BLOCK）

原始需求（中文）：

> 扁平化向量插畫風、粗黑描邊、童書繪本風格、明亮飽和色彩、簡單圓潤造型、乾淨的淺色或透明背景、畫面中不要出現任何文字、統一色調。

生成用英文版（**每一張圖的 prompt 都必須以這段開頭，一字不改**）：

> Flat vector illustration, thick bold black outlines, children's picture-book style, bright saturated colors, simple rounded shapes, cute and friendly, clean minimal design, unified color palette. Absolutely no text, no letters, no numbers, no logos, no watermarks.

### 2.2 統一色板（色調定錨用）

圖像模型不會精準命中色碼，但請在整體色調上貼近以下色板，維持全套一致：

| 用途 | 色碼 |
|------|------|
| 主葉綠 | `#58B159` |
| 深綠（描影/深色葉） | `#2E7D4F` |
| 病葉黃 | `#E8D06B` |
| 枯萎棕 | `#A9744F` |
| 陶盆橘紅 | `#E17B5A` |
| 濕土棕 | `#7A4E32` |
| 乾土米 | `#C9A47C` |
| 陽光黃 | `#FFC93C` |
| 天空藍 | `#8FD3F4` |
| 奶油底色 | `#FDF6EC` |
| 珊瑚點綴 | `#FF7F66` |
| 描邊近黑 | `#1E1E1E` |

### 2.3 全域禁止與構圖規則

- 禁止：寫實照片風、3D 渲染、複雜漸層、雜訊材質、陰影過重、任何文字符號
- **植物一律不畫臉**（不加眼睛嘴巴）——這是科學教材，症狀要像圖鑑一樣清楚；全遊戲唯一的角色是吉祥物
- 每張圖只有一個主體，置中，四周保留約 8–12% 邊距，主體完整不裁切
- 透明背景素材：若工具支援透明背景參數請開啟；若不支援，改用純色 `#FDF6EC` 底並在 manifest 中註記 `"transparent": false`
- 所有植物圖的**陶盆造型、顏色必須一致**（同一個盆）；病株①②④⑤與健康基準圖必須是**同一種植物**（同葉形、同盆），玩家才能看出「同一株生病又康復」

---

## 3. 生成流程（依序執行，不可跳步）

1. **先生成 3 號 `plant-healthy.png`（風格基準圖）**，對照第 7 節檢查清單自檢，不合格就重生成，直到合格為止。
2. 之後每一張圖：
   - 若工具支援參考圖（image reference / edits），以 `plant-healthy.png` 作為風格參考來生成；
   - 若不支援，則在每張 prompt 中完整保留 STYLE BLOCK 與該素材規格中的外型描述（葉形、盆形、無臉等），不可省略。
3. 每生成一張，立即依第 7 節自檢：不合格就重生成，同一張最多重試 3 次；3 次仍不合格則保留最佳版本，在 manifest 標記 `"status": "needs-review"` 並寫明問題。
4. 全部完成後，製作 `manifest.json` 與 `preview.html`，並肉眼比對整套素材：線條粗細、色調、風格是否一致；發現風格飄移的個別圖，重生成該張（基準圖不動）。
5. 若圖像生成功能完全不可用：不要產生假圖，直接在完成報告中說明，並仍然交付 manifest（全部標 `"status": "failed"`），遊戲端會以 emoji/CSS 佔位。

---

## 4. 各素材詳細規格與 Prompt

以下每張的英文 prompt 可直接使用（開頭的 `[STYLE]` 代表第 2.1 節的英文 STYLE BLOCK，請完整代入）。

### 4.1 `bg-clinic.png` — 主場景背景

- **用途**：全遊戲固定背景，上方會疊放題目卡片、按鈕與文字。
- **必備特徵**：
  - 溫馨的植物診所室內＋窗外小花園感；整體淺色、低對比
  - **畫面中央大面積留白乾淨**（奶油色牆面），供 UI 疊放後文字仍清晰可讀
  - 無人物、無角色、無文字
- **Prompt**：

> [STYLE] A cozy warm plant clinic interior that feels like a sunny garden room: light cream wall, one big rounded window on the left showing blue sky and soft green hills, a few wooden shelves with small potted plants near the top corners, the edge of a light-wood table along the bottom, gentle sunlight. Composition rule: keep the center of the image plain, light and uncluttered (large empty cream wall area) so game UI cards can be overlaid. Soft low-contrast colors. No people, no animals, no characters. Wide landscape format.

### 4.2 `mascot-doctor.png` — 植物醫生吉祥物

- **用途**：出現在標題畫面、回饋對話框旁，是遊戲的講解者。
- **必備特徵**：擬人化小綠芽角色、白袍、聽診器、放大鏡、大眼微笑、全身、正面
- **Prompt**：

> [STYLE] A friendly plant-doctor mascot character: a cute round anthropomorphic green sprout with two small leaves on top of its head, big round eyes, rosy cheeks, warm open smile, wearing a small white doctor coat and a red stethoscope around the neck, holding a magnifying glass in one hand and waving with the other. Full body, standing, facing the viewer, centered with margin around. Transparent background.

### 4.3 `plant-healthy.png` — 健康植物（風格基準圖 ★最先生成）

- **用途**：①全套素材的風格基準；②病例 1、2、4、5 康復動畫的「康復後」圖。
- **必備特徵**：
  - 一株嫩綠盆栽：單一直立主莖、5–7 片寬圓橢圓形葉、葉脈是淺色細線
  - 頂端一朵小粉花（康復的喜悅感；病株版一律無花）
  - 濕潤深棕土壤、經典陶土盆（有盆沿）——**此盆與此葉形為全套統一規格**
  - 植株挺拔有精神；**不畫臉**
- **Prompt**：

> [STYLE] A healthy young potted plant, botanical and cute but with NO face: one strong upright green stem, six broad rounded oval green leaves with lighter vein lines, one small pink five-petal flower at the top, moist dark brown soil, classic terracotta clay pot with a rim. The plant looks perky, fresh and full of life. This exact plant design (same leaf shape, same pot) will be reused across a series of images. Centered, whole plant and pot fully visible with margin around. Transparent background.

### 4.4 `plant-sick-01-etiolated.png` — 病株①缺光（黃化徒長）

- **對應症狀**：「放在陰暗角落兩週，葉子變黃，莖又細又長還往一邊倒。」
- **必備特徵（一眼可辨）**：葉片偏黃、莖異常細長、整株明顯向一側傾倒；無花；同株同盆；不畫臉
- **Prompt**：

> [STYLE] The SAME potted plant design as the healthy reference (same terracotta pot, same rounded oval leaves, NO face) but sick from lack of sunlight: the leaves are pale yellow and slightly drooping, the stem is abnormally tall, thin and stretched, and the whole plant leans far to one side as if reaching for light. No flower. Soil normal brown. Centered, transparent background.

### 4.5 `plant-sick-02-wilted.png` — 病株②缺水（枯萎土裂）

- **對應症狀**：「葉子全部下垂枯萎，土壤又乾又硬還裂開。」
- **必備特徵**：所有葉片垂頭、色澤黃綠帶褐邊、整株無力；**土面淡米色、乾硬、有清楚裂縫**；同株同盆；無花；不畫臉
- **Prompt**：

> [STYLE] The SAME potted plant design as the healthy reference (same terracotta pot, same rounded oval leaves, NO face) but severely wilted from drought: every leaf hangs straight down, dull yellow-green with dry brown edges, the stem slumps weakly. The soil surface is pale beige, bone-dry and hard with clear visible crack lines. No flower. Centered, transparent background.

### 4.6 `plant-sick-03-broken-stem.png` — 病株③向日葵倒伏折莖

- **對應症狀**：「很高的向日葵被大風吹倒，莖彎折，上半部開始枯萎。」
- **必備特徵**：高大向日葵；**莖在中段明顯彎折、有折痕**；含花頭的上半部整個下垂、花瓣枯垂；下半段仍翠綠直立；大陶盆（同款盆型放大）；不畫臉
- **Prompt**：

> [STYLE] A tall sunflower in a large terracotta clay pot (same pot style as the series), botanical and cute but with NO face: the stem is sharply bent and folded at its middle like a broken straw with a visible crease, so the entire top half including the big sunflower head hangs downward, its yellow petals drooping and starting to wilt. The lower half of the stem and its leaves are still green and upright. Centered, transparent background.

### 4.7 `plant-sick-04-loose-roots.png` — 病株④根部鬆動裸露

- **對應症狀**：「植物搖搖晃晃站不穩，根部的土很鬆，還有幾條根露在外面。」
- **必備特徵**：整株傾斜不穩；盆內土壤鬆散塌陷、莖基部周圍有空隙；**數條米棕色的根裸露在土面上**；葉子仍綠（問題在根不在葉）；同株同盆；不畫臉
- **Prompt**：

> [STYLE] The SAME potted plant design as the healthy reference (same terracotta pot, same rounded oval leaves, NO face), tilting sideways and unstable: the soil in the pot is loose, crumbly and sunken with gaps around the base of the stem, and several beige-brown roots are exposed, sticking out above the soil surface. A few small soil crumbs are falling. The leaves are still green — the problem is at the roots. No flower. Centered, transparent background.

### 4.8 `plant-sick-05-pest.png` — 病株⑤葉片蟲蛀

- **對應症狀**：「葉子被蟲咬得坑坑洞洞，幾乎只剩葉脈。」
- **必備特徵**：葉片布滿不規則蟲洞、邊緣殘破；**其中 2–3 片只剩葉脈骨架**；一隻小巧可愛的綠色毛毛蟲停在葉上（唯一例外可有生物，但不擬人、不誇張）；植株略垂；同株同盆；不畫臉
- **Prompt**：

> [STYLE] The SAME potted plant design as the healthy reference (same terracotta pot, same rounded oval leaves, NO face) attacked by pests: the leaves are full of irregular bite holes with ragged edges, and two or three leaves are eaten down to only their vein skeletons. One small cute green caterpillar sits on one leaf. The plant droops slightly and looks weakened. No flower. Centered, transparent background.

### 4.9 `icon-part-root.png` — 部位圖示：根

- **用途**：步驟一「判斷部位」三選一的大按鈕圖示，需在小尺寸下一眼可辨，且不能與莖、葉混淆。
- **必備特徵**：土堆剖面＋主根＋大量分岔鬚根向下延伸；棕色／米色系
- **Prompt**：

> [STYLE] A simple bold icon of plant ROOTS: a small rounded mound of brown soil shown in cross-section, with one thick beige main taproot and many branching thinner rootlets spreading downward. Clear strong silhouette that instantly reads as "roots". No stem, no leaves above the soil. Single centered subject. Transparent background.

### 4.10 `icon-part-stem.png` — 部位圖示：莖

- **必備特徵**：一根粗壯的垂直綠莖、節上有小側芽；**不能有大片葉子、不能有根**，避免與另外兩個圖示混淆
- **Prompt**：

> [STYLE] A simple bold icon of a plant STEM: one thick vertical bright-green stalk standing straight like a sturdy pillar, with two tiny side shoots and small leaf buds at the nodes. No large leaves, no roots, no flower. Clear strong silhouette that instantly reads as "stem". Single centered subject. Transparent background.

### 4.11 `icon-part-leaf.png` — 部位圖示：葉

- **必備特徵**：單片寬圓綠葉＋短葉柄＋清楚的淺色葉脈
- **Prompt**：

> [STYLE] A simple bold icon of a single LEAF: one broad rounded green leaf with a short petiole and clean lighter vein lines. Clear strong silhouette that instantly reads as "leaf". Single centered subject. Transparent background.

### 4.12 `icon-tool-watering-can.png` — 處置圖示：澆水壺

> [STYLE] A simple bold icon of a cheerful sky-blue metal watering can, tilted forward, with three round water drops falling from the sprinkler head. Single centered subject. Transparent background.

### 4.13 `icon-tool-sun.png` — 處置圖示：太陽（＝移到陽光下）

> [STYLE] A simple bold icon of a bright warm yellow sun: a round center with thick rounded triangular rays radiating outward, cheerful and glowing. Single centered subject. Transparent background.

### 4.14 `icon-tool-stake.png` — 處置圖示：支架

- **必備特徵**：木棍＋綁帶＋被扶正的小綠莖，讓「支撐」的用途一眼看懂
- **Prompt**：

> [STYLE] A simple bold icon of a wooden garden stake: a vertical light-brown wooden stick with a small green plant stem tied to it by a soft green band, showing the stake supporting the plant upright. Single centered subject. Transparent background.

### 4.15 `icon-tool-trowel.png` — 處置圖示：培土小鏟

> [STYLE] A simple bold icon of a small garden hand trowel with a wooden handle and a metal scoop holding a small pile of dark brown soil. Single centered subject. Transparent background.

### 4.16 `icon-tool-spray.png` — 處置圖示：除蟲噴瓶

> [STYLE] A simple bold icon of a green trigger spray bottle spraying a fine mist of small droplets to one side, friendly-looking garden pest-control spray. Single centered subject. Transparent background.

### 4.17 `ui-badge-success.png` — 康復成功勳章

> [STYLE] A round golden medal badge with a scalloped rosette edge, two small red ribbon tails at the bottom, and a bold green check mark in the center. Shiny, celebratory, kid-friendly. Single centered subject. Transparent background.

### 4.18 `ui-star.png` — 計分星星

> [STYLE] A shiny golden five-pointed star with rounded tips and a small white sparkle highlight, thick black outline. Single centered subject. Transparent background.

### 4.19 `ui-btn-next.png` — 下一關按鈕

- **注意**：按鈕上**不得有文字**，只有箭頭圖形；中文「下一關」字樣將由 HTML 疊字或另外呈現。
- **Prompt**：

> [STYLE] A rounded pill-shaped bright green game button with a slightly darker green bottom edge for a soft 3D pressed look, and one bold white right-pointing arrow in the center. No text of any kind. Single centered subject. Transparent background.

### 4.20 `plant-healthy-sunflower.png` — 健康向日葵（建議）

- **用途**：病例③的康復圖（折莖向日葵治好後變回挺立的向日葵）。
- **必備特徵**：粗壯筆直的莖、大而明亮的黃花盤（棕色花心）、翠綠葉片；**同款大陶盆，必須與 4.6 的盆一致**；不畫臉
- **Prompt**：

> [STYLE] A tall healthy sunflower in a large terracotta clay pot (same pot as the broken-stem sunflower image), botanical and cute but with NO face: one thick straight sturdy green stem, one big bright yellow sunflower head with a round brown center facing the viewer, fresh green heart-shaped leaves. Perky, strong and full of life. Centered, transparent background.

### 4.21–4.23 `ui-rank-1/2/3.png` — 等級徽章（建議）

- **用途**：「實習醫生→見習醫師→植物醫師」升級進度顯示。**不得用數字區分**，用材質色與圖案區分。
- **Prompt（依序替換材質與圖案）**：

> [STYLE] A round BRONZE rank badge with a simple border, showing ONE tiny green sprout with a single leaf as the emblem in the center. Flat medal style. No text, no numbers. Single centered subject. Transparent background.

> [STYLE] A round SILVER rank badge with a simple border, showing a small green seedling with TWO leaves as the emblem in the center. Flat medal style. No text, no numbers. Single centered subject. Transparent background.

> [STYLE] A round GOLD rank badge with a laurel-style decorated border, showing a blooming pink flower with green leaves as the emblem in the center. Flat medal style. No text, no numbers. Single centered subject. Transparent background.

---

## 5. 音效說明

**不需要生成任何音效檔。** 遊戲的答對／答錯提示音將由工程師以 Web Audio API 在程式內合成。

---

## 6. 交付物規格

### 6.1 目錄結構

```
planDoctor/
├── gameDesign.md            ← 不可修改
├── codex-assets-brief.md    ← 本文件，不可修改
└── assets/
    ├── bg-clinic.png
    ├── mascot-doctor.png
    ├── plant-healthy.png
    ├── ...（其餘所有 PNG）
    ├── manifest.json
    └── preview.html
```

### 6.2 `manifest.json` 格式

每張素材一筆，依下列 schema：

```json
[
  {
    "file": "plant-healthy.png",
    "title_zh": "健康植物（風格基準圖）",
    "category": "plant",
    "size": "1024x1024",
    "transparent": true,
    "status": "ok",
    "notes": ""
  }
]
```

- `category`：`bg` / `mascot` / `plant` / `icon-part` / `icon-tool` / `ui`
- `status`：`ok`（合格）/ `needs-review`（重試 3 次仍有疑慮，notes 說明問題）/ `failed`（無法生成）
- `transparent`：實際是否為透明背景；若退回純色底請填 `false` 並在 notes 註明

### 6.3 `preview.html` 要求

- 純靜態單檔，直接以相對路徑 `<img>` 引用 assets 內所有圖
- 奶油色（`#FDF6EC`）頁面底、白色卡片網格排列；每張圖下方標示「檔名＋中文名稱」
- 透明圖需襯在**淺色與深色兩種底色**上各展示一次（檢查描邊與透明邊緣品質）
- 此頁僅供人工驗收，不是遊戲的一部分

### 6.4 完成報告（對話回覆）

- 成功生成清單（張數）
- `needs-review` / `failed` 清單與原因
- 重生成紀錄（哪幾張重試過、為什麼）
- 與本規格的任何偏差（例如尺寸不支援改用替代尺寸）

---

## 7. 每張圖的自檢清單（生成後立即檢查）

- [ ] 無任何文字、字母、數字、浮水印
- [ ] 粗黑描邊、扁平向量風、圓潤造型，與基準圖 `plant-healthy.png` 同風格同線寬
- [ ] 色調落在第 2.2 節色板範圍，整套一致
- [ ] 主體置中、完整不被裁切、四周留 8–12% 邊距
- [ ] 應透明的背景確實透明（或已依規則退回純色並記錄）
- [ ] 植物圖：不畫臉；同系列植物的葉形與陶盆一致
- [ ] 病株圖：該病例的**必備症狀特徵**全部到位且一眼可辨（見各素材規格）
- [ ] 圖示類：單一主體、輪廓清晰，縮小到 64px 仍可辨識
- [ ] 檔名與本文件完全一致（全小寫、kebab-case、.png）

## 8. 總驗收標準

- 核心 19 張全數生成（建議 4 張盡量完成），檔名正確、放在 `./assets/`
- 整套風格一致：並排看不出「不同批次」的感覺
- `manifest.json` 與 `preview.html` 齊備且正確
- 打開 `preview.html` 逐張檢查皆通過第 7 節清單
