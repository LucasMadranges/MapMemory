"use client";
import React, {useRef, useState} from "react";
import {gsap} from "gsap";

export default function Input({
                                label,
                                placeholder,
                                type,
                                value,
                                icon,
                                disabledPasswordIcon,
                                enabledPasswordIcon,
                                containerClassName,
                                inputClassName,
                                onChange,
                              }: {
  label: string,
  placeholder: string,
  type: string,
  value: string,
  icon?: React.ReactNode,
  disabledPasswordIcon?: React.ReactNode,
  enabledPasswordIcon?: React.ReactNode,
  containerClassName?: string,
  inputClassName?: string,
  onChange: React.ChangeEventHandler
}) {
  const refInput = useRef(null);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [typeInput, setTypeInput] = useState(type);

  // Focus animation
  function handleFocus() {
    gsap.to(refInput.current, {
      borderColor: "#1e3a8a",
      duration: 0.5,
    });
  }

  function handleBlur() {
    gsap.to(refInput.current, {
      borderColor: "#d1d5db",
      duration: 0.5,
    });
  }

  // Password disable / enable
  function handleEnabledPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setTypeInput("text");
    setIsPasswordHidden(false);
  }

  function handleDisabledPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setTypeInput("password");
    setIsPasswordHidden(true);
  }

  return (
    <div className={containerClassName}>
      <label className={"inline-block pb-2"}>{label}</label>
      <div className={"relative"}>
        <input ref={refInput}
               onFocus={handleFocus}
               onBlur={handleBlur}
               onChange={onChange}
               value={value}
               type={typeInput}
               className={`border border-gray-300 rounded-lg w-full p-2 focus-visible:outline-0 ${inputClassName}`}
               placeholder={placeholder}/>
        <div className={"absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center"}>
          {type === "password" &&
            <>
              {isPasswordHidden &&
                <button onClick={(event) => handleEnabledPassword(event)}>{disabledPasswordIcon}</button>}
              {!isPasswordHidden &&
                <button onClick={(event) => handleDisabledPassword(event)}>{enabledPasswordIcon}</button>}
            </>
          }
          {type !== "password" && icon}
        </div>
      </div>
    </div>
  );
}
