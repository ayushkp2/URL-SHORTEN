"use client"
import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react';
import {BsGithub, BsLinkedin, BsInstagram} from 'react-icons/bs'
import Link from 'next/link';


export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [customKeyword, setCustomKeyword] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
 // Handle custom keyword input change
 const handleCustomKeywordChange = (e) => {
  setCustomKeyword(e.target.value);
  };
  

  const handlePostRequest = () => {
    // Define the API endpoint URL
    const apiUrl = 'http://localhost:3060/create';

    // Data to send in the request body
    const postData = {
      longUrl: inputValue, // Use the input value here
    };

    if (customKeyword.trim() !== '') {
      postData.shortUrl = customKeyword;
    }
  
  

    // Make the POST request using Axios
    axios.post(apiUrl, postData)
      .then(function (response) {
        // Handle the response data here
        setResponseData(response.data);
        console.log('Response:', response.data);
      })
      .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 409) {
          // Check if the status code is 409 (Conflict)
          // You can access the error message from the response data here
          setResponseData({ error: "URL Already Exists" });
        } else {
          // Handle other status codes or errors here
          setResponseData({ error: 'An error occurred' });
        }
      } else {
        // The request was made but no response was received
        // Handle other network or request errors here
        setResponseData({ error: 'Network error' });
      }

      console.error('Ops:', error);
    });
};

  
  return (
   <div className=' w-full h-screen text-center'>
    <div className=' justify-center pt-16  text-4xl font-bold text-gray-600'>URL SHORTNER</div>
    <div className=' max-w-[1024px] w-full h-full flex items-center justify-center mx-auto pb-2'>
      <div className=' w-[700px] h-[500px] bg-blue-500 shadow-md flex flex-col items-center py-2 justify-center shadow-gray-400 rounded-xl mx-auto'>
          <h2 className=' text-xl text-gray-black font-bold uppercase pb-1'>Shorten <span className=' text-white'>Url</span></h2>
          <p className=' text-white/50 pb-2'>Create custom url and make it easily shareable and more valuable</p>
        <input className="bg-white w-[400px] h-[40px] rounded-full border-2 pb-2 border-gray-400 hover:scale-110 ease-in duration-300 p-2"
                key={'1'}
                type="text"
                placeholder='Enter URL Here'
                value={inputValue}
                onChange={handleInputChange}
                
              />
              <div className="py-2">
                <input
                  className="bg-white md:w-[400px] h-[40px] rounded-l-2xl border-2 pb-2 border-gray-400 hover:scale-105 ease-out duration-300 p-2"
                  type="text"
                  placeholder="Custom Keyword"
                  value={customKeyword}
                  onChange={handleCustomKeywordChange}
                />
                <button className='w-[90px] bg-blue-400 text-white uppercase rounded-r-2xl font-semibold h-[40px] hover:scale-105 ease-out duration-300 ' onClick={handlePostRequest} >shorten</button>
              </div>
              <div className=' py-2'>
                <button className=' w-[250px] bg-white uppercase rounded-2xl text-gray-600  font-bold py-2 hover:scale-110 ease-in duration-300' onClick={handlePostRequest}>Continue with random</button>
              </div>

              <div>
            {responseData !== null ? (
              <div>
                {responseData.error ? (
                  <p className=' text-red-900 font-bold'>Ops: {responseData.error}</p>
                ) : (
                  <div>
                    <h2>Shortened Url:</h2>
                    <pre>{JSON.stringify("http://localhost:3060/" + responseData.shortUrl, null, 2)}</pre>
                  </div>
                )}
              </div>
            ) : null}
        </div>
      </div>
    </div>

    <div className='max-w-[1024px] mx-auto flex justify-center items-center'>
      <hr className='border-b-2 border-gray-400 opacity-30 w-1/2' />
  </div>
    
    <div className=' h-[100px] flex flex-col items-center justify-center bg-white'>
      <p className='py-2'>© 2023 Mohamad Zubi</p>
          <div className=' flex justify-between gap-2 items-center'> 
           <Link href='https://github.com/MOHAMAD-ZUBI' target='_blank' rel="noopener noreferrer" > <BsGithub size={30}/> </Link>
           <Link href='https://www.linkedin.com/in/mohamad-zubi-725840252/' target='_blank' rel="noopener noreferrer" > <BsLinkedin size={30}/> </Link>
           <Link href='https://www.instagram.com/mhmd.codes' target='_blank' rel="noopener noreferrer" > <BsInstagram size={30}/> </Link>
                 
          </div>
          
    </div>



   </div>
  )
}
