import axios from "axios";

const getAllCustomers = async () => {

    try {
      const {data} = await axios.get('https://mysql-sequalize-sales-app.herokuapp.com/api/customer')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

export {getAllCustomers}