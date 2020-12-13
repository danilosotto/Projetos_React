import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);






//Formas de declarar variaveis
//hoinsting, quer dizer que quando é criado por exemplo com o tipo var, ela sobre la pra cima
//do código, começa ser valido no contexto inteiro
//console.log(variavel1)
//var variavel1 = 10
//console.log(variavel1)

//Caso tento fazer com let ou const, a partir da declaração que ela é valida.
//Porem a diferença entre let e const é que no const você não consegue atribuir valores a ela.
//console.log(variavel1)
//let variavel2 = 10

//Usem sempre const, caso precisa mutar a variavel dae vocÊ utiliza let.


//As funções não segue ordem pra poder utilizar, não preciso declarar 
//ela no começo pra utilizar ela depois
//ou seja ela tb é hoinsting
// console.log(soma(1,2))
// function soma( a, b) {
//   return a + b
// }

//Utilizamos as funções como const para evitar o hoinsting, ela só vai existir a partir daquele ponto.
// const funcSoma = soma
// console.log(funcSoma(4,5))

// const somaConst = (a, b) => {
//   return a+b
// }
// console.log('função const > ', somaConst(1, 5))


// //Arrow function mais limpa
// const arrowClean = (a, b) => a + b
// console.log('Arrow Clean > ', arrowClean(1,66))



//high order functions, funções que recebem funcoes como parametro. forEach e Map(retorna um novo array)
// const obj = {
//   name: "danilo",
//   lastName: "Sotto"
// }

// const keys = Object.keys(obj)
// keys.forEach( item =>{
//   console.log(obj[item])
// })

// const map = keys.map( item => {
//   return obj[item]
// })
// console.log(map)



//Destructuring assignament

const obj = {
    name: "danilo",
    lastName: "Sotto",
    address: {
      city: "Tupã"
    }
  }

  const keys = Object.keys(obj)
  const { name } = obj

  //Destruturação feita por ({propriedades do objeto})
  // const getNome = ({name, lastName}) => {
  //   console.log(`Nome: ${name} ${lastName}`)
  // }
  // //Destructor funciona para vetores tambem
  // //O use state ele é feito destruturando.
  // const [counter, setCounter] = useState(0)