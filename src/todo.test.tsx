import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Todo from './Components/TodoItem';

jest.mock('react-query', () => ({
  useQueryClient: jest.fn(),
}));

const mockOnTodoRemoval = jest.fn();
const mockOntodoToggle = jest.fn();
const todo = {
  id: 1,
  title: 'Test Todo',
  completed: false,
};

test('check if deletebutton has been clicked', () => {

  const { getByRole } = render (
    <Todo todo={todo} onTodoToggle={mockOntodoToggle} onTodoRemoval={mockOnTodoRemoval}/>
  );
  
    const deleteButton = getByRole('button', {name: 'delete'});

    expect(deleteButton);
    fireEvent.click(deleteButton);

});

test('check if completeswitch has been toggled', () => {

    const { getByRole } = render (
      <Todo todo={todo} onTodoToggle={mockOntodoToggle} onTodoRemoval={mockOnTodoRemoval}/>
    );
    
      const toggleSwitch = getByRole('switch');
  
      expect(toggleSwitch);
      fireEvent.click(toggleSwitch);
  
  });