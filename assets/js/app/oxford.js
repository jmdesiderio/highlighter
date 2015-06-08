define(['app/toggle-expand', 'app/highlighter'], function(toggleExpand, highlighter) {

	var bodyId = document.body.id;

	toggleExpand.init();
	highlighter.init();

	var exports = {
		init: function() {

			return this;
		}
	};

	return exports;
});
