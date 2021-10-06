$(document).ready(function () {
  var curPage = 1;
  var numOfPages = $(".skw-page").length;
  var animTime = 1100;
  var scrolling = false;
  var pgPrefix = ".skw-page-";
  var pgBtn = ".skw-btn-";
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

  $(document).on("mousewheel DOMMouseScroll", function (e) {
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

  //=====================
  // 手機版本滑動 setting
  //=====================

  //獲取手機版本手勢
  var startx, starty;
  //獲得角度
  function getAngle(angx, angy) {
    return (Math.atan2(angy, angx) * 180) / Math.PI;
  }

  //根據起點終點返回方向 1向上 2向下 3向左 4向右 0未滑動
  function getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;

    //如果滑動距離太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
    }

    var angle = getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if (
      (angle >= 135 && angle <= 180) ||
      (angle >= -180 && angle < -135)
    ) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }

    return result;
  }
  //手指接觸螢幕
  document.addEventListener(
    "touchstart",
    function (e) {
      startx = e.touches[0].pageX;
      starty = e.touches[0].pageY;
    },
    false
  );
  //手指離開螢幕
  document.addEventListener(
    "touchend",
    function (e) {
      var endx, endy;
      endx = e.changedTouches[0].pageX;
      endy = e.changedTouches[0].pageY;
      var direction = getDirection(startx, starty, endx, endy);
      switch (direction) {
        case 0:
          // alert("未滑動！");
          break;
        case 1:
          // alert("向上！")
          navigateUp();
          break;
        case 2:
          navigateDown();
          // alert("向下！")
          break;
        case 3:
          // alert("向左！")
          break;
        case 4:
          // alert("向右！")
          break;
        default:
      }
    },
    false
  );

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
