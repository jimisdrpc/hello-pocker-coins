const http = require("http");

http
  .createServer((request, response) => {
    console.log("Requested url: " + request.url);

    if (request.url.toLowerCase() === "/coins") {
      response.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
      });

      setTimeout(() => {
        response.write('data: {"player": "Player1", "amount": "90"}');
        response.write("\n\n");
      }, 3000);

      setTimeout(() => {
        response.write('data: {"player": "Player2", "amount": "95"}');
        response.write("\n\n");
      }, 6000);
    } else {
      response.writeHead(404);
      response.end();
    }
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000/");
  });