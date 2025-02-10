import { render, screen } from '@testing-library/react';
import ChatWindow from './ChatWindow';
import '@testing-library/jest-dom';

describe('ChatWindow Component', () => {
  test('renders the header and prompt', () => {
    render(<ChatWindow />);
    expect(screen.getByText(/Hi, Chat with me/i)).toBeInTheDocument();
    expect(screen.getByText(/How can I help you today/i)).toBeInTheDocument();
  });

  test('renders the MessageInput component', () => {
    render(<ChatWindow />);
    expect(
      screen.getByPlaceholderText(/Type a question for me/i)
    ).toBeInTheDocument();
  });
});