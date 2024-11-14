function calcular() {
    // Obtém os valores de a, b e c
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);

    // Calcula o discriminante
    const discriminante = b * b - 4 * a * c;

    let resultado = `Discriminante: ${discriminante.toFixed(2)}<br>`;
    let raizes;

    if (discriminante > 0) {
        const raiz1 = (-b + Math.sqrt(discriminante)) / (2 * a);
        const raiz2 = (-b - Math.sqrt(discriminante)) / (2 * a);
        raizes = [raiz1, raiz2];
        resultado += `Raízes reais: x₁ = ${raiz1.toFixed(2)}, x₂ = ${raiz2.toFixed(2)}`;
    } else if (discriminante === 0) {
        const raiz = -b / (2 * a);
        raizes = [raiz];
        resultado += `Raiz única: x = ${raiz.toFixed(2)}`;
    } else {
        resultado += "As raízes são complexas e não possuem representação no gráfico real.";
        raizes = null;
    }

    document.getElementById('resultado').innerHTML = resultado;
    desenharGrafico(a, b, c, raizes);
}

function desenharGrafico(a, b, c, raizes) {
    const canvas = document.getElementById('grafico');
    const ctx = canvas.getContext('2d');

    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define o intervalo do gráfico
    const xMin = -10;
    const xMax = 10;
    const scaleX = canvas.width / (xMax - xMin);
    const scaleY = canvas.height / 100;

    // Desenha o eixo X e Y
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Desenha o gráfico da função quadrática
    ctx.beginPath();
    for (let x = xMin; x <= xMax; x += 0.1) {
        const y = a * x * x + b * x + c;
        const canvasX = (x - xMin) * scaleX;
        const canvasY = canvas.height / 2 - y * scaleY;
        ctx.lineTo(canvasX, canvasY);
    }
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Marca as raízes, se forem reais
    if (raizes) {
        ctx.fillStyle = 'red';
        raizes.forEach(raiz => {
            const canvasX = (raiz - xMin) * scaleX;
            const canvasY = canvas.height / 2;
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
}
