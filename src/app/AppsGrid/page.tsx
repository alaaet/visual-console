export default function AppsGrid() {
  const apps = [
    { name: 'File Manager', icon: <FileIcon className="h-15 w-15 text-yellow-600" /> },
    { name: 'Code Editor', icon: <CodeIcon className="h-15 w-15 text-blue-800" /> },
    { name: 'Service Manager', icon: <TerminalIcon className="h-15 w-15 text-green-600" /> },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {apps.map((app, idx) => (
        <button key={idx} className="bg-white rounded-lg shadow p-4 text-center transition duration-300 ease-in-out hover:scale-105">
          <div className="h-16 w-16 mx-auto">{app.icon}</div>
          <div className="text-xl font-bold mt-2">{app.name}</div>
        </button>
      ))}
    </div>
  )
}

const TerminalIcon = ({className}:{className:string}) => (
<svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>)

const CodeIcon = ({className}:{className:string}) => (
<svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
</svg>)

const FileIcon = ({className}:{className:string}) => (
<svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
</svg>
)