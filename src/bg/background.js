updateBadge();

function updateBadge() {
	chrome.windows.getCurrent(function(w) {
		currentWidth = w.width;
		chrome.browserAction.setBadgeBackgroundColor({ color: [100, 100, 100, 255] });
		chrome.browserAction.setBadgeText({ text: currentWidth.toString() });
	});
}

chrome.commands.onCommand.addListener(function(command) {
	chrome.windows.getCurrent(function(w) {
		currentWidth = w.width;
		currentHeight = w.height;

		switch(command) {
			case 'width_minus_1':
				var newWidth = currentWidth - 1;
				break;
			case 'width_minus_10':
				var newWidth = currentWidth - 10;
				break;
			case 'width_plus_1':
				var newWidth = currentWidth + 1;
				break;
			case 'width_plus_10':
				var newWidth = currentWidth + 10;
				break;
			case 'height_minus_1':
				var newHeight = currentHeight - 1;
				break;
			case 'height_minus_10':
				var newHeight = currentHeight - 10;
				break;
			case 'height_plud_1':
				var newHeight = currentHeight + 1;
				break;
			case 'height_plus_10':
				var newHeight = currentHeight + 10;
				break;
		}

		if (typeof newWidth == 'number') {
			chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, { width: newWidth });
			chrome.browserAction.setBadgeText({ text: newWidth.toString() });
		}

		if (typeof newHeight == 'number') {
			chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, { height: newHeight });
			chrome.browserAction.setBadgeText({ text: newHeight.toString() });
		}
	});
});

chrome.extension.onMessage.addListener(function(m) {
	if (m.action == 'resized') {
		updateBadge();
	}
});
