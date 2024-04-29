const model = (function () {


    const Income = function (id, desc, value) {

        this.id = id;
        this.desc = desc;
        this.value = parseFloat(value);
    }


    const Expense = function (id, desc, value) {

        this.id = id;
        this.desc = desc;
        this.value = parseFloat(value);
        this.percentage = -1;
    }


  const  calculatePercentage2 = function (elem,totalExp) {

        if (totalExp > 0) {
            elem.percentage = Math.round((elem.value / totalExp) * 100);
        } else {

            elem.percentage = -1;
        }

        state.allObject.exp.forEach((e,index)=>{

            if (e.id==elem.id){

                state.allObject.exp[index].percentage=elem.percentage;
            }
        })

    }

    let state = {

        allObject: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0,
        },
        budget: 0,
        percentage: -1
    }

    const calculateTotal = function (type) {


        let suma = 0;

        state.allObject[type].forEach(elem => {

            suma = suma + elem.value;
        })
        state.totals[type] = suma;

    }
    return {

        addItem: function (type, desc, value) {


            let id, objekat;

            if (state.allObject[type].length > 0) {

                id = state.allObject[type][state.allObject[type].length - 1].id + 1;
            } else {

                id = 1;
            }

            if (type == "exp") {

                objekat = new Expense(id, desc, value);

            } else {

                objekat = new Income(id, desc, value);
            }

            state.allObject[type].push(objekat);

            localStorage.setItem("values",JSON.stringify(state.allObject));

            return objekat;


        },
        calculateBudget: function () {

            calculateTotal("inc");
            calculateTotal("exp");



            state.budget = state.totals.inc - state.totals.exp;

            if (state.totals.inc > 0) {
                state.percentage = Math.round((state.totals.exp / state.totals.inc) * 100);
            } else {
                state.percentage = -1;
            }


        },
        getBudget: function () {

            return {

                budget: state.budget,
                totalInc: state.totals.inc,
                totalExp: state.totals.exp,
                percentageGlobal: state.percentage
            }
        },

        calculatePercentages: function () {


            state.allObject.exp.forEach(elem => {


               calculatePercentage2(elem,state.totals.exp);
            })
            localStorage.setItem("values",JSON.stringify(state.allObject));
        }
        ,

        getPercentages: function () {

            const nizPorcenata = state.allObject.exp.map(elem => elem.percentage);
           

            return nizPorcenata;
        },

        deleteItem:function(id,type){

             let i=-1;

            state.allObject[type].forEach(  (elem,index)=>{

                if(id==elem.id){
                     
                  i=index;
                }
            })

            if(i!=-1){
                
                state.allObject[type].splice(i,1);

            }

            localStorage.setItem("values",JSON.stringify(state.allObject));

        },

        setMOney:function(data){

            state.allObject.inc=data.inc;
            state.allObject.exp=data.exp;
            console.log(state)
        }
    }

})();


export default model;