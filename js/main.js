'use strict';

/* variables define */
// eslint-disable-next-line no-unused-vars
var downloadUrl;

/* client device & os detect */
function isAndroid() {
    return $.ua.os.name === 'Android';
}

function isiOS() {
    return $.ua.os.name === 'iOS';
}

function isWechat() {
    return $.ua.browser.name === 'WeChat';
}

function isWeibo() {
    return /weibo/i.test($.ua.ua);
}

console.log($.ua);
console.log('Android: ' + isAndroid());
console.log('iOS: ' + isiOS());
console.log('Wechat: ' + isWechat());
console.log('Weibo: ' + isWeibo());
/* get channel info */
axios.get('./data/shuju.json')
    .then(function(response) {
        return response.data;
    }).then(function(data) {
      console.log(data.channels);
        return data.channels;
    }).then(function(channels) {
        var channel = channels[0];
        downloadUrl = channel.content.download.androidUrl;
        // eslint-disable-next-line no-unused-vars
        var app = new Vue({
            el: '#vueapp',
            // el: 'html',
            data: {
                channel: channel,
                show: false,
                iosUrl: 'javascript:;',
                androidUrl: 'javascript:;',
            },
            created: function() {
                var tongjiId = channel.content.baiduAnalytic; // 重要：百度统计 ID 改这里
                var hm = document.createElement("script");
                hm.src = "http://hm.baidu.com/hm.js?" + tongjiId;
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            },
            methods: {
                clickEvent: function() {
                    if (isWeibo() || isWechat()) {
                        this.show = true;
                    } else {
                        if (isiOS()) {
                            this.iosUrl = channel.content.download.iosUrl;
                        } else {
                            var androidUrl = channel.content.download.androidUrl;
                            location.replace(androidUrl)
                        }
                    }
                },
                closeWeixin: function() {
                    this.show = false;
                }
            }
        });
    }).catch(function() {
        // var el = document.getElementsByClassName("message");
        // el.parentNode.replaceChild('<>')
        // var model = $('[data-remodal-id=modal]').remodal();
        // model.open();
    });
