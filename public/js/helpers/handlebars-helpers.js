(function () {
    Handlebars.registerHelper('stars', function (n, block) {
        let tmp = '';
        for (let i = 0; i < n; ++i)
            tmp += block.fn(i);
        return tmp;
    });

    Handlebars.registerHelper('stars_empty', function (n, block) {
        let tmp = '';
        let m = 5-n;
        for (i = 0; i < m; ++i)
            tmp += block.fn(i);
        return tmp;
    });

    Handlebars.registerHelper('locale', function (date) {
        return moment(date).locale("de").format('LL');
    });

    Handlebars.registerHelper('format', function (date) {
        return moment(date).format("YYYY-MM-DD");
    });

    Handlebars.registerHelper('isFinshed', function (finished) {
        if(finished === true){
            return "note-item-finished";
        }
        return " ";
    });

})();