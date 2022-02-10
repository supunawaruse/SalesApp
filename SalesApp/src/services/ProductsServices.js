import axios from "axios";

const getAllProducts = async () => {

    try {
      const {data} = await axios.get('http://192.168.1.10:8080/api/product')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

  const getAllProductsWithoutStock = async () => {

    try {
      const {data} = await axios.get('http://192.168.1.10:8080/api/product/withoutStock')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }


export {getAllProducts,getAllProductsWithoutStock}