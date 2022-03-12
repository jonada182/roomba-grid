/**
 * @class Roomba
 * @description Creates a grid and renders an item to move across the board
 */

class Roomba {

    /**
     * Initialize main parameters
     * @param {number} xSize max number of columns
     * @param {number} ySize max number of rows
     * @param {string} cursorImage element to be render
     */

    constructor (xSize, ySize, cursorImage) {
    
        this.cursor = cursorImage ? cursorImage : 'roomba.png';
        this.x = 0;
        this.y = 0;
        this.direction = 'up';
    
        this.xSize = xSize ? xSize : 10;
        this.ySize = ySize ? ySize : 10;
    }

    /**
     * Initializes the Roomba grid and listeners
     * @param {object} options (Eg. {gridSelector, turnRightBtnSelector, moveForwardBtnSelector})
     */

    init = (options) => {

        this.grid = document.querySelector(options.gridSelector);

        this.turnRightBtnSelector = options.turnRightBtnSelector;
        this.moveForwardBtnSelector = options.moveForwardBtnSelector;

        const turnRightBtn = document.querySelector(this.turnRightBtnSelector);
        const moveForwardBtn = document.querySelector(this.moveForwardBtnSelector);
        
        // Add click listeners
        
        turnRightBtn.addEventListener('click', (e) => {
            this.turnRight();
            e.preventDefault();
        });
        
        moveForwardBtn.addEventListener('click', (e) => {
            this.moveForward();
            e.preventDefault();
        });

        this.drawBoard();
    }

    /**
     * Renders the Roomba grid and the cursor element
     */

    drawBoard = () => {

        for (let columnIndex = 0; columnIndex < this.xSize; columnIndex++) {

            let column = document.createElement('div');
            column.classList.add('Column');

            for (let rowIndex = 0; rowIndex < this.ySize; rowIndex++) {
                let row = document.createElement('div');
                row.classList.add('Cell');
                column.appendChild(row);
            }

            this.grid.appendChild(column);
        }

        this.renderCursor();

    }

    /**
     * Returns the cursor element
     * @returns {HTMLElement}
     */

    getCursor = () => {
        return document.querySelector('.Cursor');
    }

    /**
     * Create new cursor element for the current direction and position
     */

    renderCursor = () => {

        // Clear current cursor element
    
        let cursorElement = this.getCursor();

        if (cursorElement) {
    
            cursorElement.remove();

        }
    
        // Get cell in the right coordinates
    
        let currentCell = document.querySelectorAll('.Cell')[this.getCellPosition()];
    
        // Append the cursor with the right rotation class

        if (currentCell) {
    
            currentCell.innerHTML = `<div class="Cursor ${ this.direction }"><img src="${ this.cursor }" alt="^"/></div>`;

        }
    }

    /**
     * Returns the index of the current cell
     * @returns int
     */

    getCellPosition = () => {
        return (this.x * this.xSize) + this.y;
    }

    /**
     * Changes the direction clockwise
     */

    turnRight = () => {

        switch (this.direction) {
            case 'right':
                this.direction = 'down';
            break;
    
            case 'down':
                this.direction = 'left';
            break;
    
            case 'left':
                this.direction = 'up';
            break;
    
            case 'up':
                this.direction = 'right';
            break;
        }
        
        let cursorElement = this.getCursor();

        if (cursorElement) {

            cursorElement.classList = `Cursor ${ this.direction }`;

        }

    }

    /**
     * Move one step to the right / horizontally (X axis)
     */

    moveRight = () => {
        this.x++;
    }

    /**
     * Move one step down / vertically (Y axis)
     */

    moveDown = () => {
        this.y++;
    }

    /**
     * Move one step to the left / horizontally (X axis)
     */

    moveLeft = () => {
        this.x--;
    }

    /**
     * Move one step up / vertically (Y axis)
     */

    moveUp = () => {
        this.y--;
    }

    /**
     *  Move forward based on the current direction and cell position
     */

    moveForward = () => {

        let cursorEnd = false;

        // Move in the current direction as long as the cursor is able to move forward 

        if (this.direction == 'right' && this.x < (this.xSize - 1)) {
            
            this.moveRight();

        } else if (this.direction == 'down' && this.y < (this.ySize - 1)) {
            
            this.moveDown();

        } else if (this.direction == 'left' && this.x > 0) {
            
            this.moveLeft();

        } else if (this.direction == 'up' && this.y > 0) {
            
            this.moveUp();

        } else {

            cursorEnd = true;
        }

        if (cursorEnd) {

            // Turn clockwise if the cursor has reached the wall on any direction 

            this.turnRight();

        } else {

            // Render cursor with new direction and position 

            this.renderCursor();
        }
        
    }

}
