//Pegando as regiões de marcação do tabuleiro
const boardRegions = document.querySelectorAll('#gameBoard span')
//tabuleiro virtual para espelho e leitura do jogo
let virtualBoard = []
// Variável para o jogador da vez
let turnPlayer = ''

//Informando o nome do jogador da vez
function updateTitle() {
  const playerInput = document.getElementById(turnPlayer)
  document.getElementById('turnPlayer').innerText = playerInput.value
}

// Função do botão iniciar
function initializeGame() {
  //criando o tabuleiro virtual
  virtualBoard = [['', '', ''],['', '', ''], ['', '', ''] ]
  turnPlayer = 'player1'
  document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
  updateTitle()
  boardRegions.forEach(function(element) {
    element.classList.remove('win')
    element.innerHTML = ''
    element.classList.add('cursorPointer')
    element.addEventListener('click', handleBoardClick)
  })
}

function getWinRegions() {
  const winRegions = []
  if (virtualBoard[0][0] && virtualBoard[0][0] === virtualBoard[0][1] && virtualBoard[0][0] === virtualBoard[0][2])
    winRegions.push("0.0", "0.1", "0.2")
  if (virtualBoard[1][0] && virtualBoard[1][0] === virtualBoard[1][1] && virtualBoard[1][0] === virtualBoard[1][2])
    winRegions.push("1.0", "1.1", "1.2")
  if (virtualBoard[2][0] && virtualBoard[2][0] === virtualBoard[2][1] && virtualBoard[2][0] === virtualBoard[2][2])
    winRegions.push("2.0", "2.1", "2.2")
  if (virtualBoard[0][0] && virtualBoard[0][0] === virtualBoard[1][0] && virtualBoard[0][0] === virtualBoard[2][0])
    winRegions.push("0.0", "1.0", "2.0")
  if (virtualBoard[0][1] && virtualBoard[0][1] === virtualBoard[1][1] && virtualBoard[0][1] === virtualBoard[2][1])
    winRegions.push("0.1", "1.1", "2.1")
  if (virtualBoard[0][2] && virtualBoard[0][2] === virtualBoard[1][2] && virtualBoard[0][2] === virtualBoard[2][2])
    winRegions.push("0.2", "1.2", "2.2")
  if (virtualBoard[0][0] && virtualBoard[0][0] === virtualBoard[1][1] && virtualBoard[0][0] === virtualBoard[2][2])
    winRegions.push("0.0", "1.1", "2.2")
  if (virtualBoard[0][2] && virtualBoard[0][2] === virtualBoard[1][1] && virtualBoard[0][2] === virtualBoard[2][0])
    winRegions.push("0.2", "1.1", "2.0")
  return winRegions
}

// desabilitando área clicada
function disableRegion(element) {
  element.classList.remove('cursorPointer') // tirando o pointer do cursor
  element.removeEventListener('click', handleBoardClick) //removendo a função da região clicada
}

function handleWin(regions) {
  regions.forEach(function (region) {
    document.querySelector('[data-region="' + region + '"]').classList.add('win')
  })
  const playerName = document.getElementById(turnPlayer).value
  document.querySelector('h2').innerHTML = playerName + ' venceu!'
} 

function handleBoardClick(ev) {
  const span = ev.currentTarget
  //Identificando a região em que foi clicada
  const region = span.dataset.region // N.N
  const rowColumnPair = region.split('.') // ['N', 'N']
  const row = rowColumnPair[0] //Pegando a posição da linha: ["N", 'n']
  const column = rowColumnPair[1] // Pegando a posição da coluna: ['n', "N"]
  //Identificando o jogador e seu marcador
  if (turnPlayer === 'player1') {
    span.innerText = 'X'
    virtualBoard[row][column] = 'X'
  }else {
    span.innerText = 'O'
    virtualBoard[row][column] = 'O'
  }
  console.clear() // limpando o console a cada click para atualizar em uma tabela
  console.table(virtualBoard) // criando uma tabela no console
  disableRegion(span) // Área clicada desabilitada

  // Verificando quem venceu
  const winRegions = getWinRegions()
  if (winRegions.length > 0) {
    handleWin(winRegions)
  } else if (virtualBoard.flat().includes('')) {
    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
    updateTitle()
  } else {
    documehnt.querySelector('h2').innerHTML = 'Empate!'
  }
  
}
document.getElementById('start').addEventListener('click', initializeGame)