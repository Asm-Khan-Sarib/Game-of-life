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
function change_gen_list(input) {
    clear_bord()
    for(let i=0; i<input.length; i++){
        gen1_list[input[i][0]][input[i][1]] = 1
    }
    draw_gen() // draw generation at view port
}
function clear_bord(){
    for (let i = 0; i < hight; i++) {
        for (let j = 0; j < width; j++) {
            gen1_list[i][j] = 0
            gen2_list[i][j] = 0
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {

    let button = document.getElementById("start")
    let warnning = document.getElementById("warnning")

    let petern1 = document.getElementById("petern1")
    let petern2 = document.getElementById("petern2")
    let petern3 = document.getElementById("petern3")
    let petern4 = document.getElementById("petern4")
    let petern5 = document.getElementById("petern5")
    let petern6 = document.getElementById("petern6")
    

    create_gen_list() // make 2 empty generation at starting // for input gen
    
    petern1.addEventListener('click', function (){
        let input = [[5,1],[5,2],[6,1],[6,2],[5,11],[6,11],[7,11],[4,12],[8,12],[6,11],[3,13],[9,13],[3,14],[9,14],[6,15],[4,16],[8,16],[5,17],[6,17],[7,17],[6,18],
                    [3,21],[4,21],[5,21],[3,22],[4,22],[5,22],[2,23],[6,23],[1,25],[2,25],[6,25],[7,25],[3,35],[4,35],[3,36],[4,36]]
        change_gen_list(input)
    })
    petern2.addEventListener('click', function (){
        let input = [[20,29],[22,29],[24,29],[26,29],[28,29], [19,30],[21,30],[23,30],[25,30],[27,30],[29,30], [20,31],[22,31],[24,31],[26,31],[28,31]]
        change_gen_list(input)
    })
    petern3.addEventListener('click', function (){
        let input = [[5,1],[5,2],[5,22],[2,23],[6,23],[6,1],[6,2],[5,11],[3,35],[4,35],[3,36],[4,36]]
        change_gen_list(input)
    })
    petern4.addEventListener('click', function (){
        let input = [[5,1],[5,2],[6,1],[6,2],[5,11],[6,11],[3,13],[9,13],[3,35],[4,35],[3,36],[4,36]]
        change_gen_list(input)
    })
    petern5.addEventListener('click', function (){
        let input = [[5,1],[5,2],[6,1],[5,21],[3,22],[4,22],[5,11],[3,35],[4,35],[3,36],[4,36]]
        change_gen_list(input)
    })
    petern6.addEventListener('click', function (){
        let input = [[4,21],[5,21],[3,22],[5,2],[6,1],[6,2],[5,11],[3,35],[4,35],[3,36],[4,36]]
        change_gen_list(input)
    })
    
    button.addEventListener('click', function () {
        if (intervalId) { // stop simulation
            button.innerHTML = "Start"
            warnning.innerHTML = "Select any patern to simulate"
            petern1.disabled = false
            petern2.disabled = false
            petern3.disabled = false
            petern4.disabled = false
            petern5.disabled = false
            petern6.disabled = false

            clearInterval(intervalId)
            intervalId = null
        } 
        else { // start simulation
            button.innerHTML = "Stop"
            warnning.innerHTML = "Please Stop the simulation before changing patern"
            petern1.disabled = true
            petern2.disabled = true
            petern3.disabled = true
            petern4.disabled = true
            petern5.disabled = true
            petern6.disabled = true

            intervalId = setInterval(function () {
                next_gen()
            }, 150)
        }
    })

})