const Message = require("../models/message");
const updateCreditTransaction = require("../transactions/updateCredit");
const saveMessageTransaction = require("../transactions/saveMessage");

module.exports = function(messageParams, cb) {
  const MessageModel = Message();
  let message = new MessageModel(messageParams);

  if (message.status == "OK") {
    
  } else {
    cb();
  }
};
