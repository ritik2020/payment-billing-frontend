const baseURL = "http://localhost:3000";

async function getBranchById(id){
    const res = await fetch(`${baseURL}/branch/${id}`);
    if(res.status===200){
        const branch = await res.json();
        return branch;
    }
}

async function editBranch(){
    const branch = {
        id: this.id,
        name: document.getElementById("branchName").value,
        address: document.getElementById("branchAddress").value
    }
    await hitEditBranchRequest(branch, this.id);
}


async function hitEditBranchRequest(branch, id){
    try{
        const res = await fetch(`${baseURL}/branch/`,{
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(branch)
        });
        if(res.status===200){
            alert("Branch updated successfully");
            location.replace(`./branchDetails.html?branchId=${id}`);
        }
        else if(res.status===401){
            alert("unauthorized");
        }else{
            alert("something went wrong");
        }
    } catch(err){
        console.log(err);
    }
    
}

function prefillEditForm(branch){
    const {name, address} = branch;
    document.getElementById("branchName").value = name;
    document.getElementById("branchAddress").value = address;   
}

async function main(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('branchId');
    const branch = await getBranchById(id);
    prefillEditForm(branch);
    document.getElementById("submit-btn").addEventListener("click",()=>{
        editBranch.call({id});
    });
}

main();