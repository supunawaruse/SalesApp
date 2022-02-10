import axios from "axios";

const getAllAdmins = async () => {

    try {
      const {data} = await axios.get('http://192.168.1.10:8080/api/admin')
      return data;
    } catch (error) {
      console.log(error.response)
    }
  }

export {getAllAdmins}