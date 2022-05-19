---
marp: true
theme: infoshare-f3
size: 16:9
footer: '![height:25px grayscale:1](images/future3-infoshare-ukraine-logo.svg) · ![height:25px grayscale:1](images/binarapps-logo.svg)'
paginate: true
---

# Cześć 👋

Kacper Grzeszczyk
kacgrzes.io / kacgrzes@gmail.com

---

## Jestem programistą JS / TS 🧑‍💻:

- Mobile (React Native) - 60%
- Web (React) - 30%
- Server (NodeJS) - 10%

---

## Byłem trenerem w InfoShare Academy 👨‍🏫

---

<!-- _footer: '' -->

![bg width:120% blur:8px](images/nx-bg.png)

## `Budowanie wieloplatformowych aplikacji za pomocą narzędzia NX`

---

<!-- _footer: '' -->

![bg fit](images/elon-meme.jpeg)

---

## Zbudujemy klon Tittera roboczo nazwany `Tweeter` 🐣

---

## Disclaimer

> Budowanie rozbudowanego klonu na potrzeby prezentacji mija się z celem. Do aplikacji z całą pewnością da się dorzucać więcej funkcjonalności, ale celem prezki jest przede wszystkim pokazanie możliwości budowania projektów na platformie NX.

---

## Jak podejść do budowania wieloplatformowej aplikacji? 🤔

---

![bg](images/monolith-modular.svg)

---

<!-- _footer: '' -->

![height:650](images/monorepo-polyrepo.svg)

---

![bg width:1100px](images/spectrum-real-world.svg)

---

📖 wiecej na:
https://monorepo.tools/

---

## NX Dev

https://nx.dev

> `NX` jest jak `VSCode` wśród narzędzi do budowania. Core Nx'a umożliwia tworzenie i analizę grafu projektu, orkiestrację, wykonywanie zadań oraz generowanie kodu.

---

### Przyjrzyjmy się temu z lotu ptaka 🦅

---

## Tworzenie kodu

```sh
nx generate [generator] [project]

nx generate @nrwl/react:app my-app
nx generate @nrwl/react:lib shared-button
nx generate @nrwl/react:storybook-configuration shared-button
nx generate @nrwl/js:lib my-lib
```

Nx rozwiązuje problem konfiguracji narzędzi takich jak: Jest, Babel, TypeScript, Webpack, Prettier, Eslint

---

## Działanie na kodzie

```sh
nx [target] [project]
nx build app
nx serve app
nx test app
```

Dzięki Nx każdy projekt ma te same polecenia do budowania, testowania i uruchamiania.

---

## Rozumienie kodu

```sh
nx graph
nx list
```

Nx analizuje strukturę naszego kodu co umożliwia podglad jakie moduly są od siebie zależne, jak ze sobą współpracują. Wykrywa zmiany w kodzie co pozwala wykonywać polecenia tylko na zmodyfikowanych projektach.

---

## Zapamiętajmy i wróćmy do aplikacji...

---

## Określamy jakie ficzery sa do zaimplementowania

---

#### W aplikacjach mobilnych (ios oraz android) 📱 i w apce webowej 💻:

- przeglądanie tweetów
- dodawanie tweetow
- dodawanie komentarzy
- like / unlike tweeta

---

#### W aplikacji adminowej 💻 (next.js)

- usuwanie userów i tweetów 🤐

---

#### W aplikacji serwerowej

endpointy do wcześniej wymienionych funkcjonalności:

- auth - logowanie
- users - rejestracja, listowanie oraz usuwanie uzytkowników
- tweets - dodawanie, listowanie oraz usuwanie tweetów oraz like / unlike tweeta
- comments - listowanie, dodawanie, usuwanie komentarzy

---

## Rozpoczęcie projektu

---

![bg contain](images/create-workspace.png)

---

![bg contain](images/tree.png)

---

<!-- TODO: -->

nie miałem projektu UI, więc na samym poczatku zacząłem od robienia aplikacji mobilnej w React Native

![images/first-app.png](images/first-app.png)

---

Polecenie tworzy dwie aplikacje w katalogu `apps/`

- tweeter-mobile
- tweeter-mobile-e2e

---

## NX Console

Można używać wtyczki do VSCode, która pozwala zapomnieć o poleceniach i flagach, których używalibyśmy z poziomu CLI

---

![bg contain](images/nx-console.png)

---

W kolejnym kroku zrobiłem paczkę z testowymi danymi z których będę korzystał do wypełnienia UI aplikacji.

---

![bg 90%](images/init-paczki-1.png)

---

![bg 90%](images/init-paczki-2.png)

---

![bg 90%](images/init-paczki-3.png)

---

### Ale, dane testowe będą miały określony typ

Więc generujemy kolejna paczke z typami :)

---

![bg 90%](images/tweet-type-structure.png)
![bg 100%](images/tweet-type.png)

---

A następnie w paczce `@infoshare-f3/test-data`...

---

![bg left:65% width:110%](images/create-random-tweet.png)

Importujemy typy i uzywamy do funkcji generujacej tweety

---

a następnie generujemy testowe tweety i eksporujemy z paczki

![width:1200](images/test-tweets.png)

---

### Współdzielenie komponentów

Zastanowiłem się jak mozna wspoldzielic komponenty i dla samego faktu pokazania, że mozna je wspoldzielić między projektami, uznałem, ze stworzę je przy użyciu paczek: `react-native-web` oraz `tailwind`

czyli kolejna paczka..

---

<!-- _footer: '' -->

![bg fit](images/create-shared-ui.png)

---

<!-- _footer: '' -->

![bg height:85%](images/select-styles.png)

---

![bg 100% horizontal](images/button-props.png)
![bg 105%](images/button.png)

---

### Co jesli na webie ma to wygladac inaczej?

---

![bg height:50%](images/tweet-component-structure.png)

---

![width:1000px](images/tweet-props.png)

---

![bg fit](images/tweet-web.png)

---

![bg height:90%](images/tweet-native.png)

---

Zbudowałem zestaw gotowych komponentów i wyeksportowalem je z paczki

![img height:400px](images/components.png)

---

### a następnie użyłem ich do budowania ekranów aplikacji

---

<!-- _footer: '' -->

![bg fit](images/tweets-react-native.png)

---

Tworzyłem testowe dane dla wszystkich domen, podpinałem kolejne komponenty, tworzyłem ekrany i w rezultacie wyszło:

---

<!-- _footer: '' -->

![bg horizontal fit](images/rn-tweets.png)
![bg fit](images/rn-tweet-details.png)
![bg fit](images/rn-create-tweet.png)

---

#### Android nie wygląda juz tak dobrze, ale uruchomiłem go tylko raz :) Więc jest i tak całkiem nieźle:

---

<!-- _footer: '' -->

![bg horizontal fit](images/android-tweets.png)
![bg fit](images/android-tweet.png)
![bg fit](images/android-create-tweet.png)

---

## Zostawmy na chwilę apkę mobilną

---

### Backend

Oficjalnie mamy wyboru mamy trzy pluginy:

- @nrwl/express
- @rnwl/nest
- @nrwl/node

---

## Backend

Napisalem w `express.js` za pomoca metodyki TDD (tutaj chcialem byc pewny, ze wszystko dziala jak nalezy)

---

## Instaluję kolejny generator:

```sh
npm install --save-dev @nrwl/express
```

i generuję apke za pomocą CLI 🧑‍💻

```sh
nx g @nrwl/express:app api
```

albo wyklikuję z UI 😎

---

![](images/generate-api-1.png)

---

![bg width:90%](images/generate-api-2.png)

---

![bg left:38%](images/generate-api-3-complete.png)

Ta aplikacja, z perspektywy Nx nie ma wyodrębnionych bibliotek, ale zdecydowanie jest podzielona na moduły, które można by wydzielić do osobnych bibliotek.

---

`Przykład kontrolera`

<!-- Scoped style -->
<style scoped>
code {
  font-size: 50px;
  right: 0;
  position: absolute;
}
</style>

![bg width:105%](images/tweets-response-api.png)

---

### Klient API

Po napisaniu backendu napisalem bibliotekę, która jest klientem do tego api

---

<!-- _footer: '' -->

![bg fit left](images/client-example.png)

Biblioteka jest zbiorem gotowych funkcji, dzięki którym komunikujemy się z API. Jeśli dorzucimy do niej typy to mamy perfekcyjną warstwę komunikacji serwer klient.

---

### Data provider

`react-query` do fetchowania i cache'owania danych. Można reużywać między aplikacjami.

---

![bg fit](images/login-mutation.png)

---

![bg fit](images/delete-user-mutation.png)

---

### Kończenie aplikacji mobilnej

Wszystkie ekrany aplikacji mobilnej wyciagnalem do zewnętrznego modułu `native-screens`. Dzieki NX wygenerowanie nowego modulu jest banalnie proste.

```sh
nx g @nrwl/react-native:library native-screens
```

---

## Aplikacja webowa

wygenerowałem aplikacje webową za pomoca generatora Nx React. Użyłem gotowych komponentów z aplikacji mobilnej.

---

![bg fit](images/web-tweets.png)

---

![bg fit](images/web-tweet.png)

---

## Panel administratora

---

![bg fit](images/admin-users.png)

---

![bg fit](images/admin-tweets.png)

---

## Co mozna bylo jeszcze wspoldzielić poza częściami UI?

- miedzy wszystkimi aplikacjami - typy, helpery, schemas
- miedzy wszystkimi aplikacjami UI - propsy komponentów, logika formularzy, data-providers

---

![bg fit](images/share-create-tweet-schema.png)

---

![bg fit](images/share-create-tweet-router.png)

---

![bg fit](images/share-create-tweet-form.png)

---

## Reguła którą warto zapamiętać

- 80% logiki idzie do katalogu `libs/`
- 20% do katalogu `apps/`

- `libs/` to moduły naszych aplikacji ustrukturyzowane w
- `apps/` to kontenery na te moduły

---

## Polecenia dostępne w NX z poziomu VSCode

---

<!-- _footer: '' -->

![bg horizontal width:95%](images/nx-commands-1.png)
![bg width:95%](images/nx-commands-2.png)

---

## Uruchamianie wielu projektów jednocześnie

---

<!-- _footer: '' -->

![bg height:90%](images/run-many-1.png)

---

<!-- _footer: '' -->

![bg height:90%](images/run-many-2.png)

---

<!-- _footer: '' -->

![bg height:90%](images/run-many-3.png)

---

<!-- _footer: '' -->

![bg width:90%](images/run-many-4.png)

---

## Generowanie grafów zaleznosci

---

<!-- Scoped style -->
<style scoped>
h2 {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
}
</style>

## cały graf

<!-- _footer: '' -->

![bg](images/graph-1-all.png)

---

<!-- Scoped style -->
<style scoped>
h2 {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
}
</style>

## zaleznosci apki mobilnej

<!-- _footer: '' -->

![bg](images/graph-2-tweeter-mobile.png)

---

<!-- Scoped style -->
<style scoped>
h2 {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
}
</style>

## wspoldzielone formularze

<!-- _footer: '' -->

![bg](images/graph-3-shared-forms.png)

---

<!-- Scoped style -->
<style scoped>
h2 {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
}
</style>

## zaleznosci api

<!-- _footer: '' -->

![bg](images/graph-4-api.png)

---

<!-- Scoped style -->
<style scoped>
h3 {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
}
</style>

### odfiltrowana apka mobilna

<!-- _footer: '' -->

![bg](images/graph-5-mobile.png)

---

## co zrobiłbym lepiej?

- zacząłbym od pisania backendu
- rozbicie na środowiska, bo miałem problem przy pisaniu testow i uruchamianiem aplikacji na środowisku developerskim

---

- rozbiłbym aplikacje api na biblioteki i dzieliłbym kod domenowo

![width:600px](images/features.png)

---

- przebudowałbym aplikacje webowa tak, zeby ekrany mogly byc wspoldzielone miedzy web i admin (web jest zbudowany za pomoca `create-react-app`, admin za pomoca `NextJS`)
- lepsze wspoldzielenie typów

---

# Dziękuję za uwagę!

Repo prezentacji i kodu projektu:

👨‍💻 https://github.com/kacgrzes/infoshare-f3

zachęcam do forkowania i sprawdzania możliwości Nx
