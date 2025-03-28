document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const formulaSections = document.getElementById('secciones-principales');
    const formulaBoxes = formulaSections.querySelectorAll('.box');
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
    });

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm) {
            let found = false;
            formulaBoxes.forEach(box => {
                const formulaName = box.dataset.formulaName.toLowerCase();
                if (formulaName.includes(searchTerm)) {
                    const link = box.querySelector('a');
                    if (link) {
                        window.location.href = link.href;
                        found = true;
                    }
                }
            });
            if (!found) {
                alert('No se encontró ninguna fórmula que coincida con tu búsqueda.');
            }
        } else {
            alert('Por favor, introduce el nombre de la fórmula que deseas buscar.');
        }
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
    // Función para mostrar la siguiente imagen del slider
    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = 'block';
        setTimeout(showSlides, 2000); // Cambia la imagen cada 2 segundos (2000 milisegundos)
    }

    showSlides(); // Inicia el slider cuando la página se carga
});