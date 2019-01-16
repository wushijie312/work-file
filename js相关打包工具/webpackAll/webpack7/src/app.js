import Layer from './components/layer/layer.js';
import './css/common.css';
const App=function(){
    var vals=document.getElementById("app");
    var layer = new Layer();
    console.log(layer);
    
    vals.innerHTML=layer.tpl;
}
new App();