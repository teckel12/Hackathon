var todo;

// Create the Vue
vm = new Vue({
	el: '#vue',
	data: {
		todo: todo
	},
	created: function() {
		window.addEventListener('keydown', this.keydown)
	},
	methods: {
		remove: function(index, title) {
			popupModal('Are you sure you want to delete: <b>' + title + '</b>?', true, function (confirmed) {
				if (confirmed) {
					vm.todo.splice(index, 1);
					saveTodo();
				}
			});
		},
		expand: function() {
			var isExpanded = $(event.target).hasClass('fa-chevron-up');
			$('#vue .content').slideUp();
			$('#vue .expand').addClass('fa-chevron-down');
			$('#vue .expand').removeClass('fa-chevron-up');
			if (!isExpanded) {
				var content = $(event.target).parent().parent().find('.content');
				var converter = new showdown.Converter(),
					text      = $(content).find('textarea').val(),
					html      = converter.makeHtml(text);
				$(content).find('.markdown').html(html);
				$(content).slideDown();
				$(event.target).addClass('fa-chevron-up');
				$(event.target).removeClass('fa-chevron-down');
			}
		},
		add: function() {
			$('#vue .content').slideUp();
			$('#vue .expand').addClass('fa-chevron-down');
			$('#vue .expand').removeClass('fa-chevron-up');
			vm.todo.push({
				'timestamp': new Date().toDateInputValue(),
				'title': '',
				'content': ''
			});
			setTimeout(function() {
				$('#todo div:last-child .content').slideDown();
				$('#todo div:last-child .expand').addClass('fa-chevron-up');
				$('#todo div:last-child .expand').removeClass('fa-chevron-down');
			}, 1);
			saveTodo();
		},
		save: function() {
			saveTodo();
		},
		keyup: function() {
			var converter = new showdown.Converter(),
				text      = $(event.target).val(),
				html      = converter.makeHtml(text);
			$(event.target).siblings('.markdown').html(html);
		},
		keydown: function (event) {
			var keyCode = event.keyCode || event.which;
			if (keyCode == 9 && event.target.localName == 'textarea') {
				event.preventDefault();
				var start = $(event.target).get(0).selectionStart;
				var end = $(event.target).get(0).selectionEnd;
				spaces = "\t"
				$(event.target).val($(event.target).val().substring(0, start)
					+ spaces 
					+ $(event.target).val().substring(end));

				// put caret at right position again
				$(event.target).get(0).selectionStart =
				$(event.target).get(0).selectionEnd = start + 1;
			}
		}
	}
});

$(document).ready(function(){
	// Don't cache AJAX
	$.ajaxSetup({ cache: false });

	/* Load JSON todo file */
	$.getJSON( "/data/todo.json", function(json) {
		todo = json;
		vm.todo = todo;
	});

	/* Sort buttons */
	$('#dueSort').click(function() {
		todo.sortTodoDue();
		saveTodo();
	});
	$('#titleSort').click(function() {
		todo.sortTodoTitle();
		saveTodo();
	});

	/* Remove waiting animation */
	waitEnd();
});

function saveTodo() {
	waitStart();
	$.ajax({
		type : "POST",
		url : "ajaxSaveTodo.php",
		data : {
			json : JSON.stringify(vm.todo),
		},
		success: function(result) {
			waitEnd();
			glutenFreeToast('Todo list saved');
		},
		error: function(xhr, status, error) {
			popupModal("<h1>Error</h1><br>Error saving todo list");
		}
	});
}

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
    }, 5000);
}

function waitStart() {
	$('body').addClass('waiting');
}

function waitEnd() {
	$('body').removeClass('waiting');
}

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

Array.prototype.sortTodoDue = (function() {
	this.sort(function(a, b) {
		if (a.timestamp < b.timestamp)
			return -1;
		if (a.timestamp > b.timestamp)
			return 1;
		return 0;
	});
    return this;
});

Array.prototype.sortTodoTitle = (function() {
	this.sort(function(a, b) {
		if (a.title < b.title)
			return -1;
		if (a.title > b.title)
			return 1;
		return 0;
	});
    return this;
});