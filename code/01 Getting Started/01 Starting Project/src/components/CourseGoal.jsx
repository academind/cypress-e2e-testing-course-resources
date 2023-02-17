import classes from './CourseGoal.module.css';

function CourseGoal({ icon, text }) {
  return (
    <li className={classes.goal}>
      <span className={classes.icon}>{icon}</span>
      <span>{text}</span>
    </li>
  );
}

export default CourseGoal;
