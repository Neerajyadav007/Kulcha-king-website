import React from 'react';
import { NotFound } from "./ghost-404-page";

export const Page = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#090a0d]">
      <NotFound />
    </div>
  );
};

export default { Page };
