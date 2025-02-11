function StudentInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input className="focus:outline-2 focus:outline-neutral-400/25 rounded-xs w-full py-1 px-2" {...props} />;
}

export default StudentInput;
