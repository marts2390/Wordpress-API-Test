
angular.module('testApp', ['ngSanitize', 'slickCarousel'])
    .controller('mainController', ['$scope', '$http', '$sce', '$timeout', function ($scope, $http, $sce, $timeout) {
        $scope.loaded = false;

        $http.get('https://testapisite.cloudaccess.host/index.php/wp-json/').
            then(function (response) {
                $scope.json = response.data;
                $scope.name = $scope.json.name;
                $scope.subtitle = $scope.json.description;
            });

        $http.get('https://testapisite.cloudaccess.host/wp-json/wp-api-menus/v2/menus/2').
            then(function (response) {
                $scope.menu = response.data;
                $scope.menuItems = $scope.menu.items;
                $scope.menuItemsTitle = [];
                $scope.menuItemsUrl = [];
                $scope.menuSubItems = [];
                $scope.menu.items.forEach(function (menuItems) {
                    $scope.menuItemsTitle.push(menuItems.title);
                    $scope.menuItemsUrl.push(menuItems.url);
                    $scope.menuSubItems.push(menuItems.children);
                });
            });

        $http.get('https://testapisite.cloudaccess.host/index.php/wp-json/wp/v2/media/').
            then(function (response) {
                console.log(response.data)
                $scope.imagesData = response.data;
                $scope.images = [];
                $scope.logo;
                $scope.heroSliderImages = [];
                $scope.serviceImgs = [];
                $scope.caption = [];
                $scope.imagesData.forEach(function (imageData) {
                    if (imageData.alt_text === 'banner-image') {
                        $scope.images.push(imageData.media_details.sizes.full.source_url);
                    }
                    if (imageData.alt_text === 'main-logo') {
                        $scope.logo = imageData.media_details.sizes.full.source_url;
                    }
                    if (imageData.alt_text === 'hero-image') {
                        $scope.heroSliderImages.push(imageData.media_details.sizes.full.source_url);
                    }
                    if (imageData.alt_text === 'service-area') {
                        $scope.serviceImgs.push(imageData);
                        $scope.caption.push(imageData.caption.rendered);
                    }
                });

                $(document).ready(function () {
                    $('.heroSlider').slick({
                        infinite: true,
                        slidesToShow: 1,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        dots: false,
                        slidesToScroll: 1
                    });
                });

            });
        $http.get('https://testapisite.cloudaccess.host/index.php/wp-json/wp/v2/posts').
            then(function (response) {
                $scope.posts = response.data;
                $scope.testimonials = [];
                $scope.introText;
                $scope.contactForm;
                $scope.pricingText = [];
                $scope.posts.forEach(function (postData) {
                    if (postData.slug.includes('testimonial')) {
                        $scope.testimonials.push(postData);
                    }
                    if (postData.slug === 'intro-text') {
                        $scope.introText = postData.content.rendered;
                    }
                    if (postData.slug.includes('pricing')) {
                        $scope.pricingText.push(postData);
                    }
                    if (postData.slug === 'contact') {
                        $scope.contactForm = postData;
                    }
                });

                $(document).ready(function () {
                    $('.testimonialSlider').slick({
                        infinite: true,
                        slidesToShow: 3,
                        dots: true,
                        slidesToScroll: 1
                    });
                });
            });
            console.log($scope.loaded);
            $scope.loaded = true;
            console.log($scope.loaded);
            $scope.openNav = function() {
                $('.hamburger').toggleClass('is-active');
            };

            $scope.navAnimation = function () {
                $('.hamburger').toggleClass('is-active');
                setTimeout(function () {
                    $('#link1').animate({ opacity: 1 })
                }, 100);
                setTimeout(function () {
                    $('#link2').animate({ opacity: 1 });
                }, 300);
                setTimeout(function () {
                    $('#link3').animate({ opacity: 1 });
                }, 500);
                setTimeout(function () {
                    $('#link4').animate({ opacity: 1 });
                }, 700);
                setTimeout(function () {
                    $('#link5').animate({ opacity: 1 });
                }, 900);
            };
            $scope.closeAnimation = function () {
                setTimeout(function () {
                    $('#link1').animate({ opacity: 0 })
                }, 100);
                setTimeout(function () {
                    $('#link2').animate({ opacity: 0 });
                }, 300);
                setTimeout(function () {
                    $('#link3').animate({ opacity: 0 });
                }, 500);
                setTimeout(function () {
                    $('#link4').animate({ opacity: 0 });
                }, 700);
                setTimeout(function () {
                    $('#link5').animate({ opacity: 0 });
                }, 900);
                setTimeout(function () {
                    $.sidr('close', 'sidr');
                    $('.hamburger').removeClass('is-active');
                }, 1000);
            }

    }]);

    $(document).ready(function() {
        $('#simple-menu').sidr();

        $('[rel=tooltip]').tooltip()          // Init tooltips
        $('[rel=tooltip]').tooltip('disable') // Disable tooltips
        $('[rel=tooltip]').tooltip('enable')  // (Re-)enable tooltips
        $('[rel=tooltip]').tooltip('destroy') 

        $("#link1").click(function() {
            $('html,body').animate({
                scrollTop: $(".bio-area").offset().top},
                'slow');
        });
        $("#link2").click(function() {
            $('html,body').animate({
                scrollTop: $(".services-area").offset().top},
                'slow');
        });
        $("#link3").click(function() {
            $('html,body').animate({
                scrollTop: $(".pricing-area").offset().top},
                'slow');
        });
        $("#link4").click(function() {
            $('html,body').animate({
                scrollTop: $(".testimonial-area").offset().top},
                'slow');
        });
        $("#link5").click(function() {
            $('html,body').animate({
                scrollTop: $(".instagram-feed").offset().top},
                'slow');
        });

        $(window).scroll(function(){
            var sticky = $('header'),
                scroll = $(window).scrollTop();
          
            if (scroll >= 200) sticky.addClass('fixed');
            else sticky.removeClass('fixed');
          });

        var userFeed = new Instafeed({
            get: 'user',
            userId: '3195157332',
            limit: 12,
            resolution: 'standard_resolution',
            accessToken: '3195157332.1677ed0.3966073fefd045e5b36e49a60c50b34d',
            sortBy: 'most-recent',
            template: '<div class="col-lg-3 gallery instaimg"><a href="{{image}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid"/></a></div>',
        });
    
    
        userFeed.run();
    
        
        // This will create a single gallery from all elements that have class "gallery-item"
        $('.gallery').magnificPopup({
            type: 'image',
            delegate: 'a',
            gallery: {
                enabled: true
            }
        });
    
    
    });







