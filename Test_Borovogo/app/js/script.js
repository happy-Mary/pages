$(document).ready(function() {
    $(".slider").slick({
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 7500

    });

    $(".icon-search").click(function() {
        $("input").slideToggle("slow");
        $(this).toggleClass("show-input");
    });

});