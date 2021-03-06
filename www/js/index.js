var renderPie = function(jsondata) {
    console.log ('inside the method'+ jsondata);
    $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'State wise distribution of Community Radio in India '
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: jsondata,
        }]
     
    
});
}



$(document).ready(function(){
 
 $.ajax({
    type: "GET",
             dataType: 'jsonp',
             url: "http://104.131.60.8:3010/radio/",
             
             crossDomain : true , 
             success: function(jsondata) {
                  var jsonstring = JSON.stringify(jsondata);
             
                 // call the method which would render chart
                 renderPie(jsondata);

             

                
             },
             error: function(xhr, textStatus, errorThrown){
                alert('request failed '+textStatus+" "+errorThrown);
             
            }
          });
});