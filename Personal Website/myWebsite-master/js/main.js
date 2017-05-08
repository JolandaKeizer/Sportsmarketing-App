

function hey(){
	alert('hi');
}

var myAnonFunc = function() { 
	alert("I'am a full stack developer, maybe I can help you?"); 
}

$(function(){
    $(".flip").flip({
        trigger: 'hover',
        speed: 2000,
    });
});

jQuery(document).ready(function(){
	$('.skillbar').each(function(){
		jQuery(this).find('.skillbar-bar').animate({
			width:jQuery(this).attr('data-percent')
		},6000);
	});
});