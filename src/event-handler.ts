import { ChangeEvent } from "react";
import { StringStateSetter } from "../types";

export function handleTextInput(e: ChangeEvent, setTextInput: StringStateSetter) {
    setTextInput(e.target.value);
}