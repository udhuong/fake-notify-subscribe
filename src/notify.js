"use strict";
;(function ($, window, document, undefined) {
    var pluginName = "udhNotify",
        defaults   = {
            propertyName: "value"
        };

    var dataTemple = [
        {
            image: 'https://w.ladicdn.com/s250x250/5deb0989478dd16fc9343c26/78039635_1014007608959501_4915120488612626432_o-20191214092219.jpg',
            title: 'Nước Hoa Phương Anh',
            content: '0346706xxx, 126 nguyễn vă...',
        },
        {
            image: 'https://w.ladicdn.com/s250x250/5deb0989478dd16fc9343c26/66625179_694918847602805_3380768831143149568_o-20191214092707.jpg',
            title: 'Ngọc Dung ',
            content: '0978791xxx, chợ hạ long 1...',
        },
        {
            image: 'https://w.ladicdn.com/s250x250/5deb0989478dd16fc9343c26/71558062_2257744764337204_2597372079162523648_o-20191214092219.jpg',
            title: 'Áo Lông Cừu - Đạt Aris',
            content: '0328614xxx, 391 nguyễn thị ...',
        },
        {
            image: 'https://w.ladicdn.com/s250x250/5deb0989478dd16fc9343c26/62503634_1246035085564247_5158184679441956864_o-20191214092207.jpg',
            title: 'Hiếu Thanh',
            content: '0968770xxx, Thôn nội hải, xã h...',
        },
        {
            image: 'https://w.ladicdn.com/s250x250/5deb0989478dd16fc9343c26/78229275_2721749664553088_7385104396121538560_n-20191214092652.jpg',
            title: 'Lan Gucci',
            content: '0913645xxx, 30/8 đường v...',
        },
        {
            image: 'https://w.ladicdn.com/s250x250/5deb0989478dd16fc9343c26/71645439_1676615889141451_8753702468090593280_n-20191214092219.jpg',
            title: 'Linh Gốm Sứ',
            content: '0938197xxx, Công ty AEON VN...',
        },
        {
            image: 'https://w.ladicdn.com/s250x250/5deb0989478dd16fc9343c26/66625179_694918847602805_3380768831143149568_o-20191214092707.jpg',
            title: 'Anh Panda',
            content: '0932617xxx, 17/9a hẻm 17 đư...',
        },
    ];

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.dataTemple = dataTemple;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            this.dataTemple = this.shuffle(this.dataTemple);
            $('body').append('<div class="notify-wrapper"></div>');
            this.run();
        },
        run() {
            var min  = 3,
                max  = 10,
                rand = Math.floor(Math.random() * (max - min + 1) + min);
            // console.log('Wait for ' + rand + ' seconds');
            setTimeout(() => {
                this.changeItem();
                if (this.dataTemple.length > 0) {
                    this.run();
                }
            }, rand * 1000);
        },
        changeItem: function () {
            let html = this.renderItem(this.dataTemple.pop());
            this.$element.html(html).find('.notify').animate({
                opacity: 1,
            }, '100', 'swing').delay(3000).fadeOut(400);
        },
        // <img src="https://ui-avatars.com/api/?background=random&name=${value.title}">
        renderItem: function (value) {
            return `
                <div class="notify">
                    <div class="notify-image">
                        <img src="${value.image}">
                    </div>
                    <div class="notify-title">${value.title}</div>
                    <div class="notify-content">${value.content}</div>
                    <div class="notify-time">Vừa đặt xe</div>
                </div>`;
        },
        shuffle: function (array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }

            return array;
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);
