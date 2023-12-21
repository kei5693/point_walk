$(function (){

  // 댓글 > 댓글쓰기
  const dimLayer1 = $('.enter_reply_wrap.fixed');
  const dimLayer2 = $('.dimmed_layer2');
  const infoWrap = $('.enter_reply_wrap.fixed .info_wrap');
  const inputWrap = $('.enter_reply_wrap.fixed .input_wrap');
  const viewCount =  $('.enter_reply_wrap.fixed > .inner > .count');
  const viewCount2 =  $('.enter_reply_wrap.fixed .input_wrap > .inner .count');

  $(document).on('focus', '.enter_reply_wrap.fixed .input_wrap input', function() {
    if(!dimLayer1.hasClass('active')){
        dimLayer2.fadeIn(200);
    }else{
        dimLayer2.fadeOut(200);
    }    
    viewCount.show();
    viewCount2.hide();
  }) 
  $(document).on('focusout', '.enter_reply_wrap.fixed .input_wrap input', function() {
    dimLayer2.fadeOut(200);
    viewCount.hide();
    viewCount2.show();
  }) 

  // 댓글 > 답글쓰기
  $(document).on('click', '.comments_list_wrap .btn_writing_reply', function() {
    $.fn.enterReplyShow();
    infoWrap.show()
    inputWrap.addClass('reply').find('input').attr('placeholder','답글을 입력해주세요');
    viewCount.show();
    viewCount2.hide();
  })

  // 댓글 > 답글창 닫기
  $(document).on('click', '.enter_reply_wrap.fixed .info_wrap .status button ', function() {
    $.fn.enterReplyHide();
    infoWrap.hide();
    inputWrap.removeClass('reply').find('input').attr('placeholder','댓글을 입력해주세요');
    viewCount.hide();
    viewCount2.show();
  })

    // 입력창 dimmed로 닫기
    dimLayer1.on('click', function (e) {
    if ($(e.target).hasClass('active')) {
        $.fn.enterReplyHide();
        infoWrap.hide();
        inputWrap.removeClass('reply').find('input').attr('placeholder','댓글을 입력해주세요');
        viewCount.hide();
        viewCount2.show();
    }
    });

  // 댓글 > 더보기
  $(document).on('click', '.comments_content .content .btn_more', function() {
    let target = $(this).parent();
    if (target.hasClass('expansion')){
        target.removeClass('expansion');
    }else {
        target.addClass('expansion');
    }
  })

   
  
});