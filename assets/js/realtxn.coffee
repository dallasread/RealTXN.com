---
---

$(document).on "click", ".show_in_dialog", ->
	src = $(this).attr("href")
	$("#dialog iframe").attr "src", src
	$("#dialog").show()
	false

$(document).on "click", "#dialog", ->
	$(this).hide()
	false

@ig =
	setSidebarHeight: ->
		if $(".sidebar").length
			height = $(".yield").height() + 60
			$(".sidebar").css "height", height
			
	setPageDimensions: (delay = 700) ->
		ig.window_width = $(window).width()
		ig.mobile = ig.window_width < 600
		ig.topbar_height = $(".topbar").height()

		if $("#post").length
			ig.avatar_offset = $("#post .avatar").offset().top
		
		if $("#pricing").length
			$("#pricing th, #pricing td").each ->
				$(this).css "width", $(this).width()

		ig.scroll()
		setTimeout ig.setSidebarHeight, delay
	
	setAvatar: (scrolled) ->
		if $("#post").length
			padding = 30
			content_top_border_height = 15
		
			if ig.avatar_offset < scrolled + ig.topbar_height + content_top_border_height
				$("#post .author").addClass("fixed").css
					top: ig.topbar_height + content_top_border_height
			else
				$("#post .author").removeClass("fixed").css
					top: "auto"
	
	setPricingHeader: (scrolled) ->
		if $("#pricing_placeholder").length
			pricing = $("#pricing")
			placeholder = pricing.offset().top
			thead_height = 48

			if scrolled + ig.topbar_height > placeholder + pricing.height() - thead_height
				$("#pricing_placeholder").hide()
				$("#pricing").removeClass "fixed_header"
			else if scrolled + ig.topbar_height < placeholder - thead_height
				$("#pricing_placeholder").hide()
				$("#pricing").removeClass "fixed_header"
			else if scrolled + ig.topbar_height > placeholder
				$("#pricing_placeholder").show()
				$("#pricing").addClass "fixed_header"
	
	scroll: ->
		if ig.window_width > 600
			scrolled = $(window).scrollTop()
			ig.setAvatar scrolled
			ig.setPricingHeader scrolled

	load: ->
		ig.setPageDimensions 500
		ig.setPricingHeader 0

$(document).on "click", ".show_intro_video", ->
	$("iframe").attr "src", "//www.youtube.com/embed/i6kkuq5_RtM?theme=light&showinfo=0&autoplay=1"
	$("#intro_video").show()
	false

$(document).on "click", "#intro_video", ->
	$(this).hide()
	$("iframe").attr "src", ""
	false

$(document).on
	mouseenter: ->
		index = $(this).index() + 1
		$("#pricing").find("td:nth-child(#{index}):not(.trait)").addClass("hover")
	mouseleave: ->
		$("#pricing").find(".hover").removeClass("hover")
, "#pricing th, #pricing td"

$ ->
	$(window).scroll ig.scroll
	$(window).resize ig.setPageDimensions(0)
	ig.setPageDimensions 700

document.addEventListener "page:change", ig.load