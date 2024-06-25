
const fetchCategoryWiseProduct = async(category)=>{
    console.log("category",category)
    const response = await fetch(`http://localhost:3000/api/product/getProductByCategory?category=${category}`,{
        method : 'GET',
        headers : {
            "content-type" : "application/json"
        },
     
    })

    const dataResponse = await response.json()
    console.log(dataResponse)
    return dataResponse
}

export default fetchCategoryWiseProduct