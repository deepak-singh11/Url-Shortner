import { PersistGate } from 'redux-persist/integration/react';
import { store,persistor } from './redux/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
