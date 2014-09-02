var rawLess = null;

function getDeclaration(variableName, value, wrapInQuotes) {
	if (value !== '' && value !== null && typeof value != 'undefined') {
		if (!wrapInQuotes) {
			return variableName + ':' + value + ';\n';
		} else {
			return variableName + ': "' + value + '";\n';
		}
	} else {
		return '';
	}
}

$(function() {
	$.ajax({
		url : './less_template.less',
		async: false,
		success : function (lessFile) {
			rawLess = lessFile;
		}
	});
	
	$('.extra').hide();
});

$(function() {
	var lessOutput,
		parser = new(less.Parser)(),
		CssCompile = {
		  $style: $('textarea#output'),
		  typingTimer: null,
		  init: function() {
			if (rawLess !== null && typeof rawLess != 'undefined') {
				
				//TODO: auto-generate the input fields based on the contents of the LESS template itself
				rawLess = rawLess + getDeclaration('@color1', $('#color1').val());
				rawLess = rawLess + getDeclaration('@color2', $('#color2').val());
				rawLess = rawLess + getDeclaration('@color3', $('#color3').val());
				rawLess = rawLess + getDeclaration('@url1', $('#url1').val(), true);
				rawLess = rawLess + getDeclaration('@url2', $('#url2').val(), true);
				rawLess = rawLess + getDeclaration('@misc1', $('#misc1').val());
				rawLess = rawLess + getDeclaration('@misc2', $('#misc2').val());
				CssCompile.compile(rawLess);
			}
		  },
		  compile: function(raw) {
			parser.parse(raw, function(err, css){
			  if (err) {
				lessOutput = err;
				CssCompile.$style.text(lessOutput);
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
	  setTimeout(function() {
		//select all text after compilation is complete
		$('textarea#output').select();
	  }, 100);
	});
});