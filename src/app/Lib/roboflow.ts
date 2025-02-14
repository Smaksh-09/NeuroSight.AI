import axios from "axios";
import FormData from "form-data";


export async function roboflowCall(buffer:Buffer,fileName:string){
    const ROBOFLOW_BRAIN_API_KEY=process.env.ROBOFLOW_BRAIN_API_KEY;

    const endpoint = `https://detect.roboflow.com/bt-cohqx/1?api_key=${ROBOFLOW_BRAIN_API_KEY}`;


    const formData=new FormData();
    formData.append("file",buffer,{filename:fileName});

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