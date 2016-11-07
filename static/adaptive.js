/**
 * Created by shenchangmin on 2016/10/13.
 */
(function (win, doc) {
    var docEl = doc.documentElement;
    var viewport = document.querySelector('meta[name="viewport"]');
    var appVersion = win.navigator.appVersion.toLocaleLowerCase();
    var isAndroid = appVersion.match(/android/gi);
    var isIphone = appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    var scale;
    var dpr;
    var refreshRootFont;
    /**
     * 检查是否有viewport
     */
    if (viewport) {
        var content = viewport.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (content) {
            scale = parseFloat(content[1]);
            dpr = parseInt(1 / scale);
        }
    } else {

    }
    if (!dpr && !scale) {
        if (isIphone) {
            if (devicePixelRatio === 3) {
                dpr = 3;
            } else if (devicePixelRatio === 2) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            dpr = 1;
        }
        scale = 1 / dpr;
    }
    /**
     * 写入dpr到HTML元素上
     */
    docEl.setAttribute('data-dpr', dpr);
    if (!viewport) {
        var metaElement = doc.createElement('meta');
        metaElement.setAttribute('name', 'viewport');
        metaElement.setAttribute('content', 'width=device-width,initial-scale=' + scale + ',user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaElement);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaElement);
            doc.write(wrap.innerHTML);
        }
    }
    /**
     * 改变浏览器宽度触发刷新根字体大小
     */
    win.addEventListener('resize', function () {
        clearTimeout(refreshRootFont);
        refreshRootFont = setTimeout(rootFont, 300);
    }, false);
    /**
     * 从缓存中获取页面依旧触发刷洗根字体大小
     */
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(refreshRootFont);
            refreshRootFont = setTimeout(rootFont, 300);
        }
    }, false);
    rootFont();
    /**
     * 根据宽度动态写入根字体大小
     */
    function rootFont() {
        var width = docEl.clientWidth;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var root = width / 10;
        docEl.style.fontSize = root + 'px';
    }
}(window, document));