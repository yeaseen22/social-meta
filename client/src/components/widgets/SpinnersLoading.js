import { css } from "@emotion/react";
import { HashLoader, RingLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 2rem;
`;

export function HashSpinner({color, size}) {
    return (
        <>
            <HashLoader
                loading={true}
                color={color}
                css={override}
                size={size}
            />
        </>
    );
}

export function RingSpinner({color, size}){
    return (
        <>
            <RingLoader
                loading={true}
                color={color}
                css={override}
                size={size}
            />
        </>
    );
}
