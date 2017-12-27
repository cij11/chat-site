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
    });
}

function postChatLogs() {
  $.ajax({
    type: 'POST',
    url: "https://saa487eskg.execute-api.ap-southeast-1.amazonaws.com/prod",
    headers: {
      "Content-Type": "text/plain",
    },
    data: JSON.stringify({
      "min": 100,
      "max": 1000
    })
  }).done(function(data) {
    console.log("Starting POST experiment:");
    console.log(data);
    console.log(data.body.generatedNum);
  });
}
