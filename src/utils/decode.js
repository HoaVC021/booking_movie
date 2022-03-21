import jwt_decode from 'jwt-decode';

function deCode(token) {
  let role;
  if (token) {
    var decoded = jwt_decode(token);
    role =
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }
  console.log(role);
  return role || 'KhachVangLai';
}
export default deCode;
