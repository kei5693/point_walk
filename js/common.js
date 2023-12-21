$(function () {
	// 공통 - 팝업 클릭 이벤트
	$(document).on('click', '.layer_button_toggle', function (e) {
		$.fn.layerToggle($(e.target).data('popupName'));
	});

	// 공통 - 팝업 토글
	$.fn.layerToggle = (function (target, sheetHeight = 100) {
		const layerPopup = $(target);
		// 방어
		if (layerPopup.length == 0) return console.error(`Element with selector '${target}' not found.`);
		// dimmed
		const dimmedLayer = layerPopup.children('.dimmed_layer');
		// 팝업 컨텐츠 영역
		const layerContentWrap = layerPopup.children('.layer_content_wrap');
		// 닫기 버튼
		const layerClose = layerContentWrap.find('> .layer_close');
		// 드래그
		const layerDrag = layerContentWrap.find("> .layer_drag");
		// 드래그 상태
		let isDragging = false;
		// 좌표
		let startY = 0;
		// 높이
		let startHeight = 0;
		// 팝업 상태
		let isOpened = layerPopup.hasClass('active');
		// 팝업 타입
		let isCentered = layerPopup.hasClass('align_center');

		isOpened ? hideBottomSheet() : showBottomSheet();

		// 팝업 닫기 클릭 이벤트
		$('html').on('click', (e) => {
			if ($(e.target).is(layerClose) || $(e.target).is(dimmedLayer)) {
				hideBottomSheet();
			}
		});

		// 팝업 열기
		function showBottomSheet() {
			$('body').addClass('active');
			layerPopup.addClass('active');

			if (!isCentered) {
				updateSheetHeight(sheetHeight);
			}
		}

		// 팝업 닫기
		function hideBottomSheet() {
			$('body').removeClass('active');
			layerPopup.removeClass('active');
		}

		function updateSheetHeight(height) {
			let value = height + '%';
			layerContentWrap.css('height', value);
		}

		// 드래그
		if (layerDrag) {
			(function dragEvent() {
				const dragStart = (e) => {
					isDragging = true;

					startY = e.pageY || e.touches?.[0].pageY;
					startHeight = (parseInt(layerContentWrap.css('height')) / $(window).height()) * 100;
					layerPopup.addClass("dragging");
				}

				const dragging = (e) => {
					if (!isDragging) return;

					const delta = startY - (e.pageY || e.touches?.[0].pageY);
					const newHeight = startHeight + delta / $(window).height() * 100;
					updateSheetHeight(newHeight);
				}

				const dragStop = () => {
					if (!isDragging) return;

					isDragging = false;
					layerPopup.removeClass("dragging");
					const sheetHeight = (parseInt(layerContentWrap.css('height')) / $(window).height()) * 100;
					// sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
					sheetHeight < 50 ? hideBottomSheet() : updateSheetHeight(100);
				}

				layerDrag.on("mousedown", dragStart);
				$(document).on("mousemove", dragging);
				$(document).on("mouseup", dragStop);

				layerDrag.on("touchstart", dragStart);
				$(document).on("touchmove", dragging);
				$(document).on("touchend", dragStop);
			})();
		}
	});
  // $.fn.layerToggle('#CG0600020-pop2');

	// 공통 - 팝업 열기
	$.fn.layerOpen = (function (target, sheetHeight = 100) {
		const layerPopup = $(target);
		// 방어
		if (layerPopup.length == 0) return console.error(`Element with selector '${target}' not found.`);
		// dimmed
		const dimmedLayer = layerPopup.children('.dimmed_layer');
		// 팝업 컨텐츠 영역
		const layerContentWrap = layerPopup.children('.layer_content_wrap');
		// 닫기 버튼
		const layerClose = layerContentWrap.find('> .layer_close');
		// 드래그
		const layerDrag = layerContentWrap.find("> .layer_drag");
		// 드래그 상태
		let isDragging = false;
		// 좌표
		let startY = 0;
		// 높이
		let startHeight = 0;
		// 팝업 상태
		let isOpened = layerPopup.hasClass('active');
		// 팝업 타입
		let isCentered = layerPopup.hasClass('align_center');

		isOpened ? '' : showBottomSheet();

		// 팝업 닫기 클릭 이벤트
		$('html').on('click', (e) => {
			if ($(e.target).is(layerClose) || $(e.target).is(dimmedLayer)) {
				hideBottomSheet();
			}
		});

		// 팝업 열기
		function showBottomSheet() {
			$('body').addClass('active');
			layerPopup.addClass('active');

			if (!isCentered) {
				updateSheetHeight(sheetHeight);
			}
		}

		// 팝업 닫기
		function hideBottomSheet() {
			$('body').removeClass('active');
			layerPopup.removeClass('active');
		}

		function updateSheetHeight(height) {
			let value = height + '%';
			layerContentWrap.css('height', value);
		}

		// 드래그
		if (layerDrag) {
			(function dragEvent() {
				const dragStart = (e) => {
					isDragging = true;

					startY = e.pageY || e.touches?.[0].pageY;
					startHeight = (parseInt(layerContentWrap.css('height')) / $(window).height()) * 100;
					layerPopup.addClass("dragging");
				}

				const dragging = (e) => {
					if (!isDragging) return;

					const delta = startY - (e.pageY || e.touches?.[0].pageY);
					const newHeight = startHeight + delta / $(window).height() * 100;
					updateSheetHeight(newHeight);
				}

				const dragStop = () => {
					if (!isDragging) return;

					isDragging = false;
					layerPopup.removeClass("dragging");
					const sheetHeight = (parseInt(layerContentWrap.css('height')) / $(window).height()) * 100;
					// sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
					sheetHeight < 50 ? hideBottomSheet() : updateSheetHeight(100);
				}

				layerDrag.on("mousedown", dragStart);
				$(document).on("mousemove", dragging);
				$(document).on("mouseup", dragStop);

				layerDrag.on("touchstart", dragStart);
				$(document).on("touchmove", dragging);
				$(document).on("touchend", dragStop);
			})();
		}
	});

	// 공통 - 팝업 닫기
	$.fn.layerClose = (function (target) {
		const layerPopup = $(target);

		$('body').removeClass('active');
		layerPopup.removeClass('active');
	});

	// 공통 - 토스트 팝업 클릭 이벤트
	$(document).on('click', '.toast_button_toggle', function (e) {
		$.fn.toastPopupToggle($(e.target).data('popupName'));
	});

	// 공통 - 토스트 팝업 토글
	$.fn.toastPopupToggle = (function (target) {
		const toastPopup = $(target);

		// 방어
		if (toastPopup.length == 0) return console.error(`Element with selector '${target}' not found.`);

		toastPopup.addClass('active');
		toastPopup.on("transitionend", () => {
			if (toastPopup.hasClass('active')) {
				setTimeout(() => {
					toastPopup.removeClass('active');
				}, 2000);
			}
		});
	});

  // 공통 : 탭메뉴 이벤트
  $('.tab_menu_wrap').each(function () {
    const tabTitles = $(this).find('.tab_title > li');
    const initialIndex = 0;

    setActiveTab(tabTitles, initialIndex);

    tabTitles.on('click', function (e) {
      setActiveTab(tabTitles, $(this).index());
    });
    
    function setActiveTab(titles, index) {
      titles.each(function (i) {
        $(this).toggleClass('active', i === index);
      });
    }
  });

  // 공통 : 숫자 애니메인션 카운터
  $.fn.animateCounter = function (targetValue, duration) {
    return this.each(function () {
        const targetCounter = $(this);

        let startValue = parseInt(targetCounter.text().trim() === '' ? 0 : targetCounter.text().trim());
        let increment = (targetValue - startValue) / duration;

        // Update counter
        let startTimestamp;

        function updateCounter(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            let elapsedTime = timestamp - startTimestamp;

            if (elapsedTime < duration) {
                let newValue = Math.round(startValue + increment * elapsedTime);

                targetCounter.text(newValue.toLocaleString()); // Use toLocaleString to add commas
                requestAnimationFrame(updateCounter);
            } else {
                // Set the final value as the targetValue
                targetCounter.text(targetValue.toLocaleString());
            }
        }

        // Start the animation
        requestAnimationFrame(updateCounter);
    });
  };
  // $('셀렉터').animateCounter(1000, 1000);
  // 셀렉터에 해당하는 태그가 1개 이상이면 에러

  // 프로필 설정 : 인풋 포커스, 인풋 값 삭제
  $('.inp_box_list > li').each(function () {
    const input = $(this).find('input');
    const button = $(this).find('button');

    input.on('focus', function () {
      $(this).closest('li').addClass('active');
    });

    input.on('blur', function () {
      $(this).closest('li').removeClass('active');
    });

    button.on('click', function () {
      $(this).closest('li').find('input').val('');
    });
  });
  // 마퀴 이벤트
  $.fn.marqueeEvent = function (speed) {
    this.each(function () {
      const parent = $(this);
      const clone = parent.html();
      const firstElement = parent.children().first();
      let i = 0;
  
      parent.append(clone).append(clone);
  
      setInterval(function () {
        firstElement.css('margin-left', `-${i}px`);
        if (i > firstElement.width()) {
          i = 0;
        }
        i = i + speed;
      }, 0);
    });
  
    return this;
  };
  //$('셀렉터').marqueeEvent(0.2);

  // 챌린지 : 상세 리워드 받음 로티
  $.fn.downloadAnimation = function () {
    const downloadAni = $('.download_ani');
  
    if (downloadAni.length === 0) return;
  
    const lottiePlayer = downloadAni.find('lottie-player');
  
    downloadAni.addClass('active');
    lottiePlayer[0].play();
  
    lottiePlayer.on('complete', () => {
      // console.log('complete');
      downloadAni.removeClass('active');
      lottiePlayer[0].stop();
    });
  
    return this;
  };
  //$.fn.downloadAnimation();

  // 걷기 가이드 애니메이션 카운트
  $.animationCount = function (value = 3) {
    const animationCountWrap = $('.animation_count');
    const animationNumber = animationCountWrap.find('> p');
  
    startAni();
  
    animationNumber.on('animationend', function () {
      if (value > 1) {
        value--;
  
        animationNumber.html(value);
        animationNumber.removeClass('active');
  
        setTimeout(function () {
          animationNumber.addClass('active');
        }, 10);
      } else if (animationNumber.html() == 1) {
        endAni();
      }
    });
  
    function startAni() {
      animationCountWrap.addClass('active');
      animationNumber.addClass('active');
      animationNumber.html(value);
    }
  
    function endAni() {
      animationNumber.removeClass('active');
      animationCountWrap.removeClass('active');
    }
  };
  //$.animationCount();

  // 디자인 셀렉트
  $.fn.designSelect = function () {
    const selectBoxes = $('.design_select');
  
    selectBoxes.each(function () {
      const select = $(this);
      const selected = select.find('.selected');
      const selectTitle = selected.find('span');
      const optionList = select.find('.optionList > li');
  
      selected.on('click', function () {
        selectBoxes.not(select).removeClass('active');
        select.toggleClass('active');
      });
  
      optionList.on('click', function (e) {
        optionList.not($(this)).removeClass('select');
        $(this).addClass('select');
        select.removeClass('active');
        selectTitle.text(e.target.innerText);
      });
  
      $(document).on('click', function (e) {
        if (!$(e.target).closest('.design_select').length) {
          selectBoxes.removeClass('active');
        }
      });
    });
  };

  // 헤더 상단 댓글 버튼 클릭
  $('#header .btn_comments').on('click', function() {
    $.fn.enterReplyShow();
  });

  // 댓글창 보임
  $.fn.enterReplyShow = function () {
    const enterReplyWrap = $('.enter_reply_wrap');
    if (enterReplyWrap.length) {
      enterReplyWrap.addClass('active');
      $('body').addClass('active');
    }
  };
  //$.fn.enterReplyShow()

  // 댓글창 사라짐
  $.fn.enterReplyHide = function () {
    const enterReplyWrap = $('.enter_reply_wrap');
    if (enterReplyWrap.length) {
      enterReplyWrap.removeClass('active');
      $('body').removeClass('active');
    }
  };
  //$.fn.enterReplyHide()

  // 댓글 닫기 이벤트
  $.fn.enterReplyEvent = function () {
    const enterReplyWrap = $('.enter_reply_wrap');
    if (!enterReplyWrap.length) return;

    const btnCloseReply = enterReplyWrap.find('> .inner .info_wrap .status button');

    // 입력창 버튼으로 닫기
    btnCloseReply.on('click', function () {
      $.fn.enterReplyHide();
    });

    // 입력창 dimmed로 닫기
    $('html').on('click', function (e) {
      if ($(e.target).hasClass('enter_reply_wrap active')) {
        $.fn.enterReplyHide();
      }
    });
  };

  // 플레이어 버튼 이벤트
  $.fn.playerButtonEvent = function () {
    const wrap = $('#wrap');
    const playerDownloadWrap = $('.player_download_wrap');

    if (!playerDownloadWrap.length) return;

    const downloadWrap = playerDownloadWrap.find('> .download_wrap');
    const playerWrap = playerDownloadWrap.find('> .player_wrap');
    const btnCloseDetailLayer = playerWrap.find('> button');
    const btnClosePlayer = playerWrap.find('> .player_status button');
    const btnPlayerUnit = playerWrap.find('> .player_controll .controll > button');

    if (downloadWrap.length) {
      console.log('1');
      const btnDownload = downloadWrap.find('> button');
      btnDownload.on('click', function () {
        const condition = downloadWrap.hasClass('downloading');

        if (condition) {
          downloadWrap.removeClass('downloading');
          wrap.attr('class', 'player_show');
        } else {
          downloadWrap.addClass('downloading');
        }
      });

      btnCloseDetailLayer.on('click', function () {
        const condition = btnCloseDetailLayer.hasClass('active');

        if (condition) {
          btnCloseDetailLayer.removeClass('active');
        } else {
          btnCloseDetailLayer.addClass('active');
          closePlayList();
        }
        $.fn.layerToggle('#guideDetail');
      });

      btnClosePlayer.on('click', function () {
        const condition = btnCloseDetailLayer.hasClass('active');

        condition ? btnCloseDetailLayer.removeClass('active') : btnCloseDetailLayer.addClass('active');
        resetPopupBtn();
      });
    }

    btnPlayerUnit.eq(0).on('click', function () {
      btnPlayerUnit.eq(0).toggleClass('active');
    });

    btnPlayerUnit.eq(2).on('click', function () {
      btnPlayerUnit.eq(2).toggleClass('active');
    });

    btnPlayerUnit.eq(3).on('click', function () {
      if (btnPlayerUnit.eq(3).hasClass('active')) {
        resetPopupBtn();
      } else {
        openPlayList();
      }
    });

    function resetPopupBtn() {
      wrap.removeClass('player_show');
      btnCloseDetailLayer.removeClass('active');
      closePlayList();
    }

    function openPlayList() {
      btnPlayerUnit.eq(3).addClass('active');
      btnCloseDetailLayer.removeClass('active');

      $.fn.layerClose('#guideDetail');
      $.fn.layerOpen('#playlistPopup');
    }

    function closePlayList() {
      btnPlayerUnit.eq(3).removeClass('active');

      $.fn.layerClose('#playlistPopup');
      $.fn.layerClose('#guideDetail');
    }
  };

  // 재생목록 팝업 클릭 이벤트(재생, 중지, 닫기)
  $.fn.playlistPopupEvent = function () {
    const wrap = $('#wrap');
    const playlistPopup = $('.playlist_wrap');
    const playlistUnit = playlistPopup.find('.play_list > div');
    const closePlaylistPopup = playlistPopup.find('.layer_content_wrap .layer_content .header > .title_wrap .btn_back');

    const playerDownloadWrap = $('.player_download_wrap');
    const downloadWrap = playerDownloadWrap.find('> .download_wrap');
  
    const playerWrap = playerDownloadWrap.find('> .player_wrap');
    const btnCloseDetailLayer = playerWrap.find('> button');
    const btnClosePlayer = playerWrap.find('> .player_status button');
    const btnPlayerUnit = playerWrap.find('> .player_controll .controll > button');
  
    playlistUnit.on('click', function () {
      $(this).toggleClass('paused');
    });
  
    closePlaylistPopup.on('click', function () {
      resetPopupBtn();
    });
  
    function resetPopupBtn() {
      wrap.removeClass('player_show');
      $.fn.layerClose('#guideDetail');
      closePlayList();
    }
  
    function closePlayList() {
      $.fn.layerClose('#playlistPopup');
      btnPlayerUnit.eq(3).removeClass('active');
    }
  };
});