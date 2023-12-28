import './NewDiaryEntry.css';

const NewDiaryEntry = () => {
  console.log('new diary');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='new-diary-entry__form'>
        <label htmlFor='date'>Date:</label>
        <input type='date' id='date' />
        <label htmlFor='weather'>Weather</label>
        <input type='text' id='weather' />
        <label htmlFor='visibility'>Visibility:</label>
        <input type='text' id='visibility' />
        <div>
          <button type='submit'>Submit</button>
          <button type='button'>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewDiaryEntry;
