$(function () {
	// common
	$.fn.designSelect();
	$.fn.enterReplyEvent();
	$.fn.playerButtonEvent();
	$.fn.playlistPopupEvent();


	// walking_guide
	$.fn.filterViewEvent();
  $.fn.detailToggleEvent();
  $.fn.detailPopupClose();


	// main
	$.fn.mainWeeklyEvent(3); // 요일 0 ~ 6(일 ~ 토)
	$.fn.mainBonusEvent();
	//$.fn.mainBtnEvent();
	$.fn.mainScrollEvent();

	// 월간 출석 클릭 이벤트
	$('.monthly_attendance_wrap').monthlyAttendanceEvent(15);
});
