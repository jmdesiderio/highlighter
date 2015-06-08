define(['jquery'], function($) {

	var textHighlighter = $('#js-text-highlighter'),
			tweetThisLink = $('#js-tweet-this'),
			mouseDownEvent = '',
			mouseUpEvent = '',
			prevSelection = '',
			selection = '',
			height = textHighlighter.height(),
			width = textHighlighter.width(),
			pageY = '',
			pageX = '',
			tweetHref = '',
			divTop,
			divLeft;

	var exports = {

		init: function() {
			exports.highlightText();

			return this;
		},

		highlightText: function() {

			$(document).on('mousedown', function(e) {
				mouseDownEvent = e;
			});
			$(document).on('mouseup', exports.getText);

			return this;
		},

		getText: function(e) {
			selection = document.getSelection();
			selection = selection.toString().replace(/%/, '%25');

			// When clicking on already highlighted text to clear selection,
			// document.getSelection() does not empty. The statement below makes
			// sure it clears.
			if (prevSelection === selection) {
				selection = '';
			}

			mouseUpEvent = e;

			if (mouseUpEvent.pageY < mouseDownEvent.pageY) {
				pageY = mouseUpEvent.pageY;
			} else {
				pageY = mouseDownEvent.pageY;
			}

			// Take average of mouse events
			pageX = (mouseUpEvent.pageX + mouseDownEvent.pageX) / 2;
			pageX = pageX - width / 2;

			if (selection.length > 3) {

				divTop = pageY - height;
				divLeft = pageX;

				textHighlighter.css('top', divTop);
				textHighlighter.css('left', divLeft);
				textHighlighter.addClass('visible');

				tweetHref = 'https://twitter.com/intent/tweet?url=';
				tweetHref += document.location;
				tweetHref += '/&via=cassandrareport';
				tweetHref += '&text=';
				tweetHref += selection;

				tweetThisLink.attr('href', tweetHref);

			} else {

				textHighlighter.css('top', -1000);
				textHighlighter.css('left', -1000);
				textHighlighter.removeClass('visible');

			}

			prevSelection = selection;
		}
	};

	return exports;
});
