import JSEncrypt from 'jsencrypt/bin/jsencrypt'

const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC97X5n0q60wmi/P2KJ2Yp8TzM/
HGsxRmr8oYrOD0GSsDpJp0dre9Wn6Bnw1BOnuoO5moA9Z+A2tYm7eyVd/Xbgi3Cz
cxIW9t3pOUyjgc+s2120sum66dZaJpGwxuaUZipwBlG3g+nG+hvQuUYblkZmt2N8
lTX6I3qzwG8U8X4wJQIDAQAB`

const privateKey = `MIICXAIBAAKBgQC97X5n0q60wmi/P2KJ2Yp8TzM/HGsxRmr8oYrOD0GSsDpJp0dr
e9Wn6Bnw1BOnuoO5moA9Z+A2tYm7eyVd/Xbgi3CzcxIW9t3pOUyjgc+s2120sum6
6dZaJpGwxuaUZipwBlG3g+nG+hvQuUYblkZmt2N8lTX6I3qzwG8U8X4wJQIDAQAB
AoGANAov2XjDv+mI0+YlNMozhM4ap48827qEtAX7R2ystemtfuLj0dKTfzc8bF1f
qVSUpTVtL+YXbEYfoAwk9/TsLi6nJDtPZSzyAuq+L7O6YI9btw45X6x3HxmkFXv1
gdQN0PB5+kftUJn/qmLFkIkZaKqWt8yiUykxTYrVtjTLwAECQQD5T9mtz9u2ob9d
phG/7aYsgqBy53WRilP+JLAJ6/7BHCyxklCoVyp3lillKGsBeg1SCdjWo+mWX6x3
RK7FR/ABAkEAwwXSiUJlRgjfErT54u2G3XD+Atfjb2F8ZyL0OHeD7jIL3rT0lKrw
deps//njS623PrlzVt5d/4i7+2/P9hiAJQJAW9rRprpYhxdc/FH9ZCtY+DlAiFVC
+dZvT8mQmnc6q0eIJ/xyfzNuUBUhN0YG9spTMhCytZI6s86YKnFBuyngAQJBALNX
62DmehOJnPqrCxGwtVF202Dx/+kxkSGXd1dmMSEfTOMlLbZ57F/DkTFlL60st1Mr
X/IG1BJmP9jd3jTGGzECQGXbTdnVHlToONMpt9Qs00pdU7391VDIT6tuTLcGx0NL
fOH0I7NnDKwtH1E9uBJFRHwc47hsMwgzr9hNqVhgfAo=
`

const fkey = ``

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}

export function encrypt2(m) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(fkey)
  return encryptor.encrypt(m)
}
