import axios from 'axios'
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL
} from '../constants/productConstant'
import { ADD_REEVIEW_FAIL, ADD_REEVIEW_REQUEST, ADD_REEVIEW_SUCCESS } from "../constants/productConstant"

 export const getProduct=(keyword="",currentPage=1,price=[0,25000],category,ratings=0)=>async(dispatch)=>{
    try{
        dispatch({
        type :ALL_PRODUCT_REQUEST})
        let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if(category){
            link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        
        const {data}=await axios.get(link)
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}
//get details
export const getProductDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type :PRODUCT_DETAILS_REQUEST})
        const {data}=await axios.get(`/api/v1/products/product/${id}`)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        })
    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const newProductReview=(reviewData)=>async(dispatch)=>{
    try {
      dispatch({type:ADD_REEVIEW_REQUEST})
      const config={
        headers:{
          "Content-Type":"application/json"
        }
      }
      const {data}=await axios.put(`/api/v1/review`,reviewData,config)
      dispatch({type:ADD_REEVIEW_SUCCESS,payload:data.success})
    } catch (error) {
      dispatch({
          type:ADD_REEVIEW_FAIL,
          payload:error.response.data.message
      })
    }
  }

 //get all products --admin
 export const getAllProductsAdmin=()=>async(dispatch)=>{
  try {
    dispatch({type:ADMIN_PRODUCT_REQUEST});
    const {data}=await axios.get('/api/v1/admin/products');
    dispatch({type:ADMIN_PRODUCT_SUCCESS,payload:data.products});
  } catch (error) {
    dispatch({
        type:ADMIN_PRODUCT_FAIL,
        payload:error.response.data.message
    })
  }
 } 
 //add product admin
 export const createNewProduct=(productData)=>async(dispatch)=>{
    try {
      dispatch({type:NEW_PRODUCT_REQUEST})
      const config={
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      console.log(productData);
      const {data}=await axios.post(`/api/v1/admin/product/new`,productData,config)
      dispatch({type:NEW_PRODUCT_SUCCESS,payload:data})
    } catch (error) {
      console.log(error);
      dispatch({
          type:NEW_PRODUCT_FAIL,
          payload:error.response.data.message
      })
    }
  }
   //delete product admin
 export const deleteProduct=(id)=>async(dispatch)=>{
  try {
    dispatch({type:DELETE_PRODUCT_REQUEST})
  
    
    const {data}=await axios.delete(`/api/v1/admin/product/${id}`,)
    dispatch({type:DELETE_PRODUCT_SUCCESS,payload:data.success})
  } catch (error) {
    dispatch({
        type:DELETE_PRODUCT_FAIL,
        payload:error.response.data.message
    })
  }
}
 //update product admin
 export const updateProduct=(id,productData)=>async(dispatch)=>{
  try {
    dispatch({type:UPDATE_PRODUCT_REQUEST})
    const config={
      headers:{
        "Content-Type":"application/json"
      }
    }
    const {data}=await axios.put(`/api/v1/admin/product/${id}`,productData,config)
    dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:data.success})
  } catch (error) {
    dispatch({
        type:UPDATE_PRODUCT_FAIL,
        payload:error.response.data.message
    })
  }
}
//get all revies by admin
export const getAllReviews=(id)=>async(dispatch)=>{
  try {
    dispatch({type:ALL_REVIEWS_REQUEST})
  
    const {data}=await axios.get(`/api/v1/reviews?id=${id}`)
    dispatch({type:ALL_REVIEWS_SUCCESS,payload:data.reviews})
  } catch (error) {
    dispatch({
        type:ALL_REVIEWS_FAIL,
        payload:error.response.data.message
    })
  }
}
//Delete revies by admin
export const deleteReviews=(reviewId,productId)=>async(dispatch)=>{
  try {
    dispatch({type:DELETE_REVIEW_REQUEST})
  
    const {data}=await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`)
    dispatch({type:DELETE_REVIEW_SUCCESS,payload:data.success})
  } catch (error) {
    dispatch({
        type:DELETE_REVIEW_FAIL,
        payload:error.response.data.message
    })
  }
}

// clearing errors
export const clearError=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}