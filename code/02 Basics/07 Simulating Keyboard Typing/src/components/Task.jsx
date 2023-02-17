import './Task.css';

const CATEGORY_ICONS = {
  urgent: '🚨',
  important: '🔴',
  moderate: '🔵',
  low: '🟢',
};

function Task({ category, title, summary }) {
  return (
    <li className='task'>
      <span className='task-category'>{CATEGORY_ICONS[category]}</span>
      <div>
        <h2>{title}</h2>
        <p>{summary}</p>
      </div>
    </li>
  );
}

export default Task;
