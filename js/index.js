$(function(){
  // menu 보임, 숨김
  $('.menu_icon').click(function(){
    $('#menu_wrap').animate({top:'0%'},'normal');
    // .animate → 밑에서 스르륵 내려오는 .menu_wrap
    // .animate({top:'0%},'') → '' 속도 조절  
  });

  $('.x_icon').click(function(){
    $('#menu_wrap').animate({top:'-120%'},'fast');
  });

  // quick_menu
  $('#quick_menu2 li a').click(function(){
    // 모든 메뉴에서 클래스 삭제
    $('#quick_menu2 li a').removeClass('selected');
    // 클릭된 직접적인 대상에 클래스 적용
    $(this).addClass('selected');
  });

  // gnb
  $('#gnb > ul > li').click(function(){
    // 클릭 대상 하위의 ul의 화면에서 숨김 상태면
    if( $(this).children('ul').css('display') == 'none' ){
      // 모든 서브메뉴 접음
      $('.submenu').slideUp();
      $('#gnb ul li a i').attr('class','fa-solid fa-plus icon3')
      // $('#gnb ul li a i').attr('class','xi-plus-min') → 서브메뉴가 접힐 때 마이너스(-) 아이콘을 다시 플러스(+)로 바꿈
    }
    $(this).children('ul').slideDown();
    // $(this).children('ul').slideDown(); → 단독 사용 시 펼쳐진 메뉴 닫지 않고 다른 메뉴 펼치기 (모든 메뉴를 한번에 펼쳐둘 수 있음) ※ 단 단독 사용 시 다시 접을 수 없음.
    $(this).find('i').attr('class','fa-solid fa-minus icon3');
    // $(this).find('i').attr('class','xi-minus-min'); → 서브메뉴가 펼쳐질때 플러스(+) 아이콘을 마이너스(-)로 바꿔줌 ※ 단 단독 사용 시 다시 플러스로 바뀌지 않음.
  });

  // top_btn
  // 초기설정
  $('.top_btn').hide();
  // 이벤트
  $(window).scroll(function(){
    // 화면 높이
    let w_height = $(this).height();
    // 스크롤 높이
    let sc_height = $(this).scrollTop();

    console.log( (w_height / 0.6), sc_height);
    if( (w_height / 0.6) < sc_height ){ // 화면 반 높이보다 스크롤이 많으면 
      $('.top_btn').fadeIn();
    }else{
      $('.top_btn').fadeOut();
    }
  });

  // bottom
  // 초기설정
  $('#bottom').hide();
  // 이벤트
  $(window).scroll(function(){
    // 화면 높이
    let w_height = $(this).height();
    // 스크롤 높이
    let sc_height = $(this).scrollTop();

    console.log( (w_height / 0.6), sc_height);
    if( (w_height / 0.6) > sc_height ){ // 화면 반 높이보다 스크롤이 적으면 
      $('#bottom').fadeIn();
    }else{
      $('#bottom').fadeOut();
    }
  });
});