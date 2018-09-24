  function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  }
  $("#search").on('change', function(ev) {
    var country = $(this).val();
    var formattedCountryName = toTitleCase(country);
    var uri = 'https://api.population.io/1.0/population/2018/'+formattedCountryName+'/18';
    $.ajax({
      url: uri,
      method : 'GET',
      success: function(data) {
        var res = data[0];
		$('#main-card').show();
        $('#male').html(res.males);
        $('#female').html(res.females);
        $('#total').html(res.total);
      },
      error: function(errorInfo) {
        console.log(errorInfo);
		$('#main-card').hide();
      }
    })
  });


