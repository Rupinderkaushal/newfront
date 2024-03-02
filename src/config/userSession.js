const sessionKey = 'token';

const getBearerToken = (tokenName)=>{
    let localStorageData = JSON.parse(localStorage.getItem(sessionKey))
    return localStorageData;
};

const getAuthHeader=()=>{
    return{
        Accept: 'application/json',
        'Content-Type' :'application/json',
        Authorization:`Bearer ${getBearerToken()}`
    }
};

const getUnAuthHeader = () => {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  };

  const getHeader = () => {
    if (!isUserLoggedIn) return getUnAuthHeader();
  
    return getAuthHeader();
  };

  const isUserLoggedIn = () => {
    return JSON.parse(localStorage.getItem(sessionKey))? true: false;
  }
  const updateLoggedInData = (data) => {
    console.log('data is ', data)
    localStorage.setItem(sessionKey, JSON.stringify(data));
  };

  module.exports={
    isUserLoggedIn,
    getHeader,
    updateLoggedInData,
  }