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
            "直立式與地平式日晷",
        ],
    },
    {
        "folder": "第二單元 植物世界",
        "short": "第二單元",
        "order": [
            "根莖葉的作用",
            "植物體內的水分運輸",
            "植物身體的組成",
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
    ("根莖葉的作用",       "互動教材"): "「植物醫生」看診闖關遊戲。",
    ("植物體內的水分運輸", "互動教材"): "「水滴大冒險」跟著水滴走一趟。",
    ("植物身體的組成",     "互動教材"): "分類白板＋放大鏡頭，看見細胞。",
}

# 延伸工具（materials/*.html）各自的卡片資料：檔名 → (emoji, 標題, 說明)
MATERIALS = {
    "sun-path-explorer.html": ("🌐", "3D 太陽路徑探索", "觀察太陽移動與影子變化。"),
    "sundial-cutout.html":    ("✂️", "水平式日晷剪貼", "印下來剪貼，做一個自己的地平式日晷。"),
}

scanned = [(u, scan_unit(u)) for u in UNITS]

zones_html = []
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
    <h2 class="section-title"><span class="badge">第一次月考</span> 範圍：太陽與光 · 植物世界</h2>

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
