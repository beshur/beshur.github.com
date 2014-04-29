// Simple side nofitication
// cc Alex Buznik, 2013
// demo: http://jsfiddle.net/beshur/mr3DV/
function notifyze (text, type, time) {
	if (!$("body .b_notifyze").length) $("body").append('<div class="b_notifyze"></div>');
	var speed = 300;

	if (text) {
		if (!time) time = text.length*60; // 60 millisec per char
		if (time < 2500) time = 2500;

		$(".b_notifyze").append('<div class="b_notifyze__el m_' + type + '"><button type="button" class="close" aria-hidden="true">&times;</button>' + text + '</div>');
		var new_el = $(".b_notifyze").children(".b_notifyze__el:last");

		new_el.click(function (e) {
			e.stopPropagation();
		})
		new_el.find(".close").on("click", function(e) {
			$(this).closest(".b_notifyze__el").remove();
		})

		new_el.fadeIn(speed, function () {
			var t = setTimeout(function() {
				new_el.fadeOut(speed, function() {
					$(this).remove();
				})
			}, time)
			
			if (type) {
				window.clearTimeout(t);
			} else {
				new_el.hover(function() {
					window.clearTimeout(t);
				}, function() {
					var t = setTimeout(function() {
						new_el.fadeOut(speed, function() {
							$(this).remove();
						})
					}, time)
				});	
			}
		});
	}
}