import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { GitHubLink } from "./GitHubLink";

interface AboutModalProps {
  canLeave: boolean;
  isOpen: boolean;
  closeModal: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  canLeave,
  closeModal,
  isOpen,
}) => {
  const closeIfAble = () => {
    if (canLeave) closeModal();
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeIfAble}
      >
        <div className="min-h-screen px-4 text-center bg-gray-900">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25 backdrop-filter backdrop-blur-sm" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-700 shadow-xl rounded-2xl">
              <div className="flex justify-between items-center">
                <Dialog.Title
                  as="h1"
                  className="text-3xl font-medium leading-normal text-green-400"
                >
                  Voice Snek🐍
                </Dialog.Title>
                <GitHubLink />
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-300">
                  This is a snake game which allows you to use your microphone
                  as well as the arrow keys to move the snake around.
                </p>
                <br />
                <p className="text-sm text-gray-300">
                  Once the game starts say which direction you want to go wether
                  its <span className="text-green-300">up</span>,
                  <span className="text-green-300"> down</span>,
                  <span className="text-green-300"> left</span>, or
                  <span className="text-green-300"> right</span>! Or, use the
                  arrow keys if you wish to play normally.
                </p>
                <br />
                <p className="text-sm text-gray-300">
                  Be careful because it can take some time to register which
                  word you said and properly assess it, if you can't seem to
                  move when you want to try lowering the speed of which the
                  snake moves in the settings.
                </p>
              </div>

              <div className="mt-4 h-8">
                <Transition
                  show={canLeave}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeIfAble}
                  >
                    Lemme play
                  </button>
                </Transition>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
