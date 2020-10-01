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

        <a
          className="App-link"
          href="https://github.com/simplelocalize/simplelocalize-i18next"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("OPEN_GITHUB_REPOSITORY")}
        </a>
      </header>
    </div>
  );
}

export default App;
