(function($) {
    $.srSmoothscroll = function(options) {
        var self = $.extend({
            step: 55,
            speed: 400,
            ease: "swing"
        }, options || {});
        var win = $(window),
            doc = $(document),
            top = 0,
            step = self.step,
            speed = self.speed,
            viewport = win.height(),
            body = (navigator.userAgent.indexOf('AppleWebKit') !== -1) ? $('body') : $('html'),
            wheel = false;
        $('body').mousewheel(function(event, delta) {
            wheel = true;
            if (delta < 0)
                top = (top+viewport) >= doc.height() ? top : top+=step;
            else
                top = top <= 0 ? 0 : top-=step;
            body.stop().animate({scrollTop: top}, speed, self.ease, function () {
                wheel = false;
            });
            return false;
        });
        win.on('resize', function (e) {
            viewport = win.height();
        }).on('scroll', function (e) {
            if (!wheel)
                top = win.scrollTop();
        });
    };
})(jQuery);