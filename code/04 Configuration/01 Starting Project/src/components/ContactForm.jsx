import { useEffect, useReducer, useState } from 'react';
import classes from './ContactForm.module.css';

const initialState = {
  name: {
    value: '',
    blurred: false,
  },
  email: {
    value: '',
    blurred: false,
  },
  message: {
    value: '',
    blurred: false,
  },
};

const formReducer = (state, action) => {
  if (action.type === 'INPUT_CHANGE') {
    return {
      ...state,
      [action.input]: {
        value: action.value,
        blurred: false,
      },
    };
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      ...state,
      [action.input]: {
        ...state[action.input],
        blurred: true,
      },
    };
  }

  return initialState;
};

function ContactForm() {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { name, email, message } = formState;
  const nameIsValid = name.value.trim() !== '';
  const emailIsValid = email.value.trim() !== '' && email.value.includes('@');
  const messageIsValid = message.value.trim() !== '';

  const nameIsInvalid = !nameIsValid && name.blurred;
  const emailIsInvalid = !emailIsValid && email.blurred;
  const messageIsInvalid = !messageIsValid && message.blurred;

  useEffect(() => {
    if (isSubmitting) {
      console.log('Sending message...');
      const timer = setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitting]);

  function changeInputHandler(event) {
    dispatch({
      type: 'INPUT_CHANGE',
      input: event.target.id,
      value: event.target.value,
    });
  }

  function blurInputHandler(event) {
    dispatch({
      type: 'INPUT_BLUR',
      input: event.target.id,
    });
  }

  function submitHandler(event) {
    event.preventDefault();

    if (!nameIsValid || !emailIsValid || !messageIsValid) {
      return;
    }

    setIsSubmitting(true);
  }

  return (
    <>
      <h2 className="center">Contact Us</h2>
      <form className={classes.form} onSubmit={submitHandler}>
        <p className={messageIsInvalid ? classes.invalid : undefined}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            onChange={changeInputHandler}
            onBlur={blurInputHandler}
            required
            data-cy="contact-input-message"
          />
        </p>
        <div className={classes.row}>
          <p className={nameIsInvalid ? classes.invalid : undefined}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              onChange={changeInputHandler}
              onBlur={blurInputHandler}
              required
              data-cy="contact-input-name"
            />
          </p>
          <p className={emailIsInvalid ? classes.invalid : undefined}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              onChange={changeInputHandler}
              onBlur={blurInputHandler}
              required
              data-cy="contact-input-email"
            />
          </p>
        </div>
        <p className={classes.actions}>
          <button
            type="submit"
            data-cy="contact-btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </p>
      </form>
    </>
  );
}

export default ContactForm;
