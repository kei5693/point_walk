$(function (){
  // 걷기가이드 목록 필터 버튼 이벤트
  $.fn.filterViewEvent = (function (){
    const walkingGuideWrap = $('.walking_guide_wrap');
    
    if (walkingGuideWrap.length === 0) return;
    
    const guideListWrap = $('.guide_list_wrap');
    const filterView = guideListWrap.find('.filter_view');
    const view = filterView.find('> button');
    
    view.on('click', () => {
      guideListWrap.toggleClass('active');
    });
  });

  // 걷기 가이드 목록에서 상세 페이지 팝업 오픈
  $.fn.detailToggleEvent = (function (){
    const wrap = $('#wrap');
    const walkingGuideWrap = $('.walking_guide_wrap');
    
    if (walkingGuideWrap.length === 0) return;
    
    const guideUnit = walkingGuideWrap.find('.guide_list > div');
    
    guideUnit.on('click', () => {
      $.fn.layerOpen('#guideDetail');
    
      if (!wrap.hasClass('player_show')) {
        wrap.attr('class', 'download_show');
      }
    });
  });

  // 걷기가이드 상세 닫기
  $.fn.detailPopupClose = (function (){
    const guideDetailWrap = $('.walk_detail_wrap');
    
    if (guideDetailWrap.length === 0) return;
    
    const wrap = $('#wrap');
    const closeGuideDetail = guideDetailWrap.find('.layer_content_wrap .layer_close');
    
    const playerDownloadWrap = $('.player_download_wrap');
    // 플레이어
    const playerWrap = playerDownloadWrap.find('> .player_wrap');
    // 플레이어 상단 : 걷기 가이드 열고 닫기 버튼
    const btnCloseDetailLayer = playerWrap.find('> button');
    // 플레이어 콘트롤 버튼(play, loop, playlist)
    const btnPlayerUnit = playerWrap.find('> .player_controll .controll > button');
    
    closeGuideDetail.on('click', () => {
      resetPopupBtn();
    });
    
    function resetPopupBtn() {
      wrap.attr('class', '');
      btnCloseDetailLayer.removeClass('active');
      btnPlayerUnit.eq(3).removeClass('active');
      $.fn.layerClose('#playlistPopup');
      $.fn.layerClose('#guideDetail');
    }
  });
});