import React, { useState } from "react";

type Props = {
  text: string;
  words: number;
  className: string;
};

export const CollapsableText = ({ text, words, className }: Props) => {
  const [readMore, setReadMore] = useState(false);

  const splitWords = text.split(" ");
  const wordCount = splitWords.length;

  return (
    <>
      <p className={`${className}`}>
        {wordCount > words && !readMore
          ? splitWords.slice(0, words).join(" ")
          : text}
      </p>
      {wordCount > words && (
        <span
          onClick={() => setReadMore(!readMore)}
          className="cursor-pointer underline text-blue-400"
        >
          {readMore ? "Read less" : "Read more"}
        </span>
      )}
    </>
  );
};
