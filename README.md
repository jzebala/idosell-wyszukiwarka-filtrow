# Wyszukiwarka Filtrów dla Idosell (Vanilla JS)

Lekki skrypt JavaScript, który rozwiązuje problem nawigacji po bardzo długich listach filtrów w sklepach internetowych (np. lista marek, modeli, roczników).

Stworzony i przetestowany na platformie **Idosell (IAI-Shop)**.

## 🧐 O co tutaj chodzi? (Problem i Rozwiązanie)

Wyobraź sobie sklep z częściami zamiennymi, który w filtrze "Model urządzenia" posiada **300 pozycji**.

* **Problem:** W standardowym szablonie klient widzi tylko pierwsze 10 pozycji. Aby znaleźć swój model (np. będący na końcu alfabetu), musi wielokrotnie klikać przycisk "Pokaż więcej" i przewijać długą listę. To frustrujące i często prowadzi do opuszczenia sklepu.
* **Rozwiązanie:** Ten skrypt dodaje **pole wyszukiwania** bezpośrednio nad listą. Klient wpisuje fragment nazwy (np. "Xiao"), a skrypt natychmiast ukrywa niepasujące elementy. Zamiast przewijać 300 pozycji, klient od razu widzi te 3, które go interesują.

## 🚀 Główne funkcje

* **Brak zależności:** Czysty JavaScript (Vanilla JS), zero jQuery czy zewnętrznych bibliotek.
* **Live Search:** Filtrowanie listy natychmiast po wpisaniu znaku.
* **Obsługa AJAX:** Dzięki `MutationObserver` skrypt "widzi", gdy sklep dynamicznie przeładowuje filtry (standard w Idosell) i automatycznie przywraca wyszukiwarkę.
* **UX Friendly:** Zawiera przycisk "X" do szybkiego czyszczenia frazy oraz ukrywa zbędną paginację ("Pokaż więcej") podczas wyszukiwania.

## 🛠️ Konfiguracja i Instalacja

Skrypt jest gotowy do użycia. Wystarczy dodać go w panelu sklepu (sekcja dodatków JS) i zmienić trzy zmienne na początku pliku:

```javascript
// 1. ID listy (UL/OL), którą chcesz filtrować
const TARGET_LIST_ID = 'filter_traits250_content'; 

// 2. Unikalne ID dla kontenera (dowolna nazwa)
const SEARCH_WRAPPER_ID = 'moj_kontener_szukania'; 

// 3. Selektor przycisku "Pokaż więcej" (opcjonalnie)
const SHOW_MORE_SELECTOR = 'a[data-id="filter_traits250"]';
