import * as d3 from 'd3'; // Imports d3
import { gsap } from "gsap";

let theData;

let dataSet = d3.json('../disney.json')
  .then(d => dataSet = d)
  .then(d => {
    theData = d.filter(item => item.release_year >= "2021");
    drawChart(theData)
  })
  .catch(e => console.log("dataophalenmislukt"));

  
// de layout van de bubble creeeren
function drawChart(dataSet) {
var width = window.innerWidth,height = 550
  var simulation = d3.forceSimulation(dataSet)
      .force('charge', d3.forceManyBody().strength(10))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(22))
      .on('tick', ticked);

    d3.select('svg')
      .attr('width', window.innerWidth)
      .attr('height', 500)
      .selectAll('circle')
      .data(dataSet)
      .join('circle')
      .attr('r', 20)
      .style('fill', '#00FFFF')

    .on("mouseover touchstart", (e, d) =>
      d3
      .select(".tooltip")
      .transition()
      .duration(175)
      .style("opacity", 1)
      .text(`${d.title}${d.description}${d.type}`)  
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
    )

    // Positie van de tooltip
    .on("mousemove", (e) =>
      d3
      .select(".tooltip")
      .style("left", e.pageX + 15 + "px")
      .style("top", e.pageY + 15 + "px")
    )

    // Als de muis buiten de cirkel komt, verberg ik de tooltip
    .on("mouseout", e => d3.select(".tooltip").style("opacity", 0));
    
    //Als je ergens buiten de cirkel tapt , verberg ik de tooltip
    d3.select("body").on("touchend", e =>
    d3.select("#tooltip").style("opacity", 0));

}

// Groepje cirkels maken
function ticked() {
  d3.select('svg')
    .selectAll('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
}

function applyFilter(event) {
  // console.log(event.target.value)
 let range,newData;

  if(event.target.value !== 'all') {
    // console.log(theData)
    newData = theData.filter(film => {
      return film.listed_in.includes(event.target.value)
    })
    drawChart(newData);
    // ticked(newData)

    // console.log(newData);
  } else {
    drawChart(theData)
    // ticked(theData)
  }

}

window.addEventListener('DOMContentLoaded', () => {
  d3.selectAll('button').on('click', applyFilter)
 })