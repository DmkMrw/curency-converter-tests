import ResultBox from './ResultBox';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';




describe('Component CurrencyForm', () => {
     it('should render without crashing', () => {
          render(<ResultBox from="PLN" to="USD" amount={100} />);
     });

     // set test value to field
     const testCasesPLNToUSD = [
          { amount: '100', expectResult:'PLN 100.00 = $28.57'},
          { amount: '20', expectResult: 'PLN 20.00 = $5.71' },
          { amount: '200', expectResult: 'PLN 200.00 = $57.14' },
          { amount: '345', expectResult: 'PLN 345.00 = $98.57' },
     ];
     for (const testValue of testCasesPLNToUSD) {

          it('should render proper info about conversion when PLN -> USD', () => {
               render(<ResultBox from="PLN" to="USD" amount={parseInt(testValue.amount)} />);

               // find fields elems
               const resultDiv = screen.getByTestId('result-div');
               // check proper info
               expect(resultDiv).toHaveTextContent(testValue.expectResult);
          });
     };
     // set test value to field
     const testCasesUSDToPLN = [
          { amount: '100', expectResult:'$100.00 = PLN 350.00'},
          { amount: '20', expectResult: '$20.00 = PLN 70.00' },
          { amount: '200', expectResult: '$200.00 = PLN 700.00' },
          { amount: '345', expectResult: '$345.00 = PLN 1,207.50' },
     ];
     for (const testValue of testCasesUSDToPLN) {

          it('should render proper info about conversion when USD -> PLN', () => {
               render(<ResultBox from="USD" to="PLN" amount={parseInt(testValue.amount)} />);

               // find fields elems
               const resultDiv = screen.getByTestId('result-div');
               // check proper info
               expect(resultDiv).toHaveTextContent(testValue.expectResult);
          });
     };

     it('should render proper info when PLN -> PLN', () => {
          render(<ResultBox from="PLN" to="PLN" amount={100} />);

          // find fields elems
          const resultDiv = screen.getByTestId('result-div');
          // check proper info
          expect(resultDiv).toHaveTextContent('PLN 100.00 = PLN 100.00');
     });

     it('should render proper info when USD -> USD', () => {
          render(<ResultBox from="USD" to="USD" amount={100} />);

          // find fields elems
          const resultDiv = screen.getByTestId('result-div');
          // check proper info
          expect(resultDiv).toHaveTextContent('$100.00 = $100.00');
     });

     it('should render Error when amount < 0', () => {
          render(<ResultBox from="PLN" to="USD" amount={-5} />);
           // find fields elems
          const resultDiv = screen.getByTestId('result-div');
          // check proper info
          expect(resultDiv).toHaveTextContent('Wrong value');
     })
});