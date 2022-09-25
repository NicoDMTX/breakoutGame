const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeigth = 20

/**
 * Individual block
 */
class Block {
    constructor(xAxis, yAxis)
}

const addBlock = () => {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = '100px'
    block.style.bottom = '50px'
    grid.appendChild(block)
}

addBlock();
