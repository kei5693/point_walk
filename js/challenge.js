// 챌린지
let challenge = {
  init: function(){
    this.challengeNotice();
    this.challengeScrollEvent();
    this.challengeCategoryListEvent();
    this.challengeRewardEvent();
    this.challengeReportAni();
    this.commentsBtnEvent();
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
    // 2023-12-04 const spreadList = challengeCategory.querySelectorAll('.spread_list li');

    const challengeList = document.querySelector('.challenge_list');
    const btnMarking = challengeList.querySelectorAll(':scope > ul > li > button');
    const btnViewType = challengeList.querySelector('.view_type button');

    let clickIndex = 0;

    setTabInit();

    // init
    setActiveTab(categoryEl, 0);
    // 2023-12-04 setActiveTab(spreadList, 0);
    
    // inner 리스트 클릭 이벤트
    categoryEl.forEach((tabTitle, currentIndex) => {
      tabTitle.addEventListener('click', (e) => {
        e.preventDefault();

        let condition = challengeCategory.classList.contains('active');

        if(!condition){
          switchTab(currentIndex);
        }
        setActiveTab(categoryEl, currentIndex);

        clickIndex = currentIndex;
      });
    });

    // 2023-12-04 구조 변경으로 사용하지 않음
    // spread 리스트 클릭 이벤트
    // spreadList.forEach((tabTitle, currentIndex) => {
    //   tabTitle.addEventListener('click', (e) => {
    //     e.preventDefault();

    //     let condition = challengeCategory.classList.contains('active');

    //     if(condition){
    //       setActiveTab(spreadList, currentIndex);
    //     }
    //   });
    // });

    // 토글 버튼 이벤트
    toggleBtn.addEventListener('click', ()=>{
      if(!challengeCategory.classList.contains('active')){
        challengeCategory.classList.add('active');
      } else {
        challengeCategory.classList.remove('active');

        setTimeout(() => {
          setActiveTab(categoryEl, clickIndex);
          switchTab(clickIndex);
        }, 100);
      }
    });

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
      categoryInner.scrollLeft = pos;
    }
  },
  // 챌린지 : 상세 - 기본정보 스크롤 이벤트
  challengeScrollEvent: function(){
    if(document.querySelector('.challenge_detail_wrap') == null) return;

    const challengeInfo = document.querySelector('.challenge_info');
    const challengeProgress = challengeInfo.querySelector(':scope > .progress_wrap');

    window.addEventListener('scroll', () => {
      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
      let calcPos = challengeInfo.offsetTop - currentScrollPos;

      if(calcPos < 116){
        // 재실행 방지
        if(challengeInfo.classList.contains('active')) return;
        challengeInfo.classList.add('active');

        challengeAni(30);
        common.animateCounter('.challenge_info > .progress_wrap .info > div strong', 30, 600);
      }
    });

    // 걷기 그래프 애니메이션
    function challengeAni(current){
      challengeProgress.querySelector(':scope .graph .inner span').style.left = current+'%';
    }
  },
  // 챌린지 : 상세 - 진행중 걸음 기록 스크롤 이벤트
  challengeReportAni: function(){
    if(document.querySelector('.challenge_report') == null) return;

    const challengeReport = document.querySelector('.challenge_report');
    const reportGraph = challengeReport.querySelector(':scope .graph_wrap');

    window.addEventListener('scroll', () => {
      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
      let calcPos2 = challengeReport.offsetTop - currentScrollPos;

      if(calcPos2 < window.outerHeight/2){
        // 재실행 방지
        if(challengeReport.classList.contains('active')) return;
        challengeReport.classList.add('active');

        ongoingAni(30, 100);
        common.animateCounter('.challenge_report .graph_cont > h3 span', 1000, 600);
      }
    });

    
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
    if(document.querySelector('.challenge_detail_wrap .challenge_reward') == null) return;

    const challengeReward = document.querySelector('.challenge_detail_wrap .challenge_reward');
    const rewardToggleCont = challengeReward.querySelector(':scope > .toggle_cont');

    const rewardUl = challengeReward.querySelector(':scope > ul');
    const rewardLi = rewardUl.querySelectorAll(':scope > li');
    const rewardBtn = challengeReward.querySelector(':scope > button');
    const pickChallenge = document.querySelector('.challenge_detail_wrap .pick_challenge');
    let rewardListHeight = calcListHeight();
  
    // 초기 상태 설정
    // 2023-12-04 setListHeight(rewardBtn, rewardListHeight);
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

    // 2023-12-04 리워드 접기/펴기 클릭 이벤트 + 스크롤 이동
    // rewardBtn.addEventListener('click', (e) => {
    //   rewardListHeight = calcListHeight();

    //   common.scrollToEvent('html', challengeReward);
    //   setListHeight(e.target.closest('button'), rewardListHeight);
    // });
  
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
  commentsBtnEvent: function(){
    if(document.querySelector('.comments_list_wrap') == null) return;
    
    const commentsDetail = document.querySelectorAll('.comments_list_wrap .comments_content');
    commentsDetail.forEach((comment)=>{
      // 더보기
      let btnMore = comment.querySelector(':scope > .content .btn_more');
      // 답글쓰기
      let btnWritingReply = comment.querySelector(':scope > .reply_wrap .btn_writing_reply');

      if(btnMore){
        btnMore.addEventListener('click', ()=>{
          let target = btnMore.closest('.comments_content').querySelector(':scope .content');
          target.classList.contains('expansion') ? target.classList.remove('expansion') : target.classList.add('expansion');
        });
      } else {
        // 댓글 상세에서는 댓글 확장
        comment.querySelector(':scope .content').classList.add('expansion');
      }

      if(btnWritingReply){
        btnWritingReply.addEventListener('click', ()=> {
          common.enterReplyShow();
        });
      }
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