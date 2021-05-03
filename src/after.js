console.log("STARTING AFTER SCRIPT");

const read = (key) => {
	return new Promise((resolve, reject) => {
		if (key != null) {
			chrome.storage.local.get(key, (item) => {
				console.log(`${key} item read`);
				resolve(item);
			});
		} else {
			reject(null);
		}
	});
}

const remove = (key) => {
	return new Promise((resolve, reject) => {
		if (key != null) {
			chrome.storage.local.remove(key, (result) => {
				console.log(`${key} item has been removed`);
				resolve(result);
			});
		} else {
			reject(null);
		}
	});
}

read('divNames')
	.then(result => {
		let storedDivNames = result.divNames;
		let newDivNames = [];
		let newNodes = Array.from( document.querySelectorAll( 'body > *' ) );

		newNodes.forEach(node => {
			if (node.className) {
				newDivNames.push(node.className);
			}
		});

		let differences = newDivNames.filter(newDiv => !storedDivNames.find(stored => stored === newDiv));

		return differences.toString().split(/,| /);
	})
	.then((differences) => {
		document.body.style.overflow = 'visible';
		differences.forEach(diff => {
			console.log("DIFF NAME: " + diff);
			Array.from(document.getElementsByClassName(diff))
				.forEach(elem => {
					elem.className = diff;
					elem.style.display = 'none';
					console.log(`${elem.className} style added`);
				});
		});
	})
	.then(() => {
		return remove('divNames');
	})
	.then(() => {
		return remove('clicked');
	})
	.catch(err => {
		console.log("ERROR " + err.message);
	})









