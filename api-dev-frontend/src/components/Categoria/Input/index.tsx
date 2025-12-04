export interface InputProps {
  label: string;
  value: string | number;
  updatedValue: (value: string | number) => void;
}

export const Input = ({
  label,
  value,
  updatedValue: updateValue,
}: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        onChange={(event) => updateValue(event.target.value)}
      ></input>
    </>
  );
};
