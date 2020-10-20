import React from "react"
// import * as d3 from "d3"
import SVGraph1 from "./SVGraph1";
import "./SVGraph2.css"

const d3 = window.d3;


class SVGraph2 extends React.Component {
    constructor(props) {
      super(props);
    }
  
    componentDidMount() {
      this.update();
    }
  
    update = () => {
      /*
      * Checks if our react chart component (id="chart") is already rendered.
      * If not (first time the component is intanciated : before componentDidMount) : it exits from the update function.
      * If ok (component already instanciated : during or after componentDidMount) : it runs the update function.
      */
      const chartComponentSelection = d3.select("#chart");
  
      if (chartComponentSelection.empty()) {
        console.log("First call");
        return;
      }
  
      const WIDTH = 800;
      const HEIGHT = 400;
      const margin = { top: 60, right: 60, bottom: 60, left: 60 };
  
      // Actual size of the svg
      const width = WIDTH - margin.left - margin.right;
      const height = HEIGHT - margin.top - margin.bottom;
  
      chartComponentSelection.attr(
        "style",
        "padding-bottom: " +
          Math.ceil(
            (height + margin.top + margin.bottom) *
              100 /
              (width + margin.left + margin.right)
          ) +
          "%"
      );
  
      /*
      * We clean previous graphic each time an update is needed by removing the svg element.
      * It avoids that graphics are added/displayed one after the other.
      */
      const mainSvgSelection = d3.select("svg");
      if (!mainSvgSelection.empty()) {
        mainSvgSelection.remove();
      }
  
      /*
      * Retrieves data from React parent component.
      */
      const { rates, ruler } = this.props;
  
      /*
      * Each dataset element date is "2018-07-25 10:04:00" formatted.
      * Before we call parseTime we have to call moment functions 
      * to transform the current date in "%Y-%m-%dT%H:%M:%S%Z" format.
      * Here is an example below.
      */
      
  
      /*
      * Creates a new data set (array) from the old data set (object):
      * - string values for stock prices become numeric values
      * - string values for dates become date values
      */
    //   const data = Object.keys(dataset).map(function(key) {
    //     return {
    //       date: parseTime(
    //         moment
    //           .tz(key, "YYYY-MM-DD HH:mm:ss", "America/New_York")
    //           .utc()
    //           .format()
    //       ),
    //       close: +dataset[key]["4. close"]
    //     };
    //   });

    let data = [];
    for(var i=0; i<rates.length; i++){
        let newData = {date:ruler[i], close:rates[i]}
        data.push(newData)
    }
  
    //   data.sort(function(a, b) {
    //     return a.date - b.date;
    //   });
  
      console.log("new data set is:", JSON.stringify(data));
  
      // Scales are defined to let some space for displaying axis
      // that's why margins are substracted from original WIDTH and HEIGHT
      const xScale = d3
        .scaleTime()
        .domain(
          d3.extent(data, function(d) {
            return d.date;
          })
        )
        .range([0, width]);
  
      const yScale = d3
        .scaleLinear()
        .domain(
          d3.extent(data, function(d) {
            return d.close;
          })
        )
        .range([height, 0]);
  
      // We define the line function which will build the graphic for each data "d" of new dataset : data.
      
      const line = d3
        .line()
        .x(function(d) {
          return xScale(d.date);
        })
        .y(function(d) {
          return yScale(d.close);
        });

        console.log(line(data))
  
      const svg = chartComponentSelection
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr(
          "viewBox",
          "0 0 "
            .concat(width + margin.left + margin.right)
            .concat(" ")
            .concat(height + margin.top + margin.bottom)
        )
        .style("background-color","#141429")
        .classed("svg-content", true)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      /*
      * Creates Title
      */
      svg
        .append("text")
        .attr("class", "chartTitle")
        .attr("x", width / 2)
        .attr("y", 0 - margin.top / 2)
        .style("text-anchor", "middle")
        .text("Currency Graph");
  
      /*
      * Adds xAxis
      */
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("class", "chartXAxisLabel")
        .style("color","pink")
        .attr("x", width)
        .attr("dy", "-0.5em")
        .attr("text-anchor", "end")
        .text("Time");
  
      /*
      * Adds yAxis
      */
      svg
        .append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("class", "chartYAxisLabel")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.5em")
        .attr("text-anchor", "end")
        .text("Price");
  
      // Adds horizontal grid
      svg
        .selectAll(".horizontalGrid")
        .data(yScale.ticks(10))
        .enter()
        .append("line")
        // .style("stroke","white")
        // .style("stroke-width","5px")
        .attr("class", "horizontalGrid")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", function(d) {
          return yScale(d);
        })
        .attr("y2", function(d) {
          return yScale(d);
        });
  
      // Adds line graph
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#db2d27")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

        //CODE IS FINE TILL HERE....
  
      /* 
      * Defines an area for gradiacion display
      */
      const area = d3
        .area()
        .x(function(d) {
          return xScale(d.date);
        })
        .y0(height)
        .y1(function(d) {
          return yScale(d.close);
        });
  
      // Defines gradient
      svg
        .append("linearGradient")
        .attr("id", "areachart-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr(
          "y1",
          yScale(
            d3.min(data, function(d) {
              return d.close;
            })
          )
        )
        .attr(
          "y2",
          yScale(
            d3.max(data, function(d) {
              return d.close;
            })
          )
        )
        .selectAll("stop")
        .data([
          { offset: "20%", color: "#141429" },
          { offset: "100%", color: "#DB2D27" }
        ])
        .enter()
        .append("stop")
        .attr("offset", function(d) {
          return d.offset;
        })
        .attr("stop-color", function(d) {
          return d.color;
        });
  
      // Displays gradient are
      const areaPath = svg
        .append("path")
        .datum(data)
        .style("fill", "url(#areachart-gradient)")
        .style("opacity", "0.6")
        .attr("d", area);


        //CODE WORKS FINE UNTIL HERE....
  
      const bisectDate = d3.bisector(function(d) {
        return d.date;
      }).left;
  
      function addTooltip() {
        // Group that contains the whole tooltip and the moving circle on the line
        const tooltip = svg
          .append("g")
          .attr("id", "tooltip")
          .style("display", "none");
  
        // External light blue circle of the moving circle
        tooltip
          .append("circle")
          .attr("fill", "#DB2D27")
          .attr("r", 10);
  
        // Inner blue circle of the moving circle
        tooltip
          .append("circle")
          .attr("fill", "#141429")
          .attr("stroke", "#FFE66D")
          .attr("stroke-width", "1.5px")
          .attr("r", 4);
  
        // The tooltip itself with its peak in down direction at bottom
        tooltip
          .append("polyline")
          .attr("points", "-30,0 -30,40 55,40 60,45 65,40 120,40 120,0 -30,0")
          .style("fill", "#141429")
          .style("stroke", "#DB2D27")
          .style("opacity", "0.5")
          .style("stroke-width", "2")
          .attr("transform", "translate(-60, -55)");
  
        // This tooltip will contain all our text
        const text = tooltip
          .append("text")
          .style("font-size", "13px")
          .style("font-family", "Segoe UI")
          .style("color", "#F7FFF7")
          .style("fill", "#F7FFF7")
          .attr("transform", "translate(-50, -40)");
  
        // Date element positioning
        text
          .append("tspan")
          .attr("dx", "0")
          .attr("id", "tooltip-date");
  
        // Little blue point element positioning
        text
          .append("tspan")
          .style("fill", "#3498db")
          .attr("dx", "-60")
          .attr("dy", "15")
          .text(" ");
  
        // "Price : " element positioning
        text
          .append("tspan")
          .attr("id","tooltip-text")
          .attr("dx", "-5")
          .text("Rate:");
  
        // Price value element for the selected date
        text
          .append("tspan")
          .attr("id", "tooltip-close")
          // .style("font-weight", "bold");
  
        return tooltip;
      }
  
      function mousemove() {
        const x0 = xScale.invert(d3.mouse(this)[0]);
        // const x0 = 10;
        const i = bisectDate(data, x0);
        const d = data[i];
  
        console.log("x0 date", x0);
        console.log("index ", i);
        console.log("d", d.date);
        // const tooltip = addTooltip()
        console.log(tooltip)
        tooltip.attr(
          "transform",
          "translate(" + xScale(d.date) + "," + yScale(d.close) + ")"
        );
  
        d3.select("#tooltip-date").text(d.date.toLocaleDateString());
        d3.select("#tooltip-close").text(d.close);
      }
  
      const tooltip = addTooltip();
  
      svg
        .append("rect")
        .attr("class", "overlay")
        .style("opacity","0")
        .attr("width", width)
        .attr("height", height)
  
        .on("mouseover", function() {
          tooltip.style("display", null);
        })
        .on("mouseout", function() {
          tooltip.style("display", "none");
        })
        .on("mousemove", mousemove);
    };
  
    render() {
      this.update();
      return <div id="chart" className="svg-container" />;
    }
  }


  export default SVGraph2
  
  