type Props = {

scenes:string[]

prompts:string[]

images:string[]

}


export default function StoryboardViewer({

scenes,

prompts,

images

}:Props){

return(

<div className="space-y-8">

{

scenes.map(

(scene,index)=>(

<div

key={index}

className="bg-white/5 border border-white/10 rounded-3xl p-8"

>

<h2 className="text-2xl font-bold mb-6">

Scene {index+1}

</h2>


<div className="space-y-5">

<div>

<h3 className="font-semibold text-cyan-400">

Scene Description

</h3>

<p>

{scene}

</p>

</div>


<div>

<h3 className="font-semibold text-violet-400">

Generated Prompt

</h3>

<p className="text-gray-300">

{prompts[index]}

</p>

</div>


{

images[index] && (

<img

src={

`http://127.0.0.1:8000/${images[index]}`

}

className="rounded-2xl w-full"

alt={`Scene ${index+1}`}

/>

)

}

</div>

</div>

)

)

}

</div>

)

}