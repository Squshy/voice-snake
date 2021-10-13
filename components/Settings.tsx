import { Transition, Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { CogIcon, XIcon } from "@heroicons/react/solid";
import { SettingsButton } from "./SettingsButton";
import { SettingsOption } from "./SettingsOption";
import { GitHubLink } from "./GitHubLink";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <SettingsButton onClick={() => setIsOpen(true)}>
        <span className="sr-only">open settings menu</span>
        <CogIcon className="h-6 w-6" />
      </SettingsButton>
      <Transition show={isOpen}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-40 overflow-hidden"
        >
          <Transition.Child
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={`absolute inset-0 backdrop-filter backdrop-blur`}
          >
            <Dialog.Overlay
              className={`bg-gray-900 absolute inset-0 backdrop-filter backdrop-blur bg-opacity-50`}
            />
          </Transition.Child>
          <Transition.Child
            enter="transition ease-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className={`absolute inset-0 z-40 flex pointer-events-none`}
          >
            <div
              className={`bg-gray-900 bg-opacity-90 h-full flex w-1/2 md:w-1/3 border-gray-700 border-r flex flex-col pointer-events-auto`}
            >
              <div
                className={`px-6 py-6 border-b border-gray-700 flex justify-between items-center`}
              >
                <h1 className={`text-lg font-semibold text-white`}>Settings</h1>
                <GitHubLink />
              </div>
              <SettingsOption />
            </div>
          </Transition.Child>
        </Dialog>
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <SettingsButton onClick={() => setIsOpen(false)}>
            <span className="sr-only">close settings menu</span>
            <XIcon className="h-6 w-6" />
          </SettingsButton>
        </Transition.Child>
      </Transition>
    </>
  );
};
