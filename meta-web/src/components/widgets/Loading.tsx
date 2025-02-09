import { CSSProperties } from "react";
import { ClimbingBoxLoader, BarLoader } from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "lightgray",
};

// region Not-Found Component
export const NotFound = ({ size = 25, color = "lightgray", label = "Not Found" }) => {
    return (
        <div className="sweet-loading">
            <ClimbingBoxLoader
                color={color}
                loading={true}
                cssOverride={override}
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
            />

            <h3 style={{ textAlign: 'center', color }}>{label}</h3>
        </div>
    );
};

// region Loading Component
const Loading = ({ size = 25, color = "lightgray", label = "Loading..." }) => {
    return (
        <div className="sweet-loading">
            <BarLoader
                color={color}
                loading={true}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
            />

            <h3 style={{ textAlign: 'center', color }}>{label}</h3>
        </div>
    );
}

export default Loading;