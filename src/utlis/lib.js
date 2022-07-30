export const getSlug = (email)=>{
    return email.split(".").toString().replace(/,/gi, "_");
}