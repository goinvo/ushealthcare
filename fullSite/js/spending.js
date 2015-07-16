$( document ).ready(function() {

var margin = {top: 20, right: 50, bottom: 30, left: 50},
    width = window.innerWidth*.8 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y").parse;

var formatDate = d3.time.format("%Y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("cardinal")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.capita); })
    .defined(function(d) { return d.capita != null;});

var div = d3.select("#spending-capita-chart").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select("#spending-capita-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data_capita.csv", function(error, data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });


  var countries = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {name: name, date: d.date, capita: +d[name] || null };
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(countries, function(c) { return d3.min(c.values, function(v) { return v.capita; }); }),
    d3.max(countries, function(c) { return d3.max(c.values, function(v) { return v.capita; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("US Dollars per Capita Spent on Healthcare");

  var country = svg.selectAll(".country")
      .data(countries)
    .enter().append("g")
      .attr("class", "country")
 /*   .on("mouseover", function(d) {
      div.transition()
        .duration(200)
        .style("opacity", 1);
      div.html(d.name)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      div.transition()
      .duration(500)
      .style("opacity", 0)
    });*/

  country.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  country.append("path")
      .attr("class", "invisible hover")
      .attr("d", function(d) { return line(d.values); });


  /*country.append("text")
      .attr("class", "label-hover")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 3 ]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.capita) + ")"; })
      .attr("x", 15)
      .attr("dy", ".35em")
      .style("fill", function(d) { return color(d.name); })
      .text(function(d) { return d.name; });*/

  var point = country.append("g")
    .attr("class", "linepoint");

  point.selectAll("circle")
  .data(function(d) { return d.values })
  .enter().append("circle")
  .attr("cx", function(d) { return x(d.date)})
  .attr("cy", function(d) { return y(d.capita)})
  .attr("r", function(d) { return d.capita == null ? 0: 3})
  .style("fill", function(d) { return color(d.name) ;})
  .on("mouseover", function(d) {
    d3.selectAll(".linepoint")
      .style("opacity", 0)
      .filter(function(p) { return p.name == d.name; })
      .style("opacity", 1)
    d3.selectAll(".line")
      .style("opacity", 0.3)
      .filter(function(p) { return p.name == d.name; })
      .style("opacity", 1)
      .style("stroke-width", 3)
    div.transition()
      .duration(200)
      .style("opacity", 1);
    div.html(d.name + ", " + formatDate(d.date) + "<br/>" + "<b>" + d.capita + "</b>" + " US Dollars / Capita")
      .style("left", (d3.event.pageX + 5) + "px")
      .style("top", (d3.event.pageY + 5) + "px");
  })
  .on("mouseout", function(d) {
    div.transition()
      .duration(500)
      .style("opacity", 0)
  });

  country.selectAll(".hover")
    .data(function(d) { return d.values})
    .on("mouseover", function(d) {
      d3.selectAll(".linepoint")
        .style("opacity", 0)
        .filter(function(p) { return p.name == d.name; })
        .style("opacity", 1)
      d3.selectAll(".line")
        .style("opacity", 0.3)
        .filter(function(p) { return p.name == d.name; })
        .style("opacity", 1)
        .style("stroke-width", 3)
    div.transition()
      .duration(200)
      .style("opacity", 1);
    div.html(d.name)
      .style("left", (d3.event.pageX + 5) + "px")
      .style("top", (d3.event.pageY + 5) + "px");

    })
    .on("mouseout", function(d){
      d3.selectAll(".line")
        .style("opacity", 1)
        .style("stroke-width", null)
      d3.selectAll(".linepoint")
        .style("opacity", 0)
      div.transition()
        .duration(500)
        .style("opacity", 0)
    })
});
});
