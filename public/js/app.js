$(document).ready(function(){var b=function(){var b=$("header").height();$("section").each(function(){var a=$(this),d=a.find("article");if(0<d.length){d.css("position","absolute");var e=$(window).innerHeight()-b,g=a.innerWidth(),f=d.outerHeight(),h=d.outerWidth(),k=(a.outerHeight()-a.height())/2,l=(a.outerWidth()-a.width())/2;d.css("left",(g-h+l)/2+"px");e>f?(d.css("top",(e-f)/2+"px"),a.css("height",e-2*k+"px")):e<f&&(d.css("position","static"),a.css("height",f+b+"px"))}})};$(window).on("resize",
b);setTimeout(b,100)});var sectiontop={},updatepositions=function(){sectiontop={};$("section").each(function(){sectiontop[$(this).offset().top]=$(this)})},unfade=function(){var b=$(window).scrollTop()+0.8*$(window).height(),c=null,a;for(a in sectiontop)if(c=sectiontop[a],a<=b&&(c.hasClass("faded")&&c.css("opacity",0).removeClass("faded").animate({opacity:1},1500),!$("body").hasClass("scrolling"))){var d=c.attr("data-section");$("header nav a").each(function(){var a=$(this);a.attr("href")=="#"+d?a.hasClass("active")||a.addClass("active"):
a.removeClass("active")})}};$(window).on("resize",function(){updatepositions();unfade()});$(window).on("scroll",unfade);updatepositions();setTimeout(unfade,1);$(document).ready(function(){$(".gallery").each(function(){$(this);var b=$(this).find("> .preview");if(b.length){b.slick({slidesToShow:1,slidesToScroll:1,arrows:!1,fade:!0,speed:300,autoplay:!0,autoplaySpeed:5E3});b.on("mousedown",function(){return!1});var c=!1;b.find("a").each(function(){var a=$(this);a.on("click",function(){var a=c;c=!1;return a});a.find("img").on("click",function(){c=!0})})}})});$(document).ready(function(){var b=$("header"),c=b.find("nav");b.find(".mobile-menu").on("click",function(){var a=$(this);a.hasClass("active")?(a.removeClass("active"),c.removeClass("mobile-visible")):(a.addClass("active"),c.addClass("mobile-visible"))});b.find("a").on("click",function(){var a=$("header .mobile-menu");a.hasClass("active")&&(a.removeClass("active"),c.removeClass("mobile-visible"))});var a=function(){b.stop().removeClass("hiding").removeClass("hidden").css({top:"0px",opacity:"1"})},
d=function(a){b.hasClass("hiding")||(b.addClass("hiding"),b.stop().css("overflow","hidden").animate({top:"-"+(b.height()-20)+"px",opacity:"0.5"},a,function(){b.removeClass("hiding").addClass("hidden")}))},e=function(a){300>=$(window).height()&&(0<$(window).scrollTop()&&!c.hasClass("mobile-visible"))&&d(a)},g=!1;$("body").on("mousedown",function(){g?(a(),g=!1):e("fast")});b.on("mousedown",function(){g=!0});$(window).on("scroll",function(){0==$(window).scrollTop()?a():e("slow")});var f=function(){c.css("top",
b.outerHeight()+"px");a()};$(window).on("resize",f);f()});$(document).ready(function(){var b=null;$("body").on("click","a",function(){var a=$(this).attr("href");if("#"==a.substring(0,1)){var d=$(a);if(0<d.length){var c=d.attr("id");b!=c&&(b=c,d.attr("id",""),$("body").addClass("hashchange"),window.location.hash=a,$("body").removeClass("hashchange"),d.attr("id",c),$("body").addClass("scrolling"),a=d.offset().top,a=300<$(window).height()?a-$("header").height():a-20,$("html, body").stop().animate({scrollTop:a},400,function(){b=null;$("body").removeClass("scrolling")}))}return!1}});
var c=function(){if(!$("body").hasClass("hashchange")){var a=$('a[href="'+window.location.hash+'"]');0<a.length?a.click():($('a[href="#home"]').click(),$(window).scrollTop(0))}$(".languages a").each(function(){var a=$(this).attr("href"),b=a.indexOf("#");0<=b&&(a=a.substring(0,b));$(this).attr("href",a+window.location.hash)})};$(window).bind("hashchange",c);setTimeout(c,1)});$(document).ready(function(){$(".switcher").each(function(){var b=$(this);b.on("click","a",function(){b.find("a").removeClass("active");$(this).addClass("active")})})});
