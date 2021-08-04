import React, { createContext, useContext, ChangeEventHandler, InputHTMLAttributes, PropsWithChildren } from 'react';
import uniqueString from 'unique-string';

interface RadioProps {
  className?: string;
  value?: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}


const RadioContext = createContext({} as Omit<RadioProps, 'className'>);
export const RadioGroup = ({ className, children, ...rest }: PropsWithChildren<RadioProps>) => {
  if (!rest.name)
    rest.name = uniqueString();
  return (
    <RadioContext.Provider value={rest}>
      <div className={className} role="radiogroup">
        {children}
      </div>
    </RadioContext.Provider>
  )
};

type RadioButtonProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'checked' | 'name'>;
export const RadioButton = ({ value, children, ...rest }: RadioButtonProps) => {
  const { onChange, value: radioValue, name } = useContext(RadioContext);

  return (
    <input
      type="radio"
      value={value}
      name={name}
      onChange={onChange}
      checked={radioValue === value}
      {...rest}
    >
      {children}
    </input>
  )
};