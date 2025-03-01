
// import { Button } from '@/components/ui/button';
import {  SendHorizonal } from 'lucide-react';
import React from 'react'

const page = () => {
  return (
    <div className="flex-1 m-auto justify-center flex h-full w-full">
      <div className="flex flex-col justify-center items-center border rounded-xl  shadow-lg w-2/5 h-[300px] space-y-6">
        <h1 className="text-3xl flex ">Enter the Youtube video url</h1>
        <div className="relative w-4/5 flex items-center gap-4">
          <input
            className="w-full p-5 rounded-xl border border-[#5d3fd3ef] outline-none focus:border-[#5d3fd3] text-xl"
            type="text"
            placeholder="https://youtu.be/j63bBK_ct-M"
          />
          <button className="flex items-center justify-center w-[50px] h-[50px] absolute right-5 bg-[#5d3fd3] text-white  rounded-lg" title="Send"> <SendHorizonal size={32}/><span className="sr-only">Send</span></button>
        </div>
      </div>
    </div>
  );
}

export default page
