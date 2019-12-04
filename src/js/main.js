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

document.querySelector('.portfolio').onclick = () => {
	document.querySelector('.wrapSlideshow').classList.add('wrapSlideshow_off');
	document.querySelector('header').classList.add('active');
}