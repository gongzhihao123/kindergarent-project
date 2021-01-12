const Environment = process.env.NODE_ENV !== 'production'
const BASE_UR = Environment ? '/platform' : ''

export default BASE_UR
