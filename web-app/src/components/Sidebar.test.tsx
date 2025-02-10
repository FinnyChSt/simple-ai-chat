import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';
import '@testing-library/jest-dom';

describe('Sidebar component', () => {
  test('renders the header', () => {
    render(<Sidebar />);
    const headerElement = screen.getByText('AI Chat');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders "New chat" button', () => {
    render(<Sidebar />);
    const buttonElement = screen.getByRole('button', { name: /new chat/i });
    expect(buttonElement).toBeInTheDocument();
  });
});