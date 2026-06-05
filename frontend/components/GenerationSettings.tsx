"use client";

type Props = {
  style:string;
  setStyle:(value:string)=>void;
};

export default function GenerationSettings({
style,
setStyle
}:Props){

const styles=[
"Disney Pixar",
"Anime",
"Watercolor",
"Comic"
];

return(

<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-12">

<h2 className="text-5xl font-bold mb-10">

Generation Settings

</h2>

<p className="text-gray-300 mb-8">

Visual Style

</p>

<div className="grid grid-cols-2 gap-6">

{

styles.map((item)=>(

<button

key={item}

onClick={()=>setStyle(item)}

className={`

p-8 rounded-3xl transition-all

${
style===item

?

"bg-gradient-to-r from-violet-600 to-cyan-500"

:

"bg-white/5"

}

`}

>

{

item==="Disney Pixar"

?

"Pixar"

:

item

}

</button>

))

}

</div>

<p className="mt-8 text-cyan-400">

Selected:

{style}

</p>

</div>

)

}