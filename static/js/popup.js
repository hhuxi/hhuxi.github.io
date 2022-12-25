var adDialog = {
	1: function() {
		layer.open({
			title: [
				hlnum.app + ' ID: ' + hlnum.num + ' ' + objText.textCopyTip,
				'background-color: #40AFFE; color:#fff;',
			],
			content: '<div style="margin:15px 10px">' + objText.textCopyDesc + '</div>',
			btn: [objText.open, objText.close],
			style: 'width: 320px;',
			yes: function() {
				adApi.ajax('op');
				if (hlnum.href_status === 1) {
					window.location.href = hlnum.href;
				}
			}
		})
	},
	2: function() {
		layer.open({
			type: 1,
			skin: 'wx-dialog',
			content: '<div class="top-num">' +
				hlnum.num +
				'</div><div class="top-tip">微信号已帮您复制成功</div><img class="main-gif" src="/static/img/wx.gif" /><div class="main-tip">请按照上图步骤，到微信添加好友</div><div class="btn-open on-open">打开微信</div>',
			style: 'font-size:16px;border-radius:5px;padding:10px 0;margin: 0 20px;'
		})
	},
	qrcode: function() {
		layer.open({
			type: 1,
			skin: 'qrcode-dialog',
			btn: [objText.sure],
			content: '<div class="qrcode-title">' +
				objText.textTitle +
				'</div><div class="qrcode-desc">' +
				objText.textQrcodeDesc +
				'</div><img class="qrcode-img" src="' +
				hlnum.img +
				'" />',
			style: 'width: 320px;'
		})
	},
	3: function() {
		layer.open({
			title: [
				hlnum.app + ' ID: ' + hlnum.num + ' ' + objText.textCopyTip,
				'background-color: #40AFFE; color:#fff;'
			],
			content: '<div style="margin:15px 10px">' + objText.textCopyDesc + "</div>",
			btn: [objText.open, objText.close],
			style: 'width: 320px;',
			yes: function() {
				adApi.ajax('op');
				if (hlnum.href_status === 1) {
					window.location.href = hlnum.href;
				}
			}
		})
	},
	4: function() {
		layer.open({
			type: 1,
			skin: 'dialog-4',
			anim: 5,
			content: '<div style="box-sizing: content-box;position: absolute;width: 300px;padding:15px;background: white;border-radius: 10px;left: 50%;top: 50%;margin: -125px 0 0 -165px;"><p style="width:100%;margin: 0;padding: 0;text-indent:0;text-align: center;color: #FF5722;margin: 0;padding: 0;"><img width="50px"src="/static/img/success_icon.png"></p><p style="width:100%;margin: 0;padding: 0;text-indent:0;text-align: center;color: #000000;font-size: 18px;font-weight: 600;margin: 10px 0;padding: 0;">' +
				objText.textCopyTip +
				'</p><p style="width:100%;margin: 0;padding: 0;text-indent:0;text-align: center;color: #333333;font-size: 16px;line-height: 30px;margin: 0;padding: 0;">' +
				hlnum.app +
				': <span style="color: red;font-weight:700">' +
				hlnum.num +
				'</span></p><p style="width:100%;margin: 0;padding: 0;text-indent:0;text-align: center;color: #333333;font-size: 14px;line-height: 20px;margin: 0;padding: 0;">' +
				objText.textCopyDesc +
				'</p><p style="width:100%;margin: 0;padding: 0;text-indent:0;text-align: center;margin: 0;padding: 0; margin-top: 10px;"><a style="text-decoration:none;cursor: pointer;background:#1aad17;display:block;margin:0 auto;width:100px;font-size: 18px;color:white;line-height: 30px;font-weight: 500;padding: 5px;border-radius: 5px" class="on-open" onclick="adApi.hide()">' +
				objText.open +
				'</a></p></div>'
		})
	},
	5: function() {
		layer.open({
			skin: 'dialog-5',
			content: '<div style="margin:15px 0;font-size:16px">' +
				objText.textCopyTip +
				'</div>',
			time: 2
		})
	},
	6: function() {
		layer.open({
			type: 1,
			skin: 'dialog-6',
			anim: 5,
			style: 'width: 320px;',
			content: '<div style="border-radius: 5px;background-color: #03C300;color: #fff;text-align: center;box-sizing: border-box;padding: 10px;"><div style="font-size: 18px;font-weight: 900;">' +
				objText.textCopyDesc +
				'</div><div style="background-color: #fff;border-radius: 5px;margin-top: 20px;padding-bottom: 20px;box-sizing: border-box;padding-top: 5px;"><img class="qrcode-img"src="'+hlnum.img+'"/><div style="background-color: #FF0000;width: 150px;margin: 20px auto 0;padding: 10px 0;border-radius: 8px;box-sizing: border-box;" onclick="adApi.hide()">' +
				objText.close + '</div></div></div>'
		})
	}
};
