import axios from "axios";

const getAllPurchases = async () => {

    try {
      const {data} = await axios.get('https://mysql-sequalize-sales-app.herokuapp.com/api/purchase')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

export {getAllPurchases}