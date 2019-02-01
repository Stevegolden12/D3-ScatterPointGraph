
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
  .then((resp) => resp.json()) // Transform the data into json
  .then(function (data) {

    const padding = { left: 40, top: 40, right: 40, bottom: 70 }
    const width = 1000 - padding.left - padding.right;
    const height = 700 - padding.top - padding.bottom;
   
    const Time = data.map((arr) => arr.Time);
    const Place = data.map((arr) => arr.Place);
    const Seconds = data.map((arr) => arr.Seconds);
    const Name = data.map((arr) => arr.Name);
    const Nation = data.map((arr) => arr.Nationality);
    const URL = data.map((arr) => arr.URL);
    const Doping = data.map((arr) => arr.Doping)
    const Year = data.map((arr) => arr.Year)

   
    var xScale = d3.scaleLinear()
      .domain([d3.min(Year), d3.max(Year)])
      .range([padding.bottom, width]);

    var yScale = d3.scaleLinear()
      .domain([d3.min(Seconds), d3.max(Seconds)])
      .range([height, padding.bottom]);

    var svgContainer = d3.select("#svgWrapper")
      .append("svg")
      .attr("width", 950)
      .attr("height", 650)
      .attr("padding", "40px 40px 40px 70px")
      .style("background-color", "lightblue")

    var circle = svgContainer.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("data-xvalue", (d, i) => xScale(Year[i]))
      .attr("data-yvalue", (d, i) => yScale(Seconds[i]))
      .attr("cx", (d, i) => xScale(Year[i]))
      .attr("cy", (d, i) => yScale(Seconds[i]))
      .attr("r", 5)

    console.log(data[0].Name)

    var index = 0
    circle
      .append("title")
      .text((d, i) => Name[i] + ": " + Nation[i] + "\nYear: " + Year[i] + ", Time: " + Time[i] + "\n\n" + Doping[i])

    const xAxis = d3.axisBottom(xScale)
         .tickFormat(d3.format("d"))
 

    const yAxis = d3.axisLeft(yScale)
       .tickFormat(function (d, i) {
        return Math.floor(d / 60) + ":" + ((d%60) < 10 ? (d%60) + "0" : (d%60));
      });
 
    svgContainer.append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxis);

    svgContainer.append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + padding.bottom +", 0)")
      .call(yAxis)

  })

