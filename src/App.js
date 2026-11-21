import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, ArrowLeftRight, Wallet, HandCoins, Target, ChartNoAxesCombined,
  Bot, Settings, Search, Bell, Plus, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  CalendarDays, ChevronDown, Menu, X, LogOut, TrendingUp, TrendingDown, Sparkles,
  CircleHelp, Check, Trash2, Pencil, CreditCard, CircleDollarSign, PiggyBank,
  Utensils, CarFront, Shirt, House, GraduationCap, HeartPulse, Ticket, CircleEllipsis,
  Laptop, Plane, ShoppingBag, BriefcaseBusiness, Send, MessageCircle, ShieldCheck,
  Eye, EyeOff, ChevronRight, Filter, Download, RotateCcw, WalletCards
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { CATEGORIES, initialData } from "./data";

const STORAGE_KEY = "my-finance-data-v1";
const USERS_KEY = "my-finance-users-v1";
const SESSION_KEY = "my-finance-session-v1";
const money = (n) => new Intl.NumberFormat("uz-UZ").format(Math.round(Number(n) || 0)) + " so‘m";
const formatAmount = (value) => String(value ?? "").replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const parseAmount = (value) => Number(String(value ?? "").replace(/\D/g, "")) || 0;
const emptyData = { monthlySalary: 0, income: [], expenses: [], debts: [], goals: [] };
const dateLabel = (d) => new Date(d + "T00:00:00").toLocaleDateString("uz-UZ", { day:"2-digit", month:"short", year:"numeric" });
const today = () => new Date().toISOString().slice(0,10);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);
const readJSON = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };
const Icon = ({ name, size=18, ...props }) => {
  const icons = { Utensils, CarFront, Shirt, House, GraduationCap, HeartPulse, Ticket, CircleEllipsis, Laptop, Plane };
  const Comp = icons[name] || CircleDollarSign;
  return <Comp size={size} strokeWidth={1.8} {...props} />;
};

function Auth({ onLogin }) {
  const [mode, setMode] = useState("register");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const submit = (e) => {
    e.preventDefault(); setError("");
    const users = readJSON(USERS_KEY, []);
    if (!login.trim() || password.length < 4) return setError("Login kiriting va parol kamida 4 ta belgidan iborat bo‘lsin.");
    if (mode === "register") {
      if (users.some(u => u.login.toLowerCase() === login.trim().toLowerCase())) return setError("Bu login band. Boshqa login tanlang.");
      const user = { id: uid(), login: login.trim(), password, name: name.trim() || login.trim() };
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
      localStorage.setItem(SESSION_KEY, JSON.stringify({ id:user.id, login:user.login, name:user.name }));
      onLogin({ id:user.id, login:user.login, name:user.name });
    } else {
      const user = users.find(u => u.login.toLowerCase() === login.trim().toLowerCase() && u.password === password);
      if (!user) return setError("Login yoki parol noto‘g‘ri.");
      localStorage.setItem(SESSION_KEY, JSON.stringify({ id:user.id, login:user.login, name:user.name }));
      onLogin({ id:user.id, login:user.login, name:user.name });
    }
  };
  return <div className="auth-screen">
    <div className="auth-visual">
      <div className="auth-brand"><span className="brand-mark">m.</span><span>MY FINANCE</span></div>
      <div className="auth-copy"><span className="eyebrow light">MOLIYAVIY ERKINLIK SARI</span><h1>Pulingizni<br/><em>boshqaring.</em><br/>Maqsadingizga<br/>yaqinlashing.</h1><p>Har bir qaror, har bir so‘m va har bir maqsad — barchasi nazoratingizda.</p></div>
      <div className="auth-foot"><span>PERSONAL FINANCE, REIMAGINED</span><span>01 / 2026</span></div>
      <div className="auth-orb orb-one"/><div className="auth-orb orb-two"/>
    </div>
    <div className="auth-form-wrap">
      <div className="auth-form">
        <div className="mobile-brand"><span className="brand-mark">m.</span> MY FINANCE</div>
        <span className="eyebrow">{mode === "register" ? "YANGI BOSHLANISH" : "QAYTGANINGIZDAN XURSANDMIZ"}</span>
        <h2>{mode === "register" ? "Hisob yarating" : "Xush kelibsiz"}</h2>
        <p className="muted">{mode === "register" ? "Shaxsiy moliyangizni boshqarishni bugun boshlang." : "Davom etish uchun hisobingizga kiring."}</p>
        <form onSubmit={submit}>
          {mode === "register" && <label>Ismingiz<input value={name} onChange={e=>setName(e.target.value)} placeholder="Masalan, Sayyorbek"/></label>}
          <label>Login<input value={login} onChange={e=>setLogin(e.target.value)} placeholder="Login yarating" autoComplete="username"/></label>
          <label>Parol<div className="password-field"><input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Kamida 4 ta belgi" autoComplete={mode==="register"?"new-password":"current-password"}/><button type="button" className="icon-button" onClick={()=>setShow(!show)}>{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
          {error && <div className="form-error">{error}</div>}
          <button className="button button-dark full-button" type="submit">{mode==="register"?"Hisob yaratish":"Kirish"} <ArrowUpRight size={17}/></button>
        </form>
        <p className="switch-auth">{mode==="register"?"Hisobingiz bormi?":"Hali hisobingiz yo‘qmi?"} <button onClick={()=>{setMode(mode==="register"?"login":"register");setError("");}}>{mode==="register"?"Kirish":"Ro‘yxatdan o‘tish"}</button></p>
        <div className="auth-note"><ShieldCheck size={15}/> Ma’lumotlaringiz ushbu brauzerda saqlanadi</div>
      </div>
    </div>
  </div>;
}

const nav = [
  { label:"Umumiy ko‘rinish", icon:LayoutDashboard, id:"dashboard", group:"ASOSIY" },
  { label:"Operatsiyalar", icon:ArrowLeftRight, id:"transactions", group:"ASOSIY" },
  { label:"Daromadlar", icon:Wallet, id:"income", group:"ASOSIY" },
  { label:"Xarajatlar", icon:CreditCard, id:"expenses", group:"ASOSIY" },
  { label:"Qarzlar", icon:HandCoins, id:"debts", group:"MOLIYA" },
  { label:"Maqsadlar", icon:Target, id:"goals", group:"MOLIYA" },
  { label:"Statistika", icon:ChartNoAxesCombined, id:"analytics", group:"MOLIYA" },
  { label:"AI maslahatchi", icon:Bot, id:"ai", group:"YORDAMCHI" },
  { label:"Sozlamalar", icon:Settings, id:"settings", group:"YORDAMCHI" }
];

function App() {
  const [user,setUser] = useState(()=>readJSON(SESSION_KEY,null));
  const [data,setData] = useState(()=>readJSON(STORAGE_KEY,initialData));
  const [page,setPage] = useState("dashboard");
  const [modal,setModal] = useState(null);
  const [editing,setEditing] = useState(null);
  const [toast,setToast] = useState("");
  const [mobileOpen,setMobileOpen] = useState(false);
  const [query,setQuery] = useState("");
  const [period,setPeriod] = useState("month");
  const [dark,setDark] = useState(false);

  useEffect(()=>{ localStorage.setItem(STORAGE_KEY,JSON.stringify(data)); },[data]);
  useEffect(()=>{ if(toast){const t=setTimeout(()=>setToast(""),2800);return()=>clearTimeout(t);} },[toast]);
  const update = (key, value) => setData(prev=>({...prev,[key]:value}));
  const addItem = (key,item) => { update(key,[{...item,id:uid()},...data[key]]); setModal(null);setEditing(null);setToast("Ma’lumot muvaffaqiyatli saqlandi"); };
  const saveItem = (key,item) => {
    if(editing) update(key,data[key].map(x=>x.id===editing.id?{...item,id:editing.id}:x));
    else update(key,[{...item,id:uid()},...data[key]]);
    setModal(null);setEditing(null);setToast("O‘zgarishlar saqlandi");
  };
  const removeItem = (key,id) => { if(window.confirm("Ushbu ma’lumotni o‘chirishni tasdiqlaysizmi?")){update(key,data[key].filter(x=>x.id!==id));setToast("Ma’lumot o‘chirildi");} };
  const totalIncome = data.income.reduce((s,x)=>s+Number(x.amount),0);
  const totalExpense = data.expenses.reduce((s,x)=>s+Number(x.amount),0);
  const receivable = data.debts.filter(x=>x.direction==="receivable").reduce((s,x)=>s+Math.max(0,x.amount-x.paid),0);
  const payable = data.debts.filter(x=>x.direction==="payable").reduce((s,x)=>s+Math.max(0,x.amount-x.paid),0);
  const balance = totalIncome-totalExpense;
  const currentMonth = new Date().toISOString().slice(0,7);
  const monthIncome = data.income.filter(x=>x.date.startsWith(currentMonth)).reduce((s,x)=>s+Number(x.amount),0);
  const monthExpense = data.expenses.filter(x=>x.date.startsWith(currentMonth)).reduce((s,x)=>s+Number(x.amount),0);
  const recent = useMemo(()=>[
    ...data.income.map(x=>({...x,type:"income"})),
    ...data.expenses.map(x=>({...x,type:"expense"}))
  ].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6),[data]);
  const logout = () => {localStorage.removeItem(SESSION_KEY);setUser(null);};
  if(!user) return <Auth onLogin={setUser}/>;

  const openAdd = (type,item=null) => {setEditing(item);setModal(type);};
  const pageTitle = nav.find(x=>x.id===page)?.label || "Umumiy ko‘rinish";

  return <div className={`app-shell ${dark?"theme-dark":""}`}>
    <aside className={`sidebar ${mobileOpen?"sidebar-open":""}`}>
      <div className="side-brand"><span className="brand-mark">m.</span><span>MY FINANCE<small>PERSONAL WEALTH</small></span><button className="mobile-close icon-button" onClick={()=>setMobileOpen(false)}><X size={19}/></button></div>
      <div className="workspace-label">WORKSPACE <span className="status-dot"/></div>
      {["ASOSIY","MOLIYA","YORDAMCHI"].map(group=><div className="nav-group" key={group}><div className="nav-caption">{group}</div>{nav.filter(n=>n.group===group).map(item=><button key={item.id} className={`nav-link ${page===item.id?"active":""}`} onClick={()=>{setPage(item.id);setMobileOpen(false);}}><item.icon size={18}/><span>{item.label}</span>{item.id==="ai"&&<span className="nav-new">AI</span>}</button>)}</div>)}
      <div className="sidebar-bottom"><div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={17}/></div><b>Moliyaviy maqsadlar</b><p>Kichik qadamlar katta natijaga olib boradi.</p><button onClick={()=>setPage("goals")}>Maqsadlarni ko‘rish <ArrowUpRight size={14}/></button></div><div className="profile-mini"><div className="avatar">{(user.name||"U").slice(0,1).toUpperCase()}</div><div className="profile-meta"><b>{user.name}</b><span>Shaxsiy hisob</span></div><button className="icon-button" title="Chiqish" onClick={logout}><LogOut size={17}/></button></div></div>
    </aside>
    {mobileOpen&&<div className="mobile-backdrop" onClick={()=>setMobileOpen(false)}/>}
    <main className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu icon-button" onClick={()=>setMobileOpen(true)}><Menu/></button><div><div className="breadcrumb">MY FINANCE <ChevronRight size={13}/> <b>{pageTitle}</b></div><div className="top-date"><CalendarDays size={14}/> {new Date().toLocaleDateString("uz-UZ",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div></div></div><div className="top-actions"><div className="search-box"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Qidirish..."/></div><button className="icon-button notification-button" onClick={()=>setToast("Hozircha yangi bildirishnomalar yo‘q")}><Bell size={18}/><i/></button><div className="top-avatar">{(user.name||"U").slice(0,1).toUpperCase()}</div></div></header>
      <div className="content-wrap">
        {page==="dashboard"&&<Dashboard data={data} balance={balance} totalIncome={totalIncome} totalExpense={totalExpense} monthIncome={monthIncome} monthExpense={monthExpense} receivable={receivable} payable={payable} recent={recent} onNavigate={setPage} onAdd={openAdd}/>}
        {page==="transactions"&&<Transactions data={data} query={query} onAdd={openAdd} onEdit={openAdd} onDelete={removeItem}/>}
        {page==="income"&&<Ledger type="income" items={data.income} query={query} onAdd={openAdd} onEdit={openAdd} onDelete={removeItem}/>}
        {page==="expenses"&&<Ledger type="expenses" items={data.expenses} query={query} onAdd={openAdd} onEdit={openAdd} onDelete={removeItem}/>}
        {page==="debts"&&<Debts items={data.debts} onAdd={openAdd} onEdit={openAdd} onDelete={removeItem}/>}
        {page==="goals"&&<Goals items={data.goals} onAdd={openAdd} onEdit={openAdd} onDelete={removeItem} onUpdate={update}/>}
        {page==="analytics"&&<Analytics data={data} period={period} setPeriod={setPeriod}/>}
        {page==="ai"&&<AIChat data={data}/>}
        {page==="settings"&&<SettingsPage user={user} data={data} onUpdate={update} onReset={()=>setData(emptyData)} dark={dark} setDark={setDark} onToast={setToast}/> }
      </div>
    </main>
    {modal&&<EntryModal type={modal} item={editing} onClose={()=>{setModal(null);setEditing(null);}} onSave={saveItem}/>}
    {toast&&<div className="toast"><span className="toast-check"><Check size={15}/></span>{toast}</div>}
  </div>;
}

function PageHeading({eyebrow,title,description,action,children}) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div><div className="heading-actions">{children}{action}</div></div>;
}
function StatCard({label,value,change,icon:IconComp,tone="sand",caption}) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><span className={`stat-icon ${tone}`}><IconComp size={18}/></span></div><div className="stat-value">{value}</div><div className="stat-bottom">{change&&<span className="stat-change"><TrendingUp size={13}/>{change}</span>}<span>{caption}</span></div></div>;
}
function Dashboard({data,balance,totalIncome,totalExpense,monthIncome,monthExpense,receivable,payable,recent,onNavigate,onAdd}) {
  const savings = monthIncome-monthExpense;
  const chart = Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));const key=d.toISOString().slice(0,10);return {day:d.toLocaleDateString("uz-UZ",{weekday:"short"}),income:data.income.filter(x=>x.date===key).reduce((s,x)=>s+x.amount,0),expense:data.expenses.filter(x=>x.date===key).reduce((s,x)=>s+x.amount,0)};});
  return <>
    <PageHeading eyebrow="SHAXSIY MOLIYA / 01" title="Xush kelibsiz!" description="Moliyaviy holatingizni nazorat qiling va maqsadlaringizga yaqinlashing."><button className="button button-dark" onClick={()=>onAdd("expense")}><Plus size={17}/> Xarajat qo‘shish</button></PageHeading>
    <section className="hero-balance">
      <div className="hero-balance-main"><div className="hero-label"><span className="hero-pulse"/> UMUMIY BALANS</div><div className="hero-amount">{money(balance)}</div><div className="hero-sub">Jami daromad va xarajatlar farqi</div><div className="hero-actions"><button className="button button-light" onClick={()=>onAdd("income")}><Plus size={16}/> Daromad kiritish</button><button className="hero-text-button" onClick={()=>onNavigate("analytics")}>Batafsil tahlil <ArrowUpRight size={15}/></button></div></div>
      <div className="hero-balance-side"><div className="hero-side-label">BU OY TEJALDI</div><div className="hero-saved">{money(savings)}</div><div className="hero-side-note"><span className={savings>=0?"positive":"negative"}>{savings>=0?"+" : "−"} {money(Math.abs(savings))}</span><span> daromad − xarajat</span></div><div className="hero-decoration"><div className="ring ring-a"/><div className="ring ring-b"/><span>MF</span></div></div>
    </section>
    <div className="stats-grid">
      <StatCard label="Jami daromad" value={money(totalIncome)} change="Kirimlar" caption="Barcha tushumlar" icon={ArrowDownRight} tone="sage"/>
      <StatCard label="Jami xarajat" value={money(totalExpense)} caption="Barcha sarflar" icon={ArrowUpRight} tone="rose"/>
      <StatCard label="Olinadigan qarz" value={money(receivable)} caption="Sizga qaytarilishi kerak" icon={HandCoins} tone="gold"/>
      <StatCard label="To‘lanadigan qarz" value={money(payable)} caption="Siz to‘lashingiz kerak" icon={WalletCards} tone="lavender"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel chart-panel"><div className="panel-heading"><div><span className="eyebrow">MOLIYAVIY OQIM</span><h3>Daromad va xarajat</h3></div><button className="select-pill" onClick={()=>onNavigate("analytics")}>Oxirgi 7 kun <ChevronDown size={14}/></button></div><div className="chart-legend"><span><i className="legend-dot income-dot"/> Daromad</span><span><i className="legend-dot expense-dot"/> Xarajat</span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chart} margin={{top:10,right:8,left:-18,bottom:0}}><defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#819486" stopOpacity={0.22}/><stop offset="100%" stopColor="#819486" stopOpacity={0}/></linearGradient><linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C98D78" stopOpacity={0.18}/><stop offset="100%" stopColor="#C98D78" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:"#92968e",fontSize:11}}/><YAxis axisLine={false} tickLine={false} tick={{fill:"#92968e",fontSize:10}} tickFormatter={v=>v>=1000000?(v/1000000)+"m":v>=1000?(v/1000)+"k":v}/><Tooltip formatter={v=>money(v)} contentStyle={{borderRadius:12,border:"1px solid #e9e5dc",fontSize:12}}/><Area type="monotone" dataKey="income" name="Daromad" stroke="#819486" strokeWidth={2.5} fill="url(#incomeFill)"/><Area type="monotone" dataKey="expense" name="Xarajat" stroke="#C98D78" strokeWidth={2.5} fill="url(#expenseFill)"/></AreaChart></ResponsiveContainer></div></section>
      <section className="panel quick-panel"><div className="panel-heading"><div><span className="eyebrow">TEZKOR AMALLAR</span><h3>Qulay boshqaruv</h3></div><MoreHorizontal size={19} className="muted-icon"/></div><div className="quick-actions"><button onClick={()=>onAdd("income")}><span className="quick-icon sage"><ArrowDownRight/></span><span><b>Daromad qo‘shish</b><small>Yangi tushumni kiriting</small></span><ChevronRight/></button><button onClick={()=>onAdd("expense")}><span className="quick-icon rose"><ArrowUpRight/></span><span><b>Xarajat qo‘shish</b><small>Sarflangan mablag‘</small></span><ChevronRight/></button><button onClick={()=>onAdd("debt")}><span className="quick-icon gold"><HandCoins/></span><span><b>Qarz qo‘shish</b><small>Qarzlarni nazorat qiling</small></span><ChevronRight/></button><button onClick={()=>onAdd("goal")}><span className="quick-icon lavender"><Target/></span><span><b>Maqsad yaratish</b><small>Kelajak uchun jamg‘aring</small></span><ChevronRight/></button></div></section>
    </div>
    <section className="panel recent-panel"><div className="panel-heading"><div><span className="eyebrow">SO‘NGGI FAOLLIK</span><h3>Oxirgi operatsiyalar</h3></div><button className="text-link" onClick={()=>onNavigate("transactions")}>Barchasini ko‘rish <ArrowUpRight size={15}/></button></div><TransactionTable items={recent} compact/></section>
    <div className="dashboard-bottom"><div className="insight-card"><div className="insight-icon"><Sparkles size={19}/></div><div><span className="eyebrow">BUGUNGI TAVSIYA</span><h3>Moliyaviy odatlarni shakllantiring</h3><p>Har bir xarajatni qayd etish orqali pulingiz qayerga ketayotganini aniq ko‘rasiz.</p></div><button onClick={()=>onNavigate("ai")}><Bot size={16}/> AI bilan maslahat</button></div><div className="mini-goals panel"><div className="panel-heading"><div><span className="eyebrow">REJALARINGIZ</span><h3>Maqsadlar</h3></div><button className="text-link" onClick={()=>onNavigate("goals")}>Barchasi <ArrowUpRight size={14}/></button></div>{data.goals.slice(0,2).map(g=><div className="mini-goal" key={g.id}><div className="mini-goal-top"><b>{g.title}</b><span>{Math.min(100,Math.round(g.saved/g.target*100))}%</span></div><div className="progress-track"><i style={{width:`${Math.min(100,g.saved/g.target*100)}%`}}/></div><small>{money(g.saved)} / {money(g.target)}</small></div>)}</div></div>
  </>;
}

function TransactionTable({items,compact=false,onEdit,onDelete}) {
  if(!items.length) return <div className="empty-state"><div className="empty-icon"><ArrowLeftRight/></div><b>Hozircha operatsiyalar yo‘q</b><span>Birinchi ma’lumotni qo‘shishdan boshlang.</span></div>;
  return <div className="table-scroll"><table className="data-table"><thead><tr><th>OPERATSIYA</th><th>KATEGORIYA</th><th>SANA</th><th>SUMMA</th>{!compact&&<th>AMALLAR</th>}</tr></thead><tbody>{items.map(x=><tr key={x.id}><td><div className="transaction-name"><span className={`transaction-icon ${x.type==="income"?"sage":"rose"}`}>{x.type==="income"?<ArrowDownRight size={17}/>:<ArrowUpRight size={17}/>}</span><span><b>{x.title}</b><small>{x.note|| (x.type==="income"?"Daromad":"Xarajat")}</small></span></div></td><td><span className="category-label">{x.category}</span></td><td className="date-cell">{dateLabel(x.date)}</td><td><b className={x.type==="income"?"amount-positive":"amount-negative"}>{x.type==="income"?"+":"−"} {money(x.amount)}</b></td>{!compact&&<td><div className="table-actions"><button className="icon-button" onClick={()=>onEdit(x.type==="income"?"income":"expenses",x)}><Pencil size={15}/></button><button className="icon-button danger-hover" onClick={()=>onDelete(x.type==="income"?"income":"expenses",x.id)}><Trash2 size={15}/></button></div></td>}</tr>)}</tbody></table></div>;
}
function Transactions({data,query,onAdd,onEdit,onDelete}) {
  const all=[...data.income.map(x=>({...x,type:"income"})),...data.expenses.map(x=>({...x,type:"expense"}))].filter(x=>(x.title+" "+x.category).toLowerCase().includes(query.toLowerCase())).sort((a,b)=>b.date.localeCompare(a.date));
  return <><PageHeading eyebrow="MOLIYAVIY HARAKATLAR / 02" title="Operatsiyalar" description="Barcha kirim va chiqimlaringiz yagona ro‘yxatda."><button className="button button-dark" onClick={()=>onAdd("expense")}><Plus size={17}/> Yangi operatsiya</button></PageHeading><section className="panel"><div className="panel-heading"><div><span className="eyebrow">BARCHA YOZUVLAR</span><h3>Operatsiyalar tarixi <span className="count-badge">{all.length}</span></h3></div><span className="subtle-pill"><Filter size={14}/> Barcha turlar</span></div><TransactionTable items={all} onEdit={onEdit} onDelete={onDelete}/></section></>;
}
function Ledger({type,items,query,onAdd,onEdit,onDelete}) {
  const income=type==="income";const filtered=items.filter(x=>(x.title+" "+x.category).toLowerCase().includes(query.toLowerCase()));
  const sum=items.reduce((s,x)=>s+Number(x.amount),0);
  return <><PageHeading eyebrow={income?"DAROMADLAR / 03":"XARAJATLAR / 04"} title={income?"Daromadlar":"Xarajatlar"} description={income?"Barcha daromad manbalaringizni bir joyda kuzating.":"Har bir sarfni qayd eting va budjetingizni nazorat qiling."}><button className="button button-dark" onClick={()=>onAdd(income?"income":"expense")}><Plus size={17}/>{income?"Daromad qo‘shish":"Xarajat qo‘shish"}</button></PageHeading><div className="ledger-summary"><div><span>{income?"JAMI DAROMAD":"JAMI XARAJAT"}</span><b>{money(sum)}</b><small>{items.length} ta yozuv</small></div><div className="ledger-summary-icon">{income?<ArrowDownRight/>:<ArrowUpRight/>}</div></div><section className="panel"><div className="panel-heading"><div><span className="eyebrow">TRANZAKSIYALAR</span><h3>{income?"Daromadlar tarixi":"Xarajatlar tarixi"}</h3></div><span className="subtle-pill"><CalendarDays size={14}/> Barcha sanalar</span></div><TransactionTable items={filtered.map(x=>({...x,type:income?"income":"expense"}))} onEdit={onEdit} onDelete={onDelete}/></section></>;
}
function Debts({items,onAdd,onEdit,onDelete}) {
  const getDue=x=>Math.max(0,x.amount-x.paid);const incoming=items.filter(x=>x.direction==="receivable");const outgoing=items.filter(x=>x.direction==="payable");
  const card=(x)=><div className="debt-card" key={x.id}><div className="debt-card-top"><span className={`debt-avatar ${x.direction}`}>{x.direction==="receivable"?<ArrowDownRight/>:<ArrowUpRight/>}</span><div className="debt-card-menu"><button className="icon-button" onClick={()=>onEdit("debt",x)}><Pencil size={15}/></button><button className="icon-button danger-hover" onClick={()=>onDelete("debts",x.id)}><Trash2 size={15}/></button></div></div><div className="debt-person">{x.person}</div><div className="debt-title">{x.title}</div><div className="debt-amount">{money(getDue(x))}</div><div className="debt-meta"><span>{x.direction==="receivable"?"Qaytarilishi kerak":"To‘lanishi kerak"}</span><span>{dateLabel(x.dueDate)}</span></div><div className="progress-track"><i style={{width:`${Math.min(100,x.paid/x.amount*100)}%`}}/></div><div className="debt-paid">To‘langan: {money(x.paid)} / {money(x.amount)}</div></div>;
  return <><PageHeading eyebrow="QARZLAR / 05" title="Qarzlar nazorati" description="Olinadigan va to‘lanadigan qarzlarni unutib qo‘ymang."><button className="button button-dark" onClick={()=>onAdd("debt")}><Plus size={17}/> Qarz qo‘shish</button></PageHeading><div className="stats-grid two-stats"><StatCard label="Olinishi kerak" value={money(incoming.reduce((s,x)=>s+getDue(x),0))} caption="Sizga qaytarilishi kerak" icon={ArrowDownRight} tone="sage"/><StatCard label="To‘lanishi kerak" value={money(outgoing.reduce((s,x)=>s+getDue(x),0))} caption="Siz to‘lashingiz kerak" icon={ArrowUpRight} tone="rose"/></div><div className="debt-section"><div className="section-title"><div><span className="eyebrow">RECEIVABLES</span><h3>Olinadigan qarzlar</h3></div><span className="count-badge">{incoming.length}</span></div><div className="debt-grid">{incoming.length?incoming.map(card):<div className="panel empty-inline">Olinadigan qarzlar mavjud emas.</div>}</div></div><div className="debt-section"><div className="section-title"><div><span className="eyebrow">PAYABLES</span><h3>To‘lanadigan qarzlar</h3></div><span className="count-badge">{outgoing.length}</span></div><div className="debt-grid">{outgoing.length?outgoing.map(card):<div className="panel empty-inline">To‘lanadigan qarzlar mavjud emas.</div>}</div></div></>;
}
function Goals({items,onAdd,onEdit,onDelete,onUpdate}) {
  const [deposit,setDeposit]=useState(null);const [amount,setAmount]=useState("");
  const addMoney=(e)=>{e.preventDefault();const g=items.find(x=>x.id===deposit);const added=parseAmount(amount);if(!g||added<=0)return;onUpdate("goals",items.map(x=>x.id===deposit?{...x,saved:Number(x.saved)+added}:x));setDeposit(null);setAmount("");};
  const icons={Laptop,Plane,Target};
  return <><PageHeading eyebrow="KELAJAK REJALARI / 06" title="Maqsadlar" description="Orzularingizga aniq reja va muntazam jamg‘arma bilan erishing."><button className="button button-dark" onClick={()=>onAdd("goal")}><Plus size={17}/> Maqsad yaratish</button></PageHeading><div className="goal-intro"><div><span className="eyebrow light">YOUR NEXT MILESTONE</span><h2>Bugungi jamg‘arma —<br/><em>ertangi imkoniyat.</em></h2><p>Har bir kichik qadam sizni katta maqsadga yaqinlashtiradi.</p></div><div className="goal-intro-stat"><span>UMUMIY JAMG‘ARMA</span><b>{money(items.reduce((s,x)=>s+Number(x.saved),0))}</b><small>{items.length} ta faol maqsad</small></div><div className="goal-sun"/><div className="goal-sun-two"/></div><div className="goal-grid">{items.map(g=>{const pct=Math.min(100,Math.round(g.saved/g.target*100));const GIcon=icons[g.icon]||Target;return <div className="goal-card" key={g.id}><div className="goal-card-top"><span className="goal-icon"><GIcon size={21}/></span><div className="table-actions"><button className="icon-button" onClick={()=>onEdit("goal",g)}><Pencil size={15}/></button><button className="icon-button danger-hover" onClick={()=>onDelete("goals",g.id)}><Trash2 size={15}/></button></div></div><h3>{g.title}</h3><div className="goal-percent">{pct}<small>%</small></div><div className="progress-track large"><i style={{width:`${pct}%`}}/></div><div className="goal-values"><b>{money(g.saved)}</b><span>maqsad: {money(g.target)}</span></div><div className="goal-footer"><span><CalendarDays size={14}/> {dateLabel(g.deadline)}</span><button className="button button-outline small-button" onClick={()=>{setDeposit(g.id);setAmount("");}}>+ Pul qo‘shish</button></div></div>;})}{!items.length&&<div className="panel empty-state"><Target/><b>Hali maqsad yaratilmagan</b><span>Birinchi maqsadingizni yarating.</span></div>}</div>{deposit&&<div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&setDeposit(null)}><form className="modal-card compact-modal" onSubmit={addMoney}><div className="modal-heading"><div><span className="eyebrow">JAMG‘ARMA</span><h2>Pul qo‘shish</h2></div><button type="button" className="icon-button" onClick={()=>setDeposit(null)}><X/></button></div><p className="muted">{items.find(x=>x.id===deposit)?.title} maqsadiga mablag‘ qo‘shing.</p><label>Summa (so‘m)<input type="text" inputMode="numeric" required value={amount} onChange={e=>setAmount(formatAmount(e.target.value))} placeholder="500 000"/></label><button className="button button-dark full-button">Jamg‘armaga qo‘shish <ArrowUpRight size={16}/></button></form></div>}</>;
}
function Analytics({data,period,setPeriod}) {
  const [year,setYear]=useState(new Date().getFullYear());
  const monthly=Array.from({length:12},(_,i)=>{const key=`${year}-${String(i+1).padStart(2,"0")}`;return {month:new Date(year,i,1).toLocaleDateString("uz-UZ",{month:"short"}),income:data.income.filter(x=>x.date.startsWith(key)).reduce((s,x)=>s+x.amount,0),expense:data.expenses.filter(x=>x.date.startsWith(key)).reduce((s,x)=>s+x.amount,0)};});
  const monthKey=new Date().toISOString().slice(0,7);const monthIncome=data.income.filter(x=>x.date.startsWith(monthKey)).reduce((s,x)=>s+x.amount,0);const monthExpense=data.expenses.filter(x=>x.date.startsWith(monthKey)).reduce((s,x)=>s+x.amount,0);
  const cats=CATEGORIES.map(c=>({...c,value:data.expenses.filter(x=>x.category===c.name).reduce((s,x)=>s+x.amount,0)})).filter(x=>x.value>0);
  const palette=["#819486","#D5A46B","#C98D78","#9E9B84","#A99ABB","#7E9299","#B9A88E","#9B897C"];
  return <><PageHeading eyebrow="MOLIYAVIY HISOBOT / 07" title="Statistika" description="Moliyaviy odatlaringizni raqamlar orqali tushuning."><select className="select-pill" value={year} onChange={e=>setYear(Number(e.target.value))}><option>{new Date().getFullYear()}</option><option>{new Date().getFullYear()-1}</option></select></PageHeading><div className="stats-grid two-stats"><StatCard label="Bu oy daromad" value={money(monthIncome)} caption="Joriy oy" icon={ArrowDownRight} tone="sage"/><StatCard label="Bu oy xarajat" value={money(monthExpense)} caption="Joriy oy" icon={ArrowUpRight} tone="rose"/><StatCard label="Tejalgan mablag‘" value={money(monthIncome-monthExpense)} caption="Daromad − xarajat" icon={PiggyBank} tone="gold"/><StatCard label="Jamg‘arma maqsadlari" value={money(data.goals.reduce((s,x)=>s+x.saved,0))} caption="Barcha maqsadlar" icon={Target} tone="lavender"/></div><div className="analytics-grid"><section className="panel"><div className="panel-heading"><div><span className="eyebrow">YILLIK TAQQOSLASH</span><h3>Daromad va xarajatlar</h3></div><span className="subtle-pill">{year}</span></div><div className="chart-legend"><span><i className="legend-dot income-dot"/> Daromad</span><span><i className="legend-dot expense-dot"/> Xarajat</span></div><div className="analytics-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={monthly} margin={{top:10,right:8,left:-12,bottom:0}}><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:"#92968e",fontSize:11}}/><YAxis axisLine={false} tickLine={false} tick={{fill:"#92968e",fontSize:10}} tickFormatter={v=>v>=1000000?(v/1000000)+"m":v/1000+"k"}/><Tooltip formatter={v=>money(v)}/><Area type="monotone" dataKey="income" name="Daromad" stroke="#819486" fill="#819486" fillOpacity={0.12} strokeWidth={2.5}/><Area type="monotone" dataKey="expense" name="Xarajat" stroke="#C98D78" fill="#C98D78" fillOpacity={0.10} strokeWidth={2.5}/></AreaChart></ResponsiveContainer></div></section><section className="panel category-panel"><div className="panel-heading"><div><span className="eyebrow">XARAJATLAR TAQSIMOTI</span><h3>Kategoriyalar</h3></div></div>{cats.length?<><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={cats} dataKey="value" nameKey="name" innerRadius={63} outerRadius={88} paddingAngle={3} stroke="none">{cats.map((x,i)=><Cell key={x.name} fill={palette[i%palette.length]}/>)}</Pie><Tooltip formatter={v=>money(v)}/></PieChart></ResponsiveContainer><div className="donut-center"><b>{money(data.expenses.reduce((s,x)=>s+x.amount,0))}</b><span>Jami xarajat</span></div></div><div className="category-legend">{cats.map((c,i)=><div key={c.name}><span><i style={{background:palette[i%palette.length]}}/>{c.name}</span><b>{money(c.value)}</b></div>)}</div></>:<div className="empty-inline">Kategoriyalar bo‘yicha ma’lumot yo‘q.</div>}</section></div></>;
}
function AIChat({data}) {
  const [messages,setMessages]=useState([{role:"assistant",text:"Assalomu alaykum! Men sizning moliyaviy yordamchingizman. Daromad, xarajat, jamg‘arma yoki maqsadlaringiz haqida savol bering."}]);
  const [value,setValue]=useState("");
  const income=data.income.reduce((s,x)=>s+x.amount,0),expense=data.expenses.reduce((s,x)=>s+x.amount,0),balance=income-expense;
  const respond=(q)=>{const s=q.toLowerCase();if(s.includes("xarajat")||s.includes("qayer")){const top=[...CATEGORIES].map(c=>({name:c.name,total:data.expenses.filter(x=>x.category===c.name).reduce((a,b)=>a+b.amount,0)})).sort((a,b)=>b.total-a.total)[0];return top?.total?`Sizning eng katta xarajat kategoriyangiz — ${top.name}. Bu kategoriyada jami ${money(top.total)} sarflagansiz. Xarajatlarni kamaytirish uchun haftalik limit belgilashni tavsiya qilaman.`:"Hozircha xarajatlar yetarli emas. Xarajatlaringizni kiritib boring, shunda aniq tahlil bera olaman.";}if(s.includes("tej")||s.includes("jamg"))return `Jami daromadingiz ${money(income)}, xarajatlaringiz ${money(expense)}. Farq ${money(balance)}. Daromadning kamida 10–20 foizini alohida jamg‘arishni odat qiling.`;if(s.includes("qarz"))return `Sizga qaytarilishi kerak bo‘lgan qarzlar: ${money(data.debts.filter(x=>x.direction==="receivable").reduce((a,x)=>a+x.amount-x.paid,0))}. Siz to‘lashingiz kerak bo‘lgan qarzlar: ${money(data.debts.filter(x=>x.direction==="payable").reduce((a,x)=>a+x.amount-x.paid,0))}.`;if(s.includes("maqsad"))return `Sizda ${data.goals.length} ta maqsad bor. Umumiy jamg‘armangiz ${money(data.goals.reduce((a,x)=>a+x.saved,0))}. Har oy maqsadlar uchun doimiy summa ajratishni tavsiya qilaman.`;return `Hozirgi ma’lumotlaringiz bo‘yicha balans ${money(balance)}. Aniqroq maslahat uchun “xarajatlarimni tahlil qil”, “qancha tejadim?” yoki “qarzlarim qancha?” deb so‘rashingiz mumkin.`;};
  const send=(e)=>{e.preventDefault();if(!value.trim())return;const q=value.trim();setMessages(m=>[...m,{role:"user",text:q},{role:"assistant",text:respond(q)}]);setValue("");};
  return <><PageHeading eyebrow="SMART MONEY / 08" title="AI maslahatchi" description="Moliyaviy holatingiz bo‘yicha tezkor tahlil va tavsiyalar."><span className="ai-status"><i/> Demo rejim</span></PageHeading><div className="ai-layout"><section className="ai-chat panel"><div className="chat-head"><div className="ai-avatar"><Bot size={21}/></div><div><b>Finance Assistant</b><span><i/> Onlayn yordamchi</span></div><span className="powered-label"><Sparkles size={13}/> SMART INSIGHTS</span></div><div className="chat-messages">{messages.map((m,i)=><div className={`chat-row ${m.role}`} key={i}><div className="chat-bubble">{m.text}</div></div>)}</div><div className="suggestions"><span>Tezkor savollar:</span>{["Xarajatlarimni tahlil qil","Qancha tejadim?","Qarzlarim qancha?","Maqsadlarim haqida"] .map(q=><button key={q} onClick={()=>{setMessages(m=>[...m,{role:"user",text:q},{role:"assistant",text:respond(q)}]);}}>{q}</button>)}</div><form className="chat-input" onSubmit={send}><input value={value} onChange={e=>setValue(e.target.value)} placeholder="Savolingizni yozing..."/><button className="send-button"><Send size={17}/></button></form><div className="chat-disclaimer">AI tavsiyalari ma’lumot uchun. Muhim moliyaviy qarorlarni mustaqil tekshiring.</div></section><aside className="ai-side"><div className="ai-insight-card"><span className="eyebrow light">YOUR FINANCIAL SNAPSHOT</span><h3>Moliyaviy<br/><em>ko‘rsatkichlar</em></h3><div className="ai-kpi"><span>Jami daromad</span><b>{money(income)}</b></div><div className="ai-kpi"><span>Jami xarajat</span><b>{money(expense)}</b></div><div className="ai-kpi"><span>Balans</span><b>{money(balance)}</b></div></div><div className="panel ai-tip"><Sparkles size={19}/><b>Maslahat</b><p>Daromad va xarajatlarni muntazam kiritish AI tahlilining aniqligini oshiradi.</p></div></aside></div></>;
}
function SettingsPage({user,data,onUpdate,onReset,dark,setDark,onToast}) {
  const [salary,setSalary]=useState(formatAmount(data.monthlySalary||0));
  return <><PageHeading eyebrow="SHAXSIY SOZLAMALAR / 09" title="Sozlamalar" description="Hisobingiz va moliyaviy parametrlaringizni boshqaring."/><div className="settings-grid"><section className="panel settings-panel"><div className="panel-heading"><div><span className="eyebrow">PROFILE</span><h3>Shaxsiy ma’lumotlar</h3></div><span className="settings-icon"><Settings/></span></div><div className="settings-profile"><div className="avatar large-avatar">{(user.name||"U").slice(0,1).toUpperCase()}</div><div><b>{user.name}</b><span>{user.login}</span></div></div><div className="settings-row"><div><b>Asosiy oylik daromad</b><small>Oylik maoshingiz miqdorini kiriting</small></div><div className="inline-setting"><input type="text" inputMode="numeric" value={salary} onChange={e=>setSalary(formatAmount(e.target.value))}/><button className="button button-dark small-button" onClick={()=>{onUpdate("monthlySalary",parseAmount(salary));onToast("Oylik daromad saqlandi");}}>Saqlash</button></div></div><div className="settings-row"><div><b>Interfeys ko‘rinishi</b><small>O‘zingizga qulay ko‘rinishni tanlang</small></div><button className="toggle-button" onClick={()=>setDark(!dark)}><span>{dark?"Dark mode":"Light mode"}</span><i className={dark?"toggle-on":""}/></button></div><div className="settings-row"><div><b>Ma’lumotlar saqlanishi</b><small>Barcha ma’lumotlar ushbu brauzerda saqlanadi</small></div><span className="saved-status"><ShieldCheck size={15}/> Faol</span></div></section><section className="panel settings-panel"><div className="panel-heading"><div><span className="eyebrow">DATA MANAGEMENT</span><h3>Ma’lumotlar</h3></div><Download size={19} className="muted-icon"/></div><p className="muted settings-description">Ma’lumotlaringizni zaxira nusxasini yuklab oling yoki boshlang‘ich namunaviy ma’lumotlarni qayta tiklang.</p><button className="settings-action" onClick={()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="my-finance-backup.json";a.click();URL.revokeObjectURL(url);onToast("Zaxira nusxasi yuklandi");}}><Download size={17}/><span><b>Zaxira nusxasini yuklab olish</b><small>JSON formatida barcha ma’lumotlar</small></span><ChevronRight/></button><button className="settings-action danger-action" onClick={()=>{if(window.confirm("DIQQAT! Barcha daromadlar, xarajatlar, qarzlar, maqsadlar va oylik daromad o‘chiriladi. Bu amalni ortga qaytarib bo‘lmaydi. Davom etasizmi?")){onReset();setSalary("");onToast("Barcha moliyaviy ma’lumotlar o‘chirildi. Yangi boshlashingiz mumkin.");}}}><Trash2 size={17}/><span><b>Barcha ma’lumotlarni o‘chirish</b><small>Hisobni tozalab, noldan boshlash</small></span><ChevronRight/></button><button className="settings-action" onClick={()=>{if(window.confirm("Barcha moliyaviy ma’lumotlarni namunaviy holatga qaytarasizmi?")){onUpdate("income",initialData.income);onUpdate("expenses",initialData.expenses);onUpdate("debts",initialData.debts);onUpdate("goals",initialData.goals);onToast("Namunaviy ma’lumotlar tiklandi");}}}><RotateCcw size={17}/><span><b>Namunaviy ma’lumotlarni tiklash</b><small>Joriy yozuvlar o‘rniga demo ma’lumotlar</small></span><ChevronRight/></button></section></div><div className="security-note"><ShieldCheck size={18}/><div><b>Maxfiylik haqida</b><p>Ushbu versiyada hisob ma’lumotlari va moliyaviy yozuvlar faqat shu brauzerning LocalStorage xotirasida saqlanadi. Brauzer ma’lumotlari tozalansa, ular yo‘qolishi mumkin. Login/parol himoyasi demo darajasida; haqiqiy xavfsizlik uchun backend autentifikatsiyasi kerak.</p></div></div></>;
}
function EntryModal({type,item,onClose,onSave}) {
  const isIncome=type==="income",isExpense=type==="expense"||type==="expenses",isDebt=type==="debt",isGoal=type==="goal";
  const [title,setTitle]=useState(item?.title||"");const [amount,setAmount]=useState(formatAmount(item?.amount||""));const [category,setCategory]=useState(item?.category||(isIncome?"Maosh":"Oziq-ovqat"));const [date,setDate]=useState(item?.date||today());const [note,setNote]=useState(item?.note||"");const [person,setPerson]=useState(item?.person||"");const [direction,setDirection]=useState(item?.direction||"receivable");const [paid,setPaid]=useState(formatAmount(item?.paid||0));const [dueDate,setDueDate]=useState(item?.dueDate||today());const [target,setTarget]=useState(formatAmount(item?.target||""));const [saved,setSaved]=useState(formatAmount(item?.saved||0));const [icon,setIcon]=useState(item?.icon||"Target");
  const heading=item?"Ma’lumotni tahrirlash":isIncome?"Daromad qo‘shish":isExpense?"Xarajat qo‘shish":isDebt?"Qarz qo‘shish":"Yangi maqsad";
  const submit=e=>{e.preventDefault();if(isDebt){onSave("debts",{person,title:title||"Qarz",amount:parseAmount(amount),paid:parseAmount(paid),direction,dueDate,note});}else if(isGoal){onSave("goals",{title,target:parseAmount(target),saved:parseAmount(saved),deadline:dueDate,icon});}else{onSave(isIncome?"income":"expenses",{title,amount:parseAmount(amount),category,date,note});}};
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><form className="modal-card" onSubmit={submit}><div className="modal-heading"><div><span className="eyebrow">{isIncome?"INCOME":isExpense?"EXPENSE":isDebt?"DEBT":"SAVING GOAL"}</span><h2>{heading}</h2></div><button type="button" className="icon-button" onClick={onClose}><X/></button></div>
    {!isDebt&&!isGoal&&<><label>Nomi<input required value={title} onChange={e=>setTitle(e.target.value)} placeholder={isIncome?"Masalan, Oylik maosh":"Masalan, Oziq-ovqat xaridi"}/></label><label>Summa (so‘m)<input required type="text" inputMode="numeric" value={amount} onChange={e=>setAmount(formatAmount(e.target.value))} placeholder="0"/></label><div className="form-two"><label>Kategoriya<select value={category} onChange={e=>setCategory(e.target.value)}>{(isIncome?["Maosh","Freelance","Biznes","Investitsiya","Qo‘shimcha","Boshqa"]:CATEGORIES.map(x=>x.name)).map(x=><option key={x}>{x}</option>)}</select></label><label>Sana<input required type="date" value={date} onChange={e=>setDate(e.target.value)}/></label></div><label>Izoh <span className="optional">(ixtiyoriy)</span><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Qo‘shimcha ma’lumot..." rows="2"/></label></>}
    {isDebt&&<><label>Shaxs yoki tashkilot<input required value={person} onChange={e=>setPerson(e.target.value)} placeholder="Masalan, Azizbek"/></label><label>Qarz nomi<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Masalan, Berilgan qarz"/></label><div className="form-two"><label>Qarz turi<select value={direction} onChange={e=>setDirection(e.target.value)}><option value="receivable">Olinadigan qarz</option><option value="payable">To‘lanadigan qarz</option></select></label><label>Jami summa<input type="text" inputMode="numeric" required value={amount} onChange={e=>setAmount(formatAmount(e.target.value))}/></label></div><div className="form-two"><label>To‘langan summa<input type="text" inputMode="numeric" value={paid} onChange={e=>setPaid(formatAmount(e.target.value))}/></label><label>Muddat<input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)}/></label></div><label>Izoh<textarea rows="2" value={note} onChange={e=>setNote(e.target.value)} placeholder="Qo‘shimcha ma’lumot..."/></label></>}
    {isGoal&&<><label>Maqsad nomi<input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Masalan, Yangi avtomobil"/></label><div className="form-two"><label>Kerakli summa<input type="text" inputMode="numeric" required value={target} onChange={e=>setTarget(formatAmount(e.target.value))}/></label><label>Yig‘ilgan summa<input type="text" inputMode="numeric" value={saved} onChange={e=>setSaved(formatAmount(e.target.value))}/></label></div><label>Maqsad muddati<input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)}/></label><label>Belgi<select value={icon} onChange={e=>setIcon(e.target.value)}><option value="Target">Maqsad</option><option value="Laptop">Noutbuk</option><option value="Plane">Sayohat</option></select></label></>}
    <div className="modal-actions"><button type="button" className="button button-outline" onClick={onClose}>Bekor qilish</button><button type="submit" className="button button-dark">{item?"Saqlash":"Qo‘shish"} <ArrowUpRight size={16}/></button></div>
  </form></div>;
}
export default App;
