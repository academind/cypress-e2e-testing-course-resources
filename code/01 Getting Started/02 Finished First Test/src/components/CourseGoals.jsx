import {
  GrInstall,
  GrEdit,
  GrTerminal,
  GrResources,
  GrUserExpert,
  GrKey,
} from 'react-icons/gr';

import CourseGoal from './CourseGoal';
import classes from './CourseGoals.module.css';

const GOALS = [
  {
    icon: <GrInstall />,
    text: 'Learn how to install & start Cypress',
  },
  {
    icon: <GrEdit />,
    text: 'Learn how to write tests with Cypress',
  },
  {
    icon: <GrTerminal />,
    text: 'Understand the core Cypress features & commands',
  },
  {
    icon: <GrResources />,
    text: 'Customize & configure Cypress for your requirements',
  },
  {
    icon: <GrUserExpert />,
    text: 'Learn how to write good tests & follow best practices',
  },
  {
    icon: <GrKey />,
    text: 'Dive into more complex problems - e.g., user authentication testing',
  },
];

function CourseGoals() {
  return (
    <ul className={classes.goals}>
      {GOALS.map((goal) => (
        <CourseGoal key={goal.text} {...goal} />
      ))}
    </ul>
  );
}

export default CourseGoals;
