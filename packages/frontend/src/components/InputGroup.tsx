import { ReactNode } from "react";

function InputGroup({ children } : { children: ReactNode }) {
    return (
        <div className="bg-neutral-200/50 px-4 py-3 grow rounded-sm">
            {children}
        </div>
    )
}

export default InputGroup;
