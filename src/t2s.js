/**
 @Project:Discord Virtual Assistant
 @Title: t2s.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description:  Interface with Text-to-Speech API

 @Changelog:
2/19/2022 IS: added basic structure
 */
class T2SGeneric{
    constructor() {
    }

    convert(text){
        return null
    }
}

class T2S extends T2SGeneric {
    constructor() {
        super();
    }
    convert(text){
        // return new audio
        return null
    }
}

class T2STest extends T2SGeneric {
    constructor() {
        super();
    }
    convert(text){
        // return test audio
        return null
    }
}
module.exports = T2S;