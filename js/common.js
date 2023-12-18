$(function(){
  // 공통 - 팝업 : 버튼으로 팝업 열기
  let layerButtonToggle = $('.layer_button_toggle');
  
  layerButtonToggle.on('click', (e)=>{
    layerToggle($(e.target).data('popupName'));
  });

  // 공통 - 팝업 토글
  function layerToggle(target, sheetHeight = 100){
    const layerPopup        = $(target);

    // 방어
    if (layerPopup.length == 0) return console.error(`Element with selector '${target}' not found.`);

    // dimmed
    const dimmedLayer       = layerPopup.children('.dimmed_layer');

    // 팝업 컨텐츠 영역
    const layerContentWrap  = layerPopup.children('.layer_content_wrap');

    // 닫기 버튼
    const layerClose        = layerContentWrap.find('> .layer_close');
    // 드래그
    const layerDrag         = layerContentWrap.find("> .layer_drag");

    // 드래그 상태
    let isDragging          = false;
    // 좌표
    let startY              = 0;
    // 높이
    let startHeight         = 0;
    
    // 팝업 상태
    let isOpened            = layerPopup.hasClass('active');
    // 팝업 타입
    let isCentered          = layerPopup.hasClass('align_center');

    isOpened ? hideBottomSheet() : showBottomSheet();

    // 팝업 닫기 클릭 이벤트
    document.querySelector('html').addEventListener('click', (e) => {
      if (e.target == layerClose || e.target == dimmedLayer) {
        hideBottomSheet();
      }
    });

    // 팝업 열기
    function showBottomSheet(){
      $('body').addClass('active');
      layerPopup.addClass('active');

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
      let value = height+'%';
      layerContentWrap.css('height', value);
    }

    // 드래그
    // if(layerDrag){
    //   (function dragEvent(){
    //     const dragStart = (e) => {
    //       isDragging = true;
    //       startY = e.pageY || e.touches?.[0].pageY;
    //       startHeight = parseInt(layerContentWrap.style.height);
    //       layerPopup.classList.add("dragging");
    //     }
  
    //     const dragging = (e) => {
    //       if (!isDragging) return;
    //       const delta = startY - (e.pageY || e.touches?.[0].pageY);
    //       const newHeight = startHeight + delta / window.innerHeight * 100;
    //       updateSheetHeight(newHeight);
    //     }
  
    //     const dragStop = () => {
    //       if (!isDragging) return;
          
    //       isDragging = false;
    //       layerPopup.classList.remove("dragging");
    //       const sheetHeight = parseInt(layerContentWrap.style.height);
    //       // sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
    //       sheetHeight < 50 ? hideBottomSheet() : updateSheetHeight(100);
    //     }
  

    //     layerDrag.addEventListener("mousedown", dragStart);
    //     document.addEventListener("mousemove", dragging);
    //     document.addEventListener("mouseup", dragStop);
  
    //     layerDrag.addEventListener("touchstart", dragStart);
    //     document.addEventListener("touchmove", dragging);
    //     document.addEventListener("touchend", dragStop);
    //   })();
    // }
  }



















  // 공통
  let common = {
    init(){
      this.layerButtonToggle();
      this.toastButtonToggle();
      this.designSelect();
      this.scrollDeformation();
      this.tabMenuEvent();
      this.inputBorderEvent();
      this.enterReplyEvent();
      this.headerBtnEvent();
    },
    // 공통 - 팝업 : 버튼으로 팝업 열기
    layerButtonToggle: function(){
      let btnArr = document.querySelectorAll('.layer_button_toggle');
      btnArr.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
          this.layerToggle(btn.dataset.popupName);
        });
      });
    },
    // 공통 - 팝업 토글
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
            if (!isDragging) return;
            
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
    // 팝업 열기
    layerOpen: function(target, sheetHeight = 100){
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

      isOpened ? '' : showBottomSheet();

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
    // 팝업 닫기
    layerClose: function(target){
      const layerPopup = document.querySelector(target);

      document.body.classList.remove('active');
      layerPopup.classList.remove('active');

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
      // const getDirection = common.getScrollDirection();
      // window.addEventListener('scroll', () => {
      //   const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
      //   console.log(getDirection());
      // });
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
        // const tabContents = tabMenu.querySelectorAll('.tab_content > div');
        const initialIndex = initIndex || 0;

        // init
        // setActiveTab(tabTitles, tabContents, initialIndex);
        setActiveTab(tabTitles, initialIndex);
    
        // 클릭 이벤트
        tabTitles.forEach((tabTitle, currentIndex) => {
          tabTitle.addEventListener('click', (e) => {
            // setActiveTab(tabTitles, tabContents, currentIndex);
            setActiveTab(tabTitles, currentIndex);
          });
        });
      });

      function setActiveTab(titles, index) {
        titles.forEach((title, i) => {
          title.classList.toggle('active', i === index);
        });
      
        // contents.forEach((content, i) => {
        //   content.classList.toggle('active', i === index);
        // });
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
    // 재생목록 팝업 클릭 이벤트(재생, 중지, 닫기)
    playlistPopupEvent: function(){
      if(document.querySelector('.playlist_wrap') == null) return;

      const playlistPopup = document.querySelector('.playlist_wrap');
      const playlistUnit = playlistPopup.querySelectorAll(':scope .play_list > div');
      const closePlaylistPopup = playlistPopup.querySelector(':scope .layer_content_wrap .layer_content .header > .title_wrap .btn_back');

      const playerDownloadWrap = document.querySelector('.player_download_wrap');
      // 다운로드 버튼
      const downloadWrap = playerDownloadWrap.querySelector(':scope > .download_wrap');

      // 플레이어
      const playerWrap = playerDownloadWrap.querySelector(':scope > .player_wrap');
      // 플레이어 상단 : 걷기 가이드 열고 닫기 버튼
      const btnCloseDetailLayer = playerWrap.querySelector(':scope > button');
      // 플레이어 닫기 버튼
      const btnClosePlayer = playerWrap.querySelector(':scope > .player_status button');
      // 플레이어 콘트롤 버튼(play, loop, playlist)
      const btnPlayerUnit = playerWrap.querySelectorAll(':scope > .player_controll .controll > button');

      playlistUnit.forEach((playlist)=>{
        playlist.addEventListener('click', ()=>{
          playlist.classList.contains('paused') ? playlist.classList.remove('paused') : playlist.classList.add('paused');
        });
      });

      // 재생목록 팝업 닫기
      closePlaylistPopup.addEventListener('click', ()=>{
        resetPopupBtn();
      });

      function resetPopupBtn(){
        wrap.classList.remove('player_show');
        common.layerClose('#guideDetail');
        closePlayList();
      }
      
      function closePlayList(){
        common.layerClose('#playlistPopup');
        btnPlayerUnit[3].classList.remove('active');
      }
    },
    // 다운로드, 플레이어 클릭 이벤트
    playerButtonEvent: function(){
      if(document.querySelector('.player_download_wrap') == null) return;

      const wrap = document.querySelector('#wrap');
      const playerDownloadWrap = document.querySelector('.player_download_wrap');
      // 다운로드 버튼
      const downloadWrap = playerDownloadWrap.querySelector(':scope > .download_wrap');

      // 플레이어
      const playerWrap = playerDownloadWrap.querySelector(':scope > .player_wrap');
      // 플레이어 상단 : 걷기 가이드 열고 닫기 버튼
      const btnCloseDetailLayer = playerWrap.querySelector(':scope > button');
      // 플레이어 닫기 버튼
      const btnClosePlayer = playerWrap.querySelector(':scope > .player_status button');
      // 플레이어 콘트롤 버튼(play, loop, playlist)
      const btnPlayerUnit = playerWrap.querySelectorAll(':scope > .player_controll .controll > button');

      // 
      if(downloadWrap){
        const btnDownload = downloadWrap.querySelector(':scope > button');
        btnDownload.addEventListener('click', ()=>{
          let condition = downloadWrap.classList.contains('downloading');
    
          if(condition){
            downloadWrap.classList.remove('downloading');
            wrap.classList = 'player_show';
          } else {
            downloadWrap.classList.add('downloading');
          }
        });

        // 플레이어 상단 : 걷기 가이드 열고 닫기 버튼
        btnCloseDetailLayer.addEventListener('click', ()=>{
          let condition = btnCloseDetailLayer.classList.contains('active');

          if(condition){
            btnCloseDetailLayer.classList.remove('active');
          } else {
            btnCloseDetailLayer.classList.add('active');
            closePlayList();
          }
          common.layerToggle('#guideDetail');
        });

        // 플레이어 닫기 버튼
        btnClosePlayer.addEventListener('click', ()=>{
          let condition = btnCloseDetailLayer.classList.contains('active');

          condition ? btnCloseDetailLayer.classList.remove('active') : btnCloseDetailLayer.classList.add('active');
          resetPopupBtn();
        });
      }

      // 플레이어 콘트롤 버튼 - play
      btnPlayerUnit[0].addEventListener('click', ()=>{
        btnPlayerUnit[0].classList.toggle('active');
      });

      // 플레이어 콘트롤 버튼 - loop
      btnPlayerUnit[2].addEventListener('click', ()=>{
        btnPlayerUnit[2].classList.toggle('active');
      });
      
      // 플레이어 콘트롤 버튼 - playlist
      btnPlayerUnit[3].addEventListener('click', ()=>{
        if(btnPlayerUnit[3].classList.contains('active')){
          resetPopupBtn();
        } else {
          openPlayList();
        }
      });

      
      function resetPopupBtn(){
        wrap.classList.remove('player_show');
        btnCloseDetailLayer.classList.remove('active');
        closePlayList();
      }
      
      function openPlayList(){
        btnPlayerUnit[3].classList.add('active');
        btnCloseDetailLayer.classList.remove('active');
        common.layerClose('#guideDetail');
        common.layerOpen('#playlistPopup');
      }

      function closePlayList(){
        btnPlayerUnit[3].classList.remove('active');
        common.layerClose('#playlistPopup');
        common.layerClose('#guideDetail');
      }
    },
    // 애니메이션 카운트
    animationCount: function(value = 3){
      if(document.querySelector('.animation_count') == null) return;

      const animationCountWrap = document.querySelector('.animation_count');
      const animationNumber = animationCountWrap.querySelector(':scope > p');

      startAni();

      animationNumber.addEventListener("animationend", () => {
        if(value > 1){
          value--;

          animationNumber.innerHTML = value;
          animationNumber.classList.remove('active');
          
          setTimeout(() => {animationNumber.classList.add('active')}, 10);
        } else if(animationNumber.innerHTML == 1){
          endAni();
        }
      });


      function startAni(){
        animationCountWrap.classList.add('active');
        animationNumber.classList.add('active');
        animationNumber.innerHTML = value;
      }

      function endAni(){
        animationNumber.classList.remove('active');
        animationCountWrap.classList.remove('active');
      }
    },
    enterReplyShow: function(){
      if(document.querySelector('.enter_reply_wrap') == null) return;
      document.querySelector('.enter_reply_wrap').classList.add('active');
    },
    enterReplyHide: function(){
      if(document.querySelector('.enter_reply_wrap') == null) return;
      document.querySelector('.enter_reply_wrap').classList.remove('active');
    },
    enterReplyEvent: function(){
      if(document.querySelector('.enter_reply_wrap') == null) return;

      const enterReplyWrap = document.querySelector('.enter_reply_wrap');
      let btnCloseReply = enterReplyWrap.querySelector(':scope > .inner .info_wrap .status button');

      // 입력창 버튼으로 닫기
      if(btnCloseReply){
        btnCloseReply.addEventListener('click', ()=> {
          this.enterReplyHide();
        });
      }

      // 입력창 dimmed로 닫기
      document.querySelector('html').addEventListener('click', (e) => {
        if (e.target == enterReplyWrap){
          this.enterReplyHide();
        }
      });
    },
    headerBtnEvent: function(){
      const btnComments = document.querySelector('#header .btn_comments');

      if(btnComments){
        btnComments.addEventListener('click', ()=> {
          this.enterReplyShow();
        });
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
});