import { useForm } from 'react-hook-form';
import { ListInterface } from '../types';

interface Props {
  buttonText: string;
  submitData: (data: string, list: ListInterface) => void;
  list: ListInterface;
}

const CreateForm = ({ buttonText, submitData, list }: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    submitData(data.input, list);
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="text" {...register('input', { required: true })} />
      <button type="submit">Add {buttonText}</button>
    </form>
  );
};

export default CreateForm;
