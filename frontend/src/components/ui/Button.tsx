import React, { ButtonHTMLAttributes } from "react";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="submit"
      className="block bg-secondary text-foreground rounded-xl w-full p-3"
      {...props}
    >
      {props.value}
    </button>
  );
};

export default Button;
