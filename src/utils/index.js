export default function getToken() {
  let TOKEN;
  let parseToken = JSON.parse(localStorage.getItem('persist:root'));
  if (parseToken) {
    TOKEN = JSON.parse(parseToken.auth).token;
  } else {
    TOKEN = '';
  }
  return TOKEN;
}
