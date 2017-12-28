'use strict';

function displayDateTime() {
  document.getElementById('contents').innerHTML = Date();
}

function getChatLogs() {
  $.ajax({
      type: 'GET',
      url: "https://saa487eskg.execute-api.ap-southeast-1.amazonaws.com/prod"
    })
    .done(function(data) {
      console.log("Starting GET experiment:");
      console.log(data);

      clearChatLogList();
      appendChatLogList(data.body.logs);
    });
}

function postChatLogs() {
  var messageText = document.getElementById("chatInput").value;
  console.log(messageText);

  $.ajax({
    type: 'POST',
    url: "https://saa487eskg.execute-api.ap-southeast-1.amazonaws.com/prod",
    headers: {
      "Content-Type": "text/plain",
    },
    data: JSON.stringify({
      "message" : messageText
    })
  }).done(function(data) {
    console.log("Starting POST experiment:");
    console.log(data);

    clearChatLogList();
    appendChatLogList(data.body.logs);
  });
}

function updateList() {
  var chatLogArray = ['Tahe', 'Rua', 'Toru', 'Wha'];
  appendChatLogList(chatLogArray);
}

function clearChatLogList() {
  var chatList = document.getElementById("chatList");
  chatList.innerHTML = "";
}

function appendChatLogList(chatLogArray) {
  var chatList = document.getElementById("chatList");
  _.forEach(chatLogArray, function(logEntry) {
    var node = document.createElement("LI"); // Create a <li> node
    var textnode = document.createTextNode(logEntry); // Create a text node
    node.appendChild(textnode); // Append the text to <li>
    chatList.appendChild(node);
  })
}
