interface Avatartype{
    name:string,
}
export function Avatar({name}:Avatartype){
    return <div className="h-7 w-7  text-lg font-semibold rounded-full uppercase bg-slate-500 flex justify-center items-center ">
        {name[0]}
    </div>
}