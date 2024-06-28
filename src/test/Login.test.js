// Step 1: Import necessary modules and functions
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import Login from '../components/auth/Login';
import { loginUser } from '../redux/actions';
import { MemoryRouter } from 'react-router-dom';

// Step 2: Mock dependencies
const mockStore = configureStore([thunk]);
const store = mockStore({});
jest.mock('../redux/actions', () => ({
  loginUser: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Step 3: Write the test case
describe('Login Component', () => {
  it('should handle login success', async () => {
    loginUser.mockImplementation(() => (dispatch) => {
      return Promise.resolve({ authenticated: true });
    });

    // Step 4: Render the component
    const history = createMemoryHistory();
    const { getByLabelText, getByRole } = render(
        <Provider store={store}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </Provider>
      );

    // Step 5: Simulate user input
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });

    // Step 6: Simulate form submission
    fireEvent.click(getByRole('button', { name: /login/i }));

    // Step 7: Assert the expected outcome
    await waitFor(() => expect(loginUser).toHaveBeenCalledWith('testuser', 'password'));
    expect(mockNavigate).toHaveBeenCalledWith('/photo-search');
  });
});

// Step 8: Run the test
// This is typically done via the command line with a command like `npm test` or `yarn test`.
