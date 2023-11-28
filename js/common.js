// 공통
let common = {
  // 공통 - 팝업 : 버튼으로 팝업 열기
  layerButtonToggle: function(){
    let btnArr = document.querySelectorAll('.layer_button_toggle');
    btnArr.forEach((btn)=>{
      btn.addEventListener('click', ()=>{
				this.layerToggle(btn.dataset.popupName);
			});
    });
  },
  // 공통 - 팝업 : 팝업 열기
  layerToggle: function(target, sheetHeight = 100){
    const layerPopup        = document.querySelector(target);
    // 방어
    if (!layerPopup) return console.error(`Element with selector '${target}' not found.`);
    // dimmed
    const dimmedLayer       = layerPopup.querySelector('.dimmed_layer');
    // 팝업 컨텐츠 영역
    const layerContentWrap  = layerPopup.querySelector('.layer_content_wrap');
    // 닫기 버튼
    const layerClose        = layerContentWrap.querySelector(':scope > .layer_close');
    // 드래그
    const layerDrag         = layerPopup.querySelector(".layer_drag");

    // 드래그 상태
    let isDragging          = false;
    // 좌표
    let startY              = 0;
    // 높이
    let startHeight         = 0;
    
    // 팝업 상태
    let isOpened            = layerPopup.classList.contains('active');
    // 팝업 타입
    let isCentered          = layerPopup.classList.contains('align_center');

    isOpened ? hideBottomSheet() : showBottomSheet();

    // 팝업 닫기 클릭 이벤트
    document.querySelector('html').addEventListener('click', (e) => {
      if (e.target == layerClose || e.target == dimmedLayer) {
        hideBottomSheet();
      }
    });

    // 팝업 열기
    function showBottomSheet(){
      document.body.classList.add('active');
      layerPopup.classList.add('active');

      if(!isCentered){
        updateSheetHeight(sheetHeight);
      }
    }

    // 팝업 닫기
    function hideBottomSheet(){
      document.body.classList.remove('active');
      layerPopup.classList.remove('active');
    }

    function updateSheetHeight(height){
      layerContentWrap.style.height = `${height}%`;
      // layerPopup.classList.toggle("fullscreen", height === 100);
    }

    // 드래그
    if(layerDrag){
      (function dragEvent(){
        const dragStart = (e) => {
          isDragging = true;
          startY = e.pageY || e.touches?.[0].pageY;
          startHeight = parseInt(layerContentWrap.style.height);
          layerPopup.classList.add("dragging");
        }
  
        const dragging = (e) => {
          if (!isDragging) return;
          const delta = startY - (e.pageY || e.touches?.[0].pageY);
          const newHeight = startHeight + delta / window.innerHeight * 100;
          updateSheetHeight(newHeight);
        }
  
        const dragStop = () => {
          isDragging = false;
          layerPopup.classList.remove("dragging");
          const sheetHeight = parseInt(layerContentWrap.style.height);
          // sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
          sheetHeight < 50 ? hideBottomSheet() : updateSheetHeight(100);
        }
  
        layerDrag.addEventListener("mousedown", dragStart);
        document.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
  
        layerDrag.addEventListener("touchstart", dragStart);
        document.addEventListener("touchmove", dragging);
        document.addEventListener("touchend", dragStop);
      })();
    }
  },
  // 공통 - 팝업 : 버튼으로 토스트 팝업 열기
  toastButtonToggle: function(){
    let btnArr = document.querySelectorAll('.toast_button_toggle');
    btnArr.forEach((btn)=>{
      btn.addEventListener('click', ()=>{
				this.toastPopupToggle(btn.dataset.popupName);
			});
    });
  },
  // 공통 - 팝업 : 토스트 팝업 열기
  toastPopupToggle: function(target){
    const toastPopup = document.querySelector(target);
    // 방어
    if (!toastPopup) return console.error(`Element with selector '${target}' not found.`);

    toastPopup.classList.add('active');
    toastPopup.addEventListener("transitionend", () => {
      if(toastPopup.classList.contains('active')){
        setTimeout(() => {
          toastPopup.classList.remove('active');
        }, 2000);
      }
    });


  },
  // 공통 - 스크롤 : 스크롤 엔드 감지 이벤트(대상은 1개만 있을 경우로 작성 되었다)
  scrollEnd: function(target = document, buffer = 100){
    const targetEl = target === document ? document : document.querySelector(target);

    targetEl.addEventListener('scroll', (e) => {
      if(this.isScrollNearBottom(e.target, buffer)){
        console.log('end');
      }
    });
  },
  // 공통 - 스크롤 : 스크롤 엔드 감지 함수
  isScrollNearBottom: function(target = document, buffer = 100) {
    const scrollY         = target === document ? window.scrollY || window.pageYOffset : target.scrollTop;
    const viewportHeight  = target === document ? window.innerHeight : target.clientHeight;
    const contentHeight   = target === document ? document.documentElement.scrollHeight : target.scrollHeight;
    return contentHeight - (scrollY + viewportHeight) < buffer
  },
  // 공통 - 스크롤 : 스크롤 방향 감지
  getScrollDirection: function(){
    let prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    let scrollDirection;

    window.addEventListener('scroll', () => {
      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollPos > prevScrollPos) {
        scrollDirection = 'down';
      } else if (currentScrollPos < prevScrollPos) {
        scrollDirection = 'up';
      } else {
        scrollDirection = 'unchanged';
      }

      prevScrollPos = currentScrollPos;
    });

    return () => scrollDirection;

    // 사용 시
    // const getScrollDirection = common.getScrollDirection();
    // const direction = getScrollDirection();
  },
  // 공통 - 스크롤 : 스크롤 발생할 타겟, 이동할 대상, 여백
  scrollToEvent: function(target, interval, gap = 50){
    let scrollTarget = document.querySelector(target);
    let scrollValue = interval.offsetTop - scrollTarget.offsetTop - gap;

    scrollTarget.scrollTop = scrollValue;
  },
  // 공통 - 스크롤 : 스크롤 값에 맞춰서 class 추가
  detectScroll: function(target, scrollTop, interval = 0){
    target.forEach((el)=>{
      let calcPos = el.offsetTop - interval;

      if(scrollTop > calcPos){
        el.classList.add('active');
      }

      // if(scrollTop == 0){
      //   el.classList.remove('active');
      // }
    });
  },
  // 공통 : 탭메뉴 이벤트
  tabMenuEvent: function(initIndex){
    const tabMenus = document.querySelectorAll('.tab_menu_wrap');

    tabMenus.forEach((tabMenu) => {
      const tabTitles = tabMenu.querySelectorAll('.tab_title > li');
      const tabContents = tabMenu.querySelectorAll('.tab_content > div');
      const initialIndex = initIndex || 0;

      // init
      setActiveTab(tabTitles, tabContents, initialIndex);
  
      // 클릭 이벤트
      tabTitles.forEach((tabTitle, currentIndex) => {
        tabTitle.addEventListener('click', (e) => {
          setActiveTab(tabTitles, tabContents, currentIndex);
        });
      });
    });

    function setActiveTab(titles, contents, index) {
      titles.forEach((title, i) => {
        title.classList.toggle('active', i === index);
      });
    
      contents.forEach((content, i) => {
        content.classList.toggle('active', i === index);
      });
    }
  },
  // 공통 : 숫자 애니메인션 카운터
  animateCounter: function(counter, targetValue, duration){
    if(document.querySelector(counter) == null) return;

    const targetCounter = document.querySelector(counter)

    let startValue = parseInt(targetCounter.innerText === '' ? 0 : targetCounter.innerText);
    let increment = (targetValue - startValue) / duration;

    // Update counter
    let startTimestamp;
    
    function updateCounter(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      let elapsedTime = timestamp - startTimestamp;

      if (elapsedTime < duration) {
        let newValue = Math.round(startValue + increment * elapsedTime);

        targetCounter.textContent = newValue.toLocaleString(); // Use toLocaleString to add commas
        requestAnimationFrame(updateCounter);
      } else {
        // Set the final value as the targetValue
        targetCounter.textContent = targetValue.toLocaleString();
      }
    }

    // Start the animation
    requestAnimationFrame(updateCounter);
  },
  // 프로필 설정 : 인풋 포커스, 인풋 값 삭제
  inputBorderEvent: function(){
    let targetInp = document.querySelectorAll('.inp_box_list > li input');
    targetInp.forEach((input)=>{
      input.addEventListener("focus", (e) => {
        let parent = e.target.closest('li');
        parent.classList.add('active');
      });
  
      input.addEventListener("blur", (e) => {
        let parent = e.target.closest('li');
        parent.classList.remove('active');
      });
    });
  
    let targetBtn = document.querySelectorAll('.inp_box_list > li button');
    targetBtn.forEach((btn)=>{
      btn.addEventListener("click", (e) => {
        let input = e.target.closest('li').querySelector('input');
        input.value = '';
      });
    });
  },
  marqueeEvent(selector, speed) {
    const parentSelector = document.querySelector(selector);
    const clone = parentSelector.innerHTML;
    const firstElement = parentSelector.children[0];
    let i = 0;

    parentSelector.insertAdjacentHTML('beforeend', clone);
    parentSelector.insertAdjacentHTML('beforeend', clone);
  
    setInterval(function () {
      firstElement.style.marginLeft = `-${i}px`;
      if (i > firstElement.clientWidth) {
        i = 0;
      }
      i = i + speed;
    }, 0);
  },
  downloadAnimation: function(){
    if(document.querySelector('.download_ani') == null) return;

    let downloadAni = document.querySelector('.download_ani');
    let lottiePlayer = downloadAni.querySelector('lottie-player');

    downloadAni.classList.add('active');
    lottiePlayer.play();

    lottiePlayer.addEventListener("complete", () => {
      //console.log('complete');
      downloadAni.classList.remove('active');
      lottiePlayer.stop();
    });
  },





  // 헤더 스크롤 이벤트(아직 결정된 사항 아님)
  scrollDeformation: function(){
    if(document.querySelector('#wrap') == null) return;

    const condition = document.querySelector('#wrap').classList.contains('scroll_deformation');
    const titleEl = document.querySelector('#header > .title_wrap h1');
    var matrixArr = [-36, 50, 2];

    if(!condition) return

    // init
    initStyle(matrixArr);
    document.addEventListener('scroll', handleScroll);

    // 스크롤 중간에서 새로고침 할 경우 대비
    function initStyle(arr){
      const scrollTop = document.documentElement.scrollTop;

      if(scrollTop == 0 ){
        titleEl.style.transform = `translate(${arr[0]}px, ${arr[1]}px) scale(${arr[2]})`;
      } else {
        titleEl.style.transform = 'translate(0, 0) scale(1)';
      }
    }

    function handleScroll(){
      const scrollTop = document.documentElement.scrollTop;
      applyTransform(scrollTop);
    }

    function applyTransform(scrollTop){
      if(scrollTop >= 50){
        scrollTop = 50;
      } else if(scrollTop <= 0){
        scrollTop = 0;
      }

      const calArr = matrixArr.map((el) => el / matrixArr[1]);
      const transformed = matrixArr.map((el, i) => {
        return i === matrixArr.length - 1
          ? el - (calArr[i] * scrollTop) / 2
          : el - calArr[i] * scrollTop;
      });

      titleEl.style.transform = `translate(${transformed[0]}px, ${transformed[1]}px) scale(${transformed[2]})`;
    }
  },
  // 디자인 셀렉트(아직 결정된 사항 아님)
  designSelect: function(){
    let selectBox = document.querySelectorAll('.design_select');

    selectBox.forEach((select) => {
      // 선택된 옵션
      let selected = select.querySelector(':scope > .selected');
      // 선택한 옵션 타이틀
      let selectTitle = selected.querySelector(':scope span');
      // 옵션 리스트
      let optionList = select.querySelectorAll(':scope > .optionList > li');

      // 선택한 셀렉트 열기
      selected.addEventListener('click', () => {
        selectBox.forEach(function (e) {
          e != select ? e.classList.remove('active') : e.classList.toggle('active');
        });
      });

      // 선택한 옵션 활성화
      optionList.forEach((option) => {
        option.addEventListener('click', (e) => {
          optionList.forEach(function (current) {
            current != option ? current.classList.remove('select') : current.classList.add('select');
          });
          // 해당 셀렉트 닫기
          select.classList.remove('active');
          // 선택한 옵션 타이틀 변경 : p 태그를 변경하니 오작동 할 때가 있어서 span 추가
          selectTitle.innerText = e.target.innerText;
        });
      });

      // 셀렉트 모두 닫기
      document.querySelector('html').addEventListener('click', (e) => {
        if (!e.target.closest('.design_select')) {
          selectBox.forEach((select) => {
            select.classList.remove('active');
          });
        }
      });
    });
  },
  // 클릭한 대상에 class 추가 이벤트(사용된 부분이 없음)
  siblingsToggleClass: function(targetSelector, childrenSelector, initialIndex, className){
    const targetElements = document.querySelectorAll(targetSelector);

    targetElements.forEach((targetElement) => {
      const childrenElements = targetElement.querySelectorAll(childrenSelector);

      childrenElements.forEach((childElement, index) => {
        const isActive = index === initialIndex;

        // Initialize classes based on the initial index
        toggleClass(childElement, className, isActive);

        childElement.addEventListener('click', (e) => {
          e.preventDefault();
          
          // remove
          childrenElements.forEach((otherElement) => {
            toggleClass(otherElement, className, false);
          });

          // Add
          toggleClass(e.currentTarget, className, true);
        });
      });
    });

    function toggleClass(element, className, isActive) {
      isActive ? element.classList.add(className) : element.classList.remove(className);
    }
  },
  // class toggle 이벤트(사용된 부분이 없음)
  toggleClass: function(target, className, parent) {
    parent === undefined ? target.classList.toggle(className) : target.closest(parent).classList.toggle(className);
  },
  // 모바일 체크(사용된 부분이 없음)
  isMobile: function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },
  // circleProgress(사용된 부분이 없음)
  circleProgress: function(controlId, barSelector, valueSelector) {
    var control				= document.getElementById(controlId);
    var bar						= document.querySelector(barSelector);
    var value					= document.querySelector(valueSelector);
    var RADIUS				= bar.attributes.r.value;
    var CIRCUMFERENCE = 2 * Math.PI * RADIUS; // 339.29200658769764			

    function progress(per) {
      var progress = per / 100;
      var dashoffset = CIRCUMFERENCE * (1 - progress);

      value.innerHTML = per + '%';
      bar.style.strokeDashoffset = dashoffset;
    }

    control.addEventListener('input', function(event) {
      progress(event.target.valueAsNumber);
    });

    control.addEventListener('change', function(event) {
      progress(event.target.valueAsNumber);
    });

    bar.style.strokeDasharray = CIRCUMFERENCE;
    progress(control.value);
  },
}

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

    // 바로 실행하면 오류 발생
    window.addEventListener("DOMContentLoaded", () => {
      setTabInit();

      // init
      setTimeout(() => {
        setActiveTab(weeklyLi, day);
        switchTab(day);
      }, 500);
    });
    
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
          mainVisualSwipe.autoplay.start();
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
  
      mainVisualSwipe = new Swiper('.main_swipe_menu .visual_swiper', {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        roundLengths: true,		// 이미지가 흐리게 나옴 방지
        loop: true
      });
      const mainTextSwipe = new Swiper('.main_swipe_menu .text_swiper', {
        effect: "fade",
        speed: 200,
        loop: true
      });
  
      let currentIndex = 0;
  
      mainVisualSwipe.on('slideChange', function () {
        currentIndex = this.realIndex;
        mainTextSwipe.slideTo(currentIndex);
      });

      mainVisualSwipe.autoplay.stop();
    }
    
    // 메인 스크롤 이벤트 초기화
    function resetMainScrollEvent(){
      attendance.classList.remove('active');

      // 메인 스와이퍼 리셋
      mainSwipe.classList.remove('active');
      mainSwipe.style.height = 0;
      mainVisualSwipe.autoplay.stop();

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

// 챌린지
let challenge = {
  init: function(){
    this.challengeNotice();
    this.challengeScrollEvent();
    this.challengeCategoryListEvent();
    this.challengeRewardEvent();
    this.challengeReportAni();
  },
  // 챌린지 안내
  challengeNotice: function(){
    if(document.querySelector('.challenge_notice > .inner') == null) return;

    common.marqueeEvent('.challenge_notice > .inner', 0.2);

    const notice = document.querySelector('.challenge_notice');
    const btnClose = notice.querySelector(':scope > button');

    // 클릭으로 닫기
    btnClose.addEventListener('click', ()=>{
      notice.classList.add('hide');
    });
  },
  // 챌린지 : 목록 - 카테고리 이벤트
  challengeCategoryListEvent: function(){
    if(document.querySelector('.challenge_category') == null) return;

    const challengeCategory = document.querySelector('.challenge_category');
    const categoryInner = challengeCategory.querySelector('.inner');
    const categoryUl = categoryInner.querySelector('ul');
    const categoryEl = categoryUl.querySelectorAll('li');
    const toggleBtn = challengeCategory.querySelector('button');
    const spreadList = challengeCategory.querySelectorAll('.spread_list li');

    const challengeList = document.querySelector('.challenge_list');
    const btnMarking = challengeList.querySelectorAll(':scope > ul > li > button');
    const btnViewType = challengeList.querySelector('.view_type button');

    window.addEventListener("DOMContentLoaded", () => {setTabInit()});

    // init
    setActiveTab(categoryEl, 0);
    setActiveTab(spreadList, 0);
    
    // inner 리스트 클릭 이벤트
    categoryEl.forEach((tabTitle, currentIndex) => {
      tabTitle.addEventListener('click', (e) => {
        e.preventDefault();

        let condition = challengeCategory.classList.contains('active');

        if(!condition){
          setActiveTab(categoryEl, currentIndex);
          // setActiveTab(spreadList, currentIndex);
          switchTab(currentIndex);
        } 
      });
    });

    // spread 리스트 클릭 이벤트
    spreadList.forEach((tabTitle, currentIndex) => {
      tabTitle.addEventListener('click', (e) => {
        e.preventDefault();

        let condition = challengeCategory.classList.contains('active');

        if(condition){
          // setActiveTab(categoryEl, currentIndex);
          setActiveTab(spreadList, currentIndex);
        }
      });
    });

    // 토글 버튼 이벤트
    toggleBtn.addEventListener('click', ()=>{challengeCategory.classList.toggle('active')});
    btnViewType.addEventListener('click', ()=>{challengeList.classList.toggle('active')});

    btnMarking.forEach((btn)=>{
      btn.addEventListener('click', ()=>{btn.classList.toggle('active')});
    });

    // 탭 전체 width 설정
    function setTabInit(){
      let tabWidth = 0;
      let gap = 4;
      
      categoryEl.forEach((el, index)=>{
        if(index == 0 ){
          tabWidth += (el.offsetWidth);
        } else {
          tabWidth += (el.offsetWidth + gap);
        }
      });
      categoryUl.style.width = tabWidth+'px';
    }

    // 클릭한 대상에 active
    function setActiveTab(titles, index) {
      titles.forEach((title, i) => {
        title.classList.toggle('active', i === index);
      });
    }

    // 클릭한 대상으로 scroll 이동 이벤트
    function switchTab(n){
      let posCenter = window.outerWidth / 2;
      let pos = 0;
      let posLimit = categoryUl.offsetWidth - categoryInner.offsetWidth + 20; // 20은 왼쪽 padding-left: 20 때문

      if (categoryEl[n].offsetLeft + categoryEl[n].offsetWidth / 2 <= posCenter) {
        pos = 0;
      } else {
        pos = (categoryEl[n].offsetLeft + categoryEl[n].offsetWidth / 2) - posCenter;
        if (pos > posLimit) {
          pos = posLimit
        }
      }

      // console.log(pos);
      categoryInner.scrollLeft = pos;
      // categoryUl.style.transform = `translateX(${pos}px)`;
    }
  },
  // 챌린지 : 상세 - 스크롤 이벤트
  challengeScrollEvent: function(){
    if(document.querySelector('.challenge_detail_wrap') == null) return;

    const challengeInfo = document.querySelector('.challenge_info');
    const challengeProgress = challengeInfo.querySelector(':scope > .progress_wrap');

    window.addEventListener('scroll', () => {
      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
      let calcPos = challengeInfo.offsetTop - currentScrollPos;
      let calcPos2 = document.querySelector('.challenge_content_wrap').offsetTop - currentScrollPos;

      if(calcPos < 116){
        // 재실행 방지
        if(challengeInfo.classList.contains('active')) return;
        challengeInfo.classList.add('active');

        setTimeout(() => {
          challengeAni(30);
          common.animateCounter('.challenge_info > .progress_wrap .info > div strong', 30, 600);
        }, 300);
      }
    });
    // 걷기 그래프 애니메이션
    function challengeAni(current){
      challengeProgress.querySelector(':scope .graph .inner span').style.left = current+'%';
    }
  },
  // 챌린지 : 상세 - 진행중 걸음 기록
  challengeReportAni: function(){
    if(document.querySelector('.challenge_report') == null) return;

    const challengeReport = document.querySelector('.challenge_report');
    const reportGraph = challengeReport.querySelector(':scope .graph_wrap');

    // 재실행 방지
    if(challengeReport.classList.contains('active')) return;
    challengeReport.classList.add('active');

    ongoingAni(30, 100);
    common.animateCounter('.challenge_report .graph_cont > h3 span', 1000, 600);

    // 챌린지 진행중 걸음수 애니메이션
    function ongoingAni(today, yesterday){
      const todayGraph = reportGraph.querySelector('.walking1');
      const yesterdayGraph = reportGraph.querySelector('.walking2');

      if(today == 100) {
        todayGraph.classList.add('align_right');
      }
      if(yesterday == 100) {
        yesterdayGraph.classList.add('align_right');
      }

      todayGraph.style.left = today+'%';
      yesterdayGraph.style.left = yesterday+'%';
    }
  },
  // 챌린지 : 상세 - 리워드 버튼 이벤트(버튼 클릭 시 스크롤 이동)
  challengeRewardEvent: function () {
    if(document.querySelector('.challenge_detail_wrap .challenge_reward') == null) return

    const challengeReward = document.querySelector('.challenge_detail_wrap .challenge_reward');
    const rewardToggleCont = challengeReward.querySelector(':scope > .toggle_cont');

    const rewardUl = challengeReward.querySelector(':scope > ul');
    const rewardLi = rewardUl.querySelectorAll(':scope > li');
    const rewardBtn = challengeReward.querySelector(':scope > button');
    const pickChallenge = document.querySelector('.challenge_detail_wrap .pick_challenge');
    let rewardListHeight = calcListHeight();
  
    // 초기 상태 설정
    setListHeight(rewardBtn, rewardListHeight);
    btnDownload();

    // 리워드 리스트 높이값 계산
    function calcListHeight() {
      let rewardLi = rewardUl.querySelectorAll(':scope > li');
      let parentHeight = 0;
      let childrenHeight = rewardLi[0].offsetHeight;
      let gap = 12;
  
      rewardLi.forEach((li, index) => {
        let value = index > 0 ? li.offsetHeight + gap : li.offsetHeight;
        parentHeight += value;
      });

      let toggleEl = rewardToggleCont.querySelectorAll(':scope > div');
      let toggleHeight = 0;
      let gap2 = 16; // 패딩 값 16 포함
  
      toggleEl.forEach((div, index) => {
        let value = index > 0 ? div.offsetHeight + gap2 : div.offsetHeight;
        toggleHeight += value;
      });
  
      return { parentHeight, childrenHeight, toggleHeight };
    }

    // 리워드 접기/펴기 클릭 이벤트 + 스크롤 이동
    rewardBtn.addEventListener('click', (e) => {
      rewardListHeight = calcListHeight();

      common.scrollToEvent('html', challengeReward);
      setListHeight(e.target.closest('button'), rewardListHeight);
    });
  
    // 리워드 접기/펴기 버튼에 class toggle, ul 높이 값 변경
    function setListHeight(target, heights){
      let condition = target.classList.contains('active');
      let value = [0,0];
  
      if (condition) {
        target.classList.remove('active');
        value[0] = heights.parentHeight;
        value[1] = heights.toggleHeight;
      } else {
        target.classList.add('active');
        value[0] = heights.childrenHeight;
        value[1] = 0;
      }
      rewardToggleCont.style.height = value[1] + 'px';
      rewardUl.style.height = value[0] + 'px';
    }
    // 리사이즈 이벤트
    // window.addEventListener('resize', () => {
    //   rewardListHeight = calcListHeight();
    //   setListHeight(rewardBtn, rewardListHeight);
    // });

    // 리워드 받기 버튼 클릭 변화 이벤트
    function btnDownload(){
      rewardLi.forEach((btn)=>{
        const targetBtn = btn.querySelector('button');

        if (targetBtn) {
          targetBtn.addEventListener('click', () => {
            // 버튼 연타 방지
            let downloadAni = document.querySelector('.download_ani');
            if(downloadAni != null && downloadAni.classList.contains('active')) return

            if(!targetBtn.classList.contains('complete')){
              targetBtn.classList.add('complete');
              targetBtn.disabled = true;


              common.downloadAnimation();
            }
          });
        }
      });
    }

    // 자세히 보기 버튼 이벤트
    pickChallenge.querySelector(':scope > button').addEventListener('click', ()=>{
      pickChallenge.classList.add('active');
      common.scrollToEvent('html', pickChallenge, 0);
    });
  },






  // 챌린지 : 상세 - 진행중 상태 일때 실행되어야함(fixed 메뉴 가변 높이 값 적용)
  // 일단 사용하지 않음 10/31
  challengeLayoutHeight: function(){
    if(document.querySelector('.challenge_layout.ongoing') == null) return;

    const target = document.querySelector('.challenge_layout.ongoing');
    const challengeDetailWrap = target.querySelector('.challenge_detail_wrap');
    const inner = challengeDetailWrap.querySelector(':scope > .inner');
    const record = inner.querySelector(':scope > .challenge_record');

    // init
    setValue();

    // 높이값 계산
    function setValue() {
      let height = record.offsetHeight;
      let gap = 50;
      document.querySelector('#container').style.paddingTop = height+gap+'px';
    }
    // 리사이즈 이벤트
    window.addEventListener('resize', () => {setValue()});
  },
  // 챌린지 : 상세 - 프로스레스 바(결정된 내용이 아니라 보류 완성된 소스 아님)
  challengeProgressBar: function(target, number){
    const progressBox = document.querySelectorAll('.challenge_record > .inner .progress_box');
    
    progressBox.forEach((progress)=>{
      let target = progress.querySelector(':scope > div');
      console.log(target.offsetWidth, number);
    });
  },
}

// 걸음리포트
let walkingReport = {
  anchorEvent: function(){
    if(document.querySelector('.walking_report') == null) return;

    const report = document.querySelector('.walking_report');
    const anchorList = report.querySelectorAll(':scope > .anchor_list > li');
    const anchorContents = report.querySelectorAll(':scope > .contents > div');

    // 차트 옵션 로드
    let ctx = document.getElementById('myChart');

    const annotation = {
      type: 'line',
      borderColor: 'black',
      borderDash: [3, 3],
      borderDashOffset: 0,
      borderWidth: 1,
      label: {
        enabled: true,
        content: (ctx) => 'Average: ' + average(ctx).toFixed(2),
        position: 'end'
      },
      scaleID: 'y',
      value: (ctx) => average(ctx)
    };

    let config = {
      type: 'bar',
      data: {
        labels: ["월", "화", "수", "목", "금", "토", "일"],
        datasets: [{
          // data: [9873, 6256, 6256, 2123, 4256, 4256, 6500],
          data: [],
          backgroundColor: ['#BDB4FE', '#BDB4FE', '#BDB4FE', '#BDB4FE', '#BDB4FE', '#BDB4FE', '#B5FA95'],
          borderRadius: 8,
          borderSkipped: false
        }],
      },
      options: {
        layout: {
          padding: {top: 30}
        },
        plugins: {
          legend: {display: false},
          datalabels: {
            color: '#4E2AF4',
            anchor: 'end',
            align: 'top',
          },
          annotation: {
            annotations: {
              annotation
            }
          }
        },
        scales: {
          x: {
            grid: {
              drawBorder: false,
              drawOnChartArea: false,
              display: false,
            },
          },
          y: {
            grid: {
              drawBorder: false,
              drawOnChartArea: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              display: false
            },
          },
        },
        responsive: true,
      }
    };
    Chart.register(ChartDataLabels);
    ctx.height = 300;
    let myChart = new Chart(ctx, config);

    function average(ctx) {
      const values = ctx.chart.data.datasets[0].data;
      return values.reduce((a, b) => a + b, 0) / values.length;
    }

    // 앵커 클릭 이벤트
    anchorList.forEach((anchor)=>{
      anchor.addEventListener('click', (e)=>{
        e.preventDefault();

        let target = document.querySelector(e.target.getAttribute("href"));
        let scrollTop = target.offsetTop - 76;

        document.documentElement.scrollTop = scrollTop;
      });
    });

    // 초기 세팅
    init();

    // 스크롤에 맺춰서 앵커 clsss 변경 이벤트
    window.addEventListener('scroll', () => {
      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
      // 상태 스크롤 감지
      detectScroll(currentScrollPos);
    });

    // 초기 세팅
    function init(){
      detectScroll(document.documentElement.scrollTop);
      common.animateCounter('.graph_cont1 > h3 span', 6500, 600);
    }
    // 대상이 정해진 위치에 있는지 감지
    function detectScroll(scrollTop){
      let graphArr = report.querySelectorAll(':scope .contents .content');

      graphArr.forEach((el, index)=>{
        let calcPos = el.offsetTop - window.outerHeight/2;
    
        if(scrollTop > calcPos){
          if(index == 0){
            todayAni(30, 60);
          } else if(index == 1){
            rankAni(6500, 4200);
          } else if(index == 2){
            chartUpdate();
          } else {
            monthReport();
          }
        }
      });

      anchorContents.forEach((content, index)=>{
        let calcScroll = content.offsetTop - 76;
        let calcHeight = calcScroll + content.offsetHeight

        if(scrollTop >= calcScroll && scrollTop <= calcHeight){
          anchorList.forEach((anchor, i) => {
            anchor.classList.toggle('active', i === index);
          });
        }
      });
    }
    // 어제, 오늘 걸음수 애니메이션
    function todayAni(today, yesterday){
      const todayGraph = document.querySelector('.graph_cont1 .walking1');
      const yesterdayGraph = document.querySelector('.graph_cont1 .walking2')

      todayGraph.style.left = today+'%';
      yesterdayGraph.style.left = yesterday+'%';
    }
    // 상위 분포도 애니메이션(걸음 수 비교로 class 분기)
    function rankAni(me, average){
      const meGraph = document.querySelector('.graph_cont2 .graph_wrap .graph');
      let condition = ''; 

      if(me < average){
        condition = 'less';
      } else if(me > average){
        condition = 'more';
      } else {
        condition = 'equal';
      }

      meGraph.classList.add(condition , 'animate');
    }
    // 차트에 데이터 추가
    function chartUpdate(){
      myChart.data.datasets[0].data = [9873, 6256, 6256, 2123, 4256, 4256, 6500];
      myChart.update();
    }
    // 걸음 기록
    function monthReport(){
      let days = document.querySelectorAll('#reportMonth .calendar td span:not(:empty)');
      let walkingDataArr = [
        11000,5500,5500,5500,12000,
        3100,5500,3500,3500,3500,
        11000,5500,5400,5300,12000,
        3100,5100,3500,5500,5500,
        3500,3500,3500,3500,3500,
        3500,3500,3500,3500,3500
      ];

      days.forEach((day, index)=>{
        const walkingData = walkingDataArr[index];

        if (walkingData > 2000 && walkingData < 5000) {
          day.classList.add('walking_3');
        } else if (walkingData > 5000 && walkingData < 10000) {
          day.classList.add('walking_5');
        } else if (walkingData > 10000) {
          day.classList.add('walking_10');
        }
      });
    }
  },
}

document.addEventListener("DOMContentLoaded", function() {
	common.layerButtonToggle();
	common.toastButtonToggle();
	common.designSelect();
	common.scrollDeformation();
	common.tabMenuEvent();
	common.inputBorderEvent();
	
	main.init();
	challenge.init();
	walkingReport.anchorEvent();
});




//common.challengeProgressBar(50);
// common.toggleSlide('.challenge_crew', '.btn');





// album_swiper
const thumbImgWrap = new Swiper('.album_swiper', {
  slidesPerView: 3,
  spaceBetween: 20,
  roundLengths: true,		// 이미지가 흐리게 나옴 방지
  loop: true,

});
// scale_swiper
const swiperTest = new Swiper('.scale_swiper', {
  slidesPerView: 3,
  centeredSlides: true,
  roundLengths: true,		// 이미지가 흐리게 나옴 방지
  loop: true,
  // pagination: {
  // 	el: ".swiper-pagination",
  // 	type: "progressbar",
  // },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // scrollbar: {
  // 	el: '.swiper-scrollbar',
  // },
  breakpoints: {
    320: {
      slidesPerView: 1.5
    },
  }
});