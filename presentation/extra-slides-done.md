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

> Każdy projekt / aplikacja ma swoje własne repozytorium. W wielu projektach w których pracowałem, to obecnie standard pisania aplikacji. Tworzy się repozytoria z monolitami. api, admin, mobile, web, kazdy projekt ma swoje wlasne repo. Jak są jakieś części wspólne to wyciąga się je do osobnych repozytoriów.

---

### Sposób #2 - Monorepo

> Cały kod projektu jest trzymany w jedym repozytorium z wieloma bilbliotekami / aplikacjami / projektami.

---

### Monolit

> Jeśli repozytorium zawiera masywną aplikację bez podziału i hermetyzacji poszczególnych części, jest to po prostu duże repo. Nie oznacza to jednak wcale, że jest to monorepo. W rzeczywistości, takie repo jest nadmiernie monolityczne, co często jest pierwszą rzeczą, jaka przychodzi ludziom do głowy, gdy myślą o monorepo.

`Monolit != Monorepo`

---

### Moduł

> oddzielny twór, przeważnie w postaci osobnego pliku, zawierający zdefiniowany interfejs, a także implementacje typów wartości, klas, zmiennych, stałych oraz treści procedur i funkcji. Jest to podstawowy element koncepcji programowania modularnego pozwalający na podział kodu programu na funkcjonalne części i umieszczenie ich w osobnych modułach, które są ponadto niezależne i wymienne.

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