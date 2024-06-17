import { useEffect, useState } from "react";
import TerminalInput from "./TerminalInput";
import styles from '@/assets/css/terminal.module.css'
import { isPathAbsolute } from "@/utils/files";
import Spinner from "./Spinner";
import { useRouter } from 'next/navigation'

export default function Terminal() {
  const router = useRouter()
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [initData, setInitData] = useState({
    username: '',
    hostname: '',
    path: '',});
  const [isLoading, setIsLoading] = useState(false);
  const [inputFocus, setInputFocus] = useState();

  useEffect(() => {
      const fetchInitData = async () => {
      let data = {
        username: '',
        hostname: '',
        path: '',
        completePath: '',
      }
      setIsLoading(true);
      // get username
      const response = await fetch('/api/handleCommand?'+new URLSearchParams({
        command: 'whoami'
      }));
      data.username = await response.text();
      // get hostname
      const response2 = await fetch('/api/handleCommand?'+new URLSearchParams({
        command: 'hostname' 
      }))
      data.hostname = (await response2.text()).split('.')[0];
      // get path
      const response3 = await fetch('/api/handleCommand?'+new URLSearchParams({
        command: 'pwd'
      }))
      const pwd = await response3.text();
      data.completePath = pwd.replaceAll('\\n', "").replaceAll('"', "");
      let partialPwd = ''
      if(pwd.split('/').length > 3) {
        partialPwd = pwd.split('/').splice(-3).join('/')
      }else {
        partialPwd = pwd
      }
      data.path = partialPwd;
      setInitData(data);
      setIsLoading(false);
    };
    fetchInitData();
  }, []);

  // useEffect to scroll to the bottom of the terminal whenever the output changes
  useEffect(() => {
    const terminalElement = document.getElementById('terminal');
    if (terminalElement) {
      terminalElement.scrollTop = terminalElement.scrollHeight;
    }
  }, [output]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if(input.includes('nano')){
      // use the router to redirect to the code editor page and pass the filePath(input) as a query parameter
      const filePath = input.replace('nano ', '')
      if (isPathAbsolute(filePath)) {
        router.push(`/CodeEditor?${new URLSearchParams({filePath})}`)
      }
      else{
        router.push(`/CodeEditor?${new URLSearchParams({filePath: initData.completePath + '/' + filePath})}`)
      }
    }else{
      const response = await fetch('/api/handleCommand?'+new URLSearchParams({
        command: input
      }));
      const data = await response.text();
      setOutput(output + data + '\n');
      setInput('');
    }
    setIsLoading(false);
  }
// show a spinner while the data is being fetched
  if (isLoading) {
    return <Spinner/>
  }
// whenever the terminal view is clicked, send a signal to the input component to focus on the input field
  const handleTerminalClick = () => {
    setInputFocus(Date.now())
  };

  return (
    <div className="w-full mx-4 flex flex-col bg-gray-900 text-white border-2 border-gray-600" style={{ height: '50vh' }} onClick={handleTerminalClick}>
      <div className="flex flex-row h-10 mb-2 bg-gray-100 p-3">
        <div className="text-left text-gray-900">
          <span>Shell</span>
        </div>
        <div className="flex-grow"></div>
        <button style={{ margin: '0', padding: '0', display:'flex'}} className="text-red-400" onClick={() => setOutput('')}>
          <pre className="mr-2">Clear</pre>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 border-2 border-gray-600 p-0">
          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
        </svg>
        </button>
      </div>
      <div className="flex flex-row flex-grow relative">
        <pre id="terminal" className={styles.output}>{output.replaceAll('"', "").replaceAll('\\n', ' \n ')}</pre>
        <div style={{display:'flex'}} className="absolute bottom-0 left-0 right-0">
          <TerminalInput initData={initData} handleInputChange={setInput} inputValue={input} inputFocus={inputFocus} handleSubmit={handleSubmit}/>
        </div>
      </div>
    </div>
  );
}
