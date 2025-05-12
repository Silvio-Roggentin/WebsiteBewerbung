interface Projekt {
    bild: string;
    titel: string;
    beschreibung: string;
    link?: string;
    linkText?: string;
}

const meineProjekte: Projekt[] = [
    {
        bild: 'placeholder-projekt1.jpg',
        titel: 'Bachelorarbeit: Titel deiner Bachelorarbeit',
        beschreibung: 'Eine kurze, aber prägnante Beschreibung deiner Bachelorarbeit. Hebe die verwendeten Technologien und deine Rolle hervor. Zum Beispiel: "Entwicklung eines Prototyps für XYZ mittels ABC-Technologie. Fokus auf Performance und Benutzerfreundlichkeit."',
        link: '#',
        linkText: 'Mehr erfahren'
    },
    {
        bild: 'placeholder-spiel1.jpg',
        titel: 'Spieletitel 1',
        beschreibung: 'Kurze Beschreibung deines ersten Spiels. Welche Engine wurde verwendet (z.B. Unity mit C#)? Was war das Spielprinzip? Welche besonderen Features gab es?',
    },
    {
        bild: 'placeholder-spiel2.jpg',
        titel: 'Spieletitel 2',
        beschreibung: 'Kurze Beschreibung deines zweiten Spiels. Vielleicht hast du hier andere Technologien oder Konzepte ausprobiert. Betone, was du dabei gelernt hast.',
    }
];
function renderProjekte(): void {
    const projekteContainer = document.getElementById('projekte-container');
    if (!projekteContainer) {
        console.error("Projekte-Container nicht gefunden!");
        return;
    }

    let htmlOutput = '';
    meineProjekte.forEach(projekt => {
        htmlOutput += `
            <div class="projekt-card">
                <img src="${projekt.bild}" alt="Vorschaubild für ${projekt.titel}">
                <div class="projekt-card-content">
                    <h3>${projekt.titel}</h3>
                    <p>${projekt.beschreibung}</p>
                    ${projekt.link ? `<a href="${projekt.link}" class="projekt-link" target="_blank">${projekt.linkText || 'Ansehen'}</a>` : ''}
                </div>
            </div>
        `;
    });
    projekteContainer.innerHTML = htmlOutput;
}

function setzeAlter(): void {
    const alterTextSpan = document.getElementById('alter-text');
    if (alterTextSpan) {
        const geburtsjahr = new Date().getFullYear() - 22;
        const alter = new Date().getFullYear() - geburtsjahr;
        alterTextSpan.textContent = alter.toString();
    }
}

// Funktion für Smooth Scrolling und aktive Navigationslinks
function initNavigation(): void {
    const navLinks = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('main section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = (event.target as HTMLAnchorElement).getAttribute('href');
            if (targetId) {
                const targetSection = document.querySelector(targetId) as HTMLElement;
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Offset für die fixe Navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Aktiven Link hervorheben beim Scrollen
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.clientTop;
            if (pageYOffset >= sectionTop - 80) { // 80 als Offset für die Navbar + etwas Puffer
                currentSectionId = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    });
}


// DOMContentLoaded Event Listener, um sicherzustellen, dass das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {
    console.log("Website geladen. TypeScript ist aktiv!");

    setzeAlter();
    renderProjekte();
    initNavigation();

    const heroNameSpan = document.getElementById('hero-name');
    if(heroNameSpan){
        heroNameSpan.textContent = "Silvio";
    }
});