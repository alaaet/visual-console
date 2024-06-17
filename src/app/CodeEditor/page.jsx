"use client"
import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import '../../assets/css/prism.dark.theme.css'; //Example style, you can use another
import { useSearchParams } from 'next/navigation'
import useKey from '@/hooks/useKey';
import Spinner from '@/components/Spinner';

export default function CodeEditor() {
    const searchParams = useSearchParams()
  const [isSaving, setIsSaving] = React.useState(false);
  const [code, setCode] = React.useState(
    ``
  );
  useKey('ctrls', () => {
    setIsSaving(true);
    setTimeout(() => {      
      console.log('Ctrl+S fired!')
      setIsSaving(false);
    }, 30000);
  });
  // read the file and set the code
  React.useEffect(() => {
    const filePath = searchParams.get("filePath")
    if (filePath){
        try {
            console.log(filePath);
            fetch('/api/readFile?'+new URLSearchParams({filePath}))
            .then(response =>{
                if(!response.ok) return;
                return response.json()})
            .then(data => {
                if (data) setCode(data.fileContent)});
        } catch (error) {
            console.error(error);
        }
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-left p-10">
        <div style={{ display: 'flex'}}>
            <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Code Editor</h1>
            {isSaving?(<Spinner text={"Saving..."}/>):(<pre style={{margin: '2rem', marginBottom:'0'}}>press ctrl+s to save</pre>)}
        </div>
        <div className="bg-gray-900 rounded-lg p-4 w-full">
        <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            // backgroundColor: 'black',
            color: 'white',
            // margin: '2rem',
            // padding: '1rem',
            }}
            />
        </div>
    </main>
  );
}