const Environment = process.env.NODE_ENV !== 'production'
const BASE_UR = Environment ? '/kindergarten' : '/kindergarten'

export default BASE_UR
