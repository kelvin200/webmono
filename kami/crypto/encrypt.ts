// import AES from 'crypto-js/aes'
// import u from 'crypto-js/enc-utf8'
// import b from 'crypto-js/enc-base64'

// const e = 'fuckingkey'

// export default (s: {}) => b.stringify(u.parse(AES.encrypt(JSON.stringify(s), e).toString()))
export default (s: {}) => JSON.stringify(s)
