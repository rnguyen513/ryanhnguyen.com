export default async function GetProjects() {
    let exp = "fetch didn't work"
    let response = await fetch("https://api.github.com/users/ryangu23/repos").then(data => data.json()).then(res => {exp=res;}).then();
    return(exp);
}