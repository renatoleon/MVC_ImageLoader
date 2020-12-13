((ctr) => {
	ctr.init();

	let imgSrcs = [
		{title:"Bedroom", desc:"Bedroom hight image"},
		{title:"Cybersecurity", desc:"Cybersecurity image laptop"},
		{title:"Goku Kame-Kame-Haaa", desc:"Goku kame image"},
		{title:"Java", desc:"Java language image"},
		{title:"Javascript", desc:"Javascrpt language image"},
		{title:"Migate no Goku", desc:"Goku ultra instinct migate"},
		{title:"MrRobot", desc:"Mr. Robot image times"},
		{title:"PHP", desc:"PHP language image"},
		{title:"Python", desc:"Python language image"},
		{title:"Question", desc:"Question image, light bublb"},
		{title:"Sillicon Valley", desc:"Sillicon Valley main team"},
		{title:"Sunset couple", desc:"Couple enjoying sunset"},
		{title:"Ultra Instinct", desc:"Goku ultra instinct"}
	];

	for(let i = 0; i < 5; i++) {
		ctr.loadInitialData(imgSrcs);
	}

	ctr.renderPagination();
	ctr.renderImages(1);

})(ctrl);