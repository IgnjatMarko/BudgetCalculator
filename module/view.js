const view = (function () {

    let domStrings = {


        inputBTN: '.add__btn',
        inputType: ".add__type",
        inputDesc: '.add__description',
        inputValue: ".add__value",
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        totalIncomeLabel: ".budget__income--value",
        totalExpenseLabel: ".budget__expenses--value",
        expensesPercentage: ".budget__expenses--percentage",
        expensesPercLabel: ".item__percentage",
        dateLabel: ".budget__title--month"
    }


    return {


        getDomstrings: function () {

            return domStrings;
        },
        getInput: function () {

            return {

                type: document.querySelector(domStrings.inputType).value,
                desc: document.querySelector(domStrings.inputDesc).value,
                value: document.querySelector(domStrings.inputValue).value

            }
        },
        addItemToView: function (objekat, type) {


            let html = ``;

            let elem;

            if (type == "inc") {

                elem = domStrings.incomeContainer;

                html = `<div class="item clearfix" id="inc-${objekat.id}">
                <div class="item__description">${objekat.desc}</div>
                <div class="right clearfix">
                    <div class="item__value">${objekat.value}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn">
                            <i class="ion-ios-close-outline delete${objekat.id}${type}"  data-id="${objekat.id}" data-type="${type}"></i>
                        </button>
                    </div>
                </div>
            </div>`

            } else {


                elem = domStrings.expenseContainer;

                html = ` <div class="item clearfix" id="exp-${objekat.id}">
                <div class="item__description">${objekat.desc}</div>
                <div class="right clearfix">
                    <div class="item__value">${objekat.value}</div>
                    <div class="item__percentage"></div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline delete${objekat.id}${type}"  data-id="${objekat.id}" data-type="${type}"></i></button>
                    </div>
                </div>
            </div>`




            }

            document.querySelector(elem).insertAdjacentHTML("beforeend", html);



        },

        displayBudget: function (bg) {

            document.querySelector(domStrings.budgetLabel).textContent = bg.budget;
            document.querySelector(domStrings.totalIncomeLabel).textContent = bg.totalInc;
            document.querySelector(domStrings.totalExpenseLabel).textContent = bg.totalExp;
            if (bg.percentageGlobal > 0) {
                document.querySelector(domStrings.expensesPercentage).textContent = bg.percentageGlobal + "%";


            } else {

                document.querySelector(domStrings.expensesPercentage).textContent = "...";

            }

        },
        renderPercentages:function(perc){

            let domPerce=document.querySelectorAll(domStrings.expensesPercLabel);

            domPerce.forEach((elem,index)=>{

                elem.textContent=perc[index]+"%";
            })



        },

        deleteItem:function(id,type){

            const element=document.querySelector(`#${type}-${id}`);
            element.parentElement.removeChild(element);

        },
        displayMonth:function() {
            let now, year, month, months;
            now = new Date();
            month = now.getMonth();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'];
            year = now.getFullYear();
            document.querySelector(domStrings.dateLabel).textContent = months[month] + " " + year;
        }



    }


})();


export default view;