export default function How2Card({icon, title, description}: {icon: React.ReactNode, title: string, description: string}) {
    return (
        <div className="bg-white p-12 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="mb-6 relative">
                {icon}
            </div>
            <h3 className="text-lg font-medium mb-3">{title}</h3>
            <p className="text-sm leading-relaxed">{description}</p>
        </div>
    )
}
