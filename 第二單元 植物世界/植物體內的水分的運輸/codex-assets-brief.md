# 「水滴大冒險」遊戲美術素材生成指示書（給 Codex）

> 本遊戲主題：植物「水分與養分的運輸」＋「光合作用」，給台灣國小五年級。
> 美術風格與同資料夾的〈植物醫生〉（`../planDoctor/`）完全一致，是同一套教材。

## 0. 你的角色與任務範圍

你是本專案的**遊戲美術素材生成代理**。請使用你的圖像生成能力產生下列所有素材。

**你只負責素材，請勿做以下事情：**

- ❌ 不要撰寫或修改遊戲程式碼（`index.html` 由另一位工程師負責）
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

### 核心素材（必做，共 23 張）

| # | 檔名 | 內容 | 尺寸 | 背景 |
|---|------|------|------|------|
| 1 | `bg-scene.png` | 主場景背景：明亮天空花園，中央留白 | 1536×1024 | 不透明（淺色） |
| 2 | `mascot-drop.png` | 小水滴吉祥物（**角色基準圖**，唯一有臉） | 1024×1024 | 透明 |
| 3 | `plant-cutaway.png` | 全株剖面圖：根在土裡、莖有導管、葉在上（**植物基準圖**） | 1024×1024 | 透明 |
| 4 | `stage-root-soil.png` | 第1站場景：土壤剖面＋主根＋根毛 | 1024×1024 | 透明 |
| 5 | `stage-stem.png` | 第2站場景：莖剖面＋導管通道 | 1024×1024 | 透明 |
| 6 | `stage-leaf.png` | 第3站場景：大葉子＝食物工廠 | 1024×1024 | 透明 |
| 7 | `plant-thriving.png` | 開花結果、茂盛健康的植株（結尾獎勵） | 1024×1024 | 透明 |
| 8 | `item-water.png` | 單顆水滴（資源用，**無臉**） | 1024×1024 | 透明 |
| 9 | `item-sun.png` | 陽光（小太陽 token，光合作用材料） | 1024×1024 | 透明 |
| 10 | `item-co2.png` | 二氧化碳（**灰色**氣體，無文字） | 1024×1024 | 透明 |
| 11 | `item-oxygen.png` | 氧氣（**淺藍**透亮泡泡，光合作用產物） | 1024×1024 | 透明 |
| 12 | `item-nutrient.png` | 養分／糖（金黃能量包，光合作用產物） | 1024×1024 | 透明 |
| 13 | `icon-part-root.png` | 器官圖示：根 | 1024×1024 | 透明 |
| 14 | `icon-part-stem.png` | 器官圖示：莖 | 1024×1024 | 透明 |
| 15 | `icon-part-leaf.png` | 器官圖示：葉 | 1024×1024 | 透明 |
| 16 | `part-flower.png` | 花（第4站目的地，收到養分會開） | 1024×1024 | 透明 |
| 17 | `part-fruit.png` | 果實（第4站目的地，收到養分會長大） | 1024×1024 | 透明 |
| 18 | `ui-star.png` | 計分星星 | 1024×1024 | 透明 |
| 19 | `ui-badge-success.png` | 過關成功勳章（打勾金牌） | 1024×1024 | 透明 |
| 20 | `ui-btn-next.png` | 下一步按鈕（純箭頭，**無文字**） | 1024×1024 | 透明 |
| 21 | `ui-rank-1.png` | 頭銜徽章：見習小園丁（銅＋種子嫩芽） | 1024×1024 | 透明 |
| 22 | `ui-rank-2.png` | 頭銜徽章：植物探險家（銀＋雙葉幼苗） | 1024×1024 | 透明 |
| 23 | `ui-rank-3.png` | 頭銜徽章：光合作用大師（金＋盛開太陽花） | 1024×1024 | 透明 |

### 建議加值素材（強烈建議一併生成，共 3 張）

| # | 檔名 | 內容 | 理由 |
|---|------|------|------|
| 24 | `mascot-drop-cheer.png` | 小水滴慶祝姿勢 | 過關／結算時的歡呼表情，讓回饋更有生氣 |
| 25 | `item-mineral.png` | 礦物質小顆粒 | 第1站呈現「根吸的水裡溶有礦物質」 |
| 26 | `deco-cloud.png` | 白雲（背景裝飾） | 點綴天空、豐富畫面（背景的太陽可直接用 `item-sun.png`） |

> 尺寸備註：若工具不支援 1536×1024，背景圖可改用最接近的橫式尺寸；若只支援正方形，則以 1024×1024 生成，但構圖需預留安全區，確保置中裁切成 16:9 後主要元素不被切掉。

---

## 2. 全域風格規範（每一張都必須套用）

### 2.1 風格基準句（STYLE BLOCK）

原始需求（中文）：

> 扁平化向量插畫風、粗黑描邊、童書繪本風格、明亮飽和色彩、簡單圓潤造型、乾淨的淺色或透明背景、畫面中不要出現任何文字、統一色調。

生成用英文版（**每一張圖的 prompt 都必須以這段開頭，一字不改**）：

> Flat vector illustration, thick bold black outlines, children's picture-book style, bright saturated colors, simple rounded shapes, cute and friendly, clean minimal design, unified color palette. Absolutely no text, no letters, no numbers, no logos, no watermarks.

### 2.2 統一色板（色調定錨用，與〈植物醫生〉共用同一套綠/土/天空色，另加水與氣體色）

圖像模型不會精準命中色碼，但請在整體色調上貼近以下色板，維持全套一致：

| 用途 | 色碼 |
|------|------|
| 主葉綠 | `#58B159` |
| 深綠（葉影/深色） | `#2E7D4F` |
| 嫩芽黃綠 | `#A8D66A` |
| 濕土棕 | `#7A4E32` |
| 淺土米 | `#C9A47C` |
| 陽光黃 | `#FFC93C` |
| 天空藍 | `#8FD3F4` |
| 奶油底色 | `#FDF6EC` |
| 珊瑚點綴 | `#FF7F66` |
| 描邊近黑 | `#1E1E1E` |
| **水滴藍（水／主角）** | `#4FB0E5` |
| **深水藍（描影）** | `#2E86C1` |
| **二氧化碳灰** | `#9AA5AD` |
| **氧氣泡藍（淺）** | `#CFEBFF` |
| **養分金糖** | `#F2B33D` |

### 2.3 全域禁止與構圖規則

- 禁止：寫實照片風、3D 渲染、複雜漸層、雜訊材質、陰影過重、任何文字符號。
- **植物與器官一律不畫臉**（根、莖、葉、花、果實、剖面圖都不加眼睛嘴巴）——這是科學教材，構造要像圖鑑一樣清楚。**全套唯一有臉的角色是小水滴吉祥物**（`mascot-drop` / `mascot-drop-cheer`）。
- 每張圖只有一個主體，置中，四周保留約 8–12% 邊距，主體完整不裁切。
- 透明背景素材：若工具支援透明背景參數請開啟；若不支援，改用純色 `#FDF6EC` 底並在 manifest 中註記 `"transparent": false`。
- **同一套植物語彙**：所有植物類素材（剖面圖、各站場景、茂盛株、器官圖示、花果）的葉形、莖、根毛、導管與土壤畫法、線寬、色調必須一致，看起來像「同一株植物的不同部位／狀態」。
- **水滴一致但可區分**：資源水滴 `item-water` 與主角 `mascot-drop` 都是水滴造型，但**主角有臉、資源水滴無臉**，避免混淆。
- **三種氣體/資源用顏色區分，且圖內零文字**：
  - 水滴＝水滴形、水藍（`#4FB0E5`）
  - 二氧化碳＝帶灰的氣體小雲（`#9AA5AD`）
  - 氧氣＝清新淺藍透亮的圓泡群（`#CFEBFF`）
  - 養分＝溫暖金黃的能量包（`#F2B33D`）
  這四者造型與顏色必須一眼可分辨；名稱一律由遊戲的 HTML 疊字，**圖上不可有字**。

---

## 3. 生成流程（依序執行，不可跳步）

1. **先生成 3 號 `plant-cutaway.png`（植物風格基準圖）**，對照第 7 節檢查清單自檢，不合格就重生成，直到合格為止。它定義了葉形、莖、根毛、導管、土壤與線寬色調。
2. **再生成 2 號 `mascot-drop.png`（角色風格基準圖）**，定義吉祥物的造型與配色。
3. 之後每一張圖：
   - 若工具支援參考圖（image reference / edits）：**植物類**（場景、茂盛株、器官、花果）以 `plant-cutaway.png` 為風格參考；**角色與元件**以 `mascot-drop.png` 的線條與配色為參考。
   - 若不支援參考圖，則在每張 prompt 中完整保留 STYLE BLOCK 與該素材規格中的外型描述（葉形、導管、無臉、顏色等），不可省略。
4. 每生成一張，立即依第 7 節自檢：不合格就重生成，同一張最多重試 3 次；3 次仍不合格則保留最佳版本，在 manifest 標記 `"status": "needs-review"` 並寫明問題。
5. 全部完成後，製作 `manifest.json` 與 `preview.html`，並肉眼比對整套素材：線條粗細、色調、風格是否一致；發現風格飄移的個別圖，重生成該張（兩張基準圖不動）。
6. 若圖像生成功能完全不可用：不要產生假圖，直接在完成報告中說明，並仍然交付 manifest（全部標 `"status": "failed"`），遊戲端會以 emoji/CSS 佔位。

---

## 4. 各素材詳細規格與 Prompt

以下每張的英文 prompt 可直接使用（開頭的 `[STYLE]` 代表第 2.1 節的英文 STYLE BLOCK，請完整代入）。

### 4.1 `bg-scene.png` — 主場景背景
- **用途**：全遊戲固定背景，上方會疊放旁白卡片、按鈕與文字。
- **必備特徵**：明亮戶外花園／天空感；左上一顆暖黃太陽；遠處柔和綠色小丘；下方一條棕色土壤地平線（可露出一點地下的淺色根）；**畫面中央大面積留白乾淨**（淺色天空）供 UI 疊放；無人物、無角色、無文字。
- **Prompt**：

> [STYLE] A bright cheerful outdoor garden background: soft blue sky filling the upper area, a warm yellow sun with thick rounded rays in the top-left corner, gentle rounded green hills in the distance, and a strip of brown soil along the bottom hinting a cross-section with a few pale roots underground. Composition rule: keep the whole center of the image plain, light and uncluttered (open pale sky) so game UI cards and text can be overlaid and stay readable. Soft low-contrast colors. No people, no characters, nothing busy in the center. Wide landscape format.

### 4.2 `mascot-drop.png` — 小水滴吉祥物（角色基準圖 ★次先生成）
- **用途**：標題畫面、旁白對話框旁，是全遊戲的講解者。
- **必備特徵**：擬人化藍色水滴、大圓眼、紅潤臉頰、開心微笑、小手揮手、頭頂一片小嫩葉；全身、正面、置中；**全套唯一有臉的角色**。
- **Prompt**：

> [STYLE] A friendly water-drop mascot character: a cute glossy blue water droplet body (classic teardrop shape), big round shiny eyes, rosy cheeks, a warm open smile, two little arms with one waving hello, and a tiny green leaf sprout on top of its head. Full body, facing the viewer, centered with margin around. This is the ONLY character in the whole set allowed to have a face. Transparent background.

### 4.3 `plant-cutaway.png` — 全株剖面圖（植物基準圖 ★最先生成）
- **用途**：①全套植物風格基準；②旅程總覽／第4站場景。
- **必備特徵**：一株完整植物的剖面，下半在土裡（棕色土壤剖面、一條主根＋許多根毛）、中間一條直立綠莖、莖內有像吸管的淺色**導管**直紋、上方 3–5 片寬圓橢圓綠葉（淺色葉脈）、頂端一朵小花苞；**不畫臉**；乾淨教科書圖鑑感。**此株的葉形、莖、根、導管為全套統一規格。**
- **Prompt**：

> [STYLE] An educational cutaway diagram of a whole plant, botanical and clear but with NO face: the lower half is underground showing a brown soil cross-section with one thick beige main taproot and many fine root hairs; the middle is one straight upright green stem with pale vertical tube lines inside it (like drinking straws) suggesting transport vessels; the upper half has three to five broad rounded oval green leaves with lighter vein lines and one small closed flower bud at the top. Clean picture-book textbook look. This exact plant design (same leaf shape, same stem, same roots, same tubes) will be reused across the whole set. Centered, whole plant fully visible with margin around. Transparent background.

### 4.4 `stage-root-soil.png` — 第1站場景：根與土壤
- **用途**：第1站背景，玩家點土裡的水滴讓根毛吸收。
- **必備特徵**：土壤剖面近景，一條主根＋大量根毛向下鋪展（同基準圖根畫法放大），土裡留出幾處可放水滴的空隙；上方露出一點莖基部；不畫臉、無文字。
- **Prompt**：

> [STYLE] A close-up cross-section of soil with plant ROOTS, same root design as the cutaway reference, NO face: a mound of brown soil in cross-section with one thick beige main taproot and many fine branching root hairs spreading downward, and open gaps in the soil where water droplets could sit. The very base of a green stem pokes up at the top. Clean and clear. Centered, transparent background.

### 4.5 `stage-stem.png` — 第2站場景：莖與導管
- **用途**：第2站背景，水滴沿導管往上升。
- **必備特徵**：一段直立的莖，半剖露出 2–3 條像吸管的淺色**導管**直紋從下貫穿到上，頂端連著一兩片葉子；不畫臉、無文字。
- **Prompt**：

> [STYLE] A close-up of a plant STEM, same stem design as the cutaway reference, NO face: one thick vertical bright-green stalk shown in a half cross-section so you can clearly see two or three pale vertical tube channels (like drinking straws) running all the way up the inside. One or two rounded green leaves at the top. Clean and simple. Centered, transparent background.

### 4.6 `stage-leaf.png` — 第3站場景：葉子＝食物工廠
- **用途**：第3站，光合作用合成；上方進陽光、側邊進二氧化碳、下方進水。
- **必備特徵**：一片大寬圓綠葉置中、有清楚淺色葉脈、下方短葉柄；上／側／下方留白，方便疊放進入的材料；不畫臉、無文字。
- **Prompt**：

> [STYLE] A single large broad rounded green leaf shown as a friendly "factory", same leaf design as the cutaway reference, NO face: the big leaf sits in the center with clear lighter vein lines and a short petiole entering from the bottom. Keep space open above the leaf, to one side, and below it so items can be shown entering. Clean and simple. Centered, transparent background.

### 4.7 `plant-thriving.png` — 茂盛健康植株（結尾獎勵）
- **用途**：養分送達後、植物開花結果的成果圖與慶祝畫面。
- **必備特徵**：同一株植物（同葉形同莖），現在非常健康茂盛：翠綠寬圓葉、一朵盛開的花、一顆長好的果實、濕潤棕土；植株挺拔；不畫臉。
- **Prompt**：

> [STYLE] The SAME plant design as the cutaway reference (same leaf shape, same stem, NO face) now thriving and full of life: lush bright-green rounded leaves, one fully bloomed flower, and one ripe round fruit on the plant, standing strong and perky in moist brown soil. Cheerful and healthy. Centered, whole plant fully visible with margin around. Transparent background.

### 4.8 `item-water.png` — 單顆水滴（資源，無臉）
> [STYLE] A simple bold single water droplet, glossy bright blue with a small white shine highlight, classic teardrop shape, NO face (this is a plain resource item, not the mascot). Single centered subject. Transparent background.

### 4.9 `item-sun.png` — 陽光（光合作用材料）
> [STYLE] A simple bold icon of a bright warm yellow sun with a round center and thick rounded triangular rays radiating outward, cheerful and glowing, representing sunlight. Single centered subject. Transparent background.

### 4.10 `item-co2.png` — 二氧化碳（灰色氣體，無文字）
- **必備**：帶灰的氣體感——兩三個相連的灰色圓形氣泡／小雲，加一兩個小動態點；顏色明顯偏灰以和氧氣區隔；**絕不可有字母數字**。
> [STYLE] A simple bold icon representing carbon-dioxide gas as a small grey gas cloud made of two or three soft rounded grey puffs joined together, with a couple of tiny motion dots. Muted grey color so it reads as "used-up air". Absolutely no letters or numbers of any kind. Single centered subject. Transparent background.

### 4.11 `item-oxygen.png` — 氧氣（淺藍泡泡）
- **必備**：清新淺藍透亮的圓泡（一大兩小一組）、白色高光；和二氧化碳的灰、水滴的水滴形明顯不同。
> [STYLE] A simple bold icon representing oxygen as a cluster of fresh light-blue translucent round bubbles (one big and two small) with white shine highlights, clean and airy. Clearly different from grey gas and from a water drop. Absolutely no letters or numbers. Single centered subject. Transparent background.

### 4.12 `item-nutrient.png` — 養分／糖（金黃能量包）
- **必備**：溫暖金黃、圓潤發亮的小能量包／糖粒，加幾個小光點，像「甜甜的能量」。
> [STYLE] A simple bold icon representing plant food/nutrient as a warm golden glowing rounded parcel or sugar granule with a soft shine and a few tiny sparkle dots, looking like sweet energy. Amber-gold color. Absolutely no letters or numbers. Single centered subject. Transparent background.

### 4.13 `icon-part-root.png` — 器官圖示：根
> [STYLE] A simple bold icon of plant ROOTS: a small rounded mound of brown soil in cross-section with one thick beige main taproot and many branching thinner root hairs spreading downward. Clear strong silhouette that instantly reads as "roots". No stem or leaves above. Single centered subject. Transparent background.

### 4.14 `icon-part-stem.png` — 器官圖示：莖
- **必備**：一根粗壯直立綠莖、內部隱約有淺色導管直紋、節上兩個小芽；**不要大片葉子、不要根**，避免與另兩個圖示混淆。
> [STYLE] A simple bold icon of a plant STEM: one thick vertical bright-green stalk standing straight, with faint pale vertical tube lines inside it and two tiny side buds. No large leaves, no roots. Clear strong silhouette that instantly reads as "stem". Single centered subject. Transparent background.

### 4.15 `icon-part-leaf.png` — 器官圖示：葉
> [STYLE] A simple bold icon of a single LEAF: one broad rounded green leaf with a short petiole and clean lighter vein lines. Clear strong silhouette that instantly reads as "leaf". Single centered subject. Transparent background.

### 4.16 `part-flower.png` — 花（第4站目的地）
- **必備**：一朵可愛盛開的花，粉色圓花瓣＋暖黃花心＋綠色短莖兩小葉；不畫臉。
> [STYLE] A simple bold icon of a single blooming flower with rounded pink petals, a warm yellow round center, and a short green stem with two little leaves. NO face. Cheerful and cute. Single centered subject. Transparent background.

### 4.17 `part-fruit.png` — 果實（第4站目的地）
- **必備**：一顆圓潤成熟的果實（像紅蘋果或番茄）＋頂端短綠梗一小葉；發亮；不畫臉。
> [STYLE] A simple bold icon of a single ripe round fruit (like a red apple or tomato) with a short green stem and one small leaf on top, glossy and cute. NO face. Single centered subject. Transparent background.

### 4.18 `ui-star.png` — 計分星星
> [STYLE] A shiny golden five-pointed star with rounded tips and a small white sparkle highlight, thick black outline. Single centered subject. Transparent background.

### 4.19 `ui-badge-success.png` — 過關成功勳章
> [STYLE] A round golden medal badge with a scalloped rosette edge, two small blue ribbon tails at the bottom, and a bold green check mark in the center. Shiny, celebratory, kid-friendly. Single centered subject. Transparent background.

### 4.20 `ui-btn-next.png` — 下一步按鈕
- **注意**：按鈕上**不得有文字**，只有箭頭圖形；中文「下一站」字樣將由 HTML 疊字呈現。
> [STYLE] A rounded pill-shaped bright blue game button with a slightly darker blue bottom edge for a soft 3D pressed look, and one bold white right-pointing arrow in the center. No text of any kind. Single centered subject. Transparent background.

### 4.21–4.23 `ui-rank-1/2/3.png` — 頭銜徽章
- **用途**：「見習小園丁 → 植物探險家 → 光合作用大師」升級進度顯示。**不得用數字或文字**，用材質色與圖案區分。
- **Prompt（依序）**：

> [STYLE] A round BRONZE rank badge with a simple border, showing ONE tiny seed sprouting a single green leaf as the emblem in the center. Flat medal style. No text, no numbers. Single centered subject. Transparent background.

> [STYLE] A round SILVER rank badge with a simple border, showing a small green seedling with TWO leaves as the emblem in the center. Flat medal style. No text, no numbers. Single centered subject. Transparent background.

> [STYLE] A round GOLD rank badge with a laurel-style decorated border, showing a blooming sunflower with green leaves and a few small sun rays behind it as the emblem in the center. Flat medal style. No text, no numbers. Single centered subject. Transparent background.

### 4.24 `mascot-drop-cheer.png` — 小水滴慶祝（建議）
> [STYLE] The SAME water-drop mascot as the reference (glossy blue droplet, big shiny eyes, rosy cheeks, tiny green leaf sprout on top, the only character with a face), now in a happy celebration pose: both little arms raised up cheering, a huge joyful smile, a little jump. Full body, centered with margin. Transparent background.

### 4.25 `item-mineral.png` — 礦物質顆粒（建議）
> [STYLE] A simple bold icon of a few small mineral nutrient granules: three tiny rounded crystal pebbles in soft earthy tones (pale orange, beige, light green) clustered together with a tiny sparkle. Represents minerals dissolved in water. Absolutely no letters or numbers. Single centered subject. Transparent background.

### 4.26 `deco-cloud.png` — 白雲裝飾（建議）
> [STYLE] A simple bold fluffy white cloud with a thick black outline and soft rounded bumps, cheerful and clean, for background decoration. Single centered subject. Transparent background.

---

## 5. 音效說明

**不需要生成任何音效檔。** 遊戲的吸水、送水、合成成功、答對／答錯等提示音將由工程師以 Web Audio API 在程式內合成。

---

## 6. 交付物規格

### 6.1 目錄結構

```
水分的運輸/
├── gameDesign.md            ← 不可修改
├── codex-assets-brief.md    ← 本文件，不可修改
└── assets/
    ├── bg-scene.png
    ├── mascot-drop.png
    ├── plant-cutaway.png
    ├── ...（其餘所有 PNG）
    ├── manifest.json
    └── preview.html
```

### 6.2 `manifest.json` 格式

每張素材一筆，依下列 schema：

```json
[
  {
    "file": "plant-cutaway.png",
    "title_zh": "全株剖面圖（植物基準圖）",
    "category": "plant",
    "size": "1024x1024",
    "transparent": true,
    "status": "ok",
    "notes": ""
  }
]
```

- `category`：`bg` / `mascot` / `plant` / `scene` / `item` / `icon-part` / `part` / `ui` / `deco`
- `status`：`ok`（合格）/ `needs-review`（重試 3 次仍有疑慮，notes 說明問題）/ `failed`（無法生成）
- `transparent`：實際是否為透明背景；若退回純色底請填 `false` 並在 notes 註明

### 6.3 `preview.html` 要求

- 純靜態單檔，直接以相對路徑 `<img>` 引用 assets 內所有圖。
- 奶油色（`#FDF6EC`）頁面底、白色卡片網格排列；每張圖下方標示「檔名＋中文名稱」。
- 透明圖需襯在**淺色與深色兩種底色**上各展示一次（檢查描邊與透明邊緣品質）。
- 此頁僅供人工驗收，不是遊戲的一部分。

### 6.4 完成報告（對話回覆）

- 成功生成清單（張數）。
- `needs-review` / `failed` 清單與原因。
- 重生成紀錄（哪幾張重試過、為什麼）。
- 與本規格的任何偏差（例如尺寸不支援改用替代尺寸）。

---

## 7. 每張圖的自檢清單（生成後立即檢查）

- [ ] 無任何文字、字母、數字、浮水印。
- [ ] 粗黑描邊、扁平向量風、圓潤造型，與基準圖 `plant-cutaway.png` / `mascot-drop.png` 同風格同線寬。
- [ ] 色調落在第 2.2 節色板範圍，整套一致。
- [ ] 主體置中、完整不被裁切、四周留 8–12% 邊距。
- [ ] 應透明的背景確實透明（或已依規則退回純色並記錄）。
- [ ] **植物與器官不畫臉**；同系列植物的葉形、莖、根毛、導管一致。
- [ ] **只有小水滴吉祥物有臉**；資源水滴 `item-water` 無臉，且與主角不會混淆。
- [ ] 四種資源一眼可分辨：水滴（水藍水滴形）／二氧化碳（灰氣體）／氧氣（淺藍泡群）／養分（金黃能量包）。
- [ ] 圖示類：單一主體、輪廓清晰，縮小到 64px 仍可辨識。
- [ ] 檔名與本文件完全一致（全小寫、kebab-case、`.png`）。

## 8. 總驗收標準

- 核心 23 張全數生成（建議 3 張盡量完成），檔名正確、放在 `./assets/`。
- 整套風格一致：並排看不出「不同批次」的感覺；植物語彙（葉形/莖/根/導管）跨圖一致。
- `manifest.json` 與 `preview.html` 齊備且正確。
- 打開 `preview.html` 逐張檢查皆通過第 7 節清單。
