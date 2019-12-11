/* pre;pader */
function loadData() {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, 1000);
	})
}

loadData().then(() => {
	let preloaderEl = document.getElementById('wrapPreloared');
	preloaderEl.classList.add('hidden');
	preloaderEl.classList.add('visible');
});

/* head page off & main active*/

document.querySelector('.btn_portfolio').onclick = () => {
	document.querySelector('.wrapSlideshow').classList.add('wrapSlideshow_off');
	document.querySelector('.wrap-main-page').classList.add('active');
}

document.querySelector('.logo').onclick = backHomePage;
document.querySelector('#home').onclick = backHomePage;

function backHomePage() {
	document.querySelector('.wrapSlideshow').classList.remove('wrapSlideshow_off');
	document.querySelector('.wrap-main-page').classList.remove('active');
}

document.querySelector('#before-after').onclick = () => {
	document.querySelector('.gallery').classList.add('off');
	document.querySelector('.beforeAfter').classList.add('active');
}

document.querySelector('#portfolio').onclick = () => {
	document.querySelector('.gallery').classList.remove('off');
	document.querySelector('.beforeAfter').classList.remove('active');
}