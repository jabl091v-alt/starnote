const express = require("express");
const app = express();

app.use(express.json());

// 🧠 تخزين مؤقت (بدون قاعدة بيانات للنسخة التجريبية)
let stars = [];

// 🌌 الصفحة الرئيسية
app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>StarNote 🌌</title>

<style>
body{
margin:0;
overflow:hidden;
background: radial-gradient(circle at center, #050816, #000);
font-family:Arial;
color:white;
}

h1{
position:fixed;
top:10px;
left:20px;
color:#00e5ff;
text-shadow:0 0 15px #00e5ff;
}

#panel{
position:fixed;
top:60px;
left:20px;
background:rgba(255,255,255,0.08);
padding:15px;
border-radius:12px;
backdrop-filter:blur(10px);
}

input,button{
padding:8px;
margin:5px;
border-radius:8px;
border:none;
}

.star{
position:absolute;
width:10px;
height:10px;
background:white;
border-radius:50%;
box-shadow:0 0 10px white;
cursor:pointer;
animation:twinkle 2s infinite;
}

@keyframes twinkle{
0%{transform:scale(1);opacity:1;}
50%{transform:scale(1.4);opacity:0.6;}
100%{transform:scale(1);opacity:1;}
}
</style>
</head>

<body>

<h1>🌌 StarNote</h1>

<div id="panel">
<input id="name" placeholder="اسمك"><br>
<input id="msg" placeholder="رسالتك"><br>
<button onclick="createStar()">Create Star ⭐</button>
</div>

<script>

// ⭐ رسم النجوم
function renderStars(){
document.querySelectorAll(".star").forEach(e=>e.remove());

stars.forEach((s,i)=>{
let div = document.createElement("div");
div.className = "star";
div.style.left = s.x + "px";
div.style.top = s.y + "px";

div.onclick = () => {
alert(
"⭐ " + s.name + "\n\n" +
"📝 " + s.message + "\n\n" +
"📅 " + s.date
);
};

document.body.appendChild(div);
});
}

// ➕ إنشاء نجمة
async function createStar(){

let star = {
name: document.getElementById("name").value,
message: document.getElementById("msg").value,
date: new Date().toLocaleString(),
x: Math.random() * window.innerWidth,
y: Math.random() * window.innerHeight
};

await fetch("/add",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(star)
});

loadStars();
}

// 📥 تحميل النجوم
async function loadStars(){
let res = await fetch("/stars");
stars = await res.json();
renderStars();
}

let stars = [];
loadStars();

</script>

</body>
</html>
`);
});

// ➕ إضافة نجمة
app.post("/add", (req, res) => {
stars.push(req.body);
res.json({ok:true});
});

// 📥 جلب النجوم
app.get("/stars", (req, res) => {
res.json(stars);
});

// 🚀 تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
console.log(`StarNote PRO running 🚀 on port ${PORT}`);
});