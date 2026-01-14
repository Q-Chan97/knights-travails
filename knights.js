function knightMoves(startSquare, endSquare) {
    if (isOutOfBounds(startSquare)) throw new Error("Your start coordinates are not in bounds."); // Guards for coordinates
    if (isOutOfBounds(endSquare)) throw new Error("Your end coordinates are out of bounds.")
    
    
}

function isOutOfBounds([x, y]) { // Will return true if coordinate numbers are bigger than 7 or smaller than 0
    return (x < 0 || x > 7 || y < 0 || y > 7); 
}