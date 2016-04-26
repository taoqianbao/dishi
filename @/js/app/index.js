// 初始化
mui.init({
	subpages: [qiao.h.normalPage('list')]
});

var main = null;
var showMenu = false;
var menu = null;
var add = null;
var detail = null;

// 所有方法都放到这里
mui.plusReady(function() {
	setColor("#f7f7f7");

	// 侧滑菜单
	main = qiao.h.indexPage();
	var menuoptions = qiao.h.page('menu', {
		styles: {
			left: 0,
			width: '70%',
			zindex: -1
		}
	});
	menu = mui.preload(menuoptions);
	qiao.on('.mui-icon-bars', 'tap', opMenu);
	main.addEventListener('maskClick', opMenu);
	mui.menu = opMenu;

	// 添加
	add = mui.preload(qiao.h.normalPage('add', {
		popGesture: 'none'
	}));
	qiao.on('.adda', 'tap', showAdd);
	qiao.on('.mui-icon-back', 'tap', hideAdd);

	// 详情
	detail = mui.preload(qiao.h.normalPage('detail', {
		popGesture: 'none'
	}));

	// 退出
	mui.back = function() {
		if ($('.adda').is(':hidden')) {
			hideAdd();
		} else if (showMenu) {
			closeMenu();
		} else {
			qiao.h.exit();
		}
	};
});

// menu
function opMenu() {
	if (showMenu) {
		closeMenu();
	} else {
		openMenu();
	}
}

function openMenu() {
	if ($('.adda').is(':visible')) {
		setColor("#333333");
		menu.show('none', 0, function() {
			main.setStyle({
				mask: 'rgba(0,0,0,0.4)',
				left: '70%',
				transition: {
					duration: 150
				}
			});

			showMenu = true;
		});
	}
}

function closeMenu() {
	setColor("#f7f7f7");
	main.setStyle({
		mask: 'none',
		left: '0',
		transition: {
			duration: 100
		}
	});

	showMenu = false;
	setTimeout(function() {
		menu.hide();
	}, 300);
}

// showAdd
function showAdd() {
	showBackBtn();
	qiao.h.show('add', 'slide-in-bottom', 300);
}

function hideAdd() {
	hideBackBtn();
	qiao.h.getPage('add').hide();
	qiao.h.getPage('detail').hide();
}

function showBackBtn() {
	$('.menua').removeClass('mui-icon-bars').addClass('mui-icon-back');
	$('.adda').hide();
}

function hideBackBtn() {
	$('.menua').removeClass('mui-icon-back').addClass('mui-icon-bars');
	$('.adda').show();
}

// set color
function setColor(color) {
	if (mui.os.ios && color) plus.navigator.setStatusBarBackground(color);
}