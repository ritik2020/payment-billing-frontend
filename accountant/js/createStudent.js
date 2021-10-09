const baseURL = "http://localhost:3000";

async function createStudent(){
    const student = {
        rollNumber: document.getElementById("rollNumber").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
    }

    const branch = await getBranch(24);
    const courseId = document.getElementById("courseId").value;

    await hitCreateStudentRequest(student, branch.id, courseId)
}

async function hitCreateStudentRequest(student, branchId, courseId){
    const res = await fetch(`${baseURL}/student/${branchId}/${courseId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    });
    if (res.status === 200) {
        alert("Added successfully");
        window.location.replace(`viewStudents.html`);
    }
}

async function getBranch(accId){
    try{
        const res = await fetch(`${baseURL}/accountant/branch/${accId}`);
        if(res.status===200){
            const branch = res.json();
            return branch;
        }
        else if(res.status===401){
            
        }
        else{
    
        }
    } catch(err){
        console.log(err);
    }
}


async function getCourses(){
    const res = await fetch(`${baseURL}/course/`);
    if(res.status===200){
        const courses = await res.json();
        return courses;
    }
}

function renderCourses(courses){
    const container = document.getElementById("courseId");
    courses.forEach(course=>{
        const component = createCourseComponent(course);
        container.appendChild(component);
    });
}

function createCourseComponent(course){
    const {id, name} = course;
    const option = document.createElement("option");
    option.value = id;
    option.innerText = name;
    return option;
}

async function main(){
    const courses = await getCourses();
    renderCourses(courses);
    document.getElementById("submit-btn").addEventListener("click", ()=>{
        createStudent();
    });
}

main();