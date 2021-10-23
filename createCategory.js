require('dotenv').config()

const axios = require('axios').default,
    fs = require('fs'),
    ACCESS_TOKEN = process.env.ACCESS_TOKEN


//text content to be displayed in the category
const payload1 = [
        {
            "type": "text_block",
            "children": [
                {
                    "type": "h1",
                    "children": [
                        {
                            "type": "text",
                            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        }
                    ]
                }
            ]
        }
    ]
//icon and color must be selected from the provided constants by Graph API

const postCategory = async(title,icon,color,content) => {

    const graphapiCategory = "https://graph.facebook.com/v12.0/community/knowledge_library_categories"

    const cfg1 = {
        method: 'post',
        url: `${graphapiCategory}?title=${encodeURIComponent(title)}&icon=${encodeURIComponent(icon)}&color=${encodeURIComponent(color)}&json_content=${JSON.stringify(content)}&access_token=${ACCESS_TOKEN}`,
        headers: {
            'Content-Type': 'application/json'
        },
    }
    
    return axios(cfg1)
}

const postSubCategory = async(categoryId,title,content) => {

    const id = parseInt(categoryId)

    const graphapiSub = `https://graph.facebook.com/v12.0/${id}/subcategories`

    const cfgSub = {
        method: 'post',
        url: `${graphapiSub}?title=${encodeURIComponent(title)}&json_content=${JSON.stringify(content)}&access_token=${ACCESS_TOKEN}`,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    
    return axios(cfgSub)
    
}

postCategory('Test Category1','airplane','cyan',payload1)
    .then((value) => {
        const id = parseInt(value.data.id)
        console.log(id)
        postSubCategory(id, 'Test Subcategory1', payload1)
        postSubCategory(id,'Test Subcategory11',payload1)
    })
    .catch((error) => {
        if(error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    })

postCategory('Test Category2','badge','red',payload1)
    .then((value) => {
        const id = parseInt(value.data.id)
        console.log(id)
        postSubCategory(id, 'Test Subcategory2', payload1)
        postSubCategory(id,'Test Subcategory22',payload1)
    })
    .catch((error) => {
        if(error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        }
    })