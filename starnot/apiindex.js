export default function handler(req, res) {
  res.status(200).send(`
    <html>
      <head>
        <title>StarNote</title>
        <style>
          body {
            margin: 0;
            background: radial-gradient(circle at top, #0b0f2a, #000);
            color: white;
            font-family: Arial;
            text-align: center;
            overflow: hidden;
          }

          h1 {
            margin-top: 60px;
            color: gold;
          }

          .star {
            position: absolute;
            width: 8px;
            height: 8px;
            background: yellow;
            border-radius: 50%;
            animation: fall 6s linear infinite;
          }

          @keyframes fall {
            from { transform: translateY(100vh); opacity: 1; }
            to { transform: translateY(-10vh); opacity: 0; }
          }
        </style>
      </head>

      <body>
        <h1>🌌 StarNote</h1>
        <p>موقعك صار يشتغل عالمياً 🚀</p>

        <script>
          setInterval(() => {
            let star = document.createElement("div");
            star.className = "star";
            star.style.left = Math.random() * window.innerWidth + "px";
            document.body.appendChild(star);

            setTimeout(() => star.remove(), 6000);
          }, 200);
        </script>
      </body>
    </html>
  `);
}