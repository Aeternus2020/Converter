import React from 'react';

interface CurrencyProps  {
    name: string
}

const Currency: React.FC<CurrencyProps> = ( { name }) => {

	return (
		<div>
            {name}
		</div>
	);
};

export default Currency;