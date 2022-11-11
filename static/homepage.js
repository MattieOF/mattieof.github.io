$(document).ready(function(){
  var owl = $(".owl-carousel");
  owl.owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots:true,
    lazyLoad:true,
    center:true,
    responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      }
    }
  }
  );

  owl.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY>0) {
        owl.trigger('next.owl');
    } else {
        owl.trigger('prev.owl');
    }
    e.preventDefault();
  });

  var elements = document.querySelectorAll( 'img' );
	Intense( elements );
});
