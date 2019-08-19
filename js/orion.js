$(function(){            
    
    // 전체화면 높이 설정

    //font load 
    waitForWebfonts(['Nanum Gothic'], function() {
        $('.loading').delay(1000).fadeOut(function(){
          $(this).remove();$('.main-banner .wrap').addClass('on');
        })
    });

    //네비게이션 =======================================================================================
    // 언어선택
    $('.util-nav .lang').click(function(){
        if($(this).text()=='ENG'){
            $(this).find('a').text('한국어');
        }else{
            $(this).find('a').text('ENG');
        }
    })

    // 검색창
    $('.icon-search-open').click(function(){
        $('.search').toggleClass('open');
    })
    $('html').click(function(e){
        if(!$(e.target).is('.icon-search-open, .search *, .location *')){
            $('.search').removeClass('open');
            $('.location .scroll-wrapper').hide();
            $('.location i').removeClass('icon-dropup')
            $('.location i').addClass('icon-dropdown')
        }
    })
    
    // 모바일 네비게이션
    $('.btn-menu').click(function(){
        $(this).toggleClass('icon-close');
        $('nav').toggleClass('open');
        $('.gnb, .nav-m-bg').toggle();
    })

    //네비게이션 드롭다운
    $(window).resize(function(){
        var windowW=$(window).width();
        $('.gnb ul, .gnb').removeAttr('style');
        $('.gnb a').removeClass('active');
        $('.gnb > li').off('mouseenter');
        $('.gnb > li > a').off('click');
        $('.gnb').off('mouseleave');

        if(windowW>767){//pc.tb
            console.log('pc'); 
            $('.gnb > li').on('mouseenter',function(){
                $('.gnb > li > a').removeClass('active');
                $(this).children('a').addClass('active');                      
                $('.gnb ul, .depth2-bg').stop().slideDown();
            });    
            $('.gnb').on('mouseleave',function(){
                $('.gnb > li > a').removeClass('active');
                $('.gnb ul, .depth2-bg').stop().slideUp();
            })
            $('#history img').attr('src','img/history_chocopie.png');
        }else{//767이하
            console.log('767이하');
            $('.gnb > li > a').on('click',function(){
                $('.gnb > li > a').removeClass('active');
                $(this).addClass('active');
                $('.gnb ul').stop().slideUp();
                $(this).next().stop().slideDown();
            });
            $('#history img').attr('src','img/history_chocopie_m.png');
        }
    })

    // 메뉴 클릭시 영역으로 이동
    $('#navbar li').click(function(){
        var vh=$(window).height();
        var i=$(this).index();
        // console.log(i, vh);
        
        $('html, body').stop(true).animate({
            scrollTop: vh*i
        });
        $('#navbar li').removeClass('active');
        $(this).addClass('active');
        $('.bar').stop(true).animate({
            right:20*i+'%'
        });
    })

    //스크롤 스파이 & bottom영역 제어
    $(window).scroll(function(){
        var scrollTop=$(this).scrollTop();
        // console.log('위치',scrollTop);
        var vh=$('article').height();
        var nowIndex=0;
        
        for(var i=0; i<5; i++){
            if(scrollTop >= vh*i && scrollTop < vh*(i+1)){nowIndex=i;}
        }
        if(scrollTop >= vh*4){
            nowIndex=4;
        }
        // console.log(nowIndex);

        if(scrollTop >= vh*2 && scrollTop < vh*3){
            $('#navbar span').addClass('active');
        }else{
            $('#navbar span').removeClass('active');
        }

        //bar의 위치 변경 
        $('.bar').stop(true).animate({
            right:20*nowIndex+'%'
        },function(){
            $('#navbar li').removeClass('active');
            $('#navbar li').eq(nowIndex).addClass('active');
        });
    }).scroll();

    $('html').on('mousewheel',function(e, delta){
        var windowW=$(window).width();
        if(windowW>750){
            if(delta>0){//마우스 휠 올림                        
                // console.log('마우스휠올림');
                $('section').removeClass('bottom');
            }else if(delta<0){//마우스 휠 내림            
                var windowTop=$(window).scrollTop();
                var myScrollTop=$(document).height()-$(window).height();
                if(windowTop>=myScrollTop){        
                    // console.log('마우스휠내림');
                    $('section').addClass('bottom');
                    $('html, body').delay(500).animate({
                        scrollTop:$(window).scrollTop()+200
                    })
                }        
            }
        }else{
            $(window).stop().scrollTop();
        }
    })
    
    // 슬라이드 =======================================================================================
    // 메인슬라이드
    var originSetting ={
        pagination: {
            el: '#orion .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '#orion .swiper-button-next',
            prevEl: '#orion .swiper-button-prev',
        },
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        }
    }

    // 슬라이드 이미지소스 변경
    var orionSwiper = new Swiper('#orion .swiper-container', originSetting); 

    // 이벤트/소식
    var eventSetting={
        slidesPerView: 'auto',
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        loop: true,
        pagination: {
            el: '#event .swiper-pagination',
            clickable: true,
        },
    }
    var eventSwiper = new Swiper('#event .swiper-container', eventSetting);

    $(window).resize(function(){
        orionSwiper.destroy();
        eventSwiper.destroy();
        orionSwiper= new Swiper('#orion .swiper-container', originSetting);
        eventSwiper = new Swiper('#event .swiper-container', eventSetting);   
    }).resize();

    // 역사관 =======================================================================================

    var historys=[
        {
            title:'Only ORION, the ORION WAY',
            content:'오리온은 혁신적인 생각과 방법으로 오리온만의 격을 찾고, 스스로 그 격을 높임으로써 시장을 선도해 나가고 있습니다. 진정으로 고객을 생각하는 마음과, 남다르게  새로운 가치를 창출해내는 Only ORION의 경쟁력으로, 오리온은 World-class Company를 향해 힘차게 도약하고 있습니다.'
        },
        {
            title:'창업기 제과업계의 큰별, 오리온 등장',
            content:`1956년 풍국제과를 인수하면서 탄생한 오리온은 시작부터 국내 제과시장을 선도하며 '오리온 캬라멜'이라는 대형 히트제품을 만들어 냈습니다. 국내 최초 국산 드롭프스인 '오리온 킹드롭프스'도 1957년 12월에 시판되면서 폭발적인 반응을 모으며 그 후 10년 이상이나 그 인기를 이어갔습니다.`
        },
        {
            title:'새로운 출발 World-class Company를 향하여',
            content:'오리온은 지금까지의 방식으로 더 노력하는 것이 아닌 새로운 생각과 새로운 방법으로 오리온만의 格을 찾고, 그 格을 높임으로써 시장을 선도해 나가며, 남다르게 해내는 실력을 더한 Only Orion의 경쟁력으로 World-class Company를 향해 힘차게 도약하고 있습니다.'
        }
    ]

    
    $('#history .img-box button').on({
        'mouseenter':function(){
            if($(this).is('.btn-1956')){
                $('.history-title').text(historys[1].title);
                $('.history-content').text(historys[1].content);
            }else{
                $('.history-title').text(historys[2].title);
                $('.history-content').text(historys[2].content);
            }
        },
        'mouseleave':function(){
            console.log('원래로 돌아가자');
            $('.history-title').text(historys[0].title);
            $('.history-content').text(historys[0].content);
        }
    })

    // 매장찾기 =======================================================================================
    // 매장찾기 - 탭메뉴
    $('.store-tab li').click(function(e){
        e.preventDefault();
        $('.store-tab li').removeClass('active');
        $(this).addClass('active');
        
        $('.store-tab a').removeClass('active');
        $(this).find('a').addClass('active');
    })

    // 매장찾기 - 도/시 선택
    // 드롭다운업
    // 카테고리
    var location={
        // 속성(키):값(자료형)
        location1:['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구',
                '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구',
                '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
        location2:['강릉시', '고성군', '동해시'],
        location3:['가평군', '고양시', '과천시', '광명시', '광주시']
    }
    $('.scrollbar-inner').scrollbar();
    $('.location button').click(function(){
        if($(this).next().css('display')=='block'){
            $('.location .scroll-wrapper').hide();
            $(this).next().hide();
        }else{
            $('.location .scroll-wrapper').hide();
            $(this).next().show();
        }
        $(this).find('i').toggleClass('icon-dropdown icon-dropup');
    })
    
    //도/시 선택
    $('.select-choice a').click(function(e){
        e.preventDefault();
        var key=$(this).attr('href').substring(1);
        var name=$(this).text();

        $('.select-result ul').empty();       
        for(let i in location[key]){
            $('.select-result ul').append('<li><a href="#">'+location[key][i]+'</a></li>');
        }
        $('#select-choice span').text(name);
    })

    //구/군 선택
    $('.select-result').on('click','a',function(e){
        e.preventDefault();
        var name=$(this).text();
        console.log(name);
        
        $('#select-result span').text(name);
    })

    $('.location').on('click', 'a', function(e){
        e.preventDefault();
        $(this).parents('.location').find('a').removeClass('active');
        $(this).addClass('active');
        $('.scroll-wrapper').hide();
        $(this).parents('.location').find('i').toggleClass('icon-dropdown icon-dropup');
    })

    // Top버튼
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('.top-btn').fadeIn();
        } else {
            $('.top-btn').fadeOut();
        }
    });
    $('.top-btn').click(function() {
        $('html, body').animate({
            scrollTop : 0
        }, 800);
    });

})