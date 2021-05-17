export default {"board-component.html":"<div>  <div class=\"header grey-text\">    <div class=\"large-text lobster\">Snake</div>    <div class=\"medium-text\">      Score : <span data=\"score\"></span>      <button e=\"click:reInit\" if=\"showPlay\">Play</button>    </div>  </div>  <div id=\"board\" snake-theme=\"base\">    <p loop=\"cells\"></p>  </div>  <div class=\"footer\">    <div id=\"keys\">      <div e=\"click:up\" class=\"key top\"></div>      <br />      <div e=\"click:left\" class=\"key left\"></div>      <div e=\"click:down\" class=\"key bottom\"></div>      <div e=\"click:right\" class=\"key right\"></div>    </div>    <div class=\"grey-text copyright\">      <div>        Copyright © 2021        <a          href=\"https://www.instagram.com/haribalajiravi/\"          target=\"_blank\"          >Haribalaji Ravi</a        >      </div>      <div>        Built with        <a href=\"https://creamie.io\" target=\"_blank\">creamie.io</a>      </div>    </div>  </div></div><div class=\"ads\" id=\"gads\">  <span class=\"ads-close\" e=\"click:close\">Close</span>  <amp-ad    width=\"100vw\"    height=\"320\"    type=\"adsense\"    data-ad-client=\"ca-pub-7858740679271778\"    data-ad-slot=\"2403159024\"    data-auto-format=\"rspv\"    data-full-width=\"\"  >    <div overflow=\"\"></div>  </amp-ad></div><div class=\"message\" data=\"message\"></div>","board-component.css":".header {  margin: auto;  width: 100%;  text-align: center;}.large-text {  font-size: 30pt;  font-weight: bold;}.medium-text {  font-size: larger;  padding: 4px;}.red-text {  color: red;}.score {  font-size: 2rem;}#board {  background: #3e3e3e;  border: 1px solid #444444;  border-radius: 2px;  margin: auto;  text-align: center;  margin-top: 10px;  display: flex;  flex-wrap: wrap;  width: 600px;  height: 600px;}p {  width: 10px;  height: 10px;  margin: 0px;  /* outline: 1px solid #efefef; */}#keys {  display: none;}@media only screen and (max-width: 600px) {  p {    width: 5px;    height: 5px;    margin: 0px;  }  #board {    background: #3e3e3e;    border: 1px solid #444444;    border-radius: 2px;    margin: auto;    text-align: center;    margin-top: 10px;    display: flex;    flex-wrap: wrap;    width: 300px;    height: 300px;  }  #keys {    display: block;  }}.arrow-key {  background-color: blue;  color: cornsilk;  border-radius: 3px;  padding: 5px;  width: 65px;  cursor: pointer;}.grey-text {  color: #cecece;}.d-snake-color {  background-color: #cecece;}.d-food-color {  background-color: chartreuse;}.d-rev-food-color {  background-color: blueviolet;}.footer {  margin: auto;  text-align: center;  width: 100%;  position: fixed;  bottom: 0px;  left: 0px;}.key {  cursor: pointer;  display: inline-block;  text-align: center;  background-color: rgb(95 95 95);  color: #efefef;  transition: all 0.05s linear;  width: 20px;  margin: 5px 0px 0px 1px;  padding: 25px;  border-radius: 3px;  opacity: 0.5;}.key:active {  opacity: 1;}.key:before {  border-left: 2px solid #c5c5c5;  border-top: 2px solid #c5c5c5;  width: 20px;  content: \"\";  height: 20px;  text-align: center;  float: right;}.left:before {  transform: rotate(-45deg);}.right:before {  transform: rotate(135deg);}.top:before {  transform: rotate(45deg);}.bottom:before {  transform: rotate(225deg);}.message {  width: 100%;  height: 100%;  margin: auto;  text-align: center;  position: fixed;  animation: textmove 1s;  font-size: 25pt;  display: none;  font-weight: bold;  top: 40%;  left: 0;}@keyframes textmove {  0% {    font-size: 5pt;    opacity: 0;  }  100% {    font-size: 25pt;    opacity: 1;  }}.copyright {  background-color: #4e4e4e;  padding: 10px;  margin: 10px 0px 0px 0px;}/* Snake blink*/@keyframes blinking {  0% {    background-color: red;  }  100% {    background-color: #cecece;  }}[snake-theme=\"blink\"] .d-snake-color {  animation: blinking 1s infinite;}.ads {  position: fixed;  top: 0px;  left: 0px;  right: 0px;  bottom: 0px;  background: #00000099;  width: 100%;  height: 100%;}.ads-close {  position: relative;  top: 10px;  left: 10px;  color: white;  cursor: pointer;  font-size: 13pt;}.ads-close:hover {  color: #efefef;}"}