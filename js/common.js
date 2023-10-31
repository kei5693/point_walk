let common = {
  init: function () {
    this.layerButtonToggle();
    this.toastButtonToggle();
    this.inputBorderStyle();
    this.initTabMenus();
    this.scrollDeformation();
    this.categoryListEvent();
    this.designSelect();
    this.challengeRewardEvent();
    // this.challengeLayoutHeight();
  },
  // 버튼으로 팝업 열기
  layerButtonToggle: function(){
    let btnArr = document.querySelectorAll('.layer_button_toggle');
    btnArr.forEach((btn)=>{
      btn.addEventListener('click', ()=>{
				this.layerToggle(btn.dataset.popupName);
			});
    });
  },
  // 팝업 열기
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
  // 버튼으로 토스트 팝업 열기
  toastButtonToggle: function(){
    let btnArr = document.querySelectorAll('.toast_button_toggle');
    btnArr.forEach((btn)=>{
      btn.addEventListener('click', ()=>{
				this.toastPopupToggle(btn.dataset.popupName);
			});
    });
  },
  // 토스트 팝업 열기
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
  // 프로필 설정 인풋 포커스, 인풋 값 삭제
  inputBorderStyle: function(){
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
  // 탭메뉴 이벤트
  initTabMenus: function(initIndex){
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
  // 스크롤 엔드 감지 함수 사용(대상은 1개만 있을 경우로 작성 되었다)
  scrollEnd: function(target = document, buffer = 100){
    const targetEl = target === document ? document : document.querySelector(target);

    targetEl.addEventListener('scroll', (e) => {
      if(this.isScrollNearBottom(e.target, buffer)){
        console.log('end');
      }
    });
  },
  // 스크롤 엔드 감지 함수
  isScrollNearBottom: function(target = document, buffer = 100) {
    const scrollY         = target === document ? window.scrollY || window.pageYOffset : target.scrollTop;
    const viewportHeight  = target === document ? window.innerHeight : target.clientHeight;
    const contentHeight   = target === document ? document.documentElement.scrollHeight : target.scrollHeight;
    return contentHeight - (scrollY + viewportHeight) < buffer
  },
  // 헤더 스크롤 이벤트
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
  // 스크롤 방향 감지
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
  },
  // 디자인 셀렉트
  designSelect: function(){
    let selectBox = document.querySelectorAll('.designSelect');

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
        if (!e.target.closest('.designSelect')) {
          selectBox.forEach((select) => {
            select.classList.remove('active');
          });
        }
      });
    });
  },
  // class toggle event bind
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
  // class toggle
  toggleClass: function(target, className, parent) {
    parent === undefined ? target.classList.toggle(className) : target.closest(parent).classList.toggle(className);
  },
  // 모바일 체크
  isMobile: function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },
  // circleProgress
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
  // 챌린지 - 목록 - 카테고리 이벤트
  categoryListEvent: function(){
    if(document.querySelector('.challenge_category') == null) return;

    const challengeCategory = document.querySelector('.challenge_category');
    const categoryInner = challengeCategory.querySelector('.inner');
    const categoryUl = categoryInner.querySelector('ul');
    const categoryEl = categoryUl.querySelectorAll('li');
    const toggleBtn = challengeCategory.querySelector('button');
    const spreadList = challengeCategory.querySelectorAll('.spread_list li');

    const challengeList = document.querySelector('.challenge_list');
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

    // 탭 전체 width 설정
    function setTabInit(){
      let tabWidth = 0;
      let gap = 10;
      
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
      let posLimit = categoryUl.offsetWidth - categoryInner.offsetWidth;

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
  // 챌린지 - 상세 - 리워드 버튼 이벤트
  challengeRewardEvent: function () {
    if(document.querySelector('.challenge_detail_wrap .challenge_reward') == null) return
    const challengeReward = document.querySelector('.challenge_detail_wrap .challenge_reward');
    const rewardUl = challengeReward.querySelector(':scope > ul');
    const rewardLi = rewardUl.querySelectorAll(':scope > li');
    const rewardBtn = challengeReward.querySelector(':scope > button');
    let heights = calcHeight();
  
    // 초기 상태 설정
    initHeight(rewardBtn, heights);

    // 높이값 계산
    function calcHeight() {
      let parentHeight = 0;
      let childrenHeight = rewardLi[0].offsetHeight;
      let gap = 10;
  
      rewardLi.forEach((li, index) => {
        let value = index > 0 ? li.offsetHeight + gap : li.offsetHeight;
        parentHeight += value;
      });
  
      return { parentHeight, childrenHeight };
    }

    // 클릭 이벤트 + 스크롤 이동
    rewardBtn.addEventListener('click', (e) => {
      initHeight(e.target.closest('button'), heights);

      // 진행전, 진행중 레이아웃이 달라서 스크롤 대상도 다름
      // 진행중
      if(e.target.closest('.ongoing')){
        common.scrollToEvent('.challenge_content_wrap', challengeReward, 10);
      } else {
        // 진행전
        common.scrollToEvent('#container', challengeReward);
      }
    });
  
    // 버튼에 class toggle, ul 높이 값 변경
    function initHeight(target, heights) {
      let condition = target.classList.contains('active');
      let value = 0;
  
      if (condition) {
        target.classList.remove('active');
        value = heights.parentHeight;
      } else {
        target.classList.add('active');
        value = heights.childrenHeight;
      }
      
      rewardUl.style.height = value + 'px';
    }

    // 리사이즈 이벤트
    window.addEventListener('resize', () => {
      heights = calcHeight();
      resizeHeight(heights);
    });

    // 리사이즈 대응
    function resizeHeight(heights) {
      let condition = rewardBtn.classList.contains('active');

      if (condition) {
        rewardUl.style.height = heights.childrenHeight + 'px';
      } else {
        rewardUl.style.height = heights.parentHeight + 'px';
      }
    }
  },
  // 챌린지 상세 - 진행중 상태 일때 실행되어야함(fixed 메뉴 가변 높이 값 적용)
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
  // 챌린지 상세 - 프로스래스 바(결정된 내용이 아니라 보류 완성된 소스 아님)
  challengeProgressBar: function(target, number){
    const progressBox = document.querySelectorAll('.challenge_record > .inner .progress_box');
    
    progressBox.forEach((progress)=>{
      let target = progress.querySelector(':scope > div');
      console.log(target.offsetWidth, number);
    });
  },
  toggleSlide: function(parent, trigger){
    const triggerEl =  document.querySelectorAll(trigger);

    triggerEl.forEach((trigger)=>{
      trigger.addEventListener('click', ()=>{
        const parentEl = trigger.closest(parent);
        parentEl.classList.toggle('active');
        
      });
    });
    
  },
  // 챌린지 상세 - 리워드 열기 버튼 시 스크롤 이동
  scrollToEvent: function(target, interval, gap = 50){
    let scrollTarget = document.querySelector(target);
    let scrollValue = interval.offsetTop - scrollTarget.offsetTop - gap;

    scrollTarget.scrollTop = scrollValue;
  },
}

common.init();
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