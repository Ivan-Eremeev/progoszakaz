'use strict'

var docWidth = $(document).width()
// console.log(docWidth)

/* Function Block Scroll */
var blockScroll = function (state) {
    if (state == "open") {
        setTimeout(function () {

            if (!document.body.hasAttribute('data-body-scroll-fix')) {

                let scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // Получаем позицию прокрутки

                document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = '-' + scrollPosition + 'px';
                document.body.style.left = '0';
                document.body.style.right = '0';
                if ($('body').height() < $(window).height()) {
                    // console.log('меньше')
                    document.body.style.bottom = '0';
                }
            }

        }, 10);
    }
    if (state == "close") {
        if (document.body.hasAttribute('data-body-scroll-fix')) {

            let scrollPosition = document.body.getAttribute('data-body-scroll-fix'); // Получаем позицию прокрутки из атрибута

            document.body.removeAttribute('data-body-scroll-fix'); // Удаляем атрибут
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';

            window.scroll(0, scrollPosition); // Прокручиваем на полученное из атрибута значение

        }
    }
}
//----------------------//


jQuery(document).ready(function ($) {

    let InitMainSlider = function (sliderWrapper) {
        var slider = sliderWrapper.find('.main-slider_container'),
            arrowPrev = sliderWrapper.find('.swiper-button-prev'),
            arrowNext = sliderWrapper.find('.swiper-button-next'),
            pagination = sliderWrapper.find('.swiper-pagination')
        // console.log(slider)
        new Swiper(slider, {
            /*  loop: true, */
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 800,
            /*   grabCursor: true, */
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            watchOverflow: true,
            touchReleaseOnEdges: true,
            /*   autoplay: {
                  delay: 5000,
                  disableOnInteraction: false,
              }, */
            navigation: {
                nextEl: arrowNext,
                prevEl: arrowPrev,
            },
            pagination: {
                el: pagination,
                type: 'bullets',
                clickable: true,
            },
            breakpoints: {
                // when window width is >= 320px
                767: {
                    slidesPerView: 'auto',
                    spaceBetween: 13
                }
            },
        });
    }

    var MainSliderWrapper = $('.main-slider')
    MainSliderWrapper.each(function () {
        InitMainSlider($(this))
    })
    //--------------------------//

    // Анимация кнопки наверх //
    // Плавный скролл наверх по клику на кнопку //
    $('.btn-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    // ------------------------------- //

    // Функционал закрепления верхнего меню при скролле //
    var lastScrollTop = 0,
        FixedMenuPosition
    var FixedMenu = $('.header-bottom')
    FixedMenuPosition = FixedMenu.offset().top

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop()
        if (!$('header').hasClass('sticky') && scrollTop > FixedMenuPosition) {
            $('header').addClass('sticky')

            $('header.sticky').css({
                'padding-bottom': FixedMenu.outerHeight(),
            })
        }
        if ($('header').hasClass('sticky') && scrollTop <= FixedMenuPosition) { /* !$('.menu-hamb').hasClass('open') */
            $('header').removeClass('sticky')

            $('header').css({
                'padding-bottom': '',
            })

        }
    })
    //----------------------//

    // Перенос поиска на мобиле
    let InsertSearch = function (width) {
        if (width < 1200) {
            $('.header-search').insertAfter($('.header-nav'))
        }
        else {
            if (!$('.header-logo + .header-search').length)
                $('.header-search').insertAfter($('.header-logo'))
        }
    }
    InsertSearch(docWidth)
    //----------------------//


    // Функционал раскрытия меню на мобиле
    $('body').on('click', '.menu-hamb', function (e) {
        e.preventDefault()
        $(this).stop().toggleClass('open')
        $(this).next('.header-nav').stop().slideToggle({
            duration: 500,
            start: function () {
                $(this).css({
                    'display': 'flex',
                })
            },
            complete: function () {
                $(this).addClass('open')

            }
        })
        /*    if ($(this).hasClass('open')) {
               blockScroll('open')
           }
           else {
               blockScroll('close')
           } */
    })


    $(document).on('click', function (e) { // событие клика по веб-документу
        var NowWidth = $(document).width()
        if (NowWidth < 1200) {
            var div = $(".header-nav.open"),
                div2 = $('.menu-hamb') // тут указываем ID элемента
            if ((!div.is(e.target) && div.has(e.target).length === 0)
                &&
                (!div2.is(e.target) && div2.has(e.target).length === 0)) { // и не по его дочерним элементам
                div.slideUp({
                    duration: 500,
                    start: function () {
                        $('.menu-hamb.open').removeClass('open')
                        $(this).removeClass('open')

                        // blockScroll('close')
                    },
                }) // скрываем его
            }
        }
    });
    //----------------------//

    // Активая :active на мобиле
    $('body *').on('touchstart', function () { });

    $(window).on('resize', function (e) {
        var widthMobile = $(document).width()
        InsertSearch(widthMobile)
    })

    // Air Datepicker || Календарь
    new AirDatepicker('#datepicker', {
        // inline: true,
        // autoClose: true,
        range: true,
        // isMobile: true,
        buttons: [
            {
                content() {
                    return 'Отмена'
                },
                onClick(dp) {
                    dp.clear()
                }
            },
            {
                content() {
                    return 'Показать'
                },
                onClick(dp) {
                    dp.hide()
                }
            }
        ]
    });

    new AirDatepicker('#datepickerYear', {
        view: 'years',
        minView: 'years',
        dateFormat: 'yyyy',
        buttons: [
            {
                content() {
                    return 'Отмена'
                },
                onClick(dp) {
                    dp.clear()
                }
            },
            {
                content() {
                    return 'Показать'
                },
                onClick(dp) {
                    dp.hide()
                }
            }
        ]
    });
}) // end ready