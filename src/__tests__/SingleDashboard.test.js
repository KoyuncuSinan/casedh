import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SingleDashboard from '../components/SingleDashboard';

test('renders SingleDashboard component', () => {
  const dashboard = { id: '1', displayName: 'Test Dashboard' };
  render(<SingleDashboard dashboard={dashboard} />);
  expect(screen.getByText('Test Dashboard')).toBeInTheDocument();
});

test('toggles star when clicked', () => {
  const dashboard = { id: '1', displayName: 'Test Dashboard' };
  const toggleStarred = jest.fn();
  render(<SingleDashboard dashboard={dashboard} toggleStarred={toggleStarred} />);
  fireEvent.click(screen.getByRole('button'));
  expect(toggleStarred).toHaveBeenCalledWith('1');
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ dashboardItems: [] }),
  })
);

describe('SingleDashboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dashboard name', () => {
    const { getByText } = render(<SingleDashboard dashboard={{ displayName: 'Test Dashboard', id: '1' }} expanded={false} />);
    expect(getByText('Test Dashboard')).toBeInTheDocument();
  });

  it('calls onExpand when clicked', () => {
    const handleExpand = jest.fn();
    const { getByRole } = render(<SingleDashboard dashboard={{ displayName: 'Test Dashboard', id: '1' }} expanded={false} onExpand={handleExpand} />);
    fireEvent.click(getByRole('SingleDashboard'));
    expect(handleExpand).toHaveBeenCalled();
  });
});