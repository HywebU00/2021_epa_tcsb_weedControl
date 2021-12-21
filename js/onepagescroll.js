$(document).ready(function () {
  var curPage = 1;
  var numOfPages = $(".skw-page").length;
  var animTime = 1000;
  var scrolling = false;
  var pgPrefix = ".skw-page-";
  var pgBtn = ".skw-btn-";

  //螢幕寬度
  var pgWidth = $(window).width();

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
    //換頁 點擊相關頁面的Ａ連結
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
  // 換頁後找到第一個 ａ 連結按鈕;

  function focusFn(picIdx) {
    let PgbtnIdx = picIdx + 1;

    $(pgBtn + picIdx).focusout(function (e) {
      $(pgPrefix + picIdx)
        .find("a")
        .first()
        .focus();
    });
    focusOutFn(PgbtnIdx);
  }
  //  跳開a連結 更換下一個按鈕
  function focusOutFn(num) {
    $(pgPrefix + curPage)
      .find("a:last")
      .focusout(function () {
        let btnlen = $(".fullpage_btn").length;
        //找到目前選擇的頁面編號
        $(".skw-btn-" + num).focus();
        if (num === btnlen) {
          lastBtnChangePage(num);
        }
      });
  }
  // { focus }如果是最後一頁  按鈕 找到a連結後 重新整理
  $(".skw-page-5 .page_btn").focusout(function () {
    document.location.reload();
  });

  $("#modal1 .page_btn").focusout(function () {
    $(".skw-btn-2").focus();
  });

  $(document).on("mousewheel DOMMouseScroll resize", function (e) {
    pgWidth = $(window).width();

    $(".widthsize").html(pgWidth);
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

  function changePage() {
    $(".fullpage_btn").on("keyup", function (e) {
      if (e.keyCode === 9) {
        var clickBtn = $(this).data("page");
        //獲取字串最後一個值
        var picIdx = JSON.parse(
          clickBtn.split("")[clickBtn.split("").length - 1]
        );
        $(".skw-page").removeClass("active");
        $("." + clickBtn).addClass("active");
        $("." + clickBtn).removeClass("inactive");
        $(pgPrefix + (clickBtn - 1)).addClass("inactive");
        $(pgPrefix + (clickBtn + 1)).removeClass("active");
        curPage = picIdx;

        //控制頁面更換後focus
        focusFn(picIdx);
      }
    });
  }
  //=====================
  // 按鈕列控制 setting
  //=====================

  $(".fullpage_btn").on("focus", function () {
    var clickBtn = $(this).data("page");

    //點擊按鈕改變按鈕樣式 除了自己以外移除狀態
    $(this).addClass("fullpage_btn-active");
    $(this).siblings().removeClass("fullpage_btn-active");
    changePage();
  });

  //=====================
  // slider setting
  //=====================

  var h = "100vh"; //$(window).height(),
  (wrap = $(".wrapp")),
    (image = wrap.find(".wrapp-item")),
    (len = image.length),
    (i = 0),
    (seconds = 5000);

  /* Set the matchMedia */
  if (window.matchMedia("(max-width: 767px)").matches) {
    h = "70vh";
  }
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
    var h = "100vh"; //$(window).height(),
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

  //=====================
  // 手機版本滑動測試  setting
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
      var pgWidth = $(window).width();
      endx = e.changedTouches[0].pageX;
      endy = e.changedTouches[0].pageY;
      var direction = getDirection(startx, starty, endx, endy);
      switch (direction) {
        case 0:
          // alert("未滑動！");
          break;
        case 1:
          // alert("向上！");
          if (pgWidth < 767 || pgWidth === 767) {
            return;
          } else {
            navigateUp();
          }
          break;
        case 2:
          if (pgWidth < 767 || pgWidth === 767) {
            return;
          } else {
            navigateDown();
          }
          // alert("向下！");
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

  //響應式斷點  ipad pro（1024*1366）
  function ipadproSize() {
    /* Set the matchMedia */

    var h = $(window).height();
    var w = $(window).width();

    if (window.matchMedia("(max-width: 1025px)").matches && h === 1366) {
      $(".skw-page__half--left .skw-page__content").css({
        // "background-color": "#222",
        padding: "0% 50% 0% 20%",
      });
      $(".skw-page__half--right .skw-page__content").css({
        // "background-color": "#222",
        padding: "0% 20% 0% 50%",
      });
    }
    if (w === 1366 && h > 768) {
      $(".skw-page__half--left .skw-page__content").css({
        // "background-color": "#222",
        padding: "0% 50% 0% 20%",
      });
      $(".skw-page__half--right .skw-page__content").css({
        // "background-color": "#222",
        padding: "0% 20% 0% 50%",
      });
    }
    if (w >= 1360 && w <= 1366 && h <= 1025 && h >= 1020) {
      $(".skw-page__half--left .skw-page__content").css({
        // "background-color": "blue",
        padding: "0% 30% 0% 30%",
      });
      $(".skw-page__half--right .skw-page__content").css({
        // "background-color": "#222",
        padding: "0% 30% 0% 30%",
      });
    }
    if (h <= 1367 && h >= 3164 && w <= 1023) {
      console.log("2");
      $(".skw-page__half--left .skw-page__content").css({
        // "background-color": "#638",
        padding: "0% 50% 0% 20%",
      });
      $(".skw-page__half--right .skw-page__content").css({
        // "background-color": "#222",
        padding: "0% 20% 0% 50%",
      });
    }
    if (w >= 833 && w <= 837 && h <= 1113) {
      $(".skw-page__half--left .skw-page__content").css({
        // "background-color": "#567",
        padding: " 0% 45% 0% 15%",
      });
      $(".skw-page__half--right .skw-page__content").css({
        // "background-color": "#567",
        padding: " 0% 15% 0% 45%",
      });
    }
    if (h >= 833 && h <= 837 && w <= 1113) {
      $(".skw-page__half--left .skw-page__content").css({
        // "background-color": "red",
        padding: " 0% 30% 0% 30%",
      });
      $(".skw-page__half--right .skw-page__content").css({
        // "background-color": "red",
        padding: " 0% 30% 0% 30%",
      });
    }
  }
  ipadproSize();
  $(window).resize(function () {
    ipadproSize();
  });
  $(window).on("orientationchange", function () {
    ipadproSize();
  });
});
