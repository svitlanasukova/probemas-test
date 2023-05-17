import React, { ReactNode } from 'react';
import Header from './Header';
import { Container } from '@mui/material';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div>
			<Header />
			<Container>{children}</Container>
		</div>
	);
};

export default Layout;
