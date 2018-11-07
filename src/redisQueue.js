const sendMessage = require("./controllers/sendMessage");

var Queue = require("bull");

const MessageRequests = new Queue("MessageRequests", "redis://127.0.0.1:6379");

module.exports = (req, res) => {
  debugger;
  const httpbody = req.body;
  MessageRequests.add({ httpbody })
    .then(job => {
      debugger;
      res.status(200).send("message processed");
      sendMessage(httpbody);
    })
    .catch();
};
