import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Welcome from '../layout/main/Welcome';

test('renders Sozure header and paragraph', () => {
    render(<Welcome />);
    const headerElement1 = screen.getByText(/So/i);
    const paragraphElement = screen.getByText(/Automates tasks in Azure Devops/i);
    expect(headerElement1).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });