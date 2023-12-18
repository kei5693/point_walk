// 걷기가이드
let walkingGuide = {
  init: function(){
    this.filterViewEvent(); 
    this.detailToggleEvent();
    common.playerButtonEvent();
    common.playlistPopupEvent();
    this.detailPopupClose();
  },
  // 걷기가이드 목록 필터 버튼 이벤트
  filterViewEvent: function(){
    if(document.querySelector('.walking_guide_wrap') == null) return;

    const guideListWrap = document.querySelector('.guide_list_wrap');
    const filterView = guideListWrap.querySelector(':scope .filter_view');
    const view = filterView.querySelector(':scope > button');

    view.addEventListener('click', ()=>{
      let condition = guideListWrap.classList.contains('active');

      condition ? guideListWrap.classList.remove('active') : guideListWrap.classList.add('active')
    });
  },
  // 걷기 가이드 목록에서 상세 페이지 팝업 오픈
  detailToggleEvent: function(){
    if(document.querySelector('.walking_guide_wrap') == null) return;

    const guideUnit = document.querySelectorAll('.walking_guide_wrap .guide_list > div');

    guideUnit.forEach((el)=>{
      // 상세 클릭
      el.addEventListener('click', ()=>{
        common.layerOpen('#guideDetail');

        if(!wrap.classList.contains('player_show')){
          wrap.classList = 'download_show';
        }
      });
    });
  },
  // 걷기가이드 상세 닫기
  detailPopupClose: function(){
    if(document.querySelector('.guide_detail_wrap') == null) return;
    const closeGuideDetail = document.querySelector('.guide_detail_wrap .layer_content_wrap .layer_content .header > .title_wrap .btn_back');

    const playerDownloadWrap = document.querySelector('.player_download_wrap');
    // 플레이어
    const playerWrap = playerDownloadWrap.querySelector(':scope > .player_wrap');
    // 플레이어 상단 : 걷기 가이드 열고 닫기 버튼
    const btnCloseDetailLayer = playerWrap.querySelector(':scope > button');
    // 플레이어 콘트롤 버튼(play, loop, playlist)
    const btnPlayerUnit = playerWrap.querySelectorAll(':scope > .player_controll .controll > button');

    closeGuideDetail.addEventListener('click', ()=>{
      resetPopupBtn();
    });

    function resetPopupBtn(){
      wrap.classList = '';
      btnCloseDetailLayer.classList.remove('active');
      btnPlayerUnit[3].classList.remove('active');
      common.layerClose('#playlistPopup');
      common.layerClose('#guideDetail');
    }
  },
}