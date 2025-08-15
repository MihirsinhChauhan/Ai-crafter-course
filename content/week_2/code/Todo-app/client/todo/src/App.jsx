import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskListPage from './pages/TaskListPage';
import CreateTaskPage from './pages/CreateTaskPage';
import EditTaskPage from './pages/EditTaskPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/create" element={<CreateTaskPage />} />
         <Route path="/edit/:id" element={<EditTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;