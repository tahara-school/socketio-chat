const app  = require("express")();
const http = require("http").createServer(app);
const io   = require("socket.io")(http);

/**
 * "/"にアクセスがあったらindex.htmlを返却
 */
app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/index.html");
});

/**
 * [イベント] ユーザーが接続
 */
io.on("connection", (socket)=>{
  console.log("ユーザーが接続しました");

  socket.on("post", (msg)=>{
    msg.text = msg.text.replace(/ぴえん/g, '😢')
                       .replace(/うーん/g, '🤔')
                       .replace(/マッスル/g, '💪')
                       .replace(/天使/g, '👼')
                       .replace(/寿司/g, '🍣');
    io.emit("member-post", msg);
  });
});

/**
 * 3000番でサーバを起動する
 */
http.listen(3000, ()=>{
  console.log("listening on *:3000");
});

