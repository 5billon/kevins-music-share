export function Signup(container, onSuccess) {
  let email = '';
  let password = '';

  function renderSignUpForm() {
    container.innerHTML = `
      <div class="login-signup">
        <h2>Sign Up</h2>
        <form id="signup-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" value="${email}" required/>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" value="${password}" required/>
          </div>
          <button type="submit" class="sign-btn">
            Sign Up
          </button>
        </form>
      </div>
    `;

    const form = document.querySelector('#signup-form');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    emailInput.addEventListener('input', (e) => {
      email = e.target.value;
    });

    passwordInput.addEventListener('input', (e) => {
      password = e.target.value;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Signing up with:', email, password);
      alert('Successfully signed up!');

      if (onSuccess) {
        onSuccess();
      }
    });
  }

  renderSignUpForm();
}

