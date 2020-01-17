import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-147e5.firebaseio.com'
})