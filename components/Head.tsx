import React from "react";
import NextHead from "next/head";

interface HeadProps {}

export const Head: React.FC<HeadProps> = ({}) => {
  return (
    <NextHead>
      <title>Snek</title>
      <meta name="description" content="Voice controlled Snake game" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};
