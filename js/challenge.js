$(function() {

  // 챌린지 > 카테고리 열기/닫기
  $(document).on('click','.challenge_category button', function() {
    $(this).parents('.challenge_category').toggleClass('active');
  })

  // 챌린지 > 카테고리 클릭시 선택 & 스크롤
  $('.challenge_category .inner > ul > li').eq(0).addClass('active'); // 초기 '전체' 선택
  $(document).on('click','.challenge_category .inner > ul > li', function(){       
    var menuWidth = $('.challenge_category .inner').width();
    var scrollWidth = 0;
    var scrollNow = 0;
    $(this).siblings('li').removeClass('active');
    $(this).addClass('active'); 
    $('.challenge_category .inner > ul > li').each(function(){        
        var _width = $(this).width();
          if($(this).hasClass('active')){
              scrollNow = scrollWidth - (menuWidth /2) + (_width /2);    
              $('.challenge_category .inner').animate({scrollLeft : scrollNow}, 10); 
              scrollWidth = scrollWidth + _width;           
          } else {
              scrollWidth = scrollWidth + _width;
          };          
    });
  });

  // 챌린지 > 카테고리 리스트 작게보기/크게보기
  $(document).on('click', '.view_type > button', function() {
    $(this).parents('.challenge_list').toggleClass('active');
  })

  // 챌린지 > 카테고리 리스트 츨겨찾기 선택/해제
  $(document).on('click', '.challenge_list > ul > li > button', function() {
    $(this).toggleClass('active')
  })

  // 챌린지 > 상단 광고판(marquee)
  $('.challenge_notice > .inner').marqueeEvent(0.2);
  $(document).on('click', '.challenge_notice > button', function() {
    $('.challenge_notice').addClass('hide');
  }) 

    // 챌린지 > 걷기 그래프 애니메이션
    function challengeAni(current) {
      $('.challenge_info .progress_wrap .graph .inner span').css('width', current + '%');
    }
    
    // 챌린지 진행중 걸음수 애니메이션
		function ongoingAni(today, yesterday) {
			const todayGraph = $('.challenge_report .graph_wrap .walking1');

      todayGraph.css('width', today + '%');
		}

    // 챌린지 > 받기 버튼 애니메이션
    $(document).on('click', '.challenge_reward .reward_list > li > button', function() {
      $.fn.downloadAnimation();
      $(this).addClass('complete');
    })
   
    // 챌린지 > (스크롤시) 애니메이션 실행
    $(window).on('scroll', function() {      
      const winHeight = window.innerHeight;
  
        // 걷기 그래프 애니메이션
          $('.challenge_info').each(function() {  
              const exposurePercentage = 100; 
              const scrollEle = $(this);
              const rect = $(this)[0].getBoundingClientRect();
              const contentHeight = rect.bottom - rect.top;
                
              if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
                scrollEle.addClass('active');
                challengeAni(30);          
                $(this).find('.progress_wrap .info > div strong').animateCounter(30, 100);    
              }
          });         

          // 챌린지 진행중 걸음수 애니메이션
          $('.challenge_report').each(function() {  
            const exposurePercentage = 60;            
            const scrollEle = $(this);
            const rect = $(this)[0].getBoundingClientRect();
            const contentHeight = rect.bottom - rect.top;
            
              if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
                // scrollEle.addClass('active');
                ongoingAni(30, 100);
                $(this).find('.graph_cont > h3 span').animateCounter(100, 100);
                $(this).find('.graph_cont .graph_wrap .walking1 em > i').animateCounter(100, 100);  
              }

          });

    });

});






