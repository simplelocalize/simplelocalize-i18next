// @ts-nocheck
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTranslation } from "react-i18next";

function App() {

  const { t, i18n } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>SimpleLocalize.io ⚡️ i18next</h1>
          <p>
            {t("USE_BUTTONS_BELOW")}
          </p>
          <button onClick={() => i18n.changeLanguage("en")}>English</button>
          <button onClick={() => i18n.changeLanguage("es")}>Spanish</button>
          <button onClick={() => i18n.changeLanguage("pl")}>Polish</button>
          <hr/>
        </div>

        <img src={logo} className="App-logo" alt="simplelocalize with i18next" />
        <p>
          {t("DESCRIPTION")}
        </p>

        <div className="App-links">
          <a
            className="App-link"
            href="https://github.com/simplelocalize/simplelocalize-i18next"
          >
            Github Repository
          </a>
          <div className="separator">|
          </div>
          <a
            className="App-link"
            href="https://simplelocalize.io/blog/posts/i18next-reactjs-localization/"
          >Read integration post</a>
          <div className="separator">|
          </div>
          <a
            className="App-link"
            href="https://simplelocalize.io/docs/integrations/i18next/"
          >
            Read integration docs
          </a></div>


      </header>
    </div>
  );
}

export default App;