(function ($) {
    $.fn.createWidget = function (options) {
        var defaults = {
            widgetContainerClass: 'opti-widget-container',
            widgetInputClass: 'opti-widget-input',
            widgetInputButton: 'opti-widget-button',
            timeout: 0
        };

        var options = $.extend({
            buttonBackground: '#2FB500',
            widgetBackground: '#ffffff',
            errorBorderColor: '#DD1519',
            widgetWidth: '100%',
            formClass: 'opti-widget-form',
            inputFromText: 'Откуда',
            inputToText: 'Куда',
            errorMsg: 'Поле обязательно к заполнению',
            buttonText: 'Заказать',
            borderRadius: '0'
        }, options);

        var address = "";

        function createWidget(context, form) {
            var widgetContainer = $('<div/>')
                .addClass(defaults.widgetContainerClass)
                .css({
                    backgroundColor: options.widgetBackground,
                });

            $(widgetContainer).append(form);

            $(context).append(widgetContainer);
        }

        function createForm() {

            var widgetForm = $('<form/>')
                .addClass(options.formClass);

            var inputFrom = createTextInput(options.inputFromText, defaults.errorMsg);
            var inputTo = createTextInput(options.inputToText, defaults.errorMsg);

            var inputTime = $('<input/>')
                .addClass(defaults.widgetInputClass + ' time')
                .css({
                    borderRadius: options.borderRadius
                })
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
                .css({
                    backgroundColor: options.buttonBackground,
                    borderRadius: options.borderRadius
                })
                .attr({
                    'type': 'submit',
                    'value': options.buttonText,
                    'placeholder': options.buttonText
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
                .css({
                    borderRadius: options.borderRadius
                })
                .attr({
                    'type': 'text',
                    'placeholder': placeholder,
                    'data-validation': 'required',
                    'data-validation-error-msg-required': errorMsg
                });

            $(input).on('keydown', function (e) {
                getAddressList(e.target.value);
            });

            return input;
        }

        function initValidation(form) {
            $.validate({
                form: $(form),
                language: {
                    badCustomVal: defaults.errorMsg
                },
                borderColorOnError : options.errorBorderColor,
            })
        }

        function getAddressList(address) {
            if (defaults.timeout) {
                defaults.timeout = setTimeout(function() {
                    $.ajax({
                        url: 'https://otaxi.com.ua/api/search?input=$' + address + '&city=1',
                        beforeSend: function(request) {
                            request.setRequestHeader("Authorization");
                        },
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                        }
                    });
                }, 700);
            } else {
                var newAddress = address;
                setTimeout(function() {
                    $.ajax({
                        url: 'https://otaxi.com.ua/api/search?input=' + newAddress + '&city=1',
                        beforeSend: function(request) {
                            request.setRequestHeader("Authorization", '');
                        },
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                        }
                    });
                }, 700);
            }
        }

        return this.each(function () {

            var form = createForm();

            initValidation(form);

            createWidget(this, form);
        });
    }
}(jQuery));

