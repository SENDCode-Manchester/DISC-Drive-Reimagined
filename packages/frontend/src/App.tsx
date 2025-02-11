import { useState } from "react";
import MaterialSymbol from "./components/MaterialSymbol";
import Student, { StudentDetails } from "./components/Student";
import ImportModal from "./components/ImportModal";

function App() {
  const [students, setStudents] = useState([{
    name: "",
    age: 0,
    interests: ""
  }]);
  const [importModalOpen, setImportModalOpen] = useState(false);

  function updateStudent(details: StudentDetails, index: number) {
    const newStudents = students.map((student, i) => {
      if (i === index) return details;
      return student;
    });

    setStudents(newStudents);
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-700 flex justify-center">
      <div className="max-w-5xl w-full text-sm px-4 py-5">
        <div className="flex gap-4">
          <MaterialSymbol className="p-1 h-fit mt-2 rounded-full border border-neutral-300 text-[24px]! leading-none!" iconName="person" />
          <div className="bg-neutral-200/50 px-4 py-3 grow rounded-sm">
            <p className="font-medium text-base">List of students</p>
            <div className="flex flex-col">
              {students.map(function(value, index) {
                return <Student details={value} key={index} index={index} update={updateStudent} />;
              })}
            </div>
            <div className="flex justify-end mt-3 gap-2">
              <button className="bg-neutral-200 flex items-center px-2 py-1 pr-3 rounded-sm gap-1 cursor-pointer" onClick={() => setStudents([...students, { name: "", age: 0, interests: "" }])}>
                <MaterialSymbol className="text-base!" iconName="add" />Add student
              </button>
              <button className="bg-neutral-200 flex items-center px-2 py-1 lg:pr-3 rounded-sm gap-1 cursor-pointer" onClick={() => setImportModalOpen(true)}>
                <MaterialSymbol className="text-base!" iconName="upload" /><span className="hidden lg:block">Import from file</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ImportModal visible={importModalOpen} setVisible={setImportModalOpen} students={students} setStudents={setStudents} />
    </div>
  )
}

export default App;
