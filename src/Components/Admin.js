import React, { useEffect } from 'react'
import {useState} from 'react'
import axios from 'axios';

export const Admin = () => {
  const [viewCandidates, setViewCandidates] = useState(false);


  const [message, setMessage] = useState(""); // Alert

  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState(null);

  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  
  const [candidates, setCandidates] = useState([]);

  const getCandidates = () => {
    axios.get("http://localhost:2000/api/getcandidates").then((res) => {
        setCandidates(res.data);
    })
  }

  useEffect(() => {
    getCandidates();
  },[])


  const createQuestion = () => {
    if(question && difficulty && answerA && answerB && answerC && answerD && correctAnswer) {
        axios.post("http://localhost:2000/api/createquestion", {
            question:question,
            difficulty: difficulty,
            answerA: answerA,
            answerB: answerB,
            answerC: answerC,
            answerD: answerD,
            correctAnswer: correctAnswer
        }).then((res) => {
            console.log(res.data)
            setMessage("Question created successfully!");
            setTimeout(() => {
                setMessage("");
            },2000)
            console.log(message)
        })
    }
  }

  const deleteCandidate = (c) => {
    axios.post("http://localhost:2000/api/deletecandidate", {id:c.id}).then((res) => {
        getCandidates();
    })
  }


  return (
    <div className='m-auto w-10/12 rounded-md h-[75%]'>
    {message && (<div className='absolute top-10 left-1/2 -translate-x-1/2 w-2/6 h-10 bg-green-400 rounded-md p-2 text-white font-medium'>{message}</div>)}
      <h2 className=' text-sm mt-2 italic text-gray-500'>Create questions and review candidate scores here.</h2>
      <div className='top-layer w-full h-10 mb-4 mt-4'>
            {!viewCandidates ? 
            <button onClick={() => setViewCandidates(true)} className='tracking-tight bg-gray-50 hover:bg-gray-200 border-2 transition-all px-4 p-2 rounded-md text-gray-500 font-semibold'>View Candidates</button>
            : 
            <button onClick={() => setViewCandidates(false)} className='tracking-tight bg-gray-50 hover:bg-gray-200 border-2 transition-all px-4 p-2 rounded-md text-gray-500 font-semibold'>Create Question</button>
            }
      </div>
      <div className='mt-4 m-auto w-full bg-gray-200 h-[80%] rounded-md'>
        {viewCandidates ?
        <div className='w-full p-1 flex flex-col gap-2 m-auto overflow-auto h-full '>
            {candidates.map((c) => (
                <div className='w-full h-12 flex justify-between bg-gray-50 rounded-md '>
                    <h1 className='my-auto p-2 tracking-tight font-semibold'>Candidate #{c.id}</h1>
                    <div className='right flex gap-4'>
                        <h2 className='my-auto text-sm font-medium tracking-tight'>Wrong: {c.wrong}</h2>
                        <h2 className='my-auto text-sm font-medium tracking-tight'>Right: {c.correct}</h2>
                        <button onClick={() => deleteCandidate(c)} className='px-5 p-2 text-sm rounded-md text-white font-medium bg-green-400 hover:bg-green-500 transition-all'>Pass</button>
                        <button onClick={() => deleteCandidate(c)} className='px-5 p-2 text-sm bg-red-400 text-red-800 font-medium rounded-md hover:bg-red-500 transition-all'>Fail</button>
                    </div>
                </div>
            ))}
        </div>
        :
        <div>
            <div className='w-full flex justify-center'>
                <input onChange={(e) => setQuestion(e.target.value)} className=' w-10/12 m-auto mt-4 p-4 rounded-md bg-gray-100' placeholder='Question'/>
            </div>
            <div className='inputs m-auto w-10/12 mt-4 flex-col flex'>
                <label className='text-sm font-medium'>Difficulty</label>
                <input onChange={(e) => setDifficulty(e.target.value)} type = "number" className='w-40 rounded-md text-sm p-2 bg-gray-100' placeholder='Difficulty'/>
                <div className='w-full h-60 mt-4 bg-gray-300 rounded-md overflow-auto flex flex-col gap-2 '>
                    <div className='input-box bg-gray-100 p-3 rounded-md flex justify-between'>
                        <h1 className='font-semibold my-auto'>Choice A</h1>
                        <div className={`flex gap-2 ${!answerA && 'hidden'}`}>
                            <h1 className='text-sm my-auto font-semibold'>Right answer?</h1>
                            <input checked = {answerA === correctAnswer && correctAnswer !== ""} onChange={() => setCorrectAnswer(answerA)} type = "checkbox" />
                        </div>
                        <input onChange={(e) => setAnswerA(e.target.value)} className='w-72 p-2 my-auto bg-gray-200 rounded-md' placeholder='Answer Here'/> 
                    </div>
                    <div className='input-box bg-gray-100 p-3 rounded-md flex justify-between'>
                        <h1 className='font-semibold my-auto'>Choice B</h1>
                        <div className={`flex gap-2 ${!answerB && 'hidden'}`}>
                            <h1 className='text-sm my-auto font-semibold'>Right answer?</h1>
                            <input type = "checkbox" checked = {answerB === correctAnswer && correctAnswer !== ""} onChange={() => setCorrectAnswer(answerB)}/>
                        </div>
                        <input onChange={(e) => setAnswerB(e.target.value)} className='w-72 p-2 my-auto bg-gray-200 rounded-md' placeholder='Answer Here'/> 
                    </div>
                    <div className='input-box bg-gray-100 p-3 rounded-md flex justify-between'>
                        <h1 className='font-semibold my-auto'>Choice C</h1>
                        <div className={`flex gap-2 ${!answerC && 'hidden'}`}>
                            <h1 className='text-sm my-auto font-semibold'>Right answer?</h1>
                            <input type = "checkbox" checked = {answerC === correctAnswer && correctAnswer !== ""} onChange={() => setCorrectAnswer(answerC)}/>
                        </div>
                        <input onChange={(e) => setAnswerC(e.target.value)} className='w-72 p-2 my-auto bg-gray-200 rounded-md' placeholder='Answer Here'/> 
                    </div>
                    <div className='input-box bg-gray-100 p-3 rounded-md flex justify-between'>
                        <h1 className='font-semibold my-auto'>Choice D</h1>
                        <div className={`flex gap-2 ${!answerD && 'hidden'}`}>
                            <h1 className='text-sm my-auto font-semibold'>Right answer?</h1>
                            <input type = "checkbox" checked = {answerD === correctAnswer && correctAnswer !== ""} onChange={() => setCorrectAnswer(answerD)}/>
                        </div>
                        <input onChange={(e) => setAnswerD(e.target.value)} className='w-72 p-2 my-auto bg-gray-200 rounded-md' placeholder='Answer Here'/> 
                    </div>
                </div>
            </div>
            <div className='w-full h-10 mt-8 flex gap-2'>
                <button onClick={createQuestion} className='ml-auto bg-green-400 p-2 rounded-md px-8 text-white font-bold'>Create</button>
            </div>
        </div>
        }
      </div>
    </div>
  )
}
