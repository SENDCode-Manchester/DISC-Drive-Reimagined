import { useFilePicker } from "use-file-picker";
import { StudentDetails } from "./Student";

function ImportModal({ visible, setVisible, students, setStudents } : { visible: boolean, setVisible: (value: boolean) => void, students: StudentDetails[], setStudents: (value: StudentDetails[]) => void }) {
    const { openFilePicker } = useFilePicker({
        accept: ".csv",
        // @ts-expect-error typings not working
        onFilesSuccessfullySelected: function({ filesContent }) {
            const fileContent = filesContent[0].content;
            const lines = fileContent.split("\n");
            const importedStudents: StudentDetails[] = [];

            lines.forEach((line: string) => {
                if (line.startsWith("#") || line.length < 1) return;
                const [name, age, ...interests] = line.split(",");
                const fixedInterests = interests.join(",");

                importedStudents.push({
                    name,
                    age: Number(age),
                    interests: fixedInterests
                });
            });

            setStudents([
                ...students,
                ...importedStudents
            ]);

            setVisible(false);
        }
    });

    return (
        <div className={`${visible ? "flex" : "hidden"} fixed bg-black/25 h-screen w-screen items-center justify-center`}>
            <div className="bg-neutral-100 h-full w-full p-4 flex flex-col text-sm gap-1 lg:h-fit lg:w-1/3 lg:rounded-xl lg:p-6">
                <p className="font-medium text-xl">Ready to import?</p>
                <p>You will need a comma-delimited .csv file with each student on a row, with the columns in order of name, age and interests. For example:</p>
                <code className="bg-white rounded-sm px-2.5 py-1.5 mt-2 whitespace-nowrap overflow-x-scroll">
                    <span className="text-neutral-500">
                    # example.csv<br />
                    # - Columns in order: name, age, interests<br />
                    # - If you use more than one column for interests, that's fine!<br />
                    #<br />
                    </span>
                    Alice Chen,10,drawing, coding, reading fantasy books<br />
                    Ben Davis,9,basketball, video games, building with LEGOs<br />
                    Carlos Rodriguez,11,football, science experiments, collecting rocks
                </code>
                <div className="flex justify-end gap-2 mt-2">
                    <button className="px-3 py-2 rounded-sm cursor-pointer" onClick={() => setVisible(false)}>Cancel</button>
                    <button className="bg-neutral-200 px-3 py-2 rounded-sm cursor-pointer" onClick={openFilePicker}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default ImportModal;
