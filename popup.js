document.addEventListener('DOMContentLoaded', function() {
    const bookmarksList = document.getElementById('bookmarks-list');

    chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
        bookmarkTreeNodes.forEach(function(node) {
            displayBookmarks(node, bookmarksList);
        });
    });

    function displayBookmarks(node, list) {
        if (node.children) {
            node.children.forEach(function(childNode) {
                displayBookmarks(childNode, list);
            });
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = node.title;
            listItem.onclick = function() {
                chrome.tabs.create({ url: node.url });
            };
            list.appendChild(listItem);
        }
    }
});