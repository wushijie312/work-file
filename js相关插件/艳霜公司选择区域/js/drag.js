/**
 * author levi
 * url http://levi.cg.am
 */
$(function () {
	function debug(msg) {
		$("#debug").text(msg + "\n");
	}
	$(document).mousemove(function (e) {
		if (!!this.move) {

			//    if(x+w)
			var walkways_val = JSON.parse($("#walkways_val").val());
			var posix = !document.move_target ? { 'x': 0, 'y': 0 } : document.move_target.posix,
				callback = document.call_down || function () {
					var posTop = e.pageY - posix.y, posLeft = e.pageX - posix.x;
					var canvas = $(this.move_target).parent();
					// add wushijie
					for (var i = 0; i < walkways_val.length; i++) {
						var walkway = walkways_val[i];
						if ((posLeft > walkway.l && posLeft + $(this.move_target).width() < walkway.r) && (posTop > walkway.t && posTop + $(this.move_target).height() < walkway.b)) {
							$(this.move_target).css({
								cursor: 'move',
								'top': posTop,
								'left': posLeft
							});

							$(".walkway").css({
								background: "transparent"
							}).eq(i).css({
								background: "rgba(0,0,0,0.05)"
							});
						}

					}
					// 判断多个小方块相互贴近吸引 start
					if ($(this).attr("id") != "canvas") {
						var move_id = $(this.move_target).attr("rel");
						var move_w = $(this.move_target).width();
						var move_h = $(this.move_target).height();
						for (var j = 0; j < $(".box_user").length; j++) {
							var user = $(".box_user").eq(j);
							var fixed_id = user.attr("rel");
							var fixed_pos = user.position();
							var fixed_w = user.width();
							var fixed_h = user.height();
							if (fixed_id != move_id) {
								if (!((posLeft + move_w > fixed_pos.left && posLeft < fixed_pos.left + fixed_w) && (posTop + move_h) > fixed_pos.top && posTop < (fixed_pos.top + fixed_h))) {


									if ((posLeft + move_w > fixed_pos.left-15 && posLeft + move_w < fixed_pos.left)&& (((posTop + move_h) > fixed_pos.top-15 &&posTop  < fixed_pos.top+ fixed_h+15 ))) {
										$(this.move_target).css({
											cursor: 'move',
											'left': fixed_pos.left-fixed_w
										});
									}
									if ((posLeft > fixed_pos.left+fixed_w && posLeft  < fixed_w+fixed_pos.left+15)&& (((posTop + move_h) > fixed_pos.top-15 &&posTop  < fixed_pos.top+ fixed_h+15 ))) {
										$(this.move_target).css({
											cursor: 'move',
											'left': fixed_pos.left+fixed_w
										});

									}
									if ((posTop + move_h > fixed_pos.top-15 && posTop + move_h < fixed_pos.top)&& (((posLeft + move_w) > fixed_pos.left-15 &&posLeft  < fixed_pos.left+ fixed_w+15 ))) {
										$(this.move_target).css({
											cursor: 'move',
											'top': fixed_pos.top-fixed_h
										});

									}
									if ((posTop > fixed_pos.top+fixed_h && posTop  < fixed_h+fixed_pos.top+15)&& (((posLeft + move_w) > fixed_pos.left-15 &&posLeft  < fixed_pos.left+ fixed_w+15 ))) {
										$(this.move_target).css({
											cursor: 'move',
											'top': fixed_pos.top+fixed_h
										});

									}

								}
							}
						}
						// 判断多个小方块相互贴近吸引 end
					}

				};
			callback.call(this, e, posix);
			return false;
		}
	}).mouseup(function (e) {
		if (!!this.move) {
			var posix = !document.move_target ? { 'x': 0, 'y': 0 } : document.move_target.posix;
			var walkways_val = JSON.parse($("#walkways_val").val());
			var posTop = e.pageY - posix.y, posLeft = e.pageX - posix.x;

			// 占时隐藏 start
			if ($(this).attr("id") != "canvas") {
				var getPos = $("#move_val").val() ? JSON.parse($("#move_val").val()) : '', is_exist = true;
				// 判断多个小方块之间重叠问题 start
				var move_id = $(this.move_target).attr("rel");
				var move_w = $(this.move_target).width();
				var move_h = $(this.move_target).height();
				for (var j = 0; j < $(".box_user").length; j++) {
					var user = $(".box_user").eq(j);
					var fixed_id = user.attr("rel");
					var fixed_pos = user.position();
					var fixed_w = user.width();
					var fixed_h = user.height();
					if (fixed_id != move_id) {
						if (((posLeft + move_w > fixed_pos.left && posLeft < fixed_pos.left + fixed_w) && (posTop + move_h) > fixed_pos.top && posTop < (fixed_pos.top + fixed_h))) {
							$(this.move_target).css({
								'top': getPos.top + "px",
								'left': getPos.left + "px",
							});
							break;
						} else {
							// $(this.move_target).css({
							// 	'top': posTop + "px",
							// 	'left': posLeft + "px"
							// });
							// 判断多个小方块相互贴近吸引 start
							if ((posLeft + move_w > fixed_pos.left-15 && posLeft + move_w < fixed_pos.left)&& (((posTop + move_h) > fixed_pos.top-15 &&posTop  < fixed_pos.top+ fixed_h+15 ))) {
								$(this.move_target).css({
									cursor: 'move',
									'left': fixed_pos.left-fixed_w
								});
							}
							if ((posLeft > fixed_pos.left+fixed_w && posLeft  < fixed_w+fixed_pos.left+15)&& (((posTop + move_h) > fixed_pos.top-15 &&posTop  < fixed_pos.top+ fixed_h+15 ))) {
								$(this.move_target).css({
									cursor: 'move',
									'left': fixed_pos.left+fixed_w
								});
							}
							if ((posTop + move_h > fixed_pos.top-15 && posTop + move_h < fixed_pos.top)&& (((posLeft + move_w) > fixed_pos.left-15 &&posLeft  < fixed_pos.left+ fixed_w+15 ))) {
								$(this.move_target).css({
									cursor: 'move',
									'top': fixed_pos.top-fixed_h
								});
							}
							if ((posTop > fixed_pos.top+fixed_h && posTop  < fixed_h+fixed_pos.top+15)&& (((posLeft + move_w) > fixed_pos.left-15 &&posLeft  < fixed_pos.left+ fixed_w+15 ))) {
								$(this.move_target).css({
									cursor: 'move',
									'top': fixed_pos.top+fixed_h
								});
							}
							// 判断多个小方块相互贴近吸引 end

						}
					}
				}
				// 判断多个小方块之间重叠问题 end


				for (var i = 0; i < walkways_val.length; i++) {
					var walkway = walkways_val[i];
					// if ((posLeft + $(this.move_target).width() > walkway.x && posLeft < walkway.x + walkway.w) && (posTop + $(this.move_target).height()) > walkway.y && posTop < (walkway.y + walkway.h)) {
					if ((posLeft > walkway.l && posLeft + $(this.move_target).width() < walkway.r) && (posTop > walkway.t && posTop + $(this.move_target).height() < walkway.b)) {
						is_exist = false;

					}
				}
				$(".walkway").css({
					background: "transparent"
				});
				if (is_exist) {

					$(this.move_target).css({
						cursor: 'move',
						'top': getPos.top,
						'left': getPos.left
					});
				}
			}

			// 判断多个小方块之间重叠问题 start
			// for (var i = 0; i < allBoxs.length; i++) {
			// 	var allBox = allBoxs[i];
			// 	if (allBox.rel == $(this.move_target).attr('rel')) {
			// 		allBox.width = $(this.move_target).width() / rate;
			// 		allBox.height = $(this.move_target).height() / rate;
			// 		allBox.left = $(this.move_target).position().left / rate;
			// 		allBox.top = $(this.move_target).position().top / rate;
			// 	}
			// }
			// 判断多个小方块之间重叠问题 end
			// 占时隐藏 end


			//获取展位相对位置
			$('.box').each(function () {
				var box = {};
				box['id'] = $(this).attr('dataId');
				box['text'] = $(this).find('.content').text();
				box['color'] = $(this).find('.bg').css('background-color');
				box['height'] = $(this).height();
				box['width'] = $(this).width();
				box['pageX'] = $(this).position().left;
				box['pageY'] = $(this).position().top;
				console.dir(box);
			});






			$("#move_val").val('');
			var callback = document.call_up || function () { };
			callback.call(this, e);
			$.extend(this, {
				'move': false,
				'move_target': null,
				'call_down': false,
				'call_up': false
			});
		}
	});






});