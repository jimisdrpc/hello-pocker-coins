const http = require("http");

http
  .createServer((request, response) => {
    console.log("Requested url: " + request.url);

    request.on("close", () => {
      if (!response.finished) {
        response.end();
        console.log("Stopped sending events.");
      }
    });

    if (request.url.toLowerCase() === "/coins") {
      response.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        'Access-Control-Allow-Origin': '*'
      });

      setTimeout(() => {
        response.write("event: updateAmountState\n");
        response.write('data: {"player": "Player1", "amount": "90"}');
        response.write("\n\n");
      }, 2000);

      setTimeout(() => {
        response.write("event: updateAmountState\n");
        response.write('data: {"player": "Player2", "amount": "95"}');
        response.write("\n\n");
      }, 4000);

      setTimeout(() => {
        response.write("event: removePlayer\n");
        response.write('data: {"player": "Player2"}');
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