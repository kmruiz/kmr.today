window.addEventListener('load', () => {
    const allShortcutActions = document.querySelectorAll("a[data-ctrl]");
    const allCallbacks = {};

    for (const shortcut of allShortcutActions) {
	allCallbacks[shortcut.getAttribute("data-ctrl").toLowerCase()] = () => {
	    window.location.href = shortcut.getAttribute("href");
	}; 
    }

    window.addEventListener('keydown', (event) => {
	console.log(event.key);
	if (event.ctrlKey && allCallbacks[event.key]) {
	    event.stopPropagation();
	    event.preventDefault();
	    
	    allCallbacks[event.key]();
	    return false;
	}
    }, false);
    
});
