// import AES from 'crypto-js/aes'
// import u from 'crypto-js/enc-utf8'
// import b from 'crypto-js/enc-base64'

// const e = 'fuckingkey'

export default (k?: string, s?: string) => {
  try {
    if (!s) return {}
    return JSON.parse(s)
    // return JSON.parse(AES.decrypt(b.parse(s).toString(u), e).toString(u))
  } catch (e) {
    return {}
  }
}
