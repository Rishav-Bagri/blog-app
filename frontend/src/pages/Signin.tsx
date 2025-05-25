import { Quote } from "../components/Quote";
import { Auth } from "../components/SigninAuth";

export function Signin() {
    return <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
            <Auth />
        </div>
        <div className=" hidden md:block">
            <Quote />
        </div>
    </div>
}