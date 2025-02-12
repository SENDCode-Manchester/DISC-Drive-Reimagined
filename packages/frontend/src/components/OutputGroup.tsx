import { ReactNode } from "react";

function OutputGroup({ children } : { children: ReactNode }) {
    return (
        <div className="border border-neutral-200/50 px-4 py-3 grow rounded-sm">
            {children}
        </div>
    )
}

export default OutputGroup;
