import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SpendingList from './SpendingList';

jest.mock('./Loader', () => () => <div data-testid="loader" />);

describe('SpendingList component', () => {
    test('renders spendings if request succeeds', () => {
        const spendings = [{ id: 1, description: 'First spending', amount: 34, spentAt: '2022-04-08T13:55:50.687685', currency: 'USD' }];
        render(<SpendingList
            loadedSpendings={spendings}
            status='completed' />);

        const firstElement = screen.queryByText('First spending');
        expect(firstElement).toBeInTheDocument();
    });

    test('not renders spendings when request is pending', () => {

        render(<SpendingList status='pending' />);

        const firstElement = screen.queryByText('First spending');
        expect(firstElement).toBeNull();
    });

    test('renders Loader when request is pending', () => {
        
        const { getByTestId } = render(<SpendingList status='pending' />);
        expect(getByTestId('loader')).toBeInTheDocument();
    });

/*     test('renders <h1> element "No spendings" when request suceeds, but empty list', () => {
        
        const { getByTestId } = render(<SpendingList status='pending' />);
        expect(getByTestId('loader')).toBeInTheDocument();
    }); */

});