import { render, screen } from '@testing-library/react';
import MessageInput from './MessageInput';
import '@testing-library/jest-dom';

describe('MessageInput Component', () => {
  test('renders the input field and send button', () => {
    render(<MessageInput />);
    const inputElement = screen.getByPlaceholderText(/Type a question for me/i);
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });
});