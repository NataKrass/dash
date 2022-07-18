import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from 'navigation/RouterConfig';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import store from 'store';
import theme from 'base/theme';
import MainWrapper from 'base/styled/MainWrapper';
import HeadContent from 'base/components/HeadContent';
import Responsive from 'context/responsive';

function App() {
  const [details, setDetails] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  const isTablet = width <= 1100;

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
            <Responsive.Provider
              value={{
                isMobile: isMobile,
                isTablet: isTablet,
                details: details,
                setDetails: setDetails,
                navbar: navbar,
                setNavbar: setNavbar
              }}
            >
              <MainWrapper>
                <HeadContent />
                <RouterConfig />
              </MainWrapper>
            </Responsive.Provider>
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
