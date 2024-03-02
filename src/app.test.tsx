import { describe, expect, it } from 'vitest';
import { test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Example', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
});

test('renders welcome message', () => {
  render(<App />);
  expect(screen.getByText('Login')).toBeInTheDocument();
});
