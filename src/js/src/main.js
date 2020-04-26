(function ($) {
    $.fn.createWidget = function (options) {
        var defaults = {
            widgetContainerClass: 'opti-widget-container',
            widgetInputClass: 'opti-widget-input',
            widgetInputButton: 'opti-widget-button',
            errorMsg: 'Поле обязательно к заполнению'
        };

        var options = $.extend({
            buttonColor: '#ffa073',
            backgroundColor: '#ffffff',
            widgetWidth: '100%',
            formClass: 'opti-widget-form',
            inputsPlaceholders: {
                from: 'Откуда',
                to: 'Куда'
            },
            buttonText: 'Заказать'
        }, options);

        function createWidget(context, form) {
            var widgetContainer = $('<div/>')
                .addClass(defaults.widgetContainerClass)
                .css({
                    backgroundColor: options.backgroundColor,
                });

            $(widgetContainer).append(form);

            $(context).append(widgetContainer);
        }

        function createForm() {

            var widgetForm = $('<form/>')
                .addClass(options.formClass);

            var inputFrom = createTextInput(options.inputsPlaceholders.from, defaults.errorMsg);
            var inputTo = createTextInput(options.inputsPlaceholders.to, defaults.errorMsg);

            var inputTime = $('<input/>')
                .addClass(defaults.widgetInputClass + ' time')
                .attr({
                    'type': 'text',
                    'placeholder': '00:00'
                });

            $(inputTime).inputmask({
                alias: 'datetime',
                inputFormat: 'HH:MM',
                showMaskOnHover: false,
                showMaskOnFocus: true
            });

            var button = $('<button/>')
                .addClass(defaults.widgetInputButton)
                .text(options.buttonText)
                .attr({
                    'type': 'submit',
                    'value': options.buttonText,
                    'placeholder': options.inputsPlaceholders.to
                });

            $(widgetForm).append(inputFrom);
            $(widgetForm).append(inputTo);
            $(widgetForm).append(inputTime);

            $(widgetForm).append(button);

            return widgetForm;
        }

        function createTextInput(placeholder, errorMsg) {
            var input = $('<input/>')
                .addClass(defaults.widgetInputClass)
                .attr({
                    'type': 'text',
                    'placeholder': placeholder,
                    'data-validation': 'required',
                    'data-validation-error-msg-required': errorMsg
                });

            return input;
        }

        function initValidation(form) {
            console.log($(form));

            $.validate({
                form: $(form),
                language: {
                    badCustomVal: defaults.errorMsg
                },
                borderColorOnError : '#DD1519',
            })
        }

        return this.each(function () {

            var form = createForm();

            initValidation(form);

            createWidget(this, form);
        });
    }
}(jQuery));

