import React, { Component } from 'react';

import Lead from '../lead/Lead';
import Paragraph from '../paragraph/Paragraph';
import Iframe from '../iframe/Iframe';
import Image from '../image/Image';
import Footer from '../footer/Footer';

import './ContentContainer.css';

const image = require('../../assets/Rplot.png');
const image2 = require('../../assets/Rplot01.png');
const image4 = require('../../assets/Rplot04.png');

class ContentContainer extends React.Component {
  render() {
    // In real life content would of course be separaten into a CMS
    return (
      <div className="ContentContainer">
        <Lead content=" "/>
        <Paragraph content='
          Lähtökohtana on klassinen data-ohjaa-aihetta -tilanne. 
          "Ota tästä tämmönen taulukko", piilotettuine sarakkeineen ilman tarkempaa kuvausta aineiston varsinaisesta sisällöstä.
          Ainakin lähdetään realistisesti liikkeelle, ei kun pureutumaan sisältöön. 
        '/>
        <Paragraph content='
          Datan lataamisen jälkeen ensimmäinen valinta on työkalu. Taulukko on viitisen tuhatta riviä, eli Excel-suorioutuisi siitä vielä, mutta päädyn
          hifistelemään R:llä lähinnä logiikan tallennettavuuden takia – käsittely jää paremmin talteen koodiin kuin taulukkolaskennan solumakroihin ja funktioihin.
          Lyhyen hypistelyn jälkeen on aineistosta saanut jo paremman käsityksen: Pitkälti sitä, mitä saattaisi vuokra-asunnoista löytyvän.
          Erikoisuutena mukana oli erikseen laskettuja sarakkeita verotusarvolle.
        '/>
        <Paragraph content='
          Kun datasta on käsitys, on vuorossa hypoteesin asettelu. Jo alkuvaiheessa ajatuksia on hyvä validoida lukijoiden näkökulmasta: 
          Kiinnostaako tämä ketään? Köyhän miehen käyttäjätutkimuksena toimi tällä kertaa vain muutama keskustelu, mutta näiden pohjalta
          lähdin tutkimaan keskusta-etäisyyden vaikutusta vuokrahintaan, kahdesta näkökulmasta: Etäisyys Helsingin keskustasta vs. etäisyys sijaintikunnan keskustasta.
        '/>
        <Image content={image} />
        <Paragraph content='
          Ensimmäinen vaihe tässä on geokoodata osoitteet datasta. Tämä onnistuu onneksi helposti Googlen Geolocation -rajapinnan avulla suoraan R:ssä.
          Google saa tässä tapauksessa myös määrittää, mikä on kunnan "keskusta" ts. keskustaksi merkitään se paikka, jonka Googlen rajapinta palauttaa ko. kunnan nimihaulla.
          Geokoodauksen jälkeen voidaan ensin laskea etäisyydet, ja sen jälkeen tarkastella niiden mahdollista korrelaatiota vuokrahinnan kanssa.
        '/>
        <Image content={image2} />
        <Paragraph content='
          Tarkastelemalla muuttujien korrelaatiomatriisia, voidaan todeta, että etäisyys kunnalliskeskustaan (geodistance_m) korreloi aavistuksen verran negatiivisesti kunnansisäisen hinnanvaihtelun kanssa (diff_to_avg_price_per_sqm).
          Mutta vain aavistuksen. (Ja aina on toki muistettava ettei korrelaatio välttämättä osoita riippuvuussuhdetta). Huomattavasti selkeämpi negatiivinen korrelaatio on Helsinki-etäisyyden ja vuokrahinnan välillä, eli pidempi etäisyys
          Helsingistä (yllätys yllätys!) näyttää tarkoittavan matalampaa vuokraa.
        '/>
        <Image content={image4} />
        <Paragraph content='
          Hajontakuvion tarkastelu osoittaa, kuinka pieni vaikutus etäisyydellä kunnalliskeskustaan näyttäisi mahdollisesti olevan kunnansisäiseen hinnanvaihteluun.
          Lopulta aiheesta ei siis saatu skuuppia aikaiseksi, ainakaan tästä näkökulmasta. Ehkä verotusarvon tarkastelu olisi saattanut tuoda mielenkiintoisempia lopputuloksia.
          Mutta vähemmän mielenkiintoisestakin datasetistä saa aikaan karttavisualisoinnin:
        '/>
        <Iframe url="https://zesty-walk.surge.sh/" />
        <Footer />
      </div>
    );
  }
}

export default ContentContainer;
