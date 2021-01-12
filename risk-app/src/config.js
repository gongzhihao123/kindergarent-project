const Environment = process.env.NODE_ENV !== 'production'
const BASE_UR = Environment ? '/kzhenyouapi' : '/kzhenyouapi'

export default BASE_UR
