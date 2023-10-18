let common = {
  init: function () {
    this.layerButtonToggle();
    this.toastButtonToggle();
    this.inputBorderStyle();
    this.initTabMenus();

    // document.addEventListener('scroll', (e) => {
    //   if(this.isScrollNearBottom()){
    //     console.log('end');
    //   }
    // });

    // if(document.querySelector('#container')){
    //   document.querySelector('#container').addEventListener('scroll', (e) => {
    //     if(this.isScrollNearBottom(e.target)){
    //       console.log('end');
    //     }
    //   });
    // }
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
    console.log(target);
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
      layerPopup.classList.toggle("fullscreen", height === 100);
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
        tabTitle.addEventListener('click', () => {
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
  // 스크롤 엔드 감지
  isScrollNearBottom: function(target = document, buffer = 100) {
    const scrollY         = target === document ? window.scrollY || window.pageYOffset : target.scrollTop;
    const viewportHeight  = target === document ? window.innerHeight : target.clientHeight;
    const contentHeight   = target === document ? document.documentElement.scrollHeight : target.scrollHeight;
    return contentHeight - (scrollY + viewportHeight) < buffer;
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
}

common.init();



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
// bottomSheetModal
function bottomSheetModal(showModalBtnSelector, bottomSheetSelector) {
  const showModalBtn = document.querySelector(showModalBtnSelector);
  const bottomSheet = document.querySelector(bottomSheetSelector);
  const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
  const sheetContent = bottomSheet.querySelector(".content");
  const dragIcon = bottomSheet.querySelector(".drag-icon");

  let isDragging = false,
    startY,
    startHeight;

  const showBottomSheet = () => {
    bottomSheet.classList.add("show");
    document.body.style.overflowY = "hidden";
    updateSheetHeight(50);
  }

  const updateSheetHeight = (height) => {
    sheetContent.style.height = `${height}%`;
    bottomSheet.classList.toggle("fullscreen", height === 100);
  }

  const hideBottomSheet = () => {
    bottomSheet.classList.remove("show");
    document.body.style.overflowY = "auto";
  }

  const dragStart = (e) => {
    isDragging = true;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);
    bottomSheet.classList.add("dragging");
  }

  const dragging = (e) => {
    if (!isDragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    const newHeight = startHeight + delta / window.innerHeight * 100;
    updateSheetHeight(newHeight);
  }

  const dragStop = () => {
    isDragging = false;
    bottomSheet.classList.remove("dragging");
    const sheetHeight = parseInt(sheetContent.style.height);
    sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
  }

  dragIcon.addEventListener("mousedown", dragStart);
  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);

  dragIcon.addEventListener("touchstart", dragStart);
  document.addEventListener("touchmove", dragging);
  document.addEventListener("touchend", dragStop);

  sheetOverlay.addEventListener("click", hideBottomSheet);
  showModalBtn.addEventListener("click", showBottomSheet);
}
// bottomSheetModal(".show-modal", ".bottom-sheet");