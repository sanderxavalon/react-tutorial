export default function Form() {
  let firstName = '';
  let lastName = '';

  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    firstName = e.target.value;
  }

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    lastName = e.target.value;
  }

  function handleReset() {
    firstName = '';
    lastName = '';
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
