var rawLess = null;

var getDeclaration(variableName, value) {
	if (!!value) {
		return variableName + ':' + value + ';\n';
	}
};

$(function() {
	$.ajax({
		url : './less_template.less',
		async: false,
		success : function (lessFile) {
			rawLess = lessFile;
		}
	}); 
});

$(function() {
	var lessOutput,
		parser = new(less.Parser)(),
		CssCompile = {
		  $style: $('textarea#output'),
		  typingTimer: null,
		  init: function() {
			if (rawLess !== null && typeof rawLess != 'undefined') {
				
				rawLess = getDeclaration('@misc2', $('#misc2').val()) + rawLess;
				rawLess = getDeclaration('@misc1', $('#misc1').val()) + rawLess;
				rawLess = getDeclaration('@url2', $('#url2').val()) + rawLess;
				rawLess = getDeclaration('@url1', $('#url1').val()) + rawLess;
				rawLess = getDeclaration('@color2', $('#color2').val()) + rawLess;
				rawLess = getDeclaration('@color1', $('#color1').val()) + rawLess;
				rawLess = "//Generated Variables" + '\n' + rawLess;

				CssCompile.compile(rawLess);
			}
		  },
		  compile: function(raw) {
			parser.parse(raw, function(err, css){
			  if (err) {
				lessOutput = err;
				// Do some error handling...or not
			  }
			  if (css) {
				lessOutput = css.toCSS({ compress: $('#shouldMinify').is(':checked') }); //TODO: control this with a checkbox on the input form
				CssCompile.$style.text(lessOutput);
			  }
			});
		  }
		};

	$('#generate').click(function() {
	  CssCompile.init();
	});
});