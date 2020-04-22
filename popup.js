var btn = document.getElementById('activeBtn');
btn.onclick = function () {
  alert('se')
  // 发送消息给content_script
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'activeBtn', function (response) {
      console.log('response', response);
    });
  });
};



// 接收消息
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

