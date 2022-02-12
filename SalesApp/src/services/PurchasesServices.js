import axios from "axios";

const getAllPurchases = async () => {

    try {
      const {data} = await axios.get('http://192.168.1.10:8080/api/purchase')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

export {getAllPurchases}