import axios from "axios";

const getAllStocks = async () => {

    try {
      const {data} = await axios.get('http://192.168.1.10:8080/api/stock')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

export {getAllStocks}