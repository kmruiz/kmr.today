window.addEventListener('load', () => {
    const allShortcutActions = document.querySelectorAll("a[data-ctrl]");
    const allCallbacks = {};

    for (const shortcut of allShortcutActions) {
	allCallbacks[shortcut.getAttribute("data-ctrl").toLowerCase()] = () => {
	    window.location.href = shortcut.getAttribute("href");
	}; 
    }

    window.addEventListener('keydown', (event) => {
	if (event.ctrlKey && allCallbacks[event.key]) {
	    event.stopPropagation();
	    event.preventDefault();
	    
	    allCallbacks[event.key]();
	    return false;
	}
    }, false);

    const main = document.querySelector("main");
    if (main) {
	main.focus();
    }
});

window.addEventListener('load', () => {
    const paginationPreviousPage = document.querySelector("#pagination a#previous");
    const paginationNextPage = document.querySelector("#pagination a#next")

    if (paginationPreviousPage || paginationNextPage) {
	window.addEventListener('keydown', (event) => {
	    if (event.which == 33 && paginationPreviousPage) {
		event.stopPropagation();
		event.preventDefault();
		
		window.location.href = paginationPreviousPage.getAttribute("href");
	    } else if (event.which == 34 && paginationNextPage) {
		event.stopPropagation();
		event.preventDefault();
		
		window.location.href = paginationNextPage.getAttribute("href");
	    }
	});
    }
});
