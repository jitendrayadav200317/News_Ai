import { Loader } from "@mantine/core";
import react from "react";

function LodingSpnner(){
    return(
        <div className="h-screen flex justify-center items-center">
            <Loader size={25} color="blue"/>
        </div>
    )
};
export default LodingSpnner;