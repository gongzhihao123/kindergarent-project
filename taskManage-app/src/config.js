const Environment = process.env.NODE_ENV !== 'production'
const BASE_UR = Environment ? '' : ''

export default BASE_UR
