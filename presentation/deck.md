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

- Mobile (React Native) - 70%
- Web (React) - 20%
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

> Budowanie rozbudowanego klonu na potrzeby prezentacji mija się z celem. Do aplikacji z całą pewnością da się dorzucać więcej funkcjonalności, ale celem prezentacji jest przede wszystkim pokazanie mozliwosci budowania projektów na platformie NX.

---

## Jak podejsc do budowania wieloplatformowej aplikacji? 🤔

> Teraz będzie trochę tekstu poprzeplatanego z obrazkami... dla potomnych

---

<!-- Scoped style -->
<style scoped>
code {
  font-size: 60px;
}
</style>

```jsx
<ScianaTekstu>
```

---

### Sposób #1 - Polyrepo

> Kazda aplikacja, projekt ma swoje wlasne repozytorium. W wielu firmach w których pracowałem, to obecnie standard pisania aplikacji. Tworzy sie repozytoria z monolitami. api, admin, mobile, web, kazdy projekt ma swoje wlasne repo. Jak sa jakies czesci wspolne to wyciaga sie je do osobnych repozytoriow.

---

### Sposób #2 - Monorepo

> Cały kod projektu jest trzymany w jedym repozytorium z wieloma bilbliotekami / aplikacjami / projektami.

---

<!-- _footer: '' -->

![height:650](images/monorepo-polyrepo.svg)

---

### Monolit

> Jeśli repozytorium zawiera masywną aplikację bez podziału i hermetyzacji poszczególnych części, jest to po prostu duże repo. Nie oznacza to jednak wcale, ze jest to monorepo. W rzeczywistości takie repo jest nadmiernie monolityczne, co często jest pierwszą rzeczą, jaka przychodzi ludziom do głowy, gdy myślą o monorepo.

Monolit != Monorepo.

---

### Moduł

> oddzielny twór, przeważnie w postaci osobnego pliku, zawierający zdefiniowany interfejs, a także implementacje typów wartości, klas, zmiennych, stałych oraz treści procedur i funkcji. Jest to podstawowy element koncepcji programowania modularnego pozwalający na podział kodu programu na funkcjonalne części i umieszczenie ich w osobnych modułach, które są ponadto niezależne i wymienne.

---

![images/monolith-modular.svg](images/monolith-modular.svg)

---

📖 wiecej na:
https://monorepo.tools/

---

<!-- Scoped style -->
<style scoped>
code {
  font-size: 60px;
}
</style>

```
</ScianaTekstu>
```

---

## No to jedziemy, monorepo i moduły 🚀

---

## Proces budowania aplikacji

---

### Określamy jakie ficzery sa do zaimplementowania

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

## NX Dev

https://nx.dev

> `NX` jest jak `VSCode` wśród narzędzi do budowania. Core Nx'a umożliwia tworzenie i analizę grafu projektu, orkiestrację, wykonywanie zadań oraz generowanie kodu.

---

## Tworzenie kodu

```sh
nx generate [generator] [project]

nx generate @nrwl/react:app my-app
nx generate @nrwl/react:lib shared-button
nx generate @nrwl/react:storybook-configuration shared-button
nx generate @nrwl/js:lib my-lib
```

---

## Działanie na kodzie

```sh
nx [target] [project]
nx build app
nx serve app
nx test app
```

---

## Rozumienie kodu

```sh
nx graph
nx list
```

---

### Start projektu

---

![bg contain](images/create-workspace.png)

---

![bg contain](images/tree.png)

---

<!-- TODO: -->

nie miałem projektu UI, wiec na samym poczatku zaczalem od robienia frontu w React Native

![images/first-app.png](images/first-app.png)

---

Polecenie tworzy dwie aplikacje:

- tweeter-mobile
- tweeter-mobile-e2e

---

## NX Console

Mozna uzywac wtyczki do VSCode, ktora pozwala zapomniec o poleceniach i flagach do uzycia w konsoli

---

![bg contain](images/nx-console.png)

---

W kolejnym kroku zrobilem testowe dane i skorzystałem z nich w komponentach

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

a nastepnie generujemy testowe tweety i eksporujemy z paczki

![width:1200](images/test-tweets.png)

---

### Współdzielenie komponentów

Zastanowilem sie jak mozna wspoldzielic komponenty i dla samego faktu pokazania, ze mozna je wspoldzielic uznalem, ze pojde w react-native-web + tailwind

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

Co jesli na webie ma to wygladac inaczej?

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

<!-- _footer: '' -->

![bg fit](images/tweets-react-native.png)

---

Tworzyłem testowe dane, podpinałem kolejne komponenty tworzylem ekrany i w rezultacie wyszło:

---

<!-- _footer: '' -->

![bg horizontal fit](images/rn-tweets.png)
![bg fit](images/rn-tweet-details.png)
![bg fit](images/rn-create-tweet.png)

---

Android nie wygląda juz tak dobrze, ale uruchomiłem go tylko raz :) Więc jest i tak całkiem nieźle

---

<!-- _footer: '' -->

![bg horizontal fit](images/android-tweets.png)
![bg fit](images/android-tweet.png)
![bg fit](images/android-create-tweet.png)

---

Zostawmy na chwilę apkę mobilną

---

### Backend

Mamy wyboru mamy trzy pluginy:

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

i generuję apke za pomoca cli 🧑‍💻

```sh
nx g @nrwl/express:app api
```

albo wyklikuje z UI 😎

---

![](images/generate-api-1.png)

---

![bg width:90%](images/generate-api-2.png)

---

![bg left:38%](images/generate-api-3-complete.png)

Ta aplikacja, z perspektywy Nx nie ma wyodrębnionych bibliotek, ale zdecydowanie nie jest monolityczna

---

![bg width:105%](images/tweets-response-api.png)

---

### Klient API

Po napisaniu backendu napisalem biblioteke, ktora jest klientem do tego api

---

<!-- _footer: '' -->

![bg fit](images/client-example.png)

---

### Data provider

`react-query` do fetchowania i cache'owania danych. Mozna reuzywac miedzy aplikacjami

---

![bg fit](images/login-mutation.png)

---

![bg height:90%](images/tweets-query.png)

---

![bg fit](images/comments-query.png)

---

![bg fit](images/delete-user-mutation.png)

---

### Kończenie aplikacji mobilnej
Wszystkie ekrany aplikacji mobilnej wyciagnalem do zewnętrznego modułu `native-screens`. Dzieki NX wygenerowanie nowego modulu jest banalnie proste.

```sh
nx g @nrwl/react-native:library native-screens
```

---

## Polecenia dostępne w NX

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

### Kolejno

1. wygenerowałem aplikacje webowa za pomoca generatora NX React
2. oraz aplikacje admina za pomocna generatora NX NextJS

---

## Co mozna bylo wspoldzielic?

- miedzy wszystkimi aplikacjami - typy, helpery, schemas
- miedzy wszystkimi aplikacjami UI - proste komponenty UI, propsy tych komponentów, formularze, data-providers
- api jest zbudowane w formie monolitu

---

## Reguła którą warto zapamiętać

- 80% logiki idzie do katalogu `libs/`
- 20% do katalogu `apps/`

- `libs` to moduły naszych aplikacji ustrukturyzowane w
- `apps` to kontenety na te moduły

---

## Generowanie grafów zaleznosci

---

<!-- _footer: '' -->

![bg](images/graph-1-all.png)

---

<!-- _footer: '' -->

![bg](images/graph-2-tweeter-mobile.png)

---

<!-- _footer: '' -->

![bg](images/graph-3-shared-forms.png)

---

<!-- _footer: '' -->

![bg](images/graph-4-api.png)

---

<!-- _footer: '' -->

![bg](images/graph-5-mobile.png)

---

## co zrobilbym lepiej?

- z perspektywy czasu zaczalbym od pisania backendu
- rozbicie na środowiska, bo byl problem przy pisaniu testow i uruchamianiem aplikacji na srodowisku developerskim

---

- rozbiłbym aplikacje api na biblioteki Nx chociaz nie mam pomyslu jak 🤔
- przebudowałbym aplikacje webowa tak, zeby ekrany mogly byc wspoldzielone miedzy web i admin (web jest zbudowany za pomoca `create-react-app`, admin za pomoca `NextJS`)
- lepsze wspoldzielenie typów

---

## Pytania / pomysly?

---

# Dziękuję za uwagę!

Repo prezentacji i kodu projektu:

👨‍💻 https://github.com/kacgrzes/infoshare-f3

