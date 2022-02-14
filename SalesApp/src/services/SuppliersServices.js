import axios from "axios";

const getAllSuppliers = async () => {

    try {
      const {data} = await axios.get('https://mysql-sequalize-sales-app.herokuapp.com/api/supplier')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

export {getAllSuppliers}