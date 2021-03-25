import axios from 'axios'

export default {
  async index() {
    const result = await axios.get('http://api.ays.com/api/setting')
    return result.data
  }
}