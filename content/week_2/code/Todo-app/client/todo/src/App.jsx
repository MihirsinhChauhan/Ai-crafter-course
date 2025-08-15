import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskListPage from './pages/TaskListPage';
import CreateTaskPage from './pages/CreateTaskPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/create" element={<CreateTaskPage />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;