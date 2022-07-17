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
                    dp.clear();
                    dp.hide()

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
                    dp.clear();
                    dp.hide()

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

    new AirDatepicker('#datepickerHeader', {
        position: 'left top',
        buttons: [
            {
                content() {
                    return 'Отмена'
                },
                onClick(dp) {
                    dp.clear();
                    dp.hide()

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

    // Аккордеон
	function accordion() {
		if ($('.accordion').length) {
			$('.accordion').each(function () {
				var accordion = $(this),
					trigger = accordion.find('.accordion__trigger'),
                    content = accordion.find('.accordion__content'),
					time = 300;
				trigger.on('click', function () {
					var $thisTrigger = $(this),
						data = $thisTrigger.data('trigger');
					if (!$thisTrigger.hasClass('active')) {
                        trigger.removeClass('active');
                        content.stop().slideUp(
                            time,
                            function () {
                                $(this).removeClass('open')
                            }
                        );
                        $thisTrigger.addClass('active');
						accordion.find('#' + data).stop().slideDown(
							time,
							function () {
								$(this).addClass('open')
							}
						);
					} else {
						$thisTrigger.removeClass('active');
						accordion.find('#' + data).stop().slideUp(
							time,
							function () {
								$(this).removeClass('open')
							}
						);
					}
				})
			})
		}
	}
	accordion();

    // Смена положения блока при изменении ширины окна
	// function(блок, куда переместить, куда вернуть)
	function replace(block, to, from, mediaBreak) {
		function replaceToggle() {
			if ($(window).width() <= mediaBreak) { // условие на ширину окна
				block.appendTo(to); // Переместить блок
			} else {
				block.appendTo(from); // Вернуть блок обратно
			}
		}
		replaceToggle();
		$(window).resize(function () {
			replaceToggle();
		})

	}
    replace($('#social'), $('#socialTo'), $('#socialFrom'), 1050);

    // Выпадайки при клике по кнопке
	// Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
	// Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
	function dropBlock(btn) {
		var $this = undefined,
				drop = undefined,
				close = $('.js-drop-close');
		btn.on('click', function () {
			$this = $(this);
			drop = $('#' + $this.data('drop'));
			$this.toggleClass('is-active');
			drop.toggleClass('open');
			$(document).mouseup(function (e) {
				if (!$this.is(e.target)
					&& $this.has(e.target).length === 0
					&& !drop.is(e.target)
					&& drop.has(e.target).length === 0) {
					$this.removeClass('is-active');
					drop.removeClass('open');
				}
			});
		})
		close.on('click', function () {
			$('[data-drop="' + $(this).data('drop') +'"]').removeClass('is-active');
			$('#' + $(this).data('drop')).removeClass('open');
		})
	}
	dropBlock($('.js-drop-btn'));

}) // end ready