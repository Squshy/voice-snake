import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useSpeed, useSpeedUpdate } from "../context/SpeedContext";
import { SPEEDS } from "../constants";


interface SettingsOptionProps {}

export const SettingsOption: React.FC<SettingsOptionProps> = ({}) => {
  const selected = useSpeed();
  const setSelected = useSpeedUpdate();

  return (
    <button className="w-full md:h-24 border-b border-gray-700 flex justify-between items-center flex-col py-2 md:flex-row md:space-x-12 text-white px-4 md:px-12">
      <p>Speed</p>
      <div className="w-full h-full flex items-center justify-end">
        <Listbox value={selected} onChange={(e) => setSelected(e)}>
          <div className="relative w-full">
            <Listbox.Button className="relative py-2 md:pl-3 md:pr-10 w-full text-left cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.text}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base backgrop-filter backdrop-blur-sm bg-white bg-opacity-25 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {SPEEDS.map((speed, speedIndex) => (
                  <Listbox.Option
                    key={speedIndex}
                    className={({ active }) =>
                      `${
                        active ? "text-green-900 bg-green-100" : "text-gray-200"
                      }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={speed}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {speed.text}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-green-600" : "text-green-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </button>
  );
};
