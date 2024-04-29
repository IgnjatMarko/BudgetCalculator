let controler = function (model, view) {

    const initValue = {

        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentageGlobal: -1

    }


    let setupListeners = function () {


        view.displayMonth();

        let DOM = view.getDomstrings();
        
        document.querySelector(DOM.inputBTN).addEventListener("click", ctrlAddItem);


    }

    let setListItem = function (id, type) {


        document.querySelector(`.delete${id}${type}`).addEventListener("click", ctrlDeleteItem);


    }

    let ctrlAddItem = function () {

        let uneto = view.getInput();
        let novi = model.addItem(uneto.type, uneto.desc, uneto.value);
        view.addItemToView(novi, uneto.type);

        setListItem(novi.id, uneto.type);
        updateBudget();
        updatePercentages();


    }

    let updateBudget = function () {

        model.calculateBudget();
        let bg = model.getBudget();
        view.displayBudget(bg);
    }

    let updatePercentages = function () {


        model.calculatePercentages();
        view.renderPercentages(model.getPercentages());

    }

    let ctrlDeleteItem = function () {
        alert("Item deleted")

        let id = this.dataset.id;
        let type = this.dataset.type;

        model.deleteItem(id, type);
        view.deleteItem(id, type);
        updateBudget();
        updatePercentages();


    }


    let renderFromStorage=function(){

     let stor=JSON.parse(localStorage.getItem("values"));


        
      stor.inc.forEach(elem=>{
        view.addItemToView(elem, 'inc');
        setListItem(elem.id, 'inc');
        
      })

      stor.exp.forEach(elem=>{
        view.addItemToView(elem, 'exp');
        setListItem(elem.id, 'exp');
        
      })

        model.setMOney(stor);

        updateBudget();
        updatePercentages();


    }
    


    return {

        init: function () {
            view.displayMonth();
            setupListeners();
            if (!localStorage.getItem("values")) {
                view.displayBudget(initValue);
            } else {

                renderFromStorage();

            }
            
        }
    }

}

export default controler;