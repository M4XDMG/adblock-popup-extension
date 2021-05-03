document.body.style.overflow = 'visible';

let divs = [" fb_reset", "layer xl_layer", "sticky", "container", "m-cf-search modal", "m-cf-indalista", "m-cf-kiadvanylista", "m-cf-fejlec", "fixed-header fixed-header-dropdown-container inactive scroll-at-top", "site-header", "container top_szponzor adverticum-kapubanner", "topszponzor topszponzor--container", "elelele container top_szponzor adverticum-kapubanner", "container border", "m-page-footer", "m-galeria", "layout_watcher phone", "layout_watcher portrait-tablet", "layout_watcher landscape-tablet", "layout_watcher desktop", "cblk", "glr_container glr_unselectable fast glr_wide", "glyph close icon-close", "adsbymgid AdBar microsite"];
let actualDivs = [];

let nodesArr = Array.from( document.querySelectorAll( 'body > *' ) );

nodesArr.forEach(node => {
	if (node.className) {
		actualDivs.push(node.className);
	}
})

var difference = actualDivs.filter(newDiv => !divs.find(div => newDiv == div));
document.getElementsByClassName(difference)[0].style.display = 'none';

