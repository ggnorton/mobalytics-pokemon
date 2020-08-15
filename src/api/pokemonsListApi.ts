import axios from 'axios'
import {API_PREFIX} from "./constants";

export default function() {
  let url = `${API_PREFIX}/pokemon?limit=24&offset=0`
  return axios.get(url)
    .then(({data}) => data)
}