export const CATEGORIES = [
  { name: "Oziq-ovqat", icon: "Utensils", color: "#D6A66D" },
  { name: "Transport", icon: "CarFront", color: "#829486" },
  { name: "Kiyim", icon: "Shirt", color: "#B58D78" },
  { name: "Uy-joy", icon: "House", color: "#A7A18E" },
  { name: "Ta’lim", icon: "GraduationCap", color: "#9A9B83" },
  { name: "Sog‘liq", icon: "HeartPulse", color: "#C98778" },
  { name: "Ko‘ngilochar", icon: "Ticket", color: "#A48CBA" },
  { name: "Boshqa", icon: "CircleEllipsis", color: "#8C9690" }
];

export const initialData = {
  monthlySalary: 8000000,
  income: [
    { id: "i1", title: "Oylik maosh", amount: 8000000, category: "Maosh", date: new Date().toISOString().slice(0,10), note: "Asosiy daromad" },
    { id: "i2", title: "Freelance loyiha", amount: 1500000, category: "Qo‘shimcha", date: new Date(Date.now()-86400000*4).toISOString().slice(0,10), note: "Landing page" }
  ],
  expenses: [
    { id: "e1", title: "Haftalik xarid", amount: 420000, category: "Oziq-ovqat", date: new Date().toISOString().slice(0,10), note: "" },
    { id: "e2", title: "Taksi va yo‘l", amount: 95000, category: "Transport", date: new Date(Date.now()-86400000).toISOString().slice(0,10), note: "" },
    { id: "e3", title: "Internet", amount: 120000, category: "Uy-joy", date: new Date(Date.now()-86400000*3).toISOString().slice(0,10), note: "" },
    { id: "e4", title: "Kitob", amount: 180000, category: "Ta’lim", date: new Date(Date.now()-86400000*5).toISOString().slice(0,10), note: "" }
  ],
  debts: [
    { id: "d1", person: "Azizbek", title: "Berilgan qarz", amount: 700000, paid: 200000, direction: "receivable", dueDate: new Date(Date.now()+86400000*12).toISOString().slice(0,10), note: "" },
    { id: "d2", person: "Do‘kon", title: "Bo‘lib to‘lash", amount: 450000, paid: 0, direction: "payable", dueDate: new Date(Date.now()+86400000*20).toISOString().slice(0,10), note: "" }
  ],
  goals: [
    { id: "g1", title: "Yangi noutbuk", target: 15000000, saved: 4200000, deadline: new Date(Date.now()+86400000*120).toISOString().slice(0,10), icon: "Laptop" },
    { id: "g2", title: "Sayohat", target: 8000000, saved: 1800000, deadline: new Date(Date.now()+86400000*200).toISOString().slice(0,10), icon: "Plane" }
  ]
};