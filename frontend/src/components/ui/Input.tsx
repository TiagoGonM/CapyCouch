import React, { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="password"
      id="password"
      name="password"
      required
      className="border-primary border-2 bg-secondary text-foreground bg-opacity-30 rounded-xl w-full p-1"
      {...props}
    />
  );
};

export default Input;
