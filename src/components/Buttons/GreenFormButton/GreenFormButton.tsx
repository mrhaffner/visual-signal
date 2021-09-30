import { SubmitButton } from './style';

const GreenFormButton = ({ value, disabled }: any) => {
  return (
    <SubmitButton
      tabIndex={0}
      type="submit"
      value={value}
      disabled={disabled}
    />
  );
};

export default GreenFormButton;
