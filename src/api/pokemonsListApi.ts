import axios from 'axios'
import {
  API_PREFIX,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET
} from "./constants";

export default function(url?: string | null) {
  let actualUrl = url ? url : `${API_PREFIX}/pokemon?limit=${DEFAULT_LIMIT}&offset=${DEFAULT_OFFSET}`
  return axios.get(actualUrl)
    .then(({data}) => data)
}