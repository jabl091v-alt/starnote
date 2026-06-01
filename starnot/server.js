const express = require("express");
const app = express();

// صفحة الموقع
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>StarNote</title>
  <style>
    body {
      margin: 0;
      background: radial-gradient(circle at top, #0b0f2a, #000);
      color: white;
      font-family: Arial;
      overflow: hidden;
      text-align: center;
    }

    h1 {
      margin-top: 60px;
      font-size: 40px;
      color: #ffd700;
    }

    input, button {
      padding: 10px;
      margin-top: 20px;
      border-radius: 10px;
      border: none;
      font-size: 16px;
    }

    button {
      background: gold;
      cursor: pointer;
    }

    .star {
      position: absolute;
      width: 10px;
      height: 10px;
      background: yellow;
      border-radius: 50%;
      animation: float 6s linear infinite;
    }

    @keyframes float {
      from { transform: translateY(100vh); opacity: 1; }
      to { transform: translateY(-10vh); opacity: 0; }
    }
  </style>
</head>

<body>

  <h1>🌌 StarNote</h1>
  <p>اكتب ملاحظتك وتظهر كنجم في الفضاء</p>

  <input id="text" placeholder="اكتب ملاحظتك">
  <button onclick="createStar()">إرسال</button>

  <script>
    function createStar() {
      let star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * window.innerWidth + "px";
      document.body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 6000);
    }

    setInterval(() => {
      let star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * window.innerWidth + "px";
      document.body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 6000);
    }, 500);
  </script>

</body>
</html>
  `);
});

// مهم لـ Vercel
module.exports = app;