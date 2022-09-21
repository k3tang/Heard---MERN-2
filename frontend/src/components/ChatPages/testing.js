// if no port, then default is 80 for http and 447 for https
// 2nd argument timeout is optional, defaults to 5 seconds
var io = require('socket.io-client');

function checkSocketIoConnect(url, timeout) {
  return new Promise(function (resolve, reject) {
    var errAlready = false;
    timeout = timeout || 5000;
    var socket = io(url, { reconnection: false, timeout: timeout });

    // success
    socket.on("connect", function () {
      clearTimeout(timer);
      resolve();
      socket.close();
    });

    // set our own timeout in case the socket ends some other way than what we are listening for
    var timer = setTimeout(function () {
      timer = null;
      error("local timeout");
    }, timeout);

    // common error handler
    function error(data) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (!errAlready) {
        errAlready = true;
        reject(data);
        socket.disconnect();
      }
    }

    // errors
    socket.on("connect_error", error);
    socket.on("connect_timeout", error);
    socket.on("error", error);
    socket.on("disconnect", error);

  });
}

checkSocketIoConnect("http://localhost:8080").then(function () {
  console.log('connected')
}, function (reason) {
  console.log('errorrrr', reason)
})