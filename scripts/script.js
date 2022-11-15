import * as d3 from 'd3'; // Imports d3
import { sliderVertical} from 'd3-simple-slider';
import { gsap } from "gsap";

console.log(gsap)

fetch("https://opensheet.elk.sh/1f5wvv49lvYW2vM40luDgN3o8nVq4xOdEHtgyKKgqr28/disney_plus_titles")
		.then((response) => response.json())
		.then((data) => console.log(data));



const div = document.createElement("div") //creates a div element 
document.querySelector('body').appendChild(div)
const slider = sliderVertical().min(0).max(10).step(1).width(300).height(500);

const g = d3
  .select(div)
  .append('svg')
  .attr('width', 500)
  .attr('height', 500)
  .append('g')
  .attr('transform', 'translate(30,30)');

 g.call(slider);



			

