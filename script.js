/**
 * Nazwa: Prosta wyszukiwarka listy z przyciskiem czyszczenia (X)
 * Opis: Skrypt dodaje pole wyszukiwania nad wskazaną listą HTML.
 * Obsługuje dynamiczne ładowanie treści (AJAX) za pomocą MutationObserver.
 * Dedykowany dla platform sklepowych (np. Idosell), gdzie filtry przeładowują się bez odświeżania strony.
 */
(function() {
    'use strict';

    // --- KONFIGURACJA (Dostosuj te wartości pod swoją stronę) ---

    // 1. ID listy (UL lub OL), którą chcesz filtrować
    const TARGET_LIST_ID = 'filter_traits273_content'; // <--- ZMIEŃ TO: Tutaj wpisz ID swojej listy

    // 2. Unikalne ID dla kontenera wyszukiwarki (zapobiega duplikatom)
    const SEARCH_WRAPPER_ID = 'custom_search_wrapper'; 

    // 3. Selektor przycisku "Pokaż więcej" (opcjonalne, zostaw puste cudzysłowy '' jeśli nie ma)
    const SHOW_MORE_SELECTOR = 'a[data-id="filter_traits273"]'; // <--- ZMIEŃ TO: Selektor przycisku paginacji

    // --- GŁÓWNA FUNKCJA ---
    function injectSearch() {
        const targetList = document.getElementById(TARGET_LIST_ID);

        // Jeśli nie ma listy docelowej LUB wyszukiwarka już istnieje -> przerwij działanie
        if (!targetList || document.getElementById(SEARCH_WRAPPER_ID)) return;

        // 1. Tworzymy KONTENER (Wrapper)
        // Jest potrzebny, aby przycisk "X" pozycjonować względem pola input
        const wrapper = document.createElement('div');
        wrapper.id = SEARCH_WRAPPER_ID;
        Object.assign(wrapper.style, {
            position: 'relative',
            marginBottom: '10px',
            marginTop: '5px',
            width: '100%'
        });

        // 2. Tworzymy POLE TEKSTOWE (Input)
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Wyszukaj model...'; // <--- MOŻESZ ZMIENIĆ TEKST
        searchInput.className = 'f-control'; // Klasa stylów (np. z Bootstrapa), żeby pasowało do reszty strony
        
        Object.assign(searchInput.style, {
            width: '100%',
            padding: '8px 30px 8px 10px', // Prawy padding większy, żeby tekst nie wchodził pod "X"
            border: '1px solid #ccc',
            borderRadius: '3px'
        });

        // 3. Tworzymy PRZYCISK CZYSZCZENIA (X)
        const clearBtn = document.createElement('span');
        clearBtn.innerHTML = '&times;'; // Symbol znaku mnożenia (ładny "X")
        Object.assign(clearBtn.style, {
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)', // Idealne centrowanie w pionie
            cursor: 'pointer',
            fontSize: '18px',
            color: '#999',
            display: 'none', // Domyślnie ukryty (pokaże się po wpisaniu tekstu)
            fontWeight: 'bold',
            lineHeight: '1'
        });

        // Składamy elementy w całość (Input + X wkładamy do Wrappera)
        wrapper.appendChild(searchInput);
        wrapper.appendChild(clearBtn);
        
        // Wstawiamy gotową wyszukiwarkę PRZED listą
        targetList.parentNode.insertBefore(wrapper, targetList);

        // --- LOGIKA FILTROWANIA ---

        function filterItems(val) {
            const filterValue = val.toLowerCase();
            const items = targetList.querySelectorAll('li'); // Pobieramy wszystkie elementy listy
            const showMoreBtn = document.querySelector(SHOW_MORE_SELECTOR);

            items.forEach(item => {
                // Szukamy tekstu wewnątrz <label> lub bezpośrednio w <li>
                const label = item.querySelector('label');
                const text = label ? label.textContent : item.textContent;
                
                // Sprawdzamy czy tekst zawiera szukaną frazę
                if (text.toLowerCase().indexOf(filterValue) > -1) {
                    item.style.setProperty('display', 'block', 'important'); // Wymuszamy pokazanie
                    item.classList.remove('--hidden'); // Usuwamy ewentualne klasy ukrywające
                } else {
                    item.style.setProperty('display', 'none', 'important'); // Wymuszamy ukrycie
                }
            });

            // Ukrywamy przycisk "Pokaż więcej" podczas wyszukiwania, żeby nie mylił użytkownika
            if (showMoreBtn) {
                showMoreBtn.style.display = (filterValue.length > 0) ? 'none' : '';
            }
        }

        // Zdarzenie: Wpisywanie tekstu
        searchInput.addEventListener('input', function(e) {
            const val = e.target.value;
            filterItems(val);
            
            // Pokaż lub ukryj "X" zależnie czy wpisano tekst
            clearBtn.style.display = (val.length > 0) ? 'block' : 'none';
        });

        // Zdarzenie: Kliknięcie w "X"
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';      // Wyczyść pole
            searchInput.focus();         // Ustaw kursor w polu
            clearBtn.style.display = 'none'; // Ukryj X
            filterItems('');             // Zresetuj filtry (pokaż wszystko)
        });
    }

    // --- OBSERWATOR ZMIAN (MutationObserver) ---
    // Niezbędne dla stron, które doładowują filtry przez AJAX (np. Idosell)
    // Gdy strona podmieni listę, obserwator wykryje to i ponownie doda wyszukiwarkę.
    const observer = new MutationObserver(function(mutations) {
        injectSearch();
    });

    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
        injectSearch();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, { childList: true, subtree: true });
            injectSearch();
        });
    }

})();
