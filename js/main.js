$(function () {
	// 메인 : 출석 이벤트 오늘날짜로 스크롤 이동, 클릭 이벤트
	$.fn.mainWeeklyEvent = function (day) {
		if ($('.attendance_wrap .calendar_cont').length === 0) return;

		const attendance = $('.attendance_wrap .calendar_cont');
		const weeklyInner = attendance.find('> .weekly_unit .inner');
		const weeklyUl = weeklyInner.find('> ul');
		const weeklyLi = weeklyUl.find('li');
		let heartEffect01 = weeklyInner.find('> .heart_effect01');
		let heartEffect02 = weeklyInner.find('> .heart_effect02');

		setTabInit();
		// init
		setTimeout(() => {
			setActiveTab(weeklyLi, day);
			switchTab(day);
		}, 500);

		// inner 리스트 클릭 이벤트
		weeklyLi.on('click', function (e) {
			e.preventDefault();

			if (day === $(this).index()) {
				// 클릭 효과 lottie
				heartEffect02.find('lottie-player').each(function () {
					$(this).get(0).play();
				});

				$(this).find('> a .icon').removeClass('unclicked').addClass('clicked');

				// callback
				heartEffect02.find('lottie-player').eq(1).on('complete', function () {
					$(this).closest('li').removeClass('today').addClass('complete');
				});
			}
		});

		// 탭 전체 width 설정
		function setTabInit() {
			let tabWidth = 20; // 우측 간격 20 필요해서 추가
			let gap = 16;

			weeklyLi.each(function (index, el) {
				if (index == 0) {
					tabWidth += ($(el).outerWidth());
				} else {
					tabWidth += ($(el).outerWidth() + gap);
				}
			});

			weeklyUl.width(tabWidth);
		}

		// 클릭한 대상에 active
		function setActiveTab(titles, index) {
			titles.each(function (i, title) {
				$(title).toggleClass('today', i === index);

				// today에 lottie 적용
				if (i === index) {
					const icon = $(title).find('> a .icon');
					icon.addClass('unclicked');

					heartEffect01 = heartEffect01.clone();
					heartEffect02 = heartEffect02.clone();

					icon.append(heartEffect01);
					icon.append(heartEffect02);

					setTimeout(() => {
						icon.find('.heart_effect01 lottie-player').each(function () {
							$(this).get(0).play();
						});
					}, 10);
				}
			});
		}

		// 클릭한 대상으로 scroll 이동 이벤트
		function switchTab(n) {
			const posCenter = window.outerWidth / 2;
			let pos = 0;
			let gap = -10;
			const posLimit = weeklyUl.outerWidth() - weeklyInner.outerWidth() + 20; // inner에 패딩 20있어서 추가

			if (weeklyLi.eq(n).position().left + gap + weeklyLi.eq(n).outerWidth() / 2 <= posCenter) {
				pos = 0;
			} else {
				pos = (weeklyLi.eq(n).position().left + gap + weeklyLi.eq(n).outerWidth() / 2) - posCenter;
				if (pos > posLimit) {
					pos = posLimit;
				}
			}

			weeklyInner.animate({scrollLeft : pos}, 500);
		}
	};


	// 메인 : 보너스 받기, 스크롤에 그래프 이벤트
	$.fn.mainBonusEvent = function () {
		const mainStatus = $('.main_content_wrap .main_status');
		const bonusCont = mainStatus.find('.graph_cont > ul > li');
		const graph = mainStatus.find('.graph_cont > .graph span');

		// 보너스 받기
		bonusCont.on('click', function () {
			if ($(this).hasClass('active')) {

				const downloadAni = $('.download_ani');
				let heartEffect01 = $(this).find('.heart_effect01');
				//let heartEffect02 = $(this).find('.heart_effect02');

				if(downloadAni.hasClass('active')) return

				$(this).addClass('clicked');
				heartEffect01.hide();

				$.fn.downloadAnimation();

				// 클릭 효과 lottie
				// heartEffect02.find('lottie-player').each(function () {
				// 	$(this).get(0).play();
				// });

				// callback
				// heartEffect02.find('lottie-player').eq(1).on('complete', function () {
				// 	$(this).closest('li').removeClass('active').addClass('complete');
				// });
			}
		});

		// 스크롤에 그래프 이벤트
		$(window).on('scroll', function () {
			if ($('.main_status').length === 0) return;

			const currentScrollPos = $(window).scrollTop();
			let calcPos = $('.main_status').offset().top - $(window).outerHeight() / 2;

			// active
			if (currentScrollPos > calcPos) {
				mainAni(60);
			}

			// reset
			if (currentScrollPos == 0) {
				mainAni(0);
			}
		});

		function mainAni(value) {
			graph.css('width', value + '%');
		}
	};


	// 메인 : 챌린지 목록 찜 버튼 이벤트(챌린지에서 동일 이벤트 있어서 사용 안함)
	$.fn.mainBtnEvent = function () {
		$(document).on('click', '.main_content_wrap .challenge_list > ul > li > button', function (e) {
			$(this).toggleClass('active');
		});
	};


	// 메인 : 스크롤 이벤트(출석, 스와이퍼, 상태, 툴바)
	$.fn.mainScrollEvent = function () {
		if ($('.main_content_wrap').length === 0) return;

		// 출석
		const attendance = $('.attendance_wrap');

		// 상태
		const statusUl = $('.status_wrap > ul');
		const statusLi = statusUl.find('> li');

		// 메인 스와이퍼
		if ($('.main_swipe_menu').length === 0) return;
		let mainVisualSwipe = new Swiper('.main_swipe_menu .banner_swiper', {
			autoplay: {
				delay: 20000,
				disableOnInteraction: false,
			},
			spaceBetween: 20,
			roundLengths: true,// 이미지가 흐리게 나옴 방지
			loop: true,
			pagination: {
				el: ".swiper-pagination",
			},
		});

		$(window).on('scroll', function () {
			const currentScrollPos = $(window).scrollTop();

			// 출석 스크롤 따리서 높이 조정
			currentScrollPos > 10 ? attendance.addClass('active') : resetMainScrollEvent();

			// 메인 하단 챌린지 메뉴 스크롤 이벤트
			detectScroll(statusLi, currentScrollPos);

			// 메인 하단 챌린지 메뉴 스크롤 이벤트
			function detectScroll(target, scrollTop) {
				target.each(function () {
					let calcPos = $(this).offset().top - $(window).outerHeight() / 10 * 5;

					// if (scrollTop > calcPos && !$(this).hasClass('clear')) {
					if (scrollTop > calcPos) {
						$(this).addClass('active').find('> .inner > .contents > .content2').slideDown();
					}

					if (scrollTop == 0) {
						$(this).removeClass('active');
						resetScroll();
					}
				});

				function resetScroll() {
					$('.status_wrap > ul > li').each(function () {
						if (!$(this).hasClass('clear')) {
							$(this).find('> .inner > .contents > .content2').slideUp();
						}
					});

				}
			}
		});

		// 메인 스크롤 이벤트 초기화
		function resetMainScrollEvent() {
			attendance.removeClass('active');

			// Reset Status Li
			statusLi.removeClass('active');
		}
	};


	// 월간 출석 클릭 이벤트
	$.fn.monthlyAttendanceEvent = function (today) {
		if (this.length === 0 || !this.hasClass('monthly_attendance_wrap')) return;

		const monthlyAttendance = this.find('.monthly_calendar .calendar_tbl');
		const monthlyDate = this.find('.monthly_calendar .calendar_tbl td a');

		let heartEffect01 = this.find('.monthly_calendar .calendar_tbl .heart_effect01');
		let heartEffect02 = this.find('.monthly_calendar .calendar_tbl .heart_effect02');

		monthlyDate.each(function (index) {
			$(this).on('click', function (e) {
				e.preventDefault();
			});

			if (today === index) {
				const date = $(this);

				setTimeout(() => {
					date.closest('td').addClass('today');

					heartEffect01 = heartEffect01.clone();
					heartEffect02 = heartEffect02.clone();

					date.find('.icon').append(heartEffect01);
					date.find('.icon').append(heartEffect02);
				}, 300);

				date.on('click', function (e) {
					e.preventDefault();

					if ($(this).closest('td').hasClass('today')) {
						date.find('.icon').addClass('clicked');

						// 클릭 효과 lottie
						heartEffect02.find('lottie-player').each(function () {
							$(this).get(0).play();
						});
						// callback
						heartEffect02.find('lottie-player').eq(1).on('complete', function () {
							// 토요일인가 평일인가
							if ($(this).closest('td').index() == 6) {
								date.closest('td').removeClass('today').addClass('bonus');
							} else {
								date.closest('td').removeClass('today').addClass('complete');
							}
						});
					}

					// 오늘 보너스 받고, 전체 보너스받기로 전환
					if ($(this).closest('td').hasClass('bonus')) {
						date.closest('td').removeClass('bonus').addClass('complete');
					}
				});
			}
		});
	};
});