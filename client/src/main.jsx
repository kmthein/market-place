import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { persistStore } from "redux-persist"
import { PersistGate } from 'redux-persist/integration/react'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (import.meta.env.VITE_MODE === 'production') {
  disableReactDevTools();
}

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      components: {
        Tabs: {
          inkBarColor: "#3e4da3",
          itemActiveColor: "#3e4da3",
          itemHoverColor: "#3e4da3",
          itemSelectedColor: "#3e4da3",
        }
      }
    }}  
  >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ConfigProvider>
)
