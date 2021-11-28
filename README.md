# Repozytorium PESEL

Projekt został wygenerowany przy użyciu [Angular CLI](https://github.com/angular/angular-cli).

## Warunki wstępne do uruchomienia aplikacji
- Zainstaluj [NodeJS](https://nodejs.org/en/)

## Lokalny serwer developerski
Wykonaj `npm install` aby zainstalować potrzebne biblioteki
Wykonaj `npm run start` aby uruchomić aplikację lokalną.
Otwórz `http://localhost:4200/`. Aplikacja automatycznie się odświeży po zmianie plików.

## Build

Komenda `npm run build` buduje projekt. Artefakty build'u przechowywane są w `dist/`. Flaga `--prod` powinna być wykorzystana aby wykonać build produkcyjny.

## Uruchomienie lintera

Uruchom `npm run lint` aby uruchomić linter TypeScriptu [TSLint](https://palantir.github.io/tslint/)

## Uruchomienie testów jednostkowych

Uruchom `npm test` aby wykonać testy jednostkowe z wykorzystaniem [Karma](https://karma-runner.github.io).
Kod testów jednostkowych znajduje się w `/src/app/app.component.spec.ts`.

Aby uruchomić testy bez uruchomienia chrome'a, wpisz w konsoli: `npm test -- --no-watch --no-progress --browsers=ChromeHeadless`

## Uruchomienie testów end-to-end

Uruchom `npm run e2e` aby wykonać testy end to end z wykorzystaniem framework'u [Playwright](https://playwright.dev/)
Kod testów e2e znajduje się w `/tests/pesel.spec.ts`

## Zadanie 0 - instalacja potrzebnego oprogramowania
- [x] Zainstaluj [GitHub Desktop](https://desktop.github.com/)
- [x] Zainstaluj [Visual Studio Code](https://code.visualstudio.com/)
- [x] Zainstaluj [NodeJS](https://nodejs.org/en/)

## Zadanie 1 - setup
- [x] Stwórz forka repozytorium. [Poradnik znajdziesz tu](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- [x] Sklonuj sforkowane repozytorium (pracujemy na swoich repozytoriach)
- [x] Uruchom aplikację lokalnie, zgodnie z instrukcjami w tym pliku, w sekcji `Lokalny serwer developerski`
- [x] Dla ułatwienia pracy proponuję pracować jedynie na branchu `main`, dodatkowe branche dodamy później. Jeśli znasz dobrze GIT, to oczywiście możesz pracować na dowolnym innym branchu (tak jak to wynika z dobrych praktyk git workflow)

## Zadanie 2 - naprawa testów
- [x] Uruchom linter
- [x] Napraw wszystkie błędy lintera (plik `/src/app/app.component.ts` )
- [x] Uruchom testy jednostkowe
- [x] Napraw testy jednostkowe
- [x] Uruchom testy End-to-End
- [x] Napraw test End-to-End
- [x] Popraw testy `should accept valid PESEL` oraz `should reject invalid PESEL` aby testowały to, co powinny (prawidłowy i nieprawidłowy pesel oraz wyświetlane dane)

## Zadanie 3 - pokrycie unit testów
- [x] Uruchom testy jednostkowe z flagą `--code-coverage`, tj. wykonaj `npm test -- --code-coverage` 
- [x] Zweryfikuj raport html pokrycia kodu w pliku .coverage\pesel\index.html
- [x] Masz pomysł jak rozszerzyć pokrycie testów?

## Zadanie 4 - Konfiguracja pipeline'u CI z wykorzystaniem GitHub Actions
- [ ] W folderze `.github/workflows`, stwórz plik `main.yml`. Ew. wejdź w link `<adres-twojego-repo-na-github>/actions/new` i kliknij `set up a workflow yourself` aby otworzyć edytor online
- [ ] W pliku `main.yml` wpisz następujące linie:

~~~
name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    timeout-minutes: 10

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14.x'

      # Runs a single command using the runners shell
      - name: Install dependencies
        run: npm install
        
      # Runs a single command using the runners shell
      - name: Run a one-line script
        run: echo Hello, world!
~~~
- [x] Zrób `git commit` oraz `git push` - sprawdź czy Github Actions uruchomił Build
- [x] rozszerz konfigurację CI o linter
- [x] rozszerz konfigurację CI o testy jednostkowe
- [x] rozszerz konfigurację CI o budowanie aplikacji
- [x] rozszerz konfigurację CI o testy e2e, z pomocą komendy `npm run ci:e2e`

## Zadanie 5 - Konfiguracja deploymentu
- [x] w folderze `.github/workflows` stwórz plik `deploy.yml`
- [x] w pliku `package.json` zmień linijkę `8`, tj. wyedytuj `"build:prod": "ng build --prod --base-href https://loginGithub.github.io/nazwaRepozytorium/",` tak aby link uwzględniał Twoją nazwę repozytorium () oraz Twój login github
- [x] w pliku `deploy.yml` wpisz następujące linie:
~~~
name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    timeout-minutes: 10

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14.x'

      # Runs a single command using the runners shell
      - name: Install dependencies
        run: npm install

      - name: Build app
        run: npm run build:prod

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.6
        with:
          branch: gh-pages # The branch the action should deploy to.
          folder: dist/pesel # The folder the action should deploy.
~~~
- [x] `git commit` oraz `git push` - sprawdź czy GitHub Actions uruchomił Build
- [x] Wejdź w ustawienia swojego repozytorium, włącz GitHub Pages (wybierz branch gh-pages)
- [x] Otwórz link, taki jak wygenerowałeś wcześniej (krok 2 w tym zadaniu), aby zobaczyć , jak wygląda strona na GitHub Pages
 ## Zadanie 6 - Sprawdzamy czy całość działa
- [ ] W swoim repozytorium stwórz dodatkowy branch `valid`
- [ ] Wprowadź nieistotną zmianę na branchu `valid`
- [ ] `git commit` oraz `git push`
- [ ] stwórz Pull Request z `valid` do `main`
- [ ] W swoim repozytorium stwórz dodatkowy branch `invalid`
- [ ] Wprowadź na branchu `invalid` zmianę, która spowoduje, że któryś z testów nie przejdzie u
- [ ] `git commit` oraz `git push`
- [ ] stwórz Pull Request z `invalid` do `main`

 ## Zadanie *
- [ ] Co najmniej 1 rodzaj nieprawidłowego numeru PESEL jest oznaczany przez walidator jako prawidłowy. Jesteś w stanie go znaleźć?
- [ ] Jesteś w stanie go naprawić?
