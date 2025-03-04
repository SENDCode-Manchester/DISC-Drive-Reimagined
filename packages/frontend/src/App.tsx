import { useState } from "react";
import MaterialSymbol from "./components/MaterialSymbol";
import Student, { StudentDetails } from "./components/Student";
import ImportModal from "./components/ImportModal";
import InputGroup from "./components/InputGroup";
import StudentInput from "./components/StudentInput";
import OutputGroup from "./components/OutputGroup";
import { usePDF } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";

export type Response = {
  output: ResponsePart[]
}

export type ResponsePart = {
  sending?: boolean;
  name?: string;
  questions?: string[];
};

function App() {
  const [students, setStudents] = useState([{
    name: "",
    age: 0,
    interests: ""
  }]);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [questions, setQuestions] = useState([""]);
  const [response, setResponse] = useState<Response>({ output: [] });
  const [pdf, setPdf] = usePDF();

  function updateStudent(details: StudentDetails, index: number) {
    const newStudents = students.map((student, i) => {
      if (i === index) return details;
      return student;
    });

    setStudents(newStudents);
  }

  function updateQuestion(details: string, index: number) {
    const newQuestions = questions.map((question, i) => {
      if (i === index) return details;
      return question;
    });

    setQuestions(newQuestions);
  }

  async function sendRequest() {
    async function buildURL() {
      return `${location.protocol}//${location.hostname}:3000/generateContent`;
    }

    if (students.length === 0 || questions.length === 0) return;

    setResponse({ output: [{ sending: true }]});

    const res = await fetch(await buildURL(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: JSON.stringify({
          students,
          questions
        })
      })
    });

    setResponse(await res.json());
  }

  function savePDF() {
    for (let i = 0; i < 2; i++) setPdf(<PDFDocument response={response} />);
    window.open(URL.createObjectURL(pdf.blob!), "_blank");
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-700 flex justify-center">
      <div className="max-w-5xl w-full text-sm px-4 py-5 flex flex-col gap-8">
        <div className="flex gap-4">
          <MaterialSymbol className="p-1 h-fit mt-2 rounded-full border border-neutral-300 text-[24px]! leading-none!" iconName="person" />
          <div className="flex flex-col gap-4 w-full">
            <InputGroup>
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
            </InputGroup>
            <InputGroup>
              <p className="font-medium text-base mb-2">Questions</p>
              <div className="flex flex-col">
                {questions.map(function(value, index) {
                  return <StudentInput placeholder={`Question #${index + 1}`} key={index} value={value} onChange={(e) => updateQuestion(e.target.value, index)} />;
                })}
              </div>
              <div className="flex justify-end mt-3 gap-2">
                <button className="bg-neutral-200 flex items-center px-2 py-1 pr-3 rounded-sm gap-1 cursor-pointer" onClick={() => setQuestions([...questions, ""])}>
                  <MaterialSymbol className="text-base!" iconName="add" />Add question
                </button>
                <button className="bg-neutral-700 text-neutral-200 flex items-center px-2 py-1 pr-3 rounded-sm gap-1 cursor-pointer" onClick={() => sendRequest()}>
                  <MaterialSymbol className="text-base!" iconName="play_arrow" />Run
                </button>
              </div>
            </InputGroup>
          </div>
        </div>
        <div className={`${response.output.length === 0 ? "hidden" : "flex"} gap-4`}>
          <MaterialSymbol className="p-1 h-fit mt-2 rounded-full border border-neutral-300 text-[24px]! leading-none!" iconName="robot" />
          <div className="flex flex-col gap-4 w-full">
            {response.output[0] && response.output[0].sending && <OutputGroup><p className="font-medium text-base mb-2">Generating questions...</p></OutputGroup>}
            {response.output.length > 0 && (
              response.output.map(function(value, index) {
                if (value.sending) return;
                return (
                  <OutputGroup key={index}>
                    <p className="font-medium text-base mb-2">Questions for {value.name}</p>
                    <ol>
                      {value.questions?.map(function(value2, index2) {
                        return <li className="mb-2" key={index2}>{value2}</li>;
                      })}
                    </ol>
                  </OutputGroup>
                );
              })
            )}
            {response.output.length > 0 && !(response.output[0].sending) && (
              <div className="flex justify-end mt-3 gap-2">
                <button className="bg-neutral-200 flex items-center px-3 py-1 rounded-sm gap-1.5 cursor-pointer" onClick={savePDF}>
                  <MaterialSymbol className="text-base!" iconName="picture_as_pdf" />Save as PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {importModalOpen && <ImportModal setVisible={setImportModalOpen} students={students} setStudents={setStudents} />}
    </div>
  )
}

export default App;
