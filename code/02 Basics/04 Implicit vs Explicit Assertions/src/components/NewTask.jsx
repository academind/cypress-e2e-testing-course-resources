import { useRef, useState } from 'react';

import './NewTask.css';

function NewTask({ onAddTask, onCancel }) {
  const titleRef = useRef();
  const summaryRef = useRef();
  const categoryRef = useRef();

  const [formInvalid, setFormInvalid] = useState(false);

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleRef.current.value;
    const enteredSummary = summaryRef.current.value;
    const chosenCategory = categoryRef.current.value;

    if (
      enteredTitle.trim().length === 0 ||
      enteredSummary.trim().length === 0
    ) {
      setFormInvalid(true);
      return;
    }

    const taskData = {
      title: enteredTitle,
      summary: enteredSummary,
      category: chosenCategory,
    };
    onAddTask(taskData);
  }

  return (
    <form id="new-task-form" onSubmit={submitHandler}>
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </p>
      <p>
        <label htmlFor="summary">Summary</label>
        <textarea id="summary" rows="5" ref={summaryRef} />
      </p>
      <p>
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryRef} defaultValue="moderate">
          <option value="urgent">🚨 Urgent</option>
          <option value="important">🔴 Important</option>
          <option value="moderate">🔵 Moderate</option>
          <option value="low">🟢 Low</option>
        </select>
      </p>
      {formInvalid && (
        <p className="error-message">
          Please provide values for task title, summary and category!
        </p>
      )}
      <p className="actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Add Task</button>
      </p>
    </form>
  );
}

export default NewTask;
