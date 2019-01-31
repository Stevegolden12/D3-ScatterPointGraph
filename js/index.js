

const gData = fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
  .then((resp) => resp.json()) // Transform the data into json
  .then(function (data) {
    const padding = {left: 40, top: 40, right: 40, bottom: 70}
    const width = 1000 - padding.left - padding.right;
    const height = 700 - padding.top - padding.bottom;

    console.log(data);
    const Time = data.map((arr) => arr.Time);
    const Place = data.map((arr) => arr.Place);
    const Seconds = data.map((arr) => arr.Seconds);
    const Name = data.map((arr) => arr.Name);
    const URL = data.map((arr) => arr.URL);
    const Doping = data.map((arr) => arr.Doping)
    const Year = data.map((arr) => arr.Year)

    var xScale = d3.scaleLinear()
      .domain([d3.min(Year), d3.max(Year)])
      .range([padding.left, height]);

    var yScale = d3.scaleLinear()
      .domain([d3.min(Seconds), d3.max(Seconds)])
      .range([width, padding.bottom]);

    
    var svgContainer = d3.select("#title")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "lightblue")
      

    var circle = svgContainer.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i)=> xScale(Year[i]))
      .attr("cy", (d, i) => yScale(Seconds[i]))
      .attr("r", 5)
      
  })

