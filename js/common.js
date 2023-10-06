let common = {
  init: function () {
    this.layerButtonToggle();
    this.inputBorderStyle();
    //this.designSelect();
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
  layerToggle: function(target){
    let layerPopup = document.querySelector(target);
    let condition = layerPopup.classList.contains('active');

    if (condition) {
      //console.log('close');

      document.querySelector('body').classList.remove('active');
      
      layerPopup.classList.remove('active');
      layerPopup.classList.add('close');
    } else {
      //console.log('open');
      document.querySelector('body').classList.add('active');

      layerPopup.classList.add('active');
      layerPopup.classList.remove('close');
    }

    // 팝업 닫기
    let layerClose = layerPopup.querySelector(':scope > .layer_content_wrap > .layer_close');
    document.querySelector('html').addEventListener('click', (e) => {
      if (e.target.classList.contains('active') || e.target == layerClose) {
        this.layerToggle(target);
      }
    });
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
}
common.init();







// swiper
const swiper = new Swiper('.swiper', {
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

// circleProgress
function circleProgress(controlId, barSelector, valueSelector) {
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
}
circleProgress('control', '.bar', '.value');

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
bottomSheetModal(".show-modal", ".bottom-sheet");


















// bottomSheetModal
function bottomSheetModal2(targetSelector) {
  const bottomSheet = document.querySelector(targetSelector);
  if (!bottomSheet) {
    console.error(`Element with selector '${targetSelector}' not found.`);
    return;
  }


  const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
  const sheetContent = bottomSheet.querySelector(".content");
  const dragIcon = bottomSheet.querySelector(".drag-icon");

  let isDragging = false,
    startY,
    startHeight;

  const updateSheetHeight = (height) => {
    sheetContent.style.height = `${height}%`;
    bottomSheet.classList.toggle("fullscreen", height === 100);
  }

  const showBottomSheet = () => {
    bottomSheet.classList.add("show");
    document.body.style.overflowY = "hidden";
    updateSheetHeight(50);
  }
  showBottomSheet();

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
  // You can add a custom trigger event listener if needed.
  // For example: showModalBtn.addEventListener("click", showBottomSheet);
}
// Example usage:
//bottomSheetModal2(".bottom-sheet");