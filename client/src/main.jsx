import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd'

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
    <App />
  </ConfigProvider>
)
