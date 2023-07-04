let intervalId
let gen1_list = []
let gen2_list = []
const hight = 75
const width = 75
function create_gen_list() {
    for (let i = 0; i < hight; i++) {
        gen1_list.push([]) // Initialize each subarray
        gen2_list.push([])
        for (let j = 0; j < width; j++) { //starting with all 0 (death cell)
            gen1_list[i].push(0)
            gen2_list[i].push(0)
        }
    }
}

function change_gen_color() {
    for (let i = 0; i < hight; i++) {
        for (let j = 0; j < width; j++) { // check all cells
            if (gen1_list[i][j] === 1) {
                document.getElementById(`r${i}c${j}`).style.background = 'aquamarine' // change color of alive cells
            }
        }
    }
}
function draw_gen() {
    let bord = document.getElementById("bord")
    let all_text = ""
    for (let i = 0; i < gen1_list.length; i++) {  // create html table
        all_text += "<tr>"
        for (let j = 0; j < gen1_list[i].length; j++) {
            all_text += `<td id="r${i}c${j}"></td>`
        }
        all_text += "</tr>"
    }
    all_text = `<table>${all_text}</table>`
    bord.innerHTML = all_text // draw table
    change_gen_color() // change cell color
}
function count_neighbours(i, j) {
    let neighbours = 0
    for (let row = i - 1; row <= i + 1; row++) { // check 3 row
        if (row >= 0 && row < gen1_list.length) { // chck valid row
            for (let col = j - 1; col <= j + 1; col++) { // check 3 col
                if ((col >= 0 && col < gen1_list[row].length) && gen1_list[row][col] == 1 && !(row == i && col == j)) { // chck valid cells
                    neighbours++
                }
            }
        }
    }
    return neighbours
}
function next_gen() {
    for (let i = 0; i < gen1_list.length; i++) {
        for (let j = 0; j < gen1_list[i].length; j++) {  //checking all cells one by one, i=row and j=col
            let neighbours = count_neighbours(i, j)
            if (gen1_list[i][j] == 0 && neighbours == 3) { // if a deth cell has three alive neighor it will be alive
                gen2_list[i][j] = 1
            }
            else if (gen1_list[i][j] == 1 && (neighbours < 2 || neighbours > 3)) { // if an alive has less than 2 or more than 3 neighbor it be die
                gen2_list[i][j] = 0
            }
            else {
                gen2_list[i][j] = gen1_list[i][j] // all othe cell will remain as it is
            }
        }
    }
    for (let i = 0; i < gen1_list.length; i++) { //update generation
        for (let j = 0; j < gen1_list[i].length; j++) {
            gen1_list[i][j] = gen2_list[i][j]
            gen2_list[i][j] = 0
        }
    }
    draw_gen() // draw generation
}
function input_generation(input) {
    clear_bord()
    // remove old generation
    for (let i = 0; i < hight; i++) {
        for (let j = 0; j < width; j++) {
            gen1_list[i][j] = 0
            gen2_list[i][j] = 0
        }
    }

    for(let i=0; i<input.length; i++){
        gen1_list[input[i][0]][input[i][1]] = 1
    }
    draw_gen() // draw new generation
}
function clear_bord(){
    
}
document.addEventListener('DOMContentLoaded', function () {

    let button = document.getElementById("start")
    let warnning = document.getElementById("warnning")

    let pattern1 = document.getElementById("pattern1")
    let pattern2 = document.getElementById("pattern2")
    let pattern3 = document.getElementById("pattern3")
    let pattern4 = document.getElementById("pattern4")
    let pattern5 = document.getElementById("pattern5")
    let pattern6 = document.getElementById("pattern6")
    create_gen_list() // make 2 empty generation at starting // for input gen
    let input = [[30,30],[31,29],[31,30],[31,31],[32,28],[32,29],[33,26],[33,27],[33,28],[34,27]]
    // start with a sample input
    input_generation(input)
    warnning.innerHTML = "Select any pattern to simulate"
    //input generation
    pattern1.addEventListener('click', function (){
        let input = [[30,30],[31,29],[31,30],[31,31],[32,28],[32,29],[33,26],[33,27],[33,28],[34,27]]
        input_generation(input)
    })
    pattern2.addEventListener('click', function (){
        let input = [[30,31],[30,32],[30,33],[30,34],[31,31],[31,32],[31,33],[31,34],[31,36],[31,37],[31,38],[32,36],[32,37],[32,38],[34,36],[34,37],[34,38],[35,31],[35,32],[35,33],[35,34],[35,36],[35,37],[35,38],[36,31],[36,32],[36,33],[36,34]]
        input_generation(input)
    })
    pattern3.addEventListener('click', function (){
        let input = [[20,29],[22,29],[24,29],[26,29],[28,29], [19,30],[21,30],[23,30],[25,30],[27,30],[29,30], [20,31],[22,31],[24,31],[26,31],[28,31]]
        input_generation(input)
    })
    pattern4.addEventListener('click', function (){
        let input = [[24,22],[25,22],[26,22],[30,22],[31,22],[32,22], [22,24],[27,24],[29,24],[34,24],[22,25],[27,25],[29,25],[34,25],[22,26],[27,26],[29,26],[34,26], [24,27],[25,27],[26,27],[30,27],[31,27],[32,27],
            [24,29],[25,29],[26,29],[30,29],[31,29],[32,29], [22,30],[27,30],[29,30],[34,30],[22,31],[27,31],[29,31],[34,31],[22,32],[27,32],[29,32],[34,32], [24,34],[25,34],[26,34],[30,34],[31,34],[32,34]]
        input_generation(input)
    })
    pattern5.addEventListener('click', function (){
        let input = [[13,6],[13,7], [14,2],[14,3],[14,4],[14,5],[14,7],[14,8], [15,2],[15,3],[15,4],[15,5],[15,6],[15,7], [16,3],[16,4],[16,5],[16,6]]
        input_generation(input)
    })
    pattern6.addEventListener('click', function (){
        let input = [[5,1],[5,2],[6,1],[6,2],[5,11],[6,11],[7,11],[4,12],[8,12],[6,11],[3,13],[9,13],[3,14],[9,14],[6,15],[4,16],[8,16],[5,17],[6,17],[7,17],[6,18],
                    [3,21],[4,21],[5,21],[3,22],[4,22],[5,22],[2,23],[6,23],[1,25],[2,25],[6,25],[7,25],[3,35],[4,35],[3,36],[4,36]]
        input_generation(input)
    })
    
    button.addEventListener('click', function () {
        if (intervalId) { // stop simulation
            button.innerHTML = "Start"
            warnning.innerHTML = "Select any pattern to simulate"
            pattern1.disabled = false
            pattern2.disabled = false
            pattern3.disabled = false
            pattern4.disabled = false
            pattern5.disabled = false
            pattern6.disabled = false

            clearInterval(intervalId)
            intervalId = null
        } 
        else { // start simulation
            button.innerHTML = "Stop"
            warnning.innerHTML = "Please Stop the simulation before changing pattern"
            pattern1.disabled = true
            pattern2.disabled = true
            pattern3.disabled = true
            pattern4.disabled = true
            pattern5.disabled = true
            pattern6.disabled = true

            intervalId = setInterval(function () {
                next_gen()
            }, 300)
        }
    })

})