import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from 'react';
import usaFlag from '../../assets/images/flags/usa.svg';
import euFlag from '../../assets/images/flags/eu.svg';
import ukFlag from '../../assets/images/flags/uk.svg';

const initialCurrency = {
	currentCurrencyId: 1,
	currencies: [
		{
			id: 1,
			name: 'USD',
			value: 1,
			flag: usaFlag,
		},
		{
			id: 2,
			name: 'EUR',
			value: 1.1,
			flag: euFlag,
		},
		{
			id: 3,
			name: 'GBP',
			value: 1.4,
			flag: ukFlag,
		},
	],
};

export const CurrencyContext = createContext({
	currency: initialCurrency,
	changeCurrency: (currencyId: number) => {},
});

export const CurrencyProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [currency, setCurrency] = useState(initialCurrency);

	useEffect(() => {
		console.log('currency changed ', currency);
	}, [currency]);

	const changeCurrency = useCallback((currencyId: number) => {
		setCurrency({ ...initialCurrency, currentCurrencyId: currencyId });
	}, []);

	return (
		<CurrencyContext.Provider
			value={{
				currency,
				changeCurrency,
			}}
		>
			{children}
		</CurrencyContext.Provider>
	);
};
