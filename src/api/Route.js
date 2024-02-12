const BASE = process.env.REACT_APP_API;
export const routes = {
  /*PERSONNEL ROUTE*/
  LOGIN: BASE + "/user/login",
  CHECK: BASE + "/user/check",
  LOGOUT: BASE + "/user/logout",
  GETPERSONNEL: BASE + "/user/all",
  ADDPERSONNEL: BASE + "/user/add",
  UPDATEPERSONNEL: BASE + "/user/put",
  DELETEPERSONNEL: BASE + "/user/delete",

  /*CHAMPION ROUTE*/
  GETCHAMPION: BASE + "/champion/all",
  ADDCHAMPION: BASE + "/champion/add",
  UPDATECHAMPION: BASE + "/champion/put",
  DELETECHAMPION: BASE + "/champion/delete",

  /*QUANTIFICATEUR ROUTE*/
  GETQUANTIF: BASE + "/quantificateur/all",
  ADDQUANTIF: BASE + "/quantificateur/add",
  UPDATEQUANTIF: BASE + "/quantificateur/put",
  DELETEQUANTIF: BASE + "/quantificateur/delete",

  /*PG ROUTE*/
  GETPG: BASE + "/petit-groupe/all",
  DELETEPG: BASE + "/petit-groupe/delete",
};
