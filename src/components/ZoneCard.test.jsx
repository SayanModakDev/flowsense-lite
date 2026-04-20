import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ZoneCard from './ZoneCard';

describe('ZoneCard Component', () => {
  it('renders the zone name correctly', () => {
    const mockZone = { name: 'North Concourse Food', type: 'food', capacity: 200 };
    
    // Render the component with dummy data
    render(<ZoneCard zone={mockZone} density={45} />);
    
    // Assert that the text is found in the document
    expect(screen.getByText('North Concourse Food')).toBeDefined();
  });
});
