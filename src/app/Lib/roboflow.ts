import axios from "axios";
import fs from "fs";
import FormData from "form-data";


export async function roboflowCall(imagePath:string){
    const ROBOFLOW_API_KEY=process.env.ROBOFLOW_API_KEY;
    const ROBOFLOW_MODEL_ID=process.env.ROBOFLOW_MODEL_ID;

    const endpoint="";

    const formData=new FormData();
    formData.append("file",fs.createReadStream(imagePath));

    try{
        const response = await axios.post(endpoint,formData,{
            headers:{
                ...formData.getHeaders(),
            }
        });
        return response.data;
    }catch(error){
        //@ts-ignore
        console.error("Error callling Roboflow",error.message);
        throw error;
    }
}