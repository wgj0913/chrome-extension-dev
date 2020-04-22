var btn = document.createElement('div');
btn.innerHTML = '提取';
btn.setAttribute('id', 'crawl-btn');
btn.setAttribute('class', 'crawl-btn');
document.body.appendChild(btn);

var getBtn = document.getElementById('crawl-btn');
getBtn.onclick = function () {
  console.log('提取中.....');
  var divArr = [];
  var tags = document.body.getElementsByTagName('*');
  for (var i = 0; i < tags.length; i++) {
    divArr.push(getText(tags[i]));
  }
  console.log(divArr);
  Modal.show({
    title: '提取结果',
    content: divArr,
  });
};

var getText = function (dom) {
  var index = 0,
    html = dom.innerHTML;
  while (dom.children.length && index < dom.children.length) {
    var chtml = dom.children[index].outerHTML;
    html = dom.innerHTML.replace(chtml, '');
    index++;
  }
  return '<font>' + html + '</font>';
};

// 弹窗
+(function Modal() {
  var modal;

  if (this instanceof Modal) {
    this.init = function (opt) {
      modal = document.createElement('div');
      modal.setAttribute('class', 'modal');

      var title = document.createElement('div');
      title.innerHTML = opt.title;
      title.setAttribute('class', 'modal-title');

      var close_btn = document.createElement('span');
      close_btn.innerHTML = "X";
      close_btn.setAttribute('class', 'modal-close-btn');

      var content = document.createElement('div');
      content.setAttribute('class', 'modal-content');

      var mask = document.createElement('div');
      mask.setAttribute('class', 'modal-mask');
      
      close_btn.onclick = function () {
        modal.style.display = 'none';
      };
      title.append(close_btn);
      content.append(title);
      content.append(opt.content);
      modal.append(content);
      modal.append(mask);
      document.body.appendChild(modal);
    };
    this.show = function (opt) {
      if (modal) {
        modal.style.display = '';
      } else {
        var options = {
          title: opt.title || '标题',
          content: opt.content || '',
        };
        this.init(options);
        modal.style.display = '';
      }
    };
    this.hide = function () {
      modal.style.display = "none";
    };
  } else {
    window.Modal = new Modal();
  }
})();

// document.body.appendChild("<div class='crawl-btn'>提取</div>");
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   console.log(message);
//   if (message == 'activeBtn') {
//     console.log('提取', message);
//     // if (!$('.crawl-btn')) {
//     //   $('body').append("<div class='crawl-btn'>提取</div>");
//     // } else {
//     //   $('.crawl-btn').css('background-color', 'orange');
//     //   setTimeout(() => {
//     //     $('.crawl-btn').css('background-color', '#06c');
//     //   }, 3000);
//     // }
//     sendResponse({ farewell: '激活成功' });
//   }
// });
// 接收消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // console.log('message', message,sender, sendResponse);
  if (message == 'activeBtn') {
    var btn = document.createElement('div');
    btn.innerHTML = '提取';
    btn.setAttribute('id', 'crawl-btn');
    btn.setAttribute('class', 'crawl-btn');
    document.body.appendChild(btn);
    sendResponse({ farewell: '激活成功' });
  }
});

// 主动发送消息
chrome.runtime.sendMessage({ greeting: 'hello' }, function (response) {
  console.log(response, document.body);
  // document.body.style.backgroundColor="orange"
});
