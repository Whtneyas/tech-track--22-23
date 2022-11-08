const seconds = 10;
function getData() {
	console.log("loading data");
	fetch('https://www.kaggle.com/datasets/unanimad/disney-plus-shows?resource=download')
	.then(res => res.json())
	.then(data => {
	})
}


setInterval(getData, seconds * 1000)
getData();

