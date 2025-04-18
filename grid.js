const grid = document.getElementById('grid');
const resetBtn = document.getElementById('resetBtn');
const generateBtn = document.getElementById('generateBtn');
const binaryOutput = document.getElementById('binary-output');
const colorOptions = document.querySelectorAll('.color-option');

// Create 20x20 grid
const gridSize = 20;
const cells = [];
let selectedColor = 'white';

// Color to number mapping
const colorToNumber = {
    'white': 0,
    'black': 1,
    'blue': 3,
    'orange': 4
};

// Initialize the grid
function initializeGrid() {
    grid.innerHTML = '';
    cells.length = 0;
    
    for (let i = 0; i < gridSize; i++) {
        cells[i] = [];
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            
            cell.addEventListener('click', () => {
                // Remove all color classes
                cell.classList.remove('black', 'blue', 'orange');
                // Add the selected color class
                if (selectedColor !== 'white') {
                    cell.classList.add(selectedColor);
                }
            });
            
            grid.appendChild(cell);
            cells[i][j] = cell;
        }
    }
}

// Handle color selection
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove selected class from all options
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        // Add selected class to clicked option
        option.classList.add('selected');
        // Update selected color
        selectedColor = option.dataset.color;
    });
});

// Reset all cells to white
function resetGrid() {
    cells.forEach(row => {
        row.forEach(cell => {
            cell.classList.remove('black', 'blue', 'orange');
        });
    });
    binaryOutput.textContent = '';
}

// Generate matrix with numbers and export as JSON
function generateMatrix() {
    const matrix = [];
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            const cell = cells[i][j];
            let number = 0;
            
            if (cell.classList.contains('black')) {
                number = 1;
            } else if (cell.classList.contains('blue')) {
                number = 3;
            } else if (cell.classList.contains('orange')) {
                number = 4;
            }
            
            row.push(number);
        }
        matrix.push(row);
    }

    // Create JSON data
    const jsonData = JSON.stringify(matrix, null, 2);
    
    // Create a data URL
    const dataUrl = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonData);
    
    // Create and style the download link
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'pixel_matrix.json';
    a.style.display = 'none';
    document.body.appendChild(a);
    
    // Trigger download
    a.click();
    
    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
    }, 100);
}

// Event listeners
resetBtn.addEventListener('click', resetGrid);
generateBtn.addEventListener('click', generateMatrix);

// Initialize the grid when the page loads
initializeGrid(); 
