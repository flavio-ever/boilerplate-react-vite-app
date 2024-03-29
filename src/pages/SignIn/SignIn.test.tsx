const signInMock = vi.fn().mockImplementation((...args) => {
  console.log('signInMock: args:', args);
  return Promise.resolve(void 0);
});

vi.mock('../../auth/UseAuth', () => ({
  UseAuth: vi.fn(() => ({
    signIn: signInMock,
  })),
}));

import { vi, it, expect, describe, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';
import userEvent from '@testing-library/user-event';
import { UseAuth } from '../../auth/UseAuth';

beforeEach(() => {
  signInMock.mockClear();
});

describe('SignIn Component Tests', () => {
  it('test mock setup', () => {
    render(<SignIn />);
    expect(UseAuth().signIn).not.toHaveBeenCalled();
  });

  it('shows an error message when the email is not provided', async () => {
    render(<SignIn />);

    await userEvent.click(screen.getByRole('button', { name: /login em sua conta/i }));

    expect(screen.getByText('O campo e-mail é obrigatório')).toBeInTheDocument();
  });

  it('shows an error message when the password is not provided', async () => {
    render(<SignIn />);

    await userEvent.type(screen.getByPlaceholderText('name@company.com'), 'test@example.com');

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText('O campo senha é obrigatório')).toBeInTheDocument();
  });

  it('calls signIn on form submission with correct data', async () => {
    render(<SignIn />);

    await userEvent.type(screen.getByPlaceholderText('name@company.com'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'password123');
    await userEvent.click(screen.getByLabelText('Lembrar-me'));
    await userEvent.click(screen.getByRole('button', { name: /login em sua conta/i }));

    await vi.waitFor(() => {
      const { signIn } = UseAuth();
      expect(signIn).toHaveBeenCalled();
    });
  });
});
