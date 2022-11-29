import * as d3 from 'd3'; // Imports d3
import { transition } from 'd3';
import { gsap } from "gsap";

var logo = document.querySelector(".logo")
gsap.from(logo,{
    y: -200,
    duration:2,
})

