"use client";

import { useRef, useState } from "react";
import StoryboardViewer from "./StoryboardViewer";

type Props = {
  style:string;
};

export default function UploadBox({

style

}:Props){

const [fileName,setFileName]=useState("");

const [loading,setLoading]=useState(false);

const [chapterLoading,setChapterLoading]=useState(false);

const [imageLoading,setImageLoading]=useState(false);

const [exportLoading,setExportLoading]=useState(false);

const [story,setStory]=useState("");

const [character,setCharacter]=useState<any>(null);

const [scenes,setScenes]=useState<string[]>([]);

const [prompts,setPrompts]=useState<string[]>([]);

const [images,setImages]=useState<string[]>([]);

const [chapters,setChapters]=useState<string[]>([]);


const [quality]=useState(
"Balanced"
);

const [sceneCount]=useState(
5
);


const inputRef=useRef<HTMLInputElement>(null);



const handleChoose=()=>{

inputRef.current?.click();

};



const handleFile=async(

e:React.ChangeEvent<HTMLInputElement>

)=>{

const file=e.target.files?.[0];

if(!file)return;

setFileName(
file.name
);

setImages([]);

setScenes([]);

setPrompts([]);

setChapters([]);

const formData=new FormData();

formData.append(
"file",
file
);

setLoading(true);

try{

const response=await fetch(

"http://127.0.0.1:8000/upload",

{

method:"POST",

body:formData

}

);

const data=await response.json();

setStory(
data.story || ""
);

setCharacter(
data.character
);

setScenes(
data.scenes
);

setPrompts(
data.prompts
);

setChapters(
data.chapters
);

}

catch(err){

console.log(err);

}

setLoading(false);

};



const loadChapter=async(

chapter:string

)=>{

setChapterLoading(true);

try{

const response=await fetch(

"http://127.0.0.1:8000/chapter",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

chapter

})

}

);

const data=await response.json();

setCharacter(
data.character
);

setScenes(
data.scenes
);

setPrompts(
data.prompts
);

}

catch(err){

console.log(err);

}

setChapterLoading(false);

};



const handleGenerate=async()=>{

setImageLoading(true);

try{

const response=await fetch(

"http://127.0.0.1:8000/generate",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

prompts,

style,

quality,

sceneCount

})

}

);

const data=await response.json();

setImages(
data.images
);

}

catch(err){

console.log(err);

}

setImageLoading(false);

};



const handleExport=async()=>{

setExportLoading(true);

try{

await fetch(

"http://127.0.0.1:8000/export",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

story,

scenes,

images

})

}

);

alert(
"storybook.pdf created"
);

}

catch(err){

console.log(err);

}

setExportLoading(false);

};



return(

<div className="space-y-10">


<div className="bg-white/5 border border-white/10 rounded-[40px] p-12">

<div className="flex flex-col items-center">

<h2 className="text-5xl font-bold">

Upload Story

</h2>

<button

onClick={handleChoose}

className="mt-10 px-10 py-5 rounded-3xl bg-gradient-to-r from-violet-600 to-cyan-500"

>

{

loading

?

"Processing..."

:

"Choose File"

}

</button>


{

fileName && (

<p className="mt-5 text-cyan-400">

{fileName}

</p>

)

}


<input

ref={inputRef}

type="file"

accept=".pdf"

className="hidden"

onChange={handleFile}

/>

</div>

</div>



{

chapters.length>1 && (

<div className="bg-white/5 p-8 rounded-3xl">

<h2 className="text-2xl font-bold mb-6">

Detected Chapters

</h2>

{

chapters.map(

(ch,index)=>(

<button

key={index}

onClick={()=>loadChapter(ch)}

className="block w-full text-left p-5 mt-3 rounded-2xl bg-white/5"

>

Chapter {index+1}

</button>

)

)

}


{

chapterLoading && (

<p className="mt-5">

Loading Chapter...

</p>

)

}

</div>

)

}




{

character && (

<div className="bg-white/5 p-8 rounded-3xl">

<h2 className="text-2xl font-bold mb-5">

Detected Character

</h2>

<p>Name: {character.name}</p>

<p>Appearance: {character.appearance}</p>

<p>Outfit: {character.outfit}</p>

<p>Accessory: {character.accessory}</p>

</div>

)

}




{

scenes.length>0 && (

<div className="bg-white/5 p-8 rounded-3xl">

<h2 className="text-2xl font-bold mb-5">

Extracted Scenes

</h2>

{

scenes.map(

(scene,index)=>(

<div key={index} className="mb-5">

<h3>

Scene {index+1}

</h3>

<p>

{scene}

</p>

</div>

)

)

}

</div>

)

}




{

prompts.length>0 && (

<div className="bg-white/5 p-8 rounded-3xl">

<h2 className="text-2xl font-bold mb-5">

Generated Prompts

</h2>

{

prompts.map(

(prompt,index)=>(

<div key={index} className="mb-5">

<h3>

Prompt {index+1}

</h3>

<p>

{prompt}

</p>

</div>

)

)

}


<div className="flex gap-4 mt-8">

<button

onClick={handleGenerate}

className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600"

>

{

imageLoading

?

"Generating..."

:

"Generate Story"

}

</button>


<button

onClick={handleExport}

className="px-8 py-4 rounded-2xl bg-green-600"

>

{

exportLoading

?

"Exporting..."

:

"Download Storybook PDF"

}

</button>

</div>

</div>

)

}



{

images.length>0 && (

<StoryboardViewer

scenes={scenes}

prompts={prompts}

images={images}

/>

)

}

</div>

)

}