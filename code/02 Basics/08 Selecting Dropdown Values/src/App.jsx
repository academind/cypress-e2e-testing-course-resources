import { useState } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';

import NewTask from './components/NewTask';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';

function App() {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [appliedFilter, setAppliedFilter] = useState('all');

  const displayedTasks = tasks.filter((task) => {
    if (appliedFilter === 'all') {
      return true;
    }
    return task.category === appliedFilter;
  });

  function startAddTaskHandler() {
    setIsAddingTask(true);
  }

  function cancelAddTaskHandler() {
    setIsAddingTask(false);
  }

  function addTaskHandler(taskData) {
    setTasks((prevTasks) => {
      return [
        ...prevTasks,
        {
          id: Math.random().toString(),
          ...taskData,
        },
      ];
    });
    setIsAddingTask(false);
  }

  function setFilterHandler(category) {
    setAppliedFilter(category);
  }

  return (
    <>
      {isAddingTask && (
        <Modal onClose={cancelAddTaskHandler}>
          <NewTask onAddTask={addTaskHandler} onCancel={cancelAddTaskHandler} />
        </Modal>
      )}
      <Header />
      <main>
        <TaskControl
          onStartAddTask={startAddTaskHandler}
          onSetFilter={setFilterHandler}
        />
        <TaskList tasks={displayedTasks} />
      </main>
    </>
  );
}

export default App;
