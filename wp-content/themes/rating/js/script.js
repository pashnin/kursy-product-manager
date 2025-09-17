(function($){

$(document).ready(function() {
    slidertopHeight();
    orders_listHeight();
    sliderpriceh3Height();
    sliderpricedescripHeight();
    sliderpriceHeight();
	rewiewsHeight();
});
function rewiewsHeight() {
    var maxHeight = 0;
    $('.js_feedback_slider .slick-slide').each(function() {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    $('.js_feedback_slider .slick-slide').height(maxHeight);
}
function sliderpriceHeight() {
    var maxHeight = 0;
    $('.sliderprice_wr .slick-slide').each(function() {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    $('.sliderprice_wr .slick-slide').height(maxHeight);
}
function sliderpricedescripHeight() {
    var maxHeight = 0;
    $('.sliderprice_wr .descrip').each(function() {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    $('.sliderprice_wr .descrip').height(maxHeight);
}
function sliderpriceh3Height() {
    var maxHeight = 0;
    $('.sliderprice_wr .slide h3').each(function() {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    $('.sliderprice_wr .slide h3').height(maxHeight);
}

function slidertopHeight() {
    var maxHeight = 0;
    $('#slidertop .slick-slide').each(function() {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    $('#slidertop .slick-slide').height(maxHeight);
}
function orders_listHeight() {
    var maxHeight = 0;
    $('.orders_list .slick-slide').each(function() {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    $('.orders_list .slick-slide').height(maxHeight);
}


    function setCookie(name, value, lifetime_days) {
        var exp = new Date();
        exp.setDate(new Date().getDate() + lifetime_days);
        document.cookie = name + '=' + value + ';expires=' + exp.toUTCString() + ';path=/';
    }
    
    function getCookie(name) {
        if(document.cookie) {
            var regex = new RegExp(escape(name) + '=([^;]*)', 'gm'),
            matches = regex.exec(document.cookie);
            if(matches) {
                return matches[1];
            }
        }
    }
    
    var faq = $('.faq .a').hide();
    $('.faq .q, .spoiler_item .q').click(function() {
        $(this).parent().siblings().find('.q').removeClass('open');
        $(this).stop().toggleClass('open');
        $(this).siblings('.a').stop().slideToggle();
        $(this).parent().siblings().find('.a').slideUp();
    });
    
    $('.js_thumb_action').on('click',function(e){
        
        e.preventDefault(); 
        
        let execute = $(this).data('action'),
            pid = $(this).data('pid');
            btn = $(this);
        
        if(getCookie('do_'+pid)){
            alert(theme.voteNote); 
            return;  		
        }
                          
        $.ajax({
            url: theme.ajaxUrl,
            type: 'post',
            data: {
                'action': 'rate_thumbs',
                'execute': execute,
                'pid': pid
            },
            beforeSend: function(){
                btn.addClass('cursor_progress');
            },
            complete: function(){
                btn.removeClass('cursor_progress');
            },
            success: function (data) {
                setCookie('do_'+pid, true, 30);
                btn.find('span').html(data);
            }
        });                  
    });
    
    $('.mini_gallery_slider').each(function (idx, item) {
        var carouselId = "carousel" + idx;
        this.id = carouselId;
        $(this).slick({
            //lazyLoad: 'ondemand',
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
        });
    });
    
    $(function() {      
        $(window).scroll(function () {
            if ($(this).scrollTop() > 0) {
                $('#up').fadeIn();
            } else {
                $('#up').fadeOut();
            }
        });
        $('#up').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });

        setTimeout(() => $('.js_load').each(function(item){
            load = $(this).data('load');
            $(this).html(load);
        }), 1000);
    });
    
    $('.js_show_all_reviews').click(function(e){
       e.preventDefault();
       $(this).hide();
       $('.feedback_slider .item').slideDown(); 
    });
      
    $("input[name='tel']").mask(theme.mask);
    $("input[name='birthday']").mask("99-99-9999");
    
    $("a.fancybox").fancybox({
        padding: 0,
        scrolling: 'auto',
	});
	
	$('#mmenu').click(function(){
		$(this).toggleClass('open');
		$('.header .menu').toggleClass('open');
	});
	
    $(function() {
      $('.anhors a, a.anchor').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });
	
	// quiz
    $('#step_next').on('click', function (e) {
        e.preventDefault()
        $('#steps .step.active').removeClass('active').hide().next().show().addClass('active');
        $('.step_wr.active').next().addClass('active').next().addClass('active');
        $('#step_back').show();

        if ( $('#steps .step.last').hasClass('active') ) {
            $('.step_navigation').hide();
        }
                
        var stepsArray = [],
            num = 0,
            formTitle = '';

        $('#steps .step:not(.last)').each(function () {
            num++
            stepsArray.push(num + ' ' + $(this).children().find('input:checked').val())
        });

        $('.questions textarea[name="textarea"]').val(stepsArray.join("\n"))
    });

    $('#step_back').on('click', function (e) {
        e.preventDefault()
        $('#steps .step.active').removeClass('active').hide().prev().show().addClass('active')
        $('.step_progess_line .active:last').removeClass('active').prev().removeClass('active');
        $('.step_navigation #step_next').show();
        
        if ( $('#step_0').hasClass('active') ) {
            $('#step_back').hide()
        }
    });
	
	$('input[type="radio"]').on('change', function(){
    	$('.wpcf7-radio .wpcf7-list-item').removeClass('active');
	    $('.wpcf7-radio input:checked').parent().parent().prev().addClass('active');
	    $('.wpcf7-radio input:checked').parent().parent().prev().prev().addClass('active');
	    $('.wpcf7-radio input:checked').parent().parent().prev().prev().prev().addClass('active');
	    $('.wpcf7-radio input:checked').parent().parent().prev().prev().prev().prev().addClass('active');
	});
	
    $('a[href="#discount"]').click(function(){
		var c = $(this).data('club'),
		    d = $(this).data('discount'),
		    m = $(this).data('mail');
		    
		$('#discount input[name="text-club"]').val(c);
		$('#discount input[name="text-discount"]').val(d);
		$('#discount input[name="email-club"]').val(m);
	});
	
	if ($(window).width() < 1201) {
    	$('.header .menu .df li a').click(function(){
        	$('#mmenu').click();
    	});
	}
    
    
    
 
jQuery(document).ready(function(){
	jQuery('.spoiler-head').click(function(){
		$(this).parents('.spoiler-wrap').toggleClass("active").find('.spoiler-body').slideToggle();
	})
})

	
})(jQuery);