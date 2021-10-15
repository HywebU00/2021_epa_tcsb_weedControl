$(document).ready(function () {
  var curPage = 1;
  var numOfPages = $(".skw-page").length;
  var animTime = 1100;
  var scrolling = false;
  var pgPrefix = ".skw-page-";
  var pgBtn = ".skw-btn-";

  //螢幕寬度
  var pgWidth = $(window).width();
  // console.log(pgWidth);
  function pagination() {
    scrolling = true;

    $(pgPrefix + curPage)
      .removeClass("inactive")
      .addClass("active");
    $(pgPrefix + (curPage - 1)).addClass("inactive");
    $(pgPrefix + (curPage + 1)).removeClass("active");

    //點擊按鈕改變按鈕樣式 除了自己以外移除狀態
    $(pgBtn + curPage).addClass("fullpage_btn-active");
    $(pgBtn + curPage)
      .siblings()
      .removeClass("fullpage_btn-active");
    setTimeout(function () {
      scrolling = false;
    }, animTime);
  }

  function navigateUp() {
    if (curPage === 1) return;
    curPage--;
    pagination();
  }

  function navigateDown() {
    if (curPage === numOfPages) return;
    curPage++;
    pagination();
  }

  $(document).on("mousewheel DOMMouseScroll resize", function (e) {
    pgWidth = $(window).width();
    if (pgWidth < 767 || pgWidth === 767) {
      return;
    }
    if (scrolling) return;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      navigateUp();
    } else {
      navigateDown();
    }
  });

  $(document).on("keydown", function (e) {
    if (scrolling) return;
    if (e.which === 38) {
      navigateUp();
    } else if (e.which === 40) {
      navigateDown();
    }
  });
  $(window).on("resize", function (e) {
    pgWidth = $(window).width();
    if (pgWidth < 767 || pgWidth === 767) {
      window.location.reload();
    }
  });
  //=====================
  // 按鈕列控制 setting
  //=====================

  $(".fullpage_btn").click(function () {
    var clickBtn = $(this).data("page");
    //點擊按鈕改變按鈕樣式 除了自己以外移除狀態
    $(this).addClass("fullpage_btn-active");
    $(this).siblings().removeClass("fullpage_btn-active");

    //獲取字串最後一個值
    var picIdx = JSON.parse(clickBtn.split("")[clickBtn.split("").length - 1]);
    $(".skw-page").removeClass("active");
    $(".skw-page").addClass("inactive");
    $("." + clickBtn).addClass("active");
    $("." + clickBtn).removeClass("inactive");
    curPage = picIdx;
  });
  //=====================
  // slider setting
  //=====================

  var h = $(window).height(),
    wrap = $(".wrapp"),
    image = wrap.find(".wrapp-item"),
    len = image.length,
    i = 0,
    seconds = 5000;
  /*
  ==================================
  Screnn resize and change height 
  ==================================
  */
  /* on load screen size */
  wrap.css({
    height: h,
  });
  /* Resize screen event */
  $(window).resize(function () {
    /* change value on resize */
    h = $(window).height();
    wrap.css({
      height: h,
    });
  });
  /*  */
  function items_to_display(i) {
    image.css({
      visibility: "hidden",
      opacity: 0,
    });
    image.eq(i).css({
      visibility: "visible",
      opacity: 1,
    });
    // image.children("img").css({ opacity: 0, visibility: "hidden" });
    // image.eq(i).children("img").css({ opacity: 1, visibility: "visible" });
    // txt.text(image.eq(i).attr("alt"));
  }
  /* Show the first image on load */
  items_to_display(i);
  /*
  ====================================
  Time interval for changing images
  ====================================
  */
  /* set time interval */
  function myTimer() {
    timer = setInterval(function () {
      if (i < len - 1) {
        i = i + 1;
      } else if (i == len - 1) {
        i = 0;
      }
      items_to_display(i);
    }, seconds);
  }
  myTimer(); /* init timer */
});
