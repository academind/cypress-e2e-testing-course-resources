function Filter({ onFilterChange }) {
  function filterChangeHandler(event) {
    onFilterChange(event.target.value);
  }

  return (
    <select id="filter" onChange={filterChangeHandler}>
      <option value="all">All</option>
      <option value="urgent">🚨 Urgent</option>
      <option value="important">🔴 Important</option>
      <option value="moderate">🔵 Moderate</option>
      <option value="low">🟢 Low</option>
    </select>
  );
}

export default Filter;
