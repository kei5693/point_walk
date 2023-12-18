// 메인
let main = {
  init(){
    this.mainInit(99999, 30, 80); // 걸음수, 오늘, 어제
    this.mainWeeklyEvent(3); // 요일 0 ~ 6(일 ~ 토)
    this.mainScrollEvent();
    this.monthlyAttendanceEvent(13); // 0부터 시작하니 원하는 날짜-1 입력
  },
  // 메인 : 출석 이벤트 오늘날짜로 스크롤 이동, 클릭 이벤트
  mainWeeklyEvent: function(day){
    if(document.querySelector('.attendance_wrap .calendar_cont') == null) return;

    const attendance = document.querySelector('.attendance_wrap .calendar_cont');
    const weeklyInner = attendance.querySelector(':scope > .weekly_unit .inner');
    const weeklyUl = weeklyInner.querySelector(':scope > ul');
    const weeklyLi = weeklyUl.querySelectorAll('li');
    const heartEffect01 = weeklyInner.querySelector(':scope > .heart_effect01');
    const heartEffect02 = weeklyInner.querySelector(':scope > .heart_effect02');

    setTabInit();
    // init
    setTimeout(() => {
      setActiveTab(weeklyLi, day);
      switchTab(day);
    }, 500);
    
    // inner 리스트 클릭 이벤트
    weeklyLi.forEach((tabTitle, index) => {
      tabTitle.addEventListener('click', (e) => {
        e.preventDefault();

        if(day === index){
          // 클릭 효과 lottie
          heartEffect02.querySelectorAll('lottie-player').forEach((lp)=>{
            lp.play();
          });
  
          tabTitle.querySelector(':scope .icon').classList.replace('unclicked', 'clicked');
  
          // callback
          heartEffect02.querySelectorAll('lottie-player')[1].addEventListener("complete", () => {
            tabTitle.closest('li').classList.replace('today', 'complete');
          });
        }
      });
    });

    // 탭 전체 width 설정
    function setTabInit(){
      let tabWidth = 20; // 우측 간격 20 필요해서 추가
      let gap = 16;
      
      weeklyLi.forEach((el, index)=>{
        if(index == 0 ){
          tabWidth += (el.offsetWidth);
        } else {
          tabWidth += (el.offsetWidth + gap);
        }
      });

      weeklyUl.style.width = tabWidth+'px';
    }
    // 클릭한 대상에 active
    function setActiveTab(titles, index) {
      titles.forEach((title, i) => {
        title.classList.toggle('today', i === index);

        // today에 lottie 적용
        if(i === index){
          title.querySelector(':scope > a .icon').classList.add('unclicked');
          title.querySelector(':scope > a .icon').append(heartEffect01);
          title.querySelector(':scope > a .icon').append(heartEffect02);

          setTimeout(() => {
            heartEffect01.querySelectorAll('lottie-player').forEach((lp)=>{
              lp.play();
            });
          }, 10);
        }
      });
    }
    // 클릭한 대상으로 scroll 이동 이벤트
    function switchTab(n){
      let posCenter = window.outerWidth / 2;
      let pos = 0;
      let posLimit = weeklyUl.offsetWidth - weeklyInner.offsetWidth + 20; // inner에 패딩 20있어서 추가

      if (weeklyLi[n].offsetLeft + weeklyLi[n].offsetWidth / 2 <= posCenter) {
        pos = 0;
      } else {
        pos = (weeklyLi[n].offsetLeft + weeklyLi[n].offsetWidth / 2) - posCenter;
        if (pos > posLimit) {
          pos = posLimit
        }
      }

      weeklyInner.scrollLeft = pos;
    }
  },
  // 메인 : 스크롤 이벤트(출석, 스와이퍼, 상태, 툴바)
  mainScrollEvent: function(){
    if(document.querySelector('.main_content_wrap') == null) return;

    // 출석
    const attendance = document.querySelector('.attendance_wrap');

    // 상태
    const statusUl = document.querySelector('.status_wrap > ul');
    const statusLi = statusUl.querySelectorAll(':scope > li');
    const progressWrap = statusUl.querySelector(':scope > li.walking .content2 > .progress_wrap > div');

    // 툴바
    const toolBar = document.querySelector('.toolbar_wrap');
    const header = document.querySelector('#header');

    // 메인 스와이퍼
    const mainSwipe = document.querySelector('.main_swipe_menu');
    const getHeight = mainSwipe.querySelector(':scope > .inner').offsetHeight;
    let mainVisualSwipe = '';
    let mainTextSwipe = '';
  
    mainSwiper();
    // 상태 스크롤 class 이벤트 
    mainStatusScrollEvent();

    window.addEventListener('scroll', () => {
      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
      let calcScroll = mainSwipe.offsetTop + mainSwipe.offsetHeight - header.offsetHeight; 
      let calcPos = mainSwipe.offsetTop - window.outerHeight/2;

      // 스크롤 감지(스와이퍼, 툴바)
      if(currentScrollPos > calcPos){
        // 메인 스와이퍼 
        if(!mainSwipe.classList.contains('active')){
          mainSwipe.classList.add('active');
          mainSwipe.style.height = getHeight+'px';
          mainTextSwipe.autoplay.start();
        } else {
          // 툴바
          currentScrollPos > calcScroll ? toolBar.classList.remove('active') : toolBar.classList.add('active');
        }
      }

      // 출석
      currentScrollPos > 10 ? attendance.classList.add('active') : resetMainScrollEvent();
      
      // 상태 스크롤 감지
      detectScroll(statusLi, currentScrollPos);

      // 상태 스크롤 class 이벤트
      mainStatusScrollEvent();

      function detectScroll(target, scrollTop){
        target.forEach((el)=>{
          let calcPos = el.offsetTop - window.outerHeight/2;
    
          if(scrollTop > calcPos){
            el.classList.add('active');
    
            // 애니메이션 동작 후에 실행
            el.addEventListener("transitionend", () => {
              if(el.classList.contains('active') && el.classList.contains('walking')){
                setTimeout(() => {mainAni(30, 80)}, 300);
              }
            }, {once: false});
          }
    
          if(scrollTop == 0){
            el.classList.remove('active');
            resetMainAni();
          }
    
          // 걷기 그래프 애니메이션
          function mainAni(today, yesterday){
            progressWrap.querySelector(':scope > span').style.width = today+'%';
            progressWrap.querySelector(':scope > em').style.width = yesterday+'%';
          }
          // 걷기 그래프 초기화
          function resetMainAni(){
            progressWrap.querySelector(':scope > span').style.width = '0%';
            progressWrap.querySelector(':scope > em').style.width = '0%';
          }
        });
      }
    });

    function mainSwiper(){
      if(document.querySelector('.main_swipe_menu') == null) return;
      
      /* 2023-12-04 스크립트 수정 */
      mainVisualSwipe = new Swiper('.main_swipe_menu .visual_swiper', {
        roundLengths: true,		// 이미지가 흐리게 나옴 방지
        loop: true
      });
      mainTextSwipe = new Swiper('.main_swipe_menu .text_swiper', {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        effect: "fade",
        speed: 200,
        loop: true
      });
      /* //2023-12-04 스크립트 수정 */
  
      let currentIndex = 0;
  
      // mainVisualSwipe.on('slideChange', function () {
      //   currentIndex = this.realIndex;
      //   mainTextSwipe.slideTo(currentIndex);
      // });

      mainTextSwipe.on('slideChange', function(){
        currentIndex = this.realIndex;
        mainVisualSwipe.slideTo(currentIndex);
      });
    }
    
    // 메인 스크롤 이벤트 초기화
    function resetMainScrollEvent(){
      attendance.classList.remove('active');

      // 메인 스와이퍼 리셋
      mainSwipe.classList.remove('active');
      mainSwipe.style.height = 0;
      mainTextSwipe.autoplay.stop(); // 2023-12-04 수정

      // 툴바 감추기
      toolBar.classList.remove('active');

      // 
      statusLi.forEach((el)=>{el.classList.remove('active')});
    }

    // 메인 : 상태 스트롤 대응 이벤트
    function mainStatusScrollEvent(){
      if(document.querySelector('.status_wrap') == null) return;
      
      const statusContents = document.querySelectorAll('.status_wrap > ul > li');
  
      statusContents.forEach((li)=>{
        // 걸음, 젤리, 완료한 챌린지
        if(li.classList.contains('animate')){
          let contents = li.querySelector(':scope > .inner > .contents');
          let content1 = contents.querySelector(':scope .content1').offsetHeight;
          let content2 = contents.querySelector(':scope .content2').offsetHeight;
          let heightValue = li.classList.contains('active') ? content2+'px' : content1+'px';
  
          contents.style.height = heightValue;
        }

        // 참여가능한 챌린지
        if(li.classList.contains('participate')){
          let contents = li.querySelector(':scope > .inner > .contents');
          let content1 = contents.querySelector(':scope .content1').offsetHeight;
          let content2 = contents.querySelector(':scope .content2').offsetHeight;
          let heightValue = li.classList.contains('active') ? content2+content1+'px' : content1+'px';

          contents.style.height = heightValue;
        }
      });
    }
  },
  // 메인 최초 로드 시 애니메이션(걸음수, 오늘, 어제)
  mainInit: function(count, today, yesterday){
    if(document.querySelector('.main_content_wrap .status_wrap') == null) return;

    const target = document.querySelector('.main_content_wrap .status_wrap li.walking .content1 > .progress_wrap > div');
    common.animateCounter('.main_content_wrap li.walking .content1 .text_wrap strong', count, 1000);
    target.querySelector(':scope > span').style.width = today+'%';
    target.querySelector(':scope > em').style.width = yesterday+'%';
  },
  // 월간 출석 클릭 이벤트
  monthlyAttendanceEvent: function(today){
    if(document.querySelector('.monthly_attendance_wrap') == null) return;

    const monthlyAttendance = document.querySelector('.monthly_attendance_wrap .monthly_calendar .calendar_tbl');
    const monthlyDate = document.querySelectorAll(':scope td a');
    const heartEffect01 = monthlyAttendance.querySelector(':scope .heart_effect01');
    const heartEffect02 = monthlyAttendance.querySelector(':scope .heart_effect02');

    monthlyDate.forEach((date, index)=>{

      if(today === index){
        setTimeout(() => {
          date.closest('td').classList.add('today');
  
          date.querySelector(':scope .icon').append(heartEffect01);
          date.querySelector(':scope .icon').append(heartEffect02);
        }, 300);

        date.addEventListener('click', (e)=>{
          e.preventDefault();
          // 클릭 효과 lottie
          heartEffect02.querySelectorAll('lottie-player').forEach((lp)=>{
            lp.play();
          });

          date.querySelector(':scope .icon').classList.add('clicked');

          //callback
          heartEffect02.querySelectorAll('lottie-player')[1].addEventListener("complete", () => {
            date.closest('td').classList.replace('today', 'complete');
          });
        });
      }
    });
  }
}