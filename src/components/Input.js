import React from 'react';

const Input = (props) => (
    <div className="flex ">
      <input type="text"
             ref={props.inputRef}
             onChange={props.searchWeather}
             className="focus:outline-primary focus:ring-primary focus:border-primary rounded-l-0 focus:rounded-l-0 focus:outline-0 rounded-r-lg bg-gray-50 border text-gray-900  w-full text-xl border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
             placeholder="ادخل موقعك"/>
      <button onClick={props.searchWeather}
              className='inline-flex items-center px-3 text-sm text-gray-900 bg-primary border-none border-r-0 border-gray-300 rounded-l-md'>
        <img src="https://cdn-icons-png.flaticon.com/512/758/758651.png"
             alt=""
             className='w-8'
        />
      </button>
    </div>
);

export default Input;