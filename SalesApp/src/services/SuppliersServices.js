import axios from "axios";

const getAllSuppliers = async () => {

    try {
      const {data} = await axios.get('http://192.168.1.10:8080/api/supplier')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

export {getAllSuppliers}