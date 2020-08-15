import axios from 'axios'
import {API_PREFIX} from "./constants";

export default function(id: string | number) {
  let url = `${API_PREFIX}/pokemon/${id}`
  return axios.get(url)
    .then(({data}) => data)
}