const baseURL = "http://localhost:3000"

async function addPaymentDetails(rollNo) {
    const details = {
        date: document.getElementById("date").value,
        amount: document.getElementById("amount").value
    }

    try {
        const res = await fetch(`${baseURL}/paymentdetail/${rollNo}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        });
        if (res.status === 200) {
            alert("Added successfully");
            window.location.replace(`viewStudent.html?rollNo=${rollNo}`);
        }
        else if (res.status === 401) {
            alert("unauthorized");
        } else {
            alert("something went wrong");
        }
    } catch (err) {
        console.log(err);
    }
}


async function main() {
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const rollNo = urlParams.get("rollNo");
    document.getElementById("submit-btn").addEventListener("click",()=>{
        addPaymentDetails(rollNo);
    });
}

main();