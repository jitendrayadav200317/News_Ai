import { Loader } from "lucide-react";
import react from "react";

function LodingSpnner(){
    return(
        <div className="h-screen flex justify-center items-center">
            <Loader size={25} color="blue"/>
        </div>
    )
};
export default LodingSpnner;