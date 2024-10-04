import React from 'react'
import Chip from "@mui/material/Chip";

type Props = {
  label: string;
  variant: "filled" | "outlined";
  color?: string;
}

const tagColors: { [key: string]: string } = {
  "Terror": "#ff0000"
}

export const Tag = ({label, variant, color}: Props) => {
  const tagColor = !color ? (tagColors[label] ? tagColors[label] : "#383838") : color;

  return (
    <Chip label={label} variant={variant}/>
  )
}
