// Function to apply custom scrollbar styles dynamically
function applyCustomScrollbarStyles(element) {
    element.style.scrollbarWidth = 'thin'; // For Firefox
    element.style.scrollbarColor = '#888 #f1f1f1'; // For Firefox

    // For Webkit browsers (Chrome, Safari, Edge)
    let style = document.createElement('style');
    style.innerHTML = `
        #${element.id}::-webkit-scrollbar {
            width: 12px;
        }
        #${element.id}::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        #${element.id}::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 10px;
            border: 2px solid #f1f1f1;
        }
        #${element.id}::-webkit-scrollbar-thumb:hover {
            background-color: #555;
        }
    `;
    document.head.appendChild(style);
}

// Apply custom scrollbar styles to a specific element
document.addEventListener("DOMContentLoaded", function() {
    let customElement = document.getElementById('custom-scroll-element');
    if (customElement) {
        applyCustomScrollbarStyles(customElement);
    }
});