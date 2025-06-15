# Book Lists App (`book_lists_api`)

## Opis projektu

„Book Lists App” to aplikacja webowa stworzona w Node.js z wykorzystaniem frameworka Express oraz silnika szablonów EJS. Umożliwia użytkownikowi przeglądanie, wyszukiwanie i wylogowanie z list książek. Projekt zrealizowany w celach edukacyjnych jako zadanie zaliczeniowe.

---

## Funkcjonalności

- Wyświetlanie strony głównej z wyszukiwaniem książek
- Szczegóły pojedynczej listy
- Wyszukiwanie książek z filtrami
- Wylogowanie użytkownika
- Dodawanie i usuwanie książek do/z list
- Obsługa błędów (404, 409, 500)
- Szablony EJS z częściami wspólnymi (`partials`)

---

## Jak uruchomić aplikację?

### Wymagania:
- Node.js w wersji **18.x** lub nowszej
- npm (Node Package Manager)

### Instrukcje:

```bash
# 1. Sklonować repozytorium
git clone <URL_do_repozytorium>

# 2. Przejść do katalogu projektu
cd book_lists_api

# 3. Zainstalować zależności
npm install

# 4. Uruchomić serwer
npm start

```

### Wykorzystanie bibliotek:

- express
- ejs
- method-override
- axios

---


### Struktura aplikacji

book_lists_api/
├── controllers/              # Logika aplikacji i obsługa żądań
│   ├── bookController.js
│   ├── listsController.js
│   └── logoutController.js
│
├── models/                   # Modele danych
│   └── listModel.js
│
├── routing/                  # Trasy aplikacji
│   ├── bookRouting.js
│   ├── listsRouting.js
│   ├── logoutRouting.js
│   └── killApplicationRouting.js
│
├── constants/                # Stałe aplikacji
│   ├── navigation.js
│   └── statusCode.js
│
├── utils/                    # Funkcje pomocnicze
│   ├── getFileFromAbsolutePath.js
│   └── logger.js
│
├── public/                   # Pliki statyczne (style, obrazy)
│   ├── icons/
│   ├── images/
│   └── main.css
│
├── views/                    # Widoki EJS
│   ├── partials/             # Wspólne fragmenty HTML (nawigacja)
│   ├── 404.ejs
│   ├── 409.ejs
│   ├── 500.ejs
│   ├── bookHomePage.ejs
│   ├── list.ejs
│   ├── listsPage.ejs
│   ├── logout.ejs
│   └── search.ejs
│
├── server.js                 # Główny plik uruchamiający aplikację
├── package.json              # Plik konfiguracyjny z zależnościami
└── README.md                 # Dokumentacja projektu


---


### Przykładowe dane wejściowe

GET /search?q=percy+jackson - Wyszukiwanie książki 

