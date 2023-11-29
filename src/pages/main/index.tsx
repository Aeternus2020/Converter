import React from 'react';
import Header from '../../components/Header';
import Currency from '../../components/Currency';

const Main = () => {

	return (
		<div>
            <Header />
            Main
            <Currency name="USD"/>
            <Currency name="EUR"/>
		</div>
	);
};

export default Main;