# -*- coding: utf-8 -*-
"""
產生首頁 index.html。
掃描各單元資料夾（例：`第一單元 太陽與光/<主題>/`）中的三件套
（*_互動教材.html / *_學習單.html / *_重點整理.html），
依 ORDER 教學順序，分成三個類型分區輸出。
加完新教材後重跑一次即可：  python build_index.py
"""
import os, glob, urllib.parse as U

SITE = os.path.dirname(os.path.abspath(__file__))

# 單元（依順序）與各單元的主題教學順序；未列到的主題會自動附加在後面
UNITS = [
    {
        "folder": "第一單元 太陽與光",
        "short": "第一單元",
        "order": [
            "影子方位與太陽高度角",
            "太陽高度角的測量",
            "太陽高度角與四季",
            "凸透鏡與凹透鏡",
            "光的折射與彩虹",
            "水中射箭",
            "直立式與地平式日晷",
        ],
    },
    {
        "folder": "第二單元 植物世界",
        "short": "第二單元",
        "order": [
            "根莖葉的作用",
            "植物體內的水分運輸",
            "光之引擎",
            "植物身體的組成",
            "器官大跑酷",
            "多功能的營養器官",
            "繁殖器官的功能",
            "果實和種子的傳播方式",
            "種子的誕生與旅行",
            "種子飛行大賽",
            "營養器官的繁殖",
            "植物與人類生活",
            "絲瓜攀登王",
            "捕蠅草獵手",
        ],
    },
    {
        "folder": "第三單元 水溶液",
        "short": "第三單元",
        "order": [
            "溶解現象",
            "一顆也沒少",
            "水溶液的各種性質",
            "檢驗水溶液的酸鹼性",
            "自製酸鹼指示劑",
            "沙拉變色之謎",
            "混合水溶液的酸鹼性",
            "水溶液的導電性",
            "水溶液偵探社",
        ],
    },
    {
        "folder": "第四單元 力與運動",
        "short": "第四單元",
        "order": [
            "生活中的力",
            "彈簧與彈性限度",
            "彈簧秤與秤重工具",
            "力的平衡",
            "摩擦力",
            "運動的快慢",
            "能量轉換與能量守恆",
            "坡道小車挑戰",
        ],
    },
]
# 尚未製作的單元（顯示為「製作中」佔位）
COMING = []

TYPES = {
    "互動教材": {"zone": "materials",  "emoji": "🔬", "title": "數位教材",
                 "desc": "互動模型、探究工具與數位課程內容。持續補充中。"},
    "重點整理": {"zone": "summaries",  "emoji": "📖", "title": "單元重點整理",
                 "desc": "各主題核心概念一頁掌握，可線上看也能列印。持續補充中。"},
    "學習單":   {"zone": "worksheets", "emoji": "📝", "title": "數位學習單",
                 "desc": "互動作答、即時對答案，也能一鍵列印成紙本。持續補充中。"},
}
TYPE_ORDER = ["互動教材", "重點整理", "學習單"]
SUFFIXES = {"互動教材": "_互動教材.html", "重點整理": "_重點整理.html", "學習單": "_學習單.html"}


def scan_unit(unit):
    """回傳 {prefix: {folder, files:{type:relpath}, tag}}，並依 order 排序。"""
    updir = os.path.join(SITE, unit["folder"])
    topics = {}
    if os.path.isdir(updir):
        for sub in sorted(os.listdir(updir)):
            subdir = os.path.join(updir, sub)
            if not os.path.isdir(subdir):
                continue
            files = {}
            prefix = None
            for t, suf in SUFFIXES.items():
                hits = glob.glob(os.path.join(subdir, "*" + suf))
                if hits:
                    fn = os.path.basename(hits[0])
                    prefix = fn[: -len(suf)]
                    rel = "%s/%s/%s" % (unit["folder"], sub, fn)
                    files[t] = U.quote(rel)
            if prefix:
                topics[prefix] = {"tag": "補充教材" if sub.startswith("補充") else unit["short"],
                                  "files": files}
    # 依 order 排序，未列到者附加
    ordered = [p for p in unit["order"] if p in topics]
    ordered += [p for p in topics if p not in unit["order"]]
    return [(p, topics[p]) for p in ordered]


def card(href, emoji, title, desc, tag, disabled=False):
    if disabled:
        return ('    <span class="card disabled">\n'
                '      <div class="emoji">%s</div>\n'
                '      <h3>%s</h3><p>%s</p>\n'
                '      <span class="tag unit">%s</span>\n'
                '    </span>' % (emoji, title, desc, tag))
    return ('    <a class="card" href="%s">\n'
            '      <div class="emoji">%s</div>\n'
            '      <h3>%s</h3><p>%s</p>\n'
            '      <span class="tag unit">%s</span>\n'
            '    </a>' % (href, emoji, title, desc, tag))


DESCS = {"互動教材": "互動探索模型，邊操作邊學。",
         "重點整理": "核心概念整理，複習與列印。",
         "學習單":   "互動作答＋可列印紙本。"}

# 個別主題的卡片說明覆寫；沒列到的沿用上面 DESCS 的通用說明
TOPIC_DESCS = {
    ("繁殖器官的功能",       "互動教材"): "解剖一朵花、分辨雄花雌花，看花變成果實。",
    ("果實和種子的傳播方式", "互動教材"): "分類白板找線索，看果實怎麼去遠方。",
    ("種子的誕生與旅行",     "互動教材"): "配音動畫：花粉到胚珠、長成果實和種子，再看種子怎麼去遠方。",
    ("種子飛行大賽",         "互動教材"): "選一顆種子出發，搭上風、動物和水流飛得更遠。",
    ("營養器官的繁殖",       "互動教材"): "找新芽從哪裡冒出來，分一分用根、莖還是葉繁殖。",
    ("植物與人類生活",       "互動教材"): "認識經濟植物，看魔鬼氈和蓮葉效應怎麼向植物學習。",
    ("多功能的營養器官",     "互動教材"): "觀察根、莖、葉的特殊本領與植物的反應。",
    ("絲瓜攀登王",           "互動教材"): "單人攀附闖關，或左右雙人同時比高低。",
    ("捕蠅草獵手",           "互動教材"): "掌握捕蟲時機，單人練習或雙人同步對戰。",
    ("根莖葉的作用",       "互動教材"): "「植物醫生」看診闖關遊戲。",
    ("植物體內的水分運輸", "互動教材"): "「水滴大冒險」跟著水滴走一趟。",
    ("光之引擎",           "互動教材"): "動畫：水分運輸、蒸散、光合作用與養分運送（許博明老師 Blender 製作）。",
    ("植物身體的組成",     "互動教材"): "分類白板＋放大鏡頭，看見細胞。",
    ("器官大跑酷",         "互動教材"): "跳過危險、撞上得分，單人或雙人對戰。",
    ("水中射箭",           "互動教材"): "調角度射進水裡打靶，箭會轉彎。",
    ("溶解現象",           "互動教材"): "秤秤看溶解前後的重量、認識溶質與溶劑，再讓水分蒸發取回食鹽。",
    ("一顆也沒少",         "互動教材"): "3D 粒子動畫：食鹽溶解後看不見，但總重量不變、水面仍比原來高；水分蒸發後，又變回看得見的食鹽顆粒。",
    ("水溶液的各種性質",   "互動教材"): "安全搧聞、看成分標示，分類混合物、配製水溶液。",
    ("檢驗水溶液的酸鹼性", "互動教材"): "用紅、藍石蕊試紙分出酸性、中性、鹼性。",
    ("自製酸鹼指示劑",     "互動教材"): "找出紫色高麗菜汁變色的規律，自製指示劑。",
    ("沙拉變色之謎",       "互動教材"): "配音動畫：跟著豬豬從一盤紫色高麗菜沙拉出發，走一遍觀察、提問、蒐集資料、假設、實驗、結論。",
    ("混合水溶液的酸鹼性", "互動教材"): "酸鹼混合後是什麼性？少量多次調回接近中性。",
    ("水溶液的導電性",     "互動教材"): "用 LED 測測看，哪些水溶液容易導電。",
    ("水溶液偵探社",       "互動教材"): "怪盜撕撕撕掉了標籤！用最少的檢驗券，認出每一杯是酸性、中性還是鹼性。",
    ("生活中的力",         "互動教材"): "分類接觸力和超距力，認識重力。",
    ("彈簧與彈性限度",     "互動教材"): "掛砝碼量伸長量、畫折線圖，認識彈性限度。",
    ("彈簧秤與秤重工具",   "互動教材"): "正確使用彈簧秤：歸零、不倒掛、視線水平。",
    ("力的平衡",           "互動教材"): "模擬拔河：兩邊的力一樣大會怎樣？",
    ("摩擦力",             "互動教材"): "公平比較不同接觸面，看生活中的摩擦力。",
    ("運動的快慢",         "互動教材"): "固定距離比時間、固定時間比距離，認識時速。",
    ("能量轉換與能量守恆", "互動教材"): "溜滑梯和盪秋千裡的位能、動能與能量守恆。",
    ("坡道小車挑戰",       "互動教材"): "調起點高度、換地面，讓小車停進目標區。",
}

# 線上題庫（首頁最上方獨立一區）：(連結, emoji, 標題, 說明, 標籤)；之後有第二次評量就多加一行
QUIZ_BANKS = [
    ("題庫/index.html?exam=exam1", "✍️", "第一次評量線上題庫",
     "第一、二單元分主題練習、素養題組、模擬考、錯題本；進度可以下載到別台電腦繼續。", "題庫"),
    ("題庫/index.html?exam=exam2", "✍️", "第二次評量線上題庫",
     "第三、四單元（水溶液、力與運動）分主題練習、素養題組、模擬考、錯題本。", "題庫"),
]

# 延伸工具（materials/*.html）各自的卡片資料：檔名 → (emoji, 標題, 說明)
MATERIALS = {
    "sun-path-explorer.html": ("🌐", "3D 太陽路徑探索", "觀察太陽移動與影子變化。"),
    "sundial-cutout.html":    ("✂️", "水平式日晷剪貼", "印下來剪貼，做一個自己的地平式日晷。"),
    "response-cards.html":    ("🃏", "課堂反應卡", "印下來剪開，上課舉卡回答：酸中鹼、○╳、甲乙丙丁。"),
}

scanned = [(u, scan_unit(u)) for u in UNITS]

zones_html = []
if QUIZ_BANKS:
    zones_html.append(
        '<section class="zone zone--bank">\n'
        '  <div class="zone-head"><span class="zone-emoji">✍️</span><h2>線上題庫</h2></div>\n'
        '  <p class="zone-desc">自己練習：分主題練習、素養題組、模擬考、錯題本。練習紀錄存在自己的瀏覽器裡。</p>\n'
        '  <div class="card-grid">\n%s\n  </div>\n</section>'
        % "\n".join(card(U.quote(h, safe="/?="), e, t, d, g) for h, e, t, d, g in QUIZ_BANKS))
for t in TYPE_ORDER:
    meta = TYPES[t]
    cards = []
    for unit, topics in scanned:
        unit_cards = [card(info["files"][t], meta["emoji"],
                           prefix, TOPIC_DESCS.get((prefix, t), DESCS[t]), info["tag"])
                      for prefix, info in topics if t in info["files"]]
        if unit_cards:
            cards.append('  <h3 class="unit-sub">%s %s</h3>' % (unit["short"], unit["folder"].split(" ", 1)[-1]))
            cards.append('  <div class="card-grid">\n%s\n  </div>' % "\n".join(unit_cards))
    # 額外：數位教材加入延伸工具（每個 materials/*.html 各一張卡片）
    if t == "互動教材":
        ecards = []
        for p in sorted(glob.glob(os.path.join(SITE, "materials", "*.html"))):
            name = os.path.basename(p)
            emoji, title, desc = MATERIALS.get(name, ("🧰", name, "延伸教材工具。"))
            ecards.append(card("materials/" + name, emoji, title, desc, "延伸工具"))
        if ecards:
            cards.append('  <h3 class="unit-sub">延伸工具</h3>')
            cards.append('  <div class="card-grid">\n%s\n  </div>' % "\n".join(ecards))
    # 製作中佔位
    for c in COMING:
        cards.append('  <h3 class="unit-sub">%s %s</h3>' % (c["short"], c["name"]))
        cards.append('  <div class="card-grid">\n%s\n  </div>' %
                     card("", meta["emoji"], c["name"], "製作中，沿用同一套系統陸續補上。", c["short"], disabled=True))

    zones_html.append(
        '<section class="zone zone--%s">\n'
        '  <div class="zone-head"><span class="zone-emoji">%s</span><h2>%s</h2></div>\n'
        '  <p class="zone-desc">%s</p>\n%s\n</section>'
        % (meta["zone"], meta["emoji"], meta["title"], meta["desc"], "\n".join(cards)))

HTML = '''<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>豬豬的自然探索 — 教學資源</title>
  <link rel="icon" href="image/icon.svg">
  <link rel="stylesheet" href="css/style.css">
</head>
<body data-theme="sun">

  <header class="site-header">
    <div class="wrap">
      <img src="image/icon.svg" alt="站標">
      <div>
        <h1>豬豬的自然探索</h1>
        <p>數位教材 · 單元重點整理 · 數位學習單</p>
      </div>
    </div>
  </header>

  <main class="wrap">
    <h2 class="section-title" style="flex-direction:column;align-items:flex-start;gap:6px">
      <span><span class="badge">第一次月考</span> 範圍：太陽與光 · 植物世界</span>
      <span><span class="badge">第二次月考</span> 範圍：水溶液 · 力與運動</span>
    </h2>

%s

  </main>

  <footer class="site-footer"><div class="wrap">豬豬的自然探索</div></footer>
</body>
</html>
''' % "\n\n".join(zones_html)

with open(os.path.join(SITE, "index.html"), "w", encoding="utf-8", newline="") as f:
    f.write(HTML)

# 統計
for unit, topics in scanned:
    print(unit["folder"], "->", len(topics), "主題")
    for p, info in topics:
        print("   ", p, "：", "、".join(info["files"].keys()))
print("index.html 已產生")
