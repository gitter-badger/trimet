console.log('>>> I am index.js! : ')
var data = [30, 86, 168, 281, 303, 365];
$(document).ready(function(){
  d3.select(".chart")
    .selectAll("div")
    .data(data)
      .enter()
      .append("div")
      .style("width", function(d) { return d + "px"; })
      .text(function(d) { return d; });
});
