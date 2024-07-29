// Variables globales
const instructions = document.getElementById('instructions');
const codeEditor = document.getElementById('codeEditor');
const runCodeButton = document.getElementById('runCode');
const consoleOutput = document.getElementById('consoleOutput');

let currentLevel = 0;

// Desafíos de ejemplo
const challenges = [
    {
        prompt: "Crea una variable llamada 'mensaje' con el valor 'Hola Mundo' y muéstrala en la consola.",
        solution: `let mensaje = 'Hola Mundo';\nconsole.log(mensaje);`,
    },
    // Agrega más desafíos aquí
    { prompt: "Escribe una función llamada 'sumar' que reciba dos números y devuelva su suma.", solution: `function sumar(a, b) { return a + b; }` },
    { prompt: "Crea un objeto llamado 'persona' con las propiedades 'nombre', 'edad' ,'telefono' ", solution: `class ¨Persona {   string nombre; int edad; int telefono; }`},

];

// Cargar desafio y que pase directamente al siguiente si resuelve
function loadChallenge(level) {
    if (level < challenges.length) {
        instructions.querySelector('#challenge').textContent = challenges[level].prompt;
        codeEditor.value = '';
        runCodeButton.style.display = 'block';
    } else {
        instructions.querySelector('#challenge').textContent = "¡Felicidades, has completado todos los desafíos!";
        codeEditor.style.display = 'none';
        runCodeButton.style.display = 'none';
    }
}

function runCode() {
    const userCode = codeEditor.value;
    try {
        const output = eval(userCode);
        consoleOutput.textContent = output !== undefined ? output : '';

        if (userCode.trim() === challenges[currentLevel].solution.trim()) {
            consoleOutput.textContent += "\n¡Correcto!";
            codeEditor.classList.add('border-green-500');
            codeEditor.classList.remove('border-red-500');
            currentLevel++;
            loadChallenge(currentLevel);
        } else {
            consoleOutput.textContent += "\nInténtalo de nuevo.";
            codeEditor.classList.add('border-red-500');
            codeEditor.classList.remove('border-green-500');
        }
    } catch (e) {
        consoleOutput.textContent = 'Error: ' + e.message;
        codeEditor.classList.add('border-red-500');
        codeEditor.classList.remove('border-green-500');
    }
}



// Inicializar el primer desafío
loadChallenge(currentLevel);

// Manejar el clic en el botón "Ejecutar"
runCodeButton.addEventListener('click', () => {
    consoleOutput.textContent = '';
    runCode();
    currentLevel++;
    loadChallenge(currentLevel);
});


