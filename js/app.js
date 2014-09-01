var lessOutput, rawLess,
    parser = new(less.Parser)(),
    CssCompile = {
      $style: $('textarea#output'),
      typingTimer: null,
      init: function() {
        var _this = CssCompile;
        rawLess = $('textarea#source').val();
        rawLess = "//Generated Variables" + '\n' + rawLess;
        rawLess = "@color1:" + $('#color1').val() + ';\n' + rawLess;
        rawLess = "@color2:" + $('#color2').val() + ';\n' + rawLess;
        if (rawLess) _this.compile(rawLess);
      },
      compile: function(raw) {
        var _this = CssCompile;
        parser.parse(raw, function(err, css){
          if (err) {
            lessOutput = err;
            // Do some error handling
			// or not...
          }
          if (css) {
            lessOutput = css.toCSS({ compress: false }); //TODO: control this with a checkbox on the input form
            _this.$style.text(lessOutput);
          }
        });
      }
    };

$('#generate').click(function() {
  CssCompile.init();
});