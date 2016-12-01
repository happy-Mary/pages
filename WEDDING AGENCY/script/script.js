// код для вкладок страница услуги
$(function () {
    var tabContainers = $('div.tabs > section'); //получаем массив контейнеров
    tabContainers.hide().filter(':first').show(); // прячем все, кроме первого
// далее обрабатывается клик по вкладке
    $('div.tabs ul.tabNavigation a').click(function () {
        tabContainers.hide(); // прячем все табы
        tabContainers.filter(this.hash).show(); // показываем содержимое текущего
    $('div.tabs ul.tabNavigation a').removeClass('selected'); // у всех убираем класс 'selected'
    $(this).addClass('selected'); // текушей вкладке добавляем класс 'selected'
    return false;
    }).filter(':first').click();
});

// JS код для скрытого текста страница зарубеж
