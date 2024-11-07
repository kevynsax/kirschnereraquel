import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    prefixImage?: string;
}

export function Button(props: ButtonProps) {
    return (
        <button
            class="button"
            {...props}
            disabled={!IS_BROWSER || props.disabled}
        >
            {props.prefixImage && (
                <img
                    class="button-prefix-image icon"
                    src={props.prefixImage}
                    alt=""
                />
            )}
            {props.children}
        </button>
    );
}
