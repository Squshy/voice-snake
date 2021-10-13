import React from "react";
import { GitHubIcon } from "../svg/GitHubIcon";

interface GitHubLinkProps {}

export const GitHubLink: React.FC<GitHubLinkProps> = ({}) => {
  return (
    <a
      href="https://github.com/Squshy/voice-snake"
      aria-label="Project's GitHub repository"
    >
      <GitHubIcon className="w-4 h-4 md:h-6 md:w-6 text-gray-400 hover:scale-125 transform duration-200 ease-out hover:text-white" />
    </a>
  );
};
