chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.msg != null) {
      chrome.tts.speak(request.msg);
    }
  }
);
