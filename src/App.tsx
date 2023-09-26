import React from 'react';
import './App.scss';
import TodoList from './Components/TodoList';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <TodoList/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
