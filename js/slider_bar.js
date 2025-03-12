//==================
//slider-bar 設定
//==================
// set up an array to hold the months
var years = ['107', '108', '109', '110', '111', '112', '113'];

if ($('#slider-bar') !== null) {
}
$('#slider-bar')
  .slider({
    min: 0,
    max: years.length - 1,
  })
  // add pips with the labels set to "months"
  .slider('pips', {
    rest: 'label',
    labels: years,
  })
  // and whenever the slider changes, lets echo out the month
  .on('slidechange', function (e, ui) {
    let btnValue = ui.value;
    let content;
    $('.year_content').each(function (e) {
      let content = Number(this.dataset.content);
      if (content === btnValue) {
        $(this).addClass('year_active');
        $(this).siblings().removeClass('year_active');
        $('.ui-slider-handle').html($(this).data('year'));
      } else {
        return;
      }
    });
  });
//一開始預設 按鈕年份
$('.ui-slider-handle').html($('.year_active').data('year'));
