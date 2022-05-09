import React, { FC } from 'react'

export const Container: FC = ({ children }) => {
  return (
    <div className="flex flex-col mx-4 md:m-auto max-w-2xl border-l border-r border-light-gray">
      {children}
    </div>
  );
};