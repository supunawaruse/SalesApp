import axios from "axios";

const getAllStocks = async () => {

    try {
      const {data} = await axios.get('https://mysql-sequalize-sales-app.herokuapp.com/api/stock')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

export {getAllStocks}