import axios from "axios";

// Service api
export const API_URL = "http://localhost:3012/employee"

// for Get request only
export const doApiGet = async(_url) => {
  try{
    let resp = await axios({
      url:_url,
      method: "GET",
    })
    return resp.data;
  }
  catch(err){
    console.log(err);
    throw err;
  }
}

// For Delete , put , post , patch request
export const doApiMethod = async(_url,_method,_body = {}) => {
  try{
    let resp = await axios({
      url:_url,
      method: _method,
      data:_body ,
    })
    return resp.data;
  }
  catch(err){
    console.log(err);
   throw err;
  }
}