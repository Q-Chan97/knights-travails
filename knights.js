function knightMoves(startSquare, endSquare) {
    if (isOutOfBounds(startSquare)) throw new Error("Your start coordinates are not in bounds."); // Guards for coordinates
    if (isOutOfBounds(endSquare)) throw new Error("Your end coordinates are out of bounds.")

    let startNode = {position: startSquare, parent: null} // Starting spot for search, Object will keep track of node relationships and location
    let visitedSquares = new Set();
    let queue = [startNode]; // Queue starts with starting node
    visitedSquares.add(startSquare.toString()); // Add starting square to visited nodes by default

    while(queue.length > 0) {
        let currentNode = queue.shift(); // Get current node in queue
       
        let possibleMoves = getLegalMoves(currentNode.position); // Get all legal moves from current node

        if (currentNode.position[0] === endSquare[0] && currentNode.position[1] === endSquare[1]) {
            console.log("Destination reached!");
            let path = buildPath(currentNode)
            printPath(path);
            return path;
        }

        possibleMoves.forEach((move) => { 
            let moveString = move.toString();
            if (!visitedSquares.has(moveString)) { // Add each move to visited nodes if not there already
                visitedSquares.add(moveString); 
                queue.push({ // Pushes new current node object into queue, tracking parent and position
                    position: move,
                    parent: currentNode
                });
            }
        })
    }
    return null; // Return null if there's no path
}

function isOutOfBounds([x, y]) { // Will return true if coordinate numbers are bigger than 7 or smaller than 0
    return (x < 0 || x > 7 || y < 0 || y > 7); 
}

function getLegalMoves([x, y]) { // Plot all legal moves, then filter out the ones that go off the board
    return [
        [x + 1, y + 2],
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x + 1, y - 2],
        [x - 1, y - 2],
        [x - 2, y - 1],
        [x - 2, y + 1],
        [x - 1, y + 2]
    ].filter(move => // Tracks the first and second indices of each move array
        move[0] >= 0 && 
        move[0] <= 7 && 
        move[1] >= 0 && 
        move[1] <= 7);
}

function buildPath(targetSquare) {
    let path = []; // Path of moves
    let current = targetSquare;

    while (current !== null) {
        path.push(current.position); // Adds node to path, starting at destination
        current = current.parent; // Moves on to the parent, until null is reached
    }

    path.reverse(); // Reverse path so start is at beginning
    return path; // Returns path
}

function printPath(path) {
    console.log(`You made it in ${path.length - 1} moves! Your path is: `); // -1 because this is the number of edges, not nodes
    const formattedPath = path.map(square => `[${square[0]}, ${square[1]}]`).join(" -> "); // Maps each square to a format, joins with arrows
    console.log(formattedPath);
}

knightMoves([0,0] , [3,5]);
knightMoves([6,4] , [7, 1]);
knightMoves([0,0] , [1,9]); // Should throw error