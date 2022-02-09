import Cookies from 'js-cookie'

const TokenKey = 'BoHoTec-Token'
const KulunTokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove(KulunTokenKey)
  return Cookies.remove(TokenKey)
}

export function setKulunToken(token) {
  let host = window.location.host
  const idx = host.indexOf('.')
  console.log('host', host, idx)
  if (0 < idx) {
    host = host.substring(1 + idx, host.length)
    // host = `gbim{host}/#/projmap/index`
    console.log('set cookie for kulun domain', host)
  }
  return Cookies.set(KulunTokenKey, token, {domain: host})
}
