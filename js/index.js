

const gData = fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
  .then((resp) => resp.json()) // Transform the data into json
  .then(function (data) {
    const padding = { left: 40, top: 40, right: 40, bottom: 70 }
    const width = 1000 - padding.left - padding.right;
    const height = 700 - padding.top - padding.bottom;

    console.log(data);
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
      .attr("cx", (d, i) => xScale(Year[i]))
      .attr("cy", (d, i) => yScale(Seconds[i]))
      .attr("r", 5)

    circle.selectAll("title")
      .data(data)
      .enter()
      .append("title")
      .text((d, i) => Name[i] + ": " + Nation[i] + "\nYear: " + Year[i] + ", Time: " + Time[i] + "\n\n" + Doping[i] )

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svgContainer.append("g")
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxis);

    svgContainer.append("g")
      .attr("transform", "translate(" + padding.bottom +", 0)")
      .call(yAxis)
      .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  })

