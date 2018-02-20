if (typeof jQuery === 'undefined')
{
	console.log('Link it requires jQuery to run');
}
else
{
	(function ($)
	{
		"use strict";

		$.fn.linkIt = function (options)
		{
			let settings = $.extend({
										linkColor: "#ff0000",
										linkClass: '',
										link: {
											word: '',
											url: ['#']
										},
										linkTitle: '',
										newWindow: false,
										caseSensitive: false
									}, options);
			if (!(settings.link.url instanceof Array))
				settings.link.url = [settings.link.url];

			let str = $(this);
			console.log(str);

			let search = "\\b" + settings.link.word + "\\b";
			let content = $(this).html();
			let counter = 0;
			do
			{
				counter++;
				let newLink = $('<a></a>');

				let randomLink = settings.link.url[Math.floor(Math.random() * settings.link.url.length)];

				let query = search,
					flags = settings.caseSensitive === true ? '' : 'i',
					target = settings.newWindow === true ? '_blank"' : '_self',
					linkClass = settings.linkClass !== '' ? settings.linkClass : '',
					title = settings.linkTitle !== '' ? newLink.attr('title', settings.linkTitle) : '',
					regex = new RegExp(query, flags);

				newLink.attr('href', randomLink);
				newLink.attr('target', target);
				newLink.css('color', settings.linkColor);
				newLink.addClass(linkClass);
				newLink.text(settings.link.word);
				newLink = newLink.get(0).outerHTML;

				content = content.replace(regex, newLink);
			}
			while (content.match(search)) ;

			return $(this).html(content);
		}

	})(jQuery);
}
