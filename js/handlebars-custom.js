(function () {
    Handlebars.registerHelper('times', function (n, block) {
        let tmp = '';
        for (let i = 0; i < n; ++i)
            tmp += block.fn(i);
        return tmp;
    });

    Handlebars.registerHelper('locale', function (date) {
        return moment(date).locale("de").format('LL');
    });

    Handlebars.registerHelper('format', function (date) {
        return moment(date).format("YYYY-MM-DD");
    });

})();