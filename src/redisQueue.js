const sendMessage = require("./controllers/sendMessage");
const uuidv1 = require("uuid/v1");

var Queue = require("bull");

const MessageRequests = new Queue("MessageRequests", "redis://127.0.0.1:6379");

module.exports = (req, res) => {
  debugger;
  const httpbody = req.body;
  MessageRequests.add({ httpbody })
    .then(job => {
      requestID = uuidv1();
      debugger;
      res
        .status(200)
        .send(
          `Message processed. Check the status of your message using: /messages/${requestID}/status`
        );
      sendMessage(job.data.httpbody, requestID);
    })
    .catch((e)=>{console.log(e)});
};