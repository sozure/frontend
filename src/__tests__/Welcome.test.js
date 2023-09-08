import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Welcome from '../layout/main/Welcome';

test('renders Sozure header and paragraph', () => {
    render(<Welcome />);
    const headerElement = screen.getByText(/Sozure/i);
    const paragraphElement = screen.getByText(/Automates tasks in Azure Devops/i);
    expect(headerElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });