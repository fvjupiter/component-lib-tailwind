import React from "react";

export interface ButtonProps {
  label: string;
  classN: string;
}

const Button = (props: ButtonProps) => {
  return <button className={`${props.classN} bg-lime-500`}>{props.label}</button>;
};

export default Button;