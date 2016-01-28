// http://www.funnyjellyfish.ru/





/*-------------------------------------------------------------------------------
      Window load
    -------------------------------------------------------------------------------*/



    $(window).load(function(){
        $('body').addClass('loaded');   
        $('.loader').fadeOut(200);
    });


    /*-------------------------------------------------------------------------------
      Parallax
    -------------------------------------------------------------------------------*/



    $(window).stellar({
      responsive: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      horizontalOffset: 0,
      verticalOffset: 0,
    });



    /*-------------------------------------------------------------------------------
     Navbar collapse
    -------------------------------------------------------------------------------*/



    var navbar=$('.navbar');
    var navbarAffixHeight=56


    $('.navbar-collapse').on('show.bs.collapse', function () {
        navbar.addClass('affix');
    });

    $('.navbar-collapse').on('hidden.bs.collapse', function () {
        if (navbar.hasClass('affix-top')){
            navbar.removeClass('affix');
        }
            
    });

    $(".navbar-nav > li > a").on('click', function() {
        $(".navbar-collapse").collapse('hide');
    });



    /*-------------------------------------------------------------------------------
     Affix
    -------------------------------------------------------------------------------*/



    navbar.affix({
      offset: {
        top:1
      }
    });

    navbar.on('affixed-top.bs.affix', function() {
        if ($('.navbar-collapse').hasClass('in')){
            navbar.addClass('affix');
        }   
    });

    


    /*-------------------------------------------------------------------------------
      Smooth scroll to anchor
    -------------------------------------------------------------------------------*/




    $('.js-scroller').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top - navbarAffixHeight + 1)
            }, 1000);
        }
    });




    /*-------------------------------------------------------------------------------
     Scrollspy
    -------------------------------------------------------------------------------*/



    $('body').scrollspy({
        offset:  navbarAffixHeight + 1
    });
    

