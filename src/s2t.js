/**
 @Project:Discord Virtual Assistant
 @Title: s2t.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description:  Interface with Speech-to-Text API

 @Changelog:
2/19/2022 IS: added basic structure
 */
class S2TGeneric{
    transcribe(audio){
        return null
    }
}

class S2T extends S2TGeneric {
    constructor() {
        super();
    }
    transcribe(audio){
        return null
    }
}

class S2TTest extends S2TGeneric {
    constructor() {
        super();
    }
    transcribe(audio){
        // return test transcription
        return "discord what time is it"
    }
}
module.exports = S2T;