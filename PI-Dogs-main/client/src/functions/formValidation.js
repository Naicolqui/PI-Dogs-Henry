
    //-----------------Validaciones del formulario-----------------------

    function exists(str){
        if (!str) return true;
        return false;
    }

    function validName(str){
        if(str.length < 1 || str.length > 30) return true;
        if(typeof str !== "string") return true;
        return false;
    }

    function validWeight(str){
        if(str.length < 1 || str.length > 10) return true;
        if(typeof str !== "string") return true;
        return false;
    }

    function validHigh(str){
        if(str.length < 1 || str.length > 5) return true;
        if(typeof str !== "string") return true;
        return false;
    }

    function validLife(str){
        if(typeof str !== "string") return true;
        return false;
    }

    function longLife(str){
        if(str.length < 1 || str.length > 5) return true;
        return false;
    }


    function validation(data){
        let errors = {}

        //Valido los campos obligatorios

        if(exists(data.name) === true) errors.name = "La raza necesita un nombre";

        if(exists(data.high) === true) errors.high = "La raza necesita un nombre";

        if(exists(data.weightMin) === true) errors.weightMin = "La raza necesita un nombre";

        if(exists(data.weightMax) === true) errors.weightMax = "La raza necesita un nombre";

        //Valido las distintas características

        if(validName(data.name) === true) errors.name = "El nombre ingresado no es válido";

        if(validWeight(data.weightMax) === true) errors.weightMax = "El peso ingresado no es válido";

        if(validWeight(data.weightMin) === true) errors.weightMin = "El peso ingresado no es válido";

        if(validHigh(data.high) === true) errors.high = "La altura ingresada no es válida";

        if(validLife(data.life_span) === true) errors.life_span = "La esperanza de vida ingresada no es válida";

        if(longLife(data.life_span) === true) errors.life_span = "Nos gustaría que sean eternos pero debemos disfrutarlos mientras estén con nosotors";
        
        return errors;
    }

    export default validation;