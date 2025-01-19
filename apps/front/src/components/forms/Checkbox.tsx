"use client";
import React, {useRef} from "react";
import {gsap} from "gsap";

export default function Checkbox({
                                   name,
                                   label,
                                   containerClassName,
                                   inputClassName,
                                 }: {
  name: string,
  label: string,
  containerClassName?: string,
  inputClassName?: string,
}) {
  const refCheckbox = useRef(null);

  // Focus animation
  function handleFocus() {
    gsap.to(refCheckbox.current, {
      borderColor: "#1e3a8a",
      duration: 0.5,
    });
  }

  function handleBlur() {
    gsap.to(refCheckbox.current, {
      borderColor: "#d1d5db",
      duration: 0.5,
    });
  }

  return (
    <div className={`flex items-center justify-start gap-2 ${containerClassName}`}>
      <input name={name}
             id={name}
             ref={refCheckbox}
             onFocus={handleFocus}
             onBlur={handleBlur}
             type={"checkbox"}
             className={`${inputClassName} w-4 h-4 bg-blue-900 rounded-full`}/>
      <label htmlFor={name}
             className={"inline-block"}>{label}</label>
    </div>
  );
}
