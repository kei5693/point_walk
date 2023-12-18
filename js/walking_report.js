// 걸음리포트
let walkingReport = {
  anchorEvent: function(dataArr){
    if(document.querySelector('.walking_report') == null) return;

    const report = document.querySelector('.walking_report');
    const anchorList = report.querySelectorAll(':scope > .anchor_list > li');
    const anchorContents = report.querySelectorAll(':scope > .contents > div');

    // 차트 옵션 로드
    let ctx = document.getElementById('myChart');

    const annotation = {
      type: 'line',
      borderColor: 'black',
      borderDash: [3, 3],
      borderDashOffset: 0,
      borderWidth: 1,
      label: {
        enabled: true,
        content: (ctx) => 'Average: ' + average(ctx).toFixed(2),
        position: 'end'
      },
      scaleID: 'y',
      value: (ctx) => average(ctx)
    };

    let config = {
      type: 'bar',
      data: {
        labels: ["월", "화", "수", "목", "금", "토", "일"],
        datasets: [{
          // data: [9873, 6256, 6256, 2123, 4256, 4256, 6500],
          data: [],
          backgroundColor: ['#BDB4FE', '#BDB4FE', '#BDB4FE', '#BDB4FE', '#BDB4FE', '#BDB4FE', '#B5FA95'],
          borderRadius: 8,
          borderSkipped: false
        }],
      },
      options: {
        layout: {
          padding: {top: 30}
        },
        plugins: {
          legend: {display: false},
          datalabels: {
            color: '#4E2AF4',
            anchor: 'end',
            align: 'top',
          },
          annotation: {
            annotations: {
              annotation
            }
          }
        },
        scales: {
          x: {
            grid: {
              drawBorder: false,
              drawOnChartArea: false,
              display: false,
            },
          },
          y: {
            grid: {
              drawBorder: false,
              drawOnChartArea: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              display: false
            },
          },
        },
        responsive: true,
      }
    };
    Chart.register(ChartDataLabels);
    ctx.height = 300;
    let myChart = new Chart(ctx, config);

    function average(ctx) {
      const values = ctx.chart.data.datasets[0].data;
      return values.reduce((a, b) => a + b, 0) / values.length;
    }

    // 앵커 클릭 이벤트
    anchorList.forEach((anchor)=>{
      anchor.addEventListener('click', (e)=>{
        e.preventDefault();

        let target = document.querySelector(e.target.getAttribute("href"));
        let scrollTop = target.offsetTop - 76;

        document.documentElement.scrollTop = scrollTop;
      });
    });

    // 초기 세팅
    init();

    // 스크롤에 맺춰서 앵커 clsss 변경 이벤트
    window.addEventListener('scroll', () => {
      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
      // 상태 스크롤 감지
      detectScroll(currentScrollPos);
    });

    // 초기 세팅
    function init(){
      detectScroll(document.documentElement.scrollTop);
      common.animateCounter('.graph_cont1 > h3 span', 6500, 600);
    }
    // 대상이 정해진 위치에 있는지 감지
    function detectScroll(scrollTop){
      let graphArr = report.querySelectorAll(':scope .contents .content');

      graphArr.forEach((el, index)=>{
        let calcPos = el.offsetTop - window.outerHeight/2;
    
        if(scrollTop > calcPos){
          if(index == 0){
            todayAni(30, 60);
          } else if(index == 1){
            rankAni(6500, 4200);
          } else if(index == 2){
            chartUpdate();
          } else {
            monthReport();
          }
        }
      });

      anchorContents.forEach((content, index)=>{
        let calcScroll = content.offsetTop - 76;
        let calcHeight = calcScroll + content.offsetHeight

        if(scrollTop >= calcScroll && scrollTop <= calcHeight){
          anchorList.forEach((anchor, i) => {
            anchor.classList.toggle('active', i === index);
          });
        }
      });
    }
    // 어제, 오늘 걸음수 애니메이션
    function todayAni(today, yesterday){
      const todayGraph = document.querySelector('.graph_cont1 .walking1');
      const yesterdayGraph = document.querySelector('.graph_cont1 .walking2')

      todayGraph.style.left = today+'%';
      yesterdayGraph.style.left = yesterday+'%';
    }
    // 상위 분포도 애니메이션(걸음 수 비교로 class 분기)
    function rankAni(me, average){
      const meGraph = document.querySelector('.graph_cont2 .graph_wrap .graph');
      let condition = ''; 

      if(me < average){
        condition = 'less';
      } else if(me > average){
        condition = 'more';
      } else {
        condition = 'equal';
      }

      meGraph.classList.add(condition , 'animate');
    }
    // 차트에 데이터 추가
    function chartUpdate(){
      myChart.data.datasets[0].data = [9873, 6256, 6256, 2123, 4256, 4256, 6500];
      myChart.update();
    }
    // 걸음 기록
    function monthReport(){
      let days = document.querySelectorAll('#reportMonth .calendar td span:not(:empty)');
      let walkingDataArr = [
        11000,5500,5500,5500,12000,
        3100,5500,3500,3500,3500,
        11000,5500,5400,5300,12000,
        3100,5100,3500,5500,5500,
        3500,3500,3500,3500,3500,
        3500,3500,3500,3500,3500
      ];

      days.forEach((day, index)=>{
        const walkingData = walkingDataArr[index];

        if (walkingData > 2000 && walkingData < 5000) {
          day.classList.add('walking_3');
        } else if (walkingData > 5000 && walkingData < 10000) {
          day.classList.add('walking_5');
        } else if (walkingData > 10000) {
          day.classList.add('walking_10');
        }
      });
    }
  },
}