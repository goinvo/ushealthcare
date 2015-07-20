$( document ).ready(function() {

var windowW = window.innerWidth;
var windowH = window.innerHeight;
var margin = {top: 20, right: 0, bottom: 50, left: 10},
    w = windowW*.8 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;  
var barPadding = 1;



var padding = 20;

var xScale = d3.scale.ordinal()
    //.domain(d3.range(dataset.length))   // range creates [0, 1,...length(dataset)]
    .rangeRoundBands([100, w], 0.2); // .05 for spacing between bars

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yScale = d3.scale.log()      // Unnecessary
    //.domain([1, d3.max(dataset)])
    .range([h+5, 5]);

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10);


var wasteSVG = d3.select("#waste-chart")
    .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom);

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

d3.csv("data-waste.csv", function(error, data) {
    var maxProcedures = d3.max(data, function(d) {
     return d.NumberProcedures; 
    });
    var maxWaste = d3.max(data, function(d) {
     return d.Waste; 
    });
    var maxUnnecessary = d3.max(data, function(d) {
     return d.Unnecessary; 
    });

    xScale.domain(data.map(function(d) { return d.Procedure;}));
    yScale.domain([1, maxProcedures]);

    wasteSVG.append("g")
          .attr("class", "xaxis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis)
          .selectAll(".tick text")
          .call(wrap, xScale.rangeBand());

    var myAxis = wasteSVG.append("g")
        .attr("class", "yaxis")
        .call(yAxis)
        .attr()
        .style("fill", "black")
        .attr('transform', 'translate(100,0)')
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number of Procedures");

    var myPoints = wasteSVG.selectAll(".point")
        .data(data).enter()
        .append("g");

    var rectangles = myPoints.append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) {
           // make sure there are no spaces in the csv file or it won't parse
            return xScale(d.Procedure); 
        })
        .attr("y", function(d) {
            return yScale(d.NumberProcedures);
        })
        .attr("width", xScale.rangeBand())
        .attr("height", function(d) {
            return h - yScale(d.NumberProcedures);
        });


// Toggle between datasets


d3.select("#totalProcedures")
    .on("click", function() {
        yScale.domain([1, maxProcedures]);

        rectangles.transition()
            .duration(1000)
            .delay(50)
            .ease('sin-in-out')
            .attr("y", function(d, i) {
                return yScale(d.NumberProcedures);
            })
            .attr("height", function(d, i) {
                return h - yScale(d.NumberProcedures);
            });
        wasteSVG.select(".yaxis")
            .transition().duration(1000)
            .delay(50)
            .ease('sin-in-out')
            .call(yAxis)
    });

d3.select("#unnecessaryProcedures")
    .on("click", function() {
        yScale.domain([1, maxUnnecessary]);

        rectangles.transition()
            .duration(1000)
            .delay(50)
            .ease('sin-in-out')
            .attr("y", function(d) {
                return yScale(d.Unnecessary);
            })
            .attr("height", function(d) {
                return h - yScale(d.Unnecessary);
            });
        wasteSVG.select(".yaxis")
            .transition().duration(1000)
            .delay(50)
            .ease('sin-in-out')
            .call(yAxis)
    });


d3.select("#dollarsWasted")
    .on("click", function() {
        yScale.domain([1, maxWaste]);

        rectangles.transition()
            .duration(1000)
            .delay(50)
            .ease('sin-in-out')
            .attr("y", function(d) {
                return yScale(d.Waste);
            })
            .attr("height", function(d) {
                return h - yScale(d.Waste);
            });
        wasteSVG.select(".yaxis")
            .transition().duration(1000)
            .delay(50)
            .ease('sin-in-out')
            .call(yAxis)
    });
});
});