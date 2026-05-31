import React, { useState } from "react";

// ── 卦象資料庫 ────────────────────────────────────
const GUAS = {
  天醫: {
    cat: "ji", main: "主財旺運",
    levels: { 1:[13,31], 2:[68,86], 3:[49,94], 4:[27,72] },
    pairs: [13,31,68,86,49,94,27,72],
    desc: {
      personal: "天生自帶財運，決策時心胸開闊、不斤斤計較。運勢上常有意外之財，思維聰慧，容易做出正確且具長遠效益的決定。",
      business: "企業的「錢袋子」。適合擔任財務主管、資產管理角色。統編有此數代表公司營收結構健康、少有壞帳。",
      social:   "代表「正緣」，互動真誠、願意為對方付出。人際關係上純真、沒有心機，容易吸引到真心相待的朋友。",
      space:    "聚財宅與安全車。住家門牌逢此數，家運興旺，能藏風聚氣。車牌逢此數，出外辦事容易順利納財。",
    },
    health: "【天醫（土）】雖是吉星，但過多時（如13331），容易因過度思慮導致偏頭痛、血壓偏高，以及心血管系統的突發問題。",
    cure: null,
  },
  生氣: {
    cat: "ji", main: "主貴人運",
    levels: { 1:[14,41], 2:[67,76], 3:[39,93], 4:[28,82] },
    pairs: [14,41,67,76,39,93,28,82],
    desc: {
      personal: "隨緣隨和，決策時常抱持「順其自然」的態度。運勢上常有貴人相助、化險為夷，但致命傷是決策缺乏主見、容易隨波逐流。",
      business: "企業的「和事佬」。適合行政、總務或客戶關係（CRM）。能有效緩和內部衝突，常能為公司吸引到大客戶或重量級合作夥伴。",
      social:   "情商極高，不愛計較，是社交圈的萬人迷。但感情缺點是太過隨緣，容易邊界感模糊，甚至常淪為備胎或工具人。",
      space:    "和樂宅與貴人車。家庭氛圍和諧，常有朋自遠方來。車牌逢此數，出外常有貴人禮讓，行車平安，極少發生碰撞。",
    },
    health: "【生氣（木）】代表隨緣、愛享受。缺點是容易過度飲食導致腸胃疾病、肥胖、脂肪肝。磁場過多容易讓人產生精神上的惰性。",
    cure: null,
  },
  延年: {
    cat: "ji", main: "主事業運",
    levels: { 1:[19,91], 2:[78,87], 3:[34,43], 4:[26,62] },
    pairs: [19,91,78,87,34,43,26,62],
    desc: {
      personal: "主控力強，決策果斷、充滿大將之風。運勢上多為獨當一面的強人，但決策容易過於強勢，不願妥協，人生課題是學會放權。",
      business: "企業的「掌舵者」。最適合做CEO或高階主管。代表極強的執行力與抗壓性，但也容易因威權管理導致基層員工壓力過大。",
      social:   "對感情極度忠誠、專一，但控制欲極強。在社交中喜歡當老大、照顧人，但也常給伴侶或朋友帶來沉重的指導棋壓力。",
      space:    "穩固宅與霸道車。房屋磁場極為穩固，能庇佑家中頂樑柱的事業。車牌逢此數，駕駛技術沉穩，但容易有超速、路怒傾向。",
    },
    health: "【延年（金）】代表責任感。此磁場過強的人通常是工作狂，長期下來容易有嚴重的睡眠障礙、肩頸僵硬、腰椎與骨骼關節的勞損。",
    cure: null,
  },
  伏位: {
    cat: "fuwei", main: "主潛伏運",
    levels: { 1:[11,99], 2:[88,77], 3:[44,33], 4:[22,66] },
    pairs: [11,22,33,44,66,77,88,99],
    desc: {
      personal: "性格保守被動，決策時極度謹慎、思慮過度。運勢平穩但缺乏爆發力，適合維持現狀，常因過度猶豫而錯失良機。",
      business: "企業的「守門人」。適合需要高度耐心與重複性的職位，如品管（QA）、文書檔案管理。在商業決策中代表風險控管，不盲目擴張。",
      social:   "在社交中慢熟，從不主動追求。感情屬於長跑型，雖然缺乏激情與浪漫，但勝在穩定安全，交往後不易輕言分手。",
      space:    "安靜宅與慢速車。住家環境安靜，非常適合睡眠與修行。車牌逢此數，開車風格極度保守、速度偏慢，雖然安全但容易造成後方堵塞。",
    },
    health: "【伏位（木）】主隱藏、持續。健康上面臨的通常不是急性病，而是難以根治的慢性病、心臟隱疾、或是心理上的憂鬱與強迫症。",
    cure: null,
  },
  絕命: {
    cat: "xiong", main: "主投資運",
    levels: { 1:[12,21], 2:[69,96], 3:[48,84], 4:[37,73] },
    pairs: [12,21,69,96,48,84,37,73],
    desc: {
      personal: "反應極快，決策崇尚「高風險高報酬」。運勢起伏劇烈，好勝心強，常有孤注一擲的驚人決策，但往往因衝動而導致人生大破財。",
      business: "企業的「開路先鋒」。適合新市場開發、創投、海外拓荒。敢於搏殺，能攻下新版圖，但絕不能讓其碰財務，否則資金鏈易斷裂。",
      social:   "情感極其強烈，非黑即白。愛的時候轟轟烈烈，恨的時候流血衝突；重情重義，但也容易因為一言不合而與人斷交。",
      space:    "變動宅與事故車。住宅氣場不穩，住進去的人容易情緒衝動、家庭爭吵不斷。車牌逢大絕命（如12），發生嚴重交通事故的機率大幅提升。",
    },
    health: "【絕命（金）】容易有肝膽功能失調、泌尿系統疾病。由於性格衝動，更需要防範突發性的外傷、車禍、手術等流血事件。",
    cure: "天醫制絕命（同級或更高級的天醫，放在絕命後面）",
  },
  五鬼: {
    cat: "xiong", main: "主智慧運",
    levels: { 1:[18,81], 2:[79,97], 3:[36,63], 4:[24,42] },
    pairs: [18,81,79,97,36,63,24,42],
    desc: {
      personal: "直覺敏銳，決策多變且不按牌理出牌。運勢充滿變數，常能靠特權或偏門點子致富，但也常因多疑、反覆無常而自毀前程。",
      business: "企業的「智囊團」。最適合研發（R&D）、創意企劃、廣告設計。能打破常規、想出驚人點子，但需防範商業機密外洩。",
      social:   "心思多疑，在感情中極度缺乏安全感，容易查勤或精神出軌。人際社交雖然廣闊，但往往交心者少，常帶有神秘感。",
      space:    "鬧鬼宅與故障車。住宅易有陰氣較重，家人易失眠、多夢。車牌逢此數，車子電系容易莫名故障，開車易分心走神。",
    },
    health: "【五鬼（火）】直接對應心臟、血液循環（如腦中風、心肌梗塞）。且五鬼主「突變」，容易出現查不出病因的罕見疾病或免疫系統失調。",
    cure: "生氣＋天醫＋延年（三組依序排列，順序不能更動）",
  },
  六煞: {
    cat: "xiong", main: "主桃花運",
    levels: { 1:[16,61], 2:[47,74], 3:[38,83], 4:[29,92] },
    pairs: [16,61,47,74,38,83,29,92],
    desc: {
      personal: "心思極其細膩，決策時容易受情緒、人情羈絆影響。外在展現愛美、有品味，但運勢易流於多愁善感、陷入猶豫不決的內耗。",
      business: "企業的「公關大使」。適合公關、時尚產業、第一線門市服務。具備極強的親和力與美感，但要避免其因情緒化影響團隊士氣。",
      social:   "異性緣極佳，自帶陰柔魅力，但也因此飽受「偏桃花/爛桃花」困擾。感情中極度依賴伴侶，容易演變成情緒勒索或三角關係。",
      space:    "抑鬱宅與糾紛車。住宅易潮濕、通風不良，長期居住易導致家人心情抑鬱。車牌逢此數，開車易發生輕微擦撞、刮傷或違停被開單。",
    },
    health: "【六煞（水）】主皮膚過敏、內分泌失調、婦科疾病。因心思細膩，也是八星當中最容易引發重度憂鬱症、焦慮症的磁場。",
    cure: "延年壓六煞（同級或更高級的延年，放在六煞後面）",
  },
  禍害: {
    cat: "xiong", main: "主口舌運",
    levels: { 1:[17,71], 2:[89,98], 3:[46,64], 4:[23,32] },
    pairs: [17,71,89,98,46,64,23,32],
    desc: {
      personal: "能言善道，決策時極度好面子、嘴硬。運勢上容易因為說話得罪人而招致失敗，人生常伴隨「因言獲利」或「因言成災」的兩極化。",
      business: "企業的「超級業務」。適合頂尖Sales、講師、談判專家。靠嘴巴幫公司賺錢，但內部管理時容易與同事發生口舌是非。",
      social:   "情侶夫妻相處中，最容易「因話傷人」，天天吵架、互不相讓。社交上好爭辯，容易因為嘴碎、愛抱怨而把貴人推開。",
      space:    "是非宅與路怒車。住家容易犯小人、與鄰居不和。車牌逢此數，車主極易變成「路怒症」，在車內狂按喇叭或與其他駕駛對罵。",
    },
    health: "【禍害（土）】直接對應呼吸系統（感冒、氣喘、咽喉炎）、口腔疾病、以及淋巴系統。此外，禍害也代表體質較虛、免疫力低下。",
    cure: "生氣＋（生氣／伏位／延年）任一，不限順序",
  },
};

const catColor  = { ji:"#16a34a", xiong:"#dc2626", fuwei:"#b45309", li:"#7c3aed" };
const catBg     = { ji:"#dcfce7", xiong:"#fee2e2", fuwei:"#fef3c7", li:"#ede9fe" };
const lvLabel   = ["","一級","二級","三級","四級"];
const lvColor   = ["","#dc2626","#ea580c","#ca8a04","#64748b"];

// ── 四大分頁設定 ──────────────────────────────────
const CATS = [
  { key:"personal", icon:"🧍", label:"個人運勢", descKey:"personal",
    sub:[ {key:"id",    label:"身分證字號", placeholder:"例：A123456789", isId:true},
          {key:"birth", label:"生日",       placeholder:"例：19901225",   isId:false},
          {key:"bank",  label:"銀行/密碼",  placeholder:"例：00123456",   isId:false} ] },
  { key:"business", icon:"🏢", label:"商業決策", descKey:"business",
    sub:[ {key:"tax",  label:"統一編號", placeholder:"例：12345678", isId:false},
          {key:"date", label:"簽約日期", placeholder:"例：20240101", isId:false} ] },
  { key:"social", icon:"💬", label:"人際情感", descKey:"social",
    sub:[ {key:"mobile", label:"手機號碼", placeholder:"例：0901234567", isId:false},
          {key:"tel",    label:"電話",     placeholder:"例：0223456789", isId:false} ] },
  { key:"space", icon:"🏠", label:"空間環境", descKey:"space",
    sub:[ {key:"door", label:"門牌號碼", placeholder:"例：312",        isId:false},
          {key:"car",  label:"車牌數字", placeholder:"例：1234",       isId:false} ] },
];

// ── 工具函式 ──────────────────────────────────────
function letterToTwo(ch){
  const n=ch.toUpperCase().charCodeAt(0)-64;
  return n<10?"0"+n:""+n;
}
function toIdDigits(raw){
  let s="";
  for(const ch of raw){
    if(/[A-Za-z]/.test(ch)) s+=letterToTwo(ch);
    else if(/[0-9]/.test(ch)) s+=ch;
  }
  return s;
}
function toNumDigits(raw){ return raw.replace(/[^0-9]/g,""); }

function processFiveWithMap(s){
  let arr=s.split("").map((ch,i)=>({ch,origIdx:i}));
  let i=0;
  const deleted=new Set(), changedToZero=new Set();
  while(i<arr.length){
    if(arr[i].ch==="5"){
      const len=arr.length;
      const mid=len%2===1?Math.floor(len/2):-1;
      if(i===0||i===len-1||i===mid){ changedToZero.add(arr[i].origIdx); arr[i].ch="0"; i++; }
      else{ deleted.add(arr[i].origIdx); arr.splice(i,1); }
    } else { i++; }
  }
  return {deleted,changedToZero};
}
function processFive(s){
  const {deleted,changedToZero}=processFiveWithMap(s);
  return s.split("").reduce((acc,ch,i)=>{
    if(deleted.has(i)) return acc;
    if(changedToZero.has(i)) return acc+"0";
    return acc+ch;
  },"");
}
function processPair(d1,d2){
  if(d1==="0"&&d2==="0") return "00";
  if(d1==="0") return d2+d2;
  if(d2==="0") return d1+d1;
  return d1+d2;
}
function lookupPair(n){
  for(const [name,g] of Object.entries(GUAS))
    if(g.pairs.includes(n)) return {name,...g};
  return null;
}
function getLevel(n){
  for(const [name,g] of Object.entries(GUAS))
    for(const [lv,arr] of Object.entries(g.levels))
      if(arr.includes(n)) return {name,level:parseInt(lv),cat:g.cat};
  return null;
}

// 制化偵測
function detectCures(pairList){
  const cures=[];
  const n=pairList.length;
  for(let i=0;i<n;i++){
    const cur=pairList[i]; if(!cur.result) continue;
    if(cur.result.name==="絕命"&&i+1<n){
      const nx=pairList[i+1];
      if(nx.result?.name==="天醫"){
        const lx=getLevel(cur.n),lj=getLevel(nx.n);
        cures.push({type:"天醫制絕命",effective:lj&&lx&&lj.level<=lx.level,lvX:lx?.level,lvJ:lj?.level});
      }
    }
    if(cur.result.name==="六煞"&&i+1<n){
      const nx=pairList[i+1];
      if(nx.result?.name==="延年"){
        const lx=getLevel(cur.n),lj=getLevel(nx.n);
        cures.push({type:"延年壓六煞",effective:lj&&lx&&lj.level<=lx.level,lvX:lx?.level,lvJ:lj?.level});
      }
    }
    if(cur.result.name==="禍害"){
      const win=pairList.slice(Math.max(0,i-2),Math.min(n,i+3));
      if(win.some(p=>p.result?.name==="生氣")&&win.filter(p=>["生氣","伏位","延年"].includes(p.result?.name)).length>=2)
        cures.push({type:"化禍害",effective:true});
    }
    if(cur.result.name==="五鬼"&&i+3<n){
      if(pairList[i+1].result?.name==="生氣"&&pairList[i+2].result?.name==="天醫"&&pairList[i+3].result?.name==="延年")
        cures.push({type:"化五鬼（生氣＋天醫＋延年）",effective:true});
    }
  }
  return cures;
}

// 一般號碼計算
function calcOther(raw){
  const rawDigits=toNumDigits(raw);
  const after5=processFive(rawDigits);
  const pairs=[]; let prevNF=null;
  for(let i=0;i<after5.length-1;i++){
    const d1=after5[i],d2=after5[i+1];
    const proc=processPair(d1,d2);
    const n=parseInt(proc[0])*10+parseInt(proc[1]);
    const result=lookupPair(n);
    const isFuwei=result?.cat==="fuwei";
    const displayResult=isFuwei&&prevNF?{name:prevNF,...GUAS[prevNF]}:result;
    const extendFrom=isFuwei&&prevNF?prevNF:"";
    pairs.push({raw:d1+d2,proc,n,result,displayResult,extendFrom,levelInfo:getLevel(n)});
    if(!isFuwei&&result) prevNF=result.name;
  }
  const count={};
  pairs.forEach(({displayResult})=>{ if(displayResult) count[displayResult.name]=(count[displayResult.name]||0)+1; });
  const cures=detectCures(pairs.map(p=>({n:p.n,result:p.displayResult})));
  return {rawDigits,after5,pairs,count,cures};
}

// 身分證計算
function calcIdMingPan(rawDigits){
  const raw=rawDigits.split("");
  const rawLen=raw.length;
  const {deleted,changedToZero}=processFiveWithMap(rawDigits);
  const after5=processFive(rawDigits);
  const slots=[]; let prevNF=null;
  for(let i=0;i<10;i++){
    const ageStart=13+i*5, ageEnd=ageStart+4;
    const ri=i%rawLen, ri2=(i+1)%rawLen;
    const r1=raw[ri],r2=raw[ri2];
    const r2IsCTZ=changedToZero.has(ri2),r1IsCTZ=changedToZero.has(ri);
    const r2IsDel=deleted.has(ri2),r1IsDel=deleted.has(ri);
    let isArrow=false,proc="";
    if(r2IsCTZ){ isArrow=true; }
    else if(r1IsCTZ){ proc=processPair("0",r2); }
    else if(r1IsDel&&r2IsDel){ isArrow=true; }
    else if(r2IsDel){
      let nextIdx=(ri2+1)%rawLen, safety=0;
      while(deleted.has(nextIdx)&&safety++<10) nextIdx=(nextIdx+1)%rawLen;
      proc=processPair(r1,raw[nextIdx]);
    }
    else if(r1IsDel){ isArrow=true; }
    else{ proc=processPair(r1,r2); }
    const n=isArrow?null:(parseInt(proc[0])*10+parseInt(proc[1]));
    const gua=n!==null?lookupPair(n):null;
    const isFuwei=gua?.cat==="fuwei";
    const displayGua=isArrow?null:(isFuwei&&prevNF?{name:prevNF,...GUAS[prevNF]}:gua);
    const extendFrom=!isArrow&&isFuwei&&prevNF?prevNF:"";
    slots.push({ageStart,ageEnd,r1,r2,proc,n,gua,displayGua,isFuwei,isArrow,isCurrent:false,extendFrom,levelInfo:n!==null?getLevel(n):null});
    if(!isArrow&&!isFuwei&&gua) prevNF=gua.name;
  }
  // 裡象卦
  const liPairs=[];
  for(let i=0;i<slots.length;i++){
    const slot=slots[i]; if(slot.isArrow) continue;
    const ri=i%rawLen, ri2=(i+1)%rawLen;
    const r1=raw[ri],r2=raw[ri2];
    const r2IsPlain=r2==="0"&&!changedToZero.has(ri2)&&!deleted.has(ri2);
    if(r2IsPlain&&r1!=="0"&&r1!=="5"&&!changedToZero.has(ri)&&!deleted.has(ri)){
      let ri3=(ri2+1)%rawLen,safety=0;
      while((deleted.has(ri3)||changedToZero.has(ri3))&&safety++<10) ri3=(ri3+1)%rawLen;
      const r3=raw[ri3];
      if(r3!=="0"&&r3!=="5"){
        const liNum=parseInt(r1)*10+parseInt(r3);
        const result=lookupPair(liNum);
        let liEnd=slot.ageEnd;
        for(let j=i+1;j<slots.length;j++){ if(!slots[j].isArrow){liEnd=slots[j].ageStart-1;break;} liEnd=slots[j].ageEnd; }
        liPairs.push({liNum,result,ageStart:slot.ageStart,ageEnd:liEnd});
      }
    }
  }
  const count={};
  slots.forEach(({displayGua,isArrow})=>{ if(isArrow||!displayGua) return; count[displayGua.name]=(count[displayGua.name]||0)+1; });
  const liCount={};
  liPairs.forEach(({result})=>{ if(result) liCount[result.name]=(liCount[result.name]||0)+1; });
  const cures=detectCures(slots.filter(s=>!s.isArrow&&s.n!==null).map(s=>({n:s.n,result:s.gua})));
  return {after5,slots,liPairs,count,liCount,cures};
}

// ── APP ──────────────────────────────────────────
export default function App() {
  const [catIdx,setCatIdx]=useState(0);
  const [subIdx,setSubIdx]=useState(0);
  const [input,setInput]=useState("");
  const [result,setResult]=useState(null);
  const [showHealth,setShowHealth]=useState(false);

  const cat=CATS[catIdx];
  const sub=cat.sub[subIdx];

  function analyze(){
    const raw=input.trim(); if(!raw) return;
    if(sub.isId){
      const rd=toIdDigits(raw); if(rd.length<2) return;
      setResult({type:"id",rawDigits:rd,...calcIdMingPan(rd)});
    } else {
      const res=calcOther(raw); if(res.rawDigits.length<2) return;
      setResult({type:"other",...res});
    }
  }

  function switchCat(i){ setCatIdx(i); setSubIdx(0); setInput(""); setResult(null); setShowHealth(false); }
  function switchSub(i){ setSubIdx(i); setInput(""); setResult(null); }

  if(showHealth) return <HealthPage onBack={()=>setShowHealth(false)} />;

  return (
    <div style={{maxWidth:560,margin:"0 auto",padding:"20px 16px",fontFamily:"sans-serif",background:"#f8fafc",minHeight:"100vh"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <div style={{fontSize:24,fontWeight:800,color:"#0f172a"}}>數字易經分析</div>
          <div style={{fontSize:13,color:"#64748b",marginTop:2}}>輸入號碼，即時解讀卦象能量</div>
        </div>
        <button onClick={()=>setShowHealth(true)}
          style={{padding:"8px 14px",borderRadius:10,border:"1.5px solid #e2e8f0",background:"#fff",fontSize:13,cursor:"pointer",color:"#475569",fontWeight:500}}>
          🏥 健康
        </button>
      </div>

      {/* 四大分頁 */}
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {CATS.map((c,i)=>(
          <button key={c.key} onClick={()=>switchCat(i)}
            style={{flex:1,padding:"8px 4px",borderRadius:10,border:"1.5px solid",fontSize:12,cursor:"pointer",fontWeight:catIdx===i?700:400,
              borderColor:catIdx===i?"#0f172a":"#e2e8f0",
              background:catIdx===i?"#0f172a":"#fff",
              color:catIdx===i?"#fff":"#64748b",textAlign:"center"}}>
            <div>{c.icon}</div>
            <div style={{fontSize:11,marginTop:2}}>{c.label}</div>
          </button>
        ))}
      </div>

      {/* 子分頁 */}
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {cat.sub.map((s,i)=>(
          <button key={s.key} onClick={()=>switchSub(i)}
            style={{padding:"5px 12px",borderRadius:20,border:"1.5px solid",fontSize:12,cursor:"pointer",fontWeight:subIdx===i?600:400,
              borderColor:subIdx===i?"#475569":"#e2e8f0",
              background:subIdx===i?"#475569":"#fff",
              color:subIdx===i?"#fff":"#64748b"}}>
            {s.label}
          </button>
        ))}
      </div>

      {/* 輸入 */}
      <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #e2e8f0",padding:16,marginBottom:16}}>
        <div style={{fontSize:12,color:"#64748b",marginBottom:6}}>{sub.label}</div>
        <div style={{display:"flex",gap:8}}>
          <input value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&analyze()}
            placeholder={sub.placeholder}
            style={{flex:1,fontSize:15,padding:"9px 12px",borderRadius:10,border:"1.5px solid #e2e8f0",outline:"none",background:"#f8fafc",color:"#0f172a"}} />
          <button onClick={analyze}
            style={{padding:"9px 18px",borderRadius:10,border:"none",background:"#0f172a",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>
            分析
          </button>
        </div>
        <div style={{fontSize:11,color:"#94a3b8",marginTop:8}}>
          {sub.isId?"字母 A=01…Z=26 ｜ 含裡象卦＋流年命盤":"純數字 ｜ 逐格相鄰配對"}
        </div>
      </div>

      {result && <ResultView result={result} descKey={cat.descKey} />}
    </div>
  );
}

// ── 結果頁 ────────────────────────────────────────
function ResultView({result,descKey}){
  const {type,rawDigits,after5,count,liCount,slots,liPairs,pairs,cures}=result;
  const sortedGuas=Object.entries(count||{}).sort((a,b)=>b[1]-a[1]);
  const sortedLi=Object.entries(liCount||{}).sort((a,b)=>b[1]-a[1]);
  const allNames=[...new Set([...sortedGuas.map(([n])=>n),...sortedLi.map(([n])=>n)])];

  return (
    <>
      <div style={{background:"#f1f5f9",borderRadius:10,padding:"8px 12px",marginBottom:14,fontSize:11,color:"#475569",fontFamily:"monospace",lineHeight:1.9}}>
        <div>原始：{rawDigits}</div>
        <div>處理5：{after5}</div>
      </div>

      {/* 命格統計 */}
      <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #e2e8f0",padding:"14px 16px",marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:700,color:"#0f172a",marginBottom:10}}>命格卦象</div>
        {sortedGuas.map(([name,cnt])=>{
          const g=GUAS[name]; if(!g) return null;
          return (
            <div key={name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <span style={{fontSize:16,fontWeight:700,color:catColor[g.cat],minWidth:40}}>{name}</span>
              <span style={{fontSize:16,fontWeight:700,color:"#0f172a"}}>×{cnt}</span>
              <span style={{fontSize:12,color:"#64748b"}}>{g.main}</span>
            </div>
          );
        })}
        {sortedLi.length>0&&(<>
          <div style={{borderTop:"1px solid #f1f5f9",margin:"10px 0 8px",fontSize:11,color:"#94a3b8"}}>裡象卦</div>
          {sortedLi.map(([name,cnt])=>{
            const g=GUAS[name]; if(!g) return null;
            return (
              <div key={name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span style={{fontSize:16,fontWeight:700,color:catColor.li,minWidth:40}}>{name}</span>
                <span style={{fontSize:16,fontWeight:700,color:"#0f172a"}}>×{cnt}</span>
                <span style={{fontSize:12,color:"#7c3aed"}}>{g.main}（裡象）</span>
              </div>
            );
          })}
        </>)}
      </div>

      {/* 制化 */}
      {cures&&cures.length>0&&(
        <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #e2e8f0",padding:"14px 16px",marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,color:"#0f172a",marginBottom:10}}>制化組合</div>
          {cures.map((c,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,padding:"6px 10px",borderRadius:8,background:c.effective?"#dcfce7":"#fef3c7"}}>
              <span style={{fontSize:13,fontWeight:600,color:c.effective?"#15803d":"#92400e"}}>
                {c.effective?"✓":"△"} {c.type}
              </span>
              {c.lvX&&c.lvJ&&<span style={{fontSize:11,color:"#64748b"}}>（凶{lvLabel[c.lvX]} vs 吉{lvLabel[c.lvJ]}）</span>}
              {!c.effective&&<span style={{fontSize:11,color:"#92400e"}}>吉星能量不足，效果有限</span>}
            </div>
          ))}
        </div>
      )}

      {/* 身分證命盤 */}
      {type==="id"&&slots&&<MingPanTable slots={slots} liPairs={liPairs} rawDigits={rawDigits} />}

      {/* 其他號碼配對 */}
      {type==="other"&&pairs&&(
        <div style={{marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,color:"#475569",marginBottom:8}}>逐組卦象</div>
          <div style={{background:"#fff",borderRadius:12,border:"1.5px solid #e2e8f0",overflow:"hidden"}}>
            {pairs.map(({raw,proc,displayResult,extendFrom,levelInfo},i)=>{
              const cls=displayResult?.cat||"fuwei";
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderBottom:i<pairs.length-1?"1px solid #f1f5f9":"none"}}>
                  <span style={{fontSize:14,fontFamily:"monospace",color:"#94a3b8",minWidth:28}}>{raw}</span>
                  <span style={{fontSize:14,fontFamily:"monospace",color:"#475569",minWidth:36}}>→ {proc}</span>
                  <span style={{fontSize:14,fontWeight:600,color:catColor[cls]}}>{displayResult?.name||"未收錄"}</span>
                  {levelInfo&&<span style={{fontSize:11,padding:"1px 6px",borderRadius:99,background:"#f1f5f9",color:lvColor[levelInfo.level]}}>{lvLabel[levelInfo.level]}</span>}
                  {extendFrom&&<span style={{fontSize:11,color:catColor.fuwei}}>↑延續{extendFrom}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 卦象說明（依範疇切換） */}
      {allNames.length>0&&(
        <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #e2e8f0",padding:"14px 16px",marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,color:"#0f172a",marginBottom:12}}>卦象說明</div>
          {allNames.map(name=>{
            const g=GUAS[name]; if(!g) return null;
            const isLiOnly=liCount&&liCount[name]&&!(count&&count[name]);
            return (
              <div key={name} style={{marginBottom:16,paddingBottom:16,borderBottom:"1px solid #f1f5f9"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <span style={{fontSize:15,fontWeight:700,color:catColor[isLiOnly?"li":g.cat]}}>{name}</span>
                  <span style={{fontSize:12,color:"#64748b"}}>{g.main}</span>
                  {isLiOnly&&<span style={{fontSize:11,padding:"1px 6px",borderRadius:99,background:catBg.li,color:catColor.li}}>裡象</span>}
                </div>
                <div style={{fontSize:13,color:"#475569",lineHeight:1.7,marginBottom:8,padding:"8px 12px",background:"#f8fafc",borderRadius:8}}>
                  {g.desc[descKey]}
                </div>
                {g.cure&&(
                  <div style={{padding:"6px 10px",background:"#ede9fe",borderRadius:8}}>
                    <span style={{fontSize:11,fontWeight:700,color:"#7c3aed"}}>化解方式：</span>
                    <span style={{fontSize:11,color:"#6d28d9"}}>{g.cure}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

// ── 命盤表格 ──────────────────────────────────────
function MingPanTable({slots,liPairs,rawDigits}){
  const CELL=38;
  const digits=rawDigits.split("");
  const totalW=digits.length*CELL;
  return (
    <div style={{marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,color:"#475569",marginBottom:8}}>命盤（13–58 歲）</div>
      {liPairs&&liPairs.length>0&&(
        <div style={{marginBottom:8}}>
          {liPairs.map(({liNum,result,ageStart,ageEnd})=>(
            <div key={liNum} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 12px",background:catBg.li,borderRadius:8,marginBottom:4,fontSize:12}}>
              <span style={{fontWeight:700,color:catColor.li}}>裡象卦</span>
              <span style={{fontWeight:700,color:catColor.li}}>{result?.name}（{liNum}）</span>
              {ageStart&&<span style={{color:"#6d28d9"}}>{ageStart}–{ageEnd} 歲</span>}
            </div>
          ))}
        </div>
      )}
      <div style={{overflowX:"auto",paddingBottom:4}}>
        <div style={{width:totalW,minWidth:totalW,paddingLeft:1}}>
          <div style={{display:"flex",border:"1.5px solid #cbd5e1",borderRadius:"8px 8px 0 0",overflow:"hidden"}}>
            {digits.map((d,i)=>(
              <div key={i} style={{width:CELL,height:46,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:700,
                color:d==="5"?"#cbd5e1":"#0f172a",background:d==="5"?"#f8fafc":"#fff",
                borderRight:i<digits.length-1?"1px solid #e2e8f0":"none",textDecoration:d==="5"?"line-through":"none"}}>{d}</div>
            ))}
          </div>
          <div style={{position:"relative",height:22,background:"#f8fafc",border:"1px solid #e2e8f0",borderTop:"none"}}>
            {slots.map(({ageStart},i)=>(
              <div key={i} style={{position:"absolute",left:(i+1)*CELL,top:0,bottom:0,display:"flex",alignItems:"center"}}>
                <span style={{fontSize:10,color:"#64748b",transform:"translateX(-50%)",whiteSpace:"nowrap"}}>{ageStart}</span>
              </div>
            ))}
          </div>
          <div style={{position:"relative",height:28,background:"#fff",border:"1px solid #e2e8f0",borderTop:"none"}}>
            {slots.map(({proc,isArrow,displayGua,levelInfo},i)=>(
              <div key={i} style={{position:"absolute",left:(i+1)*CELL,top:0,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transform:"translateX(-50%)"}}>
                <span style={{fontSize:12,fontWeight:700,color:isArrow?"#cbd5e1":catColor[displayGua?.cat||"fuwei"]}}>{isArrow?"→":proc}</span>
                {!isArrow&&levelInfo&&<span style={{fontSize:9,color:lvColor[levelInfo.level]}}>{lvLabel[levelInfo.level]}</span>}
              </div>
            ))}
          </div>
          <div style={{position:"relative",height:36,background:"#fff",border:"1.5px solid #cbd5e1",borderTop:"1px solid #e2e8f0",borderRadius:"0 0 8px 8px"}}>
            {slots.map(({displayGua,extendFrom,isArrow,isCurrent},i)=>{
              const cls=displayGua?.cat||"fuwei";
              return (
                <div key={i} style={{position:"absolute",left:(i+1)*CELL,top:0,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                  transform:"translateX(-50%)",background:isCurrent?catBg[cls]:"transparent",borderRadius:4,padding:"0 2px",minWidth:CELL-2}}>
                  <span style={{fontSize:11,fontWeight:600,color:isArrow?"#94a3b8":catColor[cls],whiteSpace:"nowrap"}}>{isArrow?"漸變":(displayGua?.name||"?")}</span>
                  {extendFrom&&!isArrow&&<span style={{fontSize:9,color:catColor.fuwei,whiteSpace:"nowrap"}}>↑{extendFrom}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{fontSize:11,color:"#94a3b8",marginTop:6}}>58歲後號碼循環延續。</div>
    </div>
  );
}

// ── 健康頁 ────────────────────────────────────────
function HealthPage({onBack}){
  const jiGuas=Object.entries(GUAS).filter(([,g])=>g.cat==="ji"||g.cat==="fuwei");
  const xiongGuas=Object.entries(GUAS).filter(([,g])=>g.cat==="xiong");
  return (
    <div style={{maxWidth:560,margin:"0 auto",padding:"20px 16px",fontFamily:"sans-serif",background:"#f8fafc",minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <button onClick={onBack} style={{padding:"6px 14px",borderRadius:10,border:"1.5px solid #e2e8f0",background:"#fff",fontSize:13,cursor:"pointer",color:"#475569"}}>← 返回</button>
        <div>
          <div style={{fontSize:20,fontWeight:800,color:"#0f172a"}}>🏥 健康預測</div>
          <div style={{fontSize:12,color:"#64748b"}}>八大磁場對應潛在健康風險</div>
        </div>
      </div>

      <div style={{background:"#fef9c3",borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:12,color:"#854d0e"}}>
        ⚠️ 吉星過猶不及，過多亦會化凶；凶星則直接顯現突發性疾病。本資訊僅供參考，身體不適請就醫。
      </div>

      <div style={{fontSize:13,fontWeight:700,color:"#15803d",marginBottom:8}}>四大吉星</div>
      {jiGuas.map(([name,g])=>(
        <div key={name} style={{background:"#fff",borderRadius:12,border:"1.5px solid #e2e8f0",padding:"12px 14px",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <span style={{fontSize:15,fontWeight:700,color:catColor[g.cat]}}>{name}</span>
            <span style={{fontSize:12,color:"#64748b"}}>{g.main}</span>
          </div>
          <div style={{fontSize:13,color:"#475569",lineHeight:1.7}}>{g.health}</div>
        </div>
      ))}

      <div style={{fontSize:13,fontWeight:700,color:"#dc2626",marginBottom:8,marginTop:8}}>四大凶星</div>
      {xiongGuas.map(([name,g])=>(
        <div key={name} style={{background:"#fff",borderRadius:12,border:"1.5px solid #fee2e2",padding:"12px 14px",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <span style={{fontSize:15,fontWeight:700,color:catColor[g.cat]}}>{name}</span>
            <span style={{fontSize:12,color:"#64748b"}}>{g.main}</span>
          </div>
          <div style={{fontSize:13,color:"#475569",lineHeight:1.7}}>{g.health}</div>
        </div>
      ))}
    </div>
  );
}
