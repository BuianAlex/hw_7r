export function setLocalUser(data) {
  localStorage.setItem('userData', JSON.stringify(data));
}

export function getLocalUser() {
  const data = JSON.parse(localStorage.getItem('userData'));
  if(data){
    return data;
  }
  return false;
}

export function remLocalUser(){
  localStorage.removeItem('userData');
} 

export function cleaLocalStor(){
   localStorage.clear();
}

