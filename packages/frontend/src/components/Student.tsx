import { useState } from "react";
import MaterialSymbol from "./MaterialSymbol";
import StudentInput from "./StudentInput";

export type StudentDetails = {
    name: string;
    age: number;
    interests: string;
};

function Student({ details, index, update } : { details: StudentDetails, index: number, update: (details: StudentDetails, index: number) => void }) {
    const [name, setName] = useState(details.name || "");
    const [age, setAge] = useState(details.age || 0);
    const [interests, setInterests] = useState(details.interests || "");

    function onBlur() {
        update({ name, age, interests }, index);
    }

    return (
        <details className="rounded-xs overflow-hidden border border-neutral-300/50 mt-2">
            <summary className="bg-neutral-200 cursor-pointer px-2 py-1 flex gap-1.5 items-center">
                <MaterialSymbol className="text-base!" iconName="unfold_more" />{name.length < 1 ? "New Student" : name}
            </summary>
            <div className="px-2 py-1">
                <StudentInput placeholder="Name" onBlur={onBlur} onChange={(e) => setName(e.target.value)} value={name} />
                <StudentInput placeholder="Age" type="number" onBlur={onBlur} onChange={(e) => setAge(Number(e.target.value))} value={age === 0 ? "" : age} />
                <textarea className="focus:outline-2 focus:outline-neutral-400/25 rounded-xs w-full py-1 px-2 resize-none" placeholder="Interests"
                    rows={2} onBlur={onBlur} onChange={(e) => setInterests(e.target.value)} value={interests} />
            </div>
        </details>
    )
}

export default Student;
