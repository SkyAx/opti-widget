
(function ($) {
    $.fn.createWidget = function (options) {
        var defaults = {
            widgetContainerClass: 'opti-widget-container'
        };

        var options = $.extend({
            buttonColor: '#ffa073',
            backgroundColor: '#67508c',
            widgetWidth: '100%',
            formClass: 'opti-form-container'
        }, options);

        function createForm(context) {
            var widgetForm = $('<div/>')
                .addClass(defaults.widgetContainerClass)
                .css({
                    backgroundColor: options.backgroundColor,
                });

            $(context).append(widgetForm);
        }

        return this.each(function () {
            createForm(this);
        });
    }
}(jQuery));

