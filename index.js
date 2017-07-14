var cellsText = [
	"Hi, who just joined?",
	"Can you e-mail that to everyone?",
	"_____, are you there?",
	"Uh, _____, you're still sharing...",
	"Hey, everyone, I have to jump t another call",
	"(sounds of someone typing, possibly with a hammer)",
	"(loud, painful echo/feedback)",
	"(child or animal noises)",
	"Hi, can you all hear me?",
	"Nope, it's still loading",
	"Next slide, please",
	"If you're not speaking, please go on mute",
	"I'm sorry, I was on mute",
	"(for overtalkers) Sorry, go ahead",
	"Hello? Hello?",
	"So, I c.....and th......by tom..........., sounds good?",
	"Sorry I'm late, (insert lame excuse)",
	"I have a hard stop at (insert time)",
	"I'm sorry, you cut out there",
	"Can we take this offline?",
	"I'll have to get back to you on that one",
	"Can everyone see my screen",
	"Sorry, I'm/was having connection issues",
	"I think there's a lag",
	"Sorry, didn't catch that, can you repeat?"
].sort(function(a, b){return 0.5 - Math.random()});

function createCellEl(idx) {
	var cellEl = document.createElement('div');
	cellEl.className = "cell";
	cellEl.id = "cell-" + idx;
	cellEl.innerText = cellsText[idx];
	return cellEl;
}

function createRowEl(id) {
	var rowEl = document.createElement('div');
	rowEl.className = 'row';
	rowEl.id = 'row-' + id;
	return rowEl;
}

function renderCard() {
	// var wrapperEl = $('.wrapper');
	var wrapperEl = document.getElementsByClassName('wrapper')[0];
	var rowNum = 0;
	var baseRowHtml = createRowEl(0);
	var baseCellHtml;
	for (idx=0; idx < cellsText.length; idx++) {
		if (idx%5 === 0 && idx !== 0) {
			wrapperEl.appendChild(baseRowHtml);
			rowNum++;
			baseRowHtml = createRowEl(rowNum);
		}
		baseRowHtml.appendChild(createCellEl(idx));
	}
	wrapperEl.appendChild(baseRowHtml);
}

renderCard();
