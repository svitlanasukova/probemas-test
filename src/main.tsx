import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme.ts';
import { CurrencyProvider } from './components/Providers/Currency.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<CurrencyProvider>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</CurrencyProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
