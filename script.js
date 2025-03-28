function calcularNutricion(dosisHorarias) {
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
    if (isNaN(dosisHorarias)) {
        console.warn("Número de dosis horarias no proporcionado, usando valor por defecto (24) para el cálculo total.");
        dosisHorarias = 24;
    }

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
    const volumenCalcio = isNaN(calcioX) ?
        0 : calcioX * peso / 100;
    const volumenMagnesio = isNaN(magnesioX) ? 0 : magnesioX * peso / 0.8;
    const volumenAminoacidos = isNaN(aminoacidosX) ? 0 : aminoacidosX * peso * 100 / 10;
    const volumenLipidos = isNaN(lipidosX) ?
        0 : lipidosX * peso * 100 / 20;

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
    document.getElementById("tonicidad6h").textContent = "";
    document.getElementById("tonicidad8h").textContent = "";
    document.getElementById("tonicidad12h").textContent = "";
}

function calcularTonicidadPorDosis(horas) {
    let dosisHorarias;
    if (horas === 6) {
        dosisHorarias = 4;
    } else if (horas === 8) {
        dosisHorarias = 3;
    } else if (horas === 12) {
        dosisHorarias = 2;
    } else {
        return;
    }
    calcularNutricion(dosisHorarias);
    dividirDosis(horas);
}

function dividirDosis(horas) {
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

    let sodioDosis;
    let potasioDosis;
    let calcioDosis;
    let magnesioDosis;
    let aminoacidosDosis;
    let lipidosDosis;
    let dextrosa50Dosis;
    let dextrosa10Dosis;
    let dextrosa5Dosis;
    let totalDosis;
    let dosisHorarias;
    if (horas === 6) {
        dosisHorarias = 4;
    } else if (horas === 8) {
        dosisHorarias = 3;
    } else if (horas === 12) {
        dosisHorarias = 2;
    } else {
        return;
    }
    const sumaVolumenesCalculada = parseFloat(document.getElementById("sumaVolumenes").textContent);
    const sodioX = parseFloat(document.getElementById("sodioX").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const tonicidadDosisCalculada = (sodioX * peso / 3.4 / dosisHorarias) * 20 / sumaVolumenesCalculada;
    const tonicidadFormateada = isNaN(tonicidadDosisCalculada) ? 'Error' : tonicidadDosisCalculada.toFixed(3);
    if (horas === 6) {
        const divisor = 4;
        sodioDosis = (isNaN(sodioTotal) ? 0 : sodioTotal / divisor).toFixed(2);
        potasioDosis = (isNaN(potasioTotal) ? 0 : potasioTotal / divisor).toFixed(2);
        calcioDosis = (isNaN(calcioTotal) ? 0 : calcioTotal / divisor).toFixed(2);
        magnesioDosis = (isNaN(magnesioTotal) ? 0 : magnesioTotal / divisor).toFixed(2);
        aminoacidosDosis = (isNaN(aminoacidosTotal) ? 0 : aminoacidosTotal / divisor).toFixed(2);
        lipidosDosis = (isNaN(lipidosTotal) ? 0 : lipidosTotal / divisor).toFixed(2);
        dextrosa50Dosis = (isNaN(dextrosa50Total) ? 0 : dextrosa50Total / divisor).toFixed(2);
        dextrosa10Dosis = (isNaN(dextrosa10Total) ? 0 : dextrosa10Total / divisor).toFixed(2);
        dextrosa5Dosis = (isNaN(dextrosa5Total) ? 0 : dextrosa5Total / divisor).toFixed(2);
        totalDosis = parseFloat(sodioDosis) + parseFloat(potasioDosis) + parseFloat(calcioDosis) + parseFloat(magnesioDosis) + parseFloat(aminoacidosDosis) + parseFloat(lipidosDosis);
        if (!isNaN(parseFloat(dextrosa50Dosis))) totalDosis += parseFloat(dextrosa50Dosis);
        if (!isNaN(parseFloat(dextrosa10Dosis))) totalDosis += parseFloat(dextrosa10Dosis);
        if (!isNaN(parseFloat(dextrosa5Dosis))) totalDosis += parseFloat(dextrosa5Dosis);

        document.getElementById("sodio6h").textContent = sodioDosis;
        document.getElementById("potasio6h").textContent = potasioDosis;
        document.getElementById("calcio6h").textContent = calcioDosis;
        document.getElementById("magnesio6h").textContent = magnesioDosis;
        document.getElementById("aminoacidos6h").textContent = aminoacidosDosis;
        document.getElementById("lipidos6h").textContent = lipidosDosis;
        document.getElementById("dextrosa50_6h").textContent = dextrosa50Dosis;
        document.getElementById("dextrosa10_6h").textContent = dextrosa10Dosis;
        document.getElementById("dextrosa5_6h").textContent = dextrosa5Dosis;
        document.getElementById("total6h").textContent = totalDosis.toFixed(2);
        document.getElementById("tonicidad6h").textContent = tonicidadFormateada;
        document.getElementById("dosis6Horas").style.display = "block";
        document.getElementById("dosis8Horas").style.display = "none";
        document.getElementById("dosis12Horas").style.display = "none";
    } else if (horas === 8) {
        const divisor = 3;
        sodioDosis = (isNaN(sodioTotal) ? 0 : sodioTotal / divisor).toFixed(2);
        potasioDosis = (isNaN(potasioTotal) ? 0 : potasioTotal / divisor).toFixed(2);
        calcioDosis = (isNaN(calcioTotal) ? 0 : calcioTotal / divisor).toFixed(2);
        magnesioDosis = (isNaN(magnesioTotal) ? 0 : magnesioTotal / divisor).toFixed(2);
        aminoacidosDosis = (isNaN(aminoacidosTotal) ? 0 : aminoacidosTotal / divisor).toFixed(2);
        lipidosDosis = (isNaN(lipidosTotal) ? 0 : lipidosTotal / divisor).toFixed(2);
        dextrosa50Dosis = (isNaN(dextrosa50Total) ? 0 : dextrosa50Total / divisor).toFixed(2);
        dextrosa10Dosis = (isNaN(dextrosa10Total) ? 0 : dextrosa10Total / divisor).toFixed(2);
        dextrosa5Dosis = (isNaN(dextrosa5Total) ? 0 : dextrosa5Total / divisor).toFixed(2);
        totalDosis = parseFloat(sodioDosis) + parseFloat(potasioDosis) + parseFloat(calcioDosis) + parseFloat(magnesioDosis) + parseFloat(aminoacidosDosis) + parseFloat(lipidosDosis);
        if (!isNaN(parseFloat(dextrosa50Dosis))) totalDosis += parseFloat(dextrosa50Dosis);
        if (!isNaN(parseFloat(dextrosa10Dosis))) totalDosis += parseFloat(dextrosa10Dosis);
        if (!isNaN(parseFloat(dextrosa5Dosis))) totalDosis += parseFloat(dextrosa5Dosis);

        document.getElementById("sodio8h").textContent = sodioDosis;
        document.getElementById("potasio8h").textContent = potasioDosis;
        document.getElementById("calcio8h").textContent = calcioDosis;
        document.getElementById("magnesio8h").textContent = magnesioDosis;
        document.getElementById("aminoacidos8h").textContent = aminoacidosDosis;
        document.getElementById("lipidos8h").textContent = lipidosDosis;
        document.getElementById("dextrosa50_8h").textContent = dextrosa50Dosis;
        document.getElementById("dextrosa10_8h").textContent = dextrosa10Dosis;
        document.getElementById("dextrosa5_8h").textContent = dextrosa5Dosis;
        document.getElementById("total8h").textContent = totalDosis.toFixed(2);
        document.getElementById("tonicidad8h").textContent = tonicidadFormateada;
        document.getElementById("dosis6Horas").style.display = "none";
        document.getElementById("dosis8Horas").style.display = "block";
        document.getElementById("dosis12Horas").style.display = "none";
    } else if (horas === 12) {
        const divisor = 2;
        sodioDosis = (isNaN(sodioTotal) ? 0 : sodioTotal / divisor).toFixed(2);
        potasioDosis = (isNaN(potasioTotal) ? 0 : potasioTotal / divisor).toFixed(2);
        calcioDosis = (isNaN(calcioTotal) ? 0 : calcioTotal / divisor).toFixed(2);
        magnesioDosis = (isNaN(magnesioTotal) ? 0 : magnesioTotal / divisor).toFixed(2);
        aminoacidosDosis = (isNaN(aminoacidosTotal) ? 0 : aminoacidosTotal / divisor).toFixed(2);
        lipidosDosis = (isNaN(lipidosTotal) ? 0 : lipidosTotal / divisor).toFixed(2);
        dextrosa50Dosis = (isNaN(dextrosa50Total) ? 0 : dextrosa50Total / divisor).toFixed(2);
        dextrosa10Dosis = (isNaN(dextrosa10Total) ? 0 : dextrosa10Total / divisor).toFixed(2);
        dextrosa5Dosis = (isNaN(dextrosa5Total) ? 0 : dextrosa5Total / divisor).toFixed(2);
        totalDosis = parseFloat(sodioDosis) + parseFloat(potasioDosis) + parseFloat(calcioDosis) + parseFloat(magnesioDosis) + parseFloat(aminoacidosDosis) + parseFloat(lipidosDosis);
        if (!isNaN(parseFloat(dextrosa50Dosis))) totalDosis += parseFloat(dextrosa50Dosis);
        if (!isNaN(parseFloat(dextrosa10Dosis))) totalDosis += parseFloat(dextrosa10Dosis);
        if (!isNaN(parseFloat(dextrosa5Dosis))) totalDosis += parseFloat(dextrosa5Dosis);

        document.getElementById("sodio12h").textContent = sodioDosis;
        document.getElementById("potasio12h").textContent = potasioDosis;
        document.getElementById("calcio12h").textContent = calcioDosis;
        document.getElementById("magnesio12h").textContent = magnesioDosis;
        document.getElementById("aminoacidos12h").textContent = aminoacidosDosis;
        document.getElementById("lipidos12h").textContent = lipidosDosis;
        document.getElementById("dextrosa50_12h").textContent = dextrosa50Dosis;
        document.getElementById("dextrosa10_12h").textContent = dextrosa10Dosis;
        document.getElementById("dextrosa5_12h").textContent = dextrosa5Dosis;
        document.getElementById("total12h").textContent = totalDosis.toFixed(2);
        document.getElementById("tonicidad12h").textContent = tonicidadFormateada;
        document.getElementById("dosis6Horas").style.display = "none";
        document.getElementById("dosis8Horas").style.display = "none";
        document.getElementById("dosis12Horas").style.display = "block";
    }
}

function descargarResultados() {
    const resultadoDiv = document.getElementById("result");
    if (resultadoDiv.style.display === "none") {
        alert("Por favor, calcule los resultados primero.");
        return;
    }

    let textoDescarga = "Resultados de la Calculadora de Nutrición Parenteral Total:\n\n";

    // Recopilar resultados generales
    textoDescarga += "--- Resultados Generales ---\n";
    textoDescarga += `Peso del paciente: ${document.getElementById("pesoPaciente").textContent} kg\n`;
    textoDescarga += `Flujo metabólico: ${document.getElementById("flujoMetabolicoPaciente").textContent} mg/kg/minuto\n`;
    textoDescarga += `Valor Holliday: ${document.getElementById("valorHolliday").textContent} cc\n`;
    textoDescarga += `Volumen Sodio: ${document.getElementById("volumenSodio").textContent} cc\n`;
    textoDescarga += `Volumen Potasio: ${document.getElementById("volumenPotasio").textContent} cc\n`;
    textoDescarga += `Volumen Calcio: ${document.getElementById("volumenCalcio").textContent} cc\n`;
    textoDescarga += `Volumen Magnesio: ${document.getElementById("volumenMagnesio").textContent} cc\n`;
    textoDescarga += `Volumen Aminoácidos: ${document.getElementById("volumenAminoacidos").textContent} cc\n`;
    textoDescarga += `Volumen Lípidos: ${document.getElementById("volumenLipidos").textContent} cc\n`;
    textoDescarga += `Volumen Restante Dextrosa: ${document.getElementById("volumenRestanteDextrosa").textContent} cc\n`;
    textoDescarga += `Calorías Totales: ${document.getElementById("caloriasTotales").textContent} kcal/día\n`;
    textoDescarga += `Dextrosa Necesaria: ${document.getElementById("dextrosaNecesariaGramos").textContent} gramos/día\n`;

    // Recopilar presentación de dextrosa
    textoDescarga += "\n--- Presentación de Dextrosa ---\n";
    const presentaciones = document.getElementById("presentacionesResult").getElementsByTagName("li");
    for (let i = 0; i < presentaciones.length; i++) {
        textoDescarga += `${presentaciones[i].textContent}\n`;
    }

    // Recopilar porcentaje de dextrosa
    textoDescarga += "\n--- Porcentaje de Dextrosa Total ---\n";
    const porcentajes = document.getElementById("porcentajeDextrosaResult").getElementsByTagName("li");
    for (let i = 0; i < porcentajes.length; i++) {
        textoDescarga += `${porcentajes[i].textContent}\n`;
    }

    textoDescarga += `\nSuma de Volúmenes: ${document.getElementById("sumaVolumenes").textContent} cc\n`;

    // Recopilar dosis horarias si están visibles
    const dosis6HorasDiv = document.getElementById("dosis6Horas");
    if (dosis6HorasDiv.style.display === "block") {
        textoDescarga += "\n--- Dosis Cada 6 Horas ---\n";
        textoDescarga += `Sodio: ${document.getElementById("sodio6h").textContent} cc\n`;
        textoDescarga += `Potasio: ${document.getElementById("potasio6h").textContent} cc\n`;
        textoDescarga += `Calcio: ${document.getElementById("calcio6h").textContent} cc\n`;
        textoDescarga += `Magnesio: ${document.getElementById("magnesio6h").textContent} cc\n`;
        textoDescarga += `Aminoácidos: ${document.getElementById("aminoacidos6h").textContent} cc\n`;
        textoDescarga += `Lípidos: ${document.getElementById("lipidos6h").textContent} cc\n`;
        textoDescarga += `Dextrosa 50%: ${document.getElementById("dextrosa50_6h").textContent} cc\n`;
        textoDescarga += `Dextrosa 10%: ${document.getElementById("dextrosa10_6h").textContent} cc\n`;
        textoDescarga += `Dextrosa 5%: ${document.getElementById("dextrosa5_6h").textContent} cc\n`;
        textoDescarga += `Total por dosis: ${document.getElementById("total6h").textContent} cc\n`;
        textoDescarga += `Tonicidad por dosis: ${document.getElementById("tonicidad6h").textContent} mOsm/L\n`;
    }

    const dosis8HorasDiv = document.getElementById("dosis8Horas");
    if (dosis8HorasDiv.style.display === "block") {
        textoDescarga += "\n--- Dosis Cada 8 Horas ---\n";
        textoDescarga += `Sodio: ${document.getElementById("sodio8h").textContent} cc\n`;
        textoDescarga += `Potasio: ${document.getElementById("potasio8h").textContent} cc\n`;
        textoDescarga += `Calcio: ${document.getElementById("calcio8h").textContent} cc\n`;
        textoDescarga += `Magnesio: ${document.getElementById("magnesio8h").textContent} cc\n`;
        textoDescarga += `Aminoácidos: ${document.getElementById("aminoacidos8h").textContent} cc\n`;
        textoDescarga += `Lípidos: ${document.getElementById("lipidos8h").textContent} cc\n`;
        textoDescarga += `Dextrosa 50%: ${document.getElementById("dextrosa50_8h").textContent} cc\n`;
        textoDescarga += `Dextrosa 10%: ${document.getElementById("dextrosa10_8h").textContent} cc\n`;
        textoDescarga += `Dextrosa 5%: ${document.getElementById("dextrosa5_8h").textContent} cc\n`;
        textoDescarga += `Total por dosis: ${document.getElementById("total8h").textContent} cc\n`;
        textoDescarga += `Tonicidad por dosis: ${document.getElementById("tonicidad8h").textContent} mOsm/L\n`;
    }

    const dosis12HorasDiv = document.getElementById("dosis12Horas");
    if (dosis12HorasDiv.style.display === "block") {
        textoDescarga += "\n--- Dosis Cada 12 Horas ---\n";
        textoDescarga += `Sodio: ${document.getElementById("sodio12h").textContent} cc\n`;
        textoDescarga += `Potasio: ${document.getElementById("potasio12h").textContent} cc\n`;
        textoDescarga += `Calcio: ${document.getElementById("calcio12h").textContent} cc\n`;
        textoDescarga += `Magnesio: ${document.getElementById("magnesio12h").textContent} cc\n`;
        textoDescarga += `Aminoácidos: ${document.getElementById("aminoacidos12h").textContent} cc\n`;
        textoDescarga += `Lípidos: ${document.getElementById("lipidos12h").textContent} cc\n`;
        textoDescarga += `Dextrosa 50%: ${document.getElementById("dextrosa50_12h").textContent} cc\n`;
        textoDescarga += `Dextrosa 10%: ${document.getElementById("dextrosa10_12h").textContent} cc\n`;
        textoDescarga += `Dextrosa 5%: ${document.getElementById("dextrosa5_12h").textContent} cc\n`;
        textoDescarga += `Total por dosis: ${document.getElementById("total12h").textContent} cc\n`;
        textoDescarga += `Tonicidad por dosis: ${document.getElementById("tonicidad12h").textContent} mOsm/L\n`;
    }

    const nombreArchivo = "resultados_nutricion_parenteral.txt";
    const blob = new Blob([textoDescarga], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function compartirResultados() {
    const resultadoDiv = document.getElementById("result");
    if (resultadoDiv.style.display === "none") {
        alert("Por favor, calcule los resultados primero.");
        return;
    }

    let textoCompartir = "Resultados de la Calculadora de Nutrición Parenteral Total:\n\n";

    // Recopilar resultados generales
    textoCompartir += "--- Resultados Generales ---\n";
    textoCompartir += `Peso del paciente: ${document.getElementById("pesoPaciente").textContent} kg\n`;
    textoCompartir += `Flujo metabólico: ${document.getElementById("flujoMetabolicoPaciente").textContent} mg/kg/minuto\n`;
    textoCompartir += `Valor Holliday: ${document.getElementById("valorHolliday").textContent} cc\n`;
    textoCompartir += `Volumen Sodio: ${document.getElementById("volumenSodio").textContent} cc\n`;
    textoCompartir += `Volumen Potasio: ${document.getElementById("volumenPotasio").textContent} cc\n`;
    textoCompartir += `Volumen Calcio: ${document.getElementById("volumenCalcio").textContent} cc\n`;
    textoCompartir += `Volumen Magnesio: ${document.getElementById("volumenMagnesio").textContent} cc\n`;
    textoCompartir += `Volumen Aminoácidos: ${document.getElementById("volumenAminoacidos").textContent} cc\n`;
    textoCompartir += `Volumen Lípidos: ${document.getElementById("volumenLipidos").textContent} cc\n`;
    textoCompartir += `Volumen Restante Dextrosa: ${document.getElementById("volumenRestanteDextrosa").textContent} cc\n`;
    textoCompartir += `Calorías Totales: ${document.getElementById("caloriasTotales").textContent} kcal/día\n`;
    textoCompartir += `Dextrosa Necesaria: ${document.getElementById("dextrosaNecesariaGramos").textContent} gramos/día\n`;

    // Recopilar presentación de dextrosa
    textoCompartir += "\n--- Presentación de Dextrosa ---\n";
    const presentaciones = document.getElementById("presentacionesResult").getElementsByTagName("li");
    for (let i = 0; i < presentaciones.length; i++) {
        textoCompartir += `${presentaciones[i].textContent}\n`;
    }

    // Recopilar porcentaje de dextrosa
    textoCompartir += "\n--- Porcentaje de Dextrosa Total ---\n";
    const porcentajes = document.getElementById("porcentajeDextrosaResult").getElementsByTagName("li");
    for (let i = 0; i < porcentajes.length; i++) {
        textoCompartir += `${porcentajes[i].textContent}\n`;
    }

    textoCompartir += `\nSuma de Volúmenes: ${document.getElementById("sumaVolumenes").textContent} cc\n`;

    // Recopilar dosis horarias si están visibles
    const dosis6HorasDiv = document.getElementById("dosis6Horas");
    if (dosis6HorasDiv.style.display === "block") {
        textoCompartir += "\n--- Dosis Cada 6 Horas ---\n";
        textoCompartir += `Sodio: ${document.getElementById("sodio6h").textContent} cc\n`;
        textoCompartir += `Potasio: ${document.getElementById("potasio6h").textContent} cc\n`;
        textoCompartir += `Calcio: ${document.getElementById("calcio6h").textContent} cc\n`;
        textoCompartir += `Magnesio: ${document.getElementById("magnesio6h").textContent} cc\n`;
        textoCompartir += `Aminoácidos: ${document.getElementById("aminoacidos6h").textContent} cc\n`;
        textoCompartir += `Lípidos: ${document.getElementById("lipidos6h").textContent} cc\n`;
        textoCompartir += `Dextrosa 50%: ${document.getElementById("dextrosa50_6h").textContent} cc\n`;
        textoCompartir += `Dextrosa 10%: ${document.getElementById("dextrosa10_6h").textContent} cc\n`;
        textoCompartir += `Dextrosa 5%: ${document.getElementById("dextrosa5_6h").textContent} cc\n`;
        textoCompartir += `Total por dosis: ${document.getElementById("total6h").textContent} cc\n`;
        textoCompartir += `Tonicidad por dosis: ${document.getElementById("tonicidad6h").textContent} mOsm/L\n`;
    }

    const dosis8HorasDiv = document.getElementById("dosis8Horas");
    if (dosis8HorasDiv.style.display === "block") {
        textoCompartir += "\n--- Dosis Cada 8 Horas ---\n";
        textoCompartir += `Sodio: ${document.getElementById("sodio8h").textContent} cc\n`;
        textoCompartir += `Potasio: ${document.getElementById("potasio8h").textContent} cc\n`;
        textoCompartir += `Calcio: ${document.getElementById("calcio8h").textContent} cc\n`;
        textoCompartir += `Magnesio: ${document.getElementById("magnesio8h").textContent} cc\n`;
        textoCompartir += `Aminoácidos: ${document.getElementById("aminoacidos8h").textContent} cc\n`;
        textoCompartir += `Lípidos: ${document.getElementById("lipidos8h").textContent} cc\n`;
        textoCompartir += `Dextrosa 50%: ${document.getElementById("dextrosa50_8h").textContent} cc\n`;
        textoCompartir += `Dextrosa 10%: ${document.getElementById("dextrosa10_8h").textContent} cc\n`;
        textoCompartir += `Dextrosa 5%: ${document.getElementById("dextrosa5_8h").textContent} cc\n`;
        textoCompartir += `Total por dosis: ${document.getElementById("total8h").textContent} cc\n`;
        textoCompartir += `Tonicidad por dosis: ${document.getElementById("tonicidad8h").textContent} mOsm/L\n`;
    }

    const dosis12HorasDiv = document.getElementById("dosis12Horas");
    if (dosis12HorasDiv.style.display === "block") {
        textoCompartir += "\n--- Dosis Cada 12 Horas ---\n";
        textoCompartir += `Sodio: ${document.getElementById("sodio12h").textContent} cc\n`;
        textoCompartir += `Potasio: ${document.getElementById("potasio12h").textContent} cc\n`;
        textoCompartir += `Calcio: ${document.getElementById("calcio12h").textContent} cc\n`;
        textoCompartir += `Magnesio: ${document.getElementById("magnesio12h").textContent} cc\n`;
        textoCompartir += `Aminoácidos: ${document.getElementById("aminoacidos12h").textContent} cc\n`;
        textoCompartir += `Lípidos: ${document.getElementById("lipidos12h").textContent} cc\n`;
        textoCompartir += `Dextrosa 50%: ${document.getElementById("dextrosa50_12h").textContent} cc\n`;
        textoCompartir += `Dextrosa 10%: ${document.getElementById("dextrosa10_12h").textContent} cc\n`;
        textoCompartir += `Dextrosa 5%: ${document.getElementById("dextrosa5_12h").textContent} cc\n`;
        textoCompartir += `Total por dosis: ${document.getElementById("total12h").textContent} cc\n`;
        textoCompartir += `Tonicidad por dosis: ${document.getElementById("tonicidad12h").textContent} mOsm/L\n`;
    }

    if (navigator.share) {
        navigator.share({
            title: 'Resultados de Nutrición Parenteral Total',
            text: textoCompartir,
        })
        .then(() => console.log('Compartido exitosamente'))
        .catch((error) => console.error('Error al compartir', error));
    } else {
        // Opción para copiar al portapapeles si navigator.share no está disponible
        const tempElement = document.createElement('textarea');
        tempElement.value = textoCompartir;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);
        alert('Los resultados se han copiado al portapapeles. Puedes pegarlos y compartirlos donde necesites.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const voiceInputButton = document.getElementById('voice-input-button');
    let isRecording = false;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const recognition = new ('webkitSpeechRecognition' in window ? webkitSpeechRecognition : SpeechRecognition)();
        recognition.lang = 'es-CO'; // Establecer el idioma a español de Colombia
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = function() {
            isRecording = true;
            voiceInputButton.textContent = '🔴 Escuchando...';
        };

        recognition.onresult = function(event) {
            const finalTranscript = event.results[0][0].transcript.toLowerCase();
            console.log('Transcrito:', finalTranscript);

            if (finalTranscript.includes('calcular')) {
                calcularNutricion(24);
            } else if (finalTranscript.includes('reiniciar')) {
                reiniciarCalculadora();
            } else if (finalTranscript.includes('dividir cada 6 horas')) {
                calcularTonicidadPorDosis(6);
            } else if (finalTranscript.includes('dividir cada 8 horas')) {
                calcularTonicidadPorDosis(8);
            } else if (finalTranscript.includes('dividir cada 12 horas')) {
                calcularTonicidadPorDosis(12);
            } else if (finalTranscript.includes('modo claro')) {
                body.classList.add('light-mode');
                themeToggle.textContent = 'Modo Oscuro';
            } else if (finalTranscript.includes('modo oscuro')) {
                body.classList.remove('light-mode');
                themeToggle.textContent = 'Modo Claro';
            } else if (finalTranscript.includes('descargar')) {
                descargarResultados();
            } else if (finalTranscript.includes('compartir')) {
                compartirResultados();
            } else if (finalTranscript.includes('fin')) {
                recognition.stop();
            }
        };

        recognition.onerror = function(event) {
            isRecording = false;
            voiceInputButton.textContent = '🎙️ Voz a Texto';
            console.error('Error de reconocimiento de voz:', event.error);
            alert('Hubo un error con el reconocimiento de voz. Por favor, inténtalo de nuevo.');
        };

        recognition.onend = function() {
            isRecording = false;
            voiceInputButton.textContent = '🎙️ Voz a Texto';
        };

        voiceInputButton.addEventListener('click', function() {
            if (!isRecording) {
                recognition.start();
            } else {
                recognition.stop();
            }
        });
    } else {
        voiceInputButton.disabled = true;
        voiceInputButton.textContent = '🚫 Voz no soportada';
        alert('El reconocimiento de voz no es compatible con este navegador.');
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            themeToggle.textContent = 'Modo Oscuro';
        } else {
            themeToggle.textContent = 'Modo Claro';
        }
    });

    reiniciarCalculadora(); // Llamar a reiniciarCalculadora al cargar la página
});