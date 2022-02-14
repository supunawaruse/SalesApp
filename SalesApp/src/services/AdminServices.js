import axios from "axios";

const getAllAdmins = async () => {

    try {
      const {data} = await axios.get('https://mysql-sequalize-sales-app.herokuapp.com/api/admin')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

export {getAllAdmins}