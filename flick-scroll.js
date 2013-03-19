(function($){
    var fs = (function(){
        function FS(){
            var self = this;

            // Get viewport size
            var viewportHeight = window.innerHeight;

            // Setup target
            var target = window.scrollY;

            // Setup touch lock
            var isInteracting = false;
            var shouldScroll = false;

            // Bind to scroll
            $('body').on('touchstart', function(){
                shouldScroll = false;
            }).on('touchend', function(){
                var newY = Math.round(window.scrollY / viewportHeight) * viewportHeight;
                target = newY;
                shouldScroll = true;
            });

            // Add additional padding at the end of the page
            $('body').height(Math.ceil($('body').height() / viewportHeight) * viewportHeight);

            var getFrame = (function()
            {
                return window.requestAnimationFrame
                    || window.webkitRequestAnimationFrame
                    || window.mozRequestAnimationFrame
                    || function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();

            var lastDelta = null;

            (function render(){
                getFrame(render);
                if (window.scrollY != target && shouldScroll) {
                    var diff = target - window.scrollY;
                    if (Math.abs(diff) <= 1 || diff == lastDelta) {
                        window.scrollTo(window.scrollX, target);
                    } else {
                        window.scrollTo(window.scrollX, Math.round(window.scrollY + diff / 5));
                    }
                    lastDelta = diff;
                } else if (shouldScroll) {
                    shouldScroll = false;
                }
            })();
        };

        return FS;
    })();

    $.flickScroll = fs;

})(jQuery);