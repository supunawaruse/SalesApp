import axios from "axios";

const getAllSales = async () => {

    try {
      const {data} = await axios.get('http://192.168.1.10:8080/api/sale')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

  const getRecentSales = async () => {

    try {
      const {data} = await axios.get('http://192.168.1.10:8080/api/sale/recent')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

  const getToBePaidSales = async () => {

    try {
      const {data} = await axios.get('http://192.168.1.10:8080/api/sale/toBePaid')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

  
  const updateToBePaidSale = async ({id}) => {

    try {
      await axios.get(`http://192.168.1.10:8080/api/sale/toBePaid/${id}`)
      console.log('Updated....')
    } catch (error) {
      console.log(error.response)
    }
  }



export {getAllSales,getRecentSales,getToBePaidSales,updateToBePaidSale}