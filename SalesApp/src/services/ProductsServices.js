import axios from "axios";

const getAllProducts = async () => {

    try {
      const {data} = await axios.get('https://mysql-sequalize-sales-app.herokuapp.com/api/product')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

  const getAllProductsWithoutStock = async () => {

    try {
      const {data} = await axios.get('https://mysql-sequalize-sales-app.herokuapp.com/api/product/withoutStock')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }


export {getAllProducts,getAllProductsWithoutStock}