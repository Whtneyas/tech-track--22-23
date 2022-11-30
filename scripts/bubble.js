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
  var width = window.innerWidth,height = 500
  var simulation = d3.forceSimulation(dataSet)
    .force('charge', d3.forceManyBody().strength(5))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(22))
    .on('tick', ticked);
}
// drawChart(selectie);

// Groepje cirkels maken
function ticked(updatedData) {
  d3.select('svg')
    .attr('width', window.innerWidth)
    .attr('height', 500)
    .selectAll('circle')
    .data(updatedData || dataSet)
    .join('circle')
    .attr('r', 20)
    .style('fill', '#00FFFF')
    .style('stroke', '#00FFFF')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    

  //Text binnen de cirkels plaatsen
  d3.select('svg')
    .selectAll('text')
    .data(updatedData || dataSet)
    .join('text')
    .text(d => d.title)
    .attr('fill', 'black')
    .attr('font-size', '4px')
    .attr('text-anchor', 'middle')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
   

    //Hoverstate 
    .on("mouseover touchstart", (e, d) =>
      d3
      .select(".tooltip")
      .transition()
      .duration(175)
      .style("opacity", 1)
      .text(`${d.title} 
      ${d.description}
      ${d.type}`) 
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
function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(.03).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}
function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(.03);
  d.fx = null;
  d.fy = null;
}




// function applyFilter(event) {
//   console.log(event.target.value)

//   if(event.target.value !== 'all') {
//     let range = event.target.value.split('-');
//     let newData = theData.filter(film => {
//       return film.listed_in >= Number(range[0]) && film.listed_in <= Number(range[1])
//     })
//     drawChart(newData);
//     // ticked(newData)

//     console.log(newData);
//   } else {
//     drawChart(theData)
//     // ticked(theData)
//   }

// }

// window.addEventListener('DOMContentLoaded', () => {
//   d3.selectAll('button').on('click', applyFilter)
//  })