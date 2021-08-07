import { useForm } from 'react-hook-form';

interface FormData {
  input: string;
}

interface ParentData {
  index: number;
  listId?: string;
}

export interface OutputData extends FormData, ParentData {}

interface Props {
  buttonText: string;
  parentData: ParentData;
  submitData: (inputData: OutputData) => void;
}

const CreateForm = ({ buttonText, parentData, submitData }: Props) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    const dataObj: OutputData = {
      input: data.input,
      index: parentData.index,
    };
    if ('listId' in parentData) dataObj.listId = parentData.listId;
    submitData(dataObj);
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="text" {...register('input', { required: true })} />
      <button type="submit">Add {buttonText}</button>
    </form>
  );
};

export default CreateForm;
