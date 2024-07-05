let listNumber = []
let numberLimit = 10
let secretNumber = randomNumber() // Adiciona um valor aleatório para a variável através da função criada abaixo
let numTries = 1

showInicialMessage()

// Pega as tags e conteúdos referentes aos parâmetros passados ao executar a função
function showText(tag, textContent) {
    let field = document.querySelector(tag)
    field.innerHTML = textContent
    responsiveVoice.speak(textContent, 'Brazilian Portuguese Female', {rate:1.2})
}

// Função para apresentar os textos ao carregar/regarregar a página
function showInicialMessage() {
    showText('h1', 'Jogo do número secreto')
    showText('p', 'Escolha um número entre 1 e 10')
}

// Retorna um valor aleatório inteiro, com duas casas decimais
function randomNumber() {
    let chosenNumber = parseInt(Math.random() * numberLimit + 1)
    let numberElements = listNumber.length

    if (numberElements == numberLimit) {
        listNumber = []
    }

    if (listNumber.includes(chosenNumber)) {
        return randomNumber()
    } else {
        listNumber.push(chosenNumber)
        return chosenNumber
    }
}

// Checa se o número inserido no campo está correto
function checkTry() {
    let trying = document.querySelector('input').value // Adiciona o valor do campo a variável

    if (trying == secretNumber) {
        let triesWord = numTries > 1 ? 'tentativas' : 'tentativa' // Verifica se o número de tentativas é maior que 1
        let triesMessage = `Você descobriu o número secreto com ${numTries} ${triesWord}!` // Mensagem ao acertar o número secreto

        showText('h1', 'Acertou')
        showText('p', triesMessage)

        document.getElementById('restart').removeAttribute('disabled') // Pega o id referente ao button e remove o atributo que o desabilita
    } else { // Se caso errar o número entrará nesta condição dizendo se o número digitado é menor ou maior
        if (trying > secretNumber) {
            showText('p', 'O número secreto é menor')
        } else {
            showText('p', 'O número secreto é maior')
        }
        numTries++ // Soma mais um se caso o número de tentativas for maior que 1
        cleanInput()
    }
}

// Limpa o campo após a tentativa
function cleanInput() {
    trying = document.querySelector('input')
    trying.value = ''
}

// Reinicia o jogo
function restartGame() {
    secretNumber = randomNumber()
    cleanInput()
    numTries = 1
    showInicialMessage()
    document.getElementById('restart').setAttribute('disabled', true)
}