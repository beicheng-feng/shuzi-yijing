import { useState } from "react";

const GUAS = {
  天醫: {
    cat: "ji", main: "主財旺運",
    levels: { 1: [13,31], 2: [68,86], 3: [49,94], 4: [27,72] },
    pairs: [13,31,68,86,49,94,27,72],
    pros: "天生聰明、財運極佳、容易帶來正桃花與婚姻、能逢凶化吉。",
    cons: "過度善良、缺乏主見、容易輕信他人受騙，財來得快也容易被劫財。天醫過多易不知人間疾苦。",
    health: "血液循環、高血壓、心血管毛病須注意。",
    career: "銀行家、政治家、企業家、心靈學、哲學、心理學、宗教學。",
    symbol: "上天最寵愛的人，天生資質好、聰明伶俐，主大量可觀的財富。"
  },
  生氣: {
    cat: "ji", main: "主貴人運",
    levels: { 1: [14,41], 2: [67,76], 3: [39,93], 4: [28,82] },
    pairs: [14,41,67,76,39,93,28,82],
    pros: "樂觀隨緣、思想豁達、人緣極佳、常有貴人相助、遇危機總能順利轉機。",
    cons: "企圖心不足、容易懶散、缺乏上進心、做事逆來順受，有時顯得沒原則。生氣過多易過度隨緣、懶散。",
    health: "胃、腸、眼、耳、鼻、肝膽的毛病要注意。",
    career: "會計師、金融家、企業家、企管顧問、花店、保全。",
    symbol: "高EQ，有貴人相助的格局，居中協調力強，處理人際關係方面得心應手。"
  },
  延年: {
    cat: "ji", main: "主事業運",
    levels: { 1: [19,91], 2: [78,87], 3: [34,43], 4: [26,62] },
    pairs: [19,91,78,87,34,43,26,62],
    pros: "大將之風、領導能力強、極具責任感、行事穩健、懂得守財、意志力堅定。",
    cons: "大男子／大女子主義、作風強勢、容易把壓力扛在自己身上、生活刻板、勞碌命。延年過多易過度強勢。",
    health: "肩、頸、關節、神經系統、心臟的毛病要注意。",
    career: "獨立性強的工作、保險、珠寶、鑑賞家、建築師、美食家。",
    symbol: "意識堅定的領袖格局，能獨當一面，可守住財富，延續美好狀況。"
  },
  伏位: {
    cat: "fuwei", main: "主潛伏運",
    levels: { 1: [11,99], 2: [88,77], 3: [44,33], 4: [22,66] },
    pairs: [11,22,33,44,66,77,88,99],
    pros: "極有耐心、做事謹慎、善於等待時機、思維縝密、能把原本的運勢延續並發揚光大。",
    cons: "行事被動、過度保守、害怕轉變、容易錯失良機、內心缺乏安全感、常陷入糾結。伏位超過6個：天才型或極度封閉型。",
    health: "心臟毛病須多注意。",
    career: "研究、編輯、創新、公務員、教師、分析師、服裝店。",
    symbol: "等待、蓄勢待發、臥虎藏龍。伏位會延續前面的卦象，狀況延續不增不減。"
  },
  絕命: {
    cat: "xiong", main: "主投資運",
    levels: { 1: [12,21], 2: [69,96], 3: [48,84], 4: [37,73] },
    pairs: [12,21,69,96,48,84,37,73],
    pros: "行動力驚人、行事果斷、敢拼敢衝、重情重義，超級軍師，適合開疆闢土或從事高風險投資。",
    cons: "人生大起大落、性格衝動暴躁、不善於守財、容易惹上官非訴訟、凡事非黑即白易走極端。高IQ低EQ。",
    health: "肝、腎、生殖系統、泌尿系統的毛病要注意。",
    career: "攝影編劇、行銷企劃、執行製作、軍事家、談判家。",
    symbol: "搏命演出的人生，大起大落的極端性格。人生精彩但波折多，需天醫化解。",
    cure: "天醫制絕命（吉星放凶星後面，同級最佳）"
  },
  五鬼: {
    cat: "xiong", main: "主智慧運",
    levels: { 1: [18,81], 2: [79,97], 3: [36,63], 4: [24,42] },
    pairs: [18,81,79,97,36,63,24,42],
    pros: "才華洋溢、點子極多、思想獨特、反應靈敏，適合從事創意、策劃、夜間工作或IT產業。一個五鬼適合做業務，可把別人的財搬過來。",
    cons: "性格陰晴不定、不守信用、感情與財運變動極大、容易失眠。兩個以上五鬼會亂花錢。最極端、難以捉摸、命運變化大。",
    health: "腰酸背痛、扭傷、心臟、心肺功能、免疫系統、泌尿系統、腦神經、心血管疾病、高血壓。",
    career: "業務、宮廟命理、藝術創作、攝影、服飾、外貿外商、創意、設計規劃。",
    symbol: "最有才華也最不穩定的DNA，特立獨行，常有血光之災。最難化解，需三組連排。",
    cure: "生氣＋天醫＋延年（順序不能變動）"
  },
  六煞: {
    cat: "xiong", main: "主桃花運",
    levels: { 1: [16,61], 2: [47,74], 3: [38,83], 4: [29,92] },
    pairs: [16,61,47,74,38,83,29,92],
    pros: "心思細膩、情感豐富、審美與時尚感極佳、善於社交，擁有絕佳的人際關係及外交手腕，在服務業或公關行業很有優勢。",
    cons: "情緒起伏大、多愁善感、容易陷入偏桃花或三角戀、人際關係易生糾紛、常為情所困。猶豫不決、判斷錯誤。",
    health: "腦部系統、躁鬱、憂鬱、失眠、腸胃道、腹瀉、潰瘍。",
    career: "業務交際、零件批發、服裝設計、時尚、美容、舞蹈、藝術、演藝、公關、房地產、汽車仲介。",
    symbol: "情感、婚姻或人際關係方面糾葛的DNA，桃花指數高，異性緣強但不易開花結果。",
    cure: "延年壓六煞（一組延年制一組六煞）"
  },
  禍害: {
    cat: "xiong", main: "主口舌運",
    levels: { 1: [17,71], 2: [89,98], 3: [46,64], 4: [23,32] },
    pairs: [17,71,89,98,46,64,23,32],
    pros: "口才辯給、表達能力極強、極具說服力，適合從事講師、業務或靠嘴巴吃飯的行業。辯才無礙、好勝心強。",
    cons: "脾氣暴躁、愛面子、說話直容易得罪人、容易怨天尤人、身體易有慢性病。不能保守秘密、容易口舌是非。",
    health: "口腔、喉嚨、淋巴腺、胸腔、呼吸道。",
    career: "講師、主持人、律師、談判專家、命理師。",
    symbol: "口舌、病弱、心計的DNA。口能救人也能傷人，需善用口才正面能量。",
    cure: "生氣＋（生氣／伏位／延年）任一，不限順序"
  },
};

// 取得某數字對應的等級
function getLevel(pairNum) {
  for (const [name, g] of Object.entries(GUAS)) {
    for (const [lv, arr] of Object.entries(g.levels)) {
      if (arr.includes(pairNum)) return { name, level: parseInt(lv), cat: g.cat };
    }
  }
  return null;
}

const catColor = { ji: "#16a34a", xiong: "#dc2626", fuwei: "#b45309", li: "#7c3aed" };
const catBg    = { ji: "#dcfce7", xiong: "#fee2e2", fuwei: "#fef3c7", li: "#ede9fe" };
const levelLabel = ["", "一級", "二級", "三級", "四級"];
const levelColor = ["", "#dc2626", "#ea580c", "#ca8a04", "#64748b"];

function letterToTwo(ch) {
  const n = ch.toUpperCase().charCodeAt(0) - 64;
  return n < 10 ? "0" + n : "" + n;
}

function toIdDigits(raw) {
  let s = "";
  for (const ch of raw) {
    if (/[A-Za-z]/.test(ch)) s += letterToTwo(ch);
    else if (/[0-9]/.test(ch)) s += ch;
  }
  return s;
}

function processFiveWithMap(s) {
  let arr = s.split("").map((ch, i) => ({ ch, origIdx: i }));
  let i = 0;
  const deleted = new Set();
  const changedToZero = new Set();
  while (i < arr.length) {
    if (arr[i].ch === "5") {
      const len = arr.length;
      const midIdx = len % 2 === 1 ? Math.floor(len / 2) : -1;
      if (i === 0 || i === len - 1 || i === midIdx) {
        changedToZero.add(arr[i].origIdx); arr[i].ch = "0"; i++;
      } else {
        deleted.add(arr[i].origIdx); arr.splice(i, 1);
      }
    } else { i++; }
  }
  return { deleted, changedToZero };
}

function processFive(s) {
  const { deleted, changedToZero } = processFiveWithMap(s);
  const arr = s.split("");
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (deleted.has(i)) continue;
    if (changedToZero.has(i)) result.push("0");
    else result.push(arr[i]);
  }
  return result.join("");
}

function processPair(d1, d2) {
  if (d1 === "0" && d2 === "0") return "00";
  if (d1 === "0") return d2 + d2;
  if (d2 === "0") return d1 + d1;
  return d1 + d2;
}

function lookupPair(n) {
  for (const [name, g] of Object.entries(GUAS))
    if (g.pairs.includes(n)) return { name, ...g };
  return null;
}

// 制化偵測：偵測號碼中是否有凶星被吉星化解
function detectCures(pairList) {
  const cures = [];
  const n = pairList.length;
  for (let i = 0; i < n; i++) {
    const cur = pairList[i];
    if (!cur.result) continue;
    // 絕命 → 天醫緊接在後
    if (cur.result.name === "絕命" && i + 1 < n) {
      const next = pairList[i + 1];
      if (next.result?.name === "天醫") {
        const lvXiong = getLevel(cur.n);
        const lvJi = getLevel(next.n);
        const effective = lvJi && lvXiong && lvJi.level <= lvXiong.level;
        cures.push({ type: "天醫制絕命", xiong: cur.n, ji: next.n, effective, lvXiong: lvXiong?.level, lvJi: lvJi?.level });
      }
    }
    // 六煞 → 延年緊接在後
    if (cur.result.name === "六煞" && i + 1 < n) {
      const next = pairList[i + 1];
      if (next.result?.name === "延年") {
        const lvXiong = getLevel(cur.n);
        const lvJi = getLevel(next.n);
        const effective = lvJi && lvXiong && lvJi.level <= lvXiong.level;
        cures.push({ type: "延年壓六煞", xiong: cur.n, ji: next.n, effective, lvXiong: lvXiong?.level, lvJi: lvJi?.level });
      }
    }
    // 禍害 → 生氣＋任一（不限順序，找附近）
    if (cur.result.name === "禍害") {
      const window = pairList.slice(Math.max(0, i - 2), Math.min(n, i + 3));
      const hasShengqi = window.some(p => p.result?.name === "生氣");
      const hasSecond = window.some(p => ["生氣","伏位","延年"].includes(p.result?.name) && p !== cur);
      if (hasShengqi && hasSecond) {
        cures.push({ type: "化禍害", xiong: cur.n, effective: true });
      }
    }
    // 五鬼 → 生氣＋天醫＋延年（連續順序）
    if (cur.result.name === "五鬼" && i + 2 < n) {
      const a = pairList[i + 1], b = pairList[i + 2];
      if (a.result?.name === "生氣" && b.result?.name === "天醫") {
        // 找再下一個延年
        if (i + 3 < n && pairList[i + 3].result?.name === "延年") {
          cures.push({ type: "化五鬼（生氣＋天醫＋延年）", xiong: cur.n, effective: true });
        }
      }
    }
  }
  return cures;
}

function calcIdMingPan(rawDigits, birthYear) {
  const age = birthYear ? 2026 - parseInt(birthYear) : null;
  const raw = rawDigits.split("");
  const rawLen = raw.length;
  const { deleted, changedToZero } = processFiveWithMap(rawDigits);
  const after5 = processFive(rawDigits);

  const slots = [];
  let prevNonFuwei = null;

  for (let i = 0; i < 10; i++) {
    const ageStart = 13 + i * 5;
    const ageEnd = ageStart + 4;
    const ri = i % rawLen;
    const ri2 = (i + 1) % rawLen;
    const r1 = raw[ri], r2 = raw[ri2];
    const r1IsCTZ = changedToZero.has(ri);
    const r2IsCTZ = changedToZero.has(ri2);
    const r1IsDel = deleted.has(ri);
    const r2IsDel = deleted.has(ri2);

    let isArrow = false, proc = "", d1 = r1, d2 = r2;
    if (r2IsCTZ) { isArrow = true; }
    else if (r1IsCTZ) { d1 = "0"; proc = processPair("0", r2); }
    else if (r2IsDel) { d2 = raw[(ri2 + 1) % rawLen]; proc = processPair(r1, d2); }
    else if (r1IsDel) { isArrow = true; }
    else { proc = processPair(r1, r2); }

    const n = isArrow ? null : (parseInt(proc[0]) * 10 + parseInt(proc[1]));
    const gua = n !== null ? lookupPair(n) : null;
    const isFuwei = gua?.cat === "fuwei";
    const isCurrent = age !== null && age >= ageStart && age <= ageEnd;
    const displayGua = isArrow ? null : (isFuwei && prevNonFuwei ? { name: prevNonFuwei, ...GUAS[prevNonFuwei] } : gua);
    const extendFrom = !isArrow && isFuwei && prevNonFuwei ? prevNonFuwei : "";
    const levelInfo = n !== null ? getLevel(n) : null;

    slots.push({ ageStart, ageEnd, r1, r2, proc, n, gua, displayGua, isFuwei, isArrow, isCurrent, extendFrom, levelInfo });
    if (!isArrow && !isFuwei && gua) prevNonFuwei = gua.name;
  }

  // 裡象卦
  const liPairs = [];
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    if (slot.isArrow) continue;
    const ri = i % rawLen;
    const ri2 = (i + 1) % rawLen;
    const r1 = raw[ri], r2 = raw[ri2];
    const r2IsPlainZero = r2 === "0" && !changedToZero.has(ri2) && !deleted.has(ri2);
    if (r2IsPlainZero && r1 !== "0" && r1 !== "5" && !changedToZero.has(ri) && !deleted.has(ri)) {
      let ri3 = (ri2 + 1) % rawLen;
      let safety = 0;
      while ((deleted.has(ri3) || changedToZero.has(ri3)) && safety++ < 10) ri3 = (ri3 + 1) % rawLen;
      const r3 = raw[ri3];
      if (r3 !== "0" && r3 !== "5") {
        const liNum = parseInt(r1) * 10 + parseInt(r3);
        const result = lookupPair(liNum);
        const liAgeStart = slot.ageStart;
        let liAgeEnd = slot.ageEnd;
        for (let j = i + 1; j < slots.length; j++) {
          if (!slots[j].isArrow) { liAgeEnd = slots[j].ageStart - 1; break; }
          liAgeEnd = slots[j].ageEnd;
        }
        liPairs.push({ liNum, result, ageStart: liAgeStart, ageEnd: liAgeEnd });
      }
    }
  }

  // 統計
  const count = {};
  slots.forEach(({ displayGua, isArrow }) => {
    if (isArrow || !displayGua) return;
    count[displayGua.name] = (count[displayGua.name] || 0) + 1;
  });
  const liCount = {};
  liPairs.forEach(({ result }) => {
    if (result) liCount[result.name] = (liCount[result.name] || 0) + 1;
  });

  // 制化偵測
  const validPairs = slots.filter(s => !s.isArrow && s.n !== null).map(s => ({ n: s.n, result: s.gua }));
  const cures = detectCures(validPairs);

  return { after5, slots, liPairs, count, liCount, cures };
}

function calcOther(rawInput) {
  const rawDigits = rawInput.replace(/[^0-9]/g, "");
  const after5 = processFive(rawDigits);
  const pairs = [];
  let prevNonFuwei = null;
  for (let i = 0; i < after5.length - 1; i++) {
    const d1 = after5[i], d2 = after5[i + 1];
    const proc = processPair(d1, d2);
    const n = parseInt(proc[0]) * 10 + parseInt(proc[1]);
    const result = lookupPair(n);
    const isFuwei = result?.cat === "fuwei";
    const displayResult = isFuwei && prevNonFuwei ? { name: prevNonFuwei, ...GUAS[prevNonFuwei] } : result;
    const extendFrom = isFuwei && prevNonFuwei ? prevNonFuwei : "";
    const levelInfo = getLevel(n);
    pairs.push({ raw: d1 + d2, proc, n, result, displayResult, extendFrom, levelInfo });
    if (!isFuwei && result) prevNonFuwei = result.name;
  }
  const count = {};
  pairs.forEach(({ displayResult }) => {
    if (displayResult) count[displayResult.name] = (count[displayResult.name] || 0) + 1;
  });
  const cures = detectCures(pairs.map(p => ({ n: p.n, result: p.displayResult })));
  return { rawDigits, after5, pairs, count, cures };
}

const CATS = {
  id:      { label: "身分證字號", placeholder: "例：A123456789", aspect: "個人體質、整體運勢、性格底色", showBirth: false },
  time:    { label: "日期號碼（結婚日、開業日）", placeholder: "例：19901225", aspect: "命運時間軸、重要決策時機", showBirth: false },
  finance: { label: "財運／事業號碼", placeholder: "例：00123456", aspect: "金錢流動、事業格局、財務管理", showBirth: false },
  home:    { label: "居家／空間號碼", placeholder: "例：312", aspect: "家運、居住品質、家庭關係", showBirth: false },
  other:   { label: "其他號碼（車牌、手機）", placeholder: "例：0901315028", aspect: "出行運、人際關係、社交能量", showBirth: false },
};

export default function App() {
  const [cat, setCat] = useState("id");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const tabs = [
    { key: "id", label: "身分證" },
    { key: "time", label: "時間類" },
    { key: "finance", label: "財運事業" },
    { key: "home", label: "居家空間" },
    { key: "other", label: "其他號碼" },
  ];

  function analyze() {
    const raw = input.trim();
    if (!raw) return;
    if (cat === "id") {
      const rawDigits = toIdDigits(raw);
      if (rawDigits.length < 2) return;
      const res = calcIdMingPan(rawDigits, "");
      setResult({ type: "id", rawDigits, ...res });
    } else {
      const res = calcOther(raw);
      if (res.rawDigits.length < 2) return;
      setResult({ type: "other", ...res });
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "20px 16px", fontFamily: "sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>數字易經分析</div>
        <div style={{ fontSize: 13, color: "#64748b", marginTop: 3 }}>輸入號碼，即時解讀卦象能量</div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setCat(t.key); setResult(null); setInput(""); }}
            style={{ padding: "6px 12px", borderRadius: 20, border: "1.5px solid", fontSize: 13, cursor: "pointer",
              fontWeight: cat === t.key ? 700 : 400,
              borderColor: cat === t.key ? "#0f172a" : "#e2e8f0",
              background: cat === t.key ? "#0f172a" : "#fff",
              color: cat === t.key ? "#fff" : "#64748b" }}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e2e8f0", padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>{CATS[cat].label}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && analyze()}
            placeholder={CATS[cat].placeholder}
            style={{ flex: 1, fontSize: 15, padding: "9px 12px", borderRadius: 10, border: "1.5px solid #e2e8f0", outline: "none", background: "#f8fafc", color: "#0f172a" }} />
          <button onClick={analyze}
            style={{ padding: "9px 18px", borderRadius: 10, border: "none", background: "#0f172a", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            分析
          </button>
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 8 }}>
          {cat === "id" ? "字母 A=01…Z=26 ｜ 含裡象卦＋流年＋制化分析" : "純數字 ｜ 逐格相鄰配對 ｜ 含制化分析"}
        </div>
      </div>
      {result && <ResultView result={result} aspect={CATS[cat].aspect} />}
    </div>
  );
}

function ResultView({ result, aspect }) {
  const { type, rawDigits, after5, count, liCount, slots, liPairs, pairs, cures } = result;
  const sortedGuas = Object.entries(count || {}).sort((a, b) => b[1] - a[1]);
  const sortedLiGuas = Object.entries(liCount || {}).sort((a, b) => b[1] - a[1]);
  const allGuaNames = [...new Set([...sortedGuas.map(([n]) => n), ...sortedLiGuas.map(([n]) => n)])];

  return (
    <>
      <div style={{ background: "#f1f5f9", borderRadius: 10, padding: "8px 12px", marginBottom: 14, fontSize: 11, color: "#475569", fontFamily: "monospace", lineHeight: 1.9 }}>
        <div>原始：{rawDigits}</div>
        <div>處理5：{after5}</div>
      </div>

      {/* 命格統計 */}
      <div style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e2e8f0", padding: "14px 16px", marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>命格卦象</div>
        {sortedGuas.map(([name, cnt]) => {
          const g = GUAS[name]; if (!g) return null;
          return (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: catColor[g.cat], minWidth: 40 }}>{name}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>×{cnt}</span>
              <span style={{ fontSize: 12, color: "#64748b" }}>{g.main}</span>
            </div>
          );
        })}
        {sortedLiGuas.length > 0 && (
          <>
            <div style={{ borderTop: "1px solid #f1f5f9", margin: "10px 0 8px", fontSize: 11, color: "#94a3b8" }}>裡象卦</div>
            {sortedLiGuas.map(([name, cnt]) => {
              const g = GUAS[name]; if (!g) return null;
              return (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: catColor.li, minWidth: 40 }}>{name}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>×{cnt}</span>
                  <span style={{ fontSize: 12, color: "#7c3aed" }}>{g.main}（裡象）</span>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* 制化偵測 */}
      {cures && cures.length > 0 && (
        <div style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e2e8f0", padding: "14px 16px", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>制化組合</div>
          {cures.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, padding: "6px 10px", borderRadius: 8, background: c.effective ? "#dcfce7" : "#fef3c7" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: c.effective ? "#15803d" : "#92400e" }}>
                {c.effective ? "✓" : "△"} {c.type}
              </span>
              {c.lvXiong && c.lvJi && (
                <span style={{ fontSize: 11, color: "#64748b" }}>
                  （凶{levelLabel[c.lvXiong]} vs 吉{levelLabel[c.lvJi]}）
                </span>
              )}
              {!c.effective && <span style={{ fontSize: 11, color: "#92400e" }}>吉星能量不足，化解效果有限</span>}
            </div>
          ))}
        </div>
      )}

      {/* 身分證命盤 */}
      {type === "id" && slots && <MingPanTable slots={slots} liPairs={liPairs} rawDigits={rawDigits} />}

      {/* 其他號碼 */}
      {type === "other" && pairs && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 8 }}>逐組卦象</div>
          <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #e2e8f0", overflow: "hidden" }}>
            {pairs.map(({ raw, proc, displayResult, extendFrom, levelInfo }, i) => {
              const cls = displayResult?.cat || "fuwei";
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderBottom: i < pairs.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <span style={{ fontSize: 14, fontFamily: "monospace", color: "#94a3b8", minWidth: 28 }}>{raw}</span>
                  <span style={{ fontSize: 14, fontFamily: "monospace", color: "#475569", minWidth: 36 }}>→ {proc}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: catColor[cls] }}>{displayResult?.name || "未收錄"}</span>
                  {levelInfo && <span style={{ fontSize: 11, padding: "1px 6px", borderRadius: 99, background: "#f1f5f9", color: levelColor[levelInfo.level] }}>{levelLabel[levelInfo.level]}</span>}
                  {extendFrom && <span style={{ fontSize: 11, color: catColor.fuwei }}>↑延續{extendFrom}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 卦象說明 */}
      {allGuaNames.length > 0 && (
        <div style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e2e8f0", padding: "14px 16px", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>卦象說明</div>
          {allGuaNames.map(name => {
            const g = GUAS[name]; if (!g) return null;
            const isLiOnly = liCount && liCount[name] && !(count && count[name]);
            return (
              <div key={name} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: catColor[isLiOnly ? "li" : g.cat] }}>{name}</span>
                  <span style={{ fontSize: 12, color: "#64748b" }}>{g.main}</span>
                  {isLiOnly && <span style={{ fontSize: 11, padding: "1px 6px", borderRadius: 99, background: catBg.li, color: catColor.li }}>裡象</span>}
                </div>
                <div style={{ fontSize: 12, color: "#475569", marginBottom: 8, lineHeight: 1.6 }}>{g.symbol}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
                  <div style={{ background: "#dcfce7", borderRadius: 8, padding: "7px 10px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d", marginBottom: 2 }}>優點</div>
                    <div style={{ fontSize: 12, color: "#166534", lineHeight: 1.7 }}>{g.pros}</div>
                  </div>
                  <div style={{ background: "#fee2e2", borderRadius: 8, padding: "7px 10px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#b91c1c", marginBottom: 2 }}>缺點</div>
                    <div style={{ fontSize: 12, color: "#991b1b", lineHeight: 1.7 }}>{g.cons}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  <div style={{ background: "#fef9c3", borderRadius: 8, padding: "7px 10px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#854d0e", marginBottom: 2 }}>健康注意</div>
                    <div style={{ fontSize: 12, color: "#713f12", lineHeight: 1.7 }}>{g.health}</div>
                  </div>
                  <div style={{ background: "#f0f9ff", borderRadius: 8, padding: "7px 10px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#0369a1", marginBottom: 2 }}>適合職業</div>
                    <div style={{ fontSize: 12, color: "#075985", lineHeight: 1.7 }}>{g.career}</div>
                  </div>
                </div>
                {g.cure && (
                  <div style={{ marginTop: 6, padding: "6px 10px", background: "#ede9fe", borderRadius: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed" }}>化解方式：</span>
                    <span style={{ fontSize: 11, color: "#6d28d9" }}>{g.cure}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginBottom: 20 }}>
        本次分析面向：{aspect}
      </div>
    </>
  );
}

function MingPanTable({ slots, liPairs, rawDigits }) {
  const CELL = 38;
  const digits = rawDigits.split("");
  const totalW = digits.length * CELL;

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 8 }}>命盤（13–58 歲）</div>
      {liPairs && liPairs.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          {liPairs.map(({ liNum, result, ageStart, ageEnd }) => (
            <div key={liNum} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", background: catBg.li, borderRadius: 8, marginBottom: 4, fontSize: 12 }}>
              <span style={{ fontWeight: 700, color: catColor.li }}>裡象卦</span>
              <span style={{ fontWeight: 700, color: catColor.li }}>{result?.name}（{liNum}）</span>
              {ageStart && <span style={{ color: "#6d28d9" }}>{ageStart}–{ageEnd} 歲</span>}
            </div>
          ))}
        </div>
      )}
      <div style={{ overflowX: "auto", paddingBottom: 4 }}>
        <div style={{ width: totalW, minWidth: totalW, paddingLeft: 1 }}>
          <div style={{ display: "flex", border: "1.5px solid #cbd5e1", borderRadius: "8px 8px 0 0", overflow: "hidden" }}>
            {digits.map((d, i) => (
              <div key={i} style={{
                width: CELL, height: 46, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 17, fontWeight: 700,
                color: d === "5" ? "#cbd5e1" : "#0f172a",
                background: d === "5" ? "#f8fafc" : "#fff",
                borderRight: i < digits.length - 1 ? "1px solid #e2e8f0" : "none",
                textDecoration: d === "5" ? "line-through" : "none",
              }}>{d}</div>
            ))}
          </div>
          <div style={{ position: "relative", height: 22, background: "#f8fafc", border: "1px solid #e2e8f0", borderTop: "none" }}>
            {slots.map(({ ageStart, isCurrent }, i) => (
              <div key={i} style={{ position: "absolute", left: (i + 1) * CELL, top: 0, bottom: 0, display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 10, color: isCurrent ? "#15803d" : "#64748b", fontWeight: isCurrent ? 700 : 400, transform: "translateX(-50%)", whiteSpace: "nowrap" }}>{ageStart}</span>
              </div>
            ))}
          </div>
          <div style={{ position: "relative", height: 28, background: "#fff", border: "1px solid #e2e8f0", borderTop: "none" }}>
            {slots.map(({ proc, isArrow, displayGua, levelInfo }, i) => (
              <div key={i} style={{ position: "absolute", left: (i + 1) * CELL, top: 0, bottom: 0, display: "flex", alignItems: "center", transform: "translateX(-50%)", flexDirection: "column", justifyContent: "center", gap: 1 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: isArrow ? "#cbd5e1" : catColor[displayGua?.cat || "fuwei"] }}>
                  {isArrow ? "→" : proc}
                </span>
                {!isArrow && levelInfo && (
                  <span style={{ fontSize: 9, color: levelColor[levelInfo.level] }}>{levelLabel[levelInfo.level]}</span>
                )}
              </div>
            ))}
          </div>
          <div style={{ position: "relative", height: 36, background: "#fff", border: "1.5px solid #cbd5e1", borderTop: "1px solid #e2e8f0", borderRadius: "0 0 8px 8px" }}>
            {slots.map(({ displayGua, extendFrom, isArrow, isCurrent }, i) => {
              const cls = displayGua?.cat || "fuwei";
              return (
                <div key={i} style={{
                  position: "absolute", left: (i + 1) * CELL, top: 0, bottom: 0,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  transform: "translateX(-50%)",
                  background: isCurrent ? catBg[cls] : "transparent",
                  borderRadius: 4, padding: "0 2px", minWidth: CELL - 2,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: isArrow ? "#94a3b8" : catColor[cls], whiteSpace: "nowrap" }}>
                    {isArrow ? "漸變" : (displayGua?.name || "?")}
                  </span>
                  {extendFrom && !isArrow && <span style={{ fontSize: 9, color: catColor.fuwei, whiteSpace: "nowrap" }}>↑{extendFrom}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>58歲後號碼循環延續。</div>
    </div>
  );
}
