import { Auth } from "../components/SignupAuth";
import { Quote } from "../components/Quote";

export function Signup(){
    return <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
            <Auth />
        </div>
        <div className=" hidden md:block">
            <Quote />
        </div>
    </div>
}