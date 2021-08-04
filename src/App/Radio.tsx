import React, { createContext, useContext, ChangeEventHandler, InputHTMLAttributes, PropsWithChildren } from 'react';

interface RadioProps {
  className?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}


const RadioContext = createContext({} as Omit<RadioProps, 'className'>);
export const RadioGroup = ({ className, children, ...rest }: PropsWithChildren<RadioProps>) => {
  return (
    <RadioContext.Provider value={rest}>
      <div className={className} role="radiogroup">
        {children}
      </div>
    </RadioContext.Provider>
  )
};

type RadioButtonProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'checked'>;
export const RadioButton = ({ value, children, ...rest }: RadioButtonProps) => {
  const { onChange, value: radioValue } = useContext(RadioContext);

  return (
    <input
      type="radio"
      value={value}
      onChange={onChange}
      checked={radioValue === value}
      {...rest}
    >
      {children}
    </input>
  )
};