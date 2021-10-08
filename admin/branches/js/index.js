const baseURL = "http://localhost:3000";

async function getAllBranches(){
    try{
        const res = await fetch(`${baseURL}/branch/`);
        const data = await handleFetchAPIResponse(res);
        return data;
    } catch(err){
        console.log(err);
    }
}





async function handleFetchAPIResponse(res){
    if(res.status===401){
        //refirect to login page
    } else if(res.status!=200){
        console.log(res);
        throw new Error("Something went wrong");
    } else{
        const data = await res.json();
        return data;
    }
}


async function main(){
    const res = await getAllBranches();
    console.log(res);
}

main();