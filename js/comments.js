$(function (){

  const dimLayer1 = $('.enter_reply_wrap.fixed');
  const infoWrap = $('.enter_reply_wrap.fixed .info_wrap');
  const inputWrap = $('.enter_reply_wrap.fixed .input_wrap');
  const viewCount =  $('.enter_reply_wrap.fixed > .inner > .count');
  const viewCount2 =  $('.enter_reply_wrap.fixed .input_wrap > .inner .count');
  const bookMark = $('comments_list_wrap .btn_bookmark');
 
  // 댓글 > 댓글쓰기
  inputWrap.on('click', function(e) {  
    if ($(this).has(e.target).length) {
       $.fn.enterReplyShow();
       viewCount.show();
       viewCount2.hide();  
    }
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

   // 댓글 > 이미지 첨부
  $(document).on('click', '.btn_attachment', function() {
    $('.enter_reply_wrap.fixed > .inner .attachment').toggleClass('show');    
  })   

 // 댓글 > 북마크 버튼 
  $(document).on('click', '.comments_list_wrap .btn_bookmark', function() {
    $(this).toggleClass('active');    
  })  
  
});