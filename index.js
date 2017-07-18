var cellsText = [
	"Hi, who just joined?",
	"Can you e-mail that to everyone?",
	"_____, are you there?",
	"Uh, _____, you're still sharing...",
	"Hey, everyone, I have to jump t another call",
	"(sounds of someone typing, possibly with a hammer)",
	"(loud, painful echo and/or feedback)",
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
	"Can everyone see my screen?",
	"Sorry, I'm/was having connection issues",
	"I think there's a lag",
	"Sorry, didn't catch that, can you repeat?"
].sort(function(a, b){return 0.5 - Math.random()});

function createCellEl(idx) {
	var cellEl = $('<div class = "cell" id="cell-' + idx + '"></div>');
	cellEl.html(cellsText[idx]);
	// cellEl.class = "cell";
	// cellEl.id = "cell-" + idx;
	// cellEl.innerText = cellsText[idx];
	return cellEl;
}

function createRowEl(id) {
	// var rowEl = document.createElement('div');
	var rowEl = $('<div class = "row" id="' + id + '"></div>');
	// rowEl.class = 'row';
	// rowEl.id = 'row-' + id;
	return rowEl;
}

function renderCard() {
	// var cardWrapperEl = $('.card-wrapper');
	var cardWrapperEl = $('.card-wrapper');
	var rowNum = 0;
	var baseRowHtml = createRowEl(0);
	var baseCellHtml;
	for (idx=0; idx < cellsText.length; idx++) {
		if (idx%5 === 0 && idx !== 0) {
			cardWrapperEl.append(baseRowHtml);
			rowNum++;
			baseRowHtml = createRowEl(rowNum);
		}
		baseRowHtml.append(createCellEl(idx));
	}
	cardWrapperEl.append(baseRowHtml);
}

function highlightCell(shouldHighlight, idx) {
	var cellId = "#cell-" + idx;
	if (shouldHighlight) {
		$(cellId).addClass("cell-highlight");
	} else {
		$(cellId).removeClass("cell-highlight");
	}
}

function resetCellHighlights() {
	for (idx=0; idx < cellsText.length; idx++) {
		var cellId = "#cell-" + idx;
		$(cellId).removeClass("cell-highlight");
	}
}

function performSearch(e) {
	if (e.keyCode === 27) {
		$("#quick-search")[0].value = "";
		resetCellHighlights();
		return;
	}

	var query = e.target.value;
	if (query.length < 3) return resetCellHighlights();
	var currentText = "";
	var regexQuery = new RegExp(query.split(" ").join('.*'), 'i');
	for (idx=0; idx < cellsText.length; idx++) {
		currentText = cellsText[idx].toLowerCase();
		currentText.search(regexQuery) > -1 ? highlightCell(true, idx) : highlightCell(false, idx);
	}
}

// For every click, I have to check:
// * all cells in row;
// * all cells in col;
// * all cells in diagonals
// (might not make sense to check if cell is in diagonals, since card is small)

function hitBingo(cell) {

	var checkLine = function(start, inc) {
		var currentCellMarked;
		for (var count = 1; count <= 5; count++) {
			if (!($("#cell-"+start).hasClass("cell-mark"))) return false;
			start += inc;
		}
		return true;
	}

	var cellId = parseInt(cell.id.split("-")[1]);
	var startRow = Math.floor(cellId/5) * 5;
	var startCol = cellId%5;
	return checkLine(startRow, 1) || checkLine(startCol, 5) || checkLine(0, 6) || checkLine(4, 4);
}

function gameOver() {
	$('.card-wrapper').addClass('hide-wrapper');
	$('.win-prize').removeClass('hide-wrapper')
	console.log('GAME OVER!!');
}

function clickHandler(e) {
	var cell = e.target;
	$(cell).toggleClass("cell-mark");
	$("#quick-search")[0].value = "";
	if (hitBingo(cell)) return gameOver() ;
	resetCellHighlights();
}

function setEventHandlers() {
	var mouseEnterHandler = function(e) {
		$(e.target).addClass("cell-hover");
	}
	var mouseLeaveHandler = function(e) {
		$(e.target).removeClass("cell-hover");
	}
	// $(".cell").hover(mouseEnterHandler, mouseLeaveHandler);

	$(".cell").click(clickHandler);

	$("#quick-search").keyup(performSearch);

}


renderCard();
setEventHandlers();
