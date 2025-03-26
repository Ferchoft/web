let recognition;
let isRecording = false;
const voiceInputButton = document.getElementById('voice-input-button');

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true; // Keep listening even after a pause
    recognition.lang = 'es-CO'; // Establecer el idioma a español de Colombia

    recognition.onstart = function() {
        isRecording = true;
        voiceInputButton.textContent = 'Grabando... (Presiona de nuevo o di "fin")';
    };

    recognition.onresult = function(event) {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript.trim().toLowerCase();
            }
        }
        console.log('Texto transcrito:', finalTranscript);

        if (finalTranscript.includes('fin')) {
            recognition.stop();
        }
    };

    recognition.onend = function() {
        isRecording = false;
        voiceInputButton.textContent = '🎙️ Voz a Texto';
    };

    recognition.onerror = function(event) {
        console.error('Error de reconocimiento de voz:', event.error);
        isRecording = false;
        voiceInputButton.textContent = '🎙️ Voz a Texto (Error)';
    };

    voiceInputButton.addEventListener('click', function() {
        if (isRecording) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });
} else {
    voiceInputButton.textContent = 'Voz no soportada';
    voiceInputButton.disabled = true;
}

function calcularNutricion() {
    console.log("¡La función calcularNutricion se ha llamado!");
    let peso = parseFloat(document.getElementById("peso").value);
    let flujoMetabolico = parseFloat(document.getElementById("flujoMetabolico").value);
    let tratamientoCC = parseFloat(document.getElementById("tratamientoCC").value);
    let viaOralCC = parseFloat(document.getElementById("viaOralCC").value);
    let sodioX = parseFloat(document.getElementById("sodioX").value);
    let potasioX = parseFloat(document.getElementById("potasioX").value);
    let calcioX = parseFloat(document.getElementById("calcioX").value);
    let magnesioX = parseFloat(document.getElementById("magnesioX").value);
    let aminoacidosX = parseFloat(document.getElementById("aminoacidosX").value);
    let lipidosX = parseFloat(document.getElementById("lipidosX").value);
    const resultadoDiv = document.getElementById("result");
    const pesoPacienteSpan = document.getElementById("pesoPaciente");
    const flujoMetabolicoPacienteSpan = document.getElementById("flujoMetabolicoPaciente");
    const valorHollidaySpan = document.getElementById("valorHolliday");
    const volumenSodioSpan = document.getElementById("volumenSodio");
    const volumenPotasioSpan = document.getElementById("volumenPotasio");
    const volumenCalcioSpan = document.getElementById("volumenCalcio");
    const volumenMagnesioSpan = document.getElementById("volumenMagnesio");
    const volumenAminoacidosSpan = document.getElementById("volumenAminoacidos");
    const volumenLipidosSpan = document.getElementById("volumenLipidos");
    const volumenRestanteDextrosaSpan = document.getElementById("volumenRestanteDextrosa");
    const caloriasTotalesSpan = document.getElementById("caloriasTotales");
    const dextrosaNecesariaGramosSpan = document.getElementById("dextrosaNecesariaGramos");
    const presentacionesResultList = document.getElementById("presentacionesResult");
    const porcentajeDextrosaResultList = document.getElementById("porcentajeDextrosaResult");
    const sumaVolumenesSpan = document.getElementById("sumaVolumenes");

    if (isNaN(peso) || isNaN(flujoMetabolico)) {
        alert("Por favor, ingrese valores numéricos válidos para el peso y el flujo metabólico.");
        return;
    }

    if (isNaN(tratamientoCC)) tratamientoCC = 0;
    if (isNaN(viaOralCC)) viaOralCC = 0;
    if (isNaN(sodioX)) sodioX = 0;
    if (isNaN(potasioX)) potasioX = 0;
    if (isNaN(calcioX)) calcioX = 0;
    if (isNaN(magnesioX)) magnesioX = 0;
    if (isNaN(aminoacidosX)) aminoacidosX = 0;
    if (isNaN(lipidosX)) lipidosX = 0;

    let valorHolliday;
    if (peso <= 10) {
        valorHolliday = peso * 100;
    } else if (peso > 10 && peso <= 20) {
        valorHolliday = 10 * 100 + (peso - 10) * 50;
    } else if (peso > 20 && peso <= 45) {
        valorHolliday = 10 * 100 + 10 * 50 + (peso - 20) * 20;
    } else {
        valorHolliday = 2000;
    }

    const volumenSodio = isNaN(sodioX) ? 0 : sodioX * peso / 3.4;
    const volumenPotasio = isNaN(potasioX) ? 0 : potasioX * peso;
    const volumenCalcio = isNaN(calcioX) ? 0 : calcioX * peso / 100;
    const volumenMagnesio = isNaN(magnesioX) ? 0 : magnesioX * peso / 0.8;
    const volumenAminoacidos = isNaN(aminoacidosX) ? 0 : aminoacidosX * peso * 100 / 10;
    const volumenLipidos = isNaN(lipidosX) ? 0 : lipidosX * peso * 100 / 20;

    const volumenRestanteDextrosa = valorHolliday - tratamientoCC - viaOralCC - volumenSodio - volumenPotasio - volumenCalcio - volumenMagnesio - volumenAminoacidos - volumenLipidos;
    const gramosGlucosa = peso * flujoMetabolico * 1.44;

    pesoPacienteSpan.textContent = peso.toFixed(2);
    flujoMetabolicoPacienteSpan.textContent = flujoMetabolico.toFixed(2);
    valorHollidaySpan.textContent = valorHolliday.toFixed(2);
    volumenSodioSpan.textContent = volumenSodio.toFixed(2);
    volumenPotasioSpan.textContent = volumenPotasio.toFixed(2);
    volumenCalcioSpan.textContent = volumenCalcio.toFixed(2);
    volumenMagnesioSpan.textContent = volumenMagnesio.toFixed(2);
    volumenAminoacidosSpan.textContent = volumenAminoacidos.toFixed(2);
    volumenLipidosSpan.textContent = volumenLipidos.toFixed(2);
    volumenRestanteDextrosaSpan.textContent = volumenRestanteDextrosa.toFixed(2);
    caloriasTotalesSpan.textContent = (peso * flujoMetabolico).toFixed(2);
    dextrosaNecesariaGramosSpan.textContent = gramosGlucosa.toFixed(2);
    presentacionesResultList.innerHTML = "";
    porcentajeDextrosaResultList.innerHTML = "";

    let totalVolumenDextrosa = 0; // Inicializar la variable para el volumen total de dextrosa

    if (gramosGlucosa * 10 > volumenRestanteDextrosa) {
        // Usar Dextrosa 50% y 10%
        const volumen50 = (gramosGlucosa * 10 - volumenRestanteDextrosa) / 4;
        const volumen10 = Math.max(0, volumenRestanteDextrosa - volumen50);
        totalVolumenDextrosa = Math.max(0, volumen50) + Math.max(0, volumen10);

        presentacionesResultList.innerHTML += `<li><strong>Presentación de 50%:</strong> <span class="resaltar-texto">${Math.max(0, volumen50).toFixed(2)} mL</span></li>`;
        presentacionesResultList.innerHTML += `<li><strong>Presentación de 10%:</strong> <span class="resaltar-texto">${Math.max(0, volumen10).toFixed(2)} mL</span></li>`;

        const porcentajeDextrosa50 = (Math.max(0, volumen50) * 50) / 1440 / (peso / 100) / 10;
        const porcentajeDextrosa10 = (Math.max(0, volumen10) * 10) / 1440 / (peso / 100) / 10;
        const totalPorcentajeDextrosa = porcentajeDextrosa50 + porcentajeDextrosa10;

        porcentajeDextrosaResultList.innerHTML += `<li><strong>50%:</strong> ${porcentajeDextrosa50.toFixed(2)} %</li>`;
        porcentajeDextrosaResultList.innerHTML += `<li><strong>10%:</strong> ${porcentajeDextrosa10.toFixed(2)} %</li>`;
        porcentajeDextrosaResultList.innerHTML += `<li style="font-weight: bold;"><strong>Total:</strong> <span class="resaltar-texto">${totalPorcentajeDextrosa.toFixed(2)} %</span></li>`;

    } else if (gramosGlucosa * 10 < volumenRestanteDextrosa) {
        // Usar Dextrosa 10% y 5%
        const volumen10Calculado = (gramosGlucosa / 0.05) - volumenRestanteDextrosa;
        let volumen10 = 0;
        let volumen5 = 0;

        if (volumen10Calculado >= 0) {
            volumen10 = volumen10Calculado;
            volumen5 = Math.max(0, volumenRestanteDextrosa - volumen10);
        } else {
            volumen10 = 0;
            volumen5 = gramosGlucosa / 0.05;
        }
        totalVolumenDextrosa = Math.max(0, volumen10) + Math.max(0, volumen5);

        presentacionesResultList.innerHTML += `<li><strong>Presentación de 10%:</strong> <span class="resaltar-texto">${Math.max(0, volumen10).toFixed(2)} mL</span></li>`;
        presentacionesResultList.innerHTML += `<li><strong>Presentación de 5%:</strong> <span class="resaltar-texto">${Math.max(0, volumen5).toFixed(2)} mL</span></li>`;

        const porcentajeDextrosa10 = (Math.max(0, volumen10) * 10) / 1440 / (peso / 100) / 10;
        const porcentajeDextrosa5 = (Math.max(0, volumen5) * 5) / 1440 / (peso / 100) / 10;
        const totalPorcentajeDextrosa = porcentajeDextrosa10 + porcentajeDextrosa5;

        porcentajeDextrosaResultList.innerHTML += `<li><strong>10%:</strong> ${porcentajeDextrosa10.toFixed(2)} %</li>`;
        porcentajeDextrosaResultList.innerHTML += `<li><strong>5%:</strong> ${porcentajeDextrosa5.toFixed(2)} %</li>`;
        porcentajeDextrosaResultList.innerHTML += `<li style="font-weight: bold;"><strong>Total:</strong> <span class="resaltar-texto">${totalPorcentajeDextrosa.toFixed(2)} %</span></li>`;
    } else {
        // Caso en que gramosGlucosa * 10 es igual a volumenRestanteDextrosa
        totalVolumenDextrosa = Math.max(0, volumenRestanteDextrosa);
        presentacionesResultList.innerHTML += `<li><strong>Presentación de 10%:</strong> <span class="resaltar-texto">${Math.max(0, volumenRestanteDextrosa).toFixed(2)} mL</span></li>`;
        const porcentajeDextrosa10 = (Math.max(0, volumenRestanteDextrosa) * 10) / 1440 / (peso / 100) / 10;
        porcentajeDextrosaResultList.innerHTML += `<li><strong>10%:</strong> ${porcentajeDextrosa10.toFixed(2)} %</li>`;
        porcentajeDextrosaResultList.innerHTML += `<li style="font-weight: bold;"><strong>Total:</strong> <span class="resaltar-texto">${porcentajeDextrosa10.toFixed(2)} %</span></li>`;
    }

    valorHollidaySpan.textContent = valorHolliday.toFixed(2);
    volumenSodioSpan.textContent = volumenSodio.toFixed(2);
    volumenPotasioSpan.textContent = volumenPotasio.toFixed(2);
    volumenCalcioSpan.textContent = volumenCalcio.toFixed(2);
    volumenMagnesioSpan.textContent = volumenMagnesio.toFixed(2);
    volumenAminoacidosSpan.textContent = volumenAminoacidos.toFixed(2);
    volumenLipidosSpan.textContent = volumenLipidos.toFixed(2);
    volumenRestanteDextrosaSpan.textContent = volumenRestanteDextrosa.toFixed(2);

    const sumaVolumenesCalculada = (isNaN(volumenSodio) ? 0 : volumenSodio) +
                                     (isNaN(volumenPotasio) ? 0 : volumenPotasio) +
                                     (isNaN(volumenCalcio) ? 0 : volumenCalcio) +
                                     (isNaN(volumenMagnesio) ? 0 : volumenMagnesio) +
                                     (isNaN(volumenAminoacidos) ? 0 : volumenAminoacidos) +
                                     (isNaN(volumenLipidos) ? 0 : volumenLipidos) +
                                     totalVolumenDextrosa;

    sumaVolumenesSpan.textContent = sumaVolumenesCalculada.toFixed(2);
    resultadoDiv.style.display = "block";
}

function reiniciarCalculadora() {
    document.getElementById("peso").value = "";
    document.getElementById("flujoMetabolico").value = "";
    document.getElementById("tratamientoCC").value = "";
    document.getElementById("viaOralCC").value = "";
    document.getElementById("sodioX").value = "";
    document.getElementById("potasioX").value = "";
    document.getElementById("calcioX").value = "";
    document.getElementById("magnesioX").value = "";
    document.getElementById("aminoacidosX").value = "";
    document.getElementById("lipidosX").value = "";
    document.getElementById("result").style.display = "none";
    document.getElementById("pesoPaciente").textContent = "";
    document.getElementById("flujoMetabolicoPaciente").textContent = "";
    document.getElementById("valorHolliday").textContent = "";
    document.getElementById("volumenSodio").textContent = "";
    document.getElementById("volumenPotasio").textContent = "";
    document.getElementById("volumenCalcio").textContent = "";
    document.getElementById("volumenMagnesio").textContent = "";
    document.getElementById("volumenAminoacidos").textContent = "";
    document.getElementById("volumenLipidos").textContent = "";
    document.getElementById("volumenRestanteDextrosa").textContent = "";
    document.getElementById("caloriasTotales").textContent = "";
    document.getElementById("dextrosaNecesariaGramos").textContent = "";
    document.getElementById("presentacionesResult").innerHTML = "";
    document.getElementById("porcentajeDextrosaResult").innerHTML = "";
    document.getElementById("sumaVolumenes").textContent = "";
    document.getElementById("dosis6Horas").style.display = "none";
    document.getElementById("dosis8Horas").style.display = "none";
    document.getElementById("dosis12Horas").style.display = "none";
}

function dividirDosis6Horas() {
    const sodioTotal = parseFloat(document.getElementById("volumenSodio").textContent);
    const potasioTotal = parseFloat(document.getElementById("volumenPotasio").textContent);
    const calcioTotal = parseFloat(document.getElementById("volumenCalcio").textContent);
    const magnesioTotal = parseFloat(document.getElementById("volumenMagnesio").textContent);
    const aminoacidosTotal = parseFloat(document.getElementById("volumenAminoacidos").textContent);
    const lipidosTotal = parseFloat(document.getElementById("volumenLipidos").textContent);

    const presentacionesList = document.getElementById("presentacionesResult").getElementsByTagName("li");
    let dextrosa50Total = 0;
    let dextrosa10Total = 0;
    let dextrosa5Total = 0;

    for (let i = 0; i < presentacionesList.length; i++) {
        const texto = presentacionesList[i].textContent;
        if (texto.includes("Presentación de 50%")) {
            dextrosa50Total = parseFloat(texto.split(":")[1].trim().split(" ")[0]);
        } else if (texto.includes("Presentación de 10%")) {
            dextrosa10Total = parseFloat(texto.split(":")[1].trim().split(" ")[0]);
        } else if (texto.includes("Presentación de 5%")) {
            dextrosa5Total = parseFloat(texto.split(":")[1].trim().split(" ")[0]);
        }
    }

    const sodio6h = (isNaN(sodioTotal) ? 0 : sodioTotal / 4).toFixed(2);
    const potasio6h = (isNaN(potasioTotal) ? 0 : potasioTotal / 4).toFixed(2);
    const calcio6h = (isNaN(calcioTotal) ? 0 : calcioTotal / 4).toFixed(2);
    const magnesio6h = (isNaN(magnesioTotal) ? 0 : magnesioTotal / 4).toFixed(2);
    const aminoacidos6h = (isNaN(aminoacidosTotal) ? 0 : aminoacidosTotal / 4).toFixed(2);
    const lipidos6h = (isNaN(lipidosTotal) ? 0 : lipidosTotal / 4).toFixed(2);
    const dextrosa50_6h = (isNaN(dextrosa50Total) ? 0 : dextrosa50Total / 4).toFixed(2);
    const dextrosa10_6h = (isNaN(dextrosa10Total) ? 0 : dextrosa10Total / 4).toFixed(2);
    const dextrosa5_6h = (isNaN(dextrosa5Total) ? 0 : dextrosa5Total / 4).toFixed(2);
    const total6h = (parseFloat(sodio6h) + parseFloat(potasio6h) + parseFloat(calcio6h) + parseFloat(magnesio6h) + parseFloat(aminoacidos6h) + parseFloat(lipidos6h) + parseFloat(dextrosa50_6h) + parseFloat(dextrosa10_6h) + parseFloat(dextrosa5_6h)).toFixed(2);

    document.getElementById("sodio6h").textContent = sodio6h;
    document.getElementById("potasio6h").textContent = potasio6h;
    document.getElementById("calcio6h").textContent = calcio6h;
    document.getElementById("magnesio6h").textContent = magnesio6h;
    document.getElementById("aminoacidos6h").textContent = aminoacidos6h;
    document.getElementById("lipidos6h").textContent = lipidos6h;
    document.getElementById("dextrosa50_6h").textContent = dextrosa50_6h;
    document.getElementById("dextrosa10_6h").textContent = dextrosa10_6h;
    document.getElementById("dextrosa5_6h").textContent = dextrosa5_6h;
    document.getElementById("total6h").textContent = total6h;
    document.getElementById("dosis6Horas").style.display = "block";
    document.getElementById("dosis8Horas").style.display = "none";
    document.getElementById("dosis12Horas").style.display = "none";
}

function dividirDosis8Horas() {
    const sodioTotal = parseFloat(document.getElementById("volumenSodio").textContent);
    const potasioTotal = parseFloat(document.getElementById("volumenPotasio").textContent);
    const calcioTotal = parseFloat(document.getElementById("volumenCalcio").textContent);
    const magnesioTotal = parseFloat(document.getElementById("volumenMagnesio").textContent);
    const aminoacidosTotal = parseFloat(document.getElementById("volumenAminoacidos").textContent);
    const lipidosTotal = parseFloat(document.getElementById("volumenLipidos").textContent);

    const presentacionesList = document.getElementById("presentacionesResult").getElementsByTagName("li");
    let dextrosa50Total = 0;
    let dextrosa10Total = 0;
    let dextrosa5Total = 0;

    for (let i = 0; i < presentacionesList.length; i++) {
        const texto = presentacionesList[i].textContent;
        if (texto.includes("Presentación de 50%")) {
            dextrosa50Total = parseFloat(texto.split(":")[1].trim().split(" ")[0]);
        } else if (texto.includes("Presentación de 10%")) {
            dextrosa10Total = parseFloat(texto.split(":")[1].trim().split(" ")[0]);
        } else if (texto.includes("Presentación de 5%")) {
            dextrosa5Total = parseFloat(texto.split(":")[1].trim().split(" ")[0]);
        }
    }

    const sodio8h = (isNaN(sodioTotal) ? 0 : sodioTotal / 3).toFixed(2);
    const potasio8h = (isNaN(potasioTotal) ? 0 : potasioTotal / 3).toFixed(2);
    const calcio8h = (isNaN(calcioTotal) ? 0 : calcioTotal / 3).toFixed(2);
    const magnesio8h = (isNaN(magnesioTotal) ? 0 : magnesioTotal / 3).toFixed(2);
    const aminoacidos8h = (isNaN(aminoacidosTotal) ? 0 : aminoacidosTotal / 3).toFixed(2);
    const lipidos8h = (isNaN(lipidosTotal) ? 0 : lipidosTotal / 3).toFixed(2);
    const dextrosa50_8h = (isNaN(dextrosa50Total) ? 0 : dextrosa50Total / 3).toFixed(2);
    const dextrosa10_8h = (isNaN(dextrosa10Total) ? 0 : dextrosa10Total / 3).toFixed(2);
    const dextrosa5_8h = (isNaN(dextrosa5Total) ? 0 : dextrosa5Total / 3).toFixed(2);
    const total8h = (parseFloat(sodio8h) + parseFloat(potasio8h) + parseFloat(calcio8h) + parseFloat(magnesio8h) + parseFloat(aminoacidos8h) + parseFloat(lipidos8h) + parseFloat(dextrosa50_8h) + parseFloat(dextrosa10_8h) + parseFloat(dextrosa5_8h)).toFixed(2);

    document.getElementById("sodio8h").textContent = sodio8h;
    document.getElementById("potasio8h").textContent = potasio8h;
    document.getElementById("calcio8h").textContent = calcio8h;
    document.getElementById("magnesio8h").textContent = magnesio8h;
    document.getElementById("aminoacidos8h").textContent = aminoacidos8h;
    document.getElementById("lipidos8h").textContent = lipidos8h;
    document.getElementById("dextrosa50_8h").textContent = dextrosa50_8h;
    document.getElementById("dextrosa10_8h").textContent = dextrosa10_8h;
    document.getElementById("dextrosa5_8h").textContent = dextrosa5_8h;
    document.getElementById("total8h").textContent = total8h;
    document.getElementById("dosis6Horas").style.display = "none";
    document.getElementById("dosis8Horas").style.display = "block";
    document.getElementById("dosis12Horas").style.display = "none";
}

function dividirDosis12Horas() {
    const sodioTotal = parseFloat(document.getElementById("volumenSodio").textContent);
    const potasioTotal = parseFloat(document.getElementById("volumenPotasio").textContent);
    const calcioTotal = parseFloat(document.getElementById("volumenCalcio").textContent);
    const magnesioTotal = parseFloat(document.getElementById("volumenMagnesio").textContent);
    const aminoacidosTotal = parseFloat(document.getElementById("volumenAminoacidos").textContent);
    const lipidosTotal = parseFloat(document.getElementById("volumenLipidos").textContent);

    const presentacionesList = document.getElementById("presentacionesResult").getElementsByTagName("li");
    let dextrosa50Total = 0;
    let dextrosa10Total = 0;
    let dextrosa5Total = 0;

    for (let i = 0; i < presentacionesList.length; i++) {
        const texto = presentacionesList[i].textContent;
        if (texto.includes("Presentación de 50%")) {
            dextrosa50Total = parseFloat(texto.split(":")[1].trim().split(" ")[0]);
        } else if (texto.includes("Presentación de 10%")) {
            dextrosa10Total = parseFloat(texto.split(":")[1].trim().split(" ")[0]);
        } else if (texto.includes("Presentación de 5%")) {
            dextrosa5Total = parseFloat(texto.split(":")[1].trim().split(" ")[0]);
        }
    }

    const sodio12h = (isNaN(sodioTotal) ? 0 : sodioTotal / 2).toFixed(2);
    const potasio12h = (isNaN(potasioTotal) ? 0 : potasioTotal / 2).toFixed(2);
    const calcio12h = (isNaN(calcioTotal) ? 0 : calcioTotal / 2).toFixed(2);
    const magnesio12h = (isNaN(magnesioTotal) ? 0 : magnesioTotal / 2).toFixed(2);
    const aminoacidos12h = (isNaN(aminoacidosTotal) ? 0 : aminoacidosTotal / 2).toFixed(2);
    const lipidos12h = (isNaN(lipidosTotal) ? 0 : lipidosTotal / 2).toFixed(2);
    const dextrosa50_12h = (isNaN(dextrosa50Total) ? 0 : dextrosa50Total / 2).toFixed(2);
    const dextrosa10_12h = (isNaN(dextrosa10Total) ? 0 : dextrosa10Total / 2).toFixed(2);
    const dextrosa5_12h = (isNaN(dextrosa5Total) ? 0 : dextrosa5Total / 2).toFixed(2);
    const total12h = (parseFloat(sodio12h) + parseFloat(potasio12h) + parseFloat(calcio12h) + parseFloat(magnesio12h) + parseFloat(aminoacidos12h) + parseFloat(lipidos12h) + parseFloat(dextrosa50_12h) + parseFloat(dextrosa10_12h) + parseFloat(dextrosa5_12h)).toFixed(2);

    document.getElementById("sodio12h").textContent = sodio12h;
    document.getElementById("potasio12h").textContent = potasio12h;
    document.getElementById("calcio12h").textContent = calcio12h;
    document.getElementById("magnesio12h").textContent = magnesio12h;
    document.getElementById("aminoacidos12h").textContent = aminoacidos12h;
    document.getElementById("lipidos12h").textContent = lipidos12h;
    document.getElementById("dextrosa50_12h").textContent = dextrosa50_12h;
    document.getElementById("dextrosa10_12h").textContent = dextrosa10_12h;
    document.getElementById("dextrosa5_12h").textContent = dextrosa5_12h;
    document.getElementById("total12h").textContent = total12h;
    document.getElementById("dosis6Horas").style.display = "none";
    document.getElementById("dosis8Horas").style.display = "none";
    document.getElementById("dosis12Horas").style.display = "block";
}

// Función para cambiar el tema
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
});