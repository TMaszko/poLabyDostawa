import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {lpad, countPrice, groupByWare } from "./components/AddCommissionView/AddCommissionView"

it('makingLPAD', () => {
	const input = 15;
	const result = lpad('0')(4)(input);
	expect(result).toBe('0015');
});

it('countingTotalPrice', () => {
	const input = [{total: 320}, {total: 360}];
	const result = countPrice(input);
	expect(result).toBe(680);
})

it('groupping by ware', () => {
	const input = [{
		price: 5.55,
		ware: {
			_id: "5a5c6c023848d33de440d9e6",
			towar: "5a5a5b27b84a2453c8555772",
			ilosc: 4,
			zamowienie: "5a5c6c023848d33de440d9e5",
			__v: 0,
			pozycjaZleceniaDostawy: "5a5c6c023848d33de440d9e6"
		}
	},
		{
			price: 6.52,
			ware: {
				_id: "5a5c8f01a81a265cf8b177fb",
				towar: "5a5b66f3c5c433065cfb25ca",
				ilosc: 10,
				zamowienie: "5a5c8f01a81a265cf8b177fa",
				__v: 0,
				pozycjaZleceniaDostawy: "5a5c8f01a81a265cf8b177fb"
			}
		},
		{
			price: 5.55,
			ware: {
				_id: "5a5ca6f042a27110e8d40df2",
				towar: "5a5a5b27b84a2453c8555772",
				ilosc: 10,
				zamowienie: "5a5ca6f042a27110e8d40df1",
				__v: 0
			}
		}]
		const expectedOutput = {
			"5a5a5b27b84a2453c8555772": { ware: '5a5a5b27b84a2453c8555772', amount: 14, price: 5.55 },
			"5a5b66f3c5c433065cfb25ca": { ware: '5a5b66f3c5c433065cfb25ca', amount: 10, price: 6.52 }
		}

	expect(groupByWare(input)).toEqual(expectedOutput)



})



