let divNames = [];
let nodes = Array.from( document.querySelectorAll( 'body > *' ) );

nodes.forEach(node => {
	if (node.className) {
		divNames.push(node.className);
	}
});

chrome.storage.local.set({'divNames': divNames}, () => {
	console.log("BEFORE SCRIPT FINISHED");
});










