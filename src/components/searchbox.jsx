import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { search } from '../slices/cardSlice';

const searchbox = () => {
  // State management using useState hook
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState([]);
  const [result, setResult] = useState(false);
  const [searchData, setSearchData] = useState(false);

  // Redux integration using useDispatch and useSelector hooks
  const dispatch = useDispatch();

  // Fetch suggestions from API on component mount
  useEffect(() => {
    axios.get('/api/v1/availableName')
      .then((response) => {
        setSuggestion(response.data);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }, []);

  // Update Redux state when searchData changes
  useEffect(() => {
    if (searchData) {
      dispatch(search(searchData));
    }
  }, [searchData]);

  // Filter suggestions based on input
  useEffect(() => {
    if (input) {
      setResult(Object.entries(suggestion).filter(([id, title]) => (
        title &&
        title.toLowerCase().includes(input)
      )));
    }
  }, [input, suggestion]);

  // Handle form submission
  const handleSubmit = (value) => {
    setInput(value);
    if (!value) {
      setResult([]);
    }
  };

  // Handle search suggestion click
  const handleSearch = (searchres) => {
    setSearchData(searchres);
  };
  
  return (
  <>
<div class="relative lg:w-[25rem] w-[17rem] mx-auto mt-[1rem] rounded-xl  mb-3 bg-white shadow-xl ">
  <input
    type="search"
    class="peer  block min-h-[3rem] w-[17rem] lg:w-[25rem] border-gray-500 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-900 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="exampleSearch2"
    placeholder="Type query"
    value={input}
    onChange={(e)=>handleSubmit(e.target.value)}
    />
    
</div>
    
<div className={`bg-white ${result?'':'hidden'} sm:max-h-[15rem] object-top text-black text-center rounded-xl no-scrollbar p-2 space-y-2 overflow-y-scroll`}>
    {
      result?
      Object.entries(result).map(([id, title])=>{
        return(
          <div key={id} onClick={()=>{handleSearch(title[1]);}}>
            <li className='block overflow-x-scroll no-scrollbar transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300'>{title[1]}</li>
            <hr className='border-2'/>
            </div>
          )
        })
        :
        <>
        </>
}
    </div>
    </>
  )
}

export default searchbox

{/* <label
  for="exampleSearch2"
  class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-900 dark:peer-focus:text-primary"
  >Search</label> */}