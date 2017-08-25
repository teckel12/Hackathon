// Create the Vue
vm = new Vue({
	el: '#vue',
	data: {
		items: [
			{ message: 'Foo' },
			{ message: 'Bar' }
		]
	}
});

$(document).ready(function(){
	/* Turns CSS transitions back on once page is ready */
	$("body").removeClass("css-transitions-off");

	// Don't cache AJAX
	$.ajaxSetup({ cache: false });

	/* Remove indicator that JavaScript is disabled */
	$("html").removeClass("no-js");

	/* Remove waiting animation */
	waitEnd();
});

function popupModal(content, confirm = false, callback) {
	waitEnd();
	$('body').addClass('popup');
	$('#popupModal .modal-copy').html(content);
	$('#popupModal').fadeIn(200);
    if (confirm == 'okay')
	    $('#popupModal .modal-copy').append('<div class="confirm-buttons"><button class="okay"><i class="fa fa-check"></i> Okay</button></div>');
    else if (confirm == true)
	    $('#popupModal .modal-copy').append('<div class="confirm-buttons"><button class="okay"><i class="fa fa-check"></i> Yes</button><button class="cancel"><i class="fa fa-times"></i> No</button></div>');
    else
	    $('#popupModal .modal-copy').append('<div class="confirm-buttons center"><button class="okay"><i class="fa fa-exclamation-triangle"></i> Okay</button></div>');        
    $('#popupModal .confirm-buttons button').click(function(event) {
        $('#popupModal').fadeOut(200);
        $('body').removeClass('popup');
        $('.modal-body').scrollTop(0);
        if (confirm == true || confirm == 'okay')
            callback($(event.target).closest('button').hasClass('okay'));
    });
}

function glutenFreeToast(message, special) {
	$('#toast').append('<div><i class="fa"></i><span>' + message + '<span></div>');
    var newToast = $('#toast').find('div:last');
	if (special == 'Occupied')
		$(newToast).addClass('occupied');
	else if (special == 'Available')
		$(newToast).addClass('available');
	else if (special == 'Error')
		$(newToast).addClass('error');
    var newToastCancel = $(newToast).find('i.fa');
    setTimeout(function() {
        $(newToast).addClass('show');
    }, 100);
    $(newToastCancel).click(function() {
        $(newToast).removeClass('show');
        setTimeout(function() {
            $(newToast).remove();
        }, 200);
    });
    setTimeout(function() {
        $(newToastCancel).trigger('click');
    }, 8000);
}

function waitStart() {
	$('body').addClass('waiting');
}

function waitEnd() {
	$('body').removeClass('waiting');
}