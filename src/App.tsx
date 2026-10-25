import React, { useEffect, useState } from 'react';
import './styles/app.css';
import './styles/content.css';
import { Header } from './pages/content/header';
import { Main } from './pages/content/main';
import { Footer } from './pages/content/footer';
import { PageProvider } from './utils/pageContext';
import { DaggerforgeGuide, GUIDE_HASH } from './pages/daggerforgeGuide';

function App() {
  // The guide is a shareable #daggerforge-guide link layered over the portfolio, so closing it keeps your place.
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      <PageProvider>
        <Header />
        <Main />
        <Footer />
      </PageProvider>
      {hash === GUIDE_HASH && <DaggerforgeGuide />}
    </>
  );
}

export default App;
