(function() {
  $(document).on("click", ".show_in_dialog", function() {
    var src;
    src = $(this).attr("href");
    $("#dialog iframe").attr("src", src);
    $("#dialog").show();
    return false;
  });

  $(document).on("click", "#dialog", function() {
    $(this).hide();
    return false;
  });

  this.ig = {
    setSidebarHeight: function() {
      var height;
      if ($(".sidebar").length) {
        height = $(".yield").height() + 60;
        return $(".sidebar").css("height", height);
      }
    },
    setPageDimensions: function(delay) {
      if (delay == null) {
        delay = 700;
      }
      ig.window_width = $(window).width();
      ig.mobile = ig.window_width < 600;
      ig.topbar_height = $(".topbar").height();
      if ($("#post").length) {
        ig.avatar_offset = $("#post .avatar").offset().top;
      }
      if ($("#pricing").length) {
        $("#pricing th, #pricing td").each(function() {
          return $(this).css("width", $(this).width());
        });
      }
      ig.scroll();
      return setTimeout(ig.setSidebarHeight, delay);
    },
    setAvatar: function(scrolled) {
      var content_top_border_height, padding;
      if ($("#post").length) {
        padding = 30;
        content_top_border_height = 15;
        if (ig.avatar_offset < scrolled + ig.topbar_height + content_top_border_height) {
          return $("#post .author").addClass("fixed").css({
            top: ig.topbar_height + content_top_border_height
          });
        } else {
          return $("#post .author").removeClass("fixed").css({
            top: "auto"
          });
        }
      }
    },
    setPricingHeader: function(scrolled) {
      var placeholder, pricing, thead_height;
      if ($("#pricing_placeholder").length) {
        pricing = $("#pricing");
        placeholder = pricing.offset().top;
        thead_height = 48;
        if (scrolled + ig.topbar_height > placeholder + pricing.height() - thead_height) {
          $("#pricing_placeholder").hide();
          return $("#pricing").removeClass("fixed_header");
        } else if (scrolled + ig.topbar_height < placeholder - thead_height) {
          $("#pricing_placeholder").hide();
          return $("#pricing").removeClass("fixed_header");
        } else if (scrolled + ig.topbar_height > placeholder) {
          $("#pricing_placeholder").show();
          return $("#pricing").addClass("fixed_header");
        }
      }
    },
    scroll: function() {
      var scrolled;
      if (ig.window_width > 600) {
        scrolled = $(window).scrollTop();
        ig.setAvatar(scrolled);
        return ig.setPricingHeader(scrolled);
      }
    },
    load: function() {
      ig.setPageDimensions(500);
      return ig.setPricingHeader(0);
    }
  };

  $(document).on("click", ".show_intro_video", function() {
    $("iframe").attr("src", "//www.youtube.com/embed/i6kkuq5_RtM?theme=light&showinfo=0&autoplay=1");
    $("#intro_video").show();
    return false;
  });

  $(document).on("click", "#intro_video", function() {
    $(this).hide();
    $("iframe").attr("src", "");
    return false;
  });

  $(document).on({
    mouseenter: function() {
      var index;
      index = $(this).index() + 1;
      return $("#pricing").find("td:nth-child(" + index + "):not(.trait)").addClass("hover");
    },
    mouseleave: function() {
      return $("#pricing").find(".hover").removeClass("hover");
    }
  }, "#pricing th, #pricing td");

  $(function() {
    $(window).scroll(ig.scroll);
    $(window).resize(ig.setPageDimensions(0));
    return ig.setPageDimensions(700);
  });

  document.addEventListener("page:change", ig.load);

}).call(this);
