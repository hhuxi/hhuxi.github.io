var ssid, hlnum, hlsys, hlOther, objText, visHidden, visibilityChange;

$.ajax({
	type: 'GET',
	url: '/Obtain/getNum',
	async: false,
	cache: false,
	timeout: 5000,
	dataType: 'json',
	data: {
		rf: document.referrer,
		aw: window.screen.width,
		ah: window.screen.height
	},
	success: function(res) {
		ssid = res.sid;
		hlnum = res.num;
		hlsys = res.sys;
		hlOther = res.other;
	}
})

if (hlOther.lang === 'zh-CN') {
	objText = {
		textTitle: '提示',
		textCopy: '点击复制',
		textCopyTip: '复制成功',
		textCopyDesc: hlOther.p_text,
		textQrcode: '查看二维码',
		textQrcodeDesc: '扫描下方' + hlnum.app + '二维码即可新增客服，瞭解更多',
		close: '关闭',
		open: '打开',
		sure: '确定'
	}
} else if (hlOther.lang === 'zh-TW') {
	objText = {
		textTitle: '提示',
		textCopy: '點擊複製',
		textCopyTip: '複製成功',
		textCopyDesc: hlOther.p_text,
		textQrcode: '查看二維碼',
		textQrcodeDesc: '掃描下方' + hlnum.app + '二維碼即可新增客服，瞭解更多',
		close: '放棄',
		open: '開啟' + hlnum.app,
		sure: '確定'
	}
} else if (hlOther.lang === 'ja') {
	objText = {
		textTitle: 'ヒント',
		textCopy: 'クリックしてコピー',
		textCopyTip: 'が正常にコピーされました',
		textCopyDesc: hlOther.p_text,
		textQrcode: 'QRコードの表示',
		textQrcodeDesc: '下の' + hlnum.app + 'QRコードをスキャンすると、カスタマーサービスが追加されます',
		close: 'あきらめる',
		open: hlnum.app + 'をオンにする',
		sure: 'を選択します'
	}
} else if (hlOther.lang === 'en') {
	objText = {
		textTitle: 'Tips',
		textCopy: 'Click to copy',
		textCopyTip: 'Copy successfully',
		textCopyDesc: hlOther.p_text,
		textQrcode: 'View QR code',
		textQrcodeDesc: 'Scan the' + hlnum.app + 'QR code below to add customer service and learn more',
		close: 'Closure',
		open: 'Open' + hlnum.app,
		sure: 'Sure'
	}
}

var adApi = {
	num: function() {
		if (hlnum.num) {
			setInterval(function() {
				$('.set-num').each(function() {
					if (!$(this).text()) {
						if (hlsys === false && hlnum.qr_status === 1) {
							$(this).text(hlnum.num).after(
								'<span class="set-after">☞' + objText.textQrcode + "</span>"
							);
						} else {
							$(this).text(hlnum.num).after(
								'<span class="set-after">☞' + objText.textCopy + "</span>"
							);
						}
					}
				});
				$('.set-app').each(function() {
					if (!$(this).text()) {
						$(this).text(hlnum.app);
					}
				})
				if (hlnum.img && hlnum.qr_status === 1) {
					$('.set-qrcode').each(function() {
						if (!$(this).attr('src')) {
							$(this).attr('src', hlnum.img);
						}
					});
				}
			}, 1000);
		}
	},
	copy: function() {
		var seoCopyText = document.createElement('input');
		seoCopyText.value = hlnum.num;
		document.body.appendChild(seoCopyText);
		seoCopyText.select();
		document.execCommand('Copy');
		document.body.removeChild(seoCopyText);
	},
	track: function() {
		if (typeof fbq == 'function') {
			fbq("track", "Purchase", {
				value: 1,
				currency: "USD",
			});
		}
		return true;
	},
	ajax: function(action) {
		$.get('/Obtain/setAction', {
			sid: ssid,
			at: action
		})
	},
	hide: function() {
		layer.closeAll();
	}
};

if (typeof document.hidden !== 'undefined') {
	visHidden = 'hidden';
	visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
	visHidden = 'msHidden';
	visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
	visHidden = 'webkitHidden';
	visibilityChange = 'webkitvisibilitychange';
} else {
	visHidden = 'hidden';
	visibilityChange = 'visibilitychange';
}

function handleVisibilityChange() {
	if (document[visHidden]) {
		adApi.ajax('ot');
	}
}

if (
	typeof window.addEventListener !== 'undefined' ||
	typeof document[visHidden] !== 'undefined'
) {
	window.addEventListener(visibilityChange, handleVisibilityChange);
}

$(function() {
	if (hlsys === false && hlnum.qr_status === 1) {
		$('.set-num').text(hlnum.num).after(
			'<span class="set-after">☞' + objText.textQrcode + '</span>'
		);
	} else {
		$('.set-num').text(hlnum.num).after(
			'<span class="set-after">☞' + objText.textCopy + '</span>'
		);
	}
	$('.set-app').text(hlnum.app);
	if (hlnum.img && hlnum.qr_status === 1) {
		$('.set-qrcode').attr('src', hlnum.img);
	} else {
	    $('.set-qrcode').css('display', 'none');
	}
	$('.set-logo').attr('src', '/static/img/' + hlnum.app + '.png');
	adApi.num();
	$(document).on('click', '.set-num,.set-after', function() {
		adApi.ajax('cp');
		adApi.copy();
		adApi.track();
		if (hlsys === false && hlnum.qr_status === 1) {
			adDialog.qrcode();
		} else {
			adDialog[hlOther.p_id]();
		}
	})
	$(document).on('click', '.on-open', function() {
		adApi.ajax('op');
		adApi.track();
		if (hlnum.href_status === 1) {
			window.location.href = hlnum.href;
		}
	})
	$(document).on('click', '.on-href', function() {
		adApi.ajax('hf');
		adApi.track();
		if (hlnum.href_status === 1) {
			window.location.href = hlnum.href;
		}
		if (typeof showline == 'function') {
			showline();
		}
	})
	$(document).on('click', '.on-qrcode', function() {
		adApi.ajax('sc');
		adApi.track();
		adDialog.qrcode();
	})
	$(document).on('click', '.layui-close', function() {
		adApi.hide();
	})
	$(document).on('click', '.self-href', function() {
	    // 用于frntviaboe
	    adApi.track();
		if(hlsys === false){
		    adApi.ajax('sc');
		    diage();
		} else {
		    adApi.ajax('hf');
		    window.location.href = hlnum.href;
		}
	})
	$('.self-img').each(function(){
        if(!$(this).attr('src')){
            $(this).css('display', 'none');
        }
    });
});
