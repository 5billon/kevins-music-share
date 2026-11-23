import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Signup } from '../src/Signup.js';

describe('Signup', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
    vi.stubGlobal('alert', vi.fn());
  });

  // test to check if the form is rendering properly when the Signup function is called
  it('Submits the signup form with an email and password and shows the confirmation message', () => {
    const onSuccess = vi.fn();
    Signup(container, onSuccess);

    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const form = document.querySelector('#signup-form');

    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input', { bubbles: true }));

    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input', { bubbles: true }));

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(alert).toHaveBeenCalledWith('Successfully signed up!');
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });


// test for edge-cases, currently accepts emails that are clearly invalid.
  it('Submits the form even when an invalid email address is entered', () => {
    const onSuccess = vi.fn();
    Signup(container, onSuccess);

    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const form = document.querySelector('#signup-form');

    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input', { bubbles: true }));

    passwordInput.value = '123';
    passwordInput.dispatchEvent(new Event('input', { bubbles: true }));

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(alert).toHaveBeenCalledWith('Successfully signed up!');
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  //checks when form is submitted that it does not crash or error when left empty
  it('Completes the signup form submission without errors when called', () => {
    Signup(container);

    const form = document.querySelector('#signup-form');

    expect(() => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }).not.toThrow();
  });
});