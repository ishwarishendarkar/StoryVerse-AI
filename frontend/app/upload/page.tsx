"use client";

import { useState } from "react";

import UploadBox from "@/components/UploadBox";
import GenerationSettings from "@/components/GenerationSettings";

export default function UploadPage() {

const [style,setStyle]=useState(
"Disney Pixar"
);

return(

<div className="min-h-screen bg-black text-white overflow-hidden">

<div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-black to-cyan-950 opacity-90"/>

<div className="relative z-10 max-w-7xl mx-auto px-8 py-16">

<h1 className="text-7xl font-bold text-center">

StoryVerse AI

</h1>

<p className="text-center text-gray-300 mt-5 text-lg">

Transform storybooks into AI storyboards

</p>


<div className="grid lg:grid-cols-2 gap-8 mt-20">

<UploadBox

style={style}

/>

<GenerationSettings

style={style}

setStyle={setStyle}

/>

</div>

</div>

</div>

)

}