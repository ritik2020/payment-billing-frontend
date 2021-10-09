const baseURL = "http://localhost:3000"

async function getPaymentDetails(id){
    try{
        const res = await fetch(`${baseURL}/paymentdetail/${id}`);
        if(res.status===200){
            const detail = await res.json();
            return detail;
        }
    }catch(err){
        console.log(err);
    }
}

async function editPaymentDetail(){
    const paymentDetail = {
        id: this.id,
        amount: document.getElementById("amount").value,
        date: document.getElementById("date").value
    }
    await hitEditPaymentDetailRequest(paymentDetail);
}


async function hitEditPaymentDetailRequest(paymentDetail){
    try{
        const res = await fetch(`${baseURL}/paymentdetail/`,{
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentDetail)
        });
        if(res.status===200){
            alert("Updated successfully");
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

function prefillEditForm(paymentDetail){
    const {date, amount} = paymentDetail;
    document.getElementById("date").value = date;
    document.getElementById("amount").value = amount;
}

async function main() {
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const paymentDetail = await getPaymentDetails(id);
    prefillEditForm(paymentDetail);
    document.getElementById("submit-btn").addEventListener("click",()=>{
        editPaymentDetail.call({id});
    });
}

main();