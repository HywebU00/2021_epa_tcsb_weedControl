// 自行加入的JS請寫在這裡
$(function () {
  // 首頁輪播
  $(".npSlider").slick({
    mobileFirst: true,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    fade: true,
    lazyLoaded: true,
    lazyLoad: "ondemand",
    ease: "ease",
    customPaging: function (slider, i) {
      var title = $(slider.$slides[i]).find("img").attr("alt").trim();
      return $('<button type="button" aria-label="' + title + '"/>').text(
        title
      );
    },
  });
  // 廣告輪播
  $(".adSlider").slick({
    mobileFirst: true,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    arrow: true,
    lazyLoaded: true,
    lazyLoad: "ondemand",
    ease: "ease",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  });
  //燈箱slick+lightBox組合
  $(".cp_slider").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    pauseOnFocus: true,
    focusOnSelect: true,
    accessibility: true,
    lazyLoad: "ondemand",
    ease: "ease",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 545,
        settings: {
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
  $(".cp_slider").slickLightbox({
    caption: "caption",
    lazyLoad: "ondemand",
    useHistoryApi: "true",
    ease: "ease",
    lazy: true,
  });
  //
  $(".cppic_slider").slick({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1500,
    // pauseOnHover: true,
    // pauseOnFocus: true,
    // focusOnSelect: true,
    // accessibility: true,
    // lazyLoad: 'ondemand',
    // ease: 'ease',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 545,
        settings: {
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
  // cp_photo
  $(".Slider-for").on(
    "init reInit afterChange",
    function (event, slick, currentSlide) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      $(".controls").html(i + "/" + slick.slideCount);
    }
  );
  $(".Slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    swipe: false,
    swipeToSlide: false,
    lazyLoad: "ondemand",
    asNavFor: ".Slider-nav",
    infinite: true,
  });
  $(".Slider-nav").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: ".Slider-for",
    dots: true,
    arrows: true,
    lazyLoad: "ondemand",
    focusOnSelect: true,
    infinite: true,
  });

  // password_toggle;
  // var passShow = false;
  // $(".password_toggle").each(function (index, el) {
  //   $(this)
  //     .find(".btn-icon")
  //     .off()
  //     .click(function (e) {
  //       if (!passShow) {
  //         $(this).children("i").removeClass().addClass("i_show");
  //         $(this)
  //           .parents(".password_toggle")
  //           .find('input[type="password"]')
  //           .attr("type", "text");
  //         passShow = true;
  //         // console.log(passShow);
  //       } else {
  //         $(this).children("i").removeClass().addClass("i_hide");
  //         $(this)
  //           .parents(".password_toggle")
  //           .find('input[type="text"]')
  //           .attr("type", "password");
  //         passShow = false;
  //         // console.log(passShow);
  //       }
  //       e.preventDefault();
  //     });
  // });

  //skw-page__searchContent 搜尋匡打開與關上
  $(".searchCtrl").click(function () {
    $(".skw-page__searchContent").toggleClass("show");
  });
});

$(".condition").click(function (e) {
  e.preventDefault();
  $(".condition_block").slideToggle();
});

//大事記 event
$(function () {
  $(".eventblock .event .content").css("display", "none");
  $(".eventblock .event .topic>a").click(function () {
    $(".eventblock .event .content").stop().slideUp();
    $(this).parent(".topic").next(".content").stop().slideToggle();

    $(".event .topic>a").removeClass("trunicon");
    $(this).stop().toggleClass("trunicon");
  });
});

//slider-bar 設定

// $("#slider-bar").slider().slider("pips");
// set up an array to hold the months
// var years = ["107", "108", "109", "110執行中"];
var years = ["107", "108", "109"];

$("#slider-bar")
  // activate the slider with options
  .slider({
    min: 0,
    max: years.length - 1,
  })
  // add pips with the labels set to "months"
  .slider("pips", {
    rest: "label",
    labels: years,
  })
  // and whenever the slider changes, lets echo out the month
  .on("slidechange", function (e, ui) {
    let btnValue = ui.value;
    let content;
    $(".year_content").each(function (e) {
      let content = JSON.parse(this.dataset.content);
      if (content === btnValue) {
        $(this).addClass("year_active");
        $(this).siblings().removeClass("year_active");
        $(".ui-slider-handle").html($(this).data("year"));
      } else {
        return;
      }
    });
  });
//一開始預設 按鈕年份
$(".ui-slider-handle").html($(".year_active").data("year"));
