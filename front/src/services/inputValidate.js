function Validator(str) {
    const testStr = str.trim();
    this.maxLength = function(len){
        if(testStr.length > len ){
            return false;
        }
        else{
            return true;
        }
    }
  
    this.minLength = function(len){
        if(testStr.length < len ){
            return false;
        }
        else{
            return true;
        }
    }
  
    this.isEmail = function(){
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(testStr)) {
                return true;
            } else {
                return false;
            }
        }
    this.isPhoneNumber = function(){
        if (/\+38[0-9]{10,10}$/.test(testStr)) {
            return true;
          } else {
            return false;
          }
    } 
    this.noSpeсialChar = function(){
        if (/[-\/\\^$*+?()|[\]{}]/g.test(testStr)) {
            return true
        }
        else{
            return false;
        }
    }
    
    this.testPassword = function(){
        const mediumRegex = new RegExp(
            '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
        );
        const strongRegex = new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
        );  
        if (strongRegex.test(testStr)) {
            return 2;
        }
        else if(mediumRegex.test(testStr)){
            return 1;
        }
        else{
            return 0;
        }
    }
  } 


export function fildValidate(target, onBur) {
    const isValid = new Validator(target.value); 
    let errorMessage = false;
    let isSpecial = false;
    if(isValid.noSpeсialChar()){
        errorMessage =  'Not allowed special characters';
        isSpecial = true;
    }
    switch (target.name) {
        case 'login':
            if(!isSpecial){
                errorMessage = true;  //if req
                if(!isValid.minLength(3)){
                    errorMessage = 'Name is too short!';
                }
                else if(!isValid.maxLength(50)){
                    errorMessage = 'Name is too long!';
                }
                else{
                    errorMessage = false;
                    this.setState({
                        errLoginFild: errorMessage,
                    });

                }
                if(this.state.isUsedLoginFild || onBur){
                    this.setState({
                        errLoginFild: errorMessage,
                    });
                } 
                this.setState({ 
                    loginFild: target.value,
                });
            }
            else{
                this.setState({
                    errLoginFild: errorMessage,
                });
            }

            break;
        
        case 'password':
            if(!isSpecial){
                errorMessage = true;  //if req
                switch (isValid.testPassword()) {
                    case 0:
                        errorMessage = "Password must consist of numbers and letters and min 6 characters"
                        break;
                    default:
                        errorMessage = false;
                        this.setState({
                            errPasswordFild: errorMessage,
                        });
                        break;
                } 
                if(this.state.isUsedPasswordFild || onBur){
                    this.setState({
                        errPasswordFild: errorMessage,
                    });
                } 
                this.setState({ 
                    passwordFild: target.value,
                });
            }
            else{
               this.setState({
                    errPasswordFild: errorMessage,
                }); 
            }
            
            break;
        
        case 'cPassword':
            if(!isSpecial){
                errorMessage = true;  //if req
                if(target.value.length !== this.state.passwordFild.length){
                    errorMessage = 'Confirm not match'
                }
                else{
                    for (let i = 0; i < target.value.length; i++) {
                        if (this.state.passwordFild[i] !== target.value[i]) {
                            errorMessage = 'Confirm not match'
                            break;
                        }
                        if(target.value.length - 1 === i){
                            errorMessage = false;
                            this.setState({
                                errcPasswordFild: errorMessage,
                            }); 
                        }
                    } 
                }
                
                if(onBur){
                  this.setState({
                        errcPasswordFild: errorMessage,
                    }); 
                }   
                this.setState({ 
                    cPasswordFild: target.value,
                });
            }
            else{
                this.setState({
                    errcPasswordFild: errorMessage,
                }); 
            }

            break;
        
        case 'email':
            if(!isSpecial){
                if(this.state.isUsedEmailFild || onBur){
                    if(!isValid.isEmail()){
                        errorMessage = 'Email Address not valid'
                    }
                    if(target.value.length===0){
                        errorMessage = false;
                        this.setState({
                            errEmailFild: errorMessage,
                        });
                    }
                }   
                this.setState({ 
                    emailFild: target.value,
                });
            }
            this.setState({
                errEmailFild: errorMessage,
            });
            break;

        case 'phone':
            let errPhoneFild = false;
            if(/(^\+\d+$)/.test(target.value) ){
                if(this.state.isUsedPhoneFild || onBur){
                    if(!isValid.isPhoneNumber()){
                        errPhoneFild = "Phone number is not valid";
                    }
                    if(/\+38+$/.test(target.value)){
                        errPhoneFild = false;
                    }  
                    errorMessage = errPhoneFild;
                }   
                this.setState({ 
                    phoneFild: target.value,
                });

            }
            else{
                errPhoneFild = "Allowed only numbers ";
            }
            this.setState({
                errPhoneFild: errPhoneFild
            });
            break;
             
        default:
            break;
    }
    if(errorMessage){
        this.setState({ 
            confirmBtn: false,
        });
    }

    
} 


 
