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

        const firstElement = screen.getByRole('article');
        expect(firstElement).toBeInTheDocument();
    });

    test('not renders spendings when request is pending', () => {

        render(<SpendingList status='pending' />);

        const firstElement = screen.queryByText('First spending');
        expect(firstElement).toBeNull();
    });

    test('renders <Loader> when request is pending', () => {
        
        const { getByTestId } = render(<SpendingList status='pending' />);
        expect(getByTestId('loader')).toBeInTheDocument();
    });

    test('renders <h1> element "No spendings" when request suceeds, but empty list', () => {
        
        render(<SpendingList loadedSpendings={[]} status='completed' />);

        const h1NoSpendings = screen.getByRole('heading');
        expect(h1NoSpendings).toBeInTheDocument();
    });

    test('renders <Error> when request answers with error', () => {
        
        render(<SpendingList status='completed' error='Some error message' />);
        
        const errorHeading = screen.getByRole('heading');
        expect(errorHeading).toBeInTheDocument();

        const errorElement = screen.getByText('The server is probably down', {exact: false});
        expect(errorElement).toBeInTheDocument();
    });

});