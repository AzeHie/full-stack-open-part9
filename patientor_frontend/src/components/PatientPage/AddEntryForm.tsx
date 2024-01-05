import { Dispatch, SetStateAction } from 'react';

interface Props {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

const AddEntryForm = ({ setShowForm }: Props) => {
  return (
    <div>
      <button>Save</button>
      <button onClick={() => setShowForm(false)}>Cancel</button>
    </div>
  );
};

export default AddEntryForm;
