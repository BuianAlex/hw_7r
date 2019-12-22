String.prototype.maxLength = (len)=>{
    if(this.length > len ){
        return false;
    }
    else{
        return true;
    }
}

String.prototype.minLength = (len)=>{
    if(this.length < len ){
        return false;
    }
    else{
        return true;
    }
}

String.prototype.isEmail = ()=>{
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this)) {
        return true;
    } else {
        return false;
    }
}

String.prototype.isPhoneNumber = ()=>{
    if (/38[0-9]{10,}/.test(this)) {
        return true;
      } else {
        return false;
      }
}
String.prototype.noSpeсialChar = ()=>{
    if (/[-\/\\^$*+?()|[\]{}]/g.test(this)) {
        return true
    }
    else{
        return false;
    }
}

String.prototype.Password = ()=>{
    const mediumRegex = new RegExp(
        '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );
    const strongRegex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );  
    if (strongRegex.test(this)) {
        return 2;
    }
    else if(mediumRegex.test(this)){
        return 1;
    }
    else{
        return 0;
    }
}



 
