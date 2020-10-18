let res = document.querySelector("#result"),
    holder = document.querySelector("#holder"),
    theNum = "",
    oldNum = "",
    resultNum = "0",
    operator,
    clickables = document.querySelectorAll('.calc-button');

clickables.forEach((elem) => {
    elem.addEventListener("click", function clickButton(button) {
        let buttonValue = this.attributes.value.value,
            id = this.id,
            l = theNum.length,
            lth;

        function Animations() {     // button animations ( regular ones & for operator buttons)

            function DeleteOprStyle() {
                let i = 0;
                while(i < 4){
                    let oprStyle = document.querySelectorAll("#calc-opr")[i];
                    oprStyle.style = "";
                    ++i;
                }
            }

            if(id !== "calc-opr") {
                DeleteOprStyle();
                elem.style.transition = "0.15s"
                elem.style.opacity = "0.5"
                setTimeout(function(){
                    elem.style.opacity = "1"
                },150)         
            }else {
                DeleteOprStyle();
                elem.style.backgroundColor = "#909090";
                elem.style.color = "white";
            } 
        }
        Animations();

        function Display() {

            if(buttonValue === "." && res.value.includes(".")) return;

            if (res.value == "") {
                theNum = buttonValue;
              }else if(l < 9) {
                theNum += buttonValue;
              }
            
              res.value = theNum;
        }
        if(id == "calc-num" || id == "calc-zero") Display();

        function Operator() {
            if(id == "calc-opr"){
                holder.value = res.value + " " + buttonValue + " ";
                oldNum = res.value;
                theNum = "";
                operator = buttonValue;
            }
        }
        Operator();

        function Calculate(oldNum) {

            switch (operator) {
                case "+":
                  res.value = +oldNum + +theNum;
                  break;
          
                case "-":
                  res.value = +oldNum - +theNum;
                  break;
          
                case "×":
                  res.value = +oldNum * +theNum;
                  break;
          
                case "÷":
                  res.value= +oldNum / +theNum;
                  break;
                
                default:
                  resultNum = theNum;
              }

            holder.value = res.value;
        }
        if(id == "calc-equ") Calculate(oldNum);

        let Sqrt = function() {
            if(buttonValue === "√") {
                if(res.value >= 0){
                    res.value = Math.sqrt(res.value);
                }else {
                    alert("negative number!")
                }
                holder.value = res.value;
                lth = res.value.toString().length;
                if(lth > 9) {
                    res.style.fontSize = "50px";
                    holder.style.fontSize = "25px";
                }
            }
        }
        Sqrt();

        function Clear() {
            if(buttonValue == "AC") {
                holder.value = res.value = "";  
                res.style.fontSize = "100px";
                holder.style.fontSize ="50px";
            }else if(buttonValue == "C") {
                res.value = res.value.slice(0, -1);
                theNum = theNum.slice(0, -1);
                }
        }
        Clear();

    });
})