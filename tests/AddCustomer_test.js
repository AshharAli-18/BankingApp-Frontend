Feature('Add Customer');

Before(({ I }) => {
  I.amOnPage('http://localhost:3000/adminlayout/AddCustomer'); // Adjust the URL to your component's path
});

Scenario('should display the form elements correctly', ({ I }) => {
  I.see('Add New Customer', 'h3');
  I.seeElement('input[name="name"]');
  I.seeElement('input[name="username"]');
  I.seeElement('input[name="email"]');
  I.seeElement('input[name="cnic"]');
  I.seeElement('input[name="password"]');
  I.seeElement('input[name="phoneNumber"]');
  I.seeElement('textarea[name="address"]');
  I.seeElement('button[type="submit"]');
});

Scenario('should show validation errors for invalid inputs', async ({ I }) => {
  I.fillField('input[name="name"]', 'John123');
  I.fillField('input[name="email"]', 'invalid-email');
  I.fillField('input[name="cnic"]', '12345-1234567-8');
  I.fillField('input[name="password"]', 'short');
  I.fillField('input[name="phoneNumber"]', '123ABC');

  I.click('Add Customer');

  I.see('Invalid Name', 'label[for="name"] + .MuiFormHelperText-root');
  I.see('Invalid Email Address', 'label[for="email"] + .MuiFormHelperText-root');
  I.see('Invalid CNIC', 'label[for="cnic"] + .MuiFormHelperText-root');
  I.see('Password must be at least 8 characters long', 'label[for="password"] + .MuiFormHelperText-root');
  I.see('Phone number should not contain alphabets', 'label[for="phoneNumber"] + .MuiFormHelperText-root');
});

Scenario('should submit the form with valid inputs', async ({ I }) => {
  I.fillField('input[name="name"]', 'John Doe');
  I.fillField('input[name="username"]', 'johndoe');
  I.fillField('input[name="email"]', 'john.doe@example.com');
  I.fillField('input[name="cnic"]', '12345-1234567-1');
  I.fillField('input[name="password"]', 'securepassword');
  I.fillField('input[name="phoneNumber"]', '1234567890');
  I.fillField('textarea[name="address"]', '123 Street, City');

  I.selectOption('AccountType', 'Saving');

  I.click('Add Customer');

  I.waitForElement('.Toastify__toast--success', 5); // Wait for success toast
  I.see('Account created successfully', '.Toastify__toast--success');
});
