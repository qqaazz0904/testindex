$(document).ready(function() {
//导航栏切换
	$(".munes_and_search li").mouseenter(function(){
		var $this = $(this),
		index = $this.index();
		$this.addClass("red_border").siblings("li").removeClass("red_border");
		$(".munes_list").css("display","block");
		$(".munes_list_uls ul").eq(index).addClass("selected").siblings("ul").removeClass("selected");
	});
	$(".munes_list").mouseleave(function(){
		$(".munes_list").css("display","none");
		$(".munes_list_uls ul").removeClass("selected");
	});
	$(".nav").mouseenter(function(){
		$(".munes_list").css("display","none");
		$(".munes_list_uls ul").removeClass("selected");
	})
//	层级轮播图
	var zIndex = 0;
	var iNow = 0;
	var fNow = 0;
	$(".wrap ol li").mouseenter(function() {
		
		if($(this).index() != fNow){
		zIndex++;
		$(".wrap ul li")
			.eq($(this).index())
			.css({
				"z-index": zIndex,
				"left": 390
			})
			.animate({
				"left": 0
			}, 500);
			iNow = $(this).index();
			fNow = $(this).index();
			return false;
		}
	});
	var timer = null;
	
	timer = setInterval(autoplay,2000);
	function autoplay(){
		iNow++;
		if(iNow > $(".wrap ol li").length-1){
			iNow = 0;
		}
		$(".wrap ol li").eq(iNow).trigger("mouseenter");
	}	
	
	$(".wrap").hover(function() {
		clearInterval(timer);
   },
	function(){
		clearInterval(timer);
        timer = setInterval(autoplay,2000);
	});

//分类切换tab栏
	$(".subnav li").mouseenter(function(){
                var $this = $(this),
                    index = $this.index();
                $this.addClass("mark").siblings("li").removeClass("mark");

                $(".content").eq(index).addClass("selected").siblings().removeClass("selected");
            });
//尾部
//	$(".footer_title ul li").mouseenter(function(){
//		var $this = $(this)
//		$this.css({"font":"30px/80px '楷体'"})
//	})
//	$(".footer_title ul li").mouseenter(function(){
//		var $this = $(this)
//		if($this != $(".footer_title ul li").parent(":first").children())
//		{
//		$this.addClass("li_big").siblings("li").removeClass("li_big");
//		$this.parent().siblings().children().removeClass("li_big");
//		$this.siblings().clone().insertAfter($this.parent().siblings(":first").children());
//		$this.parent().addClass("flag");
//		$this.siblings().remove();
//		$this.parent().siblings(":first").children(":last").clone().insertAfter($this.parent("ul[class]").children())
//		$this.parent().siblings(":first").children(":last").remove();
//		}
//		
//	})
	function tabs() {
		$.fn.extend({
				magnifier: function() {
					var width = {
							wide: {
								normal: 80,
								active: 132,
								gap: 54
							},
							narrow: {
								normal: 68,
								active: 117,
								gap: 49
							}
						},
						height = {
							wide: {
								normal: 32,
								active: 66
							},
							narrow: {
								normal: 28,
								active: 58
							}
						},
						gap = {
							wide: {
								horizontal: 2,
								vertical: 2
							},
							narrow: {
								horizontal: 3,
								vertical: 2
							}
						},
						item_inline = 9,
						item_status = "wide",
						self = this.each(function() {
							var topic = $(this),
								list = topic.find(".ui-topic__list").css({
									position: "relative"
								}),
								item = list.find(".ui-topic__item").css({
									position: "absolute"
								}),
								item_active = item.filter(".is-active"),
								isMoving = !1;
							item_active.css({
									top: 0,
									left: 0,
									width: width[item_status].active,
									height: height[item_status].active
								}).attr("data-x", "0").attr("data-y", "*"),
								item.not(item_active).each(function(i) {
									var y = i >= item_inline ? 1 : 0,
										x = y ? i - item_inline : i;
									$(this).css({
										top: i >= item_inline ? height[item_status].normal + gap[item_status].vertical : 0,
										left: x * (width[item_status].normal + gap[item_status].horizontal) + width[item_status].active + gap[item_status].horizontal,
										width: width[item_status].normal,
										height: height[item_status].normal
									}).attr("data-x", x + 1).attr("data-y", y)
								});
							var getPosition = function(target) {
									return {
										x: target.attr("data-x"),
										y: target.attr("data-y")
									}
								},
								reflow = function(item_prev, item_active) {
									var pos_prev = getPosition(item_prev),
										pos_active = getPosition(item_active),
										temp = pos_prev.y;
									pos_prev.y = pos_active.y,
										pos_active.y = temp,
										item_prev.attr("data-y", pos_prev.y),
										item_active.attr("data-y", pos_active.y);
									var min = Math.min(pos_prev.x, pos_active.x),
										max = Math.max(pos_prev.x, pos_active.x),
										item_group = item.not(item_prev).not(item_active).filter(function() {
											var pos_current = getPosition($(this));
											return pos_current.y != pos_prev.y && pos_current.x >= min && pos_current.x <= max
										}),
										fixed = pos_active.x < pos_prev.x ? 1 : -1;
									item_group.each(function() {
										$(this).attr("data-x", $(this).attr("data-x") - 0 + fixed)
									})
								};
							topic.on("mouseover mousemove", ".ui-topic__item:not(.is-active)",
								function() {
									if(!isMoving) {
										isMoving = !0;
										var item_prev = item_active.removeClass("is-active");
										item_active = $(this).addClass("is-active"),
											reflow(item_prev, item_active);
										var pos_prev = getPosition(item_prev),
											pos_active = getPosition(item_active);
										item_prev.css({
												zIndex: ""
											}).stop().animate({
													top: (height[item_status].normal + gap[item_status].vertical) * pos_prev.y,
													left: (width[item_status].normal + gap[item_status].horizontal) * pos_prev.x + (pos_prev.x < pos_active.x ? 0 : width[item_status].gap),
													width: width[item_status].normal,
													height: height[item_status].normal
												},
												function() {
													isMoving = !1
												}),
											item_active.css({
												zIndex: 9
											}).stop().animate({
												top: 0,
												left: (width[item_status].normal + gap[item_status].horizontal) * pos_active.x,
												width: width[item_status].active,
												height: height[item_status].active
											}),
											item.not(item_prev).not(item_active).each(function() {
												var pos_current = getPosition($(this));
												$(this).css({
													width: width[item_status].normal,
													height: height[item_status].normal
												}).stop().animate({
													top: (height[item_status].normal + gap[item_status].vertical) * pos_current.y,
													left: (width[item_status].normal + gap[item_status].horizontal) * pos_current.x + (pos_current.x < pos_active.x ? 0 : width[item_status].gap)
												})
											})
									}
								}).on("magnifier:update",
								function() {
									var pos_active = getPosition(item_active);
									item.not(item_active).each(function() {
											var pos_current = getPosition($(this));
											$(this).css({
												width: width[item_status].normal,
												height: height[item_status].normal,
												top: (height[item_status].normal + gap[item_status].vertical) * pos_current.y,
												left: (width[item_status].normal + gap[item_status].horizontal) * pos_current.x + (pos_current.x < pos_active.x ? 0 : width[item_status].gap)
											})
										}),
										item_active.css({
											left: (width[item_status].normal + gap[item_status].horizontal) * pos_active.x,
											width: width[item_status].active,
											height: height[item_status].active
										})
								})
						}),
						update = function() {
							$(this).trigger("magnifier:update")
						};
					return $(window).on("resize:narrow",
							function() {
								item_status = "narrow",
									self.each(update)
							}).on("resize:wide",
							function() {
								item_status = "wide",
									self.each(update)
							}),
						this
				}
			}),
			$(".ui-topic").magnifier()
	};
	tabs()
});
