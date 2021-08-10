import { useForm } from 'react-hook-form';

interface Props {
  buttonText: string;
  submitData: (data: string) => void;
}

const CreateForm = ({ buttonText, submitData }: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    submitData(data.input);
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="text" {...register('input', { required: true })} />
      <button type="submit">Add {buttonText}</button>
    </form>
  );
};

export default CreateForm;
