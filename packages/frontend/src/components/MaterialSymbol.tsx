function MaterialSymbol({ className, iconName }: { className?: string, iconName: string }) {
    return (
        <span className={`material-symbols-outlined select-none text-base! ${className ?? ""}`}>{iconName}</span>
    )
}

export default MaterialSymbol;
