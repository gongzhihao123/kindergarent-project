const Environment = process.env.NODE_ENV !== 'production'
const BASE_UR = Environment ? '/kindergartenapi' : '/kindergartenapi'

export default BASE_UR
