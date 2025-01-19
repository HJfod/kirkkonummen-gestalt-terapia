# Kirkkonummen Gestalt-terapian nettisivut

Nettisivut ovat kirjoitettu HTML-kielellä, joskin tiedostot käyvät läpi ylimääräisen automaattisen käsittelyvaiheen julkaistessa. Sivujen lähdekoodi löytyy `src`-kansiosta.

## Sivujen muokkaaminen

Jos jotain sivua halutaan muokata, avaa sivuston HTML-tiedosto `src`-kansiosta. Sivuston lähdekoodin muokkaamiseksi tarvitaan hieman pintakäsitystä HTML-kielen syntaksista, mutta pienten muokkausten ei pitäisi olla liian monimutkaista.

Esimerkiksi hinnaston muuttaminen:

1. Avaa `src/hinnasto.html` GitHubin verkkoeditorissa ([linkki](https://github.com/HJfod/juice-nettisivut/edit/main/src/hinnasto.html))
2. Muuta haluttua tekstiä. Varo rikkomasta olemassaolevia `<>`-tageja!
3. Paina `Commit changes...` ja valinnaisesti kirjoita kuvaus muokkauksille. Tämän jälkeen paina `Commit changes` uudelleen. Sivuston pitäisi muutaman minuutin päästä olla automaattisesti päivittynyt. Jos päivitys ei jostain syystä näy, voit tarkistaa [Actions-välilehdeltä](https://github.com/HJfod/juice-nettisivut/actions) onko ylimmäisin tapahtuma onnistunut (vihreä OK-merkki) vai jostain syystä epäonnistunut (punainen X-merkki). Jos tapahtuma epäonnistui, kannattaa ottaa yhteyttä Aaroon.

Perustagien selitykset:
 - `<h2>`: Väliotsikko
 - `<p>`: Yksittäinen kappale leipätekstiä
 - `<br>`: Uusi rivi
 - `<a>`: Linkki toiselle sivulle tai nettiin

## Uusien sivujen lisääminen

Jos sivustolle halutaan lisätä uusia sivuja, tämä tapahtuu seuraavasti:

1. Luo uusi HTML-tiedosto `src`-kansioon (esim. `uusi-sivu.html`)
2. Lisää sivustolle jotain sisältöä (esim. kopioi `terapia.html`-sivun sisältö ja vaihda leipäteksti)
3. Lisää uusi sivu `PAGES`-muuttujan listaan. Listan komponentit ovat erotettu `//////`-tekstillä. Helpoin tapa on kopioida olemassa oleva komponentti, ja vaihtaa tiedoston nimi ja sivun nimi. Tässä näkyvä sivun nimi on mitä näkyy sivuston navigaatiossa.

Esimerkki `uusi-sivu.html`-tiedostosta:

```html
<div class="cover">
    <h1>Uuden sivun nimi</h1>
    INSERT_IMAGE_HERE=metsa
</div>
<span class="cover-padding"></span>

<div class="cover-bg"><article>
    <h2>Uusi sivu</h2>

    <p>Uuden sivun leipäteksti. Kappaleita voi lisätä tekemällä uusia p-elementtejä. Väliotsikoita voi lisätä h2-elementeillä.</p>
</article></div>
```

Esimerkki muutoksesta `PAGES`-muuttujaan:

```json
{
    title: "Uuden sivun nimi",
    file: "uusi-sivu.html"
},
```

## Uusien kuvien lisääminen

Jos sivustolle halutaan lisätä uusia, nämä kuvat täytyy ensin ladata `images`-kansioon. Kuvien kuuluu olla JPG-muodossa. Ladattujen kuvien olisi hyvä olla mahdollisimman suuria ja korkealaatuisia; nettisivun käsittelyvaihe muodostaa automattisesti pienempiä versioita kuvista mobiililaitteille.

Kuvien käyttö itse sivustolla toimii lisäämällä `INSERT_IMAGE_HERE=kuvatiedoston-nimi` haluttuun paikkaan sivun HTML-tiedostossa.
