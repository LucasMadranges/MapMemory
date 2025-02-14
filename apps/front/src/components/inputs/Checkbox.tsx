"use client";
import React, {useRef, useState} from "react";
import {Check} from "../icons/Check";

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
  const [check, setCheck] = useState(false);

  function handleClick() {
    setCheck(!check);
  }

  return (
    <div className={`flex items-center justify-start gap-2 ${containerClassName}`}>
      <div className={"relative flex items-center justify-center"}>
        <input ref={refCheckbox}
               onClick={handleClick}
               id={name}
               name={name}
               type={"checkbox"}
               className={`${inputClassName} relative w-4 h-4 focus-visible:outline-blue-900 focus-visible:outline cursor-pointer
               appearance-none rounded border border-blue-500
               ${check ? "bg-blue-500" : "bg-white"}`}/>
        {check && <Check onClick={handleClick}
                         className={"cursor-pointer w-3 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white"}/>}
      </div>
      <label htmlFor={name}
             className={"inline-block"}>{label}</label>
    </div>
  );
}

/*
 {check && <Check onClick={handleClick}
 className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white h-4 w-4 cursor-pointer"}/>}
 */
